import { randomUUIDv7 } from "bun";
import type { OutgoingMessage, SignupOutgoingMessage, ValidateOutgoingMessage } from "common/index";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";
import nacl_util from "tweetnacl-util";

console.log("🔧 Validator service starting...");

let validatorId: string | null = null;
const CALLBACKS: { [callbackId: string]: (data: SignupOutgoingMessage) => void } = {};

// Queue any validation messages that arrive before signup completes
const pendingValidations: ValidateOutgoingMessage[] = [];

async function main() {
    console.log("🔑 Loading keypair...");
    const keypair = Keypair.fromSecretKey(
        Uint8Array.from(JSON.parse(process.env.PRIVATE_KEY!))
    );

    console.log("🌐 Connecting to Hub WebSocket on ws://localhost:8081");
    const ws = new WebSocket("ws://localhost:8081");

    ws.onmessage = async (event) => {
        const data: OutgoingMessage = JSON.parse(event.data);

        if (data.type === 'signup') {
            console.log("✅ Received signup response from hub");
            CALLBACKS[data.data.callback]?.(data.data);
            delete CALLBACKS[data.data.callback];

            // Once validatorId is set, flush queued validations
            validatorId = data.data.validatorId;
            console.log(`🆔 Validator registered with ID: ${validatorId}`);

            while (pendingValidations.length > 0) {
                const pending = pendingValidations.shift();
                if (pending) await validateHandler(ws, pending, keypair);
            }

        } else if (data.type === 'validate') {
            if (!validatorId) {
                console.warn(`⚠️ Queuing validate request (callbackId: ${data.data.callbackId})`);
                pendingValidations.push(data.data);
            } else {
                await validateHandler(ws, data.data, keypair);
            }
        }
    };

    ws.onopen = async () => {
        const callbackId = randomUUIDv7();
        CALLBACKS[callbackId] = (data: SignupOutgoingMessage) => {
            // already handled above
        };

        console.log(`📡 Connected to hub. Sending signup message...`);
        const signedMessage = await signMessage(
            `Signed message for ${callbackId}, ${keypair.publicKey}`,
            keypair
        );

        ws.send(JSON.stringify({
            type: 'signup',
            data: {
                callbackId,
                ip: '127.0.0.1',
                publicKey: keypair.publicKey,
                signedMessage,
            },
        }));
    };

    ws.onerror = (err) => {
        console.error("❌ WebSocket error:", err);
    };

    ws.onclose = () => {
        console.warn("⚠️ WebSocket connection closed");
    };
}

async function validateHandler(ws: WebSocket, { url, callbackId, websiteId }: ValidateOutgoingMessage, keypair: Keypair) {
    if (!validatorId) {
        console.error(`❌ validatorId not set for callbackId: ${callbackId}`);
        return;
    }

    console.log(`🔍 Validating URL: ${url}`);
    const startTime = Date.now();
    const signature = await signMessage(`Replying to ${callbackId}`, keypair);

    try {
        const response = await fetch(url);
        const endTime = Date.now();
        const latency = endTime - startTime;
        const status = response.status;

        console.log(`📥 ${url} responded with ${status} in ${latency}ms`);

        ws.send(JSON.stringify({
            type: 'validate',
            data: {
                callbackId,
                status: status === 200 ? 'Good' : 'Bad',
                latency,
                websiteId,
                validatorId,
                signedMessage: signature,
            },
        }));
    } catch (error) {
        console.error(`❌ Error validating ${url}:`, error);

        ws.send(JSON.stringify({
            type: 'validate',
            data: {
                callbackId,
                status: 'Bad',
                latency: 1000,
                websiteId,
                validatorId,
                signedMessage: signature,
            },
        }));
    }
}

async function signMessage(message: string, keypair: Keypair) {
    const messageBytes = nacl_util.decodeUTF8(message);
    const signature = nacl.sign.detached(messageBytes, keypair.secretKey);
    return JSON.stringify(Array.from(signature));
}

main();

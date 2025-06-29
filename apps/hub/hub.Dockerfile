# apps/hub/Dockerfile
FROM oven/bun:1

WORKDIR /app

COPY . .

RUN bun install

CMD ["bun", "index.ts"]

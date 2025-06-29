import { prisma } from "../src";
import { password } from "bun";

const USER_ID = "4";

async function seed()  {
    await prisma.user.create({
        data: {
            id: USER_ID,
            email: "test@yopmail.com"
        }
    })


  const website = await prisma.website.create({
        data: {
            url: "https://test.com",
            userId: USER_ID
        }
    }) 


  const validator = await prisma.validator.create({
        data: {
            publicKey: "1x2345432345",
            location: "Delhi",
            ip: "127.0.0.1" 
        }
    })

    await prisma.websiteTick.create({
        data : {
            websiteId : website.id,
            status: "Good",
            createdAt: new Date(),
            latency: 100,
            validatorId: validator.id
        }
    })

     await prisma.websiteTick.create({
        data : {
            websiteId :website.id,
            status: "Good",
            createdAt: new Date(Date.now() - 1000 * 60 * 10),
            latency: 100,
            validatorId: validator.id
        }
    })
    
  

  await prisma.websiteTick.create({
        data : {
            websiteId : website.id,
            status: "Bad",
            createdAt: new Date(Date.now() - 1000 * 60 * 20),
            latency: 100,
            validatorId: validator.id

        }       
    })

    console.log("seeded successfully !!")
}

seed();
//Execute: npx ts-node util/seed.ts

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
    await prisma.controlCenter.deleteMany();
    await prisma.lightSources.deleteMany();
    await prisma.scene.deleteMany();
    await prisma.user.deleteMany();

    const controlHomeCenter = await prisma.controlCenter.create({
        data: {
            name: "Home Center",
        }
    });

    const getControlCenter = await prisma.controlCenter.findMany();
    console.log(JSON.stringify(getControlCenter));

    await prisma.user.create({
        data: {
            name: "admin",
            password: "admin",
            admin: true,
            controlCenter: {
                connect: { id: controlHomeCenter.id }
            }
        }
    });

    const getUser = await prisma.user.findMany();
    console.log(JSON.stringify(getUser));

    const lightSource = await prisma.lightSources.create({
        data: {
            name: "light",
            location: "living room",
            brightness: 100,
            status: true,
            controlCenter: {
                connect: { id: controlHomeCenter.id }
            }
        }
    });

    const getLightSources = await prisma.lightSources.findMany();
    console.log(JSON.stringify(getLightSources));


    await prisma.scene.create({
        data: {
            name: "watching tv",
            lightSources: {
                connect: {id: lightSource.id }
            },
            controlCenter: {
                connect: {id: controlHomeCenter.id }
            }
        }
    });

    const getScenes = await prisma.scene.findMany();
    console.log(JSON.stringify(getScenes));

}

main()
    .catch(e => {
        console.error(e.messa)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
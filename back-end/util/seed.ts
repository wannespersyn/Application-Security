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

    await prisma.lightSources.create({
        data: {
            name: "light",
            location: "living room",
            brightness: 0,
            status: false,
            controlCenter: {
                connect: { id: controlHomeCenter.id }
            }
        }
    });

    await prisma.lightSources.create({
        data: {
            name: "light table",
            location: "kitchen",
            brightness: 0,
            status: false,
            controlCenter: {
                connect: { id: controlHomeCenter.id }
            }
        }
    });

    await prisma.lightSources.create({
        data: {
            name: "light sink",
            location: "kitchen",
            brightness: 0,
            status: false,
            controlCenter: {
                connect: { id: controlHomeCenter.id }
            }
        }
    });

    const getLightSourcesKitchen = await prisma.lightSources.findMany({
        where: {
            location: "kitchen"
        }
    });

    const getLightSourcesLivingRoom = await prisma.lightSources.findMany({
        where: {
            location: "living room"
        }
    });


    await prisma.scene.create({
        data: {
            name: "watching tv",
            lightSources: {
                connect: getLightSourcesLivingRoom.map((lightSource) => ({
                    id: lightSource.id
                }))
            },
            controlCenter: {
                connect: {id: controlHomeCenter.id }
            }
        }
    });

    await prisma.scene.create({
        data: {
            name: "cooking",
            lightSources: {
                connect: getLightSourcesKitchen.map((lightSource) => ({
                    id: lightSource.id
                }))
            },
            controlCenter: {
                connect: {id: controlHomeCenter.id }
            }
        }
    });
    const getScenes = await prisma.scene.findMany();
    console.log(JSON.stringify(getScenes));


    const getControlCenter = await prisma.controlCenter.findMany();
    console.log(JSON.stringify(getControlCenter));

    const getUser = await prisma.user.findMany();
    console.log(JSON.stringify(getUser));

    const getLightSources = await prisma.lightSources.findMany();
    console.log(JSON.stringify(getLightSources));

}

main()
    .catch(e => {
        console.error(e.messa)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
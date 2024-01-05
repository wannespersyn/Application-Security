//Execute: npx ts-node util/seed.ts

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";


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

    // USERS

    const passwordAdmin = await bcrypt.hash("admin", 12);
    await prisma.user.create({
        data: {
            name: "Wannes",
            password: passwordAdmin,
            admin: true,
            controlCenter: {
                connect: { id: controlHomeCenter.id }
            }
        }
    });

    await prisma.user.create({
        data: {
            name: "Robin",
            password: passwordAdmin,
            admin: true,
            controlCenter: {
                connect: { id: controlHomeCenter.id }
            }
        }
    });

    const passwordGreetje = await bcrypt.hash("greetjej123", 12);
    await prisma.user.create({
        data: {
            name: "greetjej",
            password: passwordGreetje,
            admin: false,
            controlCenter: {
                connect: { id: controlHomeCenter.id }
            }
        }
    });

    const passwordElkes = await bcrypt.hash("elkes123", 12);
    await prisma.user.create({
        data: {
            name: "elkes",
            password: passwordElkes,
            admin: false,
            controlCenter: {
                connect: { id: controlHomeCenter.id }
            }
        }
    });

    const passwordJohan = await bcrypt.hash("johan123", 12);
    await prisma.user.create({
        data: {
            name: "johanp",
            password: passwordJohan,
            admin: false,
            controlCenter: {
                connect: { id: controlHomeCenter.id }
            }
        }
    });

    //light sources

    await prisma.lightSources.create({
        data: {
            name: "main light",
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
            name: "tv light",
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
            name: "main light",
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
            name: "wine rack light",
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
            name: "extractor hood light",
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

    //SCENES


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

}

main()
    .catch(e => {
        console.error(e.messa)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
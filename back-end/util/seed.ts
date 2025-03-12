//Execute: npx ts-node util/seed.ts

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";


const prisma = new PrismaClient();

const main = async () => {
    await prisma.lightSources.deleteMany();
    await prisma.scene.deleteMany();
    await prisma.user.deleteMany();
    await prisma.controlCenter.deleteMany();

    const controlHomeCenter = await prisma.controlCenter.create({
        data: {
            name: "Home Center",
        }
    });

    /**
     * USERS
     */
    const users = [
        { name: "Wannes", password: "admin", admin: true },
        { name: "Robin", password: "admin", admin: true },
        { name: "greetjej", password: "greetjej123", admin: false },
        { name: "elkes", password: "elkes123", admin: false },
        { name: "johanp", password: "johan123", admin: false }
    ]

    const pepper = process.env.PEPPER || 'je-geheime-pepper-string';

    for (const user of users) {
        const salt = await bcrypt.genSalt(12);
        const pepperedPassword = user.password + pepper;
        const password = await bcrypt.hash(pepperedPassword, salt);
        await prisma.user.create({
            data: {
                name: user.name,
                password: password,
                admin: user.admin,
                controlCenter: {
                    connect: { id: controlHomeCenter.id }
                }
            }
        });
    }

    /**
     * LIGHT SOURCES
     */
    const lightSources = [
        { name: "main light", location: "living room" },
        { name: "tv light", location: "living room" },
        { name: "main light", location: "kitchen" },
        { name: "wine rack light", location: "kitchen" },
        { name: "extractor hood light", location: "kitchen" }
    ]

    for (const lightSource of lightSources) {
        await prisma.lightSources.create({
            data: {
                name: lightSource.name,
                location: lightSource.location,
                brightness: 0,
                status: false,
                controlCenter: {
                    connect: { id: controlHomeCenter.id }
                }
            }
        });
    }


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

    /**
     * SCENES
     */
    const scenes = [
        { name: "watching tv", lightSources: getLightSourcesLivingRoom },
        { name: "cooking", lightSources: getLightSourcesKitchen }
    ]

    for (const scene of scenes) {
        await prisma.scene.create({
            data: {
                name: scene.name,
                lightSources: {
                    connect: scene.lightSources.map((lightSource) => ({
                        id: lightSource.id
                    }))
                },
                controlCenter: {
                    connect: {id: controlHomeCenter.id }
                }
            }
        });
    }
}

main()
    .catch(e => {
        console.error(e.message)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
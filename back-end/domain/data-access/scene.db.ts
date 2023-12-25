import { Scene } from "../model/scene";
import database from "../../util/database";

const createScene = async ({ id, name, lightSources }: Scene): Promise<Scene> => {
    try {
        const newScenePrisma = await database.scene.create({
            data: {
                name: name,
                lightSources: {
                    connect: lightSources.map((lightSource) => ({
                        id: lightSource.id
                    }))
                },
                controlCenter: {
                    connect: {
                        id: id
                    }
                }
            },
            include: {
                lightSources: true,
                controlCenter: true,
            }
        });
        return Scene.from(newScenePrisma);
    } catch (error) {
        throw new Error(`Error creating scene: ${error.message}`);
    }
};

export default {
    createScene
}
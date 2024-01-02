import { Scene } from "../model/scene";
import database from "../../util/database";

const createScene = async ({name, lightSources }: Scene): Promise<Scene> => {
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
                        id: 1
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

const deleteScene = async (name: string): Promise<Scene> => {
    try {
        const deletedScenePrisma = await database.scene.delete({
            where: {
                name: name
            },
            include: {
                lightSources: true,
            }
        });
        return Scene.from(deletedScenePrisma);
    } catch (error) {
        throw new Error(`Error deleting scene: ${error.message}`);
    }
}

export default {
    createScene,
    deleteScene
}
import controlCenterDb from "../domain/data-access/controlCenter.db";
import sceneDb from "../domain/data-access/scene.db";
import { Scene } from "../domain/model/scene";
import { SceneInput } from "../types";

const createScene = async ({name, lightSources}: SceneInput): Promise<Scene> => {
    const scene = new Scene({name, lightSources});
    return sceneDb.createScene(scene);
};


const deleteScene = async (name: string): Promise<Scene> => {
    const scene = await sceneDb.deleteScene(name);
    return scene;
}


export default {
    createScene,
    deleteScene
};
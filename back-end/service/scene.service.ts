import controlCenterDb from "../domain/data-access/controlCenter.db";
import sceneDb from "../domain/data-access/scene.db";
import { Scene } from "../domain/model/scene";
import { SceneInput } from "../types";

let currentId = 1;

/**
 * Creates a new scene and adds it to the database.
 *
 * @param {SceneInput} param0 - Object containing the name and activationTargets for the new scene.
 * @returns {Scene} The newly created scene object with the specified properties.
 */
const createScene = async ({name, lightSources}: SceneInput): Promise<Scene> => {
    const scene = new Scene({id: currentId++, name, lightSources});
    return sceneDb.createScene(scene);
};



export default {
    createScene,
};
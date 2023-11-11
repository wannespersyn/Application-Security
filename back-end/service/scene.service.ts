import sceneDb from "../domain/data-access/scene.db";
import { Scene } from "../domain/model/scene";
import { SceneInput } from "../types";


/**
 * Creates a new scene and adds it to the database.
 *
 * @param {SceneInput} param0 - Object containing the name and activationTargets for the new scene.
 * @returns {Scene} The newly created scene object with the specified properties.
 */
const createScene = ({name, activationTargets}: SceneInput): Scene => {
    const scene = new Scene({name, activationTargets});
    return sceneDb.createScene(scene);
};


/**
 * Turns on the specified scene and activates associated elements.
 *
 * @param {string} name - The name of the scene to turn on.
 * @returns {Scene} The scene that was turned on.
 *
 * @throws {Error} If the specified scene is not found in the database.
 */
const turnSceneOn = (name: string): Scene => {
    const targetScene = sceneDb.getAllScenes().find((scene) => scene.name === name);

    if (!targetScene) {
        throw new Error(`Scene '${name}' not found!`)
    }

    return sceneDb.turnSceneOn(name);
}


/**
 * Turns off the specified scene and deactivates associated elements.
 *
 * @param {string} name - The name of the scene to turn off.
 * @returns {Scene} The scene that was turned off.
 *
 * @throws {Error} If the specified scene is not found in the database.
 */
const turnSceneOff = (name: string): Scene => {
    const targetScene = sceneDb.getAllScenes().find((scene) => scene.name === name);

    if (!targetScene) {
        throw new Error(`Scene '${name}' not found!`)
    }

    return sceneDb.turnSceneOff(name);
}

export default {
    createScene,
    turnSceneOn
};
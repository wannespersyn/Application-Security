import { Scene } from "../model/scene";
import {LightSource} from "../model/lightSource";

/** preliminary database **/
const scenes = [];

/**
 * Creates a new scene and adds it to the database.
 *
 * @param {Scene} scene - The scene object to be created.
 * @returns {Scene} The newly created scene.
 */
const createScene = ({name, activationTargets}: Scene): Scene => {
    //call constructor to validate
    const validation_scene = new Scene({
        name,
        activationTargets
    });
    scenes.push(validation_scene);
    return null;
}

/**
 * Gets all scenes in the database.
 *
 * @returns {Scene[]} An array containing all scenes in the database.
 */
const getAllScenes = (): Scene[] => scenes;

/**
 * Turns on the specified scene and activates associated light sources.
 *
 * @param {string} name - The name of the scene to turn on.
 * @returns {Scene} The scene that was turned on.
 */
const turnSceneOn = (name: string): Scene => {
    const targetScene = scenes.find((scene) => scene.name === name)
    targetScene.activationTargets.forEach((lightSource: LightSource) => {
        lightSource.status = true;
    })

    return targetScene;
}

/**
 * Turns off the specified scene and deactivates associated light sources.
 *
 * @param {string} name - The name of the scene to turn off.
 * @returns {Scene} The scene that was turned off.
 */
const turnSceneOff = (name: string): Scene => {
    const targetScene = scenes.find((scene) => scene.name === name)
    targetScene.activationTargets.forEach((lightSource: LightSource) => {
        lightSource.status = false;
    })

    return targetScene;
}

export default {
    createScene,
    getAllScenes,
    turnSceneOn,
    turnSceneOff
}
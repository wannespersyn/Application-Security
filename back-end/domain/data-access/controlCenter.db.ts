import { User } from "../model/user";
import { LightSource } from "../model/lightSource";
import { Scene } from "../model/scene";
import { ControlCenter } from "../model/controlCenter";
import sceneService from "../../service/scene.service";
import lightSourceService from "../../service/lightSource.service";

/** Preliminary databases **/
const controlCenters: ControlCenter[] = [];

/**
 * Creates a new control center with the provided users, light sources, and scenes.
 *
 * @returns {ControlCenter} The created ControlCenter.
 */
const createControlPanel = (): ControlCenter => {
    const validationControlCenter = new ControlCenter();

    controlCenters.push(validationControlCenter);

    return validationControlCenter;
}

/**
 * Retrieves the entire Control Center.
 *
 * @returns {ControlCenter[]} An array containing all ControlCenter objects.
 */
const getWholeControlCenter = (): ControlCenter[] => controlCenters;

const getAllUsers = (): User[] => {
    const currentControlCenter = controlCenters[controlCenters.length - 1];

    return currentControlCenter.users;
}

/**
 * Finds a user in the Control Center by name.
 *
 * @param {string} name - The name of the user to find.
 * @returns {User} The found User object, or null if not found.
 */
const findUserByName = (name: string): User => {
    const currentControlCenter = controlCenters[controlCenters.length - 1];

    return currentControlCenter.users.find(user => user.name === name);
}

/**
 * Finds a light source in the Control Center by name and location.
 *
 * @param {string} name - The name of the light source to find.
 * @param {string} location - The location of the light source to find.
 * @returns {LightSource} The found LightSource object, or null if not found.
 */
const findLightSourceByNameAndLocation = (name: string, location: string): LightSource => {
    const currentControlCenter = controlCenters[controlCenters.length - 1];

    return currentControlCenter.light_sources.find(lightSource => lightSource.name === name && lightSource.location == location);
}

/**
 * Finds a scene in the Control Center by name.
 *
 * @param {string} name - The name of the scene to find.
 * @returns {Scene} The found Scene object, or null if not found.
 */
const findSceneByName = (name: string): Scene => {
    const currentControlCenter = controlCenters[controlCenters.length - 1];

    return currentControlCenter.scenes.find(scene => scene.name === name);
}


/**
 * Adds a new user to the Control Center.
 *
 * @param {User} user - The User object to be added.
 * @returns {User} The added User.
 */
const addUser = ({ id, name, password, admin }: User): User => {
    const user = new User({ id, name, password, admin });

    const currentControlCenter = controlCenters[controlCenters.length - 1];
    if (currentControlCenter) {
        currentControlCenter.users = currentControlCenter.users || [];
        currentControlCenter.users.push(user);
    }

    return user;
}

/**
 * Adds a new light source to the Control Center.
 *
 * @param {LightSource} lightSource - The LightSource object to be added.
 * @returns {LightSource} The added LightSource.
 */
const addLightSource = ({ name, location, brightness, status }: LightSource): LightSource => {
    const lightSource = lightSourceService.createLightSource({ name, location, brightness, status });

    const currentControlCenter = controlCenters[controlCenters.length - 1];
    if (currentControlCenter) {
        currentControlCenter.light_sources = currentControlCenter.light_sources || [];
        currentControlCenter.light_sources.push(lightSource);
    }

    return lightSource;
}

/**
 * Adds a new scene to the Control Center.
 *
 * @param {Scene} scene - The Scene object to be added.
 * @returns {Scene} The added Scene.
 */
const addScene = ({ name, activationTargets }: Scene): Scene => {
    const scene = sceneService.createScene({name, activationTargets})

    const currentControlCenter = controlCenters[controlCenters.length - 1];
    if (currentControlCenter) {
        currentControlCenter.scenes = currentControlCenter.scenes || [];
        currentControlCenter.scenes.push(scene);
    }

    return scene;
}

/**
 * Turns on the specified light source.
 *
 * @param {string} name - The name of the light source to turn on.
 * @param {string} location - The location of the light source to turn on.
 * @returns {LightSource} The light source that was turned on.
 */
const turnLightOn = (name: string, location: string): LightSource => {
    const targetLightSource = findLightSourceByNameAndLocation(name, location)
    targetLightSource.status = true;

    return targetLightSource;
};

/**
 * Turns off the specified light source.
 *
 * @param {string} name - The name of the light source to turn off.
 * @param {string} location - The location of the light source to turn on.
 * @returns {LightSource} The light source that was turned off.
 */
const turnLightOff = (name: string, location: string): LightSource => {
    const targetLightSource = findLightSourceByNameAndLocation(name, location)
    targetLightSource.status = false;

    return targetLightSource;
};

/**
 * Changes the brightness of the specified light source.
 *
 * @param {string} name - The name of the light source to change brightness.
 * @param {string} location - The location of the light source to turn on.
 * @param {number} brightness - The new brightness value for the light source.
 * @returns {LightSource} The light source with the updated brightness.
 */
const changeBrightness = (name: string, location: string, brightness: number): LightSource => {
    const targetLightSource = findLightSourceByNameAndLocation(name, location)
    targetLightSource.brightness = brightness;
    targetLightSource.status = brightness > 0;

    return targetLightSource;
}

export default {
    createControlPanel,
    getWholeControlCenter,
    addUser,
    addLightSource,
    addScene,
    findUserByName,
    findLightSourceByNameAndLocation,
    findSceneByName,
    getAllUsers,
    turnLightOn,
    turnLightOff,
    changeBrightness
}

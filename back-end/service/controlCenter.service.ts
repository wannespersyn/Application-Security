import controlCenterDb from "../domain/data-access/controlCenter.db";
import {ControlCenter} from "../domain/model/controlCenter";
import {User} from "../domain/model/user";
import {LightSource} from "../domain/model/lightSource";
import {Scene} from "../domain/model/scene";

/**
 * Creates a new control center with the provided users, light sources, and scenes.
 *
 * @returns {ControlCenter} The created ControlCenter.
 */
const createControlCenter = (): ControlCenter => {
    return controlCenterDb.createControlPanel();
}



/**
 * Adds a new user to the Control Center.
 *
 * @param {User} user - The User object to be added.
 * @returns {User} The added User.
 *
 * @throws {Error} If the user with the same name already exists.
 */
const addUserToControlCenter = ({ id, name, password, admin }: User): User => {
    const user = new User ({id, name, password, admin});

    if (controlCenterDb.findUserByName(user.name))
        throw new Error(`User already in use: '${user.name}'`)
    return controlCenterDb.addUser(user);
}


/**
 * Adds a new light source to the Control Center.
 *
 * @param {LightSource} lightSource - The LightSource object to be added.
 * @returns {LightSource} The added LightSource.
 *
 * @throws {Error} If a light source with the same name and location already exists.
 */
const addLightSource = ({id, name, location, brightness, status}: LightSource) : LightSource => {
    const lightSource = new LightSource({id, name, location, brightness, status})

    if (controlCenterDb.findLightSourceByNameAndLocation(lightSource.name, lightSource.location))
        throw new Error(`Light source with location: '${lightSource.location}' and 
                                    name: '${lightSource.name}' already in use!`)
    return controlCenterDb.addLightSource(lightSource);
}


/**
 * Adds a new scene to the Control Center.
 *
 * @param {Scene} scene - The Scene object to be added.
 * @returns {Scene} The added Scene.
 *
 * @throws {Error} If a scene with the same name already exists.
 */
const addScene = ({id, name, activationTargets}: Scene) : Scene => {
    const scene = new Scene({id, name, activationTargets})

    if (controlCenterDb.findSceneByName(scene.name))
        throw new Error(`Scene with name: '${scene.name}' already in exist!`)
    return controlCenterDb.addScene(scene);
}

/**
 * Turn the light with the specified name on.
 *
 * @param {string} name - The name of the light source to turn on.
 * @param {string} location - The location of the light source to turn on.
 * @returns {LightSource} The light source that was turned on, or null if not found.
 *
 * @throws {Error} If the light source with the specified name is not found.
 */
const turnLightOn = (name: string, location: string): LightSource => {
    const targetLightSource = controlCenterDb.findLightSourceByNameAndLocation(name, location)

    if (!targetLightSource) {
        throw new Error(`Light source with name: '${name}' and location: '${location} not found!`)
    }

    return controlCenterDb.turnLightOn(name, location)
};

/**
 * Turn the light with the specified name off.
 *
 * @param {string} name - The name of the light source to turn on.
 * @param {string} location - The location of the light source to turn on.
 * @returns {LightSource} The light source that was turned on
 *
 * @throws {Error} If the light source with the specified name is not found.
 */
const turnLightOff = (name: string, location: string): LightSource => {
    const targetLightSource = controlCenterDb.findLightSourceByNameAndLocation(name, location)

    if (!targetLightSource) {
        throw new Error(`Light source with name: '${name}' and location: '${location} not found!`)
    }

    return controlCenterDb.turnLightOff(name, location);
};

/**
 * Change the brightness of the light with the specified name.
 *
 * @param {string} name - The name of the light source to turn on.
 * @param {string} location - The location of the light source to turn on.
 * @param {number} brightness - The brightness that the light source should be.
 * @returns {LightSource} The light source that was turned on, or null if not found.
 *
 * @throws {Error} If the light source with the specified name is not found, or if the brightness is out of the valid range.
 */
const changeBrightnessLight= (name: string, location: string, brightness: number): LightSource | null => {
    const targetLightSource = controlCenterDb.findLightSourceByNameAndLocation(name, location)

    if (!targetLightSource) {
        throw new Error(`Light source with name: '${name}' and location: '${location} not found!`)
    }

    if (brightness > 100 || brightness < 0) {
        throw new Error("Brightness must be between 0 & 100 (inclusive)!")
    }

    return controlCenterDb.changeBrightness(name, location, brightness);
};

/**
 * Returns all users in the Control Center.
 *
 * @returns {User[]} All users in the Control Center.
 */
const getAllUsers = (): User[] => {
    return controlCenterDb.getAllUsers();
}

/**
 * Returns the light source with the specified name and location.
 *
 * @param {string} name - The name of the light source to find.
 * @param {string} location - The location of the light source to find.
 * @returns {LightSource} The light source with the specified name and location, or null if not found.
 */
const getSpecificLighSource = (name, location): LightSource => {
    return controlCenterDb.findLightSourceByNameAndLocation(name, location);
}

/**
 * Returns the scene with the specified name.
 *
 * @param {string} name - The name of the scene to find.
 * @returns {Scene} The scene with the specified name, or null if not found.
 */
const getSpecificScene = (name): Scene => {
    return controlCenterDb.findSceneByName(name);
}

/**
 * Returns the user with the specified name.
 *
 * @param {string} name - The name of the user to find.
 * @returns {User} The user with the specified name, or null if not found.
 */
const getSpecificUser = (name): User => {
    return controlCenterDb.findUserByName(name);
}


export default {
    createControlCenter,

    addUserToControlCenter,
    addLightSource,
    addScene,

    turnLightOn,
    turnLightOff,
    changeBrightnessLight,

    getAllUsers,
    getSpecificLighSource,
    getSpecificScene,
    getSpecificUser
};
import controlCenterDb from "../domain/data-access/controlCenter.db";
import { ControlCenter } from "../domain/model/controlCenter";
import {User} from "../domain/model/user";
import {LightSource} from "../domain/model/lightSource";
import {Scene} from "../domain/model/scene";
import sceneService from "./scene.service";
import lightSourceService from "./lightSource.service";

/**
 * Creates a new control center with the provided users, light sources, and scenes.
 *
 * @returns {ControlCenter} The created ControlCenter.
 */
const createControlCenter = (): ControlCenter => {
    const control_center = controlCenterDb.createControlPanel();
    return null;
}

const getAllUsers = (): User[] => {
    return controlCenterDb.getAllUsers();
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

export default {
    createControlCenter,
    addUserToControlCenter,
    addLightSource,
    addScene,
    getAllUsers
};
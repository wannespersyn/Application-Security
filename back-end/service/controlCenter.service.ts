import controlCenterDb from "../domain/data-access/controlCenter.db";
import {ControlCenter} from "../domain/model/controlCenter";
import {User} from "../domain/model/user";
import {LightSource} from "../domain/model/lightSource";
import {Scene} from "../domain/model/scene";

/**
 * 
 * CREATE NEW CONTROL CENTER
 * 
 */
const createControlCenter = (): Promise<ControlCenter> => {
    return controlCenterDb.createControlPanel();
}



/**
 * 
 * ADD FUNCTIONS
 * 
 */
const addUserToControlCenter = ({ id, name, password, admin }: User): Promise<User> => {
    const user = new User ({id, name, password, admin});

    if (controlCenterDb.findUserByName(user.name))
        throw new Error(`User already in use: '${user.name}'`)
    return controlCenterDb.addUser(user);
}

const addLightSource = ({id, name, location, brightness, status}: LightSource) : Promise<LightSource> => {
    const lightSource = new LightSource({id, name, location, brightness, status})

    if (controlCenterDb.findLightSourceByNameAndLocation(lightSource.name, lightSource.location))
        throw new Error(`Light source with location: '${lightSource.location}' and 
                                    name: '${lightSource.name}' already in use!`)
    return controlCenterDb.addLightSource(lightSource);
}


const addScene = async ({id, name, lightSources}: Scene) : Promise<Scene> => {
    const scene = new Scene({id, name, lightSources})

    if (controlCenterDb.findSceneByName(scene.name))
        throw new Error(`Scene with name: '${scene.name}' already in exist!`)
    return controlCenterDb.addScene(scene);
}

/**
 * 
 * LIGHT CONTROL FUNCTIONS
 * 
 */
const turnLightOn = (name: string, location: string): Promise<LightSource> => {
    const targetLightSource = controlCenterDb.findLightSourceByNameAndLocation(name, location)

    if (!targetLightSource) {
        throw new Error(`Light source with name: '${name}' and location: '${location} not found!`)
    }

    return controlCenterDb.turnLightOn(name, location)
};

const turnLightOff = (name: string, location: string): Promise<LightSource> => {
    const targetLightSource = controlCenterDb.findLightSourceByNameAndLocation(name, location)

    if (!targetLightSource) {
        throw new Error(`Light source with name: '${name}' and location: '${location} not found!`)
    }

    return controlCenterDb.turnLightOff(name, location);
};

const changeBrightnessLight= (name: string, location: string, brightness: number): Promise<LightSource> | null => {
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
 * 
 * SCENE CONTROL FUNCTIONS
 * 
 */
const turnSceneOn = (name: string): Promise<Scene> => {
    const targetScene = controlCenterDb.findSceneByName(name)

    if (!targetScene) {
        throw new Error(`Scene '${name}' not found!`)
    }

    return controlCenterDb.turnSceneOn(name);
}

const turnSceneOff = (name: string): Promise<Scene> => {
    const targetScene = controlCenterDb.findSceneByName(name)

    if (!targetScene) {
        throw new Error(`Scene '${name}' not found!`)
    }

    return controlCenterDb.turnSceneOff(name);
}

/**
 * 
 * GETTERS
 * 
 */

const getAllControlCenters = (): Promise<ControlCenter[]> => {
    return controlCenterDb.getAllControlCenters();
}

const getAllUsers = (): Promise<User[]> => {
    return controlCenterDb.getAllUsers();
}

const getAllLightSources = (): Promise<LightSource[]> => {
    return controlCenterDb.getAllLightSources();
}

const getAllScenes = (): Promise<Scene[]> => {
    return controlCenterDb.getAllScenes();
}

const getSpecificLighSource = (name, location): Promise<LightSource> => {
    return controlCenterDb.findLightSourceByNameAndLocation(name, location);
}

const getSpecificScene = (name): Promise<Scene> => {
    return controlCenterDb.findSceneByName(name);
}

const getSpecificUser = (name): Promise<User> => {
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

    turnSceneOn,
    turnSceneOff,

    getAllControlCenters,
    getAllUsers,
    getAllLightSources,
    getAllScenes,
    
    getSpecificLighSource,
    getSpecificScene,
    getSpecificUser
};
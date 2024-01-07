import controlCenterDb from "../domain/data-access/controlCenter.db";
import { ControlCenter } from "../domain/model/controlCenter";
import { User } from "../domain/model/user";
import { LightSource } from "../domain/model/lightSource";
import { Scene } from "../domain/model/scene";
import { AuthenticationResponse, UserInput } from "../types";
import bcrypt from "bcrypt";
import { generateJwtToken } from "../util/jwt";
import { UnauthorizedError } from "express-jwt";

/**
 * 
 * CREATE NEW CONTROL CENTER
 * 
 */
const createControlCenter = (): Promise<ControlCenter> => {
    return controlCenterDb.createControlPanel();
}

const authenticate = async ({ name, password}: UserInput): Promise<AuthenticationResponse> => {
    const user = await getSpecificUser(name);

    const isvalidPassword = await bcrypt.compare(password, user.password);
    if (!isvalidPassword) {
        throw new Error("Password is incorrect!");
    }

    return {
        token: generateJwtToken({ name, admin: user.admin }),
        name: user.name,
        admin: user.admin
    };
}

/**
 * 
 * ADD FUNCTIONS
 * 
 */
const addUserToControlCenter = async ({name, password, admin }: UserInput): Promise<User> => {
    const excisting = await controlCenterDb.findUserByName(name);

    if (excisting) {
        throw new Error(`User with name: '${name}' already exists!`);
    }
    
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User ({name, password: hashedPassword, admin});

    return await controlCenterDb.addUser(user);
}

const addLightSource = ({name, location, brightness, status}: LightSource, { admin }) : Promise<LightSource> => {
    if (!admin) {
        throw new UnauthorizedError('credentials_required', 
            { message: 'You are not authorized to add light sources' });
    }
    const lightSource = new LightSource({name, location, brightness, status})
    return controlCenterDb.addLightSource(lightSource);
}


const addScene = async ({name, lightSources}: Scene) : Promise<Scene> => {
    const scene = new Scene({name, lightSources})
    return controlCenterDb.addScene(scene);
}

/**
 * 
 * DELETE FUNCTIONS
 * 
 */
const deleteLightSource = async (name: string, location: string): Promise<LightSource> => {
    const lightSource = await controlCenterDb.deleteLightSource(name, location);
    return lightSource;
}

const deleteScene = async (name: string): Promise<Scene> => {
    const scene = await controlCenterDb.deleteScene(name);
    return scene;
}

const deleteUser = async (name: string, admin: boolean): Promise<User> => {
    if (!admin) {
        throw new UnauthorizedError('credentials_required', 
            { message: 'You are not authorized to delete users' });
    } else {
        const user = await controlCenterDb.deleteUser(name);
        return user;
    }
}

/**
 * 
 * LIGHT CONTROL FUNCTIONS
 * 
 */
const turnLightOn = async (name: string, location: string): Promise<LightSource> => {
    const targetLightSource = await controlCenterDb.findLightSourceByNameAndLocation(name, location)

    if (!targetLightSource) {
        throw new Error(`Light source with name: '${name}' and location: '${location} not found!`)
    }

    return await controlCenterDb.turnLightOn(name, location)
};

const turnLightOff = async (name: string, location: string): Promise<LightSource> => {
    const targetLightSource = await controlCenterDb.findLightSourceByNameAndLocation(name, location)

    if (!targetLightSource) {
        throw new Error(`Light source with name: '${name}' and location: '${location} not found!`)
    }

    return await controlCenterDb.turnLightOff(name, location);
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

    // if (!targetScene) {
    //     throw new Error(`Scene '${name}' not found!`)
    // }

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

const getAllLightSources = async ({name, admin}): Promise<LightSource[]> => {
    if (!name) {
        throw new UnauthorizedError('credentials_required', 
            { message: 'You are not authorized to view light sources' });
    } else {
        return controlCenterDb.getAllLightSources();
    }
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

const getIdFromLightSource = (name, location) => {
    return controlCenterDb.getIdFromLightSource(name, location);
}


export default {
    createControlCenter,
    authenticate,

    addUserToControlCenter,
    addLightSource,
    addScene,

    deleteLightSource,
    deleteScene,
    deleteUser,

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
    getSpecificUser,

    getIdFromLightSource
};
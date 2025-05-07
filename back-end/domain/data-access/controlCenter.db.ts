import { User } from "../model/user";
import { LightSource } from "../model/lightSource";
import { Scene } from "../model/scene";
import { ControlCenter } from "../model/controlCenter";
import sceneService from "../../service/scene.service";
import lightSourceService from "../../service/lightSource.service";
import database from "../../util/database";
import userService from "../../service/user.service";

const createControlPanel = (): Promise<ControlCenter> => {
    const newControlCenterPrisma = database.controlCenter.create({
        data: {
        name: "Control Center",
        }
    });

    return newControlCenterPrisma.then((controlCenter) => ControlCenter.from(controlCenter));
}


/**
 * 
 * GETTERS
 * 
 */
const getAllControlCenters = async (): Promise<ControlCenter[]> => {
    const controlCenterPrisma = await database.controlCenter.findMany({});
    return controlCenterPrisma.map((controlCenter) => ControlCenter.from(controlCenter));
}

const getAllUsers = async (): Promise<User[]> => {
    const userPrisma = await database.user.findMany({
        include: {
            controlCenter: true
        }
    });
    return userPrisma.map((user) => User.from(user));
}

const getAllLightSources = async (): Promise<LightSource[]> => {
    const lightSourcePrisma = await database.lightSources.findMany({
        include: {
            controlCenter: true
        }
    });
    return lightSourcePrisma.map((lightSource) => LightSource.from(lightSource));
}

const getAllScenes = async (): Promise<Scene[]> => {
    const scenePrisma = await database.scene.findMany({
       include: {
              lightSources: true,
              controlCenter: true
         }
    });
    return scenePrisma.map((scene) => Scene.from(scene));
}

const getIdFromLightSource = async (name: string, location: string): Promise<number> => {
   const lightSource = await database.lightSources.findUnique({
        where: {
            name_location: {
                name: name,
                location: location
            }
        },
        include: {
            scenes: true
        }
    });
    return lightSource.id;
}


/**
 * 
 * FIND FUNCTIONS
 * 
 */

const findUserByName = (name: string): Promise<User> => {
    const findUserPrisma = database.user.findUnique({
        where: {
            name: name
        }
    });
    
    return findUserPrisma.then((user) => {
        if (user !== null) {
            return User.from(user); 
        }
        return null; 
    });
}

const findLightSourceByNameAndLocation = async (name: string, location: string): Promise<LightSource> => {
    const findLightSourcePrisma = database.lightSources.findUnique({
        where: {
            name_location: {
                name: name,
                location: location
            }
        },
        include: {
            scenes: true
        }
    });

    return findLightSourcePrisma.then((lightSource) => LightSource.from(lightSource))
}

const findSceneByName = (name: string): Promise<Scene> => {
    const findScenePrisma = database.scene.findUnique({
        where: {
            name: name
        },
        include: {
            lightSources: true
        }
    });

    return findScenePrisma.then((scene) => Scene.from(scene))
}



/**
 * 
 *  ADD FUNCTIONS
 * 
 */
const addUser = async ({name, password, admin }: User): Promise<User> => {
    const user = await userService.createUser({name, password, admin})
    return user;

}

const addLightSource = async ({ name, location, brightness, status }: LightSource): Promise<LightSource> => {
    const lightSource = await lightSourceService.createLightSource({name, location, brightness, status})
    return lightSource
}

const addScene = async ({ name, lightSources }: Scene): Promise<Scene> => {
    const scene = await sceneService.createScene({name, lightSources});
    return scene;
}

const deleteLightSource = async (name: string, location: string): Promise<LightSource> => {
    const lightSource = await lightSourceService.deleteLightSource(name, location);
    return lightSource;
}

const deleteScene = async (name: string): Promise<Scene> => {
    const scene = await sceneService.deleteScene(name);
    return scene;
}

const deleteUser = async (name: string): Promise<User> => {
    const user = await userService.deleteUser(name);
    return user;
}


/**
 * CONTROL LIGHT FUNCTIONS
 */
const turnLightOn = async (name: string, location: string): Promise<LightSource> => {
    const targetLightSource = await findLightSourceByNameAndLocation(name, location)

    const turnLightOnPrisma = await database.lightSources.update({
        where: {
            name_location: {
                name: name,
                location: location
            }
        },
        data: {
            status: true
        }
    });

    return LightSource.from(turnLightOnPrisma);
};

const turnLightOff = async (name: string, location: string): Promise<LightSource> => {
    const targetLightSource = await findLightSourceByNameAndLocation(name, location)
    
    const turnLightOffPrisma = await database.lightSources.update({
        where: {
            name_location: {
                name: name,
                location: location
            }
        },
        data: {
            status: false
        }
    });

    return LightSource.from(turnLightOffPrisma);
};

const changeBrightness = async (name: string, location: string, brightness: number): Promise<LightSource> => {
    const targetLightSource = await findLightSourceByNameAndLocation(name, location)
    targetLightSource.brightness = brightness;
    targetLightSource.status = brightness > 0;

    return targetLightSource;
}

/**
 * 
 * CONTROL SCENE FUNCTIONS
 * 
 */
const turnSceneOn = async (name: string): Promise<Scene> => {
    const targetScene = await findSceneByName(name)
    for (const lightSource of targetScene.lightSources) {
        const id = await getIdFromLightSource(lightSource.name, lightSource.location)
        database.lightSources.update({
            where: {
                id: id
            },
            data: {
                status: true
            }
        })
    }

    return targetScene;
}

const turnSceneOff = async (name: string): Promise<Scene> => {
    const targetScene = await findSceneByName(name)
    targetScene.lightSources.forEach((lightSource: LightSource) => {
        lightSource.status = false;
    })

    return targetScene;
}


export default {
    createControlPanel,

    addUser,
    addLightSource,
    addScene,

    deleteLightSource,
    deleteScene,
    deleteUser,

    findUserByName,
    findLightSourceByNameAndLocation,
    findSceneByName,

    getAllControlCenters,
    getAllUsers,
    getAllLightSources,
    getAllScenes,
    getIdFromLightSource,

    turnLightOn,
    turnLightOff,
    changeBrightness,

    turnSceneOn,
    turnSceneOff
}

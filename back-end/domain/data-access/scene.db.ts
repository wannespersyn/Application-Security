import { Scene } from "../model/scene";

//preliminary database
const scenes = [];

const createScene = ({name, activationTargets}: Scene): Scene => {
    //call constructor to validate
    const validation_scene = new Scene({
        name,
        activationTargets
    });
    scenes.push(validation_scene);
    return null;
} 

const getAllScenes = (): Scene[] => scenes;

export default {
    createScene,
    getAllScenes
}
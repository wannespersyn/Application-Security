import { User } from "../model/user";
import { LightSource } from "../model/lightSource";
import { Scene } from "../model/scene";
import { ControlCenter } from "../model/controlCenter";

//preliminary database
const controlCenters = [];

const createControlPanel = ({users, light_sources, scenes}: ControlCenter): ControlCenter => {
    //call constructor to validate
    const validation_controlCenter = new ControlCenter({
        users,
        light_sources,
        scenes
    });
    controlCenters.push(validation_controlCenter);
    return null;
}

const getWholeControlCenter = (): ControlCenter[] => controlCenters;

export default {
    createControlPanel,
    getWholeControlCenter
}
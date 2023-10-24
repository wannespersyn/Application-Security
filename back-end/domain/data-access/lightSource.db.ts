import { LightSource } from "../model/lightSource";

//preliminary database
const lightSources = [];

const createLightSource = ({name, location, brightness}: LightSource): LightSource => {
    //call constructor to validate
    const validation_lightSource = new LightSource({
        name,
        location,
        brightness
    });
    lightSources.push(validation_lightSource);
    return null;
};

const getAllLightSources = (): LightSource[] => lightSources;

export default {
    createLightSource,
    getAllLightSources
}


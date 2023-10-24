import lightSourceDb from "../domain/data-access/lightSource.db";
import { LightSource } from "../domain/model/lightSource";
import { LightSourceInput } from "../types";


const createLightSource = ({name, location, brightness}: LightSourceInput): LightSource => {
    const lightSource = new LightSource({name, location, brightness});
    return lightSourceDb.createLightSource(lightSource);
};

export default {
    createLightSource
};
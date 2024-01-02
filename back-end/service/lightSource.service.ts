import lightSourceDb from "../domain/data-access/lightSource.db";
import { LightSource } from "../domain/model/lightSource";
import { LightSourceInput } from "../types";


const createLightSource = ({name, location, brightness, status}: LightSourceInput): Promise<LightSource> => {
    const lightSource = new LightSource({name, location, brightness, status});
    return lightSourceDb.createLightSource(lightSource);
};

const deleteLightSource = (name: string, location: string): Promise<LightSource> => {
    return lightSourceDb.deleteLightSource(name, location);
}

export default {
    createLightSource,
    deleteLightSource
};
import lightSourceDb from "../domain/data-access/lightSource.db";
import { LightSource } from "../domain/model/lightSource";
import { LightSourceInput } from "../types";


let currentId = 1;

/**
 * Creates a new light source and adds it to the database.
 *
 * @param {LightSourceInput} param0 - Object containing the name, location, brightness, and status of the light source.
 * @returns {LightSource} The newly created light source object with the specified properties
 */
const createLightSource = ({name, location, brightness, status}: LightSourceInput): LightSource => {
    const lightSource = new LightSource({id: currentId++, name, location, brightness, status});
    return lightSourceDb.createLightSource(lightSource);
};

export default {
    createLightSource,
};
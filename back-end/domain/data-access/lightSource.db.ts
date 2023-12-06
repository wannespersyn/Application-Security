import { LightSource } from "../model/lightSource";

/** preliminary database **/
const lightSources = [];

/**
 * Creates a new light source and adds it to the database.
 *
 * @param {LightSource}
 * @returns {LightSource} The newly created light source.
 */
const createLightSource = ({id, name, location, brightness, status}: LightSource): LightSource => {
    //call constructor to validate
    const validation_lightSource = new LightSource({
        id,
        name,
        location,
        brightness,
        status
    });
    lightSources.push(validation_lightSource);
    return validation_lightSource;
};

/**
 * Gets all the light sources in the database.
 *
 * @returns {LightSource[]} An array containing all the light sources in the database.
 */
const getAllLightSources = (): LightSource[] => lightSources;

export default {
    createLightSource,
    getAllLightSources
}


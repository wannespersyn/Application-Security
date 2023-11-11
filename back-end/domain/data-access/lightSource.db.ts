import { LightSource } from "../model/lightSource";

/** preliminary database **/
const lightSources = [];

/**
 * Creates a new light source and adds it to the database.
 *
 * @param {LightSource}
 * @returns {LightSource} The newly created light source.
 */
const createLightSource = ({name, location, brightness, status}: LightSource): LightSource => {
    //call constructor to validate
    const validation_lightSource = new LightSource({
        name,
        location,
        brightness,
        status
    });
    lightSources.push(validation_lightSource);
    return null;
};

/**
 * Gets all the light sources in the database.
 *
 * @returns {LightSource[]} An array containing all the light sources in the database.
 */
const getAllLightSources = (): LightSource[] => lightSources;

/**
 * Turns on the specified light source.
 *
 * @param {string} name - The name of the light source to turn on.
 * @returns {LightSource} The light source that was turned on.
 */
const turnLightOn = (name: string): LightSource => {
    const targetLightSource = lightSources.find((lightSource) => lightSource.name === name)
    targetLightSource.status = true;

    return targetLightSource;
};

/**
 * Turns off the specified light source.
 *
 * @param {string} name - The name of the light source to turn off.
 * @returns {LightSource} The light source that was turned off.
 */
const turnLightOff = (name: string): LightSource => {
    const targetLightSource = lightSources.find((lightSource) => lightSource.name === name)
    targetLightSource.status = false;

    return targetLightSource;
};

/**
 * Changes the brightness of the specified light source.
 *
 * @param {string} name - The name of the light source to change brightness.
 * @param {number} brightness - The new brightness value for the light source.
 * @returns {LightSource} The light source with the updated brightness.
 */
const changeBrightness = (name: string, brightness: number): LightSource => {
    const targetLightSource = lightSources.find((lightSource) => lightSource.name === name)
    targetLightSource.brightness = brightness;

    return targetLightSource;
}

export default {
    createLightSource,
    getAllLightSources,
    turnLightOn,
    turnLightOff,
    changeBrightness
}


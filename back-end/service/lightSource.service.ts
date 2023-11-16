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

/**
 * Turn the light with the specified name on.
 *
 * @param {string} name - The name of the light source to turn on.
 * @returns {LightSource} The light source that was turned on, or null if not found.
 *
 * @throws {Error} If the light source with the specified name is not found.
 */
const turnLightOn = (name: string): LightSource => {
    const targetLightSource = lightSourceDb.getAllLightSources().find((lightSource) => lightSource.name === name)

    if (!targetLightSource) {
        throw new Error(`Light source '${name}' not found!`)
    }

    return lightSourceDb.turnLightOn(name)
};


/**
 * Turn the light with the specified name off.
 *
 * @param {string} name - The name of the light source to turn on.
 * @returns {LightSource} The light source that was turned on
 *
 * @throws {Error} If the light source with the specified name is not found.
 */
const turnLightOff = (name: string): LightSource => {
    const targetLightSource = lightSourceDb.getAllLightSources().find((lightSource) => lightSource.name === name)

    if (!targetLightSource) {
        throw new Error(`Light source '${name}' not found!`)
    }

    return lightSourceDb.turnLightOff(name);
};

/**
 * Change the brightness of the light with the specified name.
 *
 * @param {string} name - The name of the light source to turn on.
 * @param {number} brightness - The brightness that the light source should be.
 * @returns {LightSource} The light source that was turned on, or null if not found.
 *
 * @throws {Error} If the light source with the specified name is not found, or if the brightness is out of the valid range.
 */
const changeBrightnessLight= (name: string, brightness: number): LightSource | null => {
    const targetLightSource = lightSourceDb.getAllLightSources().find((lightSource) => lightSource.name === name)

    if (!targetLightSource) {
        throw new Error(`Light source '${name}' not found!`)
    }

    if (brightness > 100 || brightness < 0) {
        throw new Error("Brightness must be between 0 & 100 (inclusive)!")
    }

    return lightSourceDb.changeBrightness(name, brightness);
};

export default {
    createLightSource,
    turnLightOn,
    turnLightOff,
    changeBrightnessLight
};
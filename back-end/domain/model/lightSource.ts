export class LightSource {

    readonly name: string;
    readonly location: string;
    public brightness: number;
    public status: boolean;

    /**
     * Creates a new instance of the LightSource class.
     *
     * @param {Object} lightSource - An object containing the properties of the light source.
     * @param {string} lightSource.name - The name of the light source.
     * @param {string} lightSource.location - The location of the light source.
     * @param {number} lightSource.brightness - The brightness level of the light source (0 to 100).
     * @param {boolean} lightSource.status - The status of the light source (on/off).
     */
    constructor (lightSource: {name: string, location: string, brightness: number, status: boolean}) {
        this.validation(lightSource);

        this.name = lightSource.name;
        this.location = lightSource.location;
        this.brightness = lightSource.brightness;
        this.status = lightSource.status;
    }

    /**
     * Validates the properties of the light source.
     *
     * @param {Object} lightSource - An object containing the properties of the light source.
     * @param {string} lightSource.name - The name of the light source.
     * @param {string} lightSource.location - The location of the light source.
     * @param {number} lightSource.brightness - The brightness level of the light source (0 to 100).
     * @param {boolean} lightSource.status - The status of the light source (on/off).
     *
     * @throws {Error} If the brightness level is outside the valid range (0 to 100).
     */
    validation (lightSource: {name: string, location: string, brightness: number, status: boolean}) {

        if (lightSource.brightness > 100 || lightSource.brightness < 0) {
            throw new Error("Invalid brightness! Brightness has to be between 0 - 100")
        }
    }

}

export class LightSource {

    readonly name: string;
    readonly location: string;
    readonly brightness: number;
    readonly id: number;

    /**
     * constructor
     * 
     * @param lightSource 
     */
    constructor (lightSource: {name: string, location: string, brightness: number}) {
        this.validation(lightSource);

        this.name = lightSource.name;
        this.location = lightSource.location;
        this.brightness = lightSource.brightness;
    }

    /**
     * validator
     * 
     * @param lightSource 
     */
    validation (lightSource: {name, location, brightness}) {

        if (lightSource.brightness > 100 || lightSource.brightness < 0) {
            throw new Error("Invalid brightness! Brightness has to be between 0 - 100")
        }
    }

}
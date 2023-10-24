
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
        this.name = lightSource.name;
        this.location = lightSource.location;
        this.brightness = lightSource.brightness;
    }

}
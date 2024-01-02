import { LightSources as LightSourcePrisma } from "@prisma/client";


export class LightSource {

    readonly name: string;
    readonly location: string;
    readonly id: number;
    public brightness: number;
    public status: boolean;

    constructor (lightSource: {name: string, location: string, brightness: number, status: boolean}) {
        this.validate(lightSource);

        this.name = lightSource.name;
        this.location = lightSource.location;
        this.brightness = lightSource.brightness;
        this.status = lightSource.status;
    }

    validate (lightSource: {name: string, location: string, brightness: number, status: boolean}) {

        if (lightSource.brightness > 100 || lightSource.brightness < 0) {
            throw new Error("Invalid brightness! Brightness has to be between 0 - 100")
        }
    }

    static from({
        name,
        location,
        brightness,
        status
    }: LightSourcePrisma): LightSource {
        return new LightSource({
            name, 
            location,
            brightness,
            status
        })
    }

}
import { 
    Scene as ScenePrisma,
    LightSources as LightSourcePrisma,
    ControlCenter as ControlCenterPrisma
} from "@prisma/client";
import { LightSource } from "./lightSource";

export class Scene {

    readonly id?: number;
    readonly name: string;
    readonly lightSources: LightSource[];

    constructor (scene: { name: string, lightSources: LightSource[], controlCenterId?: number}) {
        this.validate(scene);

        this.name = scene.name;  
        this.lightSources = scene.lightSources;
    }

    validate(scene: { name: string, lightSources: LightSource[] }) {
        if (scene.name.length < 3) {
            throw new Error("Invalid name! Name has to be at least 1 character long")
        }

        if (scene.lightSources.length === 0) {
            throw new Error("No light sources found!");
        }
    }

    static from({ 
        name,
        lightSources,
        controlCenterId
     }: ScenePrisma & { lightSources: LightSourcePrisma[]}) {
        return new Scene({
            name,
            lightSources: lightSources.map((lightSource) => LightSource.from(lightSource)),
            controlCenterId
        })
    }

}
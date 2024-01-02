import { 
    Scene as ScenePrisma,
    LightSources as LightSourcePrisma
} from "@prisma/client";
import { LightSource } from "./lightSource";

export class Scene {

    readonly id?: number;
    readonly name: string;
    readonly lightSources: LightSource[];

    constructor (scene: { name: string, lightSources: LightSource[]}) {
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
        lightSources
     }: ScenePrisma & { lightSources: LightSourcePrisma[] }) {
        return new Scene({
            name,
            lightSources: lightSources.map((lightSource) => LightSource.from(lightSource))
        })
    }

}
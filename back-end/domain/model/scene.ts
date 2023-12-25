import { 
    Scene as ScenePrisma,
    LightSources as LightSourcePrisma
} from "@prisma/client";
import { LightSource } from "./lightSource";

export class Scene {

    readonly id?: number;
    readonly name: string;
    readonly lightSources: LightSource[];

    constructor (scene: {id: number, name: string, lightSources: LightSource[]}) {
        this.validate(scene);

        this.id = scene.id;
        this.name = scene.name;  
        this.lightSources = scene.lightSources;
    }

    validate(scene: { name: string, lightSources: Array<LightSource> }) {
        const pairs: string[] = [];
        if (scene.lightSources.length === 0) {
            throw new Error("No light sources found!");
        } else {}
        for (const target of scene.lightSources) {
            const pair = `${target.name}-${target.location}`;

            if (pairs.includes(pair)) {
                throw new Error("Duplicate light source found!");
            } else {
                pairs.push(pair);
            }
        }
    }

    static from({ 
        id,
        name,
        lightSources
     }: ScenePrisma & { lightSources: LightSourcePrisma[] }) {
        return new Scene({
            id,
            name,
            lightSources: lightSources.map((lightSource) => LightSource.from(lightSource))
        })
    }

}
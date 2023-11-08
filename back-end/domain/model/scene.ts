import { LightSource } from "./lightSource";

export class Scene {

    readonly name: string;
    readonly activationTargets: Array<LightSource>;

    readonly id: number;


    /**
     * constructor
     * 
     * @param scene 
     */
    constructor (scene: {name: string, activationTargets: Array<LightSource>}) {
        this.validation(scene);

        this.name = scene.name;  
        this.activationTargets = scene.activationTargets;
    }

    /**
     * validator
     * 
     * @param scene 
     */
    validation(scene: { name: string, activationTargets: Array<LightSource> }) {
        const pairs: string[] = [];

        for (const target of scene.activationTargets) {
            const pair = `${target.name}-${target.location}`;

            if (pairs.includes(pair)) {
                throw new Error("Duplicate light source found!");
            } else {
                pairs.push(pair);
            }
        }
    }
}
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
        this.name = scene.name;  
        this.activationTargets = scene.activationTargets;
    }
}
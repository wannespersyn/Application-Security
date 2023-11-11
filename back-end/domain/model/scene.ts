import { LightSource } from "./lightSource";

export class Scene {

    readonly name: string;
    readonly activationTargets: Array<LightSource>;

    readonly id: number;


    /**
     * Constructor for the Scene class.
     *
     * @param {object} scene - An object containing the name and activationTargets for the new scene.
     * @param {string} scene.name - The name of the scene.
     * @param {Array} scene.activationTargets - The lights that need to turn on.
     */
    constructor (scene: {name: string, activationTargets: Array<LightSource>}) {
        this.validation(scene);

        this.name = scene.name;  
        this.activationTargets = scene.activationTargets;
    }

    /**
     * Validates the scene by checking for duplicate light sources.
     *
     * @param {object} scene - An object containing the name and activationTargets for the new scene.
     * @throws {Error} If a duplicate light source is found.
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
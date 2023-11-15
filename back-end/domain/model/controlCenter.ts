import { LightSource } from "./lightSource";
import { User } from "./user";
import { Scene } from "./scene";


export class ControlCenter {
     
    public users: Array<User>;
    public light_sources: Array<LightSource>;
    public scenes: Array<Scene>;

    /**
     * Creates an instance of ControlCenter.
     *
     * @param {Object} controlCenter - An object containing arrays of users, light sources, and scenes.
     * @param {Array<User>} controlCenter.users - The array of users associated with the Control Center.
     * @param {Array<LightSource>} controlCenter.light_sources - The array of light sources associated with the Control Center.
     * @param {Array<Scene>} controlCenter.scenes - The array of scenes associated with the Control Center.
     */
    constructor (controlCenter: {users: Array<User>, light_sources: Array<LightSource>, scenes: Array<Scene>}) {
        this.users = controlCenter.users;
        this.light_sources = controlCenter.light_sources;
        this.scenes = controlCenter.scenes;
    }
}
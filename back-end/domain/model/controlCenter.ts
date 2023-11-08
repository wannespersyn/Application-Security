import { LightSource } from "./lightSource";
import { User } from "./user";
import { Scene } from "./scene";


export class ControlCenter {
     
    readonly users: Array<User>;
    readonly light_sources: Array<LightSource>;
    readonly scenes: Array<Scene>;

   /**
    * constructor
    * 
    * @param controlCenter 
    */
    constructor (controlCenter: {users: Array<User>, light_sources: Array<LightSource>, scenes: Array<Scene>}) {
        this.users = controlCenter.users;
        this.light_sources = controlCenter.light_sources;
        this.scenes = controlCenter.scenes;
    }

    /**
     * 
     * @param user 
     */
    addUserToControlCenter(user: User) {
        if (this.users.includes(user)) {
            throw new Error("User is already in control center!");
        }
        this.users.push(user);
    }

    /**
     * 
     * @param light_source 
     */
    addLightSourceToControlCenter(light_source: LightSource) {
        if (this.light_sources.includes(light_source)) {
            throw new Error("Light source is already in control center!")
        }
        this.light_sources.push(light_source);
    }

    /**
     * 
     * @param scene 
     */
    addScenesToControlCenter(scene: Scene) {
        if (this.scenes.includes(scene)) {
            throw new Error("Scene is already in control center!")
        }
        this.scenes.push(scene);
    }
}
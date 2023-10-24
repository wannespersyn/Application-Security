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
}
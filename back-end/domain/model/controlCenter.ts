import { LightSource } from "./lightSource";
import { User } from "./user";
import { Scene } from "./scene";
import userService from "../../service/user.service";
import lightSourceService from "../../service/lightSource.service";
import sceneService from "../../service/scene.service";


export class ControlCenter {
     
    public users: User[] = [];
    public light_sources: LightSource[] = [];
    public scenes: Scene[] = [];
    
    /**
     * Creates an instance of ControlCenter.
     *
     */
    constructor () {
        this.users = [new User({id: 0, name: "admin", admin: true, password: "Admin123!"})];
    }
}
import { LightSource } from "./lightSource";
import { User } from "./user";
import { Scene } from "./scene";
import { 
    ControlCenter as ControlCenterPrisma 
} from "@prisma/client";


export class ControlCenter {
    
    readonly id: number;
    readonly name: string;

    public users: User[] = [];
    public light_sources: LightSource[] = [];
    public scenes: Scene[] = [];
    
    constructor (name: string) {
        this.name = name;
        this.users = [new User({id: 0, name: "admin", admin: true, password: "Admin123!"})];
    }
    
    static from({
            name,
        }: ControlCenterPrisma) {
        return new ControlCenter(
            name
        )
    }

}
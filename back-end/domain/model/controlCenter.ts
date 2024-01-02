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
        this.validate({name});

        this.name = name;
    }

    validate (controlCenter: {name: string}) {
        if (controlCenter.name.length < 3) {
            throw new Error("Invalid name! Name has to be at least 3 characters long")
        }
    }
    
    static from({
            name,
        }: ControlCenterPrisma) {
        return new ControlCenter(
            name
        )
    }

}
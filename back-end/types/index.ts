/***
 * 
 *  DTO's
 * 
***/

import { type } from "os";
import { LightSource } from "../domain/model/lightSource";
import { User } from "../domain/model/user";
import { Scene } from "../domain/model/scene";

type UserInput = {
    id?: number;
    name?: string;
    password?: string;
    admin?: boolean;
}

type LightSourceInput = {
    name: string;
    location: string;
    brightness: number;
    status: boolean;
}

type SceneInput = {
    name: string;
    activationTargets: LightSource[];
}

type ControlCenterInput= {
    users: User[];
    light_sources: LightSource[];
    scenes: Scene[];
}

export {
    UserInput,
    LightSourceInput,
    SceneInput,
    ControlCenterInput
}
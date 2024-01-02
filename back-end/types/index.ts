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
    name: string;
    password: string;
    admin?: boolean;
}

type LightSourceInput = {
    id?: number;
    name: string;
    location: string;
    brightness?: number;
    status?: boolean;
}

type SceneInput = {
    id?: number;
    name: string;
    lightSources: LightSource[];
}

type ControlCenterInput = {
    id?: number;
    name: string;
    users?: User[];
    light_sources?: LightSource[];
    scenes?: Scene[];
}

type AuthenticationResponse = {
    token: string;
    name: string;
    admin: boolean;
}

export {
    UserInput,
    LightSourceInput,
    SceneInput,
    ControlCenterInput,
    AuthenticationResponse
}
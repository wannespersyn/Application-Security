export type LightSource = {
    id: number;
    name: string;
    location: string;
    status: boolean;
    brightness: number;
};

export type Scene = {
    id: number;
    name: string;
    lightSources: LightSource[];
};

export type StatusMessage = {
    message: string;
    type: "error" | "success";
    
};

export type User = {
    id?: number;
    name: string;
    password: string;
    admin?: boolean;
    token?: string;
};
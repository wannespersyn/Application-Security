export type LightSource = {
    id: number;
    name: string;
    location: string;
    status: string;
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
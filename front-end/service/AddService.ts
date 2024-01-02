import { LightSource } from "@/types";

const addNewLight = async (name: string, location: string) => {
    const sessionData = sessionStorage.getItem("loggedInUser");
    if (!sessionData) {
        return { message: "You need to be logged in to add a new light source", type: "error" };
    }
    const token = JSON.parse(sessionData)?.token;

   return fetch(process.env.NEXT_PUBLIC_API_URL + '/controlCenter/addLightSource', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            name,
            location,
            brightness: 0,
            status: false,
        })
    });
}

const addNewScene = async (name: string, lightSources: LightSource[]) => {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/controlCenter/addScene', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,
            lightSources,
        })
    });
    return response.json();
}

const AddService = {
    addNewLight,
    addNewScene
}

export default AddService;
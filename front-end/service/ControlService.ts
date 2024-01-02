import { User } from "@/types";

const getAllLightSources = () => {
    const token = JSON.parse(sessionStorage.getItem('loggedInUser') || '')?.token;

    return fetch(process.env.NEXT_PUBLIC_API_URL + '/controlcenter/getAllLightSources', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token.token}`
        },
    });
}

const getAllScenes = () => {
    const token = JSON.parse(sessionStorage.getItem('loggedInUser') || '')?.token;

    return fetch(process.env.NEXT_PUBLIC_API_URL + '/controlcenter/getAllScenes', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token.token}`
        }
    });
}

const getAllUsers = () => {
    const token = JSON.parse(sessionStorage.getItem('loggedInUser') || '')?.token;

    return fetch(process.env.NEXT_PUBLIC_API_URL + '/controlcenter/getAllUsers', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token.token}`
        }
    });
}

const getLightSourceByNameAndLocation = async (name: string, location: string) => {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/controlcenter/getSpecificLighSource?name=${name}&location=${location}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application.json'
        }
    });
    return response;
}

const getIdLightSource = async (name: string, location: string) => {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/controlcenter/getIdLightSource?name=${name}&location=${location}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application.json'
        }
    });
    return response.json();
}

const TurnSceneOn = async (name: string) => {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/controlcenter/turnSceneOn?name=${name}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application.json'
        }
    });
    return response;
}

const login = ({name, password}: User) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/controlCenter/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,
            password
        })
    });
}


const ControlService = {
    getAllLightSources,
    getAllScenes,
    getLightSourceByNameAndLocation,
    getIdLightSource,
    getAllUsers,
    login
}

export default ControlService;

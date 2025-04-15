import { LightSource } from "@/types";


const addNewLight = async (name: string, location: string) => {
   const token = JSON.parse(sessionStorage.getItem('loggedInUser') || '')?.token;

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

const addNewScene = (name: string, lightSources: LightSource[]) => {
    const token = JSON.parse(sessionStorage.getItem('loggedInUser') || '')?.token;

    return fetch(process.env.NEXT_PUBLIC_API_URL + '/controlCenter/addScene', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token.token}`
        },
        body: JSON.stringify({
            name,
            lightSources
        })
    });
}

const AddService = {
    addNewLight,
    addNewScene,
}

export default AddService;
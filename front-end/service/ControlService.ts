const getAllLightSources = async () => {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/controlcenter/getAllLightSources', {
        method: 'GET',
        headers: {
            'Content-Type': 'application.json'
        }
    });
    return response.json();
}

const getAllScenes = async () => {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/controlcenter/getAllScenes', {
        method: 'GET',
        headers: {
            'Content-Type': 'application.json'
        }
    });
    return response;
}

const ControlService = {
    getAllLightSources,
    getAllScenes
}

export default ControlService;

const DeleteLight = async (name: string, location: string) => {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + 
            `/controlCenter/deleteLightSource?name=${name}&location=${location}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
    });
    return response.json();
}

const DeleteScene = async (name: string) => {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + 
            `/controlCenter/deleteScene?name=${name}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
    });
    return response.json();
}

const DeleteUser = async (name: string) => {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + 
            `/controlCenter/deleteUser?name=${name}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
    });
    return response.json();
}

const DeleteService = {
    DeleteLight,
    DeleteScene,
    DeleteUser
}

export default DeleteService;
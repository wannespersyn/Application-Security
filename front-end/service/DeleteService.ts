const DeleteLight =  (name: string, location: string) => {
    const token = JSON.parse(sessionStorage.getItem('loggedInUser') || '')?.token;

    return fetch(process.env.NEXT_PUBLIC_API_URL + 
            `/controlCenter/deleteLightSource?name=${name}&location=${location}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token.token}`
        },
        body: JSON.stringify({})
    });
}

const DeleteScene = (name: string) => {
    const token = JSON.parse(sessionStorage.getItem('loggedInUser') || '')?.token;
    
    return fetch(process.env.NEXT_PUBLIC_API_URL + 
            `/controlCenter/deleteScene?name=${name}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token.token}`
        },
        body: JSON.stringify({})
    });
}

const DeleteUser = (name: string) => {
    const token = JSON.parse(sessionStorage.getItem('loggedInUser') || '')?.token;

    return fetch(process.env.NEXT_PUBLIC_API_URL + 
            `/controlCenter/deleteUser?name=${name}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token.token}`
        },
        body: JSON.stringify({})
    });
}

const DeleteService = {
    DeleteLight,
    DeleteScene,
    DeleteUser
}

export default DeleteService;
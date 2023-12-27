const addNewLight = async (name: string, location: string) => {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/controlCenter/addLightSource', {
        method: 'POST',
        headers: {
            'Content-Type': 'application.json'
        },
        body: JSON.stringify({
            name,
            location,
            brightness: 0,
            status: false
        })
    });
    return response.json();
}
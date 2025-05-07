import { User } from "@/types";

const login = ({name, password}: User) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/authentication/login`, {
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

const Register = async ({ name, password, captcha }: User): Promise<any> => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/authentication/signUp`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                password,
                captcha,
                admin: false,
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        console.log("Registration successful:", response.statusText);
        console.log("Response:", response);
        

        return response;
    } catch (error) {
        console.error("Registration failed:", error);
        throw error; 
    }
};


const AuthenticationService = {
    login,
    Register
}

export default AuthenticationService;
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

const Register = ({name , password}: User) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/authentication/signUp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name,
            password,
            admin: false,
        })
    });
}

const AuthenticationService = {
    login,
    Register
}

export default AuthenticationService;
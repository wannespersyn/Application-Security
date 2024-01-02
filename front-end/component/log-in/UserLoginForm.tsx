import { StatusMessage } from "@/types";
import { useRouter } from "next/router";
import classNames from "classnames";
import React, { useState } from "react";
import ControlService from "@/service/ControlService";

const UserLoginForm: React.FC = () => {
    const [name, setUsername] = useState('');
    const [nameError, setNameError] = useState("");
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState("");
    const [statusMessage, setStatusMessage] = useState<StatusMessage[]>([]);
    const router = useRouter();

    const clearErros = () => {
        setNameError("");
        setPasswordError("");
        setStatusMessage([]);
    }

    const validate = (): boolean => {
        let result = true;

        if (!name && name.trim() === '') {
            setNameError("Name is required");
            result = false;
        }

        if (!password && password.trim() === '') {
            setPasswordError("Password is required");
            result = false;
        }

        return result;
    }

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        clearErros();

        if (validate() == false) {
            return;
        }

        const user = {name, password};
        const response = await ControlService.login(user);

        if (response.status === 200) {
            setStatusMessage([{message: `Login succesful! Redirecting to homepage...`, type: "success"}])
            const user = await response.json();

            sessionStorage.setItem(
                'loggedInUser',
                JSON.stringify({
                    token: user.token,
                    name: user.name,
                })
            ),
            setTimeout(() => { router.push("/"); }, 2000);
        } else if (response.status === 401) {
            const { errorMessage }  = await response.json();
            setStatusMessage([{message: errorMessage, type: "error"}]);
        } else {
            setStatusMessage([{message: "An error occurred. Try again later.", type: "error"}]);
        }

    };

    return (
        <>
            <h2 className="font-medium text-xl text-center">Login</h2>
            {statusMessage && (
                <div className="w-1/3 mx-auto">
                    <ul className="list-none mb-3 mx-auto">
                        {statusMessage.map(({message, type}, index) => (
                            <li key={index}
                                className={classNames({
                                    "text-green-800": type === "success",
                                    "text-red-800": type === "error"
                                })}>
                                    {message}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <div className="w-1/2 mx-auto">
                <form onSubmit={handleSubmit}>
                    <div>
                        <input
                            className="input"
                            type="text"
                            id="usernameInput"
                            value={name}
                            onChange={(event) => setUsername(event.target.value)}
                            placeholder="Username"
                        />
                        {nameError && (
                            <div className="text-red-800"> {nameError} </div>
                        )}
                        <input
                            className="input"
                            type="text"
                            id="passwordInput"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            placeholder="Password"
                        />
                        {passwordError && (
                            <div className="text-red-800"> {passwordError} </div>
                        )}
                    </div>

                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded mx-auto" 
                        type="submit">
                        Login
                    </button>

                </form>
        </div>
        </>
    );
}

export default UserLoginForm;
import { StatusMessage } from "@/types";
import { useRouter } from "next/router";
import classNames from "classnames";
import React, { useState } from "react";

const UserLoginForm: React.FC = () => {
    const [username, setUsername] = useState('');
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

        if (!username && username.trim() === '') {
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

        setStatusMessage([{message: `Login succesful! Redirecting to homepage...`, type: "success"}])

        sessionStorage.setItem("loggedInUser", username);

        setTimeout(() => { router.push("/"); }, 2000);
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
                            value={username}
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
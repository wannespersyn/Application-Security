import { StatusMessage } from "@/types";
import { useRouter } from "next/router";
import classNames from "classnames";
import React, { useState } from "react";
import ControlService from "@/service/ControlService";
import { useTranslation } from "next-i18next";

const UserLoginForm: React.FC = () => {
    const [name, setUsername] = useState('');
    const [nameError, setNameError] = useState("");
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState("");
    const [statusMessage, setStatusMessage] = useState<StatusMessage[]>([]);
    const { t } = useTranslation();
    const router = useRouter();

    const clearErros = () => {
        setNameError("");
        setPasswordError("");
        setStatusMessage([]);
    }

    const validate = (): boolean => {
        let result = true;

        if (!name && name.trim() === '') {
            setNameError(t("error.username.required"));
            result = false;
        }

        if (!password && password.trim() === '') {
            setPasswordError(t("error.password.required"));
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
            setStatusMessage([{message: `${t("login.succes")}`, type: "success"}])
            const user = await response.json();
            console.log(JSON.stringify({
                token: user.token,
                name: user.name,
                admin: user.admin,
            }));
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
            setStatusMessage([{message:  `${t("login.error")}`, type: "error"}]);
        }

    };

    return (
        <>
            <h2 className="font-medium text-xl text-center">{t("login.title")}</h2>
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
                            placeholder={t("login.username")}
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
                            placeholder={t("login.password")}
                        />
                        {passwordError && (
                            <div className="text-red-800"> {passwordError} </div>
                        )}
                    </div>
                    <div className="w-full text-center pb-1">
                        <a 
                            href="/login/register"
                            className="inline-bloc hover:underline font-medium">
                                {t("login.register")}
                        </a>          
                    </div>

                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded mx-auto" 
                        type="submit">
                            {t("login.login")}
                    </button>
                </form>
        </div>
        </>
    );
}

export default UserLoginForm;
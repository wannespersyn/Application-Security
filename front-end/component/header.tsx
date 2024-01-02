import i18next from "i18next";
import Link from "next/link";
import React, { useEffect } from "react";
import { useState } from "react";
import LanguageSwitcher from "./languageSwitcher";
import { t } from "i18next"
import { useRouter } from "next/router";

const Header: React.FC = () => {
    const [loggedInUser, setLoggedInUser] = useState<String | null>(null);
    const router = useRouter();

    useEffect(() => {
        setLoggedInUser(sessionStorage.getItem("loggedInUser"));
    }, []);

    const handleClick = () => {
        sessionStorage.removeItem("loggedInUser");
        setLoggedInUser(null);
        router.push("/login");
    };

    return (
        <>
            <header className="mx-auto bg-gray-800 py-4 text-white">
                <nav className="m-5 md:flex md:items-start md:justify-between">
                    <div className="text-2xl">
                        <span>
                            <img className="h-10 inline" src="/logo.png" alt="logo" />
                            Control Home Center
                        </span>
                    </div>
                    <ul className="uppercase flex justify-between gap-10 mr-16 md:items-center m-auto">
                        <li>
                            <a href="/">Home</a>
                        </li>
                        <li>
                            <a href="/controlLights">{t('lights')}</a>
                        </li>
                        <li>
                            <a href="/controlScenes">Scenes</a>
                        </li>
                        <li>
                            <a href="/SystemManagement">{t('system.management')}</a>
                        </li>
                        {!loggedInUser && (
                            <li>
                                <a href="/login">Login</a>
                            </li>
                        )}
                        {loggedInUser && (
                            <li>
                                <a
                                    href="#"
                                    onClick={handleClick}>
                                    Logout
                                </a>
                            </li>
                            )}
                       
                    </ul>
                    <LanguageSwitcher />
                </nav>
            </header>
        </>
    );
}

export default Header;
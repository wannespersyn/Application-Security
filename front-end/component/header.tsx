import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import Language from "./Language";

const Header: React.FC = () => {
    const [loggedInUser, setLoggedInUser] = useState<string | null>(null);
    const router = useRouter();
    const { t } = useTranslation();

    useEffect(() => {
        setLoggedInUser(sessionStorage.getItem("loggedInUser"));
    }, []);

    const handleClick = () => {
        sessionStorage.removeItem("loggedInUser");
        setLoggedInUser(null);
        router.push("/login");
    };

    return (
            <header className="mx-auto bg-gray-800 py-4 text-white">
                <nav className="m-5 md:flex md:items-start md:justify-between">
                    <div className="text-2xl">
                        <span>
                            <img className="h-10 inline" src="/logo.png" alt="logo" />
                            {t("header.title")}
                        </span>
                    </div>
                    <ul className="uppercase flex justify-between gap-10 mr-16 md:items-center m-auto">
                        <li>
                            <a href="/">{t("header.home")}</a>
                        </li>
                        <li>
                            <a href="/controlLights">{t('header.lights')}</a>
                        </li>
                        <li>
                            <a href="/controlScenes">{t("header.scenes")}</a>
                        </li>
                        <li>
                            <a href="/SystemManagement">{t("header.system.management")}</a>
                        </li>
                        {!loggedInUser && (
                            <li>
                                <a href="/login">{t("header.login")}</a>
                            </li>
                        )}
                        {loggedInUser && (
                            <li>
                                <button
                                    onClick={handleClick}>
                                    {t("header.logout")}
                                </button>
                            </li>
                            )}
                    </ul>
                    <Language />
                </nav>
            </header>
    );
}

export default Header;
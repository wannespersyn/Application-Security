import { useTranslation } from "next-i18next";
import Link from "next/link";
import React from "react";
import { FaLightbulb, FaSlidersH, FaCog } from "react-icons/fa";


const OptionsOverview: React.FC = () => {
    const { t } = useTranslation();
    return (
        <>
            <h2 className="col-span-3 text-xl">{t("home.get.started")}</h2>
            <Link href="/controlLights">
                <section className="options mx-auto">
                    <FaLightbulb className="size-12 w-full"/>
                    <h3>{t("home.control.lights")}</h3>
                </section>
            </Link>
            <Link href="/controlScenes">
                <section className="options mx-auto ">
                <FaSlidersH className="size-12 w-full" />
                    <h3>{t("home.control.scenes")}</h3>
                </section>
            </Link>
            <Link href="/SystemManagement">
                <section className="options mx-auto">
                <FaCog className="size-12 w-full"/>
                    <h3>{t("home.system.management")}</h3>
                </section>
            </Link>
        </>
    );
}

export default OptionsOverview;
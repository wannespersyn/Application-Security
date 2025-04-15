import { useTranslation } from "next-i18next";
import Link from "next/link";
import React from "react";
import { FaLightbulb, FaSlidersH, FaCog } from "react-icons/fa";


const OptionsOverview: React.FC = () => {
    const { t } = useTranslation();
    return (
        <section className="grid grid-cols-3 gap-8 mx-16 mt-8">

            {/* Light Control Option */}
            <Link href="/controlLights">
                <section className="options bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
                    <FaLightbulb className="text-5xl text-yellow-500 mx-auto mb-4"/>
                    <h3 className="text-lg text-center font-semibold">{t("home.control.lights")}</h3>
                </section>
            </Link>

            {/* Scenes Control Option */}
            <Link href="/controlScenes">
                <section className="options bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
                    <FaSlidersH className="text-5xl text-blue-500 mx-auto mb-4" />
                    <h3 className="text-lg text-center font-semibold">{t("home.control.scenes")}</h3>
                </section>
            </Link>

            {/* System Management Option */}
            <Link href="/SystemManagement">
                <section className="options bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
                    <FaCog className="text-5xl text-gray-600 mx-auto mb-4" />
                    <h3 className="text-lg text-center font-semibold">{t("home.system.management")}</h3>
                </section>
            </Link>
        </section>
    );
};


export default OptionsOverview;
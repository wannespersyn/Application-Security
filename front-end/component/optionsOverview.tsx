import Link from "next/link";
import React from "react";
import { FaLightbulb, FaSlidersH, FaCog } from "react-icons/fa";


const OptionsOverview: React.FC = () => {
    return (
        <>
            <h2 className="col-span-3 text-xl">Get Started!</h2>
            <Link href="/controlLights">
                <section className="options mx-auto">
                    <FaLightbulb className="size-12 w-full"/>
                    <h3>Control Lights</h3>
                </section>
            </Link>
            <Link href="/controlScenes">
                <section className="options mx-auto ">
                <FaSlidersH className="size-12 w-full" />
                    <h3>Control scenes</h3>
                </section>
            </Link>
            <Link href="/SystemManagement">
                <section className="options mx-auto">
                <FaCog className="size-12 w-full"/>
                    <h3>System management</h3>
                </section>
            </Link>
        </>
    );
}

export default OptionsOverview;
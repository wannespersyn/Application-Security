import Link from "next/link";
import React from "react";

const Header: React.FC = () => {
    return (
        <header className="bg-slate-400">
            <h1>Home Control Center</h1>
            <nav>
                <Link href="/controlLights">
                    Lights
                </Link>
                <Link href="/controlScenes">
                    Scenes
                </Link>
            </nav>
        </header>
    );
}

export default Header;
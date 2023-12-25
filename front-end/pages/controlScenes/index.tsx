import React, { useState, useEffect } from 'react';
import { Scene } from "../../types";
import Head from 'next/head';
import ControlService from '../../service/ControlService';
import ControlScene from '@/component/control/ControlScene';
import Header from '@/component/header';

const controlScenes: React.FC = () => {
    const [scenes, setScenes] = useState<Scene[]>([]);

    const getAllScenes = async () => {
        setScenes(await ControlService.getAllScenes());
    };
    

    useEffect(() => {
        getAllScenes()
        }, []
    );

    return (
        <>
            <Head>
                <title>Control Home Center</title>
            </Head>
            <Header></Header>
            <main>
                <h1>Control</h1>
                <section>
                    {scenes.length > 0 && (
                        <ControlScene scenes={scenes} />
                    )}
                </section>
            </main>
        </>
    );
};

export default controlScenes;

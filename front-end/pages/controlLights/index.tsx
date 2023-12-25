import React, { useState, useEffect } from 'react';
import { LightSource } from "@/types";
import ControlLight from '@/component/control/ControlLight';
import Head from 'next/head';
import ControlService from '@/service/ControlService';
import Header from '@/component/header';


const ControlLights: React.FC = () => {
    const [lightSources, setLightSources] = useState<LightSource[]>([]);

    const getAllLightSources = async () => {
        setLightSources(await ControlService.getAllLightSources());
    };
    

    useEffect(() => {
        getAllLightSources()
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
                    {lightSources.length > 0 && (
                        <ControlLight lightSources={lightSources} />
                    )}
                </section>
            </main>
        </>
    );
};

export default ControlLights;

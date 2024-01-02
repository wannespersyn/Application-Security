import React, { useState, useEffect } from 'react';
import { LightSource } from "@/types";
import LightsOverview from '@/component/control/LightsOverview';
import Head from 'next/head';
import ControlService from '@/service/ControlService';
import Header from '@/component/header';
import useSWR, { mutate } from 'swr';
import { get } from 'http';
import useInterval from 'use-interval';


const ControlLights: React.FC = () => {
    const [StatusError, setStatusError] = useState<string | null>(null);
    const [lightSources, setLightSources] = useState<LightSource[]>([]);

    const getAllLightSources = async () => {
        setStatusError("");
        
        const responses = await ControlService.getAllLightSources();

        if (!responses.ok) {
            if (responses.status === 401) {
                setStatusError(
                    'You are not authorized to view this page. Please login first.');
            } else {
                setStatusError(responses.statusText);
            }
        } else {
            const lightSourcesData = await responses.json();
            setLightSources(lightSourcesData);
        }
    };

    const {data, isLoading, error} = useSWR(
        'controlLights', 
        getAllLightSources
    ); 
    

    return (
        <>
            <Head>
                <title>Control Home Center</title>
            </Head>
            <Header />
            <main className='grid grid-cols-5'>
                <section className='col-start-2 col-span-3 my-10'>
                    <h2 className=' text-black font-medium text-3xl text-center'>Control Lights</h2>
                    {error && <div>{error}</div>}
                    {StatusError && <div>{StatusError}</div>}
                    {isLoading && <div>Loading...</div>}
                    <section className='grid grid-cols-3 gap-5'>
                        {lightSources && (
                            <LightsOverview lightSources={lightSources} />
                        )}
                    </section>
                </section>
            </main>
        </>
    );
};

export default ControlLights;

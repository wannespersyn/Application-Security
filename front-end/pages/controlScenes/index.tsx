import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import ControlService from '../../service/ControlService';
import Header from '@/component/header';
import useInterval from 'use-interval';
import useSWR, { mutate } from 'swr';
import SceneOverview from '@/component/control/SceneOverview';

const controlScenes: React.FC = () => {

    const getAllScenes = async () => {

        const responses = await Promise.all([
            ControlService.getAllScenes()
        ]);
        
        const [scenesResponse] = responses;
        const scene = await scenesResponse.json();

        return {
            scene
        }
    };

    const {data, isLoading, error} = useSWR(
        'controlScenes', 
        getAllScenes
    );

    //Refresh scenes every 5 seconds
    useInterval(() => {
        mutate('controlScenes', getAllScenes());
    }, 5000);

    return (
        <>
            <Head>
                <title>Control Home Center</title>
            </Head>
            <Header />
            <main className='grid grid-cols-5'>
                <section className='col-start-2 col-span-3 my-10'>
                    <h2 className=' text-black font-medium text-3xl text-center'>Control Scenes</h2>
                    {error && <div>{error}</div>}
                    {isLoading && <div>Loading...</div>}
                    <section className='grid grid-cols-3 gap-5'>
                        {data && (
                            <SceneOverview scenes={data.scene} />
                        )}
                    </section>
                </section>
            </main>
        </>
    );
};

export default controlScenes;

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import ControlService from '../../service/ControlService';
import Header from '@/component/header';
import useInterval from 'use-interval';
import useSWR, { mutate } from 'swr';
import SceneOverview from '@/component/control/SceneOverview';
import { Scene } from '@/types';

const controlScenes: React.FC = () => {
    const [StatusError, setStatusError] = useState<string | null>(null);
    const [scenes, setScenes] = useState<Scene[]>([]);

    const getAllScenes = async () => {
        setStatusError("");

        const responses = await ControlService.getAllScenes();
        
        if (!responses.ok) {
            if (responses.status === 401) {
                setStatusError(
                    'You are not authorized to view this page. Please login first.');
            } else {
                setStatusError(responses.statusText);
            }
        } else {
            const scenesData = await responses.json();
            setScenes(scenesData);
        }
    };

    const {data, isLoading, error} = useSWR(
        'controlScenes', 
        getAllScenes
    );

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
                        {scenes && (
                            <SceneOverview scenes={scenes} />
                        )}
                    </section>
                </section>
            </main>
        </>
    );
};

export default controlScenes;

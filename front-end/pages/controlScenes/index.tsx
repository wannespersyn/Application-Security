import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import ControlService from '../../service/ControlService';
import Header from '@/component/header';
import useInterval from 'use-interval';
import useSWR, { mutate } from 'swr';
import SceneOverview from '@/component/control/SceneOverview';
import { Scene, StatusMessage } from '@/types';
import { useTranslation } from 'next-i18next';
import classNames from 'classnames';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const controlScenes: React.FC = () => {
    const [StatusError, setStatusError] = useState<string | null>(null);
    const [scenes, setScenes] = useState<Scene[]>([]);
    const [statusMessage, setStatusMessage] = useState<StatusMessage[]>([]);
    const { t } = useTranslation();

    const getAllScenes = async () => {
        setStatusMessage([]);

        const responses = await ControlService.getAllScenes();
        
        if (responses === undefined) {
            setStatusMessage([{message: t('error.unauthorized'), type: 'error'}]);
        } else {
            if (!responses.ok) {
                if (responses.status === 401) {
                    setStatusMessage([{message: t('error.unauthorized'), type: 'error'}]);
                } else {
                    setStatusMessage([{message: responses.statusText, type: 'error'}]);
                }
            } else {
                const scenesData = await responses.json();
                setScenes(scenesData);
            }
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
                {statusMessage && (
                    <div className="w-1/3 mx-auto">
                        <ul className="list-none mb-3 mx-auto">
                            {statusMessage.map(({message, type}, index) => (
                                <li key={index}
                                    className={classNames({
                                        "text-green-800": type === "success",
                                        "text-red-800": type === "error"
                                    })}>
                                        {message}
                                </li>
                            ))}
                        </ul>
                    </div>
                    )}
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

export const getServerSideProps = async (context: any) => {
    const { locale } = context;
  
    return {
        props: {
            ...(await serverSideTranslations(locale ?? "en", ["common"])),
        },
    };
  };

export default controlScenes;

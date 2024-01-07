import React, { useState, useEffect } from 'react';
import { LightSource, StatusMessage } from "@/types";
import LightsOverview from '@/component/control/LightsOverview';
import Head from 'next/head';
import ControlService from '@/service/ControlService';
import Header from '@/component/header';
import useSWR, { mutate } from 'swr';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import classNames from 'classnames';


const ControlLights: React.FC = () => {
    const [StatusError, setStatusError] = useState<string | null>(null);
    const [lightSources, setLightSources] = useState<LightSource[]>([]);
    const [statusMessage, setStatusMessage] = useState<StatusMessage[]>([]);

    const { t } = useTranslation();

    const getAllLightSources = async () => {
        setStatusMessage([]);
        
        const responses = await ControlService.getAllLightSources();
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
                const lightSourcesData = await responses.json();
                setLightSources(lightSourcesData);
            }
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
                    {error && <div>{error}</div>}
                    {isLoading && <div>Loading...</div>}
                    <h2 className=' text-black font-medium text-3xl text-center'>{t("lights.title")}</h2>
                    <section className='grid grid-cols-3 gap-5'>
                        {lightSources && (
                            <LightsOverview/>
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

export default ControlLights;

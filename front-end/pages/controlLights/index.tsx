import React, { useState } from 'react';
import { LightSource, StatusMessage } from "@/types";
import LightsOverview from '@/component/control/LightsOverview';
import Head from 'next/head';
import ControlService from '@/service/ControlService';
import Header from '@/component/header';
import useSWR from 'swr';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import StatusMessageComponent from '@/component/statusMessageComponent';


const ControlLights: React.FC = () => {
    const [lightSources, setLightSources] = useState<LightSource[]>([]);
    const [statusMessage, setStatusMessage] = useState<StatusMessage[]>([]);
    const { t } = useTranslation();

    const getAllLightSources = async () => {
        setStatusMessage([]);
        
        const responses = await ControlService.getAllLightSources();
        if (responses === undefined) {
            setStatusMessage([{message: t('error.unauthorized'), type: 'error'}]);
        } else if (!responses.ok)  {
            if (responses.status === 401) {
                setStatusMessage([{message: t('error.unauthorized'), type: 'error'}]);
            } else {
                setStatusMessage([{message: responses.statusText, type: 'error'}]);
            }
        } else {
            const lightSourcesData = await responses.json();
            setLightSources(lightSourcesData);
        }
    };

    const {isLoading, error} = useSWR(
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
                        <StatusMessageComponent message={statusMessage} />
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

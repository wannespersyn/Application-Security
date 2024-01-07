import React, { use, useEffect, useState } from 'react';
import { LightSource } from '../../types';
import { FaLightbulb } from 'react-icons/fa';
import { useTranslation } from 'next-i18next';
import ControlService from '@/service/ControlService';
import { get } from 'https';
import useInterval from 'use-interval';

const LightsOverview: React.FC = () => {
    const [StatusError, setStatusError] = useState<string | null>(null);
    const [lightSources, setLightSources] = useState<LightSource[]>([]);
    const { t } = useTranslation();

    const getAllLightSources = async () => {
        
        const responses = await ControlService.getAllLightSources();

        if (responses === undefined) {
            setStatusError(
                t('error.no.response'));
        } else {
            if (!responses.ok) {
                checkStatus(responses);
            } else {
                const lightSourcesData = await responses.json();
                setLightSources(lightSourcesData);
            }
        }
    };

    const TurnLightOn = async (lightSource: LightSource) => {
        const responses = await ControlService.turnLightOn(lightSource.name, lightSource.location);

        if (!responses.ok) {
            checkStatus(responses);
        } else {
            console.log(await responses.json());
        }
    }

    const TurnLightOff = async (lightSource: LightSource) => {
        const responses = await ControlService.turnLightOff(lightSource.name, lightSource.location);

        if (!responses.ok) {
            checkStatus(responses);
        } else {
            console.log(await responses.json());
        }
    }

    const checkStatus = (response: any) => {
        if (response.status === 401) {
            setStatusError(
                t('error.unauthorized'));
        } else {
            setStatusError(response.statusText);
        }
    }

    const handleSubmit = (lightSource: LightSource) => async (event: React.FormEvent) => {
        event.preventDefault();

        getAllLightSources();

        if (lightSource.status) {
            await TurnLightOff(lightSource);
        } else {
            await TurnLightOn(lightSource);
        }

        getAllLightSources();


    }

    useEffect(() => {
        getAllLightSources();
    }, []);


    return (
        <>
           {lightSources.map((lightSource) => (
            <div key={lightSource.id}>
                <form
                    onSubmit={handleSubmit(lightSource)}
                    className='bg-gray-200 rounded-lg p-4 my-4 shadow-md'
                    >
                    <h3 className='text-lg text-center underline mb-2'>
                        {lightSource.name}
                    </h3>
                    <section className='grid grid-cols-3 gap-4 items-center'>
                        <div className='col-span-1'>
                            <FaLightbulb className='text-yellow-500 size-16' />
                        </div>
                        <div className='col-span-2'>
                            <p className='font-semibold'>{t("lights.location")}: </p>
                            <p className='text-gray-700'>{lightSource.location}</p>
                            <button
                                type='submit'
                                className={` font-medium ${lightSource.status? 'bg-green-500' : 'bg-red-500'} text-white py-2 px-4 rounded-md mt-2`}
                            >
                                {lightSource.status ? t("lights.on") : t("lights.off")}
                            </button>
                        </div>
                    </section>
                </form>
            </div>
            ))}
        </>
    );
};

export default LightsOverview;

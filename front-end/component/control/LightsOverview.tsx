import React, { useEffect, useState } from 'react';
import { LightSource, StatusMessage } from '../../types';
import { FaLightbulb } from 'react-icons/fa';
import { useTranslation } from 'next-i18next';
import ControlService from '@/service/ControlService';
import StatusMessageComponent from '../statusMessageComponent';

const LightsOverview: React.FC = () => {
    const [messages, setMessages] = useState<StatusMessage[]>([]);
    const [lightSources, setLightSources] = useState<LightSource[]>([]);
    const { t } = useTranslation();

    const getAllLightSources = async () => {
        const responses = await ControlService.getAllLightSources();

        if (responses === undefined) {
            setMessages([{ message: t('error.noesponse'), type: 'error' }]);
        } else if (!responses.ok) {
            checkStatus(responses);
        } else {
            const lightSourcesData = await responses.json();
            const sortedLightSources = lightSourcesData.toSorted((a: LightSource, b: LightSource) => a.id - b.id); // Gebruik toSorted voor een nieuwe gesorteerde array
            setLightSources(sortedLightSources);
        }
    };

    const TurnLightOn = async (lightSource: LightSource) => {
        const responses = await ControlService.turnLightOn(lightSource.name, lightSource.location);

        if (!responses.ok) {
            checkStatus(responses);
            const lightSourcesData = await responses.json();
            const sortedLightSources = lightSourcesData.toSorted((a: LightSource, b: LightSource) => a.id - b.id); // Gebruik toSorted voor een nieuwe gesorteerde array
            setLightSources(sortedLightSources);
            
        } else {
            console.log(await responses.json());
        }
    };

    const TurnLightOff = async (lightSource: LightSource) => {
        const responses = await ControlService.turnLightOff(lightSource.name, lightSource.location);

        if (!responses.ok) {
            checkStatus(responses);
        } else {
            console.log(await responses.json());
        }
    };

    const checkStatus = (response: any) => {
        if (response.status === 401) {
            setMessages([{ message: t('error.unauthorized'), type: 'error' }]);
        } else {
            setMessages(response.statusText);
        }
    };

    const handleSubmit = (lightSource: LightSource) => async (event: React.FormEvent) => {
        event.preventDefault();

        if (lightSource.status) {
            await TurnLightOff(lightSource);
        } else {
            await TurnLightOn(lightSource);
        }

        getAllLightSources();
    };

    useEffect(() => {
        getAllLightSources();
    }, []);

    return (
        <>
            {lightSources.map((lightSource) => (
                <div key={lightSource.id}>
                    <form
                        onSubmit={handleSubmit(lightSource)}
                        className="bg-gray-200 rounded-lg p-4 my-4 shadow-md"
                    >
                        <h3 className="text-lg text-center underline mb-2">
                            {lightSource.name}
                        </h3>
                        <StatusMessageComponent message={messages} />
                        <section className="grid grid-cols-3 gap-4 items-center">
                            <div className="col-span-1">
                                <FaLightbulb className="text-yellow-500 size-16" />
                            </div>
                            <div className="col-span-2">
                                <p className="font-semibold">{t('lights.location')}: </p>
                                <p className="text-gray-700">{lightSource.location}</p>
                                <button
                                    type="submit"
                                    className={`font-medium ${lightSource.status ? 'bg-green-500' : 'bg-red-500'} text-white py-2 px-4 rounded-md mt-2`}
                                >
                                    {lightSource.status ? t('lights.on') : t('lights.off')}
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

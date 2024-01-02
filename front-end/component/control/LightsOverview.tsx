import React, { useState } from 'react';
import { LightSource } from '../../types';
import { FaLightbulb } from 'react-icons/fa';

type Props = {
    lightSources: Array<LightSource>;
}

const LightsOverview: React.FC<Props> = ({ lightSources }: Props) => {
    const [activatedLights, setActivatedLights] =  useState<Set<Number>>(new Set());

    const handleSubmit = (lightSource: LightSource) => (event: React.FormEvent) => {
        event.preventDefault();

        const updatedActivatedLights = new Set(activatedLights);

        if (updatedActivatedLights.has(lightSource.id)) {
            updatedActivatedLights.delete(lightSource.id);
            setActivatedLights(updatedActivatedLights);
            sessionStorage.removeItem(`activatedLight_${lightSource.id}`);
        } else {
            updatedActivatedLights.add(lightSource.id);
            setActivatedLights(updatedActivatedLights);
            sessionStorage.setItem(`activatedLight_${lightSource.id}`, JSON.stringify(lightSource));
        }
    }


    return (
        <>
           { lightSources.map((lightSource) => (
                <form
                    onSubmit={handleSubmit(lightSource)}
                    className='bg-gray-200 rounded-lg p-4 my-4 flex flex-col justify-between items-center'
                    key={lightSource.id}
                >
                    <div className='text-center'>
                        <h3 className='text-lg font-medium uppercase mb-2'>
                            {lightSource.name}
                        </h3>
                        <section className='flex'>
                            <div className='mx-2'>
                                <FaLightbulb className='size-16 center'/>
                            </div>
                            <div>
                                <p className='italic uppercase'>Location: </p>
                                {lightSource.location}
                            </div>
                        </section>
                    </div>
                    {!activatedLights.has(lightSource.id) && (
                        <button 
                            className="bg-blue-500 hover:bg-blue-700 text-white font-medium my-1 py-2 px-4 rounded" 
                            type='submit'>
                            Turn on
                        </button>
                    )}
                    {activatedLights.has(lightSource.id) && (
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-medium my-1 py-2 px-4 rounded"
                            type='submit'>
                            Turn off
                        </button>
                    )}
                </form>
            ))}
        </>
    );
};

export default LightsOverview;

import React, { useState } from 'react';
import { Scene } from '@/types';
import { FaLightbulb } from 'react-icons/fa';

type Props = {
    scenes: Array<Scene>;
}

const SceneOverview: React.FC<Props> = ({ scenes }: Props) => {
    const [activatedScenes, setActivatedScenes] =  useState<Set<Number>>(new Set());
    const [updateActivatedScene, setUpdateActivatedScene] = useState<Set<Number>>(new Set());

    const handleSubmit = (scene: Scene) => (event: React.FormEvent) => {
        event.preventDefault();

        const updatedActivatedScenes = new Set(activatedScenes);

        if (updatedActivatedScenes.has(scene.id)) {
            updatedActivatedScenes.delete(scene.id);
            setActivatedScenes(updatedActivatedScenes);
            sessionStorage.removeItem(`activatedScene_${scene.id}`);
        } else {
            updatedActivatedScenes.add(scene.id);
            setActivatedScenes(updatedActivatedScenes);
            sessionStorage.setItem(`activatedScene_${scene.id}`, JSON.stringify(scene));
        }
    };
    
    return (
        <>
            {scenes.map((scene) => (
                <form
                    onSubmit={handleSubmit(scene)}
                    className='bg-gray-200 rounded-lg p-4 my-4 flex flex-col justify-between items-center'
                    key={scene.id}
                >
                    <div className='text-center'>
                        <h3 className='text-lg font-medium uppercase mb-2'>
                            {scene.name}
                        </h3>
                        <section className='flex'>
                            <div className='mx-2'>
                                <FaLightbulb className='size-16 center'/>
                            </div>
                            <div>
                                <p className='italic uppercase'>Activation locations: </p>
                                {scene.lightSources.map((lightSource) => (
                                    <div key={lightSource.id}>
                                        <p>{lightSource.location}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                    {!activatedScenes.has(scene.id) && (
                        <button 
                            className="bg-blue-500 hover:bg-blue-700 text-white font-medium my-1 py-2 px-4 rounded" 
                            type='submit'>
                            Turn on
                        </button>
                    )}
                    {activatedScenes.has(scene.id) && (
                        <button 
                            className="bg-blue-500 hover:bg-blue-700 text-white font-medium my-1 py-2 px-4 rounded" 
                            type='submit'>
                            Turn Off
                        </button>
                    )}
                   
                </form>
            ))}
        </>
    );
};

export default SceneOverview;

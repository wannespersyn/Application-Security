import React from 'react';
import { LightSource, Scene } from '@/types';
import Header from '@/component/header';

type Props = {
    scenes: Array<Scene>;
}

const ControlScene: React.FC<Props> = ({ scenes }: Props) => {
    return (
        <>
            <h2>Control Scenes</h2>
            <div>
                {scenes.map((scene) => (
                    <div key={scene.id}>
                        <h3>{scene.name}</h3>
                    </div>
                ))}
            </div>
        </>
    );
};

export default ControlScene;

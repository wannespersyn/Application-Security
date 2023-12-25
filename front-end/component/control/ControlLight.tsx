import React from 'react';
import { LightSource } from '../../types';

type Props = {
    lightSources: Array<LightSource>;
}

const ControlLight: React.FC<Props> = ({ lightSources }: Props) => {
    return (
        <>
            <h2>Control Lights</h2>
            <div>
                {lightSources.map((lightSource) => (
                    <div key={lightSource.id}>
                        <h3>{lightSource.name}</h3>
                    </div>
                ))}
            </div>
        </>
    );
};

export default ControlLight;

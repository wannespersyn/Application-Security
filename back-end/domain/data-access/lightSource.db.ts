import database from "../../util/database";
import { LightSource } from "../model/lightSource";


const createLightSource = async ({name, location, brightness, status}: LightSource): Promise<LightSource> => {
    try {
        const newLightSourcePrisma = await database.lightSources.create({
            data: {
                name: name,
                location: location,
                brightness: brightness,
                status: status,
                controlCenter: {
                    connect: {
                        id: 1
                    }
                },
            }
        });
        return LightSource.from(newLightSourcePrisma);
    } catch (error) {
        throw new Error(`Error creating light source: ${error.message}`);
    }
};

export default {
    createLightSource,
}


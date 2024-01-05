import ControlService from "@/service/ControlService";
import DeleteService from "@/service/DeleteService";
import { LightSource, StatusMessage } from "@/types";
import classNames from "classnames";
import { useEffect, useState } from "react";
import useInterval from "use-interval";
import OptionChooserDelete from "./optionChooserDelete";
import { useTranslation } from "next-i18next";

const DeleteLightComponent: React.FC = () => {
    const [allLightSources, setAllLightSources] = useState<LightSource[]>([]);
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [statusMessage, setStatusMessage] = useState<StatusMessage[]>([]);
    const { t } = useTranslation();

    const deleteLight = async (name: string, location: string) => {
        const response = await DeleteService.DeleteLight(name, location);
        return response;
    }

    const getLightSources = async () => {
        try {
            const response = await ControlService.getAllLightSources();
            const lightSourceData = await response.json();
            setAllLightSources(lightSourceData);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getLightSources();
    }, []);

    useInterval(() => {
        getLightSources();
    }, 1000);

    const clearErros = () => {
        setStatusMessage([]);
    }

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        clearErros();

        deleteLight(name, location);

        setStatusMessage([{message: "sys.lights.delete.succes", type: "success"}])
        
    };


    return (
        <>
            {statusMessage && (
                <div className="w-1/2 mx-auto">
                    <ul className="list-none mb-3 mx-auto">
                        {statusMessage.map(({message, type}, index) => (
                            <li key={index}
                                className={classNames({
                                    "text-green-600 ": type === "success",
                                    "text-red-800": type === "error"
                                })}>
                                    {message}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <div className="w-1/2 mx-auto">
                <form onSubmit={handleSubmit}>
                    <div>
                        <OptionChooserDelete options={allLightSources}
                            heading= {t("sys.lights.delete.title")}
                            choice={(selectedChoice: string) => {
                                const [name, location] = selectedChoice.split('-');
                                setName(name);
                                setLocation(location);
                            }} />
                    </div>

                    <button
                        className="buttons" 
                        type="submit">
                        {t("sys.delete.light")}
                    </button>
                </form>
                </div>
        </>
    )
}

export default DeleteLightComponent;
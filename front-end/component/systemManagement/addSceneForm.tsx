import { LightSource, StatusMessage } from "@/types";
import { useEffect, useState } from "react";
import OptionChooser from "./optionChooser";
import classNames from "classnames";
import ControlService from "@/service/ControlService";
import AddService from "@/service/AddService";
import { useTranslation } from "next-i18next";

const AddSceneForm: React.FC  = () => {
    const [name, setName] = useState('');
    const [nameError, setNameError] = useState("");
    const [lightSources, setLightSources] = useState<LightSource[]>([]);
    const [lightSourcesError, setLightSourcesError] = useState("");
    const [allLightSources, setAllLightSources] = useState<LightSource[]>([]);
    const [statusMessage, setStatusMessage] = useState<StatusMessage[]>([]);
    const { t } = useTranslation();

    
    const addScene = async (name: string, lightSources: LightSource[]) => {
        const response = await AddService.addNewScene(name, lightSources);
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

    const getUniqueLightSource = async (name: string, location: string) => {
        try {
            const response = await ControlService.getLightSourceByNameAndLocation(name, location);
            const lightSourceData = await response.json();
            const id = await ControlService.getIdLightSource(name, location);
            console.log(id);
            const updatedLightSource = { ...lightSourceData, id }; 
            setLightSources((prevLightSources) => [...prevLightSources, updatedLightSource]);
        } catch (error) {
            console.log(error);
        }
    }

    const clearErros = () => {
        setNameError("");
        setLightSourcesError("");
        setStatusMessage([]);
        setAllLightSources([]);
    }

    const validate = (): boolean => {
        let result = true;

        if (!name && name.trim() === '') {
            setNameError(t("error.name.required"));
            result = false;
        }

        if (!lightSources) {
            setLightSourcesError(t("error.light.required"));
            result = false;
        }

        return result;
    }

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        clearErros();

        if (validate() == false) {
            return;
        }

        addScene(name, lightSources);

        setStatusMessage([{message: "sys.scenes.succes", type: "success"}])
        
    };

    useEffect(() => {
        getLightSources();
    }, []);

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
            <div className="w-2/3 mx-auto">
                <form onSubmit={handleSubmit}>
                    <div>
                        <input
                            className="input"
                            type="text"
                            id="NameInput"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            placeholder="name"
                        />
                        {nameError && (
                            <div className="text-red-800"> {nameError} </div>
                        )}
                        <OptionChooser options={allLightSources}
                        updateActivationTargets = {(selectedOptions: string[]) => {
                            selectedOptions.forEach(light => {
                                const [name, location] = light.split('-');
                                getUniqueLightSource(name, location);
                            });
                          }}/>
                    </div>

                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded mx-auto" 
                        type="submit">
                        {t("sys.add.scene")}
                    </button>

                </form>
                </div>
        </>
    )
}

export default AddSceneForm;
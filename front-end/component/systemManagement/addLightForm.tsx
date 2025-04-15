import AddService from "@/service/AddService";
import { StatusMessage } from "@/types";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import StatusMessageComponent from "../statusMessageComponent";

const AddLightForm: React.FC = () => {
    const [name, setName] = useState('');
    const [nameError, setNameError] = useState('');
    const [location, setLocation] = useState('');
    const [locationError, setLocationError] = useState('');
    const [statusMessage, setStatusMessage] = useState<StatusMessage[]>([]);
    const { t } = useTranslation();

    const addLight = async (name: string, location: string) => {
        const response = await AddService.addNewLight(name, location);
        return response;
    }

    const clearErros = () => {
        setNameError("");
        setLocationError("");
    }

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        clearErros();

        if (!validate()) {
            return;
        }

        addLight(name, location);

        setStatusMessage([{message: t("sys.lights.succes"), type: "success"}])
        
    };

    const validate = (): boolean => {
        let result = true;

        if (!name && name.trim() === '') {
            setNameError(t("error.name.required"));
            result = false;
        }

        if (!location && location.trim() === '') {
            setLocationError(t("error.location.required"));
            result = false;
        }

        return result;
    }


    return (
        <>
             {statusMessage && (
                <StatusMessageComponent message={statusMessage} />
            )}
            <div className="w-1/2 mx-auto">
                <form onSubmit={handleSubmit}>
                    <div>
                        <input
                            className="input"
                            type="text"
                            id="NameInput"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            placeholder={t("sys.lights.name")}
                        />
                        {nameError && (
                            <div className="text-red-800"> {nameError} </div>
                        )}
                        <input
                            className="input"
                            type="text"
                            id="locationInput"
                            value={location}
                            onChange={(event) => setLocation(event.target.value)}
                            placeholder={t("sys.lights.location")}
                        />
                        {locationError && (
                            <div className="text-red-800"> {locationError} </div>
                        )}
                    </div>

                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded mx-auto" 
                        type="submit">
                        {t("sys.lights.add")}
                    </button>

                </form>
                </div>
        </>
    );
}

export default AddLightForm;

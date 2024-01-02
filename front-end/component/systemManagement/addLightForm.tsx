import AddService from "@/service/AddService";
import { StatusMessage } from "@/types";
import classNames from "classnames";
import { useState } from "react";

const AddLightForm: React.FC = () => {
    const [name, setName] = useState('');
    const [nameError, setNameError] = useState('');
    const [location, setLocation] = useState('');
    const [locationError, setLocationError] = useState('');
    const [statusMessage, setStatusMessage] = useState<StatusMessage[]>([]);    

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

        if (validate() == false) {
            return;
        }

        addLight(name, location);

        setStatusMessage([{message: `Added light succesful!`, type: "success"}])
        
    };

    const validate = (): boolean => {
        let result = true;

        if (!name && name.trim() === '') {
            setNameError("Name for light is required");
            result = false;
        }

        if (!location && location.trim() === '') {
            setLocationError("Location is required");
            result = false;
        }

        return result;
    }


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
                        <input
                            className="input"
                            type="text"
                            id="locationInput"
                            value={location}
                            onChange={(event) => setLocation(event.target.value)}
                            placeholder="location"
                        />
                        {locationError && (
                            <div className="text-red-800"> {locationError} </div>
                        )}
                    </div>

                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded mx-auto" 
                        type="submit">
                        Add Light
                    </button>

                </form>
                </div>
        </>
    );
}

export default AddLightForm;

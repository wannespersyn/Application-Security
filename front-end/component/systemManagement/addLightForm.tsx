import { StatusMessage } from "@/types";
import classNames from "classnames";
import React, { useState } from "react";

const AddLightForm: React.FC = () => {
    const [name, setName] = useState('');
    const [nameError, setNameError] = useState("");
    const [location, setLocation] = useState('');
    const [locationError, setlocationError] = useState("");
    const [statusMessage, setStatusMessage] = useState<StatusMessage[]>([]);

    const clearErros = () => {
        setNameError("");
        setlocationError("");
        setStatusMessage([]);
    }

    const validate = (): boolean => {
        let result = true;

        if (!name && name.trim() === '') {
            setNameError("Name for light is required");
            result = false;
        }

        if (!location && location.trim() === '') {
            setlocationError("Location is required");
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

        setStatusMessage([{message: `Added light succesful!`, type: "success"}])
        
    };

    return (
        <>
            <h2 className="font-medium text-xl text-center">Add Light</h2>
            {statusMessage && (
                <div className="w-1/2 mx-auto">
                    <ul className="list-none mb-3 mx-auto">
                        {statusMessage.map(({message, type}, index) => (
                            <li key={index}
                                className={classNames({
                                    "text-green-600 ": type === "success",
                                    "text-red-600": type === "error"
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
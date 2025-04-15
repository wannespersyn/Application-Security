import Header from "@/component/header";
import statusMessage from "@/component/statusMessageComponent";
import Navigation from "@/component/systemManagement/navigation";
import OptionChooserDelete from "@/component/systemManagement/optionChooserDelete";
import ControlService from "@/service/ControlService";
import DeleteService from "@/service/DeleteService";
import { Scene, StatusMessage } from "@/types";
import classNames from "classnames";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useInterval from "use-interval";

const deleteScene: React.FC = () => {
    const [allScenes, setAllScenes] = useState<Scene[]>([]);

    const [name, setName] = useState('');
    const [nameError, setNameError] = useState("");
    const [statusMessage, setStatusMessage] = useState<StatusMessage[]>([]);

    const deleteScene = async (name: string) => {
        const response = await DeleteService.DeleteScene(name);
        return response;
    }

    const getAllScenes = async () => {
        try {
            const response = await ControlService.getAllScenes();
            const sceneData = await response.json();
            setAllScenes(sceneData);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllScenes();
    }, []);

    useInterval(() => {
        getAllScenes();
    }, 1000);

    const clearErros = () => {
        setNameError("");
        setStatusMessage([]);
    }

    const validate = (): boolean => {
        let result = true;

        if (!name && name.trim() === '') {
            setNameError("Name for light is required");
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

        deleteScene(name);

        setStatusMessage([{message: `Deleted the scene succesful!`, type: "success"}])
        
    };


    return (
        <>
            <Header />
            <Navigation />
            <section className="my-4 w-1/2 mx-auto">
            <h2 className="font-medium text-xl text-center">Delete Scene</h2>
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
                        {/* <OptionChooserDelete options={allScenes} 
                            choice={(selectedChoice: string) => {
                                const [name, location] = selectedChoice.split('-');
                                setName(name);
                                setLocation(location);
                            }} /> */}
                    </div>

                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded mx-auto" 
                        type="submit">
                        Delete Scene
                    </button>
                </form>
                </div>
            </section>
        </>
    );
}

export const getServerSideProps = async (context: any) => {
    const { locale } = context;
  
    return {
        props: {
            ...(await serverSideTranslations(locale ?? "en", ["common"])),
        },
    };
  };
  
export default deleteScene;
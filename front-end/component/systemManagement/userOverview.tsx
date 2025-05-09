import ControlService from "@/service/ControlService";
import DeleteService from "@/service/DeleteService";
import { StatusMessage, User } from "@/types";
import classNames from "classnames";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { useTranslation } from "next-i18next";

const UserOverview: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [statusMessage, setStatusMessage] = useState<StatusMessage[]>([]);
    const router = useRouter();
    const { t } = useTranslation(); 

    const getAllUsers = async () => {
        setStatusMessage([]);

        const responses = await ControlService.getAllUsers();

        if (responses === undefined) {
            router.push('/login');
        } else {if (!responses.ok) {
            if (responses.status === 401) {
                setStatusMessage([{
                    message: t('error.unauthorized'),
                    type: "error"
            }]);
            } else {
                setStatusMessage([{
                    message: responses.statusText,
                    type: "error"
                }]);
            }
            } else {
                const usersData = await responses.json();
                setUsers(usersData);
            }
        }
    };

    const deleteUser = async (name: string) => {
        setStatusMessage([]);

        const responses = await DeleteService.DeleteUser(name);

        if (!responses.ok) {
            if (responses.status === 401) {
                setStatusMessage([{
                    message: "error.not.authorized.delete.user",
                    type: "error"
                }]);
            } else {
                setStatusMessage([{
                    message: responses.statusText,
                    type: "error"
                }]);
            }
        } else {
            setStatusMessage([{ message: `sys.user.succes`, type: "success" }]);
        }
    }

    const { data, isLoading, error } = useSWR(
        'controlLights',
        getAllUsers
    );

    useEffect(() => {
        getAllUsers();
    }, []);

    useEffect(() => {
        getAllUsers();
    }, [users]);


    const handleUserInfo = (name: string) => {
        router.push(`/systemManagement/userDetails/${name}`);
    };

    const handleDeleteUser = (name: string) => {
        deleteUser(name);
    };

    return (
        <section className="mx-auto p-4 bg-gray-200 w-1/2 my-4">
            {error && <div>{error}</div>}
            {statusMessage && 
            <div>
                {statusMessage.map(({message, type}, index) => (
                            <li key={index}
                                className={classNames({
                                    "text-green-600 ": type === "success",
                                    "text-red-800": type === "error"
                                })}>
                                    {message}
                            </li>
                        ))}
            </div>}
            {isLoading && <div>Loading...</div>}
            <h1 className="text-center py-2 text-2xl font-bold">{t('sys.user.title')}</h1>
            <div className="grid grid-cols-1 gap-2">
                {users.map((user) => (
                    <div
                        key={user.id}
                        className="bg-gray-300 rounded-md p-3 flex items-center justify-between">
                        <p className="text-lg font-semibold">{user.name}</p>
                        <div className="">
                            <button
                                className="px-4 py-1 bg-blue-500 text-white rounded mr-2"
                                onClick={() => handleUserInfo(user.name)}>
                                {t('sys.user.info')}
                            </button>
                            <button
                                className="px-4 py-1 bg-red-500 text-white rounded"
                                onClick={() => handleDeleteUser(user.name)}>
                                {t('sys.user.delete')}
                            </button>
                        </div>
                    </div>
                ))}
            </div>            
        </section>
    );
};

export default UserOverview;

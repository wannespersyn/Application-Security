import ControlService from "@/service/ControlService";
import DeleteService from "@/service/DeleteService";
import { User } from "@/types";
import { t } from "i18next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useInterval from "use-interval";

const UserOverview: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const router = useRouter();

    const getAllUsers = async () => {
        try {
            const response = await ControlService.getAllUsers();
            const fetchedUsers = await response.json();
            setUsers(fetchedUsers);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    useEffect(() => {
        getAllUsers();
    }, []);

    useInterval(() => {
        getAllUsers();
    }, 1000);

    const handleUserInfo = (name: string) => {
        router.push(`/systemManagement/userDetails/${name}`);
    };

    const handleDeleteUser = async (name: string) => {
        try {
            await DeleteService.DeleteUser(name);
            getAllUsers();
        } catch (error) {
            console.error(`Error deleting user with ID ${name}:`, error);
        }
    };

    return (
        <section className="mx-auto p-4 bg-gray-200 w-1/2 my-4">
            <h1 className="text-center py-2 text-2xl font-bold">{t('user.overview')}</h1>
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
                                {t('info')}
                            </button>
                            <button
                                className="px-4 py-1 bg-red-500 text-white rounded"
                                onClick={() => handleDeleteUser(user.name)}>
                                {t('delete')}
                            </button>
                        </div>
                    </div>
                ))}
            </div>            
        </section>
    );
};

export default UserOverview;

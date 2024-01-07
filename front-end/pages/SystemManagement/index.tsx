import Header from "@/component/header";
import Navigation from "@/component/systemManagement/navigation";
import UserOverview from "@/component/systemManagement/userOverview";
import { StatusMessage } from "@/types";
import classNames from "classnames";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useEffect, useState } from "react";

const SystemManagement = () => {
    const [admin, setAdmin] = useState<boolean>(false);
    const [statusMessage, setStatusMessage] = useState<StatusMessage[]>([]);

    const getRole = () => {
        const user = JSON.parse(sessionStorage.getItem('loggedInUser') || '{}');
        if (!user || !user.token || user.token.admin === undefined) {
            setAdmin(false);
            return;
        }
        console.log(user.token.admin);
        setAdmin(user.token.admin);
    }
    
    useEffect(() => {
        getRole();
    }, []);


    useEffect(() => {
        if (!admin) {
            setStatusMessage([{ message: `You are not authorized to view this page!`, type: "error" }]);
        } else {
            setStatusMessage([]);
        }
    }, [admin]);

    return (
        <>
            <Header />
            {statusMessage.length > 0 && (
                <div className="w-1/3 my-auto mx-auto">
                    <ul className="list-none mb-3 mx-auto">
                        {statusMessage.map(({ message, type }, index) => (
                            <li key={index}
                                className={classNames({
                                    "text-green-800": type === "success",
                                    "text-red-800": type === "error"
                                })}>
                                    {message}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            {admin && (
                <>
                    <Navigation />
                    <UserOverview />
                </>
            )}
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

export default SystemManagement;
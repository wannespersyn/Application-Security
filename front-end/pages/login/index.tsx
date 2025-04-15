import Header from "@/component/header";
import Head from "next/head";
import React from "react";
import UserLoginForm from "@/component/log-in/UserLoginForm";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import UserOverview from "@/component/log-in/userOverview";

const Login: React.FC = () => {
    return (
        <>
            <Head>
                <title>Control Home Center</title>
            </Head>
            <Header />
            <main>
                <div className="mx-auto mt-6 w-1/3 bg-gray-200 py-5">
                    <UserLoginForm />
                </div>
                <UserOverview />
            </main>
        </>
    );
};

export const getStaticProps = async (context: any) => {
    const { locale } = context;

    return {
        props: {
            ...(await serverSideTranslations(locale ?? "en", ["common"])),
        },
    };
};

export default Login;
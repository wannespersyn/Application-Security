import Header from "@/component/header";
import Head from "next/head";
import React from "react";
import UserLoginForm from "@/component/log-in/UserLoginForm";

const Login: React.FC = () => {
    return (
        <>
            <Head>
                <title>Control Home Center</title>
            </Head>
            <Header></Header>
            <main>
                <div className="mx-auto mt-6 w-1/3 bg-gray-200 py-5">
                    <UserLoginForm></UserLoginForm>
                </div>
            </main>
        </>
    );
};

export default Login;
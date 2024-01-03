import Header from "@/component/header";
import RegisterForm from "@/component/log-in/registerForm";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";

const RegisterPage: React.FC = () => {
    return (
        <>
            <Header />
            <div>
                <RegisterForm />
            </div>
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

export default RegisterPage;
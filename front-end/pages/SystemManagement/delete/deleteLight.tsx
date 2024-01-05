import Header from "@/component/header";
import DeleteLightComponent from "@/component/systemManagement/deleteLightComponent";
import Navigation from "@/component/systemManagement/navigation";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const DeleteLight: React.FC = () => {
    const { t } = useTranslation();

    return (
        <>
            <Header />
            <Navigation />
            <section className="my-4 w-1/2 mx-auto">
            <h2 className="font-medium text-xl text-center">{t("sys.delete.light")}</h2>
                <DeleteLightComponent />
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

export default DeleteLight;
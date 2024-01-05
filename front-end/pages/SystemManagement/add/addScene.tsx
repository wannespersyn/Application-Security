import Header from "@/component/header";
import AddSceneForm from "@/component/systemManagement/addSceneForm";
import Navigation from "@/component/systemManagement/navigation";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const AddScene: React.FC = () => {
    const { t } = useTranslation();

    return (
        <>
            <Header />
            <Navigation />
            <section className="my-4 w-2/3 mx-auto">
                <h2 className="font-medium text-xl text-center">{t("sys.add.scene")}</h2>
                <AddSceneForm />
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

export default AddScene;
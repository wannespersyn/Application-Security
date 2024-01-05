import Header from "@/component/header";
import Navigation from "@/component/systemManagement/navigation";
import AddLightForm from "@/component/systemManagement/addLightForm";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const AddLight: React.FC = () => {
    const { t } = useTranslation();

    return (
        <>
            <Header />
            <Navigation />
            <section className="my-4 w-1/2 mx-auto">
                <h2 className="font-medium text-xl text-center">{t("sys.add.light")}</h2>
                <AddLightForm />
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
  
export default AddLight;
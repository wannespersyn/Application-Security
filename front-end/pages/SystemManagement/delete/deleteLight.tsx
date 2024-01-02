import Header from "@/component/header";
import DeleteLightComponent from "@/component/systemManagement/deleteLightComponent";
import Navigation from "@/component/systemManagement/navigation";

const DeleteLight: React.FC = () => {
    return (
        <>
            <Header />
            <Navigation />
            <section className="my-4 w-1/2 mx-auto">
            <h2 className="font-medium text-xl text-center">Delete Light</h2>
                <DeleteLightComponent />
            </section>
        </>
    );
}

export default DeleteLight;
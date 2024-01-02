import Header from "@/component/header";
import AddSceneForm from "@/component/systemManagement/addSceneForm";
import Navigation from "@/component/systemManagement/navigation";

const AddScene: React.FC = () => {

    return (
        <>
            <Header />
            <Navigation />
            <section className="my-4 w-2/3 mx-auto">
                <h2 className="font-medium text-xl text-center">Add Scene</h2>
                <AddSceneForm />
            </section>
        </>
    );
}

export default AddScene;
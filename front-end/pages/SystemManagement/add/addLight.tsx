import Header from "@/component/header";
import Navigation from "@/component/systemManagement/navigation";
import AddLightForm from "@/component/systemManagement/addLightForm";

const AddLight: React.FC = () => {
    return (
        <>
            <Header />
            <Navigation />
            <section className="my-4 w-1/2 mx-auto">
                <h2 className="font-medium text-xl text-center">Add Light</h2>
                <AddLightForm />
            </section>
        </>
    );
}

export default AddLight;
import Header from "@/component/header";
import DeleteLightForm from "@/component/systemManagement/deleteLightForm";
import { useRouter } from "next/router";

const DeleteLight: React.FC = () => {
    const router = useRouter();

    const onClickAddLight = () => {
        router.push('/SystemManagement/add/addLight');
        return;
    }

    const onClickAddScene = () => {
        router.push('/SystemManagement/add/addScene');
        return;
    }

    const onClickDeleteLight = () => {
        router.push('/SystemManagement/delete/deleteLight');
        return;
    }

    const onClickDeleteScene = () => {
        router.push('/SystemManagement/delete/deleteScene');
        return;
    }

    return (
        <>
            <Header />
            <div>
                <section className="system-mangament-nav">
                    <button
                        className="system-mangament-button"
                        onClick={onClickAddLight}>
                        Add light
                    </button>
                    <button
                        className="system-mangament-button"
                        onClick={onClickAddScene}>
                        Add Scene
                    </button>
                    <button
                        className="system-mangament-button"
                        onClick={onClickDeleteLight}>
                        Delete light
                    </button>
                    <button
                        className="system-mangament-button"
                        onClick={onClickDeleteScene}>
                        Delete Scene
                    </button>
                </section>
            </div>
            <section className="my-4 w-1/2 mx-auto">
                <DeleteLightForm />
            </section>
        </>
    );
}

export default DeleteLight;
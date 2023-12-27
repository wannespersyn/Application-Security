import Header from "@/component/header";
import { useRouter } from "next/router";

const AddScene: React.FC = () => {
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
            <h1>Add Scene</h1>
        </>
    );
}

export default AddScene;
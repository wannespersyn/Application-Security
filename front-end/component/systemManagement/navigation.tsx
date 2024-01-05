import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";




const Navigation: React.FC = () => {
    const { t } = useTranslation();
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
        <div>
                <section className="system-mangament-nav">
                    <button
                        className="system-mangament-button"
                        onClick={onClickAddLight}>
                        {t('sys.add.light')}
                    </button>
                    <button
                        className="system-mangament-button"
                        onClick={onClickAddScene}>
                        {t('sys.add.scene')}
                    </button>
                    <button
                        className="system-mangament-button"
                        onClick={onClickDeleteLight}>
                        {t('sys.delete.light')}
                    </button>
                    <button
                        className="system-mangament-button"
                        onClick={onClickDeleteScene}>
                        {t('sys.delete.scene')}
                    </button>
                </section>
            </div>
    )
}

export default Navigation;
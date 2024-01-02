import { t } from "i18next";
import { useRouter } from "next/router";
import { useState } from "react";




const Navigation: React.FC = () => {
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
                        {t('add.light')}
                    </button>
                    <button
                        className="system-mangament-button"
                        onClick={onClickAddScene}>
                        {t('add.scene')}
                    </button>
                    <button
                        className="system-mangament-button"
                        onClick={onClickDeleteLight}>
                        {t('delete.light')}
                    </button>
                    <button
                        className="system-mangament-button"
                        onClick={onClickDeleteScene}>
                        {t('delete.scene')}
                    </button>
                </section>
            </div>
    )
}

export default Navigation;
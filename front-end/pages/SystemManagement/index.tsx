import Header from "@/component/header";
import Navigation from "@/component/systemManagement/navigation";
import UserOverview from "@/component/systemManagement/userOverview";
import { useRouter } from "next/router";
import useInterval from "use-interval";

const systemManagement = () => {

    return (
        <>
            <Header />
            <Navigation />
            <UserOverview />
        </>
        
    );
}

export default systemManagement;
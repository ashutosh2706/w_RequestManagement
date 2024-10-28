import Navbar from "../components/Common/Navbar";
import AdminPage from "../components/AdminPage";
import UserPage from "../components/UserPage";
import { ROLES } from "../Constants";


interface HomepageProps {
    role: string | undefined;
}

export default function Homepage({ role }: HomepageProps) {

    return (
        <>
            <Navbar/>
            {role === ROLES.ADMIN && (<AdminPage />)}
            {role === ROLES.USER && (<UserPage />)}
        </>
    )
}
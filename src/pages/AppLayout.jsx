import Sidebar from "../components/Sidebar.jsx";
import style from "./AppLayout.module.css"
import Map from "../components/Map.jsx";
import User from "../components/User.jsx";
import {useAuth} from "../context/FakeAuthContext.jsx";

function AppLayout() {
    const { isAuthenticated} = useAuth()
    return (<div className={style.app}>
        <Sidebar/>
        <Map>{isAuthenticated && <User/>}</Map>

    </div>)
}

export default AppLayout;
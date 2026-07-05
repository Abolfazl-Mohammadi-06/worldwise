import Sidebar from "../components/Sidebar.jsx";
import style from "./AppLayout.module.css"
import Map from "../components/Map.jsx";

function AppLayout() {
    return (<div className={style.app}>
        <Sidebar/>
        <Map/>
    </div>)
}

export default AppLayout;
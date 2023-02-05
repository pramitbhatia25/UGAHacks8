import { Outlet } from "react-router";
import SideBar from "../SideBar";
import "./index.scss";
import Particle from "../particle";
const Layout = () => {
    return <div className="App">
    <Particle />
    <SideBar />
        <div className="page">
            <Outlet />
        </div>
    </div>
}

export default Layout;
import { Outlet } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";
import Navbar from "../components/layout/header/Navbar";
import Footer from "../components/layout/footer/Footer";
const Root = () => {
    return (
        <ProtectedRoutes>
            <Navbar />
            <Outlet />
            <Footer />
        </ProtectedRoutes>
    )
}

export default Root
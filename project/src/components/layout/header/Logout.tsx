// import { Image } from "@mantine/core"
// import { images } from "../../../utils/images"
import { useNavigate } from "react-router-dom"
import Translate from "../../ui/Translate";
import { LogOut } from "lucide-react";

const Logout = () => {
    const navigate = useNavigate()
    const logout = () => {
        localStorage.removeItem('sego_user');
        localStorage.removeItem('sego_token');
        navigate('/home')
    }
    return (
        <button className="mt-[2px] text-[#7f9bff] hover:text-[#eeff00] "  onClick={logout}>
            <LogOut/>
        </button>
    )
}

export default Logout
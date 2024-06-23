// import { Image } from "@mantine/core"
// import { images } from "../../../utils/images"
import { useNavigate } from "react-router-dom"
import Translate from "../../ui/Translate";

const Logout = () => {
    const navigate = useNavigate()
    const logout = () => {
        localStorage.removeItem('sego_user');
        localStorage.removeItem('sego_token');
        navigate('/home')
    }
    return (
        <button className="w-[15px] absolute mt-[2px] text-[#7f9bff] mr-[32%] ml-[30%] hover:text-[#eeff00] "  onClick={logout}>
            {/* <Image
                src={images.logout}
                alt="logout"
                width={20}
                height={20}
                className="w-full "
            /> */}
            <Translate text="logout"/> 
        </button>
    )
}

export default Logout
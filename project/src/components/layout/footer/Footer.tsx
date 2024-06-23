import MailIcon from "../../../icons/MailIcon"
import PhoneIcon from "../../../icons/PhoneIcon"
import Translate from "../../ui/Translate"


const Footer = () => {
    return (
        <footer className="flex justify-center items-center flex-col bg-[#1f253a] mt-16 py-20  ">
             <h3 id='contact' className="text-indigo-500 font-bold  text-xl  mb-10"><Translate text="Keep In touch with us"/></h3>
            <div className="flex items-center gap-x-4  " >
                <div className='flex items-center my-8 gap-x-4 text-indigo-500 font-bold  text-l hover:text-white'>
                    <PhoneIcon />
                    <span>+0123456789</span>
                </div>
                <div className='flex items-center gap-x-2 ml-5 text-indigo-500 font-bold  text-l hover:text-white'>
                    <MailIcon />
                    <span>company@company.mail</span>
                </div>
                <div className='flex items-center gap-x-2 ml-5 text-indigo-500 font-bold  text-l hover:text-white'>
                    <MailIcon />
                    <span>company@company.mail</span>
                </div>
                <div className='flex items-center gap-x-2 ml-5 text-indigo-500 font-bold  text-l hover:text-white'>
                    <MailIcon />
                    <span>company@company.mail</span>
                </div>
            </div>
        </footer>
    )
}

export default Footer
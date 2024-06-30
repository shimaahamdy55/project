import MailIcon from "../../../icons/MailIcon";
import PhoneIcon from "../../../icons/PhoneIcon";
import Translate from "../../ui/Translate";

const Footer = () => {
    return (
        <footer className="flex flex-col items-center bg-[#1f253a] mt-16 py-20 px-4 sm:px-6 lg:px-8">
            <h3 id="contact" className="text-indigo-500 font-bold text-xl mb-10 text-center">
                <Translate text="Keep In touch with us" />
            </h3>
            <div className="flex flex-col sm:flex-row md:flex-wrap md:flex flex-col-2 items-center gap-x-4 gap-y-6 md:gap-y-8 md:justify-center">
                <div className="flex items-center gap-x-2 text-indigo-500 font-bold text-l hover:text-white">
                    <PhoneIcon />
                    <span>+0123456789</span>
                </div>
                <div className="flex items-center gap-x-2 text-indigo-500 font-bold text-l hover:text-white">
                    <MailIcon />
                    <span>company@company.mail</span>
                </div>
                <div className="flex items-center gap-x-2 text-indigo-500 font-bold text-l hover:text-white">
                    <MailIcon />
                    <span>company@company.mail</span>
                </div>
                <div className="flex items-center gap-x-2 text-indigo-500 font-bold text-l hover:text-white">
                    <MailIcon />
                    <span>company@company.mail</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;


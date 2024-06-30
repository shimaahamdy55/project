import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getData } from "../../../api/getData";
import ProfileIcon from "../../../icons/ProfileIcon";
import styles from "../../../styles/navbar.module.css";
import { images } from "../../../utils/images";
import Translate from "../../ui/Translate";
import Logout from "./Logout";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const token = localStorage.getItem("sego_token");
  const [searchVal, setSearchVal] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const { data: specializations } = useQuery({
    queryKey: ["get-specializations"],
    queryFn: () =>
      getData({
        endpoint: "all/specializations",
      }),
    select: (data: any) =>
      data.data.message.map((item: any) => ({
        id: item.id,
        label: item.name,
      })),
  })

  const getSearchHandler = () => {
    if (!searchVal) return
    navigate(`/search/${searchVal}`)
  }
  // change language
  const changeLang = (lang: "en" | "ar") => {
    const language = sessionStorage.getItem("lang")
    if (language === lang) return
    sessionStorage.setItem("lang", lang)
    window.location.reload()
  }

  const navLinks = [
    {
      route: "/home",
      page: "home",
    },
    {
      route: "/about",
      page: "about",
    },
    {
      route: "#",
      page: "specialization",
      nestedRoutes: true,
      comp: (
        <ul className="absolute invisible duration-300 -translate-y-40 opacity-0 top-12 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0  bg-[#1f253a] p-4 rounded w-[250px] items--center">
          {specializations?.map((spec: { id: number; label: string }) => (
            <li key={spec?.id} className="hover:text-black my-2 duration-300">
              <Link to={`/specialization/${spec?.id}`}>{spec?.label}</Link>
            </li>
          ))}
        </ul>
      ),
    },
    {
      route: "#contact",
      page: "contact",
    },
    {
      route: "#",
      page: "language",
      nestedRoutes: true,
      comp: (
        <ul className="absolute invisible  duration-300 -translate-y-32 opacity-0 top-12 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 text-white bg-[#1f253a] p-4 rounded w-[80px] text-center space-y-4 hover:text-[#eeff00]">
          <li>
            <button className="hover:text-[#eeff00]"onClick={() => changeLang("ar")}>
              <Translate text="AR" />
            </button>
          </li>
          <li>
            <button className="hover:text-[#eeff00]"  onClick={() => changeLang("en")}>
              <Translate text="EN" />
            </button>
          </li>
        </ul>
      ),
    },
  ];

  return (
    <nav className="container flex flex-col md:flex-row items-center justify-between py-4 px-6 md:px-12 bg-[#1f253a] text-white max-w-[2200px]">
      <div className="flex justify-between items-center w-full md:w-auto lg:mt-[25px] xl:mt-[23px]">
        <Link to="/home">
          <img src={images.navlogo} alt="logo" className={`${styles.img} w-32`} />
        </Link>
        <button
          className="md:hidden block text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      <ul
        className={`${
          isMenuOpen ? "block" : "hidden"
        } md:flex flex-col md:flex-row items-center gap-4 md:gap-8 lg:mt-[22px] md:mt-0 w-full md:w-auto -ml-[120px]  `}
      >
        {navLinks.map((link) => (
          <li
            key={link.page}
            className="relative z-20 hoverEffect group py-2 md:py-0"
          >
            {link.page === "contact" ? (
              <a href="#contact" className="block px-4 py-2">
                <Translate text="contact" />
              </a>
            ) : (
              <Link to={!token ? "/login" : link.route} className="block px-4 py-2">
                <Translate text={link.page} />
              </Link>
            )}
            {link.nestedRoutes && link.comp}
          </li>
        ))}
      </ul>
      {token ? (
        <div className="flex flex-col md:flex-row items-center mt-4 md:mt-0">
          <div className="flex items-center mb-4 md:mb-0 xl:-ml-[62px] xl:mt-[4px] ">
            <input
              type="text"
              className="px-2 py-1 rounded-md text-black"
              onChange={(e) => setSearchVal(e.target.value)}
            />
            <button
              className="xl:ml-[135px] px-3 py-1 xl:mt-[23px] lg:mt-[23px] rounded-md text-[#7f9bff] hover:text-[#eeff00] "
              onClick={getSearchHandler} >
            <span className="xl:-ml-[200px]">
                <Translate text="search"  /></span>
            </button>
          </div>
          <Link
            to="/profile"
            className="flex items-center gap-x-2 text-[#7f9bff] text-medium hover:text-[#eeff00] xl:-ml-[20%] "
          >
            <ProfileIcon />
            <Translate text="profile" />
          </Link>
          <Logout />
        </div>
      ) : (
        <button
          className="xl:mt-[25px] md:mt-0 px-3 py-1 rounded-md text-[#7f9bff] hover:text-[#eeff00] "
          onClick={() => navigate("/login")}
        >
          <Translate text="Login" />
        </button>
      )}
    </nav>
  );
};

export default Navbar;

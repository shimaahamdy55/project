import { useQuery } from "@tanstack/react-query"
import { MenuIcon, MessageCircleMore } from "lucide-react"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getData } from "../../../api/getData"
import ProfileIcon from "../../../icons/ProfileIcon"
import styles from "../../../styles/navbar.module.css"
import { images } from "../../../utils/images"
import Translate from "../../ui/Translate"
import Logout from "./Logout"
const Navbar = () => {
  const token = localStorage.getItem("sego_token")
  const [isOpen, setIsOpen] = useState(false)
  const [searchVal, setSearchVal] = useState("")
  const navigate = useNavigate()
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
  //saerch box handler
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
        <ul className="absolute invisible duration-300 lg:-translate-y-40 max-lg:translate-x-40 opacity-0 top-12 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0  bg-[#1f253a] p-4 rounded w-[250px] items--center">
          {specializations?.map((spec: { id: number; label: string }) => (
            <li key={spec?.id} className="hover:text-black my-2 duration-300 ">
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
        <ul className="absolute invisible  duration-300 lg:-translate-y-40 max-lg:translate-x-40 opacity-0 top-12 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 text-white bg-[#1f253a] p-4 rounded w-[80px] text-center space-y-4">
          <li>
            <button onClick={() => changeLang("ar")}>
              <Translate text="AR" />
            </button>
          </li>
          <li>
            <button onClick={() => changeLang("en")}>
              <Translate text="EN" />
            </button>
          </li>
        </ul>
      ),
    },
  ]
  const fixedStyle =
    "items-center justify-between lg:justify-center capitalize bg-[#1f253a] px-16 m-0 duration-500 z-50"
  const responsive = `flex fixed lg:static w-full lg:w-auto ${
    isOpen && "h-screen"
  }`
  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth > 1200) setIsOpen(false)
    })
  }, [])
  return (
    <nav className={`${fixedStyle} ${responsive}`}>
      <Link to="/home" className="absolute top-0 left-16">
        <img src={images.navlogo} alt="" className={`${styles.img}`} />
      </Link>
      <ul
        className={`flex lg:flex-row flex-col items-center gap-x-8 ${
          !isOpen && "max-lg:-translate-y-full"
        }`}
      >
        {navLinks.map((link) => (
          <li
            key={link.page}
            className="relative z-20 hoverEffect group py-4 -ml-[10px]"
          >
            {link.page === "contact" ? (
              <a href="#contact">
                <Translate text="contact" />
              </a>
            ) : (
              <Link to={!token ? "/login" : link.route}>
                <Translate text={link.page} />
              </Link>
            )}
            {link.nestedRoutes ? <>{link.comp}</> : null}
          </li>
        ))}
        {token ? (
          <div className="flex items-center gap-x-2">
            <div>
              {/* <SearchIcon /> */}
              <input
                type="text"
                className="mx-2"
                onChange={(e) => setSearchVal(e.target.value)}
              />
              <button
                className=""
                onClick={getSearchHandler}
              >
                <Translate text="search" />
              </button>
            </div>
            <Link
              to="/profile"
              className="flex items-center text-[#7f9bff] text-medium hover:text-[yellow] mb-7"
            >
              <ProfileIcon />
            </Link>
            <MessageCircleMore
              onClick={() => {
                navigate("/chat")
              }}
              className="cursor-pointer mb-6 text-[#7f9bff] text-medium hover:text-[yellow]"
            />
            <Logout />
          </div>
        ) : (
          <button onClick={() => navigate("/login")}>
            <Translate text="Login" />
          </button>
        )}
      </ul>

      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="absolute top-8 right-16"
      >
        <MenuIcon className="text-white block lg:hidden" size={40} />
      </button>
    </nav>
  )
}

export default Navbar

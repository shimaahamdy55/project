import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProfileIcon from "../../../icons/ProfileIcon";
import Logout from "./Logout";
import { images } from "../../../utils/images";
import styles from "../../../styles/navbar.module.css";
import { useQuery } from "@tanstack/react-query";
import { getData } from "../../../api/getData";
import Translate from "../../ui/Translate";
import { Menu } from "lucide-react";
import { X } from "lucide-react";
const Navbar = () => {
    const token = localStorage.getItem('sego_token')
    const [searchVal, setSearchVal] = useState('')
    const navigate = useNavigate()
      const { data: specializations } = useQuery({
        queryKey: ['get-specializations'],
        queryFn: () => getData({
            endpoint: 'all/specializations'
        }),
        select: (data: any) => data.data.message.map((item: any) => ({
            id: item.id,
            label: item.name
        }))
      })
    //saerch box handler
     const getSearchHandler = () => {
        if(!searchVal) return
        navigate(`/search/${searchVal}`)
    }
    // change language
    const changeLang = (lang: 'en' | 'ar') => {
        const language = sessionStorage.getItem('lang')
        if (language === lang) return
        sessionStorage.setItem('lang', lang)
        window.location.reload()
    }

const navLinks = [
    {
        route: '/home',
        page: 'home'
    },
    {
        route: '/about',
        page: 'about'
    },
    {
            route: '#',
            page: 'specialization',
            nestedRoutes: true,
            comp: <ul className="absolute invisible duration-300 translate-y-32  opacity-0 top-12 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0  bg-[#1f253a] p-4 rounded w-[250px] items--center">
                {specializations?.map((spec: { id: number, label: string }) =>
                    <li key={spec?.id} className="hover:text-black my-2 duration-300"><Link to={`/specialization/${spec?.id}`}>{spec?.label}</Link></li>
                )}
            </ul>
        },
    {
         route: '#contact',
        page: 'contact'
    },
     {
            route: '#',
            page: 'language',
            nestedRoutes: true,
            comp: <ul className="absolute invisible duration-300 translate-y-32 opacity-0 top-12 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 text-white bg-[#1f253a] p-4 rounded w-[80px] text-center space-y-4">
                <li><button onClick={() => changeLang('ar')}><Translate text='AR' /></button></li>
                <li><button onClick={() => changeLang('en')}><Translate text='EN' /></button></li>
            </ul>
        },
    ]
  
  

    
    return (
        <nav className="container flex items-center justify-around pt-8 capitalize bg-[#1f253a] max-w-[2200px]">
            <Link to='/home' >
                <img src={ images.navlogo} alt=""className={`${styles.img }`} /> 
            </Link>
            <ul className="flex items-center gap-x-8 ">
                {navLinks.map(link => (
                    <li key={link.page} className="relative z-20 hoverEffect group py-4 -ml-[10px]">
                         {
                            link.page === 'contact' ?
                                <a href="#contact"><Translate text='contact' /></a>
                                :
                                <Link to={!token ? '/login' : link.route}><Translate text={link.page} /></Link>
                        }
                        {
                            link.nestedRoutes ?
                                <>
                                    {link.comp}
                                </>
                                : null
                        }
                    </li>
                ))
                }
            </ul>
        
            {
                token ?
                    <div className="flex items-center">
                        <div>
                            {/* <SearchIcon /> */}
                            <input type="text" className="mt-[12px] mr-5" onChange={(e) => setSearchVal(e.target.value)} />
                            <button  className="mb-[40px] mr-[7px] " onClick={getSearchHandler}><Translate text="search"/></button>
                        </div>
                        <Link to='/profile' className="flex items-center gap-x-2 ml-6 text-[#7f9bff] text-medium hover:text-[yellow] mb-7">
                            <ProfileIcon />
                           <Translate text="profile"/>
                        </Link>
                         <Logout />
                    </div>
                    : <button onClick={() => navigate('/login')}><Translate text="Login" /></button>
                 
            }
           
        </nav>
    )
}
  
export default Navbar
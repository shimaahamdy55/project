import { Image, Modal } from "@mantine/core"
import PhoneIcon from "../icons/PhoneIcon"
import MailIcon from "../icons/MailIcon"
import { useState } from "react"
import EditIcon from "../icons/EditIcon"
import UpdateUserForm from "../components/companies/UpdateUserForm"
import UpdateCompanyForm from "../components/companies/UpdateCompanyForm"
import { Link, useNavigate } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { getData } from "../api/getData"

const Profile = () => {
  const [openUpdateUser, setOpenUpdateUser] = useState(false)
  const navigate = useNavigate()
  const { data } = useQuery({
    queryKey: ["profile"],
    queryFn: () =>
      getData({
        endpoint: "profile",
      }),
     select: (data) => {
      if(data?.data.message === ' Token invaild!'){
        navigate("/login")
      localStorage.removeItem("sego_user")
      localStorage.removeItem("sego_token")
      }
       return data?.data
    },
  })
  const isCompany = !!data?.message
  const userData = isCompany ? data?.message : data?.user
  return (
    <main className="container flex flex-col items-center justify-center gap-8 mx-auto px-4 md:px-8 lg:px-16 py-8 lg:py-16">
      <h2 className="text-xl md:text-2xl lg:text-3xl">{userData?.name}</h2>
      <div className="w-[150px] h-[150px] md:w-[200px] md:h-[200px] rounded-full overflow-hidden">
        <Image
          src={isCompany ? userData?.logo : userData?.image}
          className="w-full h-full"
          alt="profile"
        />
      </div>
      <button onClick={() => setOpenUpdateUser(true)}>
        <EditIcon />
      </button>
      <div className="w-full md:w-2/3 lg:w-1/2 ">
        <div
          className={`flex items-center my-4 md:my-8 gap-x-2 md:gap-x-4 ${isCompany && "hidden"}`}
        >
          <PhoneIcon />
          <span>{userData?.phone}</span>
        </div>
        {/* <p className={`flex items-center gap-x-1 md:gap-x-2 ${!isCompany && "hidden"}`}>
          location: <span>{userData?.location}</span>
        </p>
        <p className={`flex items-center gap-x-1 md:gap-x-2 ${!isCompany && "hidden"}`}>
          specialization: <span>{userData?.specilaization_name}</span>
        </p>
        <p className={`flex items-center gap-x-1 md:gap-x-2 ${!isCompany && "hidden"}`}>
          overview: <span>{userData?.overview}</span>
        </p> */}
        <div className="flex items-center gap-x-1 md:gap-x-2">
          <MailIcon />
          <span>{userData?.email}</span>
        </div>
        <p
          className={`flex items-center gap-x-1 md:gap-x-2 ${
            !userData?.country && "hidden"
          }`}
        >
          country: <span>{userData?.country}</span>
        </p>
        <Link
          to={`/company/${userData?.id}`}
          className={`${!isCompany && "hidden"}`}
        >
          show projects
        </Link>
      </div>
      <Modal
        opened={openUpdateUser}
        onClose={() => setOpenUpdateUser(false)}
        size="lg"
        centered
      >
        {!isCompany ? (
          <UpdateUserForm
            user={userData}
            setOpenUpdateUser={setOpenUpdateUser}
          />
        ) : (
          <UpdateCompanyForm
            company={userData}
            setOpenUpdateCompany={setOpenUpdateUser}
          />
        )}
      </Modal>
    </main>
  )
}

export default Profile

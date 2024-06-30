import { Button, FileInput, Image, Modal } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { getData } from "../api/getData"
import { postData } from "../api/postData"
import ProjectCard from "../components/companies/ProjectCard"
import UpdateCompanyForm from "../components/companies/UpdateCompanyForm"
import Input from "../components/ui/Input"
import Translate from "../components/ui/Translate"
import useTranslate from "../hooks/useTranslate"
import MailIcon from "../icons/MailIcon"
import PhoneIcon from "../icons/PhoneIcon"
import EditIcon from "../icons/EditIcon"
import { FaLinkedin } from "react-icons/fa6";
// import { MessageCircleMore } from "lucide-react"
// import Chat from "../components/chat/Chat"

export type Project = {
  name: string
  image1: string
  description: string
  id: number
}

type Values = {
  image1: string
  name: string
  description: string
  company_name: string
}

const Company = () => {
   const userType = JSON.parse(localStorage.getItem('sego_user')!).type
  const locale: any = useTranslate()
  const { id } = useParams()
  const [openModal, setOpenModal] = useState(false)
  const [openForm, setOpenForm] = useState(false)
  const [openChatModal, setOpenChatModal] = useState(false)
  const [openUpdateCompany, setOpenUpdateCompany] = useState(false)
  const { data, refetch } = useQuery({
    queryKey: ["get-company", id],
    queryFn: () =>
      getData({
        endpoint: `show/company/${id}`,
      }),
    select: (data: any) => data.data.message,
  })

  const form = useForm<Values>({
    initialValues: {
      company_name: "",
      description: "",
      image1: "",
      name: "",
    },
    validate: {
      name: (value) =>
        value.trim().length >= 3 ? null : "must be at least 3 characters",
      company_name: (value) =>
        value.trim().length >= 3 ? null : "must be at least 3 characters",
      description: (value) =>
        value.trim().length >= 3 ? null : "must be at least 3 characters",
      image1: (value) => !value && "required field",
    },
  })

  const { mutate } = useMutation({
    mutationKey: ["add-project", id],
    mutationFn: (data: Values) =>
      postData({
        endpoint: `add/project/${id}`,
        data,
        formData: true,
      }),
    onSuccess: () => {
      refetch()
      setOpenForm(false)
    }
  })

  const addProjectHandler = (values: Values) => {
    mutate(values)
  }

  return (
    <div className="container mx-auto flex flex-col items-center justify-center gap-8 p-4 sm:p-8 pb-16 mt-[25px]">
     <button hidden={userType === 'user'} className=" hover:text-black duration-300 rounded-md p-2 text-[#1c3383] mr-[56%] -mb-[12%]" onClick={() => setOpenUpdateCompany(true)}><EditIcon/><Translate text="Edit"/></button>
      <button 
      // hidden={userType === 'company'} 
      className=" hover:text-black duration-300 rounded-md p-2 text-[#1c3383]" onClick={() => setOpenChatModal(true)}><MessageCircleMore/></button>
      <div className="w-[150px] h-[150px] overflow-hidden rounded-full md:self-start">
        <Image
          src={data?.logo}
          className="w-full h-full object-cover"
          alt="company"
        />
      </div>
      <p className="text-center text-xl text-[#1c3383] lg:self-start md:self-start ">{data?.name}</p>
      <div className="text-center md:text-left">
        <h3 className=" text-lg text-[#1f253a] mb-6 lg:-ml-[100px] xl:-ml-[8%]">{data?.overview}</h3>
        <div className="flex items-center gap-x-2 text-[#1f253a] hover:text-[#5e66b6] justify-center md:justify-start lg:-ml-[100px]  xl:-ml-[%] ">
          <MailIcon />
          <span>{data?.email}</span>
        </div>
      </div>
      <h2 className="text-2xl py-8">
        <Translate text="Projects" />
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
        {data?.projects.map((project: Project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
       <button className="  hover:text-black rounded-sm text-xl  text-[#1c3383] bg-slate-100 pb-20 relative transition ease-in-out  hover:-translate-y-1 hover:scale-90 duration-300"title='Add Project' onClick={() => setOpenForm(true)}><span className="text-8xl mb-[50px]">+</span> <br/><Translate text="Add Project"/></button>
      </div>
      <Button className="bg-[#1c3383] hover:bg-gray-700 hover:text-white duration-300 p-2" onClick={() => setOpenModal(true)}>
        <Translate text="Contact us" />
      </Button>
   <Modal
  opened={openModal}
  onClose={() => setOpenModal(false)}
  size="lg"
  centered
>
  <div className="flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12">
    <p className="text-lg sm:text-xl text-[#1c3383] mb-4">
      <Translate text="Keep In touch with us" />
    </p>
    <div className="flex flex-col sm:flex-row sm:flex-wrap items-center justify-center gap-4">
      <div className="flex items-center gap-x-2 sm:gap-x-4 ">
        <PhoneIcon />
        <a className="text-[#1c3383] hover:text-black -ml-[20px] ">0123456789</a>
      </div>
      <div className="flex items-center gap-x-2 sm:gap-x-4 text-[#1c3383] hover:text-black">
        <MailIcon />
        <a className="text-[#1c3383] hover:text-black -ml-[20px]">company@company.mail</a>
      </div>
      <div className="flex items-center gap-x-2 sm:gap-x-4 text-[#1c3383] hover:text-black">
        <FaLinkedin className="text-lg"/>
        <a href="https://www.linkedin.com/in/mechahmedradwan?utm_so..." className="text-[#1c3383] hover:text-black -ml-[20px]" target="_blank"> company linkdin </a>
      </div>
    </div>
  </div>
</Modal>


      <Modal
        opened={openUpdateCompany}
        onClose={() => setOpenUpdateCompany(false)}
        size={1000}
        centered
      >
        <h2 className="text-center text-3xl text-[#1c3383] mb-4">
          <Translate text="Update Company" />
        </h2>
        <UpdateCompanyForm
          company={data}
          setOpenUpdateCompany={setOpenUpdateCompany}
        />
      </Modal>
      <Modal
  opened={openForm}
  onClose={() => setOpenForm(false)}
  size="lg"
  centered
>
  <div className="px-4 sm:px-6 md:px-20 lg:px-20 py-6">
    <h2 className="text-center text-3xl mb-4">
      <Translate text="Add Project" />
    </h2>
    <form
      onSubmit={form.onSubmit(addProjectHandler)}
      className="flex flex-col gap-4 w-full max-w-lg mx-auto container shadow-lg p-4 bg-[#ebecf4]"
    >
      <Input form={form} name="name" placeholder="name" type="text" />
      <Input form={form} name="description" type="text" />
      <Input form={form} name="company_name" type="text" />
      <FileInput
        placeholder={locale?.yourLogo || "Your logo"}
        // @ts-ignore
        onChange={(file) => form.setFieldValue("image1", file)}
      />
      {form.errors?.image1 && (
        <p className="text-red-500">{form.errors?.image1}</p>
      )}
      <button
        className='bg-[#6063ad] hover:bg-gray-300 hover:text-black rounded-md text-white duration-200 px-2 py-1'
        type="submit"
      >
        <Translate text="Add Project" />
      </button>
    </form>
  </div>
</Modal>
 <Modal centered onClose={()=>setOpenChatModal(false)} opened={openChatModal} >
          <Chat company={data}/>
      </Modal>

    </div>
  )
}

export default Company

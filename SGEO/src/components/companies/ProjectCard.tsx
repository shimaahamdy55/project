import { FileInput, Image, Modal } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { postData } from "../../api/postData"
import DeleteIcon from "../../icons/DeleteIcon"
import EditIcon from "../../icons/EditIcon"
import { Project } from "../../pages/Company"
import Input from "../ui/Input"
import Translate from "../ui/Translate"
import useTranslate from "../../hooks/useTranslate"
type ProjectCard = {
    project: Project
}
type Values = {
    image1: string
    name: string
    description: string
    type?: 'edit' | 'delete'
}
const ProjectCard = ({ project }: ProjectCard) => {
    const locale: any = useTranslate() 
    
    const [openForm, setOpenForm] = useState(false)
    const [openConfirmation, setOpenConfirmation] = useState(false)
    const queryClient = useQueryClient()


    const form = useForm<Values>({
        initialValues: {
            description: '',
            image1: '',
            name: '',
        },
        validate: {
            name: (value) => value.trim().length >= 3 ? null : 'must be at least 3 characters',
            description: (value) => value.trim().length >= 3 ? null : 'must be at least 3 characters',
            image1: (value) => !value && 'required field',
        }
    })

    const { mutate } = useMutation({
      mutationKey: ['delete-project', project?.id],
        mutationFn: (data: Values) => postData({
            endpoint: data.type === 'delete' ? `DeleteProject/${project.id}` : `updateProject/${project.id}`,
            data: data.type === 'delete' ? {
               _method: 'DELETE'
            } : data,
            formData: data.type === 'edit'
        }),
        onSuccess: () => {
            queryClient.refetchQueries({ queryKey: ['get-company', project.id] })
        }
    })

    return (
        <div className="bg-slate-100 pb-20 relative transition ease-in-out   hover:-translate-y-1 hover:scale-90 duration-300 rounded-md">
            <div className="h-[200px] w-full ">
                <Image src={project.image1} alt={project.name} className="w-full h-[200px] object-cover rounded-t" />
            </div>
            <h3 className="text-xl px-4 text-[#1c3383]">{project.name}</h3>
            <p className="px-4 mt-4 text-gray-700">{project.description}</p>
            <button className="absolute top-4 right-4 text-[#1c3383] " onClick={() => setOpenConfirmation(true)}>
                <DeleteIcon />
            </button>
            <button className="absolute top-4 left-4 text-[#1c3383]" onClick={() => setOpenForm(true)}>
                <EditIcon />
            </button>
        <Modal opened={openForm} onClose={() => setOpenForm(false)} size={1000} centered>
    <h2 className="text-center text-3xl text-[#1c3383] mb-5">
        <Translate text="update Project" />
    </h2>
    <form 
        onSubmit={form.onSubmit((values) => mutate({ ...values, type: 'edit' }))} 
        className='flex flex-col gap-4 w-full max-w-sm mx-auto p-4 bg-[#ebecf4] shadow-lg'
    >
        <Input form={form} name='name' placeholder='name' type='text' />
        <Input form={form} name='description' type='text' />
        <FileInput
            placeholder={locale?.yourLogo || "Your logo"}
            // @ts-ignore
            onChange={file => form.setFieldValue('image1', file)}
        />
        {form.errors?.image1 && <p className='text-red-500'>{form.errors?.image1}</p>}
        <button className="bg-[#1c3383] hover:bg-gray-500 hover:text-black p-2 rounded-md text-white" type="submit">
            <Translate text="update" />
        </button>
    </form>
</Modal>

          <Modal opened={openConfirmation} onClose={() => setOpenConfirmation(false)} size={1000} centered>
    <h3 className="text-2xl text-center capitalize text-[#1c3383] mb-4">
        <Translate text="are you sure you want to delete this project" />
    </h3>
    <div className="flex flex-col sm:flex-row items-center gap-5 justify-center my-8">
        <button 
            className="text-white hover:text-[#1c3383] p-1 rounded-md bg-[#1c3383] hover:bg-white w-full sm:w-auto"
            onClick={() => setOpenConfirmation(false)}
        >
            <Translate text="Cancel" />
        </button>
        <button 
            className="text-white hover:text-[#1c3383] p-1 rounded-md bg-[#1c3383] hover:bg-white w-full sm:w-auto"
            onClick={() => mutate({ type: 'delete' } as Values)}
        >
            <Translate text="Confirm" />
        </button>
    </div>
</Modal>

        </div>
    )
}

export default ProjectCard
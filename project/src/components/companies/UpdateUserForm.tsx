import { useForm } from "@mantine/form"
import Input from "../ui/Input"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { FileInput } from "@mantine/core"
import { postData } from "../../api/postData"
import Translate from "../ui/Translate"
import useTranslate from "../../hooks/useTranslate"
type UpdateUserForm = {
  user:any
  setOpenUpdateUser: React.Dispatch<React.SetStateAction<boolean>>
}
type Values = {
    name: string,
    email: string,
    phone: string,
    country: string
}
const UpdateUserForm = ({user,setOpenUpdateUser}:UpdateUserForm) => {
  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationKey: ['register'],
    mutationFn: (data: Values) => postData({
        endpoint: 'updataUser',
        data,
        formData:true
    }),
    onSuccess:(data)=>{
       if(data?.status === 200){
        setOpenUpdateUser(false)
        queryClient.refetchQueries({queryKey:['profile']})
       }
    }
})
  const form = useForm<Values>({
    initialValues: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        country: user.country,
    },
    validate: {
        name: (value) => value.trim().length >= 3 ? null : 'must be at least 3 characters',
        email: (value) => value.trim().length >= 3 ? null : 'must be at least 3 characters',
        phone: (value) => value.trim().length >= 3 ? null : 'must be at least 3 characters',
        country: (value) => value.trim().length >= 3 ? null : 'must be at least 3 characters',
    }
})
  return (
    <form onSubmit={form.onSubmit((values)=>mutate(values))} className='flex flex-col gap-4 w-1/3 mx-auto container sectionPadding shadow-lg p-4 mt-16'>
    <h2 className='text-center text-2xl'><Translate text="update user"/></h2>
    <Input form={form} name='name' placeholder='name' type='text' />
    <Input form={form} name='email' type='email' />
    <Input form={form} name='phone' type='phone' />
    <Input form={form} name='country' type='country' />
    {/* <FileInput
        
        placeholder={locale?.yourLogo || "Your logo"}
        // @ts-ignore
        onChange={file => form.setFieldValue('logo', file)}
    /> */}
    {/* {
      form.errors?.logo &&
        <p className='text-red-500'>{form.errors?.logo}</p>
    } */}
    <button type="submit"><Translate text="update"/></button>
</form>
  )
}

export default UpdateUserForm
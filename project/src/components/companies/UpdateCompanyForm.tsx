import { useForm } from "@mantine/form"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { postData } from "../../api/postData"
import Input from "../ui/Input"
import Translate from "../ui/Translate"
type UpdateCompanyForm = {
  company: any
  setOpenUpdateCompany: React.Dispatch<React.SetStateAction<boolean>>
}
type Values = {
  name: string
  overview: string
  email: string
  //logo: string
  // specialization: string
}
const UpdateCompanyForm = ({
  company,
  setOpenUpdateCompany,
}: UpdateCompanyForm) => {
  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationKey: ["register"],
    mutationFn: (data: Values) =>
      postData({
        endpoint: "updataCompany",
        data,
        formData: true,
      }),
    onSuccess: (data) => {
      if (data?.status === 200) {
        setOpenUpdateCompany(false)
        queryClient.refetchQueries({ queryKey: ["profile"] })
      }
    },
  })
  const form = useForm<Values>({
    initialValues: {
      name: company.name,
      overview: company.overview,
      email: company.email,
      // logo: '',
      // specialization: company.specilaization_name,
    },
    validate: {
      name: (value) =>
        value.trim().length >= 3 ? null : "must be at least 3 characters",
      overview: (value: any) =>
        value?.trim().length >= 3 ? null : "must be at least 3 characters",
      // specialization: (value: any) =>
      //   value?.trim().length >= 3 ? null : "must be at least 3 characters",
    },
  })

  return (
    <form
      onSubmit={form.onSubmit((values) => mutate(values))}
      className="flex flex-col gap-4 w-1/3 mx-auto container sectionPadding shadow-lg p-4 bg-[#ebecf4]"
    >
      <Input form={form} name="name" placeholder="name" type="text" />
      <Input form={form} name="email" type="email" />
      <Input form={form} name="overview" type="text" />
      {/* <Input form={form} name="specialization" type="text" /> */}
      {/* <FileInput
          
        
         placeholder={locale?.yourLogo || "Your logo"}
        // @ts-ignore
        onChange={file => form.setFieldValue('logo', file)}
    />
    {
      form.errors?.logo &&
        <p className='text-red-500'>{form.errors?.logo}</p>
      } */}
      <button
        className="text-white hover:text-[#1c3383] p-1 rounded-md bg-[#1c3383] hover:bg-[gray] "
        type="submit"
      >
        <Translate text="update" />
      </button>
    </form>
  )
}

export default UpdateCompanyForm
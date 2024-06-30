import { Button, FileInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { postData } from "../api/postData"
import Input from "../components/ui/Input"
import SelectSpecialization from "../components/ui/SelectSpecialization"
import Translate from "../components/ui/Translate"
import useTranslate from "../hooks/useTranslate"
import styles from "../styles/signup.module.css"

type Values = {
  name: string
  email: string
  password: string
  country: string
  overview?: string
  phone?: string
  location: string
  image?: string
  specialization: string
}

const Signup = () => {
  const locale: any = useTranslate()
  const [userSignup, setUserSignup] = useState(true)
  const navigate = useNavigate()
  const { mutate, isPending } = useMutation({
    mutationKey: ["register"],
    mutationFn: (data: Values) =>
      postData({
        endpoint: userSignup ? `register` : `company/register`,
        data,
        formData: true,
      }),
    onSuccess: () => {
      navigate("/login")
    },
  })

  const form = useForm<Values>({
    initialValues: {
      name: "",
      email: "",
      password: "",
      overview: "",
      country: "",
      phone: "",
      location: "",
      image: "",
      specialization: "",
    },
    validate: {
      name: (value) =>
        value.trim().length >= 3 ? null : "must be at least 3 characters",
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.trim().length >= 8
          ? null
          : "password must be at least 8 characters",
      overview: (value: any) =>
        userSignup
          ? null
          : value?.trim().length >= 3
          ? null
          : "must be at least 3 characters",
      phone: (value: any) =>
        !userSignup
          ? null
          : value?.trim().length >= 9
          ? null
          : "must be at least 9 numbers",
      location: (value: any) =>
        userSignup
          ? null
          : value?.trim().length >= 3
          ? null
          : "must be at least 3 characters",
      country: (value) =>
        value.trim().length >= 3 ? null : "must be at least 3 characters",
      specialization: (value: any) =>
        userSignup ? null : !!value ? null : "must be at least 3 characters",
    },
  })

  const submitHandler = (values: Values) => {
    if (userSignup) {
      delete values.overview
    }
    mutate(values)
  }

  return (
    <form
      onSubmit={form.onSubmit(submitHandler)}
      className="flex flex-col gap-4 w-11/12 sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 mx-auto container sectionPadding shadow-lg p-4 mt-16 bg-[#ebecf4] rounded-lg"
    >
      <h2 className="text-center text-2xl font-bold mb-6 text-[#6063ad]">
        {userSignup ? (
          <Translate text="Signup as user" />
        ) : (
          <Translate text="Signup as company" />
        )}
      </h2>

      <Input
        form={form}
        name="name"
        placeholder="name"
        type="text"
        className={`${styles.relative}`}
      />
      <Input form={form} name="email" type="email" />
      <Input form={form} name="password" type="password" />
      <Input form={form} name="overview" type="text" hidden={userSignup} />
      <Input form={form} name="phone" type="number" hidden={!userSignup} />
      <Input form={form} name="country" type="text" />
      <Input form={form} name="location" type="text" hidden={userSignup} />
        <Input form={form} name="add links" type="text" hidden={userSignup} />
      <div hidden={userSignup}>
        <SelectSpecialization form={form} />
      </div>
      <FileInput
        hidden={userSignup}
        placeholder="Your logo"
        onChange={(file) => form.setFieldValue("logo", file)}
      />
        <FileInput
        hidden={!userSignup}
        placeholder={locale?.yourLogo || "Your logo"}
        // @ts-ignore
        onChange={(file) => form.setFieldValue("image", file)}
      />
      {userSignup && <p className="text-red-500">{form.errors?.image}</p>}
      <Button
        className="bg-[#6063ad] hover:bg-[gray] hover:text-black text-white font-medium"
        type="submit"
        loading={isPending}
      >
        <Translate text="Sign up" />
      </Button>

      <div className="flex justify-evenly">
        <button
          className="bg-[#6063ad] hover:bg-[gray] hover:text-black text-white font-medium p-2 rounded-md"
          type="button"
          onClick={() => setUserSignup((prev) => !prev)}
        >
          {userSignup ? (
            <Translate text="company signup" />
          ) : (
            <Translate text="user signup" />
          )}
        </button>
        <Link
          to="/login"
          className="bg-[#6063ad] hover:bg-[gray] hover:text-black text-white font-medium duration-200 rounded-md"
        >
          <Translate text="Login" />
        </Link>
      </div>
    </form>
  )
}

export default Signup

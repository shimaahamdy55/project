import { Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { postData } from '../api/postData';
import Input from '../components/ui/Input';
import Translate from '../components/ui/Translate';

type Values = {
    email: string,
    password: string
}

const Login = () => {
    const [userLogin, setUserLogin] = useState(true)
    const navigate = useNavigate()
    const token = localStorage.getItem('sego_token')
    if (token) {
        // @ts-ignore
        window.location = '/home'
        return
    }
    const form = useForm<Values>({
        initialValues: {
            email: '',
            password: ''
        },
        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            // password: (value) => value.trim().length >= 8 ? null : 'password must be at least 8 characters',
        }
    })
    const { mutate, isPending } = useMutation({
        mutationKey: ['login'],
        mutationFn: (values:Values ) => postData({
            endpoint: userLogin ? `login` : `company/login`,
            data:values,
        }),
        onSuccess: data => {
            if (data?.status === 200) {
                const token = data?.data?.token ? data?.data?.token : data?.data?.authorisation?.token
                localStorage.setItem('sego_token', token)
                localStorage.setItem('sego_user', JSON.stringify(userLogin ? {...data?.data?.user,type:"user"} : {...data?.data?.message,type:"company"}))
                navigate('/home')
            }
        }
    })
    const submitHandler = (values: Values) => {
        mutate(values)
    }
    return (
        <form onSubmit={form.onSubmit(submitHandler)} className='flex flex-col gap-8 w-11/12 sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 mx-auto container sectionPadding shadow-lg p-4 mt-16 bg-[#ebecf4] rounded-lg'>
             <h2 className='text-center text-3xl text-[#6063ad]'>{userLogin ? <Translate text='Login as user'/> : <Translate text='Login as company'/>}</h2>
            <Input form={form} name='email' />
            <Input form={form} name='password' type='password' />
            <Button className='bg-[#6063ad] hover:bg-[gray] text-white hover:text-black font-medium' type='submit' loading={isPending}><Translate text='submit'/></Button>
          
            <div className='flex justify-evenly'>
                 <button type='button'className='bg-[#6063ad] hover:bg-[gray] hover:text-black p-2 rounded-md text-white' onClick={() => setUserLogin(prev => !prev)}>{userLogin ? <Translate text='company login'/> : <Translate text='user login'/>}</button>
                <Link to='/signup' className='bg-[#6063ad] rounded hover:bg-[gray]  hover:text-black duration-200 rounded-md text-white'><Translate text='signup'/></Link>
                
            </div>
        </form>
    )
}

export default Login

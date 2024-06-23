
import { Image, Modal } from '@mantine/core';
import PhoneIcon from '../icons/PhoneIcon';
import MailIcon from '../icons/MailIcon';
import { useState } from 'react';
import EditIcon from '../icons/EditIcon';
import UpdateUserForm from '../components/companies/UpdateUserForm';
import UpdateCompanyForm from '../components/companies/UpdateCompanyForm';
import { Link } from 'react-router-dom';

const Profile = () => {
    const [openUpdateUser, setOpenUpdateUser] = useState(false)

    const userData = JSON.parse(localStorage.getItem('sego_user')!)
    const isCompany = !!userData?.specilaization_name
    return (
        <main className='container flex flex-col items-center justify-center gap-8 mx-auto sectionPadding'>
            <h2 className='text-2xl'>{userData?.name}</h2>
            <div className='w-[200px] h-[200px] rounded-full overflow-hidden'>
                <Image src={isCompany ? userData?.logo : userData?.image} className='w-full h-full' alt='profile'/>
            </div>
            <button onClick={() => setOpenUpdateUser(true)}><EditIcon /></button>
            <div>
                <div className={`flex items-center my-8 gap-x-4 ${isCompany && 'hidden'}`}>
                    <PhoneIcon />
                    <span>{userData?.phone}</span>
                </div>
                <p className={`flex items-center gap-x-2 ${!isCompany && 'hidden'}`}>
                   location: <span>{userData?.location}</span>
                </p>
                <p className={`flex items-center gap-x-2 ${!isCompany && 'hidden'}`}>
                   specialization: <span>{userData?.specilaization_name}</span>
                </p>
                <p className={`flex items-center gap-x-2 ${!isCompany && 'hidden'}`}>
                   overview: <span>{userData?.overview}</span>
                </p>
                <div className='flex items-center gap-x-2'>
                    <MailIcon />
                    <span>{userData?.email}</span>
                </div>
                <p className={`flex items-center gap-x-2 ${!userData?.country && 'hidden'}`}>
                   country: <span>{userData?.country}</span>
                </p>
                <Link to={`/company/${userData?.id}`} className={`${!isCompany && 'hidden'}`}>
                   show projects
                </Link>
            </div>
            <Modal opened={openUpdateUser} onClose={() => setOpenUpdateUser(false)} size={1000} centered>
                {
                    !isCompany ? 
                    <UpdateUserForm user={userData} setOpenUpdateUser={setOpenUpdateUser}/>
                    :
                    <UpdateCompanyForm company={userData} setOpenUpdateCompany={setOpenUpdateUser}/>
                }
            </Modal>
        </main>
    )
}

export default Profile
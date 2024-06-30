import { Image } from '@mantine/core'
import { Link } from 'react-router-dom'
type Company = {
    company: {
        id: number
        logo: string
        name: string
        overview: string
    }
}
const CompanyCard = ({ company }: Company) => {
     const token = localStorage.getItem('sego_token')
    return (
        <div className='relative group overflow-hidden transition ease-in-out   hover:-translate-y-1 hover:scale-90 duration-300 rounded-md'>
            <Link to={token?`/company/${company?.id}`:`/login`} className='w-full'>
                <Image src={company?.logo} className='h-full w-full  text-center object-cover' alt={company?.name} />
            </Link>
            <div className='translate-y-full group-hover:-translate-y-full duration-300 bg-[#fff] bg-opacity-50  '>
                <p className='text-xl font-bold text-yellow-600 text-center'>{company?.name} </p>
                <p className='text-center '>{company?.overview} </p>
            </div>
        </div>
    )
}

export default CompanyCard
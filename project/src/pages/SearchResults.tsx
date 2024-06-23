import { Image } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import { Link, useParams } from 'react-router-dom'
import { getData } from '../api/getData'

const SearchResults = () => {
    const { search } = useParams()
    const { data: companies, isLoading } = useQuery({
        queryKey: ['search', search],
        queryFn: () => getData({
            endpoint: `search/${search}`
        }),
        enabled: !!search,
        select: data => data?.data?.message
    })
    if (isLoading) return <p className='text-center text-4xl capitalize text-[#1c3383]'>loading</p>
    if (companies === 'not found') return <p className='text-center text-4xl capitalize'>no data found</p>
    return (
        companies?.map((company: any) =>
            <div key={company?.id} className='flex flex-col-2 mb-[25px] mt-[30px] ml-[100px] bg-slate-100' >
                <Link to={`/company/${company?.id}`} className='w-[250px] rounded-md transition ease-in-out   hover:-translate-y-1 hover:scale-90 duration-300'>
                    <Image src={company?.logo} className='h-full w-full rounded-full' alt={company?.name} />
                </Link>
                <p className='w-[22%] p-4 h-[60px] text-center text-[#1c3383] mt-[4%]'>{company?.name} </p>
            </div>
        )
    )
}

export default SearchResults
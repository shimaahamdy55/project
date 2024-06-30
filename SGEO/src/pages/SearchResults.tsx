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
       <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4'>
            {companies?.map((company: any) =>
                <div key={company?.id} className='flex flex-col items-center bg-slate-100 p-4 rounded-md shadow-md'>
                    <Link to={`/company/${company?.id}`} className='w-[150px] md:w-[200px] lg:w-[250px] rounded-full transition-transform ease-in-out hover:-translate-y-1 hover:scale-90 duration-300'>
                        <Image src={company?.logo} className='w-full h-full rounded-full' alt={company?.name} />
                    </Link>
                    <p className='mt-4 text-center text-[#1c3383] text-base md:text-lg lg:text-xl'>{company?.name}</p>
                </div>
            )}
        </div>
        )
    
}

export default SearchResults
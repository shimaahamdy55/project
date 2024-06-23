import { Loader } from "@mantine/core"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { getData } from "../api/getData"
import CompanyCard from "../components/companies/CompanyCard"

const Specialization = () => {
    const { id } = useParams()
    const { data: companies, isLoading } = useQuery({
        queryKey: ['get-company', id],
        queryFn: () => getData({
            endpoint: `specialization/companies/${id}`
        }),
        select: (data: any) => data.data.message
    })
    if (isLoading) return <div className="flex justify-center items-center p-32"><Loader /></div>
    return (
        <main className="text-center container sectionPadding mx-auto">
            <div className="grid grid-cols-3 gap-8 h-[1500px] rounded-md">
                {companies?.map((company: any) => <CompanyCard  company={company} />)}
            </div>
        </main>
    )
}

export default Specialization
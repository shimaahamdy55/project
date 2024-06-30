import CompanyCard from './CompanyCard'; // Adjust the import based on your file structure

type Company = {
    id: number;
    logo: string;
    name: string;
    overview: string;
}

type Props = {
    companies: Company[];
}

const CompanyGrid = ({ companies }: Props) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {companies.map(company => (
                <CompanyCard key={company.id} company={company} />
            ))}
        </div>
    );
};

export default CompanyGrid;
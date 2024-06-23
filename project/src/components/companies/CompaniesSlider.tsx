
import { Carousel } from '@mantine/carousel';
import { useQuery } from '@tanstack/react-query';
import { getData } from '../../api/getData';
import CompanyCard from './CompanyCard';
import { useRef } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import Translate from "../ui/Translate";

const CompaniesSlider = () => {
     const autoplay = useRef(Autoplay({ delay: 5000 }));
    const { data: companies } = useQuery({
        queryKey: ['companies'],
        queryFn: () => getData({
            endpoint: 'all/companies'
        }),
        select: (data: any) => data.data.message
    })
    return (
        <section className='sectionPadding'>
            <h2 className='text-center text-xl'><Translate text="Companies"/></h2>
            <Carousel className='mt-8' dir='ltr'
                 plugins={[autoplay.current]}
             onMouseEnter={autoplay.current.stop}
             onMouseLeave={autoplay.current.reset}
                withIndicators
                height={300}
                slideSize="33.333333%"
                slideGap="lg"
                loop
                align="start"
                slidesToScroll={3}>
                {
                    companies?.map((company: any) =>
                        <Carousel.Slide key={company?.id} className='relative flex flex-col justify-center items-center transition ease-in-out   hover:-translate-y-1 hover:scale-90 duration-300 rounded-md' >
                            <CompanyCard company={company} />
                        </Carousel.Slide>
                    )
                }
            </Carousel>
        </section>
    )
}
export default CompaniesSlider
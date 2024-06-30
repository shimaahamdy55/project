import { Carousel } from '@mantine/carousel';
import { useQuery } from '@tanstack/react-query';
import { getData } from '../../api/getData';
import CompanyCard from './CompanyCard';
import { useRef } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import Translate from "../ui/Translate";
import { useState, useEffect } from 'react';

// Custom hook to manage carousel configuration based on screen size
const useCarouselConfig = () => {
  const [slidesToShow, setSlidesToShow] = useState(3); // Default for large screens

  useEffect(() => {
    const updateSlides = () => {
      const windowWidth = window.innerWidth;
      if (windowWidth >= 992) {
        setSlidesToShow(3); // Large screens
      } else if (windowWidth >= 768) {
        setSlidesToShow(2); // Medium screens
      } else {
        setSlidesToShow(1); // Small screens
      }
    };

    // Initial call to set the correct number of slides
    updateSlides();

    window.addEventListener('resize', updateSlides);

    // Cleanup function to remove event listener on component unmount
    return () => window.removeEventListener('resize', updateSlides);
  }, []);

  return { slidesToShow };
};

const CompaniesSlider = () => {
  const { slidesToShow } = useCarouselConfig();
  const autoplay = useRef(Autoplay({ delay: 5000 }));

  const { data: companies } = useQuery({
    queryKey: ['companies'],
    queryFn: () => getData({
      endpoint: 'all/companies'
    }),
    select: (data: any) => data.data.message
  });

  // Calculate slide size based on slidesToShow
  const slideSize = `${100 / slidesToShow}%`;

  return (
    <section className='sectionPadding'>
      <h2 className='text-center text-xl'><Translate text="Companies" /></h2>
      <Carousel className='mt-8' dir='ltr'
        plugins={[autoplay.current]}
        onMouseEnter={autoplay.current.stop}
        onMouseLeave={autoplay.current.reset}
        withIndicators
        height={300}
        slideSize={slideSize}
        slideGap="lg"
        loop
        align="start"
        slidesToScroll={slidesToShow}
      >
        {
          companies?.map((company: any) =>
            <Carousel.Slide key={company?.id} className='relative flex flex-col justify-center items-center transition ease-in-out hover:-translate-y-1 hover:scale-90 duration-300 rounded-md'>
              <CompanyCard company={company} />
            </Carousel.Slide>
          )
        }
      </Carousel>
    </section>
  );
};

export default CompaniesSlider;

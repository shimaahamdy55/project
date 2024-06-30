import { Carousel } from '@mantine/carousel';
import { Image } from '@mantine/core';
import { images } from '../../../utils/images';
import { useRef, useState } from 'react';
import Autoplay from 'embla-carousel-autoplay';
// Media queries for different screen sizes
const mediaQueries = [
  '(max-width: 750px)', // Up to small screens
  '(min-width: 751px) and (max-width: 1024px)', // Medium screens
  '(min-width: 1025px)', // Large screens and above
];

const breakpoints = {
  [mediaQueries[0]]: {
    slidesToShow: 1, // Show only one slide on small screens
    controls: false, // Hide arrows on small screens
  },
  [mediaQueries[1]]: {
    slidesToShow: 2, // Show two slides on medium screens
    controls: {
      // Adjust arrow positioning and visibility based on screen size
      inline: true, // Display arrows within the carousel container
      position: 'outside', // Position arrows outside the carousel frame
      offset: '30px', // Adjust arrow offset from edges (optional)
    },
  },
  [mediaQueries[2]]: {
    slidesToShow: 3, // Show three slides on large screens and above
    controls: {
      // Adjust arrow positioning and visibility based on screen size
      inline: true, // Display arrows within the carousel container
      position: 'outside', // Position arrows outside the carousel frame
      offset: '50px', // Adjust arrow offset from edges (optional)
    },
  },
};

const sliderImages = [images.slider1, images.slider2]
 const settings = {
     dots: true,
     fade: true,
     infinite: true,
     speed: 500,
    slidesToShow: 1,
     slidesToScroll: 1,
     waitForAnimate: false,
    breakpoints,
  };
const HeaderSlider = () => {
    const autoplay = useRef(Autoplay({ delay: 3000 }));
    return (
        <Carousel className='mt-4 headerslider'  dir='ltr' height={500} {...settings} 
            plugins={[autoplay.current]}
             onMouseEnter={autoplay.current.stop}
             onMouseLeave={autoplay.current.reset}
             loop
                align="start"
               slidesToScroll={1} >
         {
                sliderImages.map(i =>
                    <Carousel.Slide key={i}>
                        <Image src={i} alt='hero slider' />
                    </Carousel.Slide>
                )
            }
        </Carousel>
    )
}

export default HeaderSlider


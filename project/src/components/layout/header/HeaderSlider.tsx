import { Carousel } from '@mantine/carousel';
import { Image } from '@mantine/core';
import { images } from '../../../utils/images';
import { useRef, useState } from 'react';
import Autoplay from 'embla-carousel-autoplay';

const sliderImages = [images.slider1, images.slider2, images.slider3, images.slider4]
const HeaderSlider = () => {
    const autoplay = useRef(Autoplay({ delay: 4000 }));
    return (
        <Carousel className='mt-8'  dir='ltr' height={650}
            plugins={[autoplay.current]}
             onMouseEnter={autoplay.current.stop}
             onMouseLeave={autoplay.current.reset}
             loop
                align="start"
               slidesToScroll={3} >
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
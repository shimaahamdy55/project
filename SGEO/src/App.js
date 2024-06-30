import React from 'react';
import { images } from '../../../utils/images';
import { useRef } from 'react';
import { BackgroundImage } from '@mantine/core';
function App() {
  const sliderImages = [images.slider1, images.slider2, images.slider3, images.slider4]
  return (
    <div className="max-w-[1400px] h-[780px] w-full m-auto py-16 px-4 relative ">
      <div style={{ BackgroundImage: `url(${images.slider1.url})` }} className='w-full h-full rounded-2xl bg-center bg-cover duration-500  '></div>
    </div>
    
  );
}

export default App;

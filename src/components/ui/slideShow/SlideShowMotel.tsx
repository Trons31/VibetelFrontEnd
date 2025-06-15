'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';

// Import your CSS Module
import { Lobster } from '@/config/fonts';
import Link from 'next/link';

export const SlideShowMotel = () => {
  return (
    <>
      <div className='flex justify-center py-1 mt-4' >
        <p className="text-2xl font-medium">
          ¡Explora los moteles más exclusivos cerca de ti!
        </p>
      </div>
      <Swiper
        slidesPerView={5}
        spaceBetween={30}
        autoplay={{
          delay: 2500
        }}
        modules={[Autoplay]}
        className=""
      >
        <SwiperSlide>
          <Link href="/" className='p-2 group' >
            <div className=' px-2' >
              <div className={`${Lobster.className} flex  justify-center group-hover:bg-red-600  group-hover:rounded-full transition-all duration-300  p-2`} >
                <p className='text-xl text-gray-700 group-hover:text-white' >Carpe Diem</p>
              </div>
              <div className='flex justify-center mt-1' >
                <p className='text-sm font-semibold' >20 habitaciones</p>
              </div>
            </div>
          </Link>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

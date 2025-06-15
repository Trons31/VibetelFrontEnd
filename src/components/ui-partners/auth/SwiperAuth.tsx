'use client';
import React from 'react';
import Image from 'next/image';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
// Import required modules
import { Autoplay, Navigation } from 'swiper/modules';

export const SwiperAuth = () => {
  return (
    <Swiper
      navigation={false}
      modules={[Navigation, Autoplay]}
      autoplay={{
        delay: 3500,
      }}
      className="h-screen w-full"
    >
      {/* Primer Slide */}
      <SwiperSlide className="relative flex flex-col justify-center bg-[#E4E4E4] text-center p-8">
        {/* Párrafo pegado a la parte derecha superior */}
        <div className="flex gap-2 justify-center md:justify-end ">
          <span className="text-xl md:text-xl antialiased ">Motel</span>
          <span className="text-xl md:text-xl antialiased"> Partners </span>
        </div>

        {/* El div centrado en la pantalla */}
        <div className="flex justify-between h-full items-center space-x-8">
          <div className="flex-shrink-0">
            {/* Imagen con tamaño fijo */}

            <Image
              src="/app/AuthAdmin2.png"
              width={300}
              height={400}
              alt='Logo1.png'
            />


          </div>
          <div className="text-left text-gray-700 w-1/2">
            {/* Texto */}
            <h2 className="text-2xl font-bold mb-2">Gestión Eficiente de Pagos</h2>
            <p className="text-md" style={{ textAlign: 'justify' }}>Controla y procesa los pagos de manera segura, asegurando una gestión transparente y sin complicaciones.</p>
          </div>
        </div>

        {/* Pequeño slogan en la parte inferior derecha */}
        <div className="absolute bottom-0 right-0 m-4 text-gray-700 text-sm">
          Gestiona tus pagos de manera <strong className='text-green-600' >eficiente</strong>  y <strong className='text-green-600' >segura</strong>
        </div>
      </SwiperSlide>

      <SwiperSlide className="relative flex flex-col justify-center bg-[#E4E4E4] text-center p-8">
        {/* Párrafo pegado a la parte derecha superior */}
        <div className="flex gap-2 justify-center md:justify-end ">
          <span className="text-xl md:text-xl antialiased ">Motel</span>
          <span className="text-xl md:text-xl antialiased"> Partners </span>
        </div> 

        {/* El div centrado en la pantalla */}
        <div className="flex justify-between h-full items-center space-x-8">
          <div className="flex-shrink-0">
            {/* Imagen con tamaño fijo */}
            <Image
              src="/app/AuthAdmin.png"
              width={300}
              height={400}
              alt='Logo1.png'
            />
          </div>
          <div className="text-left text-gray-700 w-1/2">
            {/* Texto */}
            <h2 className="text-2xl font-bold mb-2">Control y Personalización de Habitaciones</h2>
            <p className="text-md" style={{ textAlign: 'justify' }}>Crea, edita y organiza las habitaciones fácilmente para mejorar la experiencia de tus huéspedes.</p>
          </div>
        </div>

        {/* Pequeño slogan en la parte inferior derecha */}
        <div className="absolute bottom-0 right-0 m-4 text-gray-700 text-sm">
          <strong className='text-purple-600' >Crea</strong>  y <strong className='text-purple-600' >edita</strong>  tus habitaciones con facilidad
        </div>
      </SwiperSlide>

      <SwiperSlide className="relative flex flex-col justify-center bg-[#E4E4E4] text-center p-8">
        {/* Párrafo pegado a la parte derecha superior */}
        <div className="flex gap-2 justify-center md:justify-end ">
          <span className="text-xl md:text-xl antialiased ">Motel</span>
          <span className="text-xl md:text-xl antialiased"> Partners </span>
        </div>

        {/* El div centrado en la pantalla */}
        <div className="flex justify-between h-full items-center space-x-8">
          <div className="flex-shrink-0">
            {/* Imagen con tamaño fijo */}
            <Image
              src="/app/AuthAdmin3.png"
              width={300}
              height={400}
              alt='Logo1.png'
            />
          </div>
          <div className="text-left text-gray-700 w-1/2">
            {/* Texto */}
            <h2 className="text-2xl font-bold mb-2">Soporte Técnico 24/7</h2>
            <p className="text-md" style={{ textAlign: 'justify' }}>Recibe asistencia técnica especializada en todo momento para mantener tu sistema en funcionamiento óptimo.</p>
          </div>
        </div>

        {/* Pequeño slogan en la parte inferior derecha */}
        <div className="absolute bottom-0 right-0 m-4 text-gray-700 text-sm">
          Mejora la <strong className='text-blue-600' >visibilidad</strong>  y la  <strong className='text-blue-600' >ocupación</strong> de tu motel
        </div>
      </SwiperSlide>

    </Swiper>
  );
};

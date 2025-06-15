'use client';
import React, { CSSProperties } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Parallax, Pagination, Navigation, Autoplay } from 'swiper/modules';
import styles from './style.module.css';

export const SlideShow = () => {
  return (
    <>
      <Swiper
        style={{
          height: '300px',
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        } as CSSProperties}
        speed={600}
        parallax={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 2500
        }}
        navigation={true}
        modules={[Parallax, Pagination, Navigation, Autoplay]}
        className={styles.swiper}
      >
        <div
          slot="container-start"
          className={styles['parallax-bg']}
          style={{
            backgroundImage: "url('/app/room7.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          data-swiper-parallax="-23%"
        ></div>
        <SwiperSlide className={styles['swiper-slide']}>
          <div className={styles['overlay']}></div>
          <div className={styles['content']}>
            <div className={` ${styles['title']} `} data-swiper-parallax="-300">
              <p className='text-4xl mb-3' >  Encuentra Todos los Moteles </p>
            </div>
            <div className={`  ${styles['subtitle']} `} data-swiper-parallax="-200">
              <p className='text-3xl text-red-500' >Localiza el motel perfecto</p>
            </div>
            <div className={styles['text']} data-swiper-parallax="-100">
              <p className='text-xl' style={{ textAlign: 'justify' }} >
                En VibeTel podrás encontrar todos los moteles registrados en tu localidad.
                VibeTel te ofrece una forma más sencilla y fácil para acceder a la información
                de los moteles, con detalles completos y actualizados para que tomes la mejor decisión.
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className={styles['swiper-slide']}>
          <div className={styles['overlay']}></div>
          <div className={styles['content']}>
            <div className={styles['title']} data-swiper-parallax="-300">
              <p className='text-lg md:text-4xl mb-3' >Revoluciona tu Reserva</p>
            </div>
            <div className={styles['subtitle']} data-swiper-parallax="-200">
              <p className='text-3xl text-red-500' > Reserva fácil y rápido </p>
            </div>
            <div className={styles['text']} data-swiper-parallax="-100">
              <p className='text-xl' style={{ textAlign: 'justify' }}>
                VibeTel revoluciona la forma en que reservas tu habitación de motel.
                Disfruta de los mejores beneficios de ser un usuario en nuestra plataforma,
                con ofertas exclusivas y un proceso de reserva sencillo y seguro.
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className={styles['swiper-slide']}>
          <div className={styles['overlay']}></div>
          <div className={styles['content']}>
            <div className={styles['title']} data-swiper-parallax="-300">
              <p className='text-lg md:text-4xl mb-3' > Únete a Motel Partners </p>
            </div>
            <div className={styles['subtitle']} data-swiper-parallax="-200">
              <p className='text-3xl text-red-500' > Crece con nosotros </p>
            </div>
            <div className={styles['text']} data-swiper-parallax="-100">
              <p className='text-xl' style={{ textAlign: 'justify' }}>
                Si eres un motel, regístrate y sé parte de la comunidad Motel Partners.
                Aprovecha la visibilidad y los beneficios de estar en la plataforma líder en reservas de moteles,
                atrayendo a más clientes y aumentando tus reservas.
              </p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}

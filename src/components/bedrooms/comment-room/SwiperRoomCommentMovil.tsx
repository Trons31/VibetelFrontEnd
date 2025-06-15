'use client';
import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import styles from './swiper.module.css';

// Import Swiper styles
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import { FreeMode, Pagination } from 'swiper/modules';
import { formatDate } from '@/utils';
import { ModalDetailReview } from '@/components';
import { Rating } from '@/interfaces';


interface Props {
    ratings: Rating[];
}

export const SwiperRoomCommentMovil = ({ ratings }: Props) => {

    const [deatilComment, setDeatilComment] = useState(false);
    const [detailReview, setDetailReview] = useState<Rating>();


    const truncateComment = (comment: string | null, wordLimit: number): string => {
        if (!comment) return "Esta calificación no tiene comentarios.";

        // Eliminar espacios extra y dividir por palabras
        const words = comment.trim().split(/\s+/);

        return words.length > wordLimit
            ? words.slice(0, wordLimit).join(' ') + '...'
            : comment;
    };

    return (
        <>
            <ModalDetailReview
                isOpen={deatilComment}
                rating={detailReview!}
                onClose={() => setDeatilComment(false)}
            />


            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                freeMode={true}
                pagination={{
                    clickable: true,
                }}
                modules={[FreeMode, Pagination]}
                className="mySwiper"
            >
                {ratings.map((rating) => (

                    <SwiperSlide key={rating.id} className='p-3' >
                        <div className="relative">
                            {/* Fondo azul desplazado */}
                            <div className="absolute top-2 left-2 w-full h-full bg-gray-300 rounded-xl"></div>

                            {/* Contenedor de la card con borde negro */}
                            <div className="relative border border-black bg-white rounded-xl p-6 mb-5">
                                <p className="text-sm text-gray-700 mt-5">
                                    {truncateComment(rating.comment, 15) || "Esta calificación no tiene comentarios."}
                                </p>
                                <button
                                    onClick={() => { setDeatilComment(true), setDetailReview(rating) }}
                                    className='underline text-blue-600 text-xs'>
                                    ver más
                                </button>
                                <div className='flex justify-between items-center mt-5'>
                                    <div className="flex gap-1 items-center">
                                        <div className="flex items-center">
                                            {[...Array(5)].map((_, index) => (
                                                <svg
                                                    key={index}
                                                    className={`w-4 h-4 ms-1 ${index < Math.round(Number(rating.rating)) ? 'text-blue-500' : 'text-gray-300'
                                                        }`}
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="currentColor"
                                                    viewBox="0 0 22 20"
                                                >
                                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                                </svg>
                                            ))}
                                        </div>
                                    </div>
                                    <p className='text-sm font-extralight'>{formatDate(rating.createdAt)}</p>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    )
}

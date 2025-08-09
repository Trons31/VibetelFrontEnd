"use client";

import { ModalDetailReview, ModalRatingRoomInfo } from "@/components";
import { formatDate } from "@/utils";
import React, { useState } from "react";
import { BsStarFill } from "react-icons/bs";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { SwiperRoomCommentMovil } from "./SwiperRoomCommentMovil";
import { TbPointFilled } from "react-icons/tb";
import { RoomRating } from "@/interfaces/reservation.interface";
import { RoomApi } from "@/interfaces";


interface Props {
  ratings: RoomRating[];
  room:RoomApi;
}

export const CommentRoom = ({ ratings,room }: Props) => {
  const [modalRatingRoomInfo, setModalRatingRoomInfo] = useState(false);
  const [visibleComments, setVisibleComments] = useState(5);

  const [deatilComment, setDeatilComment] = useState(false);
  const [detailReview, setDetailReview] = useState<RoomRating>();

  const truncateComment = (comment: string | null, wordLimit: number): string => {
    if (!comment) return "Esta calificación no tiene comentarios.";

    // Eliminar espacios extra y dividir por palabras
    const words = comment.trim().split(/\s+/);

    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(' ') + '...'
      : comment;
  };

  const calculateAverageRating = (ratings: RoomRating[]) => {
    if (ratings.length === 0) return 0;
    const total = ratings.reduce((sum, { rating }) => sum + rating, 0);
    return total / ratings.length === 5
      ? (total / ratings.length).toFixed(0)
      : (total / ratings.length).toFixed(2);
  };

  const getRatingDistribution = (ratings: RoomRating[]) => {
    const distribution = Array(5).fill(0); // Inicializamos un array con 5 ceros

    // Contamos la cantidad de calificaciones por número de estrellas
    ratings.forEach(({ rating }) => {
      distribution[rating - 1] += 1; // Asigna al índice correspondiente
    });

    // Calculamos el porcentaje basado en la cantidad total de calificaciones
    const totalRatings = ratings.length;
    return distribution.map((count, index) => ({
      percentage:
        totalRatings > 0
          ? `${((count / totalRatings) * 100).toFixed(0)}%`
          : "0%",
      width: totalRatings > 0 ? `${(count / totalRatings) * 100}%` : "0%",
      rating: index + 1, // El número de estrellas (1 a 5)
    }));
  };

  const averageRating = calculateAverageRating(ratings);
  const ratingDistribution = getRatingDistribution(ratings);

  const renderStars = () => {
    const stars = [];
    const average = Number(averageRating);

    for (let i = 0; i < 5; i++) {
      if (i < Math.floor(average)) {
        // Estrella completa
        stars.push(<FaStar key={i} className="text-blue-500 w-4 h-4 ms-1" />);
      } else if (i === Math.floor(average) && average % 1 >= 0.5) {
        // Media estrella
        stars.push(
          <FaStarHalfAlt key={i} className="text-blue-500 w-4 h-4 ms-1" />
        );
      } else {
        // Estrella vacía
        stars.push(<FaStar key={i} className="text-gray-300 w-4 h-4 ms-1" />);
      }
    }

    return stars;
  };

  const renderStarsRoom = () => {
    const stars = [];
    const average = Number(averageRating);

    for (let i = 0; i < 5; i++) {
      if (i < Math.floor(average)) {
        // Estrella completa
        stars.push(<FaStar key={i} className="text-blue-600 w-6 h-6 ms-1" />);
      } else if (i === Math.floor(average) && average % 1 >= 0.5) {
        // Media estrella
        stars.push(
          <FaStarHalfAlt key={i} className="text-blue-600 w-6 h-6 ms-1" />
        );
      } else {
        // Estrella vacía
        stars.push(<FaStar key={i} className="text-gray-300 w-6 h-6 ms-1" />);
      }
    }

    return stars;
  };

  return (
    <>
      <ModalRatingRoomInfo
        isOpen={modalRatingRoomInfo}
        onClose={() => setModalRatingRoomInfo(false)}
        ratings={ratings}
      />

      <ModalDetailReview
        isOpen={deatilComment}
        rating={detailReview!}
        onClose={() => setDeatilComment(false)}
      />

      <div className="py-4 mb-0 mt-7">
        <div className="hidden px-4 md:px-0 md:block">
          <div className="relative">

            <div className="border border-gray-300 relative p-6 rounded-xl bg-white z-10 shadow-sm">
              <div className="flex justify-between items-center mb-6" >
                <h2 className="text-xl font-bold">Calificacion</h2>
                <div className="w-fit flex " >
                  {renderStarsRoom()}
                </div>
              </div>

              {/* Contenedor principal de calificaciones */}
              <div className="space-y-5 grid grid-cols-2">
                <div>
                  <div className="" >
                    <p className="text-2xl font-medium" >{averageRating} de 5</p>
                    <p className="text-sm font-medium text-gray-500">{ratings.length} {ratings.length > 1 ? "Calificaciones" : "Calificacion"}</p>
                  </div>
                  {ratingDistribution.map((item, index) => (
                    <div key={index} className="flex items-center mt-2">
                      <div className="text-sm flex items-center gap-1 font-medium text-gray-500">
                        {item.rating}
                        <svg className="w-3.5 h-3.5 text-gray-400 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                      </div>
                      <div className="w-2/4 h-3 mx-4 bg-gray-200 rounded-sm">
                        <div className="h-3 bg-blue-600 rounded-sm" style={{ width: item.width }}></div>
                      </div>
                      <span className="text-sm font-medium text-gray-500">{item.percentage}</span>
                    </div>
                  ))}
                </div>
                <div>
                  {/* Calificación del Motel */}
                  <div className="flex flex-col mt-10 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        Motel
                      </span>
                    </div>
                    <div className="ml-3" >
                      <div className="flex justify-between" >
                        <div className="" >
                          <p className="text-xl" >{room.motel.razonSocial}</p>
                          {/* <div className="flex items-center gap-1" >
                            <span className="text-gray-700 font-medium">4 de 5</span>
                            <TbPointFilled className="w-2 h-2 flex-shrink-0" />
                            <p className="font-medium text-gray-700">1,745 Calificaciones</p>
                          </div> */}
                        </div>
                        {/* <div className="flex space-x-1 text-yellow-400 text-2xl">
                          <span>★</span>
                          <span>★</span>
                          <span>★</span>
                          <span>★</span>
                          <span className="text-gray-300">★</span>
                        </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="block md:hidden px-4">
          <div className="py-3" >
            <div className="flex justify-center px-1 items-center gap-4 mb-6">
              <div className="flex gap-2 items-end">
                <p className="text-2xl font-medium text-gray-800">
                  {averageRating}
                </p>
                <p className="text-lg font-medium text-gray-800">de</p>
                <p className="text-2xl font-medium text-gray-800">5</p>
              </div>
              <div>
                <div className="flex space-x-1 items-center">
                  {renderStars()}
                </div>
                <p className="text-sm font-extralight text-gray-500">
                  {ratings.length}{" "}
                  {ratings.length > 1 ? "Calificaciones" : "Calificacion"}
                </p>
              </div>
            </div>
            <SwiperRoomCommentMovil
              ratings={ratings}
            />
            {
              ratings.length > 1 && (
                <div className="mt-8" >
                  <button
                    onClick={() => setModalRatingRoomInfo(true)}
                    className="p-2 bg-white border border-black rounded-lg text-xs text-black shadow-lg" >
                    Ver todos los comentarios
                  </button>
                </div>
              )
            }
          </div>
        </div>

        <div className="hidden w-full md:block">
          <div className="mt-10 space-y-4 grid grid-cols-3">
            {ratings.slice(0, visibleComments).map((rating, index) => (
              <div key={index} className="relative mb-6"> {/* Contenedor padre para la sombra */}

                <div className="relative pb-4 bg-gray-100 rounded-xl p-4 z-10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <BsStarFill className="text-blue-600 w-4 h-4" />
                      <p className="text-sm font-medium text-black">
                        {rating.rating}
                      </p>
                    </div>
                    <p className="text-xs text-black">
                      {formatDate(rating.createdAt)}
                    </p>
                  </div>
                  <p className="text-sm text-black mt-4">
                    {
                      rating.comment
                        ? truncateComment(rating.comment, 25)
                        : "Esta calificación no tiene comentarios."
                    }
                  </p>
                  <button
                    onClick={() => { setDeatilComment(true), setDetailReview(rating) }}
                    className='underline text-blue-600 text-xs'
                  >
                    ver más
                  </button>
                </div>

              </div>
            ))}

            {ratings.length === 0 && (
              <p className="text-black text-sm">No hay opiniones aún.</p>
            )}

            {
              ratings.length > 5 && (
                <button
                  className="bg-black border rounded-lg text-white text-sm py-2 px-4 mt-5"
                  onClick={() => setModalRatingRoomInfo(true)}
                >
                  Mostrar más
                </button>
              )
            }
          </div>
        </div>
      </div>
    </>
  );
};

"use client";

import React, { useEffect, useState } from "react";
import {
  ModalAllRatingsMotel,
  RoomReviews,
  RoomReviewsMovil,
  SwiperMostReservationsRooms,
} from "@/components";
import { MotelBySlugApi } from "@/interfaces";
import { MdBed } from "react-icons/md";
import { TbNotesOff } from "react-icons/tb";
import { FaBuildingFlag } from "react-icons/fa6";
import { IoLocationSharp } from "react-icons/io5";
import axios from "axios";

export interface Rating {
  id: string;
  roomTitle: string;
  roomNumber: string;
  rating: number;
  comment?: string;
  createdAt: Date;
}



interface Props {
  motel: MotelBySlugApi;
}

export const InfoMotel = ({ motel }: Props) => {
  const [modalAllRatings, setModalAllRatings] = useState(false);

  const [ratings, setRatings] = useState<Rating[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getAllratingsByRoom = async () => {
      try {
        const response = await axios.get<Rating[]>(
          `${process.env.NEXT_PUBLIC_API_ROUTE}room-rating/ratings/motel/${motel.slug}`
        );
        setRatings(response.data);
      } catch (error: any) {
        setRatings([]);
        console.error("Error al cargar las calificaciones de las habitaciones del motel:", error);
      } finally {
        setIsLoading(false);
      }
    }
    getAllratingsByRoom();
  }, [])



  return (
    <>
      <ModalAllRatingsMotel
        isOpen={modalAllRatings}
        ratings={ratings}
        onClose={() => setModalAllRatings(false)}
      />

      <div className="px-3 md:col-span-7 mt-10 md:mt-0">
        <div className="hidden md:block px-2">
          <p className="text-2xl font-semibold">Acerca de {motel.razonSocial}</p>
          <div className="mt-4">
            <p>
              <strong>Descripción:</strong> {motel.description}
            </p>
          </div>
        </div>

        <div className="border-t border-gray-300 mt-16 mb-10"></div>

        <div className="mt-5">
          <div className="flex justify-between items-center">
            <p className="text-lg md:text-xl font-light">Reseñas</p>
            {ratings.length > 0 && (
              <button
                onClick={() => setModalAllRatings(true)}
                className="underline text-sm"
              >
                ver mas
              </button>
            )}
          </div>

          {
            isLoading
              ? (
                <>
                  <div className="col-span-2 md:col-span-8 w-full" >
                    <div className='block space-y-5'>
                      <div className="w-full h-44  bg-gray-400  md:rounded-md animate-pulse"></div>
                      <div className="w-full h-80  bg-gray-400 md:rounded-md animate-pulse"></div>
                      <div className="w-full h-44  bg-gray-400 md:rounded-md animate-pulse"></div>
                    </div>
                  </div >
                </>
              ) : (
                ratings.length > 0
                  ? (
                    <>
                      <div className="mt-10 ">
                        <div className="hidden md:block fade-in">
                          <RoomReviews ratings={ratings} />
                        </div>
                        <div className="block md:hidden fade-in">
                          <RoomReviewsMovil ratings={ratings} />
                        </div>
                      </div>

                      <p className="text-sm font-extralight text-gray-800 mt-5">
                        Aquí podrás ver todas las opiniones y calificaciones que los
                        usuarios han dejado sobre las habitaciones de este motel.
                      </p>
                    </>

                  ) : (
                    <div className="flex justify-center mt-10">
                      <div className="flex gap-1 items-center border border-gray-300 rounded-3xl p-8">
                        <TbNotesOff className="h-5 w-5 text-gray-700 flex-shrink-0" />
                        <p className="text-center text-sm text-gray-800">
                          Aún no existen reseñas. Sé el primero en
                          compartir tu experiencia y ayuda a otros usuarios a tomar una
                          decisión informada.
                        </p>
                      </div>
                    </div>
                  )
              )
          }
        </div>

        <div className="border-t border-gray-300 mt-16 mb-10"></div>

        <section id="location" className="mt-5">
          <p className="text-lg md:text-xl font-light">Ubicacion</p>
          <div className="mt-4 flex justify-between items-center" >
            <div className="flex items-center gap-1" >
              <FaBuildingFlag />
              <p className="text-xs md:text-sm font-extralight" >Motel {motel.razonSocial}</p>
            </div>
            <div className="flex items-center gap-1" >
              <IoLocationSharp />
              <p className="text-xs md:text-sm font-extralight" >{motel.city.name}, {motel.address}</p>
            </div>
          </div>
          <div className="mt-2 w-full h-72 md:h-96 rounded-lg overflow-hidden shadow-lg">
            <iframe
              title="Ubicación del Motel"
              src={`https://www.google.com/maps?q=${motel.motelConfig.locationLatitude},${motel.motelConfig.locationLongitude}&hl=es&z=15&output=embed`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </section>

        <div className="border-t border-gray-300 mt-16 mb-10"></div>

        <div className="mt-5">
          <p className="text-lg md:text-xl font-light">
            Habitaciones mas reservadas
          </p>

          {motel.rooms.length > 0 ? (
            <>
              <p className="text-xs md:text-sm font-extralight text-gray-800">
                Aquí encontrarás una lista de las habitaciones que los usuarios
                reservan con mayor frecuencia.
              </p>
              <div className="mt-10">
                <SwiperMostReservationsRooms rooms={motel.rooms} />
              </div>
            </>
          ) : (
            <div className="flex justify-center mt-10">
              <div className="flex gap-4 items-center border border-gray-300 rounded-3xl p-8">
                <MdBed className="h-5 w-5 text-gray-700 flex-shrink-0" />
                <p
                  className="text-center text-sm text-gray-800"
                  style={{ textAlign: "justify" }}
                >
                  Aún no existe una lista de las habitaciones más reservadas.
                  Esto podría deberse a que no hay suficiente actividad
                  reciente. Vuelve más tarde para descubrir cuáles son las
                  habitaciones más populares o realiza una reserva para ayudar a
                  crear tendencias.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

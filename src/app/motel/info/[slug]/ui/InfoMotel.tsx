"use client";

import React, { useState } from "react";
import {
  ModalAllRatingsMotel,
  RoomReviews,
  RoomReviewsMovil,
  SwiperMostReservationsRooms,
} from "@/components";
import { MotelBySlugApi } from "@/interfaces";
import { MdBed } from "react-icons/md";
import { TbNotesOff } from "react-icons/tb";
import { usePathname } from "next/navigation";
import { FaBuildingFlag } from "react-icons/fa6";
import { IoLocationSharp } from "react-icons/io5";

interface Props {
  motel: MotelBySlugApi;
}

export const InfoMotel = ({ motel }: Props) => {
  const [modalAllRatings, setModalAllRatings] = useState(false);

  const pathname = usePathname();

  return (
    <>
      {/* <ModalAllRatingsMotel
        isOpen={modalAllRatings}
        ratings={motel.allRatings}
        onClose={() => setModalAllRatings(false)}
      /> */}

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
            {/* {motel.allRatings.length > 1 && (
              <button
                onClick={() => setModalAllRatings(true)}
                className="underline"
              >
                Ver mas
              </button>
            )} */}
          </div>

          {/* {motel.allRatings.length > 0 ? (
            <>
              <div className="mt-10 ">
                <div className="hidden md:block">
                  <RoomReviews ratings={motel.allRatings.slice(0, 5)} />
                </div>
                <div className="block md:hidden">
                  <RoomReviewsMovil ratings={motel.allRatings.slice(0, 5)} />
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
                  Aún no existen reseñas para esta habitación. Sé el primero en
                  compartir tu experiencia y ayuda a otros usuarios a tomar una
                  decisión informada.
                </p>
              </div>
            </div>
          )} */}
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

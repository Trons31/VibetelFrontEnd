"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { BedRooms } from "@/interfaces/bedrooms.interface";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./swiper.module.css";

// Import Swiper styles
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import { FreeMode, HashNavigation, Pagination } from "swiper/modules";
import { currencyFormat } from "@/utils/currencyFormat";
import { RoomImage } from "../room-image/RoomImage";
import { useSuggestedRoomStore } from "@/store";
import { calculateTotalPrice } from "@/utils";
import { RatingRoomCard } from "../rating-room/RatingRoomCard";
import { TbPointFilled } from "react-icons/tb";
import { FavoriteRoomCard } from "@/components";
interface Props {
  rooms: BedRooms[];
  className?: string;
}

interface PropsPusher {
  idRoom: string;
  inAvailable: boolean;
}

export const SwiperBedrooms = ({ rooms, className }: Props) => {

  const { addRoom } = useSuggestedRoomStore();

  const addRoomSueggested = (room: BedRooms) => {
    //addRoom(room);
  };


  return (
    <div className={className}>
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        className="mySwiper"
      >
        {rooms.map((room) => (
          <SwiperSlide key={room.slug}>
            <div
              className={`${styles["card-content"]}  fade-in bg-white border border-transparent mb-12
          hover:border-gray-400 transition-all duration-300 hover:shadow-lg h-[370px] rounded-lg `}
            >
              <div className={`${styles["image-container"]} relative group`}>
                <Link
                  onClick={() => addRoomSueggested(room)}
                  href={`/rooms/${room.slug}`}
                >
                  <RoomImage
                    className="rounded-lg"
                    src={room.images[0]}
                    width={600}
                    height={500}
                    alt="img logo"
                  />
                </Link>
                <div
                  className="absolute top-2 flex justify-end w-full px-3 items-center"
                >
                  {/* 
                  TODO: HABILITAR CUANDO SE MANEJE ESTADO DE HABITACINOES
                  {room.inAvailable ? (
                    <div className="center relative inline-block select-none whitespace-nowrap rounded-lg bg-white py-1 md:py-1 px-2 md:px-3.5 align-baseline text-xs leading-none text-black">
                      <p className="mt-px text-xs">Disponible</p>
                    </div>
                  ) : (
                    <div className="center relative inline-block select-none whitespace-nowrap rounded-lg bg-white py-1 md:py-1 px-2 md:px-3.5 align-baseline leading-none text-black">
                      <p className="mt-px text-xs">No disponible</p>
                    </div>
                  )} */}
                  <FavoriteRoomCard
                    roomId={room.id}
                    inFavorites={room.isFavorite!}
                  />
                </div>
                <div className="p-2 flex md:hidden md:group-hover:flex bg-red-600 rounded-b-sm justify-center  absolute right-0 bottom-0 w-full md:group-hover:bg-red-600 md:group-hover:transition-all md:group-hover:duration-300">
                  <p className="text-white text-sm md:text-red-600 md:group-hover:text-white font-normal">
                    Reservar ahora
                  </p>
                </div>
              </div>

              <div className="p-2">
                <div className="mt-1">
                  <div className="flex justify-between items-center" >
                    <h2 className="text-gray-900 title-font capitalize text-lg font-medium">
                      {" "}
                      {room.title}{" "}
                    </h2>
                    {room.ratings.length > 0 && (
                      <RatingRoomCard ratings={room.ratings} />
                    )}
                  </div>
                  <div className="flex justify-start -mt-1 gap-1 items-center" >
                    <span
                      className="text-sm text-gray-700 font-extralight inline-flex items-center
                "
                    >
                      {room.category.name}
                    </span>
                    <TbPointFilled className="w-2 h-2 flex-shrink-0" />
                    <span
                      className="text-sm text-gray-700 font-extralight inline-flex items-center
                "
                    >
                      {room.timeLimit} horas
                    </span>
                  </div>
                  <div className="text-start">
                    {room.promoActive ? (
                      <>
                        <div className="flex">
                          <p className="text-lg font-bold text-gray-900">
                            {currencyFormat(room.promoPrice!)}
                          </p>
                          <del className="ml-1 align-super text-sm font-bold text-gray-600">
                            {" "}
                            {currencyFormat(room.price)}{" "}
                          </del>
                        </div>
                      </>
                    ) : (
                      <>
                        <p className="text-lg font-bold text-gray-900">
                          {currencyFormat(calculateTotalPrice(room.price))}
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

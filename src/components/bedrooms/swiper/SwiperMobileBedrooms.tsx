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

import { FreeMode, Pagination } from "swiper/modules";
import { currencyFormat } from "@/utils/currencyFormat";
import { RoomImage } from "../room-image/RoomImage";
import { useSuggestedRoomStore } from "@/store";
import { FavoriteRoomCard, RatingRoomCard } from "@/components";
import { TbPointFilled } from "react-icons/tb";
import { inFavorites } from "@/actions";
import { useSession } from "next-auth/react";

interface Props {
  rooms: BedRooms[];
  className?: string;
}

export const SwiperMobileBedrooms = ({ rooms, className }: Props) => {
  const { addRoom } = useSuggestedRoomStore();
  const { data: session } = useSession();
  const [favorites, setFavorites] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const checkFavorites = async () => {
      if (session) {
        const favoritesMap: { [key: string]: boolean } = {};
        for (const room of rooms) {
          const result = await inFavorites(room.id, session.user.id);
          favoritesMap[room.id] = result.ok;
        }
        setFavorites(favoritesMap);
        console.log("Favorites: ", favoritesMap)
      }
    };

    checkFavorites();
  }, [session, rooms]);

  const addRoomSueggested = (room: BedRooms) => {
    // addRoom(room);
  };


  return (
    <div className={className}>
      <Swiper
        slidesPerView={2}
        spaceBetween={2}
        freeMode={true}
        pagination={true}
        modules={[FreeMode, Pagination]}
        className="mySwiper"
      >
        {rooms.map((room) => (
          <SwiperSlide key={room.slug}>
            <div
              className={`${styles["card-content"]} bg-white border border-transparent mb-12
          hover:border-gray-300 hover:shadow-lg h-[370px] rounded-lg `}
            >
              <div className={`${styles["image-container"]} relative`}>
                <Link
                  href={`/rooms/${room.slug}`}
                  onClick={() => addRoomSueggested(room)}
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
                  className="absolute top-2 flex justify-end w-full px-1 items-center"
                >
                  {/* 
                  TODO: Habilitar cuando se maneje estados de habitaciones
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
                    inFavorites={session ? favorites[room.id] : false}
                  />
                </div>
                <div className="p-2 flex justify-center absolute rounded-b-md right-0 bottom-0 w-full bg-red-600">
                  <p className="text-white text-xs md:text-lg font-normal">
                    Reservar ahora
                  </p>
                </div>
              </div>
              <div className="p-2">
                <div className="">
                  <div className="flex justify-between items-center" >
                    <h2 className="text-gray-900 title-font capitalize text-lg font-medium">
                      {" "}
                      {room.title}{" "}
                    </h2>
                    {room.ratings.length > 0 && (
                      <RatingRoomCard ratings={room.ratings} />
                    )}
                  </div>
                  <div className="flex -mt-1 justify-start gap-1 items-center" >
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
                          {currencyFormat(room.price)}
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

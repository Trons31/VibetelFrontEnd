"use client";
import Link from "next/link";
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
import { BiBuildings, BiSolidDiscount } from "react-icons/bi";
import { useSuggestedRoomStore } from "@/store";
import { calculateTotalPrice } from "@/utils";
import { RatingRoomCard } from "../rating-room/RatingRoomCard";
import { TbPointFilled } from "react-icons/tb";
import { FavoriteRoomCard } from "@/components";
import { RoomOfMotel } from "@/interfaces";

interface Props {
  rooms: RoomOfMotel[];
  className?: string;
}

interface PropsPusher {
  idRoom: string;
  inAvailable: boolean;
}

export const SwiperMostReservationsRooms = ({ rooms, className }: Props) => {

  const { addRoom } = useSuggestedRoomStore();

  const addRoomSueggested = (room: RoomOfMotel) => {
    //addRoom(room);
  };

  return (
    <div className={className}>
      <Swiper
        spaceBetween={30}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        className={styles.swiper} // Aplica la clase del módulo Swiper
        // Responsive breakpoints si necesitas diferentes vistas por tamaño de pantalla
        breakpoints={{
          // Cuando el ancho de la ventana sea >= 320px
          320: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          // Cuando el ancho de la ventana sea >= 768px
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          // Cuando el ancho de la ventana sea >= 1024px
          1024: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          // Cuando el ancho de la ventana sea >= 1280px (para 4 slides)
          1280: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
      >
        {rooms.map((room) => (
          <SwiperSlide key={room.slug} className={styles["swiper-slide"]}>
            <Link
              onClick={() => addRoomSueggested(room)}
              href={`/rooms/${room.slug}`}
            >
              <div
                className={`${styles["card-content"]} group fade-in bg-white border border-transparent mb-12
                    hover:border-gray-300 transition-all duration-300 hover:shadow-lg rounded-lg`}
              >
                <div className={`${styles["image-container"]}`}> {/* Aplica la clase image-container aquí */}
                  {/* Aquí es donde la RoomImage debe llenar su contenedor */}
                  <RoomImage
                    className="w-full h-full object-cover rounded-lg" // Tus clases de Tailwind se combinan con object-fit: cover
                    src={
                      room.images.length > 0 ? room.images[0].url : ""
                    }
                    width={600} // Estas dimensiones son para optimización de la carga, no para el tamaño visual
                    height={500}
                    alt="img logo"
                  />
                  <div
                    className={`${styles.absolute} flex justify-end w-full px-3 items-center`} // Aplica la clase 'absolute'
                  >
                    <FavoriteRoomCard
                      roomId={room.id}
                    />
                  </div>
                  <div className="p-2 flex md:hidden md:group-hover:flex bg-red-600  rounded-b-lg md:rounded-b-sm justify-center  absolute right-0 bottom-0 w-full md:group-hover:bg-red-600 md:group-hover:transition-all md:group-hover:duration-300">
                    <p className="text-white text-sm md:text-red-600 md:group-hover:text-white font-normal">
                      Reservar ahora
                    </p>
                  </div>
                </div>

                <div className="p-2">
                  <div className="mt-1">
                    <div className="flex justify-between items-center" >
                      <h2 className="text-gray-900 title-font capitalize text-sm md:text-lg font-medium">
                        {room.title}
                      </h2>
                      {room.ratings.length > 0 && (
                        <RatingRoomCard ratings={room.ratings} />
                      )}
                    </div>
                    <div className="flex justify-start -mt-1 gap-1 items-center" >
                      <span
                        className="text-xs md:text-sm text-gray-700 font-extralight inline-flex items-center"
                      >
                        {room.category.name}
                      </span>
                      <TbPointFilled className="w-2 h-2 flex-shrink-0" />
                      <span
                        className="text-xs md:text-sm text-gray-700 font-extralight inline-flex items-center"
                      >
                        {room.timeLimit} horas
                      </span>
                    </div>
                    <div className="text-start">
                      {room.promoActive ? (
                        <>
                          <div className="flex">
                            <p className="text-md md:text-lg font-bold text-gray-900">
                              {currencyFormat(room.promoPrice!)}
                            </p>
                            <del className="ml-1 align-super text-xs md:text-sm font-bold text-gray-600">
                              {" "}
                              {currencyFormat(room.price)}{" "}
                            </del>
                          </div>
                        </>
                      ) : (
                        <>
                          <p className="text-md md:text-lg font-bold text-gray-900">
                            {currencyFormat(calculateTotalPrice(room.price))}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

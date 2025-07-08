"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./card.module.css";
import { currencyFormat } from "@/utils/currencyFormat";
import { RoomImage } from "../../bedrooms/room-image/RoomImage";
import { useSuggestedRoomStore } from "@/store";
import { FavoriteRoomCard, RatingRoomCard } from "@/components";
import { TbPointFilled } from "react-icons/tb";
import { RoomAllApi } from "@/interfaces";

interface Props {
  room: RoomAllApi;
}

export const ItemGridMotelFilter = ({ room }: Props) => {
  const { addRoom } = useSuggestedRoomStore();
  const [openModalLocationMotel, setOpenModalLocationMotel] = useState(false);

  const promotionPrice = room.promoActive && room.promotionPercentage
    ? room.price * (1 - (room.promotionPercentage / 100))
    : room.price;

  const addRoomSueggested = () => {
    addRoom(room);
  };

  return (
    <>

      {/* <ModalLocationMotel
        motelLocationLatitude={room.motel.}
        isOpen={openModalLocationMotel}
        onClose={() => setOpenModalLocationMotel(false)}
      /> */}

      <Link
        onClick={() => addRoomSueggested()}
        href={`/rooms/${room.slug}`} >
        <div
          className={`${styles["card-content"]} cursor-pointer bg-white border border-transparent mb-1
           hover:border-gray-300 transition-all duration-300 hover:shadow-lg rounded-lg min-h-[370px] group `}
        >
          <div className={`${styles["image-container"]} relative`}>
            <div>
              <RoomImage
                className="rounded-lg"
                src={room.images.length > 0
                  ? room.images[0].url
                  : ""}
                width={600}
                height={500}
                alt={room.title}
              />
            </div>
            <div
              className="absolute top-2 flex justify-end w-full px-3 items-center"
            >
              {/* 
            TODO: HABILITAR CUANDO SE MANEJE ESTADOS DE HABITACIONES
            {room.inAvaible ? (
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
                inFavorites={false}
              />
            </div>
            <div className="p-2 flex md:hidden md:group-hover:flex rounded-b-sm bg-red-600  justify-center  absolute right-0 bottom-0 w-full md:group-hover:bg-red-600 transition-all duration-300">
              <p className="text-white text-xs md:text-md md:text-red-600 md:group-hover:text-white font-normal">
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
                {/* {room.ratings.length > 0 && (
                <RatingRoomCard ratings={room.ratings} />
              )} */}
              </div>
              <p className="text-sm text-gray-700 -mt-1">
                Motel{" "}
                <button
                  onClick={() => setOpenModalLocationMotel(true)}
                  className="underline inline-block max-w-[200px] whitespace-nowrap overflow-hidden text-ellipsis align-bottom"
                  title={room.motel.razonSocial} // Opcional: muestra el nombre completo al pasar el mouse
                >
                  {room.motel.razonSocial}
                </button>
              </p>
              <div className="flex justify-start gap-1 items-center" >
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
                        {currencyFormat(promotionPrice)}
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
      </Link>
    </>
  );
};

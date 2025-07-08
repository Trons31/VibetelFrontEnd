"use client";
import Link from "next/link";
import styles from "./card.module.css";
import { currencyFormat } from "@/utils/currencyFormat";
import { BiSolidDiscount } from "react-icons/bi";
import { RoomImage } from "../../bedrooms/room-image/RoomImage";
import { useSuggestedRoomStore } from "@/store";
import { BedRooms } from "@/interfaces/bedrooms.interface";
import { searchCity } from "@/interfaces";
import { FavoriteRoomCard, RatingRoomCard } from "@/components";
import { TbPointFilled } from "react-icons/tb";
import { useState } from "react";

interface Props {
  room: BedRooms;
  location: searchCity | undefined;
}

export const ItemRoomSearch = ({ room, location }: Props) => {
  const [openModalLocationMotel, setOpenModalLocationMotel] = useState(false);
  const { addRoom } = useSuggestedRoomStore();
  let promotionPercentage;
  if (room.promoActive) {
    promotionPercentage = ((room.price - room.promoPrice!) * 100) / room.price;
  }

  const addRoomSueggested = () => {
    //addRoom(room);
  };

  return (
    <>

      <Link
        onClick={() => addRoomSueggested()}
        href={`/rooms/${room.slug}`} >
        <div
          className={`${styles["card-content"]} cursor-pointer bg-white border border-transparent mb-1
              hover:border-gray-300 transition-all duration-300 hover:shadow-lg rounded-lg min-h-[390px] group`}
        >
          <div
            className={`${styles["image-container"]} relative`}>
            <div>
              <RoomImage
                className="rounded-lg"
                src={room.images[0]}
                width={600}
                height={500}
                alt={room.title}
              />
            </div>

            <div
              className="absolute top-2 flex justify-end w-full px-3 items-center"
            >
              {/* {room.inAvailable ? (
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

            <div className="p-2 flex md:hidden rounded-b-sm md:group-hover:flex bg-red-600  justify-center  absolute right-0 bottom-0 w-full md:group-hover:bg-red-600 md:group-hover:transition-all md:group-hover:duration-300">
              <p className="text-white md:text-red-600 md:group-hover:text-white text-xs md:text-sm font-normal">
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
              <p className="text-sm text-gray-700 -mt-1">
                Motel{" "}
                <button
                  onClick={() => setOpenModalLocationMotel(true)}
                  className="underline inline-block max-w-[200px] whitespace-nowrap overflow-hidden text-ellipsis align-bottom"
                  title={room.motel.title} // Opcional: muestra el nombre completo al pasar el mouse
                >
                  {room.motel.title}
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
      </Link>
    </>
  );
};

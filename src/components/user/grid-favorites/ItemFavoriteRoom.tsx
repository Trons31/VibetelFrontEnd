'use client';
import { FavoriteRoomApi } from '@/interfaces/favoriteRoom.interface'
import Link from 'next/link'
import { RoomImage } from '@/components';
import { IoHeartDislike } from 'react-icons/io5';
import { currencyFormat, sleep } from '@/utils';
import toast, { Toaster } from 'react-hot-toast';
import { TbPointFilled } from 'react-icons/tb';
import styles from "./card.module.css";
import axios from 'axios';
import { useSession } from 'next-auth/react';

interface Props {
  favoriteRoom: FavoriteRoomApi

}

export const ItemFavoriteRoom = ({ favoriteRoom }: Props) => {

  const { data: session, status } = useSession();

  const onDeleteFavoriteRoom = async () => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_ROUTE}room/favorite/${favoriteRoom.id}`,
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );
      toast.success("Habitacion eliminada de favoritos");
      await sleep(3);
      window.location.reload();
    } catch (error: any) {
      toast.error("No se pudo eliminar de favoritos");
      window.location.reload();
    }
  }


  const promotionPrice = favoriteRoom.promoActive && favoriteRoom.promotionPercentage
    ? favoriteRoom.price * (1 - (favoriteRoom.promotionPercentage / 100))
    : favoriteRoom.price;

  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />

      <div
        className={`${styles["card-content"]} bg-white border border-transparent mb-1
                 hover:border-gray-300 transition-all duration-300 hover:shadow-lg rounded-lg min-h-[370px]`}
      >
        <div className={`${styles["image-container"]} relative`}>
          <div>
            <RoomImage
              className="rounded-md"
              src={favoriteRoom.images.length > 0
                ? favoriteRoom.images[0].url
                : ""}
              width={600}
              height={500}
              alt={favoriteRoom.title}
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
            <div className='flex justify-end mt-2' >
              <IoHeartDislike
                onClick={onDeleteFavoriteRoom}
                size={30}
                className='text-red-600 cursor-pointer rounded-md p-1 shadow-md bg-white' />
            </div>
          </div>
        </div>

        <div
          // onClick={() => addRoomSueggested()}
          // href={`/rooms/${favoriteRoom.slug}`}
          className="p-2">
          <div className="mt-1">
            <div className="flex justify-between items-center" >
              <h2 className="text-gray-900 title-font capitalize text-md md:text-lg font-medium">
                {" "}
                {favoriteRoom.title}{" "}
              </h2>
              {/* {room.ratings.length > 0 && (
                      <RatingRoomCard ratings={room.ratings} />
                    )} */}
            </div>
            <p className="text-xs md:text-sm text-gray-700 -mt-1">
              Motel{" "}
              <button
                // onClick={() => setOpenModalLocationMotel(true)}
                className="underline inline-block max-w-[200px] whitespace-nowrap overflow-hidden text-ellipsis align-bottom"
                title={favoriteRoom.motel.razonSocial} // Opcional: muestra el nombre completo al pasar el mouse
              >
                {favoriteRoom.motel.razonSocial}
              </button>
            </p>
            <div className="flex justify-start gap-1 items-center" >
              <span
                className="text-sm text-gray-700 font-extralight inline-flex items-center
                      "
              >
                {favoriteRoom.category.name}
              </span>
              <TbPointFilled className="w-2 h-2 flex-shrink-0" />
              <span
                className="text-sm text-gray-700 font-extralight inline-flex items-center
                      "
              >
                {favoriteRoom.timeLimit} horas
              </span>
            </div>
            <div className="text-start">
              {favoriteRoom.promoActive ? (
                <>
                  <div className="flex">
                    <p className="text-md md:text-lg font-bold text-gray-900">
                      {currencyFormat(promotionPrice)}
                    </p>
                    <del className="ml-1 align-super text-xs md:text-sm font-bold text-gray-600">
                      {" "}
                      {currencyFormat(favoriteRoom.price)}{" "}
                    </del>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-md md:text-lg font-bold text-gray-900">
                    {currencyFormat(favoriteRoom.price)}
                  </p>
                </>
              )}
            </div>
            <div className='flex justify-end' >
              <Link
                href={`/rooms/${favoriteRoom.slug}`}
                className='underline text-red-600 text-sm'
              >
                ver mas
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>

  )
}

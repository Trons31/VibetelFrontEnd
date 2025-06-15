'use client';
import { FavoriteRoom } from '@/interfaces/favoriteRoom.interface'
import Link from 'next/link'
import { RoomImage } from '@/components';
import { IoHeartDislike } from 'react-icons/io5';
import { currencyFormat, sleep } from '@/utils';
import toast, { Toaster } from 'react-hot-toast';
import { deleteFavoriteRoom } from '@/actions';

interface Props {
  favoriteRoom: FavoriteRoom

}

export const ItemFavoriteRoom = ({ favoriteRoom }: Props) => {

  const onDeleteFavoriteRoom = async() => {

      const resp = await deleteFavoriteRoom(favoriteRoom.id);
      if(!resp.ok){
        toast.error(resp.message)
        return
      }

      toast.success(resp.message)
      window.location.replace("/favoriteRoom")
  }

  return (
    <>
    <Toaster
        position="top-right"
        reverseOrder={false}
      />
    <div className='bg-white border border-gray-200 shadow-md' >

      <div className={`relative`}>

        <Link href={`/room/${favoriteRoom.room.slug}`} >
          <RoomImage
            className='rounded object-cover h-[230px]'
            src={favoriteRoom.room.roomImage[0].url}
            width={600}
            height={500}
            alt='img logo'
          />
        </Link>

        <div className={`absolute top-5 right-2 flex justify-end w-full`}>
          <div className={` top-0 right-0 flex justify-end w-full`}>
            <div >
              {favoriteRoom.room.inAvailable ? (
                <div className="center relative inline-block select-none whitespace-nowrap rounded-lg bg-black py-2 px-3.5 align-baseline font-sans text-xs font-bold uppercase leading-none text-white">
                  <div className="mt-px ">Disponible</div>
                </div>
              ) : (
                <div className="center relative inline-block select-none whitespace-nowrap rounded-lg bg-black py-2 px-3.5 align-baseline font-sans text-xs font-bold uppercase leading-none text-white">
                  <div className="mt-px ">No disponible</div>
                </div>
              )}
              <div className='flex justify-end mt-2' >
                <IoHeartDislike
                onClick={onDeleteFavoriteRoom}
                size={40} 
                className='text-red-600 cursor-pointer rounded-md p-2 shadow-md bg-white' />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-2" >

        <div className="mt-2">
          <h2 className="text-gray-900 title-font capitalize text-xl font-medium"> {favoriteRoom.room.title} </h2>

          <div className="text-start">
            {
              favoriteRoom.room.promoActive
                ? (
                  <>
                    <div className="flex">
                      <p className="text-2xl font-bold text-gray-900">{currencyFormat(favoriteRoom.room.promoPrice!)}</p>
                      <del className="ml-2 align-super text-base font-bold text-gray-600"> {currencyFormat(favoriteRoom.room.price)} </del>
                    </div>

                    <div className="mt-1 flex items-center text-sm font-medium text-gray-600">
                      Ahorra <span className='text-blue-700 font-extrabold mx-1' >
                        {
                          ((favoriteRoom.room.price - favoriteRoom.room.promoPrice!) * 100) / favoriteRoom.room.price
                        }%</span>  ahora mismo
                    </div>
                  </>
                )
                : (
                  <>
                    <p className="text-2xl font-bold text-gray-900">{currencyFormat(favoriteRoom.room.price)}</p>
                  </>
                )
            }

          </div>




          <span className="bg-gray-200 mt-2 text-gray-800 text-sm font-medium inline-flex items-center px-2.5 py-0.5 rounded me-2 
          ">
            duracion {favoriteRoom.room.timeLimit} hrs
          </span>
        </div>

        <div className='flex justify-between mt-3' >
          <div >
            <span className="text-gray-400  mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 ">
              {favoriteRoom.room.motel.title}
            </span>
          </div>
          <Link href={`/room/${favoriteRoom.room.slug}`} className='text-end underline  text-red-500 mx-2'>
            ver mas
          </Link>
        </div>
      </div>

    </div>
    </>

  )
}

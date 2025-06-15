'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { addOrDeleteFavoriteRoom } from '@/actions';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { BiHeart, BiSolidHeart } from 'react-icons/bi';

interface Props {
  roomId: string;
  inFavorites: boolean | undefined;
}

export const FavoriteRoom = ({ roomId, inFavorites }: Props) => {

  const router = useRouter();

  const [like, setLike] = useState(inFavorites);
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const isAuthenticated = !!session?.user;


  const onClickedLike = async () => {

    if (!isAuthenticated) {
      router.push("/not-registered");
      return;
    }

    setIsLoading(true);
    if (like) {
      const addOrDeleteToFavorites = await addOrDeleteFavoriteRoom(roomId, session.user.id!)
      setLike(false);
      setIsLoading(false);
      toast.success(addOrDeleteToFavorites.message);
    } else {
      const addOrDeleteToFavorites = await addOrDeleteFavoriteRoom(roomId, session.user.id!)
      setLike(true);
      setIsLoading(false);
      toast.success(addOrDeleteToFavorites.message)
    }
  }

  return (
    <>

      <Toaster
        position="top-right"
        reverseOrder={false}
      />

      <button
        onClick={onClickedLike}
        className='flex items-center gap-1 hover:bg-gray-100 p-2 transition-all duration-300 rounded-md'
      >
        {
          like
            ? (
              <BiSolidHeart
                className="text-red-600 text-md md:text-xl"
              />
            ) : (
              <BiHeart
                className="text-gray-500 text-md md:text-xl"
              />
            )
        }
        {
          like
            ? (
              isLoading
                ? (
                  <div className="flex-grow flex justify-center items-center">
                    <div className="px-2" >
                      <svg className="h-4 w-4 animate-spin text-red-600 " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </div>
                  </div>
                ) : (
                  <span className='underline text-xs md:text-lg' >Guardada</span>
                )
            ) : (
              isLoading
                ? (
                  <div className="flex-grow flex justify-center items-center">
                    <div className="px-2" >
                      <svg className="h-4 w-4 animate-spin text-red-600 " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </div>
                  </div>
                ) : (
                  <span className='underline text-xs md:text-lg' >Guardar</span>
                )
            )
        }
      </button>

    </>
  )
}

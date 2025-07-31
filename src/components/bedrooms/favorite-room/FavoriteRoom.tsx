'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { BiHeart, BiSolidHeart } from 'react-icons/bi';
import axios from 'axios';

interface Props {
  roomId: string;
}

export const FavoriteRoom = ({ roomId }: Props) => {

  const router = useRouter();

  const [like, setLike] = useState(false);
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const isAuthenticated = !!session?.user;

  useEffect(() => {
    if (status === "loading") return;
    if (status === "unauthenticated") return;
    const InFavoritesByRoom = async () => {
      try {
        await axios.get(
          `${process.env.NEXT_PUBLIC_API_ROUTE}room/favorite/${roomId}`,
          {
            headers: {
              Authorization: `Bearer ${session?.accessToken}`,
            },
          }
        );
        setLike(true);
      } catch (error: any) {
      }
    }


    InFavoritesByRoom();
  }, [status]);


  const onClickedLike = async () => {

    if (!isAuthenticated) {
      router.push("/not-registered");
      return;
    }

    setIsLoading(true);
    if (like) {
      try {
        await axios.delete(
          `${process.env.NEXT_PUBLIC_API_ROUTE}room/favorite/${roomId}`,
          {
            headers: {
              Authorization: `Bearer ${session?.accessToken}`,
            },
          }
        );
        setLike(false);
        toast.success("Habitacion eliminada de favoritos");
      } catch (error: any) {
        setLike(false);
        toast.error("No se pudo eliminar de favoritos");
      }
      setIsLoading(false);
    } else {
      try {
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_ROUTE}room/favorite/${roomId}`, {},
          {
            headers: {
              Authorization: `Bearer ${session?.accessToken}`,
            },
          }
        );
        toast.success("Habitacion guardada en favoritos");
        setLike(true);
      } catch (error: any) {
        console.log(error);
        setLike(true);
        toast.error("No se pudo agregar a favoritos");
      }
      setIsLoading(false);
    }
  }

  return (
    <>

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

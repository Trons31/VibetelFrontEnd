'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { PiHeartStraightDuotone, PiHeartStraightFill } from 'react-icons/pi';
import axios from 'axios';
import toast from 'react-hot-toast';

interface Props {
    roomId: string;
}

export const FavoriteRoomCard = ({ roomId }: Props) => {

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
            console.log(session.accessToken);
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
            >
                {
                    like
                        ? (
                            <PiHeartStraightFill
                                className="text-red-600 h-6 w-6"
                            />
                        ) : (
                            <PiHeartStraightDuotone className="text-white h-6 w-6" />
                        )
                }
            </button>
        </>
    )
}

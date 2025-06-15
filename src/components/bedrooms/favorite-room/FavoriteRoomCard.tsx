'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { addOrDeleteFavoriteRoom } from '@/actions';
import { useEffect, useState } from 'react';
import { PiHeartStraightDuotone, PiHeartStraightFill } from 'react-icons/pi';

interface Props {
    roomId: string;
    inFavorites: boolean | undefined;
}

export const FavoriteRoomCard = ({ roomId, inFavorites }: Props) => {

    const router = useRouter();

    const [like, setLike] = useState(inFavorites);
    const { data: session } = useSession();
    const [isLoading, setIsLoading] = useState(false);

    const isAuthenticated = !!session?.user;

    useEffect(() => {
        setLike(inFavorites);
    }, [inFavorites]);

    const onClickedLike = async () => {

        if (!isAuthenticated) {
            router.push("/not-registered");
            return;
        }

        setIsLoading(true);
        if (like) {
            await addOrDeleteFavoriteRoom(roomId, session.user.id!)
            setLike(false);
            setIsLoading(false);
        } else {
            await addOrDeleteFavoriteRoom(roomId, session.user.id!)
            setLike(true);
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

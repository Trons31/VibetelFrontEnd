'use client';
import React, { useCallback, useEffect } from 'react'
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link'
import { FavoriteRoom, SharedLinkRoom } from '@/components';
import { RoomApi } from '@/interfaces';
import { IoIosArrowBack } from 'react-icons/io'
import { useRouter } from 'next/navigation';

interface Props {
    room: RoomApi;
}

export const TopMenuRoom = ({ room }: Props) => {

    const router = useRouter();

    const { data: session } = useSession();




    return (
        <nav className="flex fixed px-3 md:px-12 z-20 top-0 py-2 items-center bg-white w-full border-b border-gray-100 shadow-sm"
        >
            <div className='flex justify-between items-center w-full' >
                <button
                    onClick={() => router.back()}
                    className='flex gap-1 items-center' >
                    <IoIosArrowBack className="w-5 h-5 md:h-6 md:w-6 text-gray-700" />
                    <span className='hidden md:block ' >
                        Volver
                    </span>
                </button>

                <div className='flex justify-between items-center gap-2' >
                    <SharedLinkRoom
                        room={room}
                    />

                    <FavoriteRoom
                        roomId={room.id}
                    />

                    <Link href="/" target="_blank" className="hidden md:flex space-x-1 items-center" rel="noopener noreferrer" >
                        <Image
                            src="/app/LogoApp.png"
                            width={35}
                            height={35}
                            alt="logoOficial.png"
                        />
                    </Link>
                </div>
            </div>
        </nav >
    )
}

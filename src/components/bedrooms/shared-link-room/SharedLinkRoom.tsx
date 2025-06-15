'use client';

import { ModalSharedLinkRoom } from '@/components'
import { RoomApi } from '@/interfaces';
import React, { useState } from 'react'
import { MdIosShare } from 'react-icons/md'

interface Props {
    room: RoomApi;
}

export const SharedLinkRoom = ({ room }: Props) => {

    const [modalSharedLinkRoom, setModalSharedLinkRoom] = useState(false);

    return (
        <>

            <ModalSharedLinkRoom
                isOpen={modalSharedLinkRoom}
                room={room}
                onClose={() => setModalSharedLinkRoom(false)}
            />

            <button
                onClick={() => setModalSharedLinkRoom(true)}
                className="flex gap-1 items-center hover:bg-gray-100 rounded-md p-2" >
                <MdIosShare className="text-gray-500 text-md md:text-xl" />
                <p className="underline text-xs md:text-lg" >Compartir</p>
            </button>
        </>
    )
}

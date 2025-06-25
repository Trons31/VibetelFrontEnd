'use client';
import React, { useState } from 'react'
import { ModalDisabled } from './ModalDisabled';
import { BiBlock } from 'react-icons/bi';
import { statusRoom } from '@/interfaces';
import { FaRegCheckCircle } from 'react-icons/fa';
import { ModalEnabled } from './ModalEnabled';

interface Props {
    nameRoom?: string;
    idRoom: string;
    status: statusRoom;
}

export const StatusRoom = ({ nameRoom, idRoom, status }: Props) => {

    const [isModalOpenDisabled, setIsModalOpenDisabled] = useState(false);
    const [isModalOpenEnabled, setIsModalOpenEnabled] = useState(false);



    return (
        <>

            <div className='fixed bottom-5 md:bottom-14 right-5 md:right-10 '>

                {
                    status !== "DISABLED"
                        ? (
                            <button
                                onClick={() => setIsModalOpenDisabled(true)}
                                className='bg-black p-2 rounded-full' >
                                <BiBlock className='h-6 w-6 md:w-8 md:h-8 text-white' />
                            </button>
                        ) : (
                            <button
                                onClick={() => setIsModalOpenEnabled(true)}
                                className='bg-black p-2 rounded-full' >
                                <FaRegCheckCircle className='h-6 w-6 text-white' />
                            </button>
                        )
                }
            </div>

            <ModalDisabled
                idRoom={idRoom}
                nameRoom={nameRoom}
                isOpen={isModalOpenDisabled}
                onClose={() => setIsModalOpenDisabled(false)}
            />

            <ModalEnabled
                idRoom={idRoom}
                nameRoom={nameRoom}
                isOpen={isModalOpenEnabled}
                onClose={() => setIsModalOpenEnabled(false)}
            />

        </>
    )
}

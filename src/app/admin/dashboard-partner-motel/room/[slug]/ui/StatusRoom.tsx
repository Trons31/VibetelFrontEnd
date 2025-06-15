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

            <div className='fixed bottom-14 right-10 '>

                {
                    status !== "DISABLED"
                        ? (
                            <button
                                onClick={() => setIsModalOpenDisabled(true)}
                                className='bg-black p-2 rounded-full' >
                                <BiBlock size={32} className='text-white' />
                            </button>
                        ) : (
                            <button
                                onClick={() => setIsModalOpenEnabled(true)}
                                className='bg-black p-2 rounded-full' >
                                <FaRegCheckCircle size={32} className='text-white' />
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

'use client';
import React, { useState } from 'react'
import { IoIosArrowForward, IoIosCloseCircle } from 'react-icons/io'
import { IoCheckmark } from 'react-icons/io5'
import { MdOutlineError } from 'react-icons/md';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';
import { FaCircleCheck } from 'react-icons/fa6';

interface Props {
    title: string;
    Success?: boolean;
    error?: boolean;
}

export const StatusCheckOut = ({ title, Success, error }: Props) => {

    const pathName = usePathname();
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    }

    return (
        <>

            {
                pathName === "/payment-processing/guest" && (
                    <>
                        <div className='bg-white py-4 px-4 mt-28 md:mt-10  block md:hidden w-full'>
                            <p className="text-lg font-bold">Reserva anónima</p>

                            {/* Descripción breve de las reservas anónimas */}
                            <div className='mt-3'>
                                <p className='text-sm' style={{ textAlign: 'justify' }}>
                                    Las reservas anónimas permiten realizar tu reserva sin que se guarde información personal.
                                </p>
                            </div>

                            <div className='mt-3'>
                                <p className='text-sm' style={{ textAlign: 'justify' }}>
                                    En VibeTel, <strong>siempre protegemos la información de los usuarios, independientemente de si reservas de forma anonima o si están registrados en la plataforma</strong> . Tus datos personales serán siempre privados y estarán protegidos.
                                </p>
                            </div>

                            {/* Div expandible con más detalles */}
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                            >
                                <div className="mt-3 mb-3 border border-gray-400 border-dashed" />

                                <div className='py-2' >
                                    <p className='text-md' >Beneficios</p>
                                </div>

                                <div className="w-full space-y-2 grid grid-cols-1 md:grid-cols-2">
                                    <li className="flex items-start">
                                        <FaCircleCheck size={15} className='text-green-500 flex-shrink-0 mt-1' />
                                        <p className='ml-3 text-sm'>
                                            Protección total de tu privacidad.
                                        </p>
                                    </li>

                                    <li className="flex items-start">
                                        <FaCircleCheck size={15} className='text-green-500 flex-shrink-0 mt-1' />
                                        <p className='ml-3 text-sm'>
                                            No se guardan tus datos personales en nuestra base de datos.
                                        </p>
                                    </li>

                                    <li className="flex items-start">
                                        <FaCircleCheck size={15} className='text-green-500 flex-shrink-0 mt-1' />
                                        <p className='ml-3 text-sm'>
                                            Ideal para quienes desean mantener su reserva completamente confidencial.
                                        </p>
                                    </li>

                                    <li className="flex items-start">
                                        <FaCircleCheck size={15} className='text-green-500 flex-shrink-0 mt-1' />
                                        <p className='ml-3 text-sm'>
                                            Te garantiza una experiencia de reserva segura y anónima.
                                        </p>
                                    </li>
                                </div>

                                <div className='py-2 mt-2' >
                                    <p className='text-md' >Desventajas</p>
                                </div>

                                <div className="w-full space-y-2 grid grid-cols-1 md:grid-cols-2">
                                    <li className="flex items-start">
                                        <IoIosCloseCircle size={15} className='text-red-500 flex-shrink-0 mt-1' />
                                        <p className='ml-3 text-sm'>
                                            No podrás visualizar de forma fácil el historial de tus reservas.
                                        </p>
                                    </li>

                                    <li className="flex items-start">
                                        <IoIosCloseCircle size={15} className='text-red-500 flex-shrink-0 mt-1' />
                                        <p className='ml-3 text-sm'>
                                            No podrás mantener información de manera accesible todo el tiempo de tus reservas realizadas.
                                        </p>
                                    </li>
                                </div>

                            </motion.div>


                            {/* Botón para expandir/contraer */}
                            <div className="flex justify-center mt-5 mb-2">
                                <button onClick={toggleExpand} className="focus:outline-none">
                                    {isExpanded ? <FaChevronUp size={20} /> : <FaChevronDown size={20} />}
                                </button>
                            </div>
                        </div>

                    </>
                )
            }

            <div className="hidden md:block bg-white w-full items-center px-4 md:px-4 py-4">
                <div className='flex mb-2' >
                    <div className='w-1/2' >
                        <p className="text-2xl font-bold ">{title}</p>
                    </div>
                    <div className="mt-4 sm:mt-0 sm:ml-auto sm:text-base">
                        <div className="relative">
                            <ul className="relative flex w-full flex-wrap items-center justify-between space-x-2 px-2 md:space-x-4">
                                <li className="flex items-center space-x-3 text-left sm:space-x-4">
                                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700">
                                        <IoCheckmark className="h-4 w-4" />
                                    </div>
                                    <span className="font-semibold text-xs text-gray-900">Agregar reserva</span>
                                </li>

                                <IoIosArrowForward className="h-4 w-4 text-gray-400" />

                                {Success || error ? (
                                    <li className="flex items-center space-x-4 text-left">
                                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700">
                                            <IoCheckmark className="h-4 w-4" />
                                        </div>
                                        <span className="font-semibold text-xs text-gray-900">Confirmar reserva</span>
                                    </li>
                                ) : (
                                    <li className="flex items-center space-x-4 text-left">
                                        <a className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2" href="#">
                                            2
                                        </a>
                                        <span className="font-semibold text-xs text-gray-900">Confirmar reserva</span>
                                    </li>
                                )}

                                <IoIosArrowForward className="h-4 w-4 hidden md:block text-gray-400" />

                                {Success ? (
                                    <li className="hidden md:flex items-center mt-2 md:mt-0 space-x-3 sm:space-x-4">
                                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700">
                                            <IoCheckmark className="h-4 w-4" />
                                        </div>
                                        <span className="font-semibold text-xs text-gray-500">Reserva pagada</span>
                                    </li>
                                ) : error ? (
                                    <li className="hidden md:flex items-center mt-2 md:mt-0 space-x-3 sm:space-x-4">
                                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-red-200 text-xs font-semibold text-red-700">
                                            <MdOutlineError className="h-5 w-5" />
                                        </div>
                                        <span className="font-semibold text-xs text-gray-500">No pagada</span>
                                    </li>
                                ) : (
                                    <li className="hidden md:flex items-center mt-2 md:mt-0 space-x-3 sm:space-x-4">
                                        <a className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white" href="#">
                                            3
                                        </a>
                                        <span className="font-semibold text-xs text-gray-500">Reserva pagada</span>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>

                <div>
                    {
                        pathName === "/payment-processing/guest" && (
                            <>
                                <p className='text-sm'>
                                    Las reservas anónimas ofrecen una forma segura de proteger la integridad de los datos de nuestros usuarios. A través de este método, es posible realizar una reserva sin necesidad de almacenar información personal, garantizando así la privacidad y confidencialidad de nuestros usuarios.
                                </p>
                            </>
                        )
                    }
                </div>

            </div>
        </>
    )
}

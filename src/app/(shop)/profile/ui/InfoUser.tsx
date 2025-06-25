'use client';
import React, { useEffect, useState } from 'react'
import { ModalUpdate } from './ModalUpdate'
import { UserInterface } from '@/interfaces/user.interface';
import { formatDate } from '@/utils';
import { FaRegStar, FaGift, FaCalendarCheck, FaTags, FaMapMarkerAlt, FaHeadset } from 'react-icons/fa';

interface Props {
    user: UserInterface;
}

export const InfoUser = ({ user }: Props) => {

    const [loading, setLoading] = useState(true);
    const [userInfo, setUserInfo] = useState<UserInterface>();


    useEffect(() => {
        setUserInfo(user);
        setLoading(false)
    }, [userInfo]);

    return (
        <>
            {
                loading
                    ?
                    (
                        <div className='col-span-8 bg-gray-100 h-screen' >
                            <div className="flex flex-col justify-center items-center h-screen">
                                <div className="flex-grow flex justify-center items-center">
                                    <div className="px-5" >
                                        <svg className="h-5 w-5 animate-spin text-red-600 " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                    : (
                        <>
                            <div className="col-span-8 rounded-x px-3 bg-gray-100 pt-10 md:pt-0 sm:px-8 sm:shadow">
                                <div className="mt-20 bg-white p-4 rounded" style={{ textAlign: 'justify' }}>
                                    <h1 className="py-2 text-2xl font-semibold capitalize">{user.name} {user.lastname}</h1 >
                                    <p className="font- text-slate-600">Querido usuario de nuestra comunidad, te queremos informar que es importante mantener tu informacion actualizada</p>
                                </div>
                                <div className="mb-10 mt-10 grid gap-y-8 lg:grid-cols-2 gap-5 lg:gap-y-0">
                                    <div className="space-y-8">
                                        <div className="block rounded-md border border-gray-100 bg-white py-3 shadow">
                                            <div className="flex px-4 py-4">
                                                <p className="font-semibold mb-1">Datos del usuario</p>
                                                <ModalUpdate user={user} />
                                            </div>
                                            <div className="grid grid-cols md:grid-cols-2 gap-5" >
                                                <div className="ml-4 w-fit">
                                                    <span className="text-xs text-gray-600 block">Nombre</span>
                                                    <p className="capitalize text-lg font-medium" >{userInfo!.name}</p>
                                                </div>
                                                <div className="ml-4 w-fit">
                                                    <span className="text-xs text-gray-600 block">Apellido</span>
                                                    <p className="capitalize text-lg font-medium" >{userInfo!.lastname}</p>
                                                </div>
                                                <div className="ml-4 w-fit">
                                                    <span className="text-xs text-gray-600 block">Correo electronico</span>
                                                    <p className=" text-lg font-medium" >{userInfo!.email}</p>
                                                </div>
                                            </div>
                                            <div className='flex justify-end px-3 mt-5 md:mt-0' >
                                                <span className="text-xs px-3 text-gray-500">ultima actulizacion {
                                                    formatDate(user.updatedAt!)
                                                }</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="block rounded-xl shadow">
                                            <div className="relative flex overflow-hidden rounded-xl bg-red-600 shadow lg:h-auto">
                                                <div className="relative mt-auto w-full">
                                                    <div className="flex flex-col px-2 py-10 md:p-6">
                                                        <div className="">
                                                            <blockquote className="">
                                                                <p className="text-lg font-bold text-white">
                                                                    Con VibePuntos, cada reserva te acerca a increíbles recompensas. ¡Gestiona tus reservas fácilmente y disfruta de beneficios exclusivos!
                                                                </p>
                                                            </blockquote>
                                                        </div>

                                                        <div className="mt-10 flex items-center">
                                                            <div className="ml-4 text-white">
                                                                <p className="text-base font-bold">
                                                                    ¡Descubre los beneficios de VibePuntos!
                                                                </p>
                                                                <p className="text-sm mt-2 flex items-center">
                                                                    <FaRegStar className="mr-2 h-4 w-4 flex-shrink-0" /> <span> <strong>Acumula puntos</strong> por cada reserva realizada en tu motel favorito.</span>
                                                                </p>
                                                                <p className="text-sm mt-2 flex items-center">
                                                                    <FaGift className="mr-2 h-4 w-4 flex-shrink-0" /> <span> <strong>Canjea recompensas</strong> como noches gratis, productos de lencería, artículos de sex shop y más.</span>
                                                                </p>
                                                                <p className="text-sm mt-2 flex items-center">
                                                                    <FaCalendarCheck className="mr-2 h-4 w-4 flex-shrink-0" /> <span> <strong>Gestiona tus reservas</strong> de manera rápida y sencilla en cualquier momento.</span>
                                                                </p>
                                                                <p className="text-sm mt-2 flex items-center">
                                                                    <FaTags className="mr-2 h-4 w-4 flex-shrink-0" /> <span> <strong>Accede a promociones exclusivas</strong> y descuentos especiales en cada reserva.</span>
                                                                </p>
                                                                <p className="text-sm mt-2 flex items-center">
                                                                    <FaMapMarkerAlt className="mr-2 h-4 w-4 flex-shrink-0" /> <span> <strong>Los puntos se acumulan</strong> en el motel donde realizaste la reserva, permitiéndote disfrutar de beneficios personalizados.</span>
                                                                </p>
                                                                <p className="text-sm mt-2 flex items-center">
                                                                    <FaHeadset className="mr-2 h-4 w-4 flex-shrink-0" /> <span> <strong>Atención prioritaria</strong> para resolver dudas o necesidades especiales en tus reservas.</span>
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </>
                    )
            }

        </>
    )
}

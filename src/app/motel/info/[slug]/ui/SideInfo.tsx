import { MotelImage } from '@/components';
import { MotelBySlugApi } from '@/interfaces';
import React from 'react'
import { BiWorld } from 'react-icons/bi';
import { FaStar } from 'react-icons/fa';
import { IoCheckmarkCircleOutline, IoInformationCircleOutline, IoMailOutline } from 'react-icons/io5';
import { MdOutlineLocalPhone, MdOutlineLocationOn, MdOutlineRestaurantMenu } from 'react-icons/md';
import { RiShoppingBagFill } from 'react-icons/ri';


interface Props {
    motel: MotelBySlugApi;
}

export const SideInfo = ({ motel }: Props) => {



    return (
        <div className='px-3 md:col-span-3' >
            <div className='bg-white shadow-md md:shadow-xl border border-gray-300 rounded-3xl p-8 flex  justify-between ' >
                <div className='' >
                    <div className='flex justify-center w-full' >
                        <MotelImage
                            alt={motel.razonSocial}
                            height={300}
                            width={400}
                            src={motel.images[0]}
                            className='rounded-full shadow-lg justify-center  text-center h-20 w-20 object-cover'
                        />
                    </div>
                    <p className='font-semibold text-center capitalize text-lg mt-2' >{motel.razonSocial}</p>
                    <p className='font-extralight text-center text-sm' >Motel</p>
                </div>
                <div className='divide-y-2 divide-dashed space-y-5 ' >
                    <div>
                        <p className='text-lg font-semibold' >{motel.totalRooms}</p>
                        <p className='text-sm' >Habitaciones</p>
                    </div>
                    <div className='pt-4 mt-4' >
                        <p className='text-lg flex gap-1 font-semibold items-center' >
                            {
                                motel.averageRating > 0 &&
                                motel.averageRating
                            } <FaStar className='h-4 w-4' />
                        </p>
                        <p className='text-sm' > {
                            motel.averageRating === 0
                                ? "Sin calificacion"
                                : "Calificacion"
                        }</p>
                    </div>
                </div>
            </div>

            <div className='block  md:hidden bg-white border border-gray-300 rounded-3xl py-8 px-4 mt-10'>
                <div className='mb-5'>
                    <p className='font-medium text-lg'>Descripcion</p>
                </div>
                <p className='text-sm' >
                    {motel.description}
                </p>
            </div>

            <div className='bg-white border border-gray-300 rounded-3xl py-8 px-4 mt-10'>
                <div className='mb-5'>
                    <p className='font-medium text-lg'>Informacion basica</p>
                </div>
                <div className='space-y-5'>
                    <div className='flex gap-2 items-center'>
                        <BiWorld className="h-5 w-5 text-gray-700 flex-shrink-0" />
                        <p className='font-extralight text-sm break-words whitespace-normal'>
                            {motel.city.name}, {motel.city.department.name}
                        </p>
                    </div>

                    <div className='flex gap-2 items-center'>
                        <MdOutlineLocationOn className="h-5 w-5 text-gray-700 flex-shrink-0" />
                        <p className='font-extralight text-sm break-words whitespace-normal'>
                            {motel.address} - {motel.neighborhood}
                        </p>
                    </div>

                    <div className='flex gap-2 items-center'>
                        <IoMailOutline className="h-5 w-5 text-gray-700 flex-shrink-0" />
                        <p className='font-extralight text-sm break-words whitespace-normal max-w-full'>
                            {motel.contactEmail}
                        </p>
                    </div>

                    <div className='flex gap-2 items-center'>
                        <MdOutlineLocalPhone className="h-5 w-5 text-gray-700 flex-shrink-0" />
                        <p className='font-extralight text-sm break-words whitespace-normal'>
                            {motel.contactPhone}
                        </p>
                    </div>
                </div>
            </div>


            <div className='bg-white border border-gray-300 rounded-3xl py-8 px-4 mt-10'>
                <div className='mb-5'>
                    <p className='font-medium text-lg'>Comodidades</p>
                </div>

                {
                    motel.amenities.length > 0 ? (
                        <div className='space-y-3'>
                            {motel.amenities.map((amenityWrapper) => (
                                <div key={amenityWrapper.id} className='flex gap-2 items-start'>
                                    <IoCheckmarkCircleOutline className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className='font-light text-sm text-gray-800'>{amenityWrapper.amenities.name}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <>

                            <div className="space-y-2">
                                <p className='font-medium text-sm text-gray-800'>No ofrece ningún tipo de comodidad establecido por la plataforma.</p>
                                <p className='font-light text-sm text-gray-800'>Comodidades disponibles en la plataforma:</p>
                            </div>

                            <div className='space-y-3 mt-6'>
                                <div className='flex gap-2 items-center text-sm text-gray-800' >
                                    <RiShoppingBagFill className="h-5 w-5 text-gray-700 flex-shrink-0" />
                                    <p>Servicio SexShop</p>
                                </div>
                                <div className='flex gap-2 items-center text-sm text-gray-800' >
                                    <MdOutlineRestaurantMenu className="h-5 w-5 text-gray-700 flex-shrink-0" />
                                    <p>Servicio de Restaurante-Bar</p>
                                </div>
                            </div>
                        </>
                    )
                }

            </div>
        </div>
    )
}

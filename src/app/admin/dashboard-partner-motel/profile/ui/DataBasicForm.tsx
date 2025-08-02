'use client';
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import clsx from 'clsx'
import toast, { Toaster } from 'react-hot-toast';
import { MotelAdmin, MotelApi } from '@/interfaces'
import { AdminImage } from '@/components';

interface Props {
    motel: MotelApi,
}

type FormInputs = {
    title: string;
    description: string;
    contactEmail: string;
    contactPhone: string;
    whatsapp: string;

}

export const DataBasicForm = ({ motel }: Props) => {

    const [motelInfo, setMotelInfo] = useState<MotelApi>();
    const [loading, setLoading] = useState(true);
    const [showLoadingButton, setShowLoadingButton] = useState(false);


    const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>(
        {
            defaultValues: {
                title: motel.razonSocial,
                description: motel.description,
                contactEmail: motel.contactEmail,
                contactPhone: motel.contactPhone,
                whatsapp: motel.whatsapp
            }
        }
    );

    const onUpdate = async (data: FormInputs) => {
        setShowLoadingButton(true);
        // const { title, description, contactPhone, whatsapp } = data;
        // const response = await updateDataBasicMotel(title, description, contactPhone, whatsapp, motel.id);
        // if (!response.ok) {
        //     toast.error("No se pudo actualizar la informacion")
        //     setShowLoadingButton(false);
        //     return;
        // }

        toast.success("Actualizacion correcta!");
        setShowLoadingButton(false);
    }



    useEffect(() => {
        setMotelInfo(motel);
        setLoading(false)
    }, [motelInfo]);

    return (
        <>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            {
                loading
                    ?
                    (
                        <>
                            <div className='grid grid-cols-1 gap-3'>
                                <div className="mb-4">
                                    <div className='flex justify-center' >
                                        <svg className="w-24 h-24 text-gray-300 animate-pulse " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                                        </svg>
                                    </div>
                                    <div className='flex justify-center' >
                                        <div className="w-24 h-2 mb-2 bg-gray-200 rounded-full animate-pulse "></div>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <div className="w-24 h-2 mb-2 bg-gray-200 rounded-full animate-pulse"></div>
                                    <div className="w-full h-6 bg-gray-300 rounded-full animate-pulse"></div>
                                </div>
                                <div className="mb-4">
                                    <div className="w-24 h-2 mb-2 bg-gray-200 rounded-full animate-pulse"></div>

                                    <div className="w-full h-44 bg-gray-300 rounded-md animate-pulse"></div>
                                </div>


                                <div className="mb-4">
                                    <div className="w-24 h-2 mb-2 bg-gray-200 rounded-full animate-pulse"></div>

                                    <div className="w-full h-6 bg-gray-300 rounded-full animate-pulse"></div>
                                </div>

                            </div>

                            <div className='grid grid-cols md:grid-cols-2 gap-4' >
                                <div className="mb-4">
                                    <div className="w-24 h-2 mb-2 bg-gray-200 rounded-full animate-pulse"></div>

                                    <div className="w-full h-6 bg-gray-300 rounded-full animate-pulse"></div>
                                </div>
                                <div className="mb-4">
                                    <div className="w-24 h-2 mb-2 bg-gray-200 rounded-full animate-pulse"></div>

                                    <div className="w-full h-6 bg-gray-300 rounded-full animate-pulse"></div>
                                </div>
                            </div>

                        </>
                    )
                    : (

                        <form onSubmit={handleSubmit(onUpdate)}   >
                            <div className='mb-4 space-y-2' >
                                <div className='flex justify-center'>
                                    <AdminImage
                                        src={motelInfo?.images![0].url}
                                        width={300}
                                        height={100}
                                        alt='administrador'
                                        className="rounded-full shadow-lg justify-center  text-center h-16 w-16 object-cover"
                                    />
                                </div>
                                <div className='flex justify-center' >
                                    {
                                        motelInfo?.images![0]
                                            ? (
                                                <Link className='underline text-center text-xs' href="/admin/dashboard-partner-motel/config-motel/motel-cover">
                                                    Editar portada
                                                </Link>
                                            )
                                            : (
                                                <Link className='underline text-xs' href="/admin/dashboard-partner-motel/config-motel/motel-cover">
                                                    Agregar portada
                                                </Link>
                                            )
                                    }
                                </div>

                            </div>
                            <div className='grid grid-cols-1 gap-3'>
                                <div className="mb-4">
                                    <label className={
                                        clsx(
                                            "block mb-2 text-sm text-black font-semibold ",
                                            {
                                                "text-red-500": errors.title
                                            }
                                        )
                                    }>Nombre</label>
                                    <input type="text" className={
                                        clsx(
                                            "bg-gray-300 border-2 border-gray-300 text-black text-sm rounded-lg appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 block w-full p-2.5 placeholder-black",
                                            {
                                                'focus:border-red-600 border-red-500': errors.title
                                            }
                                        )
                                    } placeholder=""
                                        {...register('title', { required: true })}

                                    />

                                    {
                                        errors.title?.type === 'required' && (
                                            <span className="text-red-500 text-xs" >* El nombre es obligatorio</span>
                                        )
                                    }
                                    <span className="text-xs text-gray-500 block">El nombre del motel estará así en la appp</span>
                                </div>
                                <div className="mb-4">
                                    <label className={
                                        clsx(
                                            "block mb-2 text-sm text-black font-semibold ",
                                            {
                                                "text-red-500": errors.description
                                            }
                                        )
                                    }>Descripcion</label>
                                    <textarea
                                        rows={6}
                                        className={
                                            clsx(
                                                "bg-gray-300 border-2 border-gray-300 text-black text-sm rounded-lg appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 block w-full p-2.5 placeholder-black",
                                                {
                                                    'focus:border-red-600 border-red-500': errors.description
                                                }
                                            )
                                        } placeholder="ej: Disfruta de una estancia cómoda en nuestra habitación estándar equipada con una cama queen size, baño privado con artículos de tocador gratuitos, televisión de pantalla plana con canales por cable, Wi-Fi gratuito, aire acondicionado..."
                                        {...register('description', { required: true })}
                                    />

                                    {
                                        errors.description?.type === 'required' && (
                                            <span className="text-red-500 text-xs" >* La descripcion es obligatoria</span>
                                        )
                                    }
                                    <span className="text-xs text-gray-500 block">Recuerda que la descripción que proporciones aquí aparecerá en la aplicación. Es importante que sea clara y detallada para atraer a los usuarios adecuados.</span>
                                </div>
                            </div>

                            <div className='grid grid-cols md:grid-cols-2 gap-4' >
                                <div className="mb-4">
                                    <label className={
                                        clsx(
                                            "block mb-2 text-sm text-black font-semibold ",
                                            {
                                                "text-red-500": errors.contactPhone
                                            }
                                        )
                                    }>Contacto</label>
                                    <input type="text" className={
                                        clsx(
                                            "bg-gray-300 border-2 border-gray-300 text-black text-sm rounded-lg appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 block w-full p-2.5 placeholder-black",
                                            {
                                                'focus:border-red-600 border-red-500': errors.contactEmail
                                            }
                                        )
                                    } placeholder=""
                                        {...register('contactPhone', { required: true, pattern: /^\s*([3][0-9]{9})\s*$/ })}
                                    />
                                    {
                                        errors.contactPhone?.type === 'required' && (
                                            <span className="text-red-500 text-xs" >* El numero telefono es obligatorio</span>
                                        )
                                    }
                                    {
                                        errors.contactPhone?.type === 'pattern' && (
                                            <span className="text-red-500 text-xs" >* El numero telefono debe ser valido</span>
                                        )
                                    }
                                    <span className="text-xs text-gray-500 block">Recuerda mantener el contacto actualizado</span>
                                </div>
                                <div className="mb-4">
                                    <label className={
                                        clsx(
                                            "block mb-2 text-sm text-black font-semibold ",
                                            {
                                                "text-red-500": errors.whatsapp
                                            }
                                        )
                                    }>Whatsapp</label>
                                    <input type="text" className={
                                        clsx(
                                            "bg-gray-300 border-2 border-gray-300 text-black text-sm rounded-lg appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 block w-full p-2.5 placeholder-black",
                                            {
                                                'focus:border-red-600 border-red-500': errors.whatsapp
                                            }
                                        )
                                    } placeholder=""
                                        {...register('whatsapp', { required: true, pattern: /^\s*([3][0-9]{9})\s*$/ })}

                                    />
                                    {
                                        errors.whatsapp?.type === 'required' && (
                                            <span className="text-red-500 text-xs" >* El whatsapp es obligatorio</span>
                                        )
                                    }
                                    {
                                        errors.whatsapp?.type === 'pattern' && (
                                            <span className="text-red-500 text-xs" >* El whatsapp debe ser valido</span>
                                        )
                                    }
                                </div>
                            </div>

                            <div className='flex justify-end' >
                                <button
                                    type='submit'
                                    disabled={showLoadingButton}
                                    className={
                                        clsx(

                                            {
                                                "flex items-center gap-x-4 rounded-lg bg-blue-600 hover:bg-blue-700 px-7 py-2 font-medium text-white": !showLoadingButton,
                                                "flex items-center gap-x-4 rounded-lg bg-blue-600 px-7 py-2 font-medium text-white cursor-not-allowed": showLoadingButton
                                            }
                                        )
                                    }>
                                    {
                                        showLoadingButton &&
                                        (<svg className="h-5 w-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" ></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>)
                                    }

                                    {
                                        showLoadingButton
                                            ? (
                                                <span>Cargando...</span>
                                            ) : (
                                                <span>Actualizar</span>
                                            )
                                    }

                                </button>
                            </div>
                        </form>
                    )
            }

        </>
    )
}

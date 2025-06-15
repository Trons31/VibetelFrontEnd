'use client';
import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import { useForm } from 'react-hook-form';
import { UserInterface } from '@/interfaces/user.interface';
import toast, { Toaster } from 'react-hot-toast';
import { updateMotelPartner } from '@/actions';

interface Props {
    motelPartner: UserInterface,
}

type FormInputs = {
    name: string;
    lastName: string;
    email: string;
    contactPhone: string;

}

export const MotelPartnerForm = ({ motelPartner }: Props) => {

    const [motelPartnerInfo, setMotelPartnerInfo] = useState<UserInterface>();
    const [loading, setLoading] = useState(true);
    const [showLoadingButton, setShowLoadingButton] = useState(false);


    const { register, handleSubmit, formState: { errors }, setValue, trigger, getValues } = useForm<FormInputs>(
        {
            defaultValues: {
                name: motelPartner.name,
                lastName: motelPartner.lastname,
                email: motelPartner.email,
                contactPhone: motelPartner.contactPhone!
            }
        }
    );

    const onUpdate = async (data: FormInputs) => {
        setShowLoadingButton(true);
        const { name, lastName, email, contactPhone } = data;

        const response = await updateMotelPartner(motelPartner.id, name, lastName, email, contactPhone)

        if (!response.ok) {
            toast.error("No se pudo actualizar la informacion")
            setShowLoadingButton(false);
            return;
        }

        toast.success("Actualizacion correcta!")
        setShowLoadingButton(false);
    }



    useEffect(() => {
        setMotelPartnerInfo(motelPartner);
        setLoading(false)
    }, [motelPartnerInfo]);

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

                            <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                                <div className="mb-4">
                                    <label className={
                                        clsx(
                                            "block mb-2 text-sm text-black font-semibold ",
                                            {
                                                "text-red-500": errors.name
                                            }
                                        )
                                    }>Nombre</label>
                                    <input type="text" className={
                                        clsx(
                                            "bg-gray-300 border-2 border-gray-300 text-black text-sm rounded-lg appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 block w-full p-2.5 placeholder-black",
                                            {
                                                'focus:border-red-600 border-red-500': errors.name
                                            }
                                        )
                                    } placeholder=""
                                        {...register('name', { required: true })}

                                    />

                                    {
                                        errors.name?.type === 'required' && (
                                            <span className="text-red-500 text-xs" >* El nombre es obligatorio</span>
                                        )
                                    }

                                </div>
                                <div className="mb-4">
                                    <label className={
                                        clsx(
                                            "block mb-2 text-sm text-black font-semibold ",
                                            {
                                                "text-red-500": errors.lastName
                                            }
                                        )
                                    }>Apellido</label>
                                    <input type="text" className={
                                        clsx(
                                            "bg-gray-300 border-2 border-gray-300 text-black text-sm rounded-lg appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 block w-full p-2.5 placeholder-black",
                                            {
                                                'focus:border-red-600 border-red-500': errors.lastName
                                            }
                                        )
                                    } placeholder=""
                                        {...register('lastName', { required: true })}

                                    />

                                    {
                                        errors.lastName?.type === 'required' && (
                                            <span className="text-red-500 text-xs" >* El apellido es obligatorio</span>
                                        )
                                    }

                                </div>

                            </div>

                            <div className='grid grid-cols md:grid-cols-2 gap-4' >
                                <div className="mb-4">
                                    <label className={
                                        clsx(
                                            "block mb-2 text-sm text-black font-semibold ",
                                            {
                                                "text-red-500": errors.email
                                            }
                                        )
                                    }>Correo electronico</label>
                                    <input type="text" className={
                                        clsx(
                                            "bg-gray-300 border-2 border-gray-300 text-black text-sm rounded-lg appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 block w-full p-2.5 placeholder-black",
                                            {
                                                'focus:border-red-600 border-red-500': errors.email
                                            }
                                        )
                                    } placeholder=""
                                        {...register('email', { required: true, pattern: /^(?=.{1,254}$)(?:(?:[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*)|(?:"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*"))@(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-zA-Z0-9-]*[a-zA-Z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/ })}
                                    />
                                    {
                                        errors.email?.type === 'required' && (
                                            <span className="text-red-500 text-xs" >* El correo electronico obligatorio</span>
                                        )
                                    }
                                    {
                                        errors.email?.type === 'pattern' && (
                                            <span className="text-red-500 text-xs" >* El correo electronico debe ser valido</span>
                                        )
                                    }
                                    <span className="text-xs text-gray-500 block">Recuerda mantener el correo electronico actualizado</span>
                                </div>
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
                                                'focus:border-red-600 border-red-500': errors.contactPhone
                                            }
                                        )
                                    } placeholder=""
                                        {...register('contactPhone', { required: true, pattern: /^\s*([3][0-9]{9})\s*$/ })}

                                    />
                                    {
                                        errors.contactPhone?.type === 'required' && (
                                            <span className="text-red-500 text-xs" >* El contacto es obligatorio</span>
                                        )
                                    }
                                    {
                                        errors.contactPhone?.type === 'pattern' && (
                                            <span className="text-red-500 text-xs" >* El contacto debe ser valido</span>
                                        )
                                    }
                                    <span className="text-xs text-gray-500 block">Recuerda mantener el contacto actualizado</span>
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

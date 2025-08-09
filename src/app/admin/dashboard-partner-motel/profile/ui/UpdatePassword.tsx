'use client';
import React, { useState } from 'react'
import clsx from 'clsx';
import { useForm } from 'react-hook-form';
import { IoInformationOutline } from 'react-icons/io5';
import toast, { Toaster } from 'react-hot-toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';


interface Props {
    accessToken: string;
}

type FormInputs = {
    currentPassword: string;
    newPassword: string;
}

export const UpdatePassword = ({ accessToken }: Props) => {

    const { register, handleSubmit, formState: { errors }, setValue, trigger, getValues } = useForm<FormInputs>();
    const [showLoadingUpdate, setShowLoadingUpdate] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    const onUpdate = async (data: FormInputs) => {
        setShowLoadingUpdate(true)

        const updatedPassword = {
            currentPassword: data.currentPassword,
            newPassword: data.newPassword
        }

        try {
            await axios.patch(
                `${process.env.NEXT_PUBLIC_API_ROUTE}user/update-password-motelpartner`, updatedPassword,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            toast.success("Contraseña actualizada correctamente");
            setShowLoadingUpdate(false)
        } catch (error: any) {
            console.log(error)
            toast.error("La contraseña ingresada no corresponde a la contraseña actual.",
                {
                    className: " w-[600px]",
                    duration: 5000
                }
            )
            setShowLoadingUpdate(false)
            return;
        }


        setShowLoadingUpdate(false)
        toast.success("Contraseña actualizada correctamente")

    }

    return (
        <>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            <form action="" onSubmit={handleSubmit(onUpdate)}>
                <p className="py-2 text-lg font-semibold">Contraseña</p>
                <div className="flex items-center">
                    <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3">
                        <label >
                            <span className={
                                clsx(
                                    "text-sm text-gray-500",
                                    {
                                        "text-red-600 ": errors.currentPassword
                                    }
                                )
                            }>Contraseña actual</span>
                            <div className={
                                clsx(
                                    "relative flex overflow-hidden rounded-md border-2 transition focus:border-blue-600",
                                    {
                                        "focus:border-red-600 border-red-500": errors.currentPassword
                                    }
                                )
                            }>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className={
                                        clsx(
                                            "w-full  border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 appearance-none  focus:outline-none focus:ring-0",

                                        )
                                    } placeholder="***********"
                                    {...register('currentPassword', { required: true })}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                                >
                                    {showPassword ? (
                                        <FaEyeSlash className="w-5 h-5" />
                                    ) : (
                                        <FaEye className="w-5 h-5" />
                                    )}
                                </button>
                            </div>

                            {
                                errors.currentPassword?.type === 'required' && (
                                    <span className="text-red-500 text-sm" >* La contraseña actual es obligatoria</span>
                                )
                            }
                        </label>
                        <label >
                            <span className={
                                clsx(
                                    "text-sm text-gray-500",
                                    {
                                        "text-red-600": errors.newPassword
                                    }
                                )
                            }>Contraseña nueva</span>
                            <div className={
                                clsx(
                                    "relative flex overflow-hidden rounded-md border-2 transition focus:border-blue-600",
                                    {
                                        "focus:border-red-600 border-red-500": errors.newPassword
                                    }
                                )
                            }>
                                <input
                                    type={showNewPassword ? "text" : "password"}
                                    className={
                                        clsx(
                                            "w-full  border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 appearance-none  focus:outline-none focus:ring-0",
                                        )
                                    } placeholder="***********"
                                    {...register('newPassword', { required: true, pattern: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{6,}$/ })}

                                />
                                <button
                                    type="button"
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                                >
                                    {showNewPassword ? (
                                        <FaEyeSlash className="w-5 h-5" />
                                    ) : (
                                        <FaEye className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                            {
                                errors.newPassword?.type === 'required' && (
                                    <span className="text-red-500 text-sm" >* La contraseña nueva es obligatoria</span>
                                )
                            }
                            {
                                errors.newPassword?.type === 'pattern' && (
                                    <span className="text-red-500 text-sm" >La contraseña debe tener al menos
                                        <ul className="ps-5 mt-2 space-y-1 text-red-5000 list-disc list-inside">
                                            <li>6 caracteres</li>
                                            <li>una mayúscula</li>
                                            <li>un número</li>
                                            <li>un carácter especial</li>

                                        </ul>
                                    </span>
                                )
                            }
                        </label>
                    </div>

                    {
                        //TODO: Agregar icono de ver contraseña
                    }

                </div>


                <p className="text-xs md:text-sm mt-2">Recuerda que puedes recuperar tu contraseña si la has olvidado.</p>

                <div className='flex justify-start' >
                    <button
                        type='submit'
                        disabled={showLoadingUpdate}
                        className={
                            clsx(

                                {
                                    "flex text-xs md:text-sm items-center gap-x-4 rounded-lg bg-blue-600 hover:bg-blue-700 px-7 py-2 font-medium text-white": !showLoadingUpdate,
                                    "flex text-xs md:text-sm items-center gap-x-4 rounded-lg bg-blue-600 px-7 py-2 font-medium text-white cursor-not-allowed": showLoadingUpdate
                                }
                            )
                        }>
                        {
                            showLoadingUpdate &&
                            (<svg className="h-5 w-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" ></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>)
                        }

                        {
                            showLoadingUpdate
                                ? (
                                    <span>Cargando...</span>
                                ) : (
                                    <span>Actualizar contraseña</span>
                                )
                        }
                    </button>
                </div>
            </form>

        </>
    )
}

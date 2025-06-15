'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { authenticate } from '@/actions/auth/login';
import { useFormState } from "react-dom";
import { IoInformationOutline } from "react-icons/io5";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import { sleep } from "@/utils";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

type FormInputs = {
    email: string;
    password: string;
}

export const LoginForm = () => {


    const [state, dispatch] = useFormState(authenticate, undefined);
    const [loadingButton, setLoadingButton] = useState(false)
    const [showLoadingLogin, setShowLoadingLogin] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>();

    const onDispatch = async (data: FormInputs) => {
        setShowLoadingLogin(true);

        await sleep(1);

        try {
            const formData = new FormData();
            formData.append('email', data.email);
            formData.append('password', data.password);
            await dispatch(formData);
            setShowLoadingLogin(false);

        } catch (error) {
            setShowLoadingLogin(false);
        } finally {
            setShowLoadingLogin(false);
        }
    }

    useEffect(() => {
        if (state === "Success;") {
            const redirectUrl = localStorage.getItem('redirectUrl');
            if (redirectUrl) {
                localStorage.removeItem('redirectUrl');
                window.location.replace(redirectUrl);
            } else {
                window.location.replace("/home");
            }
        }
    }, [state, loadingButton])

    return (
        <form onSubmit={handleSubmit(onDispatch)} className="flex items-center mt-10 md:mt-10 bg-white ">

            <div className="container mx-auto">
                <div className="max-w-md mx-auto ">
                    <div className="text-center">
                        <h1 className="my-3 text-3xl font-bold text-gray-700 ">Iniciar sesion</h1>
                    </div>
                    <div className="m-7">
                        <div className="relative mb-4">
                            <input type="text" autoFocus className={
                                clsx(
                                    "block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-100  border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer",
                                    {
                                        'focus:border-red-600 ': errors.email
                                    }
                                )
                            } placeholder=" "
                                {...register('email', { required: true, pattern: /^(?=.{1,254}$)(?:(?:[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*)|(?:"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*"))@(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-zA-Z0-9-]*[a-zA-Z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/ })}
                            />
                            <label className={
                                clsx(
                                    "absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto",
                                    {
                                        'peer-focus:text-red-600 text-red-500': errors.email
                                    }
                                )
                            }>Correo electronico</label>

                            {
                                errors.email?.type === 'required' && (
                                    <span className="text-red-500 text-sm" >* Ingrese su correo electronico</span>
                                )
                            }

                            {
                                errors.email?.type === 'pattern' && (
                                    <span className="text-red-500 text-sm" >* El email debe ser valido</span>
                                )
                            }
                        </div>

                        <div className="mb-3">

                            <div className="relative">
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    className={
                                        clsx(
                                            "block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-100 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer pr-10",
                                            {
                                                'focus:border-red-600': errors.password?.type === 'required'
                                            }
                                        )
                                    } 
                                    placeholder=" "
                                    {...register('password', { required: true })}
                                />
                                <label className={
                                    clsx(
                                        "absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto",
                                        {
                                            'peer-focus:text-red-600 text-red-500': errors.password?.type === 'required'
                                        }
                                    )
                                }>Contraseña</label>
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
                                errors.password?.type === 'required' && (
                                    <span className="text-red-500 text-sm" >* Ingrese su contraseña</span>
                                )
                            }
                        </div>

                        <div className="flex justify-end mb-2">
                            <Link href="/auth/recover-password/send-request" className="text-sm text-gray-600 focus:outline-none font-medium underline focus:text-indigo-500 hover:text-indigo-500 ">¿Olvidaste tu constraseña?</Link>
                        </div>

                        <div
                            className="flex items-end  space-x-1"
                            aria-live="polite"
                            aria-atomic="true"
                        >
                            {state === "Credenciales incorrectas. Intenta de nuevo" && (
                                <>
                                    <div className="hover:red-yellow-500 flex justify-center items-center gap-2  w-full mb-2 select-none rounded-t-lg border-t-4 border-red-400 bg-red-100 py-3 px-2 font-medium">
                                        <p className="text-center" >{state}</p>
                                    </div>
                                </>
                            )}
                        </div>


                        <div className="mb-6 mt-3">

                            <button
                                type='submit'
                                disabled={showLoadingLogin}
                                className={
                                    clsx(

                                        {
                                            "flex items-center gap-x-4 mb-2 w-full mt-2 justify-center rounded-lg bg-red-600 px-3 py-4 hover:bg-red-700 text-lg font-bold text-white": !showLoadingLogin,
                                            "flex items-center gap-x-4 mb-2 w-full mt-2 justify-center rounded-lg bg-red-600 px-3 py-4 text-lg font-bold text-white cursor-not-allowed": showLoadingLogin
                                        }
                                    )
                                }>
                                {
                                    showLoadingLogin &&
                                    (<svg className="h-5 w-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" ></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>)
                                }

                                {
                                    showLoadingLogin
                                        ? (
                                            <span>Cargando...</span>
                                        ) : (
                                            <span>Iniciar sesion</span>
                                        )
                                }

                            </button>



                        </div>

                        <div className="flex justify-center" >
                            <p className="text-sm text-gray-600 focus:outline-none font-medium ">¿No tienes una cuenta? <Link href="/auth/new-account" className="text-indigo-600 hover:underline" >Crear cuenta</Link></p>
                        </div>

                    </div>
                </div>
            </div>
        </form>
    )
}


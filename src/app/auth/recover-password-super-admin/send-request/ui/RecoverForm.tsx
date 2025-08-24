'use client';
import clsx from "clsx";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import axios from 'axios';
import { IoInformationOutline } from "react-icons/io5";
import { AiFillCloseCircle } from "react-icons/ai";
import { FaCheckCircle } from "react-icons/fa";


type FormInputs = {
    email: string;
}

export const RecoverForm = () => {
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [showLoading, setShowLoading] = useState(false);


    const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>();

    const onDispatch = async (data: FormInputs) => {
        setShowLoading(true);
        setShowErrorMessage(false);

        try {
            await axios.post(
                `${process.env.NEXT_PUBLIC_API_ROUTE}user/forgot-password`, { email: data.email }
            );
            toast(
                (t) => (
                    <div>
                        <h3 className="text-green-600 text-sm md:text-lg font-semibold">Correo enviado</h3>
                        <p className="text-xs md:text-sm text-gray-800">Revisa tu bandeja de entrada {data.email}</p>
                    </div>
                ),
                {
                    duration: 7000,
                    position: window.innerWidth <= 768 ? 'top-center' : 'top-right',
                    style: {
                        padding: '16px',
                        color: '#f44336',
                    },
                    icon: <FaCheckCircle
                        className='text-green-600 h-4 w-4'
                    />,
                    ariaProps: {
                        role: 'alert',
                        'aria-live': 'assertive',
                    },
                }
            );
        } catch (error: any) {
            console.log(error)
            setShowErrorMessage(true);
            toast(
                (t) => (
                    <div>
                        <h3 className="text-red-600 text-sm md:text-lg font-semibold">Correo electrónico no registrado</h3>
                        <p className="text-xs md:text-sm font-medium text-gray-500">
                            {data.email}
                        </p>
                    </div>

                ),
                {
                    duration: 6000,
                    position: window.innerWidth <= 768 ? 'top-center' : 'top-right',
                    style: {
                        padding: '16px',
                        color: '#f44336',
                        maxWidth: '400px',
                        width: '100%',
                    },
                    icon: <AiFillCloseCircle
                        className='text-red-600 h-4 w-4'
                    />,
                    ariaProps: {
                        role: 'alert',
                        'aria-live': 'assertive',
                    },
                }
            );
        } finally {
            setShowLoading(false);
        }
    };
    return (
        <>

            <Toaster
                position="top-right"
                reverseOrder={false}
            />

            <form onSubmit={handleSubmit(onDispatch)} className={
                clsx(
                    "flex items-center mt-10 md:mt-10  bg-white ",
                )
            }>
                <div className="container mx-auto">
                    <div className="max-w-md mx-auto ">
                        <div className="text-center m-4 mb-4">
                            <h1 className="text-xl md:text-3xl font-bold text-gray-700">Introduce tu correo</h1>
                            <p className="text-xs md:text-sm mt-1 text-gray-600">Te enviaremos un correo para recuperar tu contraseña.</p>
                        </div>
                        <div className="m-7">
                            <div className="relative">
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
                            </div>

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

                            {
                                showErrorMessage && (
                                    <div className="hover:red-yellow-500 mt-3 flex justify-center items-center gap-2  w-full mb-2 select-none rounded-t-lg border-t-4 border-red-400 bg-red-100 py-3 px-2 font-medium">
                                        <IoInformationOutline size={25} className="text-red-600" />
                                        El correo electronico no esta registrado
                                    </div>
                                )
                            }

                            <div className="mb-6 mt-3">

                                <div className="mb-6 mt-3">

                                    <button
                                        type='submit'
                                        disabled={showLoading}
                                        className={
                                            clsx(

                                                {
                                                    "flex items-center gap-x-4 mb-2 w-full mt-2 justify-center rounded-lg bg-red-600 px-3 py-4 hover:bg-red-700 text-lg font-bold text-white": !showLoading,
                                                    "flex items-center gap-x-4 mb-2 w-full mt-2 justify-center rounded-lg bg-red-600 px-3 py-4 text-lg font-bold text-white cursor-not-allowed": showLoading
                                                }
                                            )
                                        }>
                                        {
                                            showLoading &&
                                            (<svg className="h-5 w-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" ></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>)
                                        }

                                        {
                                            showLoading
                                                ? (
                                                    <span>Cargando...</span>
                                                ) : (
                                                    <span>Continuar</span>
                                                )
                                        }

                                    </button>

                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

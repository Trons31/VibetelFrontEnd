'use client';
import React, {  useEffect, useState } from 'react'
import clsx from 'clsx';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { AiFillCloseCircle } from 'react-icons/ai';

interface ModalProps {
    isOpen: boolean;
    user: {
        id: string;
        name: string;
        lastname: string;
        email: string;
        contactPhone?: string | null;
    }
    onClose: () => void;
}

interface FormInputs {
    name: string;
    lastName: string
    email: string;
}

export const ModalForm = ({ isOpen, onClose, user }: ModalProps) => {

    const [isLoading, setIsLoading] = useState(false);

    const {
        handleSubmit,
        register,
        formState: { isValid, errors },
        setValue,
        getValues,
        watch,
    } = useForm<FormInputs>({
        defaultValues: {
            name: user.name,
            lastName: user.lastname,
            email: user.email
        }
    });

    const OnSubmit = () => {

    }

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const onSubmit = async (data: FormInputs) => {
        setIsLoading(true);
        const { name, lastName, email } = data;
        // const resp = await updateUser(user.id, name, lastName, email);
        // if (!resp.ok) {
        //     setIsLoading(false);
        //     toast(
        //         (t) => (
        //             <div>
        //                 <h3 className="text-red-600 text-sm md:text-lg font-semibold">Ups! Error</h3>
        //                 <p className="text-xs md:text-sm font-medium text-gray-500">
        //                     {resp.message}
        //                 </p>
        //             </div>

        //         ),
        //         {
        //             duration: 6000,
        //             position: 'top-right',
        //             style: {
        //                 padding: '16px',
        //                 color: '#f44336',
        //                 maxWidth: '350px',
        //                 width: '100%',
        //             },
        //             icon: <AiFillCloseCircle
        //                 className='text-red-600 h-6 w-6'
        //             />,
        //             ariaProps: {
        //                 role: 'alert',
        //                 'aria-live': 'assertive',
        //             },
        //         }
        //     );
        //     return;
        // }
        toast.success("Informacion actualizada correctamente");
        setIsLoading(false);
    }

    return (
        <>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />

            <div
                className="fixed inset-0 z-50 overflow-y-hidden flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
                onClick={handleBackdropClick}
            >
                <div className="bg-white  md:rounded-lg shadow-lg w-full md:w-1/2 lg:w-1/2 p-6 max-h-full overflow-y-auto">
                    <h2 className="text-xl font-semibold mb-4">Actualizar informacion</h2>
                    <form onSubmit={handleSubmit(onSubmit)} >
                        <div className="grid px-2 grid-cols-1 mt-5 sm:px-0 sm:grid-cols-2 gap-6">

                            <div >
                                <label className={
                                    clsx(
                                        "block mb-2 text-sm text-black font-semibold ",
                                        {
                                            "text-red-500": errors.name
                                        }
                                    )
                                }>Nombre</label>
                                <input
                                    type="text"
                                    className={
                                        clsx(
                                            "bg-gray-300 border-2 border-gray-300 text-black text-sm rounded-lg appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 block w-full p-2.5 placeholder-black",
                                            {
                                                'focus:border-red-600 border-red-500': errors.name
                                            }
                                        )
                                    }
                                    {...register('name', { required: true })}
                                    placeholder="Daniel Rivero"
                                />
                                {
                                    errors.name?.type === 'required' && (
                                        <span className="text-red-500  text-sm" >* El nombre es obligatorio</span>
                                    )
                                }
                            </div>

                            <div>
                                <label className={
                                    clsx(
                                        "block mb-2 text-sm text-black font-semibold ",
                                        {
                                            "text-red-500": errors.lastName
                                        }
                                    )
                                }>Apellido</label>
                                <input
                                    type="text"
                                    className={
                                        clsx(
                                            "bg-gray-300 border-2 border-gray-300 text-black text-sm rounded-lg appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 block w-full p-2.5 placeholder-black",
                                            {
                                                'focus:border-red-600 border-red-500': errors.lastName
                                            }
                                        )
                                    }
                                    {...register('lastName', { required: true })}
                                    placeholder="Daniel Rivero"
                                />
                                {
                                    errors.lastName?.type === 'required' && (
                                        <span className="text-red-500  text-sm" >* El apellido es obligatorio</span>
                                    )
                                }
                            </div>
                        </div>

                        <div className='grid grid-cols-1 mt-4 mb-4 md:px-0 px-2' >
                            <div>
                                <label className={
                                    clsx(
                                        "block mb-2 text-sm text-black font-semibold ",
                                        {
                                            "text-red-500": errors.email
                                        }
                                    )
                                }>Correo electronico</label>
                                <input
                                    type="text"
                                    className={
                                        clsx(
                                            "bg-gray-300 border-2 border-gray-300 text-black text-sm rounded-lg appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 block w-full p-2.5 placeholder-black",
                                            {
                                                'focus:border-red-600 border-red-500': errors.email
                                            }
                                        )
                                    }
                                    {...register('email', { required: true, pattern: /^(?=.{1,254}$)(?:(?:[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*)|(?:"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*"))@(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-zA-Z0-9-]*[a-zA-Z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/ })}
                                    placeholder="Daniel Rivero"
                                />
                                {
                                    errors.email?.type === 'required' && (
                                        <span className="text-red-500 text-sm" >* El email es obligatorio</span>
                                    )
                                }

                                {
                                    errors.email?.type === 'pattern' && (
                                        <span className="text-red-500 text-sm" >* El email debe ser valido</span>
                                    )
                                }

                            </div>
                        </div>


                        <div className="flex gap-3 justify-end">
                            <button
                                onClick={onClose}
                                className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                            >
                                Cerrar
                            </button>
                            <button
                                className={
                                    clsx(
                                        {
                                            "flex  mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700": !isLoading,
                                            "flex gap-2 mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-not-allowed": isLoading
                                        }
                                    )
                                }
                                type='submit'
                            >
                                {
                                    isLoading &&
                                    (<svg className="h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" ></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>)
                                }

                                {
                                    isLoading
                                        ? (
                                            <span>Cargando...</span>
                                        ) : (
                                            <span>Actualizar</span>
                                        )
                                }
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </>
    )
}

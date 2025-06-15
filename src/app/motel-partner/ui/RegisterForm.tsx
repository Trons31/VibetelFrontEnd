'use client';
import { login, registerMotelPartner } from '@/actions';
import axios from 'axios';
import clsx from "clsx";
import Link from "next/link"
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa';
import { IoInformationOutline } from 'react-icons/io5';


type FormInputs = {
    name: string;
    lastname: string;
    contactPhone: string;
    email: string;
    password: string;
}

export const RegisterForm = () => {

    const [errorMessage, setErrorMessage] = useState('');
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [showLoadingRegister, setShowLoadingRegister] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const { register, handleSubmit, formState: { errors }, setValue, trigger } = useForm<FormInputs>();

    const onSubmit = async (data: FormInputs) => {
        setShowLoadingRegister(true)
        setShowErrorMessage(false);
        setErrorMessage('');

        const { name, lastname, contactPhone, email, password } = data;

        try {
            await axios.post(`${process.env.NEXT_PUBLIC_API_ROUTE}user/register`, { name, lastname, email, contactPhone, password, roles: ["user", "motelPartner"] });
        } catch (error) {
            setShowLoadingRegister(false)
            setShowErrorMessage(true);
            setErrorMessage("Este correo ya está registrado. Inicia sesión.");
            return;
        }


        await login(email.toLowerCase(), password);
        setShowLoadingRegister(false);
        window.location.replace('/admin/dashboard-partner-motel')

    }

    const validatePassword = (value: string): string | true => {
        const errors: string[] = [];

        if (value.length < 6) errors.push("6 caracteres");
        if (!/[A-Z]/.test(value)) errors.push("una mayúscula");
        if (!/[0-9]/.test(value)) errors.push("un número");
        if (!/[@$!%*?&.]/.test(value)) errors.push("un carácter especial");

        return errors.length > 0 ? errors.join(", ") : true;
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="lg:w-2/5 md:w-full  bg-white p-5 md:p-10 flex flex-col lg:ml-auto w-full mt-10 lg:mt-10 rounded-2xl z-5">
            {/* Registration Form */}
            <div className="text-center">
                <h1 className={` text-3xl`} >Registra tu Motel</h1>
                <p className="font-extralight text-sm mt-2" >¿Ya iniciaste tu registro?
                    <Link href="/auth/partner" >
                        <span className={`underline ml-1 text-red-500`} > Comienza aqui.</span>
                    </Link>
                </p>
            </div>

            <div className="flex flex-col space-y-4 mt-3">
                <div className="text-center" >

                </div>

                <div className="grid mt-5 grid-cols md:grid-cols-2 gap-2" >

                    <div className="relative mb-4">
                        <div className="relative">
                            <input type="text" autoFocus className={
                                clsx(
                                    "block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-200 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer",
                                    {
                                        'focus:border-red-600 border-red-500': errors.name?.type === 'required'
                                    }
                                )
                            } placeholder=" "

                                {...register('name', { required: true })} />
                            <label className={
                                clsx(
                                    "absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-4 z-5 origin-[0] start-2.5 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto",
                                    {
                                        'peer-focus:text-red-600  text-red-500': errors.name?.type === 'required'
                                    }
                                )
                            }>Nombre</label>
                        </div>
                        {
                            errors.name?.type === 'required' && (
                                <span className="text-red-500 text-xs block" >* El nombre es obligatorio</span>
                            )
                        }
                    </div>


                    <div className="relative mb-4">
                        <div className="relative">
                            <input type="text" className={
                                clsx(
                                    "block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-200 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer",
                                    {
                                        'focus:border-red-600 border-red-500': errors.lastname?.type === 'required'
                                    }
                                )
                            } placeholder=" "

                                {...register('lastname', { required: true })} />
                            <label className={
                                clsx(
                                    "absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-4 z-5 origin-[0] start-2.5 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto",
                                    {
                                        'peer-focus:text-red-600  text-red-500': errors.lastname?.type === 'required'
                                    }
                                )
                            }>Apellido</label>
                        </div>
                        {
                            errors.lastname?.type === 'required' && (
                                <span className="text-red-500 text-xs block" >* El apellido es obligatorio</span>
                            )
                        }
                    </div>

                </div>

                <div className="grid mt-5 grid-cols md:grid-cols-2 gap-2" >
                    <div className="relative mb-4">
                        <div className="relative">
                            <input type="text" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-200 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                disabled
                            />
                            <label className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-5 origin-[0] bg-transparent  px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-4 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Colombia (+57)</label>
                        </div>

                    </div>

                    <div className="relative">
                        <div className="relative">
                            <input
                                type="text"
                                className={clsx(
                                    "block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer",
                                    {
                                        'focus:border-red-600 border-red-500': errors.contactPhone
                                    }
                                )}
                                placeholder=" "
                                {...register('contactPhone', { required: true, pattern: /^\s*([3][0-9]{9})\s*$/ })}

                            />
                            <label className={clsx(
                                "absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-5 origin-[0] start-2.5 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto",
                                {
                                    'peer-focus:text-red-600 text-red-500': errors.contactPhone
                                }
                            )}>Telefono</label>
                        </div>
                        {
                            errors.contactPhone?.type === 'required' && (
                                <span className="text-red-500 text-xs block">* El numero telefonico obligatorio</span>
                            )
                        }

                        {
                            errors.contactPhone?.type === 'pattern' && (
                                <span className="text-red-500 text-xs block">* El numero telefonico debe ser valido</span>
                            )
                        }
                    </div>

                </div>

                <div className="grid mt-5 grid-cols gap-2" >
                    <div className="relative mb-5">
                        <div className="relative">
                            <input type="text" className={
                                clsx(
                                    "block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-200 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer",
                                    {
                                        'focus:border-red-600 border-red-500': errors.email
                                    }
                                )
                            } placeholder=" "
                                {...register('email', { required: true, pattern: /^(?=.{1,254}$)(?:(?:[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*)|(?:"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*"))@(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-zA-Z0-9-]*[a-zA-Z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/ })}
                            />
                            <label className={
                                clsx(
                                    "absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-4 z-5 origin-[0] start-2.5 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto",
                                    {
                                        'peer-focus:text-red-600  text-red-500': errors.email
                                    }
                                )
                            }>E-mail del responsable</label>
                        </div>
                        {
                            errors.email?.type === 'required' && (
                                <span className="text-red-500 text-xs" >* El email es obligatorio</span>
                            )
                        }

                        {
                            errors.email?.type === 'pattern' && (
                                <span className="text-red-500 text-xs block"  >* El email debe ser valido</span>
                            )
                        }
                    </div>

                    <div className="relative mb-4">
                        <div className="relative">
                            <input 
                            type={showPassword ? "text" : "password"}
                             className={
                                clsx(
                                    "block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-200 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer",
                                    {
                                        'focus:border-red-600 border-red-500': errors.password
                                    }
                                )
                            } placeholder=" "
                                {...register('password', { required: true, validate: validatePassword})}
                            />
                            <label className={
                                clsx(
                                    "absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-4 z-5 origin-[0] start-2.5 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto",
                                    {
                                        'peer-focus:text-red-600  text-red-500': errors.password
                                    }
                                )
                            }>Crea una contraseña</label>
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
                                <span className="text-red-500 text-sm" >* La contraseña es obligatoria</span>
                            )
                        }

                        {errors.password?.type === "validate" && (
                            <div className="text-red-500 text-sm">
                                La contraseña debe tener al menos:
                                <ul className="ps-5 mt-2 space-y-1 list-disc list-inside">
                                    {errors.password.message!.toString().split(", ").map((error, index) => (
                                        <li key={index}>{error}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    {
                        showErrorMessage && (
                            <div className="hover:red-yellow-500 flex justify-center items-center gap-2  w-full mb-2 select-none rounded-t-lg border-t-4 border-red-400 bg-red-100 py-3 px-2 font-medium">
                                <p className='text-center' >{errorMessage}</p>
                            </div>
                        )
                    }

                    <button
                        type='submit'
                        disabled={showLoadingRegister}
                        className={
                            clsx(

                                {
                                    "flex items-center gap-x-4 mb-2 w-full mt-2 justify-center rounded-lg bg-red-600 px-3 py-4 text-lg font-bold text-white": !showLoadingRegister,
                                    "flex items-center gap-x-4 mb-2 w-full mt-2 justify-center rounded-lg bg-red-600 px-3 py-4 text-lg font-bold text-white cursor-not-allowed": showLoadingRegister
                                }
                            )
                        }>
                        {
                            showLoadingRegister &&
                            (<svg className="h-5 w-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" ></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>)
                        }

                        {
                            showLoadingRegister
                                ? (
                                    <span>Cargando...</span>
                                ) : (
                                    <span>Registrar Motel</span>
                                )
                        }

                    </button>

                </div>
            </div>

        </form>
    )
}

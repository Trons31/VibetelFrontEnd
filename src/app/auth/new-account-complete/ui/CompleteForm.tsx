'use client';

import { login } from "@/actions";
import clsx from "clsx";
import Link from "next/link";
import { useForm } from "react-hook-form";

type FormInputs = {
    password: string;
}

interface Props {
    name: string;
    email: string,
}

export const CompleteForm = ({ email, name }: Props) => {

    const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>();

    const onSubmit = async (data: FormInputs) => {

        const { password } = data;
        const lastname = "apellido"
      
      

        await login(email.toLowerCase(), password);
        window.location.replace('/home');
    }

    return (

        <div className="flex items-center justify-center min-h-screen p-5 md:p-0 bg-gray-100">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
                <div className="text-center mb-6">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-700">Completar registro</h1>
                </div>

                <div className="mb-6">
                    <div className="relative">
                        <input
                            type="password"
                            autoFocus
                            className={
                                clsx(
                                    "block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-100  border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer",
                                    {
                                        'focus:border-red-600 ': errors.password?.type === 'required'
                                    }
                                )
                            }
                            placeholder=""
                            {...register('password', { required: true, pattern: /^.{6,}$/ })}
                        />
                        <label className={
                            clsx(
                                "absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto",
                                {
                                    'peer-focus:text-red-600 ': errors.password?.type === 'required' || errors.password?.type === 'pattern'
                                }
                            )
                        }>Contraseña</label>
                    </div>
                    {
                        errors.password?.type === 'required' && (
                            <span className="text-red-500" >*Ingrese su contraseña</span>
                        )
                    }
                    {
                        errors.password?.type === 'pattern' && (
                            <span className="text-red-500" >* La contraseña debe tener minimo 6 caracteres</span>
                        )
                    }
                </div>

                <div className="mb-6">
                    <button
                        type="submit"
                        className="w-full px-3 py-4 text-white bg-red-600 rounded-md hover:bg-red-700 text-lg font-bold focus:outline-none"
                    >
                        Crear contraseña
                    </button>
                </div>
            </form>
        </div>


    )
}

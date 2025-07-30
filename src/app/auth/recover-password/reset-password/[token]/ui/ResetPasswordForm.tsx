'use client';
import { login } from "@/actions";
import { ModalInvalidToken } from "@/components";
import axios from "axios";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

interface Props {
    token: string;
}

type user = {
    id?: string | undefined,
    email?: string | undefined
}

type FormInputs = {
    password: string;
}

export const ResetPasswordForm = ({ token }: Props) => {
    const [showLoading, setShowLoading] = useState(false);
    const [user, setUser] = useState<user>();
    const [isLoading, setIsLoading] = useState(true);
    const [codeValidate, setCodeValidate] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>({
        defaultValues: {
            password: ''
        }
    });

    const onDispatch = async (data: FormInputs) => {
        setShowLoading(true);
        const { password } = data;

        try {
            await axios.post(
                `${process.env.NEXT_PUBLIC_API_ROUTE}user/reset-password`, { token: token, password: data.password }
            );
            setShowLoading(false);
            await login(user!.email!.toLowerCase(), password);
            window.location.replace('/home');
        } catch (error) {
            toast.error('No se pudo actualizar la contraseña');
        } finally {
            setShowLoading(false);
        }
    };

    useEffect(() => {
        async function fetchToken() {
            try {
                const response = await axios.get<user>(
                    `${process.env.NEXT_PUBLIC_API_ROUTE}user/validate-token/${token}`
                );
                setCodeValidate(true);
                setUser(response.data);
            } catch (error: any) {
                console.log(error)
                setCodeValidate(true);
            }
            setIsLoading(false);
        }
        fetchToken();
    }, [])

    return (
        <>

            <Toaster
                position="top-right"
                reverseOrder={false}
            />

            {
                isLoading
                    ? (
                        <>
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
                        </>
                    ) : (
                        codeValidate
                            ? (
                                <form onSubmit={handleSubmit(onDispatch)} className={
                                    clsx(
                                        "flex items-center mt-10 md:mt-10  bg-white ",
                                    )
                                }>
                                    <div className="container mx-auto">
                                        <div className="max-w-md mx-auto ">
                                            <div className="text-center m-4 mb-4">
                                                <h1 className="text-xl md:text-3xl font-bold text-gray-700 ">Actualiza tu contraseña</h1>
                                                <p className="text-xs md:text-sm mt-1 text-gray-600" >{user?.email} restablece tu contraseña</p>
                                            </div>
                                            <div className="m-7">
                                                <div className="relative">
                                                    <input type="password" autoFocus className={
                                                        clsx(
                                                            "block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-100  border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer",
                                                            {
                                                                'focus:border-red-600 ': errors.password
                                                            }
                                                        )
                                                    } placeholder=" "
                                                        {...register('password', { required: true, pattern: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{6,}$/ })}
                                                    />
                                                    <label className={
                                                        clsx(
                                                            "absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto",
                                                            {
                                                                'peer-focus:text-red-600 text-red-500': errors.password
                                                            }
                                                        )
                                                    }>Nueva contraseña</label>
                                                </div>

                                                {
                                                    errors.password?.type === 'required' && (
                                                        <span className="text-red-500 text-sm" >* Ingrese su nueva contraseña</span>
                                                    )
                                                }

                                                {
                                                    errors.password?.type === 'pattern' && (
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
                                                                        <span>Confirmar</span>
                                                                    )
                                                            }

                                                        </button>

                                                    </div>

                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </form>
                            ) : (
                                <ModalInvalidToken
                                    linkToRedirect="/auth/login/email"
                                />
                            )
                    )
            }
        </>
    )
}

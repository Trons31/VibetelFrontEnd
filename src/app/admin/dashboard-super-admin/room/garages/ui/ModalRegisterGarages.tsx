"use client";

import { AmenitiesMotelInfoApi, GarageRoomApi } from '@/interfaces';
import { sleep } from '@/utils';
import axios from 'axios';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface FormInputs {
    title: string;
}

interface Props {
    garage?: GarageRoomApi;
    accessToken: string;
    mode: "create" | "update";
    isOpen: boolean;
    onClose: () => void;
}

export const ModalRegisterGarages = ({ garage, accessToken, mode, isOpen, onClose }: Props) => {
    const [isLoading, setIsLoading] = useState(false);

    const {
        handleSubmit,
        register,
        formState: { isValid, errors },
        reset
    } = useForm<FormInputs>({
        defaultValues: {
            title: garage?.title ?? "",
        }
    });

    // Cuando cambie la amenitie, reseteamos los valores
    useEffect(() => {
        reset({
            title: garage?.title ?? ""
        });
    }, [garage, reset]);

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


    const onSubmit = async (data: FormInputs) => {
        setIsLoading(true);
        try {
            if (mode === "create") {
                await axios.post(
                    `${process.env.NEXT_PUBLIC_API_ROUTE}room/garage`, data,
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                );
                toast.success("Garaje registrado correctamente!");
            } else {
                await axios.patch(
                    `${process.env.NEXT_PUBLIC_API_ROUTE}room/garage/${garage?.id}`, data,
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                );
                toast.success("Garaje actualizado correctamente!");
            }
            setIsLoading(false);
            onClose();
            sleep(2);
            window.location.reload();
        } catch (error: any) {
            toast.error("No se pudo guardar el garaje");
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 overflow-y-hidden flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <div className="bg-white md:rounded-lg shadow-lg w-full md:w-1/2 lg:w-1/2 p-6 max-h-full overflow-y-auto">
                <h2 className="text-xl font-semibold mb-4">
                    {mode === "create" ? "Registrar garaje" : "Actualizar garaje"}
                </h2>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid px-2 grid-cols-1 mt-5 sm:px-0 gap-6">
                        <div>
                            <label className={clsx(
                                "block mb-2 text-sm text-black font-semibold ",
                                { "text-red-500": errors.title }
                            )}>Nombre</label>
                            <input
                                type="text"
                                className={clsx(
                                    "bg-gray-300 border-2 border-gray-300 text-black text-sm rounded-lg appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 block w-full p-2.5 placeholder-black",
                                    { 'border-red-500': errors.title }
                                )}
                                {...register('title', { required: true })}
                                placeholder="Suit"
                            />
                            {errors.title && (
                                <span className="text-red-500 text-sm">* El nombre es obligatorio</span>
                            )}
                        </div>
                    </div>

                    <div className="flex gap-3 justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="mt-4 text-xs md:text-base bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                        >
                            Cerrar
                        </button>
                        <button
                            className={clsx(
                                "mt-4 px-4 py-2 rounded text-xs md:text-base text-white",
                                isLoading
                                    ? "bg-blue-400 cursor-not-allowed"
                                    : "bg-blue-600 hover:bg-blue-700"
                            )}
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? "Cargando..." : (mode === "create" ? "Registrar" : "Actualizar")}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

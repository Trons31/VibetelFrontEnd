'use client';

import { useState } from "react";
import { BreadCrumb, SelectOption } from "@/components";
import { motelConfig } from "@/interfaces";
import clsx from "clsx";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const optionsTimeLimitAwait = [
    { label: '10 minutos', value: 10 },
    { label: '15 minutos', value: 15 },
    { label: '20 minutos', value: 20 },
    { label: '25 minutos', value: 25 },
    { label: '30 minutos', value: 30 },
    { label: '35 minutos', value: 35 },
    { label: '40 minutos', value: 40 },
    { label: '45 minutos', value: 45 },
    { label: '50 minutos', value: 50 },
];

const optionsTimeCleanRoom = [
    { label: '10 minutos', value: 10 },
    { label: '15 minutos', value: 15 },
    { label: '20 minutos', value: 20 },
    { label: '25 minutos', value: 25 },
    { label: '30 minutos', value: 30 },
    { label: '35 minutos', value: 35 },
    { label: '40 minutos', value: 40 },
    { label: '45 minutos', value: 45 },
    { label: '50 minutos', value: 50 },
    { label: '60 minutos', value: 60 },
    { label: '1 hora 30 minutos', value: 90 },
];

const optionsTimeAddReservation = [
    { label: '30 minutos', value: 30 },
    { label: '1 hora', value: 60 },
    { label: '1 hora 30 minutos', value: 90 },
    { label: '2 horas', value: 120 }
];

interface Props {
    motelConfig: motelConfig | null;
    accessToken: string;
}

export const AdditionalSettingsForm = ({ motelConfig, accessToken }: Props) => {

    const [isLoading, setIsLoading] = useState(false);
    const [optionTimeLimitAwait, setoptionTimeLimitAwait] = useState(motelConfig?.timeAwaitTakeReservation || 10);
    const [optionTimeCleanRoom, setoptionTimeCleanRoom] = useState(motelConfig?.timeMinutesCleanRoom || 10);
    const [optionTimeAddReservation, setoptionTimeAddReservation] = useState(motelConfig?.defaultReservationAddTime || 30)

    const onCreateSettingsMotel = async () => {
        setIsLoading(true);

        const motelConfigData = {
            timeMinutesCleanRoom: optionTimeCleanRoom,
            defaultReservationAddTime: optionTimeAddReservation,
            inService: true,
            outOfServiceStart: null,
            outOfServiceEnd: null,
            locationLatitude: 9.2923331,
            locationLongitude: -75.4131098,
            timeAwaitTakeReservation: optionTimeLimitAwait
        };
        if (motelConfig) {
            try {
                await axios.patch(
                    `${process.env.NEXT_PUBLIC_API_ROUTE}motel/config`, motelConfigData,
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                );
                toast.success("Informacion actualizada correctamente!")
                setIsLoading(false);
            } catch (error: any) {
                toast.error("No se pudo guardar la informacion");
                setIsLoading(false);
            }
        } else {
            try {
                await axios.post(
                    `${process.env.NEXT_PUBLIC_API_ROUTE}motel/config`, motelConfigData,
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                );
                toast.success("Informacion guardada correctamente!")
                setIsLoading(false);
            } catch (error: any) {
                toast.error("No se pudo guardar la informacion");
                setIsLoading(false);
            }
        }



    }

    const handleOptionSelect = (option: { label: string; value: number }) => {
        setoptionTimeLimitAwait(option.value);
    };

    const handleOptionTimeCleanRoomSelect = (option: { label: string; value: number }) => {
        setoptionTimeCleanRoom(option.value);
    };

    const handleOptionTimeAddReservation = (option: { label: string; value: number }) => {
        setoptionTimeAddReservation(option.value);
    };

    return (
        <>

            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            <div className="grid border-b py-6 sm:grid-cols-3">
                <div className="col-span-2">
                    <h2 className="text-md md:text-lg font-bold">Tiempo de espera límite</h2>
                    <p className="text-xs md:text-sm text-gray-800">
                        El tiempo de espera límite es el período máximo que el motel esperará a un usuario después del inicio de su reserva. Por ejemplo, si un usuario hizo una reserva para el día X del mes X a las 3pm, el motel establecerá un tiempo prudente para esperar al usuario en caso de que no llegue a la hora prevista. Este tiempo debe ser suficiente para atraer a los usuarios, pero no tan largo que represente una pérdida para el motel.
                    </p>


                </div>
                <div className="flex justify-end mt-14">
                    <SelectOption
                        options={optionsTimeLimitAwait}
                        onOptionSelect={handleOptionSelect}
                        defaultOption={optionsTimeLimitAwait.find(option => option.value === optionTimeLimitAwait)}
                        className="w-32"
                    />
                </div>
            </div>

            <div className="grid border-b py-6 sm:grid-cols-3">
                <div className="col-span-2">
                    <h2 className="text-md md:text-lg font-bold">Tiempo de limpieza de una habitación</h2>
                    <p className="text-xs md:text-sm text-gray-800">
                        El tiempo de limpieza promedio es crucial para asegurar que las habitaciones estén listas para los próximos usuarios. Este tiempo debe ser prudente y suficiente para garantizar una limpieza adecuada después de cada servicio. Establecer este tiempo permite evitar reservas antes de que una habitación haya sido limpiada, asegurando así la satisfacción y seguridad de los futuros huéspedes.
                    </p>

                </div>
                <div className="flex justify-end mt-12">
                    <SelectOption
                        options={optionsTimeCleanRoom}
                        onOptionSelect={handleOptionTimeCleanRoomSelect}
                        defaultOption={optionsTimeCleanRoom.find(option => option.value === optionTimeCleanRoom)}
                        className="w-32"
                    />
                </div>

            </div>

            <div className="grid border-b py-6 sm:grid-cols-3">
                <div className="col-span-2">
                    <h2 className="text-md md:text-lg font-bold">Tiempo de Adición Estándar</h2>
                    <p className="text-xs md:text-sm text-gray-800">
                        El <strong>tiempo de adición estándar</strong>  es el intervalo de tiempo que el motel define para todas las habitaciones de manera uniforme. Este tiempo permite que los usuarios agreguen minutos adicionales a sus reservas actuales de manera incremental. Por ejemplo, si se define un tiempo de adición de 30 minutos, el usuario podrá extender su reserva en incrementos de 30 minutos cada vez. De igual forma, si el tiempo de adición es de una hora, el usuario podrá agregar tiempo en intervalos de una hora. El valor de esta adición se establece al momento de registrar cada habitación.
                    </p>
                </div>

                <div className="flex justify-end mt-12">
                    <SelectOption
                        options={optionsTimeAddReservation}
                        onOptionSelect={handleOptionTimeAddReservation}
                        defaultOption={optionsTimeAddReservation.find(option => option.value === optionTimeAddReservation)}
                        className="w-32"
                    />
                </div>

            </div>

            <div className="block md:grid md:grid-cols-3  mt-5  items-center pb-5 gap-5" >
                <div className="border-l-8 col-span-2 rounded-l-lg  border-l-purple-600 bg-purple-100 p-4">
                    <p className="text-xs md:text-sm font-extralight" >
                        Para finalizar el proceso de ajustes adicionales, haga clic en el botón guardar o actualizar. Siempre tendrá la opción de modificarlos según sea necesario.
                    </p>
                </div>

                <div className="col-span-1 mt-2 flex justify-start md:justify-end" >
                    <button
                        type='submit'
                        disabled={isLoading}
                        onClick={onCreateSettingsMotel}
                        className={
                            clsx(

                                {
                                    "flex items-center justify-center w-full h-fit gap-x-4 bg-blue-600 md:w-fit text-sm md:text-lg hover:bg-blue-700 transition-all duration-200 px-6 py-2 rounded-md text-white ": !isLoading,
                                    "flex items-center justify-center h-fit gap-x-4 bg-blue-600 w-fit text-sm md:text-lg px-6 py-2 rounded-md text-white  cursor-not-allowed": isLoading
                                }
                            )
                        }>
                        {
                            isLoading &&
                            (<svg className="h-5 w-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" ></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>)
                        }

                        {
                            isLoading
                                ? (
                                    <span>Cargando...</span>
                                ) : (
                                    motelConfig !== null
                                        ? (
                                            <span>Actualizar</span>
                                        ) : (
                                            <span>Guardar</span>
                                        )
                                )
                        }

                    </button>
                </div>
            </div>
        </>
    )
}

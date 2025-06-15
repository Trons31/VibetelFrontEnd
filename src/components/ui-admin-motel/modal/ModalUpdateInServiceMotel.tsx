'use client';
import { useEffect, useState } from "react";
import clsx from "clsx";
import toast, { Toaster } from "react-hot-toast";
import { IoIosCloseCircle } from "react-icons/io";
import { updateInServiceMotel } from "@/actions";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { es } from "date-fns/locale";
import { format } from "date-fns";
import { IoToday } from "react-icons/io5";
import { sleep } from "@/utils";
import { motelConfig } from "@/interfaces";

registerLocale("es", es);

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    motelId: string;
    motelConfig: motelConfig | undefined;
}

export const ModalUpdateInServiceMotel = ({ isOpen, onClose, motelConfig, motelId }: ModalProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [startDate, setStartDate] = useState<Date | null>(motelConfig?.outOfServiceStart ? motelConfig.outOfServiceStart : new Date());
    const [endDate, setEndDate] = useState<Date | null>(motelConfig?.outOfServiceEnd ? motelConfig.outOfServiceEnd : null);

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

    const OnUpdateInServiceMotel = async () => {
        if (!startDate || !endDate) {
            toast.error("Por favor seleccione un rango de fechas válido.");
            return;
        }

        setIsLoading(true);
        const response = await updateInServiceMotel(motelId, false, startDate, endDate);
        setIsLoading(false);

        if (response.ok) {
            toast.success("Periodo de inactividad actualizado correctamente.");
            await sleep(1);
            window.location.reload();
        } else {
            toast.error("Hubo un error al actualizar el periodo de inactividad.");
        }
    };

    return (
        <>
            <Toaster position="top-right" reverseOrder={false} />

            <div className="fixed fade-in inset-0 z-50 overflow-y-hidden md:p-5 py-5 px-0 w-full flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm" onClick={handleBackdropClick}>
                <div className="bg-white md:rounded-lg shadow-lg w-full md:w-5/12 max-h-full overflow-y-auto custom-scrollbar">
                    {/* Header */}
                    <div className="py-3 px-4 shadow-md flex justify-between items-center border-b border-gray-200">
                        <p className="text-lg font-semibold">Definir periodo de inactividad</p>
                        <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-md">
                            <IoIosCloseCircle className="h-5 w-5 text-gray-500" />
                        </button>
                    </div>

                    {/* Body */}

                    <div className="px-6 py-4 mt-4 flex justify-between w-full">
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-700">Fecha de inicio</label>
                            <DatePicker
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                minDate={new Date()}
                                locale="es"
                                dateFormat="dd, MMMM yyyy"
                                className="border border-gray-300 rounded-md px-3 py-2 flex w-full"
                            />
                        </div>

                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-700">Fecha de fin</label>
                            <DatePicker
                                selected={endDate}
                                onChange={(date) => setEndDate(date)}
                                minDate={startDate || new Date()}
                                locale="es"
                                dateFormat="dd, MMMM yyyy"
                                className="border border-gray-300 rounded-md px-3 py-2 w-full"
                            />
                        </div>
                    </div>

                    <div className="px-6  " >
                        <div className="bg-gray-200 p-2 rounded-lg" >
                            <p className="text-sm text-black font-extralight">
                                Es importante definir si el motel está en servicio o fuera de servicio. Si el motel está fuera de servicio, se debe establecer un tiempo durante el cual las reservas no estarán disponibles. Esto garantiza que los usuarios no puedan hacer reservas durante períodos de mantenimiento o inactividad, manteniendo así la funcionalidad y confiabilidad de la plataforma.
                            </p>
                        </div>
                    </div>

                    <div className="px-6">
                        <div className="relative items-center w-full py-3 mx-auto">
                            <div className="p-4 border-l-4 border-red-500 -6 rounded-r-xl bg-red-100">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <IoToday className='h-5 w-5 text-red-600' />
                                    </div>
                                    <div className="ml-3">
                                        <div className="text-sm text-red-600">
                                            <p>
                                                Es importante que la fecha de fin del servicio sea exacta para permitir a los usuarios realizar reservas después del tiempo fuera de servicio.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex p-2 justify-end gap-2 mt-3 md:gap-0 sm:flex-row sm:space-x-3 sm:space-y-0">
                        <div className='relative'>
                            {
                                isLoading && (
                                    <div className="absolute bg-white bg-opacity-60 z-10 h-full w-full flex items-center justify-center">
                                        <div className="flex items-center"></div>
                                    </div>
                                )}
                            <button
                                onClick={onClose}
                                className="whitespace-nowrap rounded-md bg-gray-200 px-4 py-3 font-medium">Cancelar</button>
                        </div>
                        <button
                            onClick={OnUpdateInServiceMotel}
                            disabled={isLoading}
                            className={clsx({
                                "flex items-center gap-x-4 mb-2 w-fit justify-center rounded-lg bg-red-600 px-3 py-2 hover:bg-red-700 text-lg font-bold text-white": !isLoading,
                                "flex items-center gap-x-4 mb-2 w-fit justify-center rounded-lg bg-red-600 px-3 py-2 text-lg font-bold text-white cursor-not-allowed": isLoading
                            })}>
                            {
                                isLoading && (
                                    <svg className="h-5 w-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                )}
                            {
                                isLoading
                                    ? <span>Cargando...</span>
                                    : <span>Confirmar</span>}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

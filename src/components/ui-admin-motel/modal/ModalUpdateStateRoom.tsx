"use client";

import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import clsx from "clsx";
import { RoomManagerProps, statusRoom } from "@/interfaces";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const ModalUpdateStateRoom = ({
    isOpen,
    onClose,
}: ModalProps) => {

    
    const [isLoading, setIsLoading] = useState(false);
    const [selectedState, setSelectedState] = useState<statusRoom>();

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleUpdateStatus = async () => {
        setIsLoading(true);
        try {


        } catch (error) {
            setIsLoading(false);
            console.error("Error en la solicitud:", error);
            toast.error("Ocurrió un error al actualizar el estado.");
        }
    };

    return (
        <>
            <Toaster position="top-right" reverseOrder={false} />
            <div
                className="fixed inset-0 z-50 flex items-center justify-center py-3 bg-black bg-opacity-50 backdrop-blur-sm"
                onClick={handleBackdropClick}
            >
                <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 max-h-full overflow-y-auto custom-scrollbar">
                    <h2 className="text-lg font-semibold mb-4 ml-2">Actualizar habitacion</h2>

                    <div className="space-y-4">
                        {[
                            {
                                id: "radio_1",
                                value: "AVAILABLE",
                                label: "Disponible",
                                description:
                                    "Al seleccionar Disponible, la habitación estará lista para nuevas reservas y servicios",
                                borderColor: "border-blue-500",
                                bgColor: "bg-blue-100",
                            },
                            {
                                id: "radio_3",
                                value: "CLEANING",
                                label: "En limpieza",
                                description:
                                    "Al actualizar a En limpieza, la habitación no podrá entrar en servicio hasta que esté lista nuevamente",
                                borderColor: "border-yellow-500",
                                bgColor: "bg-yellow-100",
                            },
                            {
                                id: "radio_4",
                                value: "DISABLED",
                                label: "Desactivar habitacion",
                                description:
                                    "Al desactivar la habitación, los usuarios no podrán realizar reservas",
                                borderColor: "border-black",
                                bgColor: "bg-gray-300",
                            }
                        ].map((option) => (
                            <div key={option.id} className="relative">
                                <input
                                    className="peer hidden"
                                    id={option.id}
                                    type="radio"
                                    name="radio"
                                    value={option.value}
                                />
                                <label
                                    htmlFor={option.id}
                                    className={clsx(
                                        "flex cursor-pointer flex-col rounded-2xl border p-4 pr-8 sm:pr-16",
                                        selectedState === option.value
                                            ? `${option.borderColor} ${option.bgColor}`
                                            : "border-gray-300 bg-slate-100/80"
                                    )}
                                >
                                    <span className="mb-1 text-lg font-semibold">{option.label}</span>
                                    <p className="text-xs">{option.description}</p>
                                </label>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-end gap-2 mt-6">
                        <button
                            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                            onClick={onClose}
                        >
                            Cerrar
                        </button>
                        <button
                            type='submit'
                            disabled={isLoading}
                            onClick={handleUpdateStatus}
                            className={
                                clsx(

                                    {
                                        "flex items-center h-fit gap-x-4 bg-blue-600 w-fit text-lg hover:bg-blue-700 transition-all duration-200 px-6 py-2 rounded-md text-white ": !isLoading,
                                        "flex items-center h-fit gap-x-4 bg-blue-600 w-fit text-lg px-6 py-2 rounded-md text-white  cursor-not-allowed": isLoading
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
                                        "Actualizar"
                                    )
                            }

                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

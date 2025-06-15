"use client";

import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import clsx from "clsx";

import { updateStatusMotel } from "@/actions";
import { isApprovedStatus } from "@/interfaces";
import axios from "axios";

interface ModalProps {
    isOpen: boolean;
    mail: string;
    motelId: string;
    motel: string;
    currentState: isApprovedStatus;
    onClose: () => void;
}

export const ModalStatusMotel = ({
    currentState,
    mail,
    motelId,
    motel,
    isOpen,
    onClose,
}: ModalProps) => {

    const [isLoading, setIsLoading] = useState(false);
    const [selectedState, setSelectedState] = useState<isApprovedStatus>(currentState);
    const [messageDataCorrection, setMessageDataCorrection] = useState("");

    useEffect(() => {
        setSelectedState(currentState);
    }, [currentState]);

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
        if (selectedState === "DATA_CORRECTION" && messageDataCorrection === "") {
            toast.error("Ups! no puedes dejar el campo vacio");
            setIsLoading(false);
            return;
        }
        try {
            const response = await updateStatusMotel(motelId, selectedState);
            if (!response.ok) {
                toast.error("Ups! No se pudo actualizar el estado.");
                setIsLoading(false);
                return;
            }

            if (selectedState === "DATA_CORRECTION") {
                const message = messageDataCorrection;
                await axios.post('/api/mailer/motel/dataCorrectionMotel', { mail, message });
            }

            if (selectedState === "APPROVED") {
                await axios.post('/api/mailer/motel/approvedMotel', { mail });
            }

            if (selectedState === "DISABLED") {
                await axios.post('/api/mailer/motel/disabledMotel', { mail });
            }

            toast.success("Estado actualizado correctamente.");
            setIsLoading(false);
            window.location.replace("/admin/dashboard-super-admin/motel");

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
                    <h2 className="text-lg font-semibold mb-4 ml-2">Actualizar Estado del Motel <span className="capitalize" >{motel}</span></h2>

                    <div className="space-y-4">
                        {[
                            {
                                id: "radio_1",
                                value: "PENDING",
                                label: "En espera",
                                description:
                                    "El motel está en revisión. Por favor, actualice cuando haya validado todos los datos.",
                                borderColor: "border-blue-500",
                                bgColor: "bg-blue-100",
                            },
                            {
                                id: "radio_2",
                                value: "APPROVED",
                                label: "Aprobado",
                                description:
                                    "Todos los datos han sido validados correctamente y el motel puede entrar en funcionamiento.",
                                borderColor: "border-green-500",
                                bgColor: "bg-green-100",
                            },
                            {
                                id: "radio_3",
                                value: "DATA_CORRECTION",
                                label: "Corrección de datos",
                                description:
                                    "Los datos han sido validados, pero se encontró un error. Se notificará al motel para que corrija la información.",
                                borderColor: "border-yellow-500",
                                bgColor: "bg-yellow-100",
                            },
                            {
                                id: "radio_4",
                                value: "DISABLED",
                                label: "Desactivar motel",
                                description:
                                    "El motel ha incumplido las políticas de nuestra empresa y será desactivado. No podrá operar en la plataforma hasta nueva revisión.",
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
                                    checked={selectedState === option.value}
                                    onChange={() => setSelectedState(option.value as isApprovedStatus)}
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

                    {
                        selectedState === "DATA_CORRECTION" && (
                            <div className="mt-5">
                                <label className="block mb-1 ml-1 text-xs font-medium text-gray-900">
                                    Datos que deben ser corregidos por el administrador del motel
                                </label>
                                <textarea
                                    id="corrections"
                                    rows={5}
                                    onChange={(e) => setMessageDataCorrection(e.target.value)}
                                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
                                    placeholder="Describe aquí los datos que deben corregirse, como información errónea o desactualizada..."
                                ></textarea>
                            </div>

                        )
                    }

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

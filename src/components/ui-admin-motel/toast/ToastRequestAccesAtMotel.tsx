"use client";

import toast, { Toaster } from "react-hot-toast";
import React, { useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import { MdSecurity } from "react-icons/md";
import { useReservationStore } from "@/store/reservation/adminWebsocket.store";

interface RequestAcces {
    id: string;
    room: string;
    roomNumber: string;
    arrivalDate: Date;
}

interface Props {
    accessToken: string;
}

export const ToastRequestAccesAtMotel = ({ accessToken }: Props) => {

    const { socket } = useReservationStore();

    const ConfirmAccessMotel = async (id: string, toastId: string) => {
        try {
            await axios.patch(
                `${process.env.NEXT_PUBLIC_API_ROUTE}service/reservation/${id}/confirm-access`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            toast.dismiss(toastId);
            toast.success("Acceso confirmado");

        } catch (error: any) {
            console.log(error);
            toast.error("Ups no se permitio confirmar el acceso");
        }
    }


    useEffect(() => {
        const fetchAllRequests = async () => {
            try {
                const { data } = await axios.get<RequestAcces[]>(
                    `${process.env.NEXT_PUBLIC_API_ROUTE}service/motel-request-access`,
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                );

                if (!data || data.length === 0) return;
                data.forEach((req) => {
                    toast.custom((t) => (
                        <div
                            className={`${t.visible ? "animate-enter" : "animate-leave"
                                } w-96 max-w-full bg-white shadow-lg border-l-4 border-red-500 rounded-lg pointer-events-auto flex flex-col p-4 mb-4`}
                        >
                            <div className="flex justify-end gap-2" >
                                <p className="font-light text-xs" >Reserva verificada</p>
                                <MdSecurity />
                            </div>
                            <div className="flex justify-between items-start">
                                <div className="flex flex-col gap-1">
                                    <strong className="text-lg text-gray-800">Solicitud de acceso</strong>
                                    <span className="text-sm text-gray-600">
                                        Habitación: <strong>{req.room}</strong> Nro°  {req.roomNumber}
                                    </span>
                                    <span className="text-sm text-gray-600">
                                        Hora de entrada:{" "}
                                        <strong>{format(new Date(req.arrivalDate), "hh:mm a")}</strong>
                                    </span>
                                </div>
                            </div>
                            <div className="mt-3">
                                <button
                                    onClick={() => {
                                        ConfirmAccessMotel(req.id, t.id);
                                    }}
                                    className="px-4 py-2 text-sm font-semibold bg-red-500 text-white rounded hover:bg-red-600 transition"
                                >
                                    Confirmar acceso
                                </button>
                            </div>
                        </div>
                    ), {
                        position: "bottom-right",
                        duration: Infinity,
                        id: req.id,
                    });
                });
            } catch (error: any) {
                console.error("Error obteniendo solicitudes de acceso:", error);
            }
        };

        if (socket) {
            socket.on('accessRequest', (data: RequestAcces) => {
                toast.custom((t) => (
                    <div
                        className={`${t.visible ? "animate-enter" : "animate-leave"
                            } w-96 max-w-full bg-white shadow-lg border-l-4 border-red-500 rounded-lg pointer-events-auto flex flex-col p-4 mb-4`}
                    >
                        <div className="flex justify-end gap-2" >
                            <p className="font-light text-xs" >Reserva verificada</p>
                            <MdSecurity />
                        </div>
                        <div className="flex justify-between items-start">
                            <div className="flex flex-col gap-1">
                                <strong className="text-lg text-gray-800">Solicitud de acceso</strong>
                                <span className="text-sm text-gray-600">
                                    Habitación: <strong>{data.room}</strong> Nro°  {data.roomNumber}
                                </span>
                                <span className="text-sm text-gray-600">
                                    Hora de entrada:{" "}
                                    <strong>{format(new Date(data.arrivalDate), "hh:mm a")}</strong>
                                </span>
                            </div>
                        </div>
                        <div className="mt-3">
                            <button
                                onClick={() => {
                                    ConfirmAccessMotel(data.id, t.id);
                                }}
                                className="px-4 py-2 text-sm font-semibold bg-red-500 text-white rounded hover:bg-red-600 transition"
                            >
                                Confirmar acceso
                            </button>
                        </div>
                    </div>
                ), {
                    position: "bottom-right",
                    duration: Infinity,
                    id: data.id,
                });
            });

            return () => {
                socket.off('accessRequest');
            };
        }

        fetchAllRequests();
    }, [accessToken, socket]);

    return null;
};

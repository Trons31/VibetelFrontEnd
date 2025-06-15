'use server';

import { cookies } from "next/headers";
import { emitPusherEvent } from "@/lib";
import prisma from "@/lib/prisma";
import { v4 as uuidv4 } from 'uuid';



export const addTimeReservation = async (addTimeReservation: number, newDepartureDate: Date, reservationItemId: string, roomId: string) => {

    try {
        const transaction = await prisma.$transaction(async (prisma) => {
            // Obtiene el precio adicional por 10 minutos de la habitación
            const room = await prisma.room.findFirst({
                where: {
                    id: roomId,
                },
                select: {
                    priceAddTime: true,
                },
            });

            if (!room) {
                throw new Error("Room not found");
            }

            // Calcula el total basado en el tiempo adicional seleccionado
            const increments = addTimeReservation / 10;
            const totalAdditionalCost = increments * room.priceAddTime;

            const transactionId = uuidv4();
            // Registra el tiempo adicional y actualiza la fecha de salida
            const reservationAddTime = await prisma.serviceAddTime.create({
                data: {
                    addTimeReservation: addTimeReservation,
                    newDepartureDate: newDepartureDate,
                    total: totalAdditionalCost,
                    transactionId: transactionId,
                    serviceItemId: reservationItemId,
                },
                include: {
                    serviceItem: {
                        select: {
                            service: {
                                select: {
                                    id: true,
                                }
                            }
                        }
                    }
                }
            });

            // // Obtiene la reserva actual con las adiciones de tiempo para calcular el total y la última fecha de salida
            // const currentReservation = await prisma.serviceItem.findUnique({
            //     where: { id: reservationItemId },
            //     select: {
            //         serviceAddTime: {
            //             orderBy: { createdAt: 'desc' },
            //             select: {
            //                 newDepartureDate: true,
            //                 addTimeReservation: true,
            //                 createdAt: true,
            //             }
            //         },
            //         id: true,
            //         departureDate: true,
            //     },
            // });

            // if (!currentReservation) {
            //     throw new Error("Reservation not found");
            // }

            // // Calcula el total de tiempo adicionado
            // const totalAddTime = currentReservation.serviceAddTime.reduce((total, addTime) => total + addTime.addTimeReservation, 0);

            // // Usa la última fecha de salida registrada
            // const latestDepartureDate = currentReservation.serviceAddTime.length > 0
            //     ? currentReservation.serviceAddTime[0].newDepartureDate
            //     : currentReservation.departureDate;

            // // Emitir el evento Pusher con el total de tiempo adicionado y la nueva hora de salida
            // const reservationUpdate = {
            //     id: currentReservation.id,
            //     totalAddTime,
            //     departureDate: latestDepartureDate,
            //     createdAtAddTime: currentReservation.serviceAddTime.length > 0
            //         ? currentReservation.serviceAddTime[0].createdAt
            //         : null,
            // };

            // await emitPusherEvent('rooms', 'add-time-room', reservationUpdate);

            return {
                ok: true,
                data: {
                    transactionId: reservationAddTime.transactionId ?? "",
                    total: reservationAddTime.total,
                    reservationId: reservationAddTime.serviceItem.service.id
                },
            };
        });

        const cookieStore = cookies(); // Obtener el store de cookies
        cookieStore.set('transactionIdAddTimeReservation', transaction.data.transactionId || "", {
            httpOnly: true,                        // Cookie no accesible desde JS
            secure: true,                          // Solo enviada a través de HTTPS
            sameSite: 'strict',                    // Evitar ataques CSRF
            path: '/',                             // Disponible en todo el sitio
            maxAge: 900                          // Duración: 15 minutos
        });

        return transaction;
    } catch (error) {
        return {
            ok: false,
            data: {
                transactionId: "",
                total: 0,
                reservationId: ""
            },
        }
    }

};

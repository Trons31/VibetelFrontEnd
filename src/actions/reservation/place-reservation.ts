'use server';
import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";
import { v4 as uuidv4 } from 'uuid';

import { generateAccessCodeReservation } from "@/utils";
import { cookies } from "next/headers";

interface ReservationProps {
    roomId: string;
    arrivalDate: Date;
    departureDate: Date;
    mail?: string;
    phoneNumner?: string;
}

export const placeReservation = async (reservation: ReservationProps) => {
    const session = await auth();


    let userId: string | undefined;
    if (session?.user.roles.includes("user")) {
        userId = session.user.id;
    }

    // Obtener la información de la habitación
    const room = await prisma.room.findUnique({
        where: {
            id: reservation.roomId
        }
    });

    if (!room) throw new Error(`${reservation.roomId} no existe - 500`);

    // Calcular subtotal y total

    const subTotal = room.promoPrice ? room.promoPrice : room.price;
    const total = room.promoPrice ? room.promoPrice : room.price;

    const transactionId = uuidv4();

    try {
        const prismaTx = await prisma.$transaction(async (tx) => {
            // Crear reserva
            const executedReservation = await tx.service.create({
                data: {
                    userId: userId,
                    subTotal: subTotal,
                    total: total,
                    transactionId: transactionId, //Por ahora el uuId
                    mail: reservation.mail ? reservation.mail : null,
                    phoneNumber: reservation.phoneNumner ? reservation.phoneNumner : null,
                    type: "reservation",
                    ServiceItem: {
                        create: {
                            title: room.title,
                            price: room.price,
                            roomNumber: room.roomNumber,
                            timeLimit: room.timeLimit,
                            arrivalDate: reservation.arrivalDate,
                            departureDate: reservation.departureDate,
                            accessCode: generateAccessCodeReservation(),
                            roomId: room.id
                        }
                    }
                },

            });

            console.log(executedReservation);

            return {
                reservation: executedReservation.id,
                transactionId: executedReservation.transactionId,
                total: executedReservation.total
            };
        }, { timeout: 20000 });

        const cookieStore = cookies(); // Obtener el store de cookies

        cookieStore.set('transactionIdReservation', prismaTx.transactionId || "", {
            httpOnly: true,                        // Cookie no accesible desde JS
            secure: true,                          // Solo enviada a través de HTTPS
            sameSite: 'strict',                    // Evitar ataques CSRF
            path: '/',                             // Disponible en todo el sitio
            maxAge: 900                          // Duración: 15 minutos
        });

        return {
            ok: true,
            reservation: prismaTx.reservation,
            transactionId: prismaTx.transactionId || "",
            total: prismaTx.total,
            message: "Reserva realizada con éxito"
        };

    } catch (error) {
        console.error("Error al crear la reserva:", error);
        return {
            ok: false,
            reservation: "",
            transactionId: "",
            total: 0,
            message: "No se pudo reservar"
        };
    }


};

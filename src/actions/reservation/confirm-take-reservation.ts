'use server';
import { emitPusherEvent } from "@/lib";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";




export const confirmTakeReservation = async (idReservation: string) => {

    try {
        const reservation = await prisma.serviceItem.update({
            where: {
                id: idReservation,
                service: {
                    type: "reservation",
                    paymentStatus: 'ACCEPTED'
                }
            },
            data: {
                serviceTaken: true,
                dateTaken: new Date(),
                status: "iniciado",
                room: {
                    update: {
                        data: {
                            inAvailable: false,
                            status: "IN_SERVICE",
                        }
                    }
                }

            },
            select: {
                id: true,
                accessCode: true,
                status: true,
                title: true,
                roomNumber: true,
                departureDate: true,
                dateTaken: true,
                room: {
                    select: {
                        id: true,
                        inAvailable: true,
                    }
                },
                service: {
                    select: {
                        id: true,
                    }
                }

            }
        })


        const addRoomInService = {
            id: reservation.id,
            title: reservation.title,
            roomNumber: reservation.roomNumber,
            dateTaken: reservation.dateTaken,
            departureDate: reservation.departureDate,
        }

        await emitPusherEvent('reservations', 'confirm-reservation', reservation.service.id);
        await emitPusherEvent('rooms', 'add-room', addRoomInService);
        await emitPusherEvent('rooms', 'no-available', reservation.room.id);


        revalidatePath("/booking")

        return {
            ok: true,
            message: `Se confirmo la entrada a la reserva con codigo de acceso : ${reservation.accessCode}`
        }

    } catch (error) {
        console.log(error)
        return {
            ok: false,
            message: "Ups la reserva no se pudo iniciar"
        }
    }

}
'use server';
import { emitPusherEvent } from "@/lib";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";





export const canceledReservationByUser = async (reservationId: string) => {


    try {

        const reservation = await prisma.service.update({
            where: {
                id: reservationId,
                type: "reservation",
                paymentStatus: 'ACCEPTED'
            },
            data: {
                ServiceItem: {
                    update: {
                        canceledReservation: true,
                        dateCanceledReservation: new Date(),
                        accessCode: null,
                        status: "cancelado"
                    }
                }
            },
            include: {
                ServiceItem: {
                    select: {
                        id: true,
                        title: true,
                        arrivalDate: true,
                        departureDate: true,
                        timeLimit: true,
                        accessCode: true,
                        status: true,
                        roomNumber: true

                    }
                }
            },
        })

        revalidatePath(`/booking/${reservation.id}`);
        revalidatePath("/booking");
        revalidatePath("/admin/dashboard-partner-motel/reservations");

        await emitPusherEvent('reservations', 'cancel-reservation', reservation.id);

        return {
            ok: true,
            message: "Reserva cancelada correctamente"
        }

    } catch (error) {
        console.log(error)
        return {
            ok: false,
            message: "Ups la reserva no se pudo cancelar"
        }
    }


}

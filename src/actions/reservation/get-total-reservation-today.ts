'use server';
import prisma from "@/lib/prisma";
import { startOfDay, endOfDay } from 'date-fns';


export const getTotalReservationTodayByMotel = async (motelId: string) => {
    const today = new Date();
    const start = startOfDay(today);
    const end = endOfDay(today);
    try {

        const totalReservation = await prisma.service.count({
            where: {
                ServiceItem: {
                    room: {
                        motelId: motelId
                    },
                    status: 'en_espera',
                    arrivalDate: {
                        gte: start,
                        lte: end,
                    },
                },
                type: "reservation",
                paymentStatus: 'ACCEPTED'
            }
        })

        return {
            totalReservation,
        }

    } catch (error) {
        return {
            totalReservation: 0,
            message: "No se pudieron obtener las reservas del motel"
        }
    }


}
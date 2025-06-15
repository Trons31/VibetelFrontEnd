'use server';
import prisma from "@/lib/prisma";





export const getReservationByTransactionId = async (transactionId: string) => {

    try {

        const reservation = await prisma.service.findFirst({
            where: {
                transactionId: transactionId,
                type: "reservation"
            }
        })


        if (!reservation) {
            return {
                ok: false,
                reservation: {
                    transactionId: "",
                    total: 0
                }
            }
        }

        return {
            reservation: {
                transactionId: reservation.transactionId,
                status: reservation.paymentStatus,
                total: reservation.total
            }
        }

    } catch (error) {
        console.log(error);
        return {
            ok: false,
            reservation: {
                transactionId: "",
                total: 0
            }
        }
    }

}
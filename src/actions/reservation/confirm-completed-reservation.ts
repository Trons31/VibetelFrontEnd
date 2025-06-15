'use server';
import { emitPusherEvent } from "@/lib";
import prisma from "@/lib/prisma";


export const confirmCompletedReservationByUser = async (idReservation: string) => {

    try {

        const reservation = await prisma.service.update({
            where: {
                id: idReservation,
                type: "reservation",
                paymentStatus: 'ACCEPTED'
            },
            data: {
                ServiceItem: {
                    update: {
                        userConfirmServiceCompleted: true,
                        dateUserConfirmServiceCompleted: new Date(),
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
                        roomNumber: true,
                        dateUserConfirmServiceCompleted: true,
                        serviceAddTime: {
                            select: {
                                newDepartureDate: true,
                                addTimeReservation: true,
                                createdAt: true,
                            },
                        }

                    }
                }
            },
        })

        const addTimes = reservation.ServiceItem?.serviceAddTime || [];

        const ConfirmCompletedReservationByUserRealTime = {
            id: reservation.id,
            accessCode: reservation.ServiceItem?.accessCode,
            title: reservation.ServiceItem?.title,
            roomNumber: reservation.ServiceItem?.roomNumber,
            departureDate: addTimes.length > 0 ? addTimes[addTimes.length - 1].newDepartureDate! : reservation.ServiceItem?.departureDate!,
            createdAt: reservation.ServiceItem?.dateUserConfirmServiceCompleted || new Date(),
        };

        await emitPusherEvent('reservations', 'complete-reservation-by-user', ConfirmCompletedReservationByUserRealTime);

        return {
            ok: true,
            message: "Solicitud de finalizacion de reserva realizada correctamente"
        }

    } catch (error) {
        console.log(error)
        return {
            ok: false,
            message: "Ups la reserva no se pudo realizar la solicitud de finalizar el servicio"
        }
    }

}



export const confirmCompletedReservationByMotel = async (idReservation: string) => {
    try {

        const reservation = await prisma.service.update({
            where: {
                id: idReservation,
                type: "reservation"
            },
            data: {
                ServiceItem: {
                    update: {
                        serviceCompleted: true,
                        dateComplete: new Date(),
                        status: "completado",
                        room: {
                            update: {
                                status: "SERVICE_COMPLETED"
                            }
                        }
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

        const roomOffService = {
            id: reservation.ServiceItem?.id,
            accessCode: reservation.ServiceItem?.accessCode,
            title: reservation.ServiceItem?.title,
            roomNumber: reservation.ServiceItem?.roomNumber,
            departureDate: reservation.ServiceItem?.arrivalDate,
        };


        await emitPusherEvent('reservations', 'completed-reservation-by-motel', reservation.id);
        await emitPusherEvent('rooms', 'completed-service', roomOffService);

        return {
            ok: true,
            message: "Reserva finalizada correctamente"
        }

    } catch (error) {
        console.log(error)
        return {
            ok: false,
            message: "Ups la reserva no se pudo cancelar"
        }
    }

}
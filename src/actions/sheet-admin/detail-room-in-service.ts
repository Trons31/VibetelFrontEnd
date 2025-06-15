'use server';
import prisma from "@/lib/prisma";

export const detailRoomInService = async (reservationId: string) => {
    try {
        // Obtener la reserva actual y sus datos
        const currentReservation = await prisma.serviceItem.findUnique({
            where: {
                id: reservationId,
            },
            include: {
                room: true,
                service: true,
                serviceAddTime: {
                    orderBy: { createdAt: 'desc' },
                },
            }
        });

        if (!currentReservation) {
            throw new Error("Reservation not found");
        }

        const roomId = currentReservation.roomId;

        // Obtener la siguiente reserva más cercana a la actual
        const nextReservation = await prisma.serviceItem.findFirst({
            where: {
                roomId: roomId,
                arrivalDate: {
                    gt: currentReservation.departureDate
                }
            },
            orderBy: { arrivalDate: 'asc' }
        });

        const totalAddTime = currentReservation.serviceAddTime.reduce((total, addTime) => total + addTime.addTimeReservation, 0);

        const updatedDepartureDate = currentReservation.serviceAddTime.length > 0
            ? currentReservation.serviceAddTime[0].newDepartureDate!
            : currentReservation.departureDate;

        const currentReservationReturn = {
            id: currentReservation.service.id,
            room: currentReservation.title,
            type: currentReservation.service.type,
            dateTakenReservation: currentReservation.dateTaken!,
            departureDate: updatedDepartureDate!,
            roomNumber: currentReservation.roomNumber ,
            addTimes: currentReservation.serviceAddTime,
            totalAddTime,
        };

        const nextReservationReturn = {
            room: nextReservation?.title!,
            arrivalDate: nextReservation?.arrivalDate!,
            departureDate: nextReservation?.departureDate!,
            roomNumber: nextReservation?.roomNumber!,
        };

        return {
            currentReservationReturn,
            nextReservationReturn: nextReservation ? nextReservationReturn : null,
        };
    } catch (error) {
        console.error(error);
        throw error;
    }
};

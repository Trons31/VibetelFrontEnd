'use server';
import prisma from "@/lib/prisma";

interface ReservationItem {
    arrivalDate: Date;
    departureDate: Date;
    roomId: string;
}

// Función para verificar si dos intervalos de tiempo se solapan
const isOverlapping = (start1: Date, end1: Date, start2: Date, end2: Date): boolean => {
    return start1 < end2 && start2 < end1;
};

// Función para verificar si la reserva es válida
const isValidReservation = (
    newStart: Date,
    newEnd: Date,
    existingReservations: ReservationItem[],
    bufferTime: number
): boolean => {
    const bufferMs = bufferTime * 60 * 1000; // Convertir minutos a milisegundos

    for (const reservation of existingReservations) {
        const existingStart = new Date(reservation.arrivalDate).getTime();
        const existingEnd = new Date(reservation.departureDate).getTime();
        const newStartTime = newStart.getTime();
        const newEndTime = newEnd.getTime();

        // Si hay una reserva en curso, la nueva reserva es inválida
        if (isOverlapping(newStart, newEnd, reservation.arrivalDate, reservation.departureDate)) {
            return false;
        }

        // Validar buffer de tiempo antes y después de la reserva
        if (newStartTime >= existingStart && newStartTime <= existingEnd + bufferMs) {
            return false;
        }

        if (newEndTime > existingStart - bufferMs && newEndTime <= existingStart) {
            return false;
        }
    }

    return true;
};

export const validateDateReservation = async (
    newArrivalDate: Date,
    newDepartureDate: Date,
    roomId: string,
    motelId: string
) => {
    try {
        // Obtener la configuración del motel
        const motelConfig = await prisma.motelConfig.findUnique({
            where: { motelId },
            select: {
                timeMinutesCleanRoom: true,
                inService: true,
                outOfServiceStart: true,
                outOfServiceEnd: true
            }
        });

        if (!motelConfig) {
            return {
                isValid: false,
                message: "No se encontró la configuración del motel."
            };
        }

        const bufferTime = motelConfig.timeMinutesCleanRoom || 30; // Por defecto, 30 minutos

        // Verificar si el motel está fuera de servicio y si la fecha de llegada cae dentro del período
        if (!motelConfig.inService && motelConfig.outOfServiceStart && motelConfig.outOfServiceEnd) {
            const outOfServiceStart = new Date(motelConfig.outOfServiceStart);
            const outOfServiceEnd = new Date(motelConfig.outOfServiceEnd);

            if (newArrivalDate >= outOfServiceStart && newArrivalDate <= outOfServiceEnd) {
                return {
                    isValid: false,
                    message: "El motel está fuera de servicio en la fecha seleccionada."
                };
            }
        }

        // Obtener la hora actual
        const now = new Date();

        // Verificar si hay un servicio activo en este momento
        const activeService = await prisma.serviceItem.findFirst({
            where: {
                roomId,
                room: { motelId },
                arrivalDate: { lte: now },
                departureDate: { gte: now }
            }
        });

        // Si hay un servicio activo en este momento, no se puede reservar
        if (activeService) {
            return {
                isValid: false,
                message: "La habitación tiene un servicio activo en este momento."
            };
        }

        // Obtener reservas y servicios futuros que se solapen con la nueva reserva
        const existingServices: ReservationItem[] = await prisma.serviceItem.findMany({
            where: {
                roomId,
                room: { motelId },
                OR: [
                    { arrivalDate: { lte: newDepartureDate }, departureDate: { gte: newArrivalDate } }
                ]
            }
        });

        // Validar si la reserva se solapa con otras reservas o servicios
        if (isValidReservation(newArrivalDate, newDepartureDate, existingServices, bufferTime)) {
            return {
                isValid: true,
                message: "La reserva es válida."
            };
        } else {
            return {
                isValid: false,
                message: "La reserva entra en conflicto con una reserva existente o el tiempo de limpieza."
            };
        }
    } catch (error) {
        console.error("Error en validateDateReservation:", error);
        return {
            isValid: false,
            message: "Error al validar la reserva."
        };
    }
};

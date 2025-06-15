'use server';
import prisma from "@/lib/prisma";

export const getTotalReservationByMotel = async (motelId: string) => {


  try {
    const reservations = await prisma.serviceItem.findMany({
      where: {
        room: {
          motelId: motelId,
        },
        service: {
          type: "reservation",
          paymentStatus: 'ACCEPTED'
        }
      },
    });

    const totalReservations = reservations.length;
    const reservationsEnEspera = reservations.filter(r => r.status === 'en_espera').length;
    const reservationsIniciadas = reservations.filter(r => r.status === 'iniciado').length;
    const reservationsCompletadas = reservations.filter(r => r.status === 'completado').length;
    const reservationsCanceladas = reservations.filter(r => r.status === 'cancelado').length;
    const reservationsNoIniciadas = reservations.filter(r => r.status === 'no_iniciado').length;


    return {
      reservations: {
        totalReservations,
        reservationsEnEspera,
        reservationsIniciadas,
        reservationsCompletadas,
        reservationsCanceladas,
        reservationsNoIniciadas
      }
    };
  } catch (error) {
    console.error("Error fetching reservations:", error);
    return {
      reservations: {
        totalReservations: 0,
        reservationsEnEspera: 0,
        reservationsIniciadas: 0,
        reservationsCompletadas: 0,
        reservationsCanceladas: 0,
        reservationsNoIniciadas: 0,
      }

    };
  }
};

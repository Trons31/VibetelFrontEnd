import React from 'react'
import { ItemReservationRequest } from './ItemReservationRequest';

interface ReservationRequest {
    id: number;
    habitacion: string;
    numeroHabitacion: number;
    fechaEntrada: Date;
    fechaSalida: Date;
  }
  

export const GridReservationRequests = () => {

    const reservationRequests: ReservationRequest[] = [
        {
          id: 1,
          habitacion: "Isla Basica",
          numeroHabitacion: 8,
          fechaEntrada: new Date(),
          fechaSalida: new Date(),
        },
        {
          id: 2,
          habitacion: "Isla Suite",
          numeroHabitacion: 12,
          fechaEntrada: new Date(),
          fechaSalida: new Date(),
        },
        {
          id: 3,
          habitacion: "Cabaña Familiar",
          numeroHabitacion: 3,
          fechaEntrada: new Date(),
          fechaSalida: new Date(),
        },
        {
          id: 4,
          habitacion: "Cabaña Familiar",
          numeroHabitacion: 3,
          fechaEntrada: new Date(),
          fechaSalida: new Date(),
        },
        {
          id: 5,
          habitacion: "Cabaña Familiar",
          numeroHabitacion: 3,
          fechaEntrada: new Date(),
          fechaSalida: new Date(),
        },
        {
          id: 6,
          habitacion: "Cabaña Familiar",
          numeroHabitacion: 3,
          fechaEntrada: new Date(),
          fechaSalida: new Date(),
        },
      ];

    return (
        <>
            <div className="mt-10" >
                <div className="grid grid-cols md:grid-cols-3 gap-5 md:gap-10" >
                    {reservationRequests.map((request) => (
                        <ItemReservationRequest key={request.id} request={request} />
                    ))}
                </div>
            </div>
        </>
    )
}

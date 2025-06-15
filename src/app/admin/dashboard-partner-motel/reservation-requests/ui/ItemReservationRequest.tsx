import React from 'react';
import { formatDateWithHours } from '@/utils';

interface ReservationRequestCardProps {
  request: {
    id: number;
    habitacion: string;
    numeroHabitacion: number;
    fechaEntrada: Date;
    fechaSalida: Date;
  };
}

export const ItemReservationRequest: React.FC<ReservationRequestCardProps> = ({ request }) => {
  return (
    <div className="relative border-2 bg-gray-100 border-dashed border-red-600 rounded">
      <div className="absolute top-0 right-0 -mt-3 mr-2 bg-indigo-600 text-white text-xs font-bold px-4 py-1 rounded shadow-md">
        Responde antes de 2min, 30seg.
      </div>
      <div className="flex justify-between px-3 mt-6">
        <p className="text-sm font-semibold">Solicitud de reserva</p>
        <p className="text-black text-sm">Hace 2 min</p>
      </div>

      <div className="p-3 mt-1">
        <div className="flex justify-start">
          <p className="text-xs font-bold">Habitacion</p>
        </div>
        <div className="flex justify-between">
          <p className="text-sm">{request.habitacion}</p>
          <p className="text-sm">Nro° {request.numeroHabitacion}</p>
        </div>
      </div>

      <div className="px-3 mt-1">
        <div className="flex justify-start">
          <p className="text-xs font-bold">Fecha de entrada</p>
        </div>
        <div className="flex justify-between">
          <p className="text-sm">{formatDateWithHours(request.fechaEntrada)}</p>
        </div>
      </div>

      <div className="px-3 mt-3">
        <div className="flex justify-start">
          <p className="text-xs font-bold">Fecha de salida</p>
        </div>
        <div className="flex justify-between">
          <p className="text-sm">{formatDateWithHours(request.fechaSalida)}</p>
        </div>
      </div>

      <div className="flex flex-col space-y-2 px-3 mt-5 mb-3">
        <button className="bg-red-600 hover:bg-red-700 transition-all duration-300 py-2 font-bold text-sm rounded-lg text-white">
          Aceptar
        </button>
        <button className="bg-gray-300 hover:bg-gray-400 transition-all duration-300 py-2 font-bold text-sm rounded-lg text-black">
          Rechazar
        </button>
      </div>
    </div>
  );
};
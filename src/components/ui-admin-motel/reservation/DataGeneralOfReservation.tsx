'use client';
import React, { useEffect, useState } from 'react';
import { formatDate } from '@/utils';
import { ReservationData } from '@/interfaces/reservation.interface';

interface Props {
  motelId: string;
}

export const DataGeneralOfReservation = ({ motelId }: Props) => {
  const [isLoading, setisLoading] = useState(true)
  const [data, setData] = useState<ReservationData>({
    totalReservations: 0,
    reservationsEnEspera: 0,
    reservationsIniciadas: 0,
    reservationsCompletadas: 0,
    reservationsCanceladas: 0,
    reservationsNoIniciadas: 0,
  });


  const { totalReservations, reservationsEnEspera, reservationsIniciadas, reservationsCompletadas, reservationsCanceladas,reservationsNoIniciadas } = data;

  const calculateProgress = (count: number) => (totalReservations === 0 ? 0 : (count / totalReservations) * 100);

  return (
    <div className="max-w-md rounded-xl border bg-white p-6 pb-10 text-gray-900">
      <div className="flex justify-between">
        <p className="text-lg font-bold text-gray-900">Tráfico de reservas</p>
        <p className="text-lg font-medium">{formatDate(new Date())}</p>
      </div>

      <div className="mt-4">
        <p className="float-left mb-2">Reservas</p>
        {
          isLoading
            ? (
              <div className='animate-pulse float-right bg-gray-300 px-5 py-3 rounded-lg' >

              </div>
            ) : (
              <span className="float-right mb-2">{totalReservations}</span>
            )

        }

        <div className="w-full border-dashed border border-gray-300 overflow-hidden rounded-full bg-gray-50"></div>
      </div>

      <div className="mt-4">
        <p className="float-left mb-2">Reservas en espera</p>

        {
          isLoading
            ? (
              <>
                <div className='animate-pulse float-right bg-gray-300 px-5 py-3 rounded-lg' >

                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-50">
                  <div className="h-full overflow-hidden rounded-full animate-pulse bg-gray-300 transition-all duration-500" style={{ width: `100%` }}></div>
                </div>
              </>
            ) : (
              <>
                <span className="float-right mb-2">{reservationsEnEspera}</span>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-50">
                  <div className="h-full overflow-hidden rounded-full animate-pulse bg-indigo-600 transition-all duration-500" style={{ width: `${calculateProgress(reservationsEnEspera)}%` }}></div>
                </div>
              </>
            )
        }

      </div>

      <div className="mt-4">
        <p className="float-left mb-2">Reservas iniciadas</p>

        {
          isLoading
            ? (
              <>
                <div className='animate-pulse float-right bg-gray-300 px-5 py-3 rounded-lg' >

                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-50">
                  <div className="h-full overflow-hidden rounded-full animate-pulse bg-gray-300 transition-all duration-500" style={{ width: `100%` }}></div>
                </div>
              </>
            ) : (
              <>
                <span className="float-right mb-2">{reservationsIniciadas}</span>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-50">
                  <div className="h-full overflow-hidden rounded-full animate-pulse bg-indigo-600 transition-all duration-500" style={{ width: `${calculateProgress(reservationsIniciadas)}%` }}></div>
                </div>
              </>
            )
        }

      </div>

      <div className="mt-4">
        <p className="float-left mb-2">Reservas finalizadas</p>

        {
          isLoading
            ? (
              <>
                <div className='animate-pulse float-right bg-gray-300 px-5 py-3 rounded-lg' >

                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-50">
                  <div className="h-full overflow-hidden rounded-full animate-pulse bg-gray-300 transition-all duration-500" style={{ width: `100%` }}></div>
                </div>
              </>
            ) : (
              <>
                <span className="float-right mb-2">{reservationsCompletadas}</span>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-50">
                  <div className="h-full overflow-hidden rounded-full animate-pulse bg-indigo-600 transition-all duration-500" style={{ width: `${calculateProgress(reservationsCompletadas)}%` }}></div>
                </div>
              </>
            )
        }
      </div>

      <div className="mt-4">
        <p className="float-left mb-2">Reservas canceladas</p>

        {
          isLoading
            ? (
              <>
                <div className='animate-pulse float-right bg-gray-300 px-5 py-3 rounded-lg' >

                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-50">
                  <div className="h-full overflow-hidden rounded-full animate-pulse bg-gray-300 transition-all duration-500" style={{ width: `100%` }}></div>
                </div>
              </>
            ) : (
              <>
                <span className="float-right mb-2">{reservationsCanceladas}</span>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-50">
                  <div className="h-full overflow-hidden rounded-full animate-pulse bg-indigo-600 transition-all duration-500" style={{ width: `${calculateProgress(reservationsCanceladas)}%` }}></div>
                </div>
              </>
            )
        }

      </div>

      <div className="mt-4">
        <p className="float-left mb-2">Reservas no iniciadas</p>

        {
          isLoading
            ? (
              <>
                <div className='animate-pulse float-right bg-gray-300 px-5 py-3 rounded-lg' >

                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-50">
                  <div className="h-full overflow-hidden rounded-full animate-pulse bg-gray-300 transition-all duration-500" style={{ width: `100%` }}></div>
                </div>
              </>
            ) : (
              <>
                <span className="float-right mb-2">{reservationsNoIniciadas}</span>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-50">
                  <div className="h-full overflow-hidden rounded-full animate-pulse bg-indigo-600 transition-all duration-500" style={{ width: `${calculateProgress(reservationsNoIniciadas)}%` }}></div>
                </div>
              </>
            )
        }

      </div>
    </div>
  );
};

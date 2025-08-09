"use client"
import React, { useEffect, useState } from 'react';
import { formatDateWithHours, formatTimeWithAmPm } from '@/utils';
import { ReservationPendingByMotelApi } from '@/interfaces/reservation.interface';
import clsx from 'clsx';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import { useReservationStore } from '@/store/reservation/adminWebsocket.store';

interface Props {
  reservationsPending: ReservationPendingByMotelApi;
}

export const ItemReservationRequest = ({ reservationsPending }: Props) => {
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [expired, setExpired] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { data: session, status } = useSession();
  const [loadingAction, setLoadingAction] = useState<"accept" | "reject" | null>(null);

  const removeReservation = useReservationStore((state) => state.removeReservation);
  const addReservationOnPayment = useReservationStore((state) => state.addReservationOnPayment);

  useEffect(() => {
    const createdAt = new Date(reservationsPending.createdAt).getTime();
    const expireTime = createdAt + 150_000; // 2 min 30 seg = 150000 ms

    const interval = setInterval(() => {
      const now = Date.now();
      const diff = Math.max(0, Math.floor((expireTime - now) / 1000));
      setTimeLeft(diff);

      if (diff <= 0) {
        setExpired(true);
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [reservationsPending.createdAt]);


  const UpdateStatusReservatin = async (status: boolean) => {
    const action = status ? "accept" : "reject";
    setLoadingAction(action);
    try {
      const response = await axios.patch<ReservationPendingByMotelApi>(`${process.env.NEXT_PUBLIC_API_ROUTE}service/reservation/${reservationsPending.id}/status`,
        { isConfirmed: status },
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`
          },
        }
      );
      if (action === "accept") {
        toast.success("Solicitud de reserva confirmada")
        addReservationOnPayment(response.data);
      } else {
        toast.success("Solicitud de reserva rechazada")
      }
      removeReservation(reservationsPending.id);
      setIsLoading(false);
      setLoadingAction(null);
    } catch (error: any) {
      console.log(error);
      toast.error("No se actualizar el estado de la reserva");
      setIsLoading(false);
      setLoadingAction(null);
    }
  }

  const formatCountdown = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m} min${m !== 1 ? 's' : ''} ${s} seg`;
  };

  return (
    <>
      <div className="relative border-2 bg-gray-100 border-blue-600 rounded-lg">
        <div className={
          clsx(
            "absolute top-0 right-0 -mt-3 mr-2 text-white text-xs font-bold px-4 py-1 rounded shadow-md",
            {
              "animate-bounce bg-red-600": expired,
              "bg-indigo-600": !expired,
            }
          )
        }>
          {!expired ? (
            <p>
              Responde antes de {formatCountdown(timeLeft)}
            </p>
          ) : (
            <p>¡Responde a tiempo!</p>
          )}
        </div>
        <div className="flex justify-between px-3 mt-6">
          <p className="text-sm font-semibold text-blue-800">Solicitud de reserva</p>
          <p className="text-black text-sm">{formatTimeWithAmPm(reservationsPending.createdAt)}</p>
        </div>

        <div className='p-4' >
          <div className="border-t border-gray-200 pt-2">
            <div className="flex justify-start">
              <p className="text-xs font-bold">Habitacion</p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm">{reservationsPending.serviceItem.title}</p>
              <p className="text-sm">Nro° {reservationsPending.serviceItem.roomNumber}</p>
            </div>
          </div>

          <div className="mt-2">
            <div className="flex justify-start">
              <p className="text-xs font-bold">Fecha de entrada</p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm">{formatDateWithHours(reservationsPending.serviceItem.arrivalDate)}</p>
            </div>
          </div>

          <div className="mt-2">
            <div className="flex justify-start">
              <p className="text-xs font-bold">Fecha de salida</p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm">{formatDateWithHours(reservationsPending.serviceItem.departureDate)}</p>
            </div>
          </div>

          <div className="flex flex-col space-y-2  mt-5 mb-2">
            <button
              onClick={() => UpdateStatusReservatin(true)}
              disabled={loadingAction !== null}
              className={clsx(
                "transition-all duration-300 py-2 font-bold text-sm rounded-lg",
                loadingAction === 'accept' ? "bg-blue-800 text-white opacity-70" : "bg-blue-600 hover:bg-blue-700 text-white",
                { "cursor-not-allowed": loadingAction !== null && loadingAction !== 'accept' }
              )}
            >
              {loadingAction === "accept" ? "Procesando..." : "Aceptar"}
            </button>

            <button
              onClick={() => UpdateStatusReservatin(false)}
              disabled={loadingAction !== null}
              className={clsx(
                "transition-all duration-300 py-2 font-bold text-sm rounded-lg",
                loadingAction === 'reject' ? "bg-gray-400 text-black opacity-70" : "bg-gray-300 hover:bg-gray-400 text-black",
                { "cursor-not-allowed": loadingAction !== null && loadingAction !== 'reject' }
              )}
            >
              {loadingAction === "reject" ? "Procesando..." : "Rechazar"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
"use client"
import React, { useEffect, useState } from 'react';
import { formatDateWithHours, formatTimeWithAmPm } from '@/utils';
import { ReservationPendingByMotelApi } from '@/interfaces/reservation.interface';
import clsx from 'clsx';
import { useReservationStore } from '@/store/reservation/adminWebsocket.store';
import { motion } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';

interface Props {
  reservationOnPayment: ReservationPendingByMotelApi;
}

const TEN_MINUTES_IN_MS = 10 * 60 * 1000;

export const ItemReservationOnPayment = ({ reservationOnPayment }: Props) => {
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { data: session, status } = useSession();

  const removeReservationOnPayment = useReservationStore((state) => state.removeReservationOnPayment);

  useEffect(() => {
    if (!reservationOnPayment.isConfirmedCreatedAt) return;

    const confirmedTime = new Date(reservationOnPayment.isConfirmedCreatedAt).getTime();
    const expireTime = confirmedTime + TEN_MINUTES_IN_MS;
    const now = Date.now();
    const diff = Math.max(0, Math.floor((expireTime - now) / 1000));
    setTimeLeft(diff);
    const initialProgress = (1 - (diff / (TEN_MINUTES_IN_MS / 1000))) * 100;
    setProgress(initialProgress);
  }, [reservationOnPayment.isConfirmedCreatedAt]);


  useEffect(() => {
    if (timeLeft <= 0 || !reservationOnPayment.isConfirmedCreatedAt) return;

    const interval = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, reservationOnPayment.isConfirmedCreatedAt]);

  useEffect(() => {
    if (!reservationOnPayment.isConfirmedCreatedAt) return;
    const totalTime = TEN_MINUTES_IN_MS / 1000;
    const currentProgress = (1 - (timeLeft / totalTime)) * 100;
    setProgress(currentProgress);
  }, [timeLeft, reservationOnPayment.isConfirmedCreatedAt]);

  const formatCountdown = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m} min${m !== 1 ? 's' : ''} ${s} seg`;
  };

  const handleConfirmPayment = async () => {
    setIsLoading(true);
    try {
      await axios.patch(`${process.env.NEXT_PUBLIC_API_ROUTE}service/reservation/${reservationOnPayment.id}/verify-payment`,
        { isConfirmed: status },
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`
          },
        }
      );
      removeReservationOnPayment(reservationOnPayment.id);
      toast.success("Reserva confirmada")
      setIsLoading(false);
    } catch (error: any) {
      console.log(error);
      toast.error("No se pudo confirmar la reserva");
      setIsLoading(false);
    }
  }

  const isExpired = timeLeft <= 0;

  return (
    <>
      <div
        className={clsx(
          "relative border-2 h-fit bg-white border-blue-400 rounded-lg shadow-lg"
        )}
      >

        {
          (isExpired || reservationOnPayment.paymentStatus !== "pending") && (
            <div className={
              clsx(
                "absolute top-0 right-0 z-20 -mt-3 mr-2 text-white text-xs font-bold px-4 py-1 rounded shadow-md",
                {
                  "animate-bounce bg-green-600": reservationOnPayment.paymentStatus === 'accepted',
                  "bg-red-600 animate-bounce": reservationOnPayment.paymentStatus !== 'accepted',
                }
              )
            }>
              {reservationOnPayment.paymentStatus === 'accepted' ? (
                <p>
                  Pago recibido
                </p>
              ) : (
                <p>No se realizo el pago</p>
              )}
            </div>
          )
        }

        <div className="p-4">
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm font-semibold text-blue-800">Reserva en proceso de pago</p>
            {reservationOnPayment.isConfirmedCreatedAt && (
              <p className="text-gray-500 text-xs">
                {formatTimeWithAmPm(reservationOnPayment.isConfirmedCreatedAt)}
              </p>
            )}
          </div>

          <div className="border-t border-gray-200 pt-2">
            <div className="flex justify-start">
              <p className="text-xs font-bold text-gray-700">Habitacion</p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm font-medium">{reservationOnPayment.serviceItem.title}</p>
              <p className="text-sm text-gray-600">Nro° {reservationOnPayment.serviceItem.roomNumber}</p>
            </div>
          </div>

          <div className="mt-2">
            <div className="flex justify-start">
              <p className="text-xs font-bold text-gray-700">Fecha de entrada</p>
            </div>
            <p className="text-sm text-gray-600">{formatDateWithHours(reservationOnPayment.serviceItem.arrivalDate)}</p>
          </div>

          <div className="mt-2">
            <div className="flex justify-start">
              <p className="text-xs font-bold text-gray-700">Fecha de salida</p>
            </div>
            <p className="text-sm text-gray-600">{formatDateWithHours(reservationOnPayment.serviceItem.departureDate)}</p>
          </div>
        </div>

        {
          (!isExpired && reservationOnPayment.paymentStatus === "pending") ? (
            <>
              <div className="relative bg-gray-200 h-2 mt-4">
                <motion.div
                  className="absolute top-0 left-0 h-full bg-blue-600"
                  style={{ width: `${progress}%` }}
                  initial={{ width: '0%' }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1, ease: 'linear' }}
                />
              </div>
              <div className="p-3 text-center text-sm font-bold text-blue-600">
                <p>
                  {`Tiempo restante: ${formatCountdown(timeLeft)}`}
                </p>
              </div>
            </>
          ) : (
            <div className="p-3">
              <button
                onClick={handleConfirmPayment}
                className="w-full bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Confirmar
              </button>
            </div>
          )}
      </div>
    </>
  );
};
"use client";
import React, { useEffect, useState } from "react";

import { useBookingStore } from "@/store";
import { MdTimer } from "react-icons/md";

export const ReservationExpiryTimer: React.FC = () => {

  if (localStorage.getItem("persist-token-reservation") === null) return;

  const roomInBooking = useBookingStore((state) => state.Booking);
  const removeBooking = useBookingStore((state) => state.removeBooking);
  const setTokenExpire = useBookingStore((state) => state.setTokenExpire);
  const [isLoading, setIsLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState<number>(0); // Tiempo restante en segundos
  const expiryTime = 10 * 60;
  const [hasExpired, setHasExpired] = useState(false);



  useEffect(() => {
    if (!roomInBooking) return;
    const createdAt = new Date(roomInBooking.createdAt).getTime(); // Hora de creación de la reserva
    const currentTime = Date.now(); // Hora actual
    const elapsedTime = Math.floor((currentTime - createdAt) / 1000); // Tiempo transcurrido en segundos
    const remainingTime = expiryTime - elapsedTime; // Tiempo restante

    if (remainingTime > 0) {
      setTimeLeft(remainingTime);
    } else {
      setTimeLeft(0); // Si el tiempo ha expirado, establece en 0
      setHasExpired(true); // Marca como expirado si ya ha pasado el tiempo
    }

    setIsLoading(false);

    // Actualiza el temporizador cada segundo
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev > 0) {
          return prev - 1;
        } else {
          setHasExpired(true); // Marcar como expirado
          clearInterval(interval); // Detener el intervalo cuando el tiempo se acaba
          return 0;
        }
      });
    }, 1000);

    // Limpieza del intervalo al desmontar el componente
    return () => clearInterval(interval);
  }, [roomInBooking]);

  useEffect(() => {
    if (hasExpired) {
      const handleExpiry = async () => {
        if (typeof window !== 'undefined') {
          localStorage.removeItem("persist-token-reservation");
          window.location.reload();
        }
      };
      handleExpiry();
    }
  }, [hasExpired, removeBooking, setTokenExpire]);

  // Formato del tiempo restante
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <>
      {isLoading ? (
        <></>
      ) : (
        <>
          <div className="fixed fade-in top-10 z-30 block md:hidden w-full">
            <div className="bg-red-600 py-2 px-3 ">
              <div className="flex w-full justify-between">
                <p className="text-white">Proceso expira en</p>
                <div className="grid grid-cols-2 items-center text-white">
                  <MdTimer className="w-5 h-5 text-white" />
                  <div className="w-10 text-center whitespace-nowrap">
                    {timeLeft > 0 ? formatTime(timeLeft) : "Tiempo expirado"}
                  </div>
                </div>
              </div>
              <p className="text-xs mt-1 text-white">
                Completa tu proceso de pago antes de que expire la reserva.
              </p>
            </div>
          </div>

          <div className="px-10 fade-in mt-5 hidden md:block">
            <div className="bg-red-600 p-4 grid grid-cols-10 rounded-lg">
              <p className="col-span-8 text-white">
                Las reservas tienen un tiempo de expiración por privacidad y
                protección de 10 minutos. Debes completar el proceso de pago
                antes de que transcurran esos 10 minutos; de lo contrario, la
                reserva se anulará automáticamente.
              </p>
              <div className="col-span-2 flex text-lg justify-center items-center gap-5 bg-white rounded-lg  text-red-600 font-bold mt-2">
                <div className="grid grid-cols-2">
                  <MdTimer className="w-7 h-7 text-red-600" />
                  <div className="w-16 text-center whitespace-nowrap">
                    {" "}
                    {/* Ancho fijo y no se rompe el texto */}
                    {timeLeft > 0 ? formatTime(timeLeft) : "Tiempo agotado"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

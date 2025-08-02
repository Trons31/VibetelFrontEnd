"use client";
import React, { useEffect, useState } from "react";

import { useBookingStore } from "@/store";
import { MdTimer } from "react-icons/md";

export const ReservationExpiryTimer: React.FC = () => {
  // Estados para controlar la lógica del componente
  const [hasToken, setHasToken] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [hasExpired, setHasExpired] = useState(false);

  // Usamos el store de reservas
  const roomInBooking = useBookingStore((state) => state.Booking);
  const removeBooking = useBookingStore((state) => state.removeBooking);
  const setTokenExpire = useBookingStore((state) => state.setTokenExpire);
  
  const expiryTime = 10 * 60; // 10 minutos en segundos

  // Efecto para verificar el token en localStorage (solo en cliente)
  useEffect(() => {
    const token = localStorage.getItem("persist-token-reservation");
    setHasToken(token !== null);
    setIsLoading(false);
  }, []);

  // Efecto principal para el temporizador
  useEffect(() => {
    if (!hasToken || !roomInBooking) return;
    
    const createdAt = new Date(roomInBooking.createdAt).getTime();
    const currentTime = Date.now();
    const elapsedTime = Math.floor((currentTime - createdAt) / 1000);
    const remainingTime = expiryTime - elapsedTime;

    if (remainingTime > 0) {
      setTimeLeft(remainingTime);
    } else {
      setTimeLeft(0);
      setHasExpired(true);
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev > 0) return prev - 1;
        setHasExpired(true);
        clearInterval(interval);
        return 0;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [roomInBooking, hasToken, expiryTime]); // Añadimos expiryTime como dependencia

  // Efecto para manejar la expiración
  useEffect(() => {
    if (hasExpired && hasToken) {
      localStorage.removeItem("persist-token-reservation");
      window.location.reload();
    }
  }, [hasExpired, hasToken]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  // No renderizar si no hay token o está cargando
  if (!hasToken || isLoading) return null;

  return (
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
                {timeLeft > 0 ? formatTime(timeLeft) : "Tiempo agotado"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
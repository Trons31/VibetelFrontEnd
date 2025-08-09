"use client";

import {
  ActionsBooking,
  BookingDetail,
  BookingTracker,
  MoldaRating,
  PendingExit,
  SideMenuAnonymousBooking,
  StateBooking,
  StateBookingMovil,
  TimerBooking,
} from "@/components";
import { ReservationApi } from "@/interfaces/reservation.interface";
import clsx from "clsx";
import { motion } from "framer-motion";
import { useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";

interface Props {
  reservation: ReservationApi;
}

export const AnonymousBooking = ({ reservation }: Props) => {
  const [isVisibleAlert, setIsVisibleAlert] = useState(true);

  const [modalRating, setModalRating] = useState(true);


  return (
    <>
      {reservation.ServiceItem?.serviceTaken &&
        reservation.ServiceItem.serviceCompleted === false && (
          <TimerBooking departureDate={reservation.ServiceItem.departureDate} />
        )}

      {reservation.ServiceItem?.dateUserConfirmServiceCompleted &&
        !reservation.ServiceItem.dateComplete && <PendingExit />}

      <div className="w-full">
        <div className="grid grid-cols-8 sm:grid-cols-10">
          <div className="col-span-2">
            <SideMenuAnonymousBooking />
          </div>
          <div className="col-span-8 bg-gray-100 w-full py-5 px-0 md:px-5">
            {isVisibleAlert && (
              <motion.div
                id="informational-banner"
                className="flex mt-20 md:mt-14  rounded-lg flex-col justify-between w-full p-4 border-b border-gray-200 md:flex-row bg-white "
                initial={{ opacity: 0, y: -20 }} // Estado inicial (oculto)
                animate={{ opacity: 1, y: 0 }} // Animación de entrada
                exit={{ opacity: 0, y: -20 }} // Animación de salida
                transition={{ duration: 0.5 }} // Duración de la transición
              >
                <div className="mb-4 md:mb-0 md:me-4">
                  <div className="flex md:hidden justify-end items-center flex-shrink-0">
                    <button
                      onClick={() => setIsVisibleAlert(false)}
                      data-dismiss-target="#informational-banner"
                      className="flex-shrink-0 
                      inline-flex justify-center w-7 h-7 items-center text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 "
                    >
                      <IoIosCloseCircle size={20} />
                    </button>
                  </div>
                  <h2 className="mb-1 text-base font-semibold text-gray-900 ">
                    Protección y privacidad
                  </h2>
                  <p className="flex items-center text-xs md:text-sm font-normal text-gray-500 ">
                    Es importante que antes de salir de la página, para mayor
                    seguridad, haga clic en el botón Salir y proteger reserva.
                  </p>
                </div>
                <div className="hidden md:flex items-center flex-shrink-0">
                  <button
                    onClick={() => setIsVisibleAlert(false)}
                    data-dismiss-target="#informational-banner"
                    className="flex-shrink-0 
                     inline-flex justify-center w-7 h-7 items-center text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 "
                  >
                    <IoIosCloseCircle size={20} />
                  </button>
                </div>
              </motion.div>
            )}

            <div className={
              clsx(
                {
                  "mt-14": !isVisibleAlert,
                  "mt-6": isVisibleAlert
                }
              )
            } >
              <StateBooking reservation={reservation} />
            </div>

            <div className={
              clsx(
                {
                  "mt-24": !isVisibleAlert,
                  "mt-6": isVisibleAlert
                }
              )
            } >
              <StateBookingMovil reservation={reservation} />
            </div>

            <BookingDetail reservation={reservation} />
            <BookingTracker reservation={reservation} />
          </div>
        </div>
      </div>

      <ActionsBooking reservation={reservation} />

      {reservation.ServiceItem.serviceCompleted &&
        reservation.roomRating?.rating === undefined && (
          <MoldaRating
            isOpen={modalRating}
            ratingRoom={reservation.roomRating}
            serviceId={reservation.id}
            onClose={() => setModalRating(false)}
          />
        )}
    </>
  );
};

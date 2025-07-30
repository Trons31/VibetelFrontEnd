// app/(motel-partner)/reservation-requests/ui/GridReservationRequests.tsx
'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ReservationPendingByMotelApi } from '@/interfaces/reservation.interface';
import { useReservationStore } from '@/store/reservation/reservation.store';
import { ItemReservationRequest } from './ItemReservationRequest';
import { useSidebarStore } from '@/store';
import clsx from 'clsx';
import { MdOutlineBlock } from 'react-icons/md';
import { Toaster } from 'react-hot-toast';

interface Props {
  initialReservations: ReservationPendingByMotelApi[];
}

export const GridReservationRequests = ({ initialReservations }: Props) => {
  const { reservations, setInitialReservations, initialLoaded } = useReservationStore();
  const { isExpanded, isMobileOpen } = useSidebarStore();

  useEffect(() => {
    if (!initialLoaded) {
      setInitialReservations(initialReservations);
    }
  }, [initialReservations, setInitialReservations, initialLoaded]);

  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />

      <div className="mt-5">

        {
          reservations.length === 0 ? (
            <div className="flex justify-center px-5 items-center py-52">
              <div className="no-file-found w-full md:w-1/2 flex flex-col items-center justify-center py-8 px-4 text-center bg-gray-200 rounded-lg shadow-md">
                <MdOutlineBlock size={50} />
                <h3 className="text-md md:text-xl font-semibold mt-4 text-black ">
                  No se han realizado solicitudes de reservas
                </h3>
                <p className="text-gray-700 text-xs md:text-md mt-2">
                  Nosotros te notificaremos cuando se realize una solicitud de reserva
                </p>
              </div>
            </div>
          ) : (
            <div className={
              clsx(
                {
                  "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4": !isExpanded,
                  "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4": isExpanded,
                }
              )
            }>
              <AnimatePresence>
                {reservations.map((reservation) => (
                  <motion.div
                    key={reservation.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ItemReservationRequest reservationsPending={reservation} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )
        }

      </div>
    </>
  );
};
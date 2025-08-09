'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ReservationPendingByMotelApi } from '@/interfaces/reservation.interface';
import { useReservationStore } from '@/store/reservation/adminWebsocket.store';
import { useSidebarStore } from '@/store';
import clsx from 'clsx';
import { MdOutlineBlock } from 'react-icons/md';
import { Toaster } from 'react-hot-toast';
import { ItemReservationOnPayment } from './ItemReservationOnPayment';

interface Props {
  initialReservations: ReservationPendingByMotelApi[];
}

export const GridReservationOnPayment = ({ initialReservations }: Props) => {
  const { reservationsOnPayment, setInitialReservationsOnPayment, initialLoadedOnPayment } = useReservationStore();
  const { isExpanded } = useSidebarStore();

  useEffect(() => {
    if (!initialLoadedOnPayment) {
      setInitialReservationsOnPayment(initialReservations);
    }
  }, [initialReservations, setInitialReservationsOnPayment, initialLoadedOnPayment]);

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="mt-10">
        {reservationsOnPayment.length === 0 ? (
          <div className='flex justify-center items-center' >
            <div className="w-fit py-36">
              <div className="no-file-found w-full  flex flex-col items-center justify-center py-8 px-4 text-center bg-gray-200 rounded-lg shadow-md">
                <MdOutlineBlock size={50} />
                <h3 className="text-md md:text-xl font-semibold mt-4 text-black ">
                  No hay reservas en proceso de pago
                </h3>
              </div>
            </div>
          </div>
        ) : (
          <div
            className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-7"
          >
            <AnimatePresence>
              {reservationsOnPayment.map((reservation) => (
                <motion.div
                  key={reservation.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <ItemReservationOnPayment reservationOnPayment={reservation} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </>
  );
};
'use client';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import Pusher from 'pusher-js';
import { formatDateWithHours, sleep } from '@/utils';
import { SkeletonReservationRealTime } from '@/components';

interface Reservation {
  id: string;
  title: string;
  arrivalDate: string;
  departureDate: string;
  timeLimit: number;
  executedDate: string;
}

interface ViewAndAccessReservationProps {
  motelId: string;
}

const ReservationItem = ({ title, arrivalDate, departureDate, timeLimit, executedDate }: Reservation) => (
  <div className='mb-6 w-full animate-fadeIn'>
    <div className='flex justify-between mb-1'>
      <strong className="block font-medium">{title}</strong>
      <strong className='truncate text-xs font-medium text-indigo-600'>Realizada a las {new Date(executedDate).toLocaleTimeString()}</strong>
    </div>
    <div className='flex justify-between w-full items-center'>
      <div>
        <p className='text-sm font-bold'>Entrada:</p>
        <p className="text-xs text-gray-400">{formatDateWithHours(new Date(arrivalDate))}</p>
      </div>
      <div>
        <p className='text-sm font-bold' >Salida:</p>
        <p className="text-xs text-gray-400"> {formatDateWithHours(new Date(departureDate))}</p>
      </div>
      <p className="text-xs text-gray-400">{timeLimit} horas</p>
    </div>
  </div>
);

export const ReservationRealTime = ({ motelId }: ViewAndAccessReservationProps) => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingScroll, setLoadingScroll] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const fetchReservations = useCallback(async () => {
    await sleep(1);
    // const data = await getReservationInRealTime({ motelId, page, limit: 10 });
    // if (data.ok && data.totalCount !== undefined) {
    //   setReservations((prev) => {
    //     const existingReservations = new Set(prev.map((r) => r.id));
    //     const newReservations = data.reservations.filter((r) => !existingReservations.has(r.id));
    //     return [...prev, ...newReservations];
    //   });
    //   setHasMore(data.reservations.length === 10);
    // }
    setLoadingScroll(false);
    setLoading(false)
  }, [motelId, page]);

  useEffect(() => {
    fetchReservations();
  }, [fetchReservations]);

  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
    });

    const channel = pusher.subscribe('reservations');
    channel.bind('new-reservation', (newReservation: Reservation) => {
      setReservations(prev => [newReservation, ...prev]);
    });

    return () => {
      pusher.unsubscribe('reservations');
    };
  }, [motelId]);


  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const element = event.currentTarget;
    const isAtBottom = element.scrollHeight - element.scrollTop <= element.clientHeight + 10;

    if (isAtBottom && !loadingScroll && hasMore) {
      setLoadingScroll(true);
      setPage(prevPage => prevPage + 1);
    }
  };

  return (
    <div className="rounded-xl border bg-white p-6 pb-10 text-gray-900">
      <p className="text-lg font-bold text-gray-900">Actividad en tiempo real</p>
      <div ref={containerRef} className="mt-5 h-72 px-2 custom-scrollbar-table overflow-y-auto" onScroll={handleScroll}>
        {
          loading
            ? (
              <>
                <SkeletonReservationRealTime />
              </>
            ) : (
              reservations.length > 0
                ? (
                  <>
                    {reservations.map((reservation) => (
                      <ReservationItem
                        key={reservation.id}
                        id={reservation.id}
                        title={reservation.title}
                        arrivalDate={reservation.arrivalDate}
                        departureDate={reservation.departureDate}
                        timeLimit={reservation.timeLimit}
                        executedDate={reservation.executedDate}
                      />
                    ))}
                    {loadingScroll && loadingScroll && <p className="text-center flex justify-center gap-3 text-gray-400">
                      <svg className="h-5 w-5 animate-spin text-blue-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" ></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Cargando más reservas...
                    </p>}
                    {!hasMore && reservations.length > 0 && (
                      <p className="text-center text-gray-400">No hay más reservas disponibles.</p>
                    )}
                  </>
                ) : (
                  <>
                    <div className="flex flex-col rounded-xl border-2 border-blue-500 bg-blue-100 text-center ">
                      <div className="relative flex flex-1 flex-col justify-between p-6 lg:py-7 lg:px-2">
                        <div className="flex-1">
                          <blockquote className="flex-1">
                            <p className="leading-relaxed text-blue-900">
                              Actualmente no hay reservas registradas. Te mostraremos en tiempo real cuando se realicen nuevas reservas.
                            </p>
                          </blockquote>
                        </div>
                      </div>
                    </div>
                  </>
                )
            )
        }
      </div>
    </div>
  );
};

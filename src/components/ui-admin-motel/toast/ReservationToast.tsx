'use client';

import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { FaBell, FaCalendarCheck } from 'react-icons/fa';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import clsx from 'clsx';

export default function ReservationToast() {
  const pathname = usePathname();

  useEffect(() => {
    const handleNewReservation = (event: Event) => {
      toast.custom((t) => {
        return (
          <div
            className={`${t.visible ? 'animate-enter' : 'animate-leave'
              } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
          >
            <div className="flex-1 w-0 p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 pt-0.5">
                  <FaCalendarCheck className="h-10 w-10 text-blue-500" />
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    Nueva solicitud de reserva
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    Tienes una nueva reserva pendiente de revisión
                  </p>
                </div>
              </div>
            </div>
            <div className={
              clsx(
                {
                  "flex flex-col justify-center border-l border-gray-200": pathname !== '/admin/dashboard-partner-motel/reservation-requests',
                  "flex border-l border-gray-200": pathname === '/admin/dashboard-partner-motel/reservation-requests'
                }
              )
            }>
              {pathname !== '/admin/dashboard-partner-motel/reservation-requests' && (
                <Link
                  href="/admin/dashboard-partner-motel/reservation-requests"
                  className="w-full border border-transparent rounded-none p-4 flex items-center justify-center text-sm font-medium text-green-600 hover:text-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  Ver
                </Link>
              )}
              <button
                onClick={() => toast.dismiss(t.id)}
                className="w-full border-t border-gray-100 rounded-none p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Cerrar
              </button>
            </div>
          </div>
        );
      }, {
        duration: Infinity,
        position: 'top-right',
        icon: <FaBell className="text-yellow-500" />,
      });
    };

    window.addEventListener('newReservation', handleNewReservation);

    return () => {
      window.removeEventListener('newReservation', handleNewReservation);
    };
  }, [pathname]);

  return null;
}

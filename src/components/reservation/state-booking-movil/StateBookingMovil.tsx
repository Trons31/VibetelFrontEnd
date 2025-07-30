'use client';

import React, { useEffect, useState } from 'react'
import { Reservation, ReservationApi } from '@/interfaces/reservation.interface';
import { motion } from 'framer-motion';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { IoCheckmark } from 'react-icons/io5';

interface Props {
  reservation: ReservationApi;
}

export const StateBookingMovil = ({ reservation }: Props) => {

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };


  return (
    <div className='flex md:hidden mt-10 pt-10' >

      <div className='md:rounded-lg w-full rounded-md bg-white shadow-md h-fit' >

        <div className="md:rounded-t-md px-2 w-full h-10 rounded-t-md bg-gray-300 " >
          <p className='pt-2 text-center text-xl font-medium' >Estado actual</p>
        </div>

        <div className='mt-5 ml-2 mb-5' >
          <ul className="relative flex w-full flex-col space-y-5 justify-between  sm:items-center">
            <li className="flex items-center space-x-3  text-left p-2 sm:space-x-4">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white"
              >
                <IoCheckmark className="h-4 w-4" />
              </div>
              <span className="font-semibold text-xs text-gray-900">Habitación reservada</span>
            </li>
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden space-y-5"
            >
              {
                reservation.ServiceItem?.canceledReservation === false && reservation.ServiceItem?.serviceTaken === false
                && (
                  <li className="flex items-center space-x-4  p-2 text-left ">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2" >2</div>
                    <span className="font-semibold text-xs  text-gray-900">En espera</span>
                  </li>
                )
              }


              {
                reservation.ServiceItem?.canceledReservation
                &&
                (
                  <li className="flex items-center space-x-3 text-left p-2 sm:space-x-4">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-xs font-semibold text-white"
                    >
                      <IoCheckmark className="h-4 w-4" />
                    </div>
                    <span className="font-semibold text-xs text-gray-900">Servicio cancelado</span>

                  </li>
                )
              }


              {
                reservation.ServiceItem?.status === "no_iniciado"
                &&
                (
                  <li className="flex items-center space-x-3 text-left p-2 sm:space-x-4">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-black text-xs font-semibold text-white"
                    >
                      <IoCheckmark className="h-4 w-4" />
                    </div>
                    <span className="font-semibold text-xs text-gray-900">Servicio cancelado automáticamente</span>

                  </li>
                )
              }

              {
                reservation.ServiceItem?.serviceTaken
                && (
                  < li className="flex items-center space-x-3 text-left p-2 sm:space-x-4">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white"
                    >
                      <IoCheckmark className="h-4 w-4" />
                    </div>
                    <span className="font-semibold text-xs text-gray-900">En espera</span>

                  </li>
                )
              }


              {
                reservation.ServiceItem?.canceledReservation === false && reservation.ServiceItem?.status !== "no_iniciado"
                && (
                  reservation.ServiceItem?.serviceTaken === false && reservation.ServiceItem.serviceCompleted === false &&
                  (
                    <li className="flex items-center  mt-2 md:mt-0  p-2 space-x-3  sm:space-x-4">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white" >3</div>
                      <span className="font-semibold text-xs text-gray-500">Servicio iniciado</span>
                    </li>
                  )
                )
              }

              {
                reservation.ServiceItem?.serviceTaken && reservation.ServiceItem.serviceCompleted == false
                && (
                  <li className="flex items-center space-x-4 p-2 text-left ">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-1" >3</div>
                    <span className="font-semibold text-xs  text-gray-900">Servicio iniciado</span>
                  </li>
                )
              }


              {
                reservation.ServiceItem?.serviceTaken === true && reservation.ServiceItem.serviceCompleted === false
                &&
                (
                  <li className="flex items-center  mt-2 md:mt-0 p-2  space-x-3  sm:space-x-4">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white" >4</div>
                    <span className="font-semibold text-xs text-gray-500">Servicio finalizado</span>
                  </li>
                )
              }

              {
                reservation.ServiceItem?.canceledReservation === false && reservation.ServiceItem?.status !== "no_iniciado"
                && (
                  reservation.ServiceItem?.serviceTaken === false && reservation.ServiceItem.serviceCompleted === false
                  &&
                  (
                    <li className="flex items-center  mt-2 md:mt-0 p-2  space-x-3  sm:space-x-4">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white" >4</div>
                      <span className="font-semibold text-xs text-gray-500">Servicio finalizado</span>
                    </li>
                  )
                )
              }

              {
                reservation.ServiceItem?.serviceTaken && reservation.ServiceItem.serviceCompleted &&
                (
                  <>
                    <li className="flex items-center space-x-3 text-left p-2 sm:space-x-4">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white"
                      >
                        <IoCheckmark className="h-4 w-4" />
                      </div>
                      <span className="font-semibold text-xs text-gray-900">Servicio iniciado</span>

                    </li>
                    <li className="flex items-center space-x-3 text-left p-2 sm:space-x-4">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-xs font-semibold text-white"
                      >
                        <IoCheckmark className="h-4 w-4" />
                      </div>
                      <span className="font-semibold text-xs text-gray-900">Servicio finalizado</span>

                    </li>
                  </>
                )
              }

            </motion.div>
          </ul>
          <div className="flex justify-center mt-4">
            <button onClick={toggleExpand} className="focus:outline-none">
              {isExpanded ? <FaChevronUp size={20} /> : <FaChevronDown size={20} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

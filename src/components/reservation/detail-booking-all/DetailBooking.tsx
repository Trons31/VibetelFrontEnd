'use client';

import React, { useState } from 'react'
import { ModalPopup, RoomImage } from '@/components';
import { ReservationApi } from '@/interfaces/reservation.interface';
import { currencyFormat, formatDateWithHours } from '@/utils';
import { FaQuestionCircle } from 'react-icons/fa';
import { addMinutes, format } from 'date-fns';

interface Props {
  reservation: ReservationApi;
}


export const DetailBooking = ({ reservation }: Props) => {
  const [isModalOpenExtraservices, setIsModalOpenExtraservices] = useState(false);


  const arrivalDate = new Date(reservation.ServiceItem?.arrivalDate!);
  const minutesToWait = reservation.ServiceItem?.room.motel.MotelConfig.timeAwaitTakeReservation || 0;

  // Calcula la hora máxima de espera
  const maxWaitTime = addMinutes(arrivalDate, minutesToWait);
  const formattedMaxWaitTime = format(maxWaitTime, 'h:mm a');

  return (
    <div >

      <div className='py-6 mt-5' >

        <div className='flex justify-between items-center' >
          <p className='font-bold text-lg' >Reservacion</p>
          <p className='font-normal text-sm' >Reserva protegida</p>
        </div>

        <div className='mt-3' >
          <div className='grid grid-cols md:grid-cols-2 space-y-4 md:space-y-0' >
            <div>
              <p className='font-semibold text-md' >Fecha de entrada</p>

              <p>{formatDateWithHours(new Date(reservation.ServiceItem?.arrivalDate!))}</p>

            </div>
            <div>
              <p className='font-semibold text-md' >Fecha de salida</p>

              <p>{formatDateWithHours(new Date(reservation.ServiceItem?.departureDate!))}</p>

            </div>
          </div>

          <div className='grid grid-cols md:grid-cols-2 space-y-2 md:space-y-0 mt-4' >
            <div>
              <p className='font-semibold text-md' >Tiempo de servicio</p>
              <p>{reservation.ServiceItem?.timeUsage} horas</p>
            </div>
            <div>

              <span className='flex items-center font-bold gap-2' >SobreCosto
                <button
                  type="button"
                  onClick={() => setIsModalOpenExtraservices(true)}
                >
                  <FaQuestionCircle />
                </button>

                <ModalPopup
                  title="¿Qué son los servicios adicionales?"
                  isOpen={isModalOpenExtraservices}
                  onClose={() => setIsModalOpenExtraservices(false)}
                >
                  <div>
                    <p className="font-bold">Información Importante para Nuestros usuarios</p>
                    <p className="mt-2">
                      Los servicios adicionales son prestaciones extra que algunos moteles ofrecen para mejorar la experiencia de sus servicioss. Los servicios adicionales ofrecen atención de calidad garantizada al cliente y asistencia en el uso del servicio para cualquier necesidad que puedan tener tus usuarios
                    </p>
                    <p className="mt-2">
                      Los costos de estos servicios son determinados por cada motel y pueden variar. Se cobran para cubrir los gastos adicionales asociados a proporcionar un servicio más completo y de mayor calidad.
                    </p>
                    <p className="mt-2">
                      Le recomendamos consultar con el motel específico donde desea hospedarse para obtener detalles sobre los servicios adicionales disponibles y sus respectivos costos.
                    </p>
                  </div>
                </ModalPopup>



              </span>
              <span className='text-right'> {currencyFormat(reservation.ServiceItem?.surchargeAmount!)} </span>
            </div>
          </div>

        </div>

        <div className='border-l-8 mt-4 border-purple-600 bg-purple-200 px-4 py-2 rounded-l-lg' >
          <p className='font-bold text-lg' >Importante</p>
          <p className='mt-2 text-sm font-medium' >El motel <strong>{reservation.ServiceItem?.room.motel.title}</strong> tiene un plazo de espera despues de haber iniciado el serivicio de <strong>{reservation.ServiceItem.room.motel.MotelConfig.timeAwaitTakeReservation} minutos</strong> es decir que si no tomas a tiempo tu servicio el motel te esperara hasta las <strong>{formattedMaxWaitTime}</strong> despues de esta hora tu reserva sera cancelada automaticamente </p>
        </div>
      </div>
    </div>
  )
}

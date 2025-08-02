'use client';
import React, { useCallback, useEffect, useState } from 'react'
import { DetailAddTimeService } from '@/components';
import { Service } from '@/interfaces';
import { currencyFormat, formatDateWithHours } from '@/utils';
import { AnimatePresence, motion } from 'framer-motion'
import { FaCheck, FaCheckDouble } from 'react-icons/fa';
import { IoIosArrowForward } from 'react-icons/io';
import { IoTimeSharp } from 'react-icons/io5';
import { MdCancel } from 'react-icons/md';
import { RiCloseCircleFill } from 'react-icons/ri';

interface Props {
  serviceId: string;
  nameRoom: string;
  isOpen: boolean;
  onClose: () => void;
}

export const SheedDetailService = ({ isOpen, onClose, nameRoom, serviceId }: Props) => {

  const [service, setService] = useState<Service | undefined>();
  const [isLoading, setisLoading] = useState(true);

  console.log(service)


  const fetchReservations = useCallback(async () => {
    setisLoading(true);
    // const data = await getServiceById(serviceId);
    // if (data.ok) {
    //   const { service } = data;
    //   setService(service);
    // }
    setisLoading(false);
  }, [serviceId]);

  useEffect(() => {
    if (serviceId && isOpen) {
      fetchReservations();
    }
  }, [serviceId, isOpen]);


  useEffect(() => {
    if (isOpen) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'auto';
    }

    return () => {
      document.body.style.overflowY = 'auto';
    };
  }, [isOpen]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const onCloseSheed = () => {
    onClose();
  }


  const calculateDuration = (startDate: Date, endDate: Date) => {
    const diff = endDate.getTime() - startDate.getTime(); // Diferencia en milisegundos

    const hours = Math.floor(diff / (1000 * 60 * 60)); // Convertir a horas
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)); // Minutos restantes

    let result = "";

    if (hours > 0) {
      result += `${hours}h `;
    }
    if (minutes > 0) {
      result += `${minutes}m`;
    }

    return result.trim();
  }

  return (
    <>
      <AnimatePresence>
        {
          isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className='fixed inset-0 z-30 flex items-center justify-end bg-black bg-opacity-50 backdrop-blur-sm'
              onClick={handleBackdropClick}
            >

              <div className='bg-white w-7/12 h-screen ' >
                <button
                  onClick={onCloseSheed}
                  className="flex items-center w-full gap-2 justify-between p-4 bg-blue-600 hover:bg-blue-700  transition-all duration-200 text-white"
                >
                  {
                    isLoading
                      ? (
                        "Cargando..."
                      ) : (
                        <h2 className="text-lg font-semibold ">
                          {
                            service?.type === "reservation"
                              ? "Reserva"
                              : "Servicio"
                          }
                          : {nameRoom}
                        </h2>
                      )
                  }

                  <IoIosArrowForward className="h-5 w-5" />
                </button>
                <div className='mb-20 h-full custom-scrollbar overflow-y-scroll pb-20'>
                  {
                    isLoading
                      ? (
                        <>
                          <div className='flex justify-center h-full gap-5 py-16 items-center' >
                            <svg className="h-5 w-5 animate-spin text-blue-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" ></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Cargando informacion...
                          </div>
                        </>
                      ) :
                      (
                        <>
                          <div className='p-6' >

                            <div className='p-4 border border-gray-200 rounded-md' >
                              <div className='flex justify-between items-center' >
                                <p className='font-bold text-lg' >
                                  {
                                    service?.type === "reservation"
                                      ? "Reserva"
                                      : "Servicio"
                                  }
                                </p>
                                <p className='text-md' >Realizada: {formatDateWithHours(service?.createdAt!)}</p>
                              </div>

                              <div className="mt-1 mb-1 border border-gray-300 border-dashed" />

                              <div className='grid grid-cols-2 mt-4' >
                                <div>
                                  <p className='font-bold text-sm' >Fecha de entrada</p>
                                  <p className='text-md' >{formatDateWithHours(service?.ServiceItem?.arrivalDate!)}</p>
                                </div>

                                <div>
                                  <p className='font-bold text-sm' >Fecha de salida</p>
                                  <p className='text-md' >{formatDateWithHours(service?.departureDate!)}</p>
                                </div>
                              </div>

                              <div className="mt-1 mb-1 border border-gray-300 border-dashed" />

                              <div className='flex justify-end mt-1' >
                                <p className='text-xs' >Pago realizado: {currencyFormat(service?.total!)}</p>
                              </div>

                            </div>



                            <div className='p-4 border border-gray-200 rounded-md mt-4' >
                              <div className='flex justify-between items-center py-1' >
                                <p className='font-bold text-lg' >Detalle
                                  {
                                    service?.type === "reservation"
                                      ? "de la reserva"
                                      : "del servicio"
                                  }</p>
                                {
                                  service?.ServiceItem?.status === "en_espera" &&
                                  (
                                    <div className='flex gap-2 items-center bg-yellow-500 rounded-lg  px-4 py-1' >
                                      <IoTimeSharp className='h-4 w-4 text-white' />
                                      <p className='text-sm text-white ' >Reserva en espera</p>
                                    </div>
                                  )

                                }

                                {
                                  service?.ServiceItem?.status === "cancelado" &&
                                  (
                                    <div className='flex gap-2 items-center bg-red-600 rounded-lg  px-4 py-1' >
                                      <MdCancel className='h-4 w-4 text-white' />
                                      <p className='text-sm text-white font-semibold' >Reserva cancelada</p>
                                    </div>
                                  )

                                }

                                {
                                  service?.ServiceItem?.status === "iniciado" &&
                                  (
                                    <div className='flex gap-2 items-center bg-blue-600 rounded-lg  px-4 py-1' >
                                      <FaCheck className='h-4 w-4 text-white' />
                                      <p className='text-sm text-white ' > {
                                        service?.type === "reservation"
                                          ? "Reserva"
                                          : "Servicio"
                                      }
                                        {
                                          service?.type === "reservation"
                                            ? " iniciada"
                                            : " iniciado"
                                        }</p>
                                    </div>
                                  )

                                }

                                {
                                  service?.ServiceItem?.status === "completado" &&
                                  (
                                    <div className='flex gap-2 items-center bg-green-600 rounded-lg  px-4 py-1' >
                                      <FaCheckDouble className='h-4 w-4 text-white' />
                                      <p className='text-sm text-white ' > {
                                        service?.type === "reservation"
                                          ? "Reserva completada"
                                          : "Servicio completado"
                                      }</p>
                                    </div>
                                  )

                                }

                                {
                                  service?.ServiceItem?.status === "no_iniciado" &&
                                  (
                                    <div className='flex gap-2 items-center bg-gray-600 rounded-lg  px-4 py-1' >
                                      <RiCloseCircleFill className='h-4 w-4 text-white' />
                                      <p className='text-sm text-white ' >Reserva no iniciada</p>
                                    </div>
                                  )

                                }

                              </div>

                              <div className="mt-1 mb-1 border border-gray-300 border-dashed" />
                              {
                                service?.ServiceItem?.serviceTaken === false && service.ServiceItem.canceledReservation === false && service.ServiceItem.status === "en_espera"
                                  ? (
                                    <div className='mt-4 mb-4'>
                                      <p className='text-sm mb-1 underline'>Reserva en espera</p>
                                      <p className='text-md'>
                                        La reserva está programada para iniciar el <strong>{formatDateWithHours(service.ServiceItem.arrivalDate)}</strong>. El usuario debe presentarse 10 minutos antes del inicio de la reserva.
                                      </p>
                                    </div>

                                  ) : (
                                    service?.ServiceItem?.canceledReservation
                                      ? (
                                        <>
                                          <div className='mt-4  mb-4' >
                                            <p className='text-sm mb-1 underline'>Cancelación de reserva</p>
                                            <p className='text-md'>
                                              La reserva fue cancelada por el usuario el <strong>{formatDateWithHours(service.ServiceItem.dateCanceledReservation!)}</strong>.
                                            </p>
                                          </div>
                                        </>
                                      ) : (
                                        service?.ServiceItem?.serviceTaken && !service?.ServiceItem?.serviceCompleted
                                          ? (
                                            <>
                                              <div className='mt-4 mb-4'>
                                                <p className='text-sm mb-1 underline'>Servicio iniciado</p>
                                                <p className='text-md'>
                                                  Este servicio fue iniciado exitosamente el <strong>{formatDateWithHours(service.ServiceItem.dateTaken!)}</strong>.
                                                </p>
                                              </div>

                                            </>
                                          ) : (
                                            service?.ServiceItem?.serviceCompleted ? (
                                              <div className='mt-4 mb-4'>
                                                <p className='text-sm mb-1 underline'>
                                                  {
                                                    service?.type === "reservation"
                                                      ? "Reserva completada"
                                                      : "Servicio completado"
                                                  }
                                                </p>
                                                <p className='text-md'>
                                                  {
                                                    service?.type === "reservation"
                                                      ? "Esta reserva"
                                                      : "Este servico"
                                                  } se completó exitosamente el <strong>{formatDateWithHours(service.ServiceItem.dateComplete!)}</strong>.
                                                </p>
                                              </div>
                                            ) : (
                                              <div className='mt-4 mb-4'>
                                                <p className='text-sm mb-1 underline'>Reserva no iniciada</p>
                                                <p className='text-md '>
                                                  Esta reserva no fue iniciada debido a que el usuario no tomó el servicio a tiempo.
                                                  Como resultado, la reserva fue cancelada automáticamente para liberar la disponibilidad de la habitación.
                                                </p>
                                              </div>

                                            )
                                          )
                                      )
                                  )
                              }

                              {
                                service?.ServiceItem?.dateComplete && service.ServiceItem.dateTaken && (
                                  <div className='mt-4 mb-4'>
                                    <p className='text-sm mb-1 underline'>Duración del servicio</p>
                                    <p className='text-md'>
                                      <strong>Hora de entrada:</strong> {formatDateWithHours(service.ServiceItem.dateTaken)}
                                    </p>
                                    <p className='text-md'>
                                      <strong>Hora de salida:</strong> {formatDateWithHours(service.ServiceItem.dateComplete)}
                                    </p>
                                    <p className='text-md'>
                                      <strong>Duración:</strong>{" "}
                                      {calculateDuration(service.ServiceItem.dateTaken, service.ServiceItem.dateComplete)}
                                    </p>
                                  </div>
                                )
                              }

                              <DetailAddTimeService
                                serviceId={service?.ServiceItem?.id!}
                              />

                              <div className="mt-1 mb-1 border border-gray-300 border-dashed" />

                              <div className='flex justify-end mt-1' >
                                <p className='text-xs' >Actulizado: {formatDateWithHours(service?.ServiceItem?.updatedAt!)}</p>
                              </div>

                            </div>

                            <div className='p-4 border border-gray-200 rounded-md mt-4' >
                              <div className='flex justify-between items-center' >
                                <div>
                                  <p className='font-bold text-lg' >Habitacion: {service?.ServiceItem?.title}</p>
                                  {
                                    service?.ServiceItem?.promoPrice && (
                                      <p className='p-2 bg-blue-600 text-white rounded-full text-xs' >Habitacion en promocion</p>
                                    )
                                  }
                                </div>
                                <p className='text-md' >Nro° {service?.ServiceItem?.roomNumber}</p>
                              </div>

                              <div className="mt-1 mb-1 border border-gray-300 border-dashed" />

                              <div className='grid grid-cols-2 mt-4' >
                                <div>
                                  <p className='font-bold text-sm' >Precio</p>
                                  <p className='text-md' >{currencyFormat(service?.ServiceItem?.price!)}</p>
                                </div>

                                {
                                  service?.ServiceItem?.promoPrice && (
                                    <div>
                                      <p className='font-bold text-sm' >Precio de promocion</p>
                                      <p className='text-md' >{currencyFormat(service?.ServiceItem.promoPrice!)}</p>
                                    </div>
                                  )
                                }
                              </div>
                              <div className="mt-1 mb-1 border border-gray-300 border-dashed" />
                              <div className='flex justify-end mt-1' >
                                <p className='text-xs' >Duracion: {service?.ServiceItem?.timeLimit} hrs</p>
                              </div>
                            </div>

                          </div>
                        </>
                      )
                  }

                </div>
              </div>

            </motion.div >
          )
        }
      </AnimatePresence >
    </>
  )
}

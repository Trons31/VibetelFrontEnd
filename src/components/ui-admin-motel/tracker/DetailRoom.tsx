'use client';

import { roomInSerciceDetailAdmin, roomNextSerciceDetailAdmin, Service } from '@/interfaces';
import { formatTime, formatTimeWithAmPm, sleep } from '@/utils';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { IoIosArrowForward, IoMdCalendar } from 'react-icons/io';
import { CountdownTimer } from '../count-down-timer/CoundDownTimer';
import { FaChevronDown, FaChevronUp, FaClock } from 'react-icons/fa';
import Pusher from 'pusher-js';
import clsx from 'clsx';
import toast, { Toaster } from 'react-hot-toast';
import { RiLoginCircleFill } from 'react-icons/ri';
import { AddTimeService } from '@/components';
import { MdMoreTime } from 'react-icons/md';

interface Props {
  serviceId: string;
  isOpen: boolean;
  onClose: () => void;
}

export const DetailRoom = ({ isOpen, onClose, serviceId }: Props) => {
  const [isLoading, setisLoading] = useState(true);
  const [loadingAddTime, setLoadingAddTime] = useState(true);
  const [isTimeExtensionAvailable, setIsTimeExtensionAvailable] = useState(false);
  const [serviceAddTime, setServiceAddTime] = useState<Service>();
  const [buttonLoading, setButtonLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const [currentService, setCurrentService] = useState<roomInSerciceDetailAdmin | null>(null);
  const [nextReservation, setNextReservation] = useState<roomNextSerciceDetailAdmin | null>(null);

  useEffect(() => {
    setisLoading(true);
    setNextReservation(null);
    const fetchReservationDetails = async () => {
      // try {
      //   const { currentReservationReturn, nextReservationReturn } = await detailRoomInService(serviceId);
      //   setCurrentService(currentReservationReturn);
      //   setNextReservation(nextReservationReturn);
      //   setisLoading(false);
      // } catch (error) {
      //   toast.error("Ups! error al obtener la informacion del servicio");
      //   setisLoading(false);
      // }
    };


    if (serviceId && isOpen) {
      fetchReservationDetails();
    }
  }, [serviceId, isOpen]);


  useEffect(() => {
    setLoadingAddTime(true);
    if (!currentService) return;
    const fetchData = async () => {
      // try {
      //   const { service } = await getServiceById(currentService?.id!);
      //   setServiceAddTime(service);
      //   setIsTimeExtensionAvailable(true);
      //   setLoadingAddTime(false);
      // } catch (error) {
      //   toast.error("Ups! no esta disponible la opcion para adicionar mas tiempo al servicio");
      //   setLoadingAddTime(false);
      // }
    };

    if (currentService) {
      fetchData();
    }
  }, [currentService]);

  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
    });

    const channel = pusher.subscribe('rooms');

    channel.bind('add-time-room', (addTimeRoom: roomInSerciceDetailAdmin) => {
      setCurrentService((prev) => prev ? { ...prev, departureDate: addTimeRoom.departureDate } : null);

    });

    return () => {
      pusher.unsubscribe('rooms');
    };
  }, []);

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

  const onCloseButton = () => {
    onClose();
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const endService = async () => {
    setButtonLoading(true);

    // const resp = await endServiceByMotel(currentService?.id!);
    // if (resp.ok) {
    //   toast.success("Servicio finalizado correctamente");
    //   setButtonLoading(false);
    //   await sleep(1);
    //   window.location.reload();
    // } else {
    //   toast.success("Error al finalizar el servicio");
    //   setButtonLoading(false);
    // }
  }

  return (
    <>

      <Toaster
        position="top-right"
        reverseOrder={false}
      />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className='fixed inset-0 z-30 flex items-center justify-end bg-black bg-opacity-50 backdrop-blur-sm'
            onClick={handleBackdropClick}
          >
            <div className='bg-white w-5/12 h-screen'>
              <button
                onClick={onCloseButton}
                className="flex items-center w-full gap-2 justify-between p-4 bg-blue-600 hover:bg-blue-700  transition-all duration-200 text-white"
              >
                <h2 className="text-lg font-semibold capitalize">
                  {
                    isLoading
                      ? "Cargando..."
                      : `Habitacion: ${currentService?.room}`
                  }
                </h2>
                <IoIosArrowForward className="h-5 w-5" />
              </button>
              <div className='mb-2 h-full custom-scrollbar overflow-y-scroll pb-10'>
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
                    ) : (
                      <>
                        <div className='' >
                          <div className='mt-3 px-8'  >
                            <div className='flex justify-between py-3 items-start' >
                              <div>
                                <p className='font-bold text-xl text-black' >Servicio actual</p>
                                <div className='block items-center mt-2 space-y-2' >
                                  {
                                    currentService?.type === "noReservation"
                                      ? (
                                        <div className='flex justify-start items-center gap-2 bg-gray-200 rounded py-1 px-2' >
                                          <p className='text-xs' >Servicio sin reserva</p>
                                          <RiLoginCircleFill className='h-4 w-4 text-gray-700' />
                                        </div>
                                      ) : (
                                        <div className='flex justify-start items-center gap-2 bg-gray-200 rounded py-1 px-2' >
                                          <p className='text-xs' >Servicio con reserva</p>
                                          <IoMdCalendar className='h-4 w-4 text-gray-700' />
                                        </div>
                                      )
                                  }

                                  {
                                    currentService?.totalAddTime! > 0
                                    && (
                                      <div className="flex justify-start gap-2 bg-gray-200  py-1 px-2 rounded ">
                                        <p className='text-xs' > Reserva extendia {formatTime(currentService?.totalAddTime!)}</p>
                                        <MdMoreTime className='h-4 w-4 text-gray-700' />
                                      </div>
                                    )
                                  }
                                </div>
                              </div>

                              <button
                                onClick={endService}
                                disabled={buttonLoading}
                                className={
                                  clsx(
                                    {
                                      "mt-1 w-fit px-2 py-1 rounded-md bg-red-600 hover:bg-red-700 text-white": !buttonLoading,
                                      "mt-1 flex justify-center gap-2 items-center w-fit px-2 py-1 rounded-md bg-red-600 hover:bg-red-700 text-white cursor-not-allowed": buttonLoading
                                    }
                                  )}>

                                {
                                  buttonLoading &&
                                  (<svg className="h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" ></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                  </svg>)
                                }
                                {
                                  buttonLoading
                                    ? "Cargando..."
                                    : "Finalizar servicio"
                                }

                              </button>
                            </div>

                            <div className="mt-1 mb-1 border border-gray-300 border-dashed" />
                            <div className='flex justify-between py-2 items-center' >
                              <div>
                                <p className="text-lg font-medium">Habitación: {currentService?.room}
                                </p>
                                <p className="text-md text-gray-500">Hora de entrada: {formatTimeWithAmPm(currentService?.dateTakenReservation!)}</p>
                                <p className="mb-4 text-md text-gray-500">Hora de salida: {formatTimeWithAmPm(new Date(currentService?.departureDate!))}</p>
                              </div>
                              <div className='flex gap-2 items-center' >
                                <p className='text-lg font-bold' >Nro°</p>
                                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-600 text-md font-semibold text-white" >{currentService?.roomNumber}</div>
                              </div>
                            </div>

                            <div className="mt-1 mb-1 border border-gray-300 border-dashed" />

                            <div className='py-2' >
                              <p className='text-lg font-semibold text-black' >Importante</p>
                              <p className='text-red-600 text-md font-semibold flex justify-start items-center gap-2' >El servicio finaliza en <CountdownTimer time={new Date(currentService?.departureDate!)} className='text-md' />
                                <FaClock className='text-red-600 ' />
                              </p>
                            </div>

                            <div className="mt-1 mb-1 border border-gray-300 border-dashed" />
                          </div>

                          <div
                            className='mt-6 px-7' >
                            <div
                              onClick={toggleExpand}
                              className={
                                clsx(
                                  {
                                    "flex py-4 justify-between cursor-pointer border border-gray-200 items-center hover:bg-gray-200 transition-all duration-200 rounded-t-lg px-2": isExpanded,
                                    "flex py-4 justify-between cursor-pointer border border-gray-200 items-center hover:bg-gray-200 transition-all duration-200 rounded-lg px-2": !isExpanded,

                                  }
                                )
                              } >
                              <p className='font-medium text-md ' >
                                Adicion de tiempo
                              </p>
                              {isExpanded ? <FaChevronUp size={16} /> : <FaChevronDown size={16} />}
                            </div>

                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
                              transition={{ duration: 0.3 }}
                              className='overflow-hidden rounded-b-md bg-gray-200'
                            >

                              {
                                currentService?.addTimes.length! > 0
                                  ? (
                                    <>
                                      {
                                        currentService?.addTimes.map((addTime, index) => (
                                          <div key={index} className='p-4  border-t border-gray-200'>

                                            <p className='text-md font-medium' >Salida extendida hasta : {formatTimeWithAmPm(new Date(addTime.newDepartureDate!))}</p>
                                            <div className='flex justify-between' >
                                              <p className="text-sm text-gray-700">Hora de adición: {formatTimeWithAmPm(new Date(addTime.createdAt))}</p>
                                              <p className="text-sm text-gray-700">Tiempo añadido: {formatTime(addTime.addTimeReservation)}</p>
                                            </div>
                                          </div>
                                        ))
                                      }
                                      <div className='flex justify-end p-4 '>
                                        <p className="text-xs text-gray-900 font-bold">Total tiempo añadido: {formatTime(currentService?.totalAddTime!)}</p>
                                      </div>
                                    </>

                                  ) : (
                                    <div className='flex justify-center p-4  bg-gray-100' >
                                      {
                                        currentService?.type === "reservation"
                                          ? (
                                            <p className='text-md text-black font-bold' >El usuario no a adicionado tiempo a este servicio</p>
                                          ) : (
                                            <p className='text-md text-black font-bold' >No se ha añadido tiempo a este servicio.</p>
                                          )
                                      }
                                    </div>
                                  )
                              }
                            </motion.div>

                          </div>

                          {
                            currentService?.type === "noReservation" && (
                              <div className='px-7 py-3 mt-4'>
                                {
                                  loadingAddTime
                                    ? (
                                      <div className='flex justify-start'>
                                        <div className="w-full h-36 mb-2 bg-gray-400 rounded-md animate-pulse"></div>
                                      </div>
                                    ) : (
                                      <AddTimeService
                                        isTimeExtensionAvailable={isTimeExtensionAvailable}
                                        service={serviceAddTime!}
                                      />
                                    )
                                }
                              </div>
                            )
                          }
                        </div>

                        <div className='p-2 pb-10 mb-20' >
                          <div className="mt-4 mb-2 border border-gray-400 border-dashed" />
                          {
                            nextReservation !== null
                              ? (
                                <div>
                                  <p className='text-md font-bold' >Siguiente servicio</p>
                                  <div className='border-l-4 mt-1 p-4 border-blue-600 bg-blue-100 rounded-l-md' >

                                    <div className='flex justify-center mb-2' >
                                      <p className='text-sm' >{nextReservation?.room}</p>
                                    </div>

                                    <div className='flex justify-between items-center' >
                                      <div>
                                        <p className='text-sm' >Hora de entrada: {formatTimeWithAmPm(nextReservation?.arrivalDate!)}</p>
                                        <p className='text-sm' >Hora de salida: {formatTimeWithAmPm(nextReservation?.departureDate!)}</p>
                                      </div>
                                      <div>
                                        <div className='flex gap-2 items-center' >
                                          <p className='text-xs font-bold' >Nro°</p>
                                          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white" >{nextReservation?.roomNumber}</div>
                                        </div>
                                      </div>
                                    </div>

                                  </div>
                                </div>
                              ) : (
                                <p className="text-center mt-2 mb-2 text-md text-gray-400">No existen mas reservas</p>
                              )
                          }
                        </div>
                      </>
                    )
                }

              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence >
    </>
  );
};

'use client';

import React, { useState, useEffect } from 'react';
import { CustomDatePicker, TimeSelector } from '@/components';
import { formatDate, formatDateWithHours } from '@/utils';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import { TbClockExclamation } from 'react-icons/tb';

interface ModalProps {
  onSelectedDate: (date: Date) => void;
}

export const DatePickerBedroom = ({ onSelectedDate }: ModalProps) => {

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>(''); // Default time
  const [dateTimeSelected, setDateTimeSelected] = useState(new Date());
  const [step, setStep] = useState<'date' | 'time'>('date');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isModalOpen]);


  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const handleConfirm = () => {
    if (selectedDate && selectedTime) {
      const dateTime = new Date(selectedDate);
      const [hours, minutes] = selectedTime.split(':').map(Number);
      dateTime.setHours(hours);
      dateTime.setMinutes(minutes);
      setDateTimeSelected(dateTime);
      onSelectedDate(dateTime);
    } else {
      toast.error('Por favor seleccione una fecha y una hora');
    }
    closeModal();
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />

      <div className="flex justify-start">
        <motion.button
          onClick={openModal}
          className="mt-4 bg-gray-300 text-xl text-gray-800 px-4 py-2 rounded-md"
        >
          {selectedDate && selectedTime
            ? (
              <div>
                <p className='text-sm' >
                  Editar fecha:
                </p>
                <p className='text-sm md:text-lg' >{formatDateWithHours(dateTimeSelected)}</p>
              </div>
            )
            : 'Seleccionar fecha'}
        </motion.button>


      </div>

      {
        isModalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={handleBackdropClick}
          >
            <div className="bg-white md:rounded-lg shadow-lg w-full md:w-1/2 lg:w-1/3 p-6 max-h-full items-center">
              <h2 className="text-lg font-semibold mb-4">
                {step === 'date' ? 'Selecciona una Fecha' : 'Selecciona una Hora'}
              </h2>
              {
                step === "time" && (
                  <div className="relative items-center w-full py-3 mx-auto">
                    <div className="p-4 border-l-4 border-purple-500 -6 rounded-r-xl bg-purple-100">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <TbClockExclamation className='h-5 w-5 text-purple-600' />
                        </div>
                        <div className="ml-3">
                          <div className="text-sm text-purple-600">
                            <p>
                              Es importante que la hora de tu dispositivo esté sincronizada
                              correctamente.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              }
              {step === 'date' ? (
                <div className="w-full flex flex-col items-center mb-4">
                  <CustomDatePicker
                    selectedDate={selectedDate}
                    onChange={(date) => {
                      setSelectedDate(date);
                      setStep('date'); // Retain date selection view even after a date is selected
                    }}
                  />
                </div>
              ) : (
                <div className="w-full mb-2">

                  <div className="flex justify-center">
                    <TimeSelector
                      date={selectedDate!}
                      selectedTime={selectedTime}
                      onChange={setSelectedTime}
                    />
                  </div>
                  <div className="w-fit mt-5">
                    <p>Fecha seleccionada</p>
                    <p className="text-lg font-bold  bg-gray-100 p-2 rounded-md">
                      {formatDate(selectedDate!)}
                    </p>
                  </div>
                </div>
              )}
              <div className="flex justify-between">
                {step === 'date' && (
                  <button
                    onClick={closeModal}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 mt-4"
                  >
                    Cancelar
                  </button>
                )}

                {step === 'time' && (
                  <button
                    onClick={() => setStep('date')} // Allow user to go back to date selection
                    className="bg-gray-300 text-gray-700 md:w-fit px-4 py-2 rounded-md hover:bg-gray-400 mt-4"
                  >
                    Volver
                  </button>
                )}

                {step === 'date' && (
                  <button
                    onClick={() => selectedDate && setStep('time')}
                    className={
                      clsx(
                        " px-4 py-2 rounded-md mt-4",
                        {
                          "bg-blue-600 text-white hover:bg-blue-700": selectedDate,
                          "bg-gray-600 text-white hover:bg-gray-700  cursor-not-allowed": !selectedDate
                        }

                      )
                    }
                    disabled={!selectedDate}
                  >
                    Siguiente
                  </button>
                )}

                {step === 'time' && (
                  <button
                    onClick={handleConfirm}
                    disabled={!selectedTime}
                    className={
                      clsx(
                        "px-4 py-2 rounded-md mt-4",
                        {
                          "bg-blue-600 text-white hover:bg-blue-700": selectedTime,
                          "bg-gray-600 text-white hover:bg-gray-700 cursor-not-allowed": !selectedTime
                        }
                      )
                    }
                  >
                    Confirmar
                  </button>
                )}
              </div>
            </div>
          </div>
        )
      }

    </>
  );
};


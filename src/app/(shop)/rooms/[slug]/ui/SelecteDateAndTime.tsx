"use client";

import { CustomDatePicker, TimeSelector } from "@/components";
import { formatDate, formatTimeWithAmPm } from "@/utils";
import clsx from "clsx";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaRegEdit } from "react-icons/fa";
import { TbClockExclamation } from "react-icons/tb";

interface Props {
  timeLimit: number;
  onSelectedDate: (date: Date,time:string,departureDate:Date) => void;
}

export const SelecteDateAndTime = ({ timeLimit, onSelectedDate }: Props) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [departureDate, setDepartureDate] = useState(
    selectedDate ? selectedDate : new Date()
  );
  const [selectedTime, setSelectedTime] = useState<string>(""); // Default time
  const [dateTimeSelected, setDateTimeSelected] = useState<Date | null>(null);
  const [step, setStep] = useState<"date" | "time">("date");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  const handleConfirm = () => {
    if (selectedDate && selectedTime) {
      const dateTime = new Date(selectedDate);
      const [hours, minutes] = selectedTime.split(":").map(Number);
      dateTime.setHours(hours);
      dateTime.setMinutes(minutes);
      setDateTimeSelected(dateTime);
      onSelectedDate(dateTime,selectedTime,departureDate);
    } else {
      toast.error("Por favor seleccione una fecha y una hora");
    }
    closeModal();
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  useEffect(() => {
    if (selectedDate && selectedTime) {
      const [hours, minutes] = selectedTime.split(":").map(Number);
      const selectedDateTime = new Date(selectedDate);
      selectedDateTime.setHours(hours);
      selectedDateTime.setMinutes(minutes);

      const departureDateTime = new Date(selectedDateTime);
      departureDateTime.setHours(departureDateTime.getHours() + timeLimit);

      // Verificar si la fecha de salida es al día siguiente
      if (departureDateTime.getDate() !== selectedDateTime.getDate()) {
        departureDateTime.setDate(selectedDateTime.getDate() + 1);
      }

      setDepartureDate(departureDateTime);
    } else {
      if (selectedDate) setDepartureDate(selectedDate);
    }
  }, [selectedDate, selectedTime, timeLimit]);

  return (
    <>
      <div className="inline-flex mt-4 w-full">
        <button
          onClick={() => {
            openModal(), setStep("date");
          }}
          className="px-4 py-2 cursor-pointer text-start w-full font-medium text-gray-900 bg-white border border-b-gray-500  border-l-gray-500  border-t-gray-500 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
        >
          <p className="text-xs font-semibold">Llegada</p>
          <div className="flex justify-between items-center mt-1">
            <p className="text-sm  font-extralight">
              {formatDate(selectedDate)}
            </p>
            <FaRegEdit className="h-4 w-4" />
          </div>
        </button>
        <div className="px-4 py-2 w-full font-medium text-gray-900 bg-white border border-gray-500 rounded-e-lg">
          <p className="text-xs font-semibold">Salida</p>
          <p className="text-sm mt-1 font-extralight">
            {formatDate(departureDate)}
          </p>
        </div>
      </div>
      {dateTimeSelected && (
        <button
          onClick={() => {
            openModal(), setStep("time");
          }}
          className="mt-2 border text-start w-full border-gray-500 px-4 py-2 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 "
        >
          <p className="text-xs font-semibold">Hora de entrada</p>
          <div className="mt-1 flex items-center justify-between" >
            <p className="text-sm  font-extralight">
              {formatTimeWithAmPm(dateTimeSelected)}
            </p>
            <FaRegEdit className="h-4 w-4" />
          </div>
        </button>
      )}

      {selectedDate && !dateTimeSelected && (
        <button
          onClick={() => {
            openModal(), setStep("time");
          }}
          className="mt-2 border text-start w-full border-gray-500 px-4 py-2 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 "
        >
          <p className="text-xs font-semibold">Hora de entrada</p>
          <div className="mt-1 flex justify-between items-center">
            <p className="text-sm font-extralight">Seleecione un hora</p>
            <FaRegEdit className="h-4 w-4" />
          </div>
        </button>
      )}

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
          onClick={handleBackdropClick}
        >
          <div className="bg-white md:rounded-lg shadow-lg w-full md:w-1/2 lg:w-1/3 p-6 max-h-full items-center">
            <h2 className="text-lg font-semibold mb-4">
              {step === "date" ? "Selecciona una Fecha" : "Selecciona una Hora"}
            </h2>
            {step === "time" && (
              <div className="relative items-center w-full py-3 mx-auto">
                <div className="p-4 border-l-4 border-purple-500 -6 rounded-r-xl bg-purple-100">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <TbClockExclamation className="h-5 w-5 text-purple-600" />
                    </div>
                    <div className="ml-3">
                      <div className="text-sm text-purple-600">
                        <p>
                          Es importante que la hora de tu dispositivo esté
                          sincronizada correctamente.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {step === "date" ? (
              <div className="w-full flex flex-col items-center mb-4">
                <CustomDatePicker
                  selectedDate={selectedDate}
                  onChange={(date) => {
                    setSelectedDate(date);
                    setStep("date"); // Retain date selection view even after a date is selected
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
              {step === "date" && (
                <button
                  onClick={closeModal}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 mt-4"
                >
                  Cancelar
                </button>
              )}

              {step === "time" && (
                <button
                  onClick={() => setStep("date")} // Allow user to go back to date selection
                  className="bg-gray-300 text-gray-700 md:w-fit px-4 py-2 rounded-md hover:bg-gray-400 mt-4"
                >
                  Volver
                </button>
              )}

              {step === "date" && (
                <button
                  onClick={() => selectedDate && setStep("time")}
                  className={clsx(" px-4 py-2 rounded-md mt-4", {
                    "bg-blue-600 text-white hover:bg-blue-700": selectedDate,
                    "bg-gray-600 text-white hover:bg-gray-700  cursor-not-allowed":
                      !selectedDate,
                  })}
                  disabled={!selectedDate}
                >
                  Siguiente
                </button>
              )}

              {step === "time" && (
                <button
                  onClick={handleConfirm}
                  disabled={!selectedTime}
                  className={clsx("px-4 py-2 rounded-md mt-4", {
                    "bg-blue-600 text-white hover:bg-blue-700": selectedTime,
                    "bg-gray-600 text-white hover:bg-gray-700 cursor-not-allowed":
                      !selectedTime,
                  })}
                >
                  Confirmar
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

"use client";

import React, { useState, useEffect } from "react";

interface TimeSelectorProps {
  date: Date; // La fecha a la que el selector se adapta
  selectedTime: string; // Hora seleccionada en formato "HH:MM"
  onChange: (time: string) => void; // Callback para actualizar la hora seleccionada
}

export const TimeSelector: React.FC<TimeSelectorProps> = ({ date, selectedTime, onChange }) => {
  const [timeOptions, setTimeOptions] = useState<string[]>([]);
  const [localSelectedTime, setLocalSelectedTime] = useState<string>(selectedTime || "");

  const currentHour = new Date().getHours();
  const currentMinute = new Date().getMinutes();

  useEffect(() => {
    const isToday = new Date().toDateString() === date.toDateString();
    const newTimeOptions: string[] = [];

    // Generar intervalos de tiempo desde las 12:00 AM hasta las 11:55 PM
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 5) {
        const hourIn12 = hour % 12 === 0 ? 12 : hour % 12;
        const period = hour < 12 ? "AM" : "PM";
        const formattedTime = `${hourIn12}:${minute.toString().padStart(2, "0")} ${period}`;

        if (
          !isToday ||
          hour > currentHour ||
          (hour === currentHour && minute >= currentMinute)
        ) {
          newTimeOptions.push(formattedTime);
        }
      }
    }

    setTimeOptions(newTimeOptions);
  }, [date]);

  // Actualizar el tiempo seleccionado local y notificar al padre
  const handleTimeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedFormattedTime = event.target.value;
    setLocalSelectedTime(selectedFormattedTime);

    const formattedTime24 = convertTo24HourFormat(selectedFormattedTime);
    onChange(formattedTime24);
  };

  // Convertir la hora seleccionada a formato de 24 horas
  const convertTo24HourFormat = (time: string): string => {
    const [hourMinute, period] = time.split(" ");
    const [hour, minute] = hourMinute.split(":");
    let hour24 = parseInt(hour, 10);

    if (period === "PM" && hour24 !== 12) {
      hour24 += 12;
    } else if (period === "AM" && hour24 === 12) {
      hour24 = 0;
    }

    return `${hour24.toString().padStart(2, "0")}:${minute}`;
  };

  return (
    <div className="flex justify-center p-4 w-full">
      <select
        className="form-select mt-1 p-3 block w-full rounded-md bg-white border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        value={localSelectedTime} // Vincular al estado local
        onChange={handleTimeChange}
      >
        <option value="" disabled>
          Hora de entrada
        </option>
        {timeOptions.map((time, index) => (
          <option key={index} value={time}>
            {time}
          </option>
        ))}
      </select>
    </div>
  );
};

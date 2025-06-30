"use client";

import React, { useState, useEffect } from "react";

interface Props {
  date: Date;
  selectedTime: string; 
  onChange: (time: string) => void; 
}

export const TimeSelector = ({ date, selectedTime, onChange }: Props) => {
  const [timeOptions, setTimeOptions] = useState<string[]>([]);
  const [localSelectedTime, setLocalSelectedTime] = useState<string>("");

  const currentHour = new Date().getHours();
  const currentMinute = new Date().getMinutes();


  const convertTo12HourFormat = (time: string): string => {
    const [hourStr, minute] = time.split(":");
    let hour = parseInt(hourStr, 10);
    const period = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 === 0 ? 12 : hour % 12;
    return `${hour}:${minute} ${period}`;
  };


  const convertTo24HourFormat = (time: string): string => {
    const [hourMinute, period] = time.split(" ");
    const [hourStr, minute] = hourMinute.split(":");
    let hour = parseInt(hourStr, 10);

    if (period === "PM" && hour !== 12) hour += 12;
    else if (period === "AM" && hour === 12) hour = 0;

    return `${hour.toString().padStart(2, "0")}:${minute}`;
  };

  useEffect(() => {
    const isToday = new Date().toDateString() === date.toDateString();
    const newTimeOptions: string[] = [];

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

    const converted = convertTo12HourFormat(selectedTime);
    if (selectedTime && !newTimeOptions.includes(converted)) {
      newTimeOptions.unshift(converted);
    }

    setTimeOptions(newTimeOptions);
    setLocalSelectedTime(converted);
  }, [date, selectedTime]);

  const handleTimeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedFormattedTime = event.target.value;
    setLocalSelectedTime(selectedFormattedTime);
    onChange(convertTo24HourFormat(selectedFormattedTime));
  };

  return (
    <div className="flex justify-center p-4 w-full">
      <select
        className="form-select mt-1 p-3 block w-full rounded-md bg-white border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        value={localSelectedTime || ""}
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

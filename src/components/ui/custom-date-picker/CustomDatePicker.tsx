'use client';

import React, { useEffect, useState } from 'react';
import { es } from 'date-fns/locale';
import { format, addDays } from 'date-fns';
import { serverTime } from '@/actions';

interface CustomDatePickerProps {
  selectedDate: Date | null;
  onChange: (date: Date) => void;
}

export const CustomDatePicker: React.FC<CustomDatePickerProps> = ({ selectedDate, onChange }) => {

  const [today, setToday] = useState<Date | null>(null);

  useEffect(() => {
    const getServerTime = async () => {
      const { colombiaTime } = await serverTime();
      setToday(new Date(colombiaTime));
    };

    getServerTime();
  }, []);

  if (!today) {
    return <div className="relative">
      <div className="flex items-center justify-center z-50">
        <div className="w-full p-4">
          {/* Mes actual */}
          <div className="text-center text-lg font-semibold capitalize text-gray-800 mb-2">
            <div className='flex justify-center'>
              <div className="w-24 h-4  bg-gray-400 rounded-sm animate-pulse"></div>
            </div>
          </div>

          <div className='flex justify-center'>
            <div className="w-72 h-36 mb-2 bg-gray-400 rounded-md animate-pulse"></div>
          </div>

        </div>
      </div>
    </div>;
  }

  const days = Array.from({ length: 8 }, (_, i) => addDays(today, i));
  const weekDays = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'];
  const month = format(today, 'MMMM yyyy', { locale: es }); // Nombre del mes y año

  // Calcular la columna inicial para el primer día (hoy)
  const startDayIndex = today.getDay();

  const handleDateSelect = (date: Date) => {
    onChange(date);
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-center z-50">
        <div className="w-full p-4">
          {/* Mes actual */}
          <div className="text-center text-lg font-semibold capitalize text-gray-800 mb-4">
            {month}
          </div>

          {/* Días de la semana */}
          <div className="grid grid-cols-7 bg-gray-300 p-3 rounded-t-lg gap-4">
            {weekDays.map((day) => (
              <div
                key={day}
                className="text-center text-xs font-medium text-gray-600"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Días del mes */}
          <div className="grid grid-cols-7 bg-gray-200 rounded-b-md gap-2 p-3">
            {Array.from({ length: startDayIndex }).map((_, i) => (
              <div key={i} />
            ))}

            {days.map((day) => (
              <button
                key={day.toISOString()}
                onClick={() => handleDateSelect(day)}
                className={`w-full py-2 rounded text-center text-lg ${selectedDate?.toDateString() === day.toDateString()
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-blue-500 hover:text-white'
                  }`}
              >
                {format(day, 'd')}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

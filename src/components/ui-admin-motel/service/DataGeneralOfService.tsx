'use client';
import React, { useEffect, useState } from 'react';
import { formatDate } from '@/utils';
import { traficServiceToday } from '@/actions';
import { ServiceData } from '@/interfaces';

interface Props {
  motelId: string;
}

export const DataGeneralOfService = ({ motelId }: Props) => {
  const [isLoading, setisLoading] = useState(true)
  const [data, setData] = useState<ServiceData>({
    totalServices: 0,
    startedServices: 0,
    completedServices: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const result = await traficServiceToday(motelId);
      setData(result);
    };

    fetchData();
    setisLoading(false);
  }, [motelId]);

  const { totalServices, completedServices, startedServices } = data;

  const calculateProgress = (count: number) => (totalServices === 0 ? 0 : (count / totalServices) * 100);

  return (
    <div className="max-w-md rounded-xl border bg-white p-6 pb-10 text-gray-900">
      <div className="flex justify-between">
        <p className="text-lg font-bold text-gray-900">Tráfico de servicios</p>
        <p className="text-lg font-medium">{formatDate(new Date())}</p>
      </div>

      <div className="mt-5">
        <p className="float-left mb-2">Reservas</p>
        {
          isLoading
            ? (
              <div className='animate-pulse float-right bg-gray-300 px-5 py-3 rounded-lg' >

              </div>
            ) : (
              <span className="float-right mb-2">{totalServices}</span>
            )

        }

        <div className="w-full border-dashed border border-gray-300 overflow-hidden rounded-full bg-gray-50"></div>
      </div>

      <div className="mt-8">
        <p className="float-left mb-2">Servicios iniciados</p>

        {
          isLoading
            ? (
              <>
                <div className='animate-pulse float-right bg-gray-300 px-5 py-3 rounded-lg' >

                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-50">
                  <div className="h-full overflow-hidden rounded-full animate-pulse bg-gray-300 transition-all duration-500" style={{ width: `100%` }}></div>
                </div>
              </>
            ) : (
              <>
                <span className="float-right mb-2">{startedServices}</span>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-50">
                  <div className="h-full overflow-hidden rounded-full animate-pulse bg-indigo-600 transition-all duration-500" style={{ width: `${calculateProgress(startedServices)}%` }}></div>
                </div>
              </>
            )
        }

      </div>

      <div className="mt-3">
        <p className="float-left mb-2">Servicios finalizados</p>

        {
          isLoading
            ? (
              <>
                <div className='animate-pulse float-right bg-gray-300 px-5 py-3 rounded-lg' >

                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-50">
                  <div className="h-full overflow-hidden rounded-full animate-pulse bg-gray-300 transition-all duration-500" style={{ width: `100%` }}></div>
                </div>
              </>
            ) : (
              <>
                <span className="float-right mb-2">{completedServices}</span>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-50">
                  <div className="h-full overflow-hidden rounded-full animate-pulse bg-indigo-600 transition-all duration-500" style={{ width: `${calculateProgress(completedServices)}%` }}></div>
                </div>
              </>
            )
        }
      </div>
    </div>
  );
};

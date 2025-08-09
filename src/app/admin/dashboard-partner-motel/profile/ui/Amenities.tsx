'use client';
import React, { useEffect, useState } from 'react';
import { AmenitiesMotelInfoApi, MotelApi } from '@/interfaces';
import clsx from 'clsx';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

interface Props {
  amenitiesMotel: AmenitiesMotelInfoApi[],
  motel: MotelApi
  accessToken: string;
}

export const Amenities = ({ amenitiesMotel, motel, accessToken }: Props) => {
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(motel.amenities.map(amenitie => amenitie.amenities.id));
  const [loading, setLoading] = useState(true);
  const [motelInfo, setMotelInfo] = useState<MotelApi>(motel);

  const toggleAmenity = async (id: string) => {
    if (!motelInfo) {
      toast.error("Información del motel no disponible");
      return;
    }

    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_ROUTE}motel/toggle-amenity/${id}`,
        {}, // body vacío
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (selectedAmenities.includes(id)) {
        setSelectedAmenities(selectedAmenities.filter(amenityId => amenityId !== id));
        toast.success("Comodidad eliminada correctamente");
      } else {
        setSelectedAmenities([...selectedAmenities, id]);
        toast.success("Comodidad agregada correctamente");
      }

    } catch (error) {
      toast.error("No se pudo actualizar la información.");
      console.error(error);
    }
  };


  useEffect(() => {
    if (motel) {
      setMotelInfo(motel);
      setLoading(false);
    }
  }, [motel]);

  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
      {loading ? (
        <div className='grid grid-cols md:grid-cols-2 gap-4'>
          <div className="mb-4 animate-pulse">
            <div className="w-full h-44 bg-gray-300 p-10 rounded-md">
              <div className="w-24 h-2 mb-2 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="w-full h-2 mb-2 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="w-full h-2 mb-2 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="w-full h-2 mb-2 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="w-full h-2 mb-2 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="w-full h-2 mb-2 bg-gray-200 rounded-full animate-pulse"></div>
            </div>
          </div>
          <div className="mb-4 animate-pulse">
            <div className="w-full h-44 bg-gray-300 p-10 rounded-md">
              <div className="w-24 h-2 mb-2 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="w-full h-2 mb-2 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="w-full h-2 mb-2 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="w-full h-2 mb-2 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="w-full h-2 mb-2 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="w-full h-2 mb-2 bg-gray-200 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      ) : (
        <div className='md:col-span-2'>
          <div className="flex flex-wrap mb-10">
            <ul className="grid w-full gap-6 md:grid-cols-2">
              {amenitiesMotel.map((amenityMotel) => (
                <li key={amenityMotel.id}>
                  <label
                    className={clsx(
                      "inline-flex h-full items-center justify-between w-full p-5 text-gray-800 bg-white border-2 border-gray-200 rounded-lg cursor-pointer",
                      {
                        'hover:border-blue-600 hover:text-blue-500': !selectedAmenities.includes(amenityMotel.id),
                        'border-red-600 text-red-600': selectedAmenities.includes(amenityMotel.id)
                      }
                    )}
                    onClick={() => toggleAmenity(amenityMotel.id)}
                  >
                    <div className="block">
                      <div className="w-full text-lg font-bold">{amenityMotel.name}</div>
                      <div className="w-full text-sm text-black">{amenityMotel.description}</div>
                    </div>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

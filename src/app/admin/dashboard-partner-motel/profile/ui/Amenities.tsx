'use client';
import React, { useEffect, useState } from 'react';
import { createOrDeleteAmenitiesMotel } from '@/actions';
import { AmenitiesMotelInfo, MotelAdmin } from '@/interfaces';
import clsx from 'clsx';
import toast, { Toaster } from 'react-hot-toast';

interface Props {
  amenitiesMotel: AmenitiesMotelInfo[],
  motel: MotelAdmin
}

export const Amenities = ({ amenitiesMotel, motel }: Props) => {
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(motel.amentiesMotelMapId);
  const [loading, setLoading] = useState(true);
  const [motelInfo, setMotelInfo] = useState<MotelAdmin>(motel);

  const toggleAmenity = async (id: string) => {
    if (!motelInfo) {
      toast.error("Información del motel no disponible");
      return;
    }

    if (selectedAmenities.includes(id)) {
      // Si el amenitie ya está seleccionado, lo deseleccionamos
   
      const response = await createOrDeleteAmenitiesMotel(id, motelInfo.id);
      if(!response.ok){
          toast.error("No se pudo actualizar la informacion.")
      }

      toast.success("Comodidad eliminada correctamente")
     
      setSelectedAmenities(selectedAmenities.filter(amenityId => amenityId !== id));
    } else {
      // Si no está seleccionado, lo agregamos a la lista de seleccionados

      const response = await createOrDeleteAmenitiesMotel(id, motelInfo.id);
      if(!response.ok){
          toast.error("No se pudo actualizar la informacion.")
      }

      toast.success("Comodidad agregada correctamente")

      setSelectedAmenities([...selectedAmenities, id]);
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
                      "inline-flex items-center justify-between w-full p-5 text-gray-800 bg-white border-2 border-gray-200 rounded-lg cursor-pointer",
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

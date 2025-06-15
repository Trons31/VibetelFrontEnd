import React from 'react'
import { FaCocktail, FaHotTub, FaPhone } from 'react-icons/fa';
import { FaCircleCheck, FaTv } from 'react-icons/fa6';
import { LuAirVent, LuTestTube } from 'react-icons/lu';

interface Props {
  amenities: string[];
}

const amenityIcons: { [key: string]: JSX.Element } = {
  "Aire acondicionado": <LuAirVent className="text-gray-700" />,
  "Tv adultos": <FaTv className="text-gray-700" />,
  "Mini bar": <FaCocktail className="text-gray-700" />,
  "Teléfono": <FaPhone className="text-gray-700" />,
  "Jacuzzi": <FaHotTub className="text-gray-700" />,
  "Tubo Pol dance": <LuTestTube className="text-gray-700" />,
};

export const Amenities = ({ amenities }: Props) => {
  return (
    <div className="" >
      <div className="w-full gap-5 md:gap-8 grid grid-cols md:grid-cols-2 ">
        {
          amenities.map(ameniti => (
            <li key={ameniti} className="flex items-center">
              {/* Mostrar el icono correspondiente, o un icono genérico si no se encuentra */}
              {amenityIcons[ameniti] || <FaCircleCheck className="text-gray-500 w-4 h-4 md:w-6 md:h-6" />}
              <p className="mx-3 text-md md:text-lg">{ameniti}</p>
            </li>
          ))
        }
      </div>
    </div>
  )
}

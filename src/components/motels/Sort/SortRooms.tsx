'use client';

import clsx from 'clsx'
import React, { useState } from 'react'
import { IoCaretDownOutline, IoCaretUp } from 'react-icons/io5'

interface Props {
  onSortByPrice: (sort: string) => void;
  onOrderMostReserved: (sort: string) => void;
}

export const SortRooms = ({ onSortByPrice, onOrderMostReserved }: Props) => {


  const [sortByPrice, setSortByPrice] = useState<'asc' | 'desc' | ''>('');

  const [orderMostReserved, setOrderMostReserved] = useState<'desc' | '' | ''>('');


  const handleOrderMostReserved = () => {
    if (orderMostReserved === 'desc') {
      setOrderMostReserved('');
      onOrderMostReserved('');
    } else {
      setOrderMostReserved('desc');
      onOrderMostReserved('desc')
    }
  }

  const handleSortByPrice = () => {
    if (sortByPrice === "asc") {
      setSortByPrice("desc")
      onSortByPrice("desc")
    } else {
      setSortByPrice("asc")
      onSortByPrice("asc")
    }
  }

  return (
    <div>
      {/*Desktop */}
      <div className='flex items-center gap-2' >
        <p className='hidden md:flex text-xs text-black md:text-lg' >Ordenar por:</p>
        <div className="inline-flex bg-none" role="group">
          <button
            onClick={handleOrderMostReserved}
            className={
              clsx(
                "inline-flex items-center px-2 md:px-4 py-2 text-xs md:text-sm font-medium  border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 ",
                {
                  "bg-gray-100 text-blue-700": orderMostReserved === "desc", // Cambia el color a gris cuando el filtro está activo
                  "bg-white text-gray-900": orderMostReserved !== "desc" // Mantén el color blanco cuando no está activo
                }
              )
            }>
            Mas reservadas
          </button>

          <button
            onClick={handleSortByPrice}
            className="inline-flex items-center px-2 md:px-4 py-2 text-xs md:text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 ">
            Precio
            <div className='flex px-2 flex-col items-center'>
              <div>
                <IoCaretUp
                  className={
                    clsx(
                      " h-2 w-2 md:h-3 md:w-3",
                      {
                        "text-blue-600": sortByPrice === 'asc'
                      }
                    )
                  }
                />
              </div>
              <div >
                <IoCaretDownOutline className={
                  clsx(
                    ' md:-mt-1 h-2 w-2 md:h-3 md:w-3', {
                    "text-blue-600": sortByPrice === 'desc'
                  }
                  )
                } />
              </div>
            </div>
          </button>
        </div>
      </div>

    </div>
  )
}

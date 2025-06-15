import React from 'react'
import { TbBedOff } from 'react-icons/tb'

export const NotFoundBedroom = () => {
    return (
        <div className='flex justify-center px-5 items-center h-screen'>
            <div className="no-file-found w-full md:w-1/2 flex flex-col items-center justify-center py-8 px-4 text-center bg-gray-200  rounded-lg shadow-md">
                <TbBedOff size={50} />
                <h3 className="text-xl font-semibold mt-4 text-gray-900 ">No se encontraron habitaciones</h3>
                <p className="text-gray-700  mt-2">
                    Lo sentimos, no hemos podido encontrar ninguna habitación que coincida con tu búsqueda.
                </p>
            </div>
        </div>
    )
}

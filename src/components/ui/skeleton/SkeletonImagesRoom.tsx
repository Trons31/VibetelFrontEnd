import React from 'react'

export const SkeletonImagesRoom = () => {
    return (
        <div className="grid grid-cols-4 grid-rows-2 gap-2 h-[350px] rounded-lg overflow-hidden">
            {/* Imagen principal grande */}
            <div className="col-span-2 row-span-2 relative">
                <div className="w-full h-full bg-gray-400 rounded-md animate-pulse"></div>
            </div>

            {/* Cuatro imágenes pequeñas en celdas separadas */}
            <div className="col-span-1 row-span-1">
                <div className="w-full h-full bg-gray-400 rounded-md animate-pulse"></div>
            </div>
            <div className="col-span-1 row-span-1">
                <div className="w-full h-full bg-gray-400 rounded-md animate-pulse"></div>
            </div>
            <div className="col-span-1 row-span-1">
                <div className="w-full h-full bg-gray-400 rounded-md animate-pulse"></div>
            </div>
            <div className="col-span-1 row-span-1">
                <div className="w-full h-full bg-gray-400 rounded-md animate-pulse"></div>
            </div>
        </div>

    )
}

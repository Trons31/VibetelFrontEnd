

export const SkeletonReservation = () => {
    return (
        <div className="bg-gray-200  animate-pulse rounded-none md:rounded-md shadow-lg border  p-4 mb-5" >

            <div className="flex justify-between items-center" >
                <div className="w-24 h-4 mb-2 bg-gray-400 rounded-full animate-pulse"></div>
                <div className="flex items-center gap-2" >
                    <div className="hidden md:block " >
                        <div className="w-24 h-4 mb-2 bg-gray-400 rounded-full animate-pulse"></div>
                    </div>
                    <div className="w-24 h-4  mb-2 bg-gray-400 rounded-full animate-pulse"></div>
                </div>
            </div>

            <div className="mt-2 border border-gray-400 border-dashed" />
            <div className='hidden p-4 md:flex justify-between items-center'>
                <div className=' w-fit' >
                    <div className='flex gap-2 items-center justify-center' >
                        <div className="w-24 h-4 mb-2 bg-gray-400 rounded-full animate-pulse"></div>

                    </div>
                    <div className='flex gap-2' >

                        <svg className="w-24 h-24 text-gray-500 animate-pulse " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                        </svg>

                        <svg className="w-24 h-24 text-gray-500 animate-pulse " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                        </svg>
                    </div>
                </div>


                <div className='grid grid-cols space-y-2 px-5' >
                    <div className="w-24 h-4 mb-2 bg-gray-400 rounded-full animate-pulse"></div>
                    <div className="w-24 h-8 mb-2 bg-gray-400 rounded-md animate-pulse"></div>
                    <div className="w-24 h-8 mb-2 bg-gray-400 rounded-md animate-pulse"></div>
                </div>

            </div>

            <div className='block md:hidden w-full' >
                <div className='flex  items-center justify-start mt-2' >
                    <div className="w-24 h-4 mb-2 bg-gray-400 rounded-full animate-pulse"></div>
                </div>
                <div className='flex gap-2' >

                    <svg className="w-24 h-24 text-gray-500 animate-pulse " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                        <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                    </svg>

                    <svg className="w-24 h-24 text-gray-500 animate-pulse " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                        <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                    </svg>

                </div>

                <div className='flex justify-end mt-3 mb-2' >
                    <div className="w-24 h-4 mb-2 bg-gray-400 rounded-full animate-pulse"></div>

                </div>
                <div className='flex justify-end gap-4' >
                    <div className="w-24 h-8 mb-2 bg-gray-400 rounded-md animate-pulse"></div>
                    <div className="w-24 h-8 mb-2 bg-gray-400 rounded-md animate-pulse"></div>
                </div>

            </div>


        </div>
    )
}

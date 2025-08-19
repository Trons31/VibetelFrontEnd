'use client';
import { useBookingStore } from "@/store";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaRegCalendarXmark } from "react-icons/fa6";

export const DeleteBooking = () => {
    const removeBooking = useBookingStore(state => state.removeBooking);
    const roomInBooking = useBookingStore(state => state.Booking);
    const { isLoading, finishLoading } = useBookingStore();
    const [transactionId, setTransactionId] = useState<string | null>(null);

    useEffect(() => {
        finishLoading();
    }, []);

    useEffect(() => {
        if (!isLoading) {
            removeBooking();
            localStorage.removeItem("persist-token-reservation");
        }
    }, [roomInBooking?.id])


    return (
        <>
            {
                isLoading
                    ? (
                        <>
                            <div className="flex-grow flex justify-center items-center">
                                <div className="px-5" >
                                    <svg className="h-5 w-5 animate-spin text-red-600 " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className='flex justify-center p-2 md:p-0'>
                                <div className='block  p-10'>
                                    <div className="flex flex-col items-center" >
                                        <FaRegCalendarXmark size={50} />
                                        <h3 className="text-md md:text-xl font-semibold mt-4 text-black">No has agregado reservas</h3>
                                        <Link href="/home"
                                            className="text-gray-800 text-center text-sm md:text-md font-medium hover:underline  "
                                        >
                                            Regresar
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </>
                    )

            }
        </>
    )
}

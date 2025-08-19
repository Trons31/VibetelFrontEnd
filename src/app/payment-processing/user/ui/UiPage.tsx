'use client';
import React, { useEffect, useState } from 'react'
import { ModalTokenExpireOrReservationNoExists, ReservationExpiryTimer, SkeletonPaymentProcessing } from '@/components';
import { useBookingStore } from '@/store';
import { redirect, useRouter } from 'next/navigation';
import { RoomInBooking } from './RoomInBooking';
import { Summary } from './Summary';

export const UiPage = () => {

    const [existRerservation, setExisitReservation] = useState(false);
    const { Booking, tokenExpire, isLoading, finishLoading } = useBookingStore();


    useEffect(() => {
        const storedEncodedToken = localStorage.getItem("persist-token-reservation");
        if (storedEncodedToken) {
            setExisitReservation(true);
        }

        finishLoading();
    }, []);


    useEffect(() => {
        if (!isLoading) {
            if (!Booking) {
                redirect("/empty");
            }
        }
    }, [isLoading])

    return (
        <>
            {
                isLoading
                    ? (
                        <>
                            <SkeletonPaymentProcessing />
                        </>
                    ) : (
                        existRerservation
                            ? (
                                <>

                                    <ReservationExpiryTimer />

                                    <div className="grid grid-cols-2 md:grid-cols-12 md:px-10 md:gap-2 pt-10 md:pt-0 pb-32 md:pb-0 md:mt-10 space-y-4 md:space-y-0 ">

                                        <div className="col-span-2 md:col-span-8 w-full" >
                                            <RoomInBooking />
                                        </div >

                                        <div className="col-span-2 md:col-span-4 w-full " >
                                            <Summary />
                                        </div>

                                    </div >
                                </>

                            ) :
                            (
                                <ModalTokenExpireOrReservationNoExists />
                            )

                    )
            }
        </>
    )
}

'use client';
import React, { useEffect } from 'react'
import { RoomInBooking } from './RoomInBooking'
import { Summary } from './Summary'
import { useBookingStore } from '@/store';
import { SkeletonPaymentProcessing } from '@/components';
import { useRouter } from 'next/navigation';

export const UiPage = () => {

    const router = useRouter();
    const { Booking, isLoading, finishLoading } = useBookingStore();


    useEffect(() => {
        finishLoading();

        if (!isLoading && !Booking) {
            router.push('/empty');
        }
    }, [isLoading, Booking?.id, router, finishLoading]);

    return (
        <>

            {
                isLoading
                    ? (
                        <>
                            <SkeletonPaymentProcessing />
                        </>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-12 md:px-10 md:gap-2 pt-5 md:pt-0 pb-32 md:pb-0 md:mt-10 space-y-4 md:space-y-0 ">

                            <div className="col-span-2 md:col-span-8 w-full" >
                                <RoomInBooking />
                            </div >

                            <div className="col-span-2 md:col-span-4 w-full " >
                                <Summary />
                            </div>

                        </div >
                    )
            }


        </>
    )
}

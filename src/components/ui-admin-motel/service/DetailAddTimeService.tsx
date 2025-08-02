'use client';

import { useState, useEffect } from "react";
import { formatDateWithHours, formatTime } from "@/utils";

interface Props {
    serviceId: string;
}

export const DetailAddTimeService = ({ serviceId }: Props) => {

    const [addTimes, setAddTimes] = useState<
        {
            id: string;
            addTimeReservation: number;
            newDepartureDate: Date | null;
            total: number;
            createdAt: Date;
            serviceItemId: string;
        }[]
    >([]);

    const getAddTimeReservation = async () => {
        // const { aditionalTime, ok } = await getAddTimeReservationById(serviceId);
        // if (ok && aditionalTime.length > 0) {
        //     setAddTimes(aditionalTime);
        // } else {
        //     setAddTimes([]);
        // }
    };

    useEffect(() => {
        if (!serviceId) return;
        getAddTimeReservation();
    }, [serviceId]);

    return (
        <>
            {
                addTimes.length > 0 && (
                    <div className='mt-4 mb-4'>
                        <p className='text-sm mb-2 underline'>Adicion de tiempo</p>
                        {
                            addTimes.map((addTime) => (
                                <div key={addTime.id} className='bg-gray-200 p-2 rounded mb-4' >
                                    <div className='flex justify-end' >
                                        <p className='text-xs font-light' >Hora de adicion: {formatDateWithHours(addTime.createdAt)}</p>
                                    </div>
                                    <div className='mt-2' >
                                        <p><strong>Nueva hora de salida:</strong> {addTime.newDepartureDate ? formatDateWithHours(addTime.newDepartureDate) : 'N/A'}.</p>
                                        <p className='text-md' ><strong>Adicion de tiempo:</strong> {formatTime(addTime.addTimeReservation)}.</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                )
            }
        </>
    )
}

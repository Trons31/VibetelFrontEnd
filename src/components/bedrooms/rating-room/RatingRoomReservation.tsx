'use client';

import { MoldaRating } from "@/components";
import { useState } from "react";

interface Rating {
    rating: number;
}

interface Props {
    serviceId?: string;
    roomId?: string;
    ratings: Rating[];
}

export const RatingRoomReservation = ({ ratings, serviceId, roomId }: Props) => {

    const [modalRating, setModalRating] = useState(false);

    const averageRating =
        ratings.length > 0
            ? (ratings.reduce((acc, curr) => acc + curr.rating, 0) / ratings.length).toFixed(1)
            : '0.0';

    return (
        <>
{/* 
            <MoldaRating
                isOpen={modalRating}
                serviceId={serviceId!}
                ratingRoom={}
                onClose={() => setModalRating(false)}
            /> */}

            <button
                onClick={() => setModalRating(true)}
                className="flex gap-1 items-center">
                <div className="flex items-center">
                    {[...Array(5)].map((_, index) => (
                        <svg
                            key={index}
                            className={`w-4 h-4 ms-1 ${index < Math.round(Number(averageRating)) ? 'text-blue-500' : 'text-gray-300'
                                }`}
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 22 20"
                        >
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                    ))}
                </div>
            </button>
        </>
    );
};

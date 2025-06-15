'use client';

import { ModalRatingRoomInfo } from "@/components";
import { useState } from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

interface Rating {
    createdAt: Date;
    rating: number;
    comment: string | null;
}

interface Props {
    ratings: Rating[];
}

export const RatingRoom = ({ ratings }: Props) => {

    const [modalRatingRoom, setModalRatingRoom] = useState(false);

    return (
        <>
            <ModalRatingRoomInfo
                isOpen={modalRatingRoom}
                ratings={ratings}
                onClose={() => setModalRatingRoom(false)}
            />

            <div className="flex items-end">
                <button
                    onClick={() => setModalRatingRoom(true)}
                    className="flex gap-2 px-0 md:px-3 items-center -ml-1 mt-0.5 md:-ml-0"
                >
                    <div className="flex items-center">
                        <FaStar className="text-blue-500 w-4 h-4 ms-1" />
                    </div>
                    <p className="font-extralight text-sm underline">{ratings.length} Calificaciones</p>
                </button>
            </div>
        </>
    );
};

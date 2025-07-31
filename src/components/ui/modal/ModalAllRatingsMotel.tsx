'use client';
import { useEffect } from "react";
import { formatDate } from "@/utils";
import { MdClose } from "react-icons/md";

export interface Rating {
    id: string;
    roomTitle: string;
    roomNumber: string;
    rating: number;
    comment?: string;
    createdAt: Date;
}


interface ModalProps {
    ratings: Rating[];
    isOpen: boolean;
    onClose: () => void;
}

export const ModalAllRatingsMotel = ({ isOpen, onClose, ratings }: ModalProps) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };


    return (
        <div
            className="fixed fade-in inset-0 z-50 overflow-y-hidden md:p-5 py-5 px-0 w-full flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={handleBackdropClick}
        >
            <div className="bg-white md:rounded-lg shadow-lg w-full md:w-1/2 max-h-full overflow-y-auto custom-scrollbar">
                {/* Header */}
                <div className="py-3 px-4 shadow-md flex justify-between items-center border-b border-gray-200">
                    <p className="text-lg font-semibold">Reseñas</p>
                    <button onClick={onClose}
                        className="p-2 hover:bg-gray-200 rounded-full"
                    >
                        <MdClose className="h-5 w-5" />
                    </button>
                </div>

                {/* Body */}
                <div className="px-6 py-4 mb-10 mt-2">
                    {
                        ratings.map((rating) => (
                            <div key={rating.id} className="mb-5" >
                                <p>{rating.roomTitle} Nro {rating.roomNumber}</p>

                                <div className="mt-4" >
                                    <p className="text-sm text-gray-700 mt-5">
                                        {rating.comment || "Esta calificación no tiene comentarios."}
                                    </p>
                                </div>

                                <div className='flex justify-between items-center '>
                                    <div className="flex gap-1 items-center">
                                        <div className="flex items-center">
                                            {[...Array(5)].map((_, index) => (
                                                <svg
                                                    key={index}
                                                    className={`w-3 h-3 md:w-4 md:h-4 ms-1 ${index < Math.round(rating.rating) ? 'text-blue-500' : 'text-gray-300'}`}
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="currentColor"
                                                    viewBox="0 0 22 20"
                                                >
                                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                                </svg>
                                            ))}
                                        </div>
                                    </div>
                                    <p className='text-xs md:text-sm font-extralight'>{formatDate(rating.createdAt)}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

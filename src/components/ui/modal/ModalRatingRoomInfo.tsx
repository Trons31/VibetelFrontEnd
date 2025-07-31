'use client';
import { useEffect } from "react";
import { formatDate } from "@/utils";
import { BsStarFill } from "react-icons/bs";
import { MdClose } from "react-icons/md";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { RoomRating } from "@/interfaces/reservation.interface";



interface ModalProps {
    isOpen: boolean;
    ratings: RoomRating[];
    onClose: () => void;
}

export const ModalRatingRoomInfo = ({ isOpen, onClose, ratings }: ModalProps) => {
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

    const calculateAverageRating = (ratings: RoomRating[]) => {
        if (ratings.length === 0) return 0;
        const total = ratings.reduce((sum, { rating }) => sum + rating, 0);
        return (total / ratings.length) === 5 ? (total / ratings.length).toFixed(0) : (total / ratings.length).toFixed(2);
    };

    const getRatingDistribution = (ratings: RoomRating[]) => {
        const distribution = Array(5).fill(0); // Inicializamos un array con 5 ceros

        // Contamos la cantidad de calificaciones por número de estrellas
        ratings.forEach(({ rating }) => {
            distribution[rating - 1] += 1; // Asigna al índice correspondiente
        });

        // Calculamos el porcentaje basado en la cantidad total de calificaciones
        const totalRatings = ratings.length;
        return distribution.map((count, index) => ({
            percentage: totalRatings > 0 ? `${((count / totalRatings) * 100).toFixed(0)}%` : "0%",
            width: totalRatings > 0 ? `${(count / totalRatings) * 100}%` : "0%",
            rating: index + 1, // El número de estrellas (1 a 5)
        }));
    };

    const averageRating = calculateAverageRating(ratings);
    const ratingDistribution = getRatingDistribution(ratings);

    const renderStars = () => {
        const stars = [];
        const average = Number(averageRating);

        for (let i = 0; i < 5; i++) {
            if (i < Math.floor(average)) {
                // Estrella completa
                stars.push(<FaStar key={i} className="text-blue-500 w-4 h-4 ms-1" />);
            } else if (i === Math.floor(average) && average % 1 >= 0.5) {
                // Media estrella
                stars.push(<FaStarHalfAlt key={i} className="text-blue-500 w-4 h-4 ms-1" />);
            } else {
                // Estrella vacía
                stars.push(<FaStar key={i} className="text-gray-300 w-4 h-4 ms-1" />);
            }
        }

        return stars;
    };

    return (
        <div
            className="fixed fade-in inset-0 z-50 overflow-y-hidden md:p-5 py-5 px-0 w-full flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={handleBackdropClick}
        >
            <div className="bg-white md:rounded-lg shadow-lg w-full md:w-8/12 max-h-full overflow-y-auto custom-scrollbar">
                {/* Header */}
                <div className="py-3 px-4 shadow-md flex justify-between items-center border-b border-gray-200">
                    <p className="text-lg font-semibold">Opiniones de la habitación</p>
                    <button onClick={onClose}
                        className="p-2 hover:bg-gray-200 rounded-full"
                    >
                        <MdClose className="h-5 w-5" />
                    </button>
                </div>

                {/* Body */}
                <div className="px-6 py-4 mb-10 mt-7">
                    <div className="block md:grid md:grid-cols-8 md:gap-x-6">
                        {/* Left Section: Ratings Overview */}
                        <div className="w-full md:col-span-3">
                            <div className="flex items-center gap-4 mb-2">
                                <div className="flex gap-2 items-end">
                                    <p className="text-2xl font-medium text-gray-800">{averageRating}</p>
                                    <p className="text-lg font-medium text-gray-800">de</p>
                                    <p className="text-2xl font-medium text-gray-800">5</p>
                                </div>
                                <div>
                                    <div className="flex space-x-1 items-center">
                                        {renderStars()}
                                    </div>
                                    <p className="text-sm font-extralight text-gray-500">
                                        {ratings.length} {ratings.length > 1 ? "Calificaciones" : "Calificacion"}
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2 mt-5">
                                {ratingDistribution.map((item, index) => (
                                    <div key={index} className="flex items-center justify-between">
                                        <span className="text-sm flex items-center gap-1 font-medium text-gray-500 w-7 text-start">
                                            {item.rating} <BsStarFill className="text-gray-400" />
                                        </span>
                                        <div className="flex-1 mx-4 bg-gray-200 rounded-sm h-2">
                                            <div
                                                className="h-2 bg-blue-600 rounded-sm"
                                                style={{ width: item.width }}
                                            ></div>
                                        </div>
                                        <div className="w-10 flex items-center gap-1 text-sm font-medium text-gray-500 hover:underline">
                                            {item.percentage}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Section: Ratings List */}
                        <div className="w-full mt-10 md:mt-0 md:col-span-5">
                            <div>
                                <p className="text-lg font-medium ">Comentarios</p>
                            </div>
                            <div className="mt-5 space-y-4">
                                {ratings.map((rating, index) => (
                                    <div key={index} className="pb-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <BsStarFill className="text-blue-600 w-4 h-4" />
                                                <p className="text-sm font-medium text-gray-800">
                                                    {rating.rating}
                                                </p>
                                            </div>
                                            <p className="text-xs text-gray-500">
                                                {formatDate(rating.createdAt)}
                                            </p>
                                        </div>
                                        <p className="text-sm text-gray-700 mt-2">
                                            {rating.comment || "Esta calificacion no tiene comentarios."}
                                        </p>
                                    </div>
                                ))}
                                {ratings.length === 0 && (
                                    <p className="text-gray-500 text-sm">No hay opiniones aún.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

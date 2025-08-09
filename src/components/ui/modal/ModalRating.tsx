'use client';
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { motion, AnimatePresence } from "framer-motion";
import { sleep } from '@/utils';
import { RoomRating } from '@/interfaces/reservation.interface';
import axios from 'axios';
import { useSession } from 'next-auth/react';



interface ModalProps {
    isOpen: boolean;
    serviceId: string;

    ratingRoom: RoomRating | null;
    // ratingServiceId?: string;

    onClose: () => void;
}

type sectionRating = "Room" | "Service";

const criteriaRoom = [
    "Las imágenes publicadas en la plataforma coinciden con la habitación real.",
    "Los detalles descritos de la habitación (como tamaño, servicios, y características) son precisos y verdaderos.",
    "El estado de limpieza y mantenimiento de la habitación es adecuado.",
    "La comodidad de los muebles, como cama, sillas, o sofá, es satisfactoria.",
    "La atención y el servicio ofrecido por el personal son excelentes.",
    "La habitación cumple con las expectativas generales en relación al precio.",
    "No se presentan problemas como ruidos excesivos, olores desagradables o fallas técnicas.",
];

const criteriaService = [
    "La información mostrada es intuitiva, fácil de entender y bien organizada.",
    "El diseño de la plataforma es atractivo y accesible desde diferentes dispositivos (móvil, tablet, escritorio).",
    "El proceso de reserva es sencillo y fluido, sin complicaciones técnicas.",
    "Los filtros de búsqueda permiten encontrar habitaciones de manera rápida y precisa.",
    "La plataforma proporciona información detallada y confiable sobre las habitaciones y servicios.",
    "Las imágenes de las habitaciones son claras, de alta calidad y representan fielmente la realidad.",
    "El sistema de soporte al cliente responde rápidamente y brinda soluciones efectivas.",
    "Los métodos de pago disponibles son variados, seguros y confiables.",
    "Las promociones y descuentos están claramente indicados y son fáciles de aplicar durante la reserva.",
    "La experiencia general del usuario es satisfactoria y cumple con sus expectativas en relación a la navegación y funcionalidad.",
];


export const MoldaRating = ({ isOpen, serviceId, onClose, ratingRoom }: ModalProps) => {

    const { data: session, status } = useSession();

    const [loadingButton, setLoadingButton] = useState(false);
    const [rating, setRating] = useState<RoomRating | null>(ratingRoom);
    const [hoverRatingRoom, setHoverRatingRoom] = useState(0);
    const [sectionRating, setsectionRating] = useState<sectionRating>("Room");
    const [showAll, setShowAll] = useState(false);

    const [ratingService, setRatingService] = useState(0);
    const [hoverRatingService, setHoverRatingService] = useState(0);

    const [roomComments, setRoomComments] = useState("");
    const [serviceComments, setServiceComments] = useState("");

    const visibleCriteria = showAll ? criteriaRoom : criteriaRoom.slice(0, 3);


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

    const handleStarClickRoom = (index: number) => {
        setRating(prev => ({
            ...(prev || { id: "", createdAt: new Date() }),
            rating: index + 1
        }));
    };

    const handleStarHoverRoom = (index: number) => {
        setHoverRatingRoom(index + 1);
    };

    const handleStarLeaveRoom = () => {
        setHoverRatingRoom(0);
    };

    const renderStarsRoom = () => {
        return Array.from({ length: 5 }, (_, index) => (
            <svg
                key={index}
                onClick={() => handleStarClickRoom(index)}
                onMouseEnter={() => handleStarHoverRoom(index)}
                onMouseLeave={handleStarLeaveRoom}
                className={`h-8 w-8 cursor-pointer ${index < (hoverRatingRoom || rating?.rating || 0) ? 'text-yellow-500' : 'text-gray-400'
                    }`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
            >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
        ));
    };

    // const validateRatingRoom = () => {
    //     if (!rating || rating.rating < 1) {
    //         toast.error("Debes calificar la habitación");
    //     } else {
    //         setsectionRating("Service");
    //     }
    // }

    const onSubmit = async () => {
        setLoadingButton(true);

        if (!rating || rating.rating < 1) {
            toast.error("Debes calificar el servicio")
            setLoadingButton(false);
        } else {

            const data = {
                serviceId: serviceId,
                rating: rating?.rating,
                comment: roomComments,
            }

            if (session?.user) {
                try {
                    await axios.post(
                        `${process.env.NEXT_PUBLIC_API_ROUTE}room-rating`, data,
                        {
                            headers: {
                                Authorization: `Bearer ${session?.accessToken}`,
                            },
                        }
                    );
                    toast.success("Gracias por ayudarnos a mejorar");
                    await sleep(3);
                    setLoadingButton(false);
                    window.location.reload()
                } catch (error: any) {
                    console.log(error);
                    toast.error("Ups! Hubo un error al guardar las calificaciones");
                    setLoadingButton(false);
                }
            } else {
                try {
                    await axios.post(
                        `${process.env.NEXT_PUBLIC_API_ROUTE}room-rating/anonymous`, data
                    );
                    toast.success("Gracias por ayudarnos a mejorar");
                    await sleep(3);
                    setLoadingButton(false);
                    window.location.reload()
                } catch (error: any) {
                    console.log(error);
                    toast.error("Ups! Hubo un error al guardar las calificaciones");
                    setLoadingButton(false);
                }
            }


        }
    }

    return (
        <>
            <Toaster position="top-right" reverseOrder={false} />
            <div
                className="fixed fade-in inset-0 z-50 overflow-y-hidden py-5 md:p-5 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
                onClick={handleBackdropClick}
            >
                <div className="bg-white md:rounded-lg shadow-lg w-full md:w-1/2 lg:w-1/2 max-h-full overflow-y-auto custom-scrollbar">


                    <div className="fade-in">
                        <div className="px-12 py-5 bg-red-600">
                            <p className="text-center text-lg text-white md:text-xl">
                                Califica la habitación del motel
                            </p>
                        </div>
                        <div className="flex w-full items-center bg-white">
                            <div className="flex w-full justify-center items-center space-y-3 py-6">
                                <div>
                                    <div className="flex space-x-3">{renderStarsRoom()}</div>
                                    {rating?.rating && (
                                        <p className="text-center text-sm text-gray-600">
                                            Calificaste con {rating.rating} estrellas
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="px-4 mt-1">
                            <p className="block mb-2 text-sm font-medium text-gray-900">Criterios de calificación</p>
                            <ul className="list-disc pl-5 text-sm text-gray-800 overflow-hidden">
                                <AnimatePresence>
                                    {visibleCriteria.map((item, index) => (
                                        <motion.li
                                            key={index}
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ duration: 0.4, ease: "easeInOut" }}
                                        >
                                            {item}
                                        </motion.li>
                                    ))}
                                </AnimatePresence>
                            </ul>
                            <button
                                onClick={() => setShowAll(!showAll)}
                                className="mt-2 text-blue-500 hover:underline text-sm font-medium"
                            >
                                {showAll ? "Mostrar menos" : "Mostrar más"}
                            </button>
                        </div>


                        {/* <div className='px-4 mt-3' >
                                        <hr />
                                    </div> */}

                        <div className="px-4 mt-5">
                            <label className="block mb-2 text-sm font-medium text-gray-900">
                                Tus comentarios, sugerencias o inquietudes (Opcional)
                            </label>
                            <textarea
                                id="comments"
                                rows={4}
                                value={roomComments}
                                onChange={(e) => setRoomComments(e.target.value)}
                                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
                                placeholder="Escribe aquí tus comentarios, sugerencias, molestias o inquietudes sobre la habitación..."
                            ></textarea>
                        </div>
                    </div>

                    <div className='flex justify-between p-4' >
                        <button
                            onClick={onClose}
                            className='flex gap-1 p-2 rounded-lg items-center hover:bg-gray-200'
                        >
                            <IoIosArrowBack />
                            Mas tarde
                        </button>

                        <button
                            onClick={onSubmit}
                            className='flex gap-1 p-2 rounded-lg items-center hover:bg-gray-200'
                        >
                            Calificar
                            <IoIosArrowForward />
                        </button>
                    </div>



                    {/* {
                        sectionRating === "Service"
                        && (
                            <>
                                <div className="fade-in">
                                    <div className="px-12 py-5 bg-red-600">
                                        <p className="text-center text-lg md:text-xl text-white">
                                            Califica el servicio de VibeTel
                                        </p>
                                    </div>
                                    <div className="flex w-full flex-col items-center bg-[#fdfeff]">
                                        <div className="flex flex-col items-center space-y-3 py-6">
                                            <div className="flex space-x-3">{renderStarsService()}</div>
                                            {ratingService > 0 && (
                                                <p className="text-center text-sm text-gray-600">
                                                    Calificaste con {ratingService} estrellas
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="px-4 mt-1">
                                    <p className="block mb-2 text-sm font-medium text-gray-900">Criterios de calificación</p>
                                    <ul className="list-disc pl-5 text-sm text-gray-800 overflow-hidden">
                                        <AnimatePresence>
                                            {visibleCriteriaService.map((item, index) => (
                                                <motion.li
                                                    key={index}
                                                    initial={{ opacity: 0, scale: 0.95 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.95 }}
                                                    transition={{ duration: 0.4, ease: "easeInOut" }}
                                                >
                                                    {item}
                                                </motion.li>
                                            ))}
                                        </AnimatePresence>
                                    </ul>
                                    <button
                                        onClick={() => setShowAll(!showAll)}
                                        className="mt-2 text-blue-500 hover:underline text-sm font-medium"
                                    >
                                        {showAll ? "Mostrar menos" : "Mostrar más"}
                                    </button>
                                </div>

                                <div className="px-4 mt-5">
                                    <label className="block mb-2 text-sm font-medium text-gray-900">
                                        Queremos mejorar nuestro servicio para ti
                                        <span className="block text-xs text-gray-600">
                                            Tus comentarios, sugerencias o inquietudes son valiosas para ayudarnos a ofrecer una experiencia mejorada. Por favor, comparte cualquier aspecto que creas que podamos mejorar.
                                        </span>
                                    </label>
                                    <textarea
                                        id="comments"
                                        rows={4}
                                        value={serviceComments}
                                        onChange={(e) => setServiceComments(e.target.value)}
                                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
                                        placeholder="Escribe aquí tus comentarios, sugerencias o inquietudes..."
                                    ></textarea>
                                </div>

                                <div className='flex justify-between p-4' >

                                    <button
                                        onClick={() => setsectionRating("Room")}
                                        className='flex gap-1 p-2 rounded-lg items-center hover:bg-gray-200'
                                    >
                                        <IoIosArrowBack />
                                        Volver
                                    </button>

                                    <button
                                        onClick={onSubmit}
                                        disabled={loadingButton}
                                        className={
                                            clsx(
                                                {
                                                    'flex gap-1 p-2 rounded-lg items-center hover:bg-gray-200': !loadingButton,
                                                    'flex gap-3 p-2 rounded-lg items-center hover:bg-gray-200 cursor-not-allowed': loadingButton
                                                }
                                            )
                                        }
                                    >
                                        {
                                            loadingButton &&
                                            (<svg className="h-4 w-4 animate-spin text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" ></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>)
                                        }

                                        {
                                            loadingButton
                                                ? (
                                                    "Cargando..."
                                                ) : (
                                                    "Finalizar"
                                                )
                                        }

                                        <IoIosArrowForward />
                                    </button>
                                </div>
                            </>
                        )
                    } */}

                </div>
            </div >
        </>
    );
};

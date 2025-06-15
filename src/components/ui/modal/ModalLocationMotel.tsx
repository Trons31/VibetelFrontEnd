"use client";
import { useEffect } from "react";
import { MdClose } from "react-icons/md";

interface ModalProps {
    motelName: string;
    motelLocationLatitude: number;
    motelLocationLongitude: number;
    isOpen: boolean;
    onClose: () => void;
}

export const ModalLocationMotel = ({ isOpen, onClose, motelLocationLatitude, motelLocationLongitude, motelName }: ModalProps) => {
    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "auto";
        return () => {
            document.body.style.overflow = "auto";
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
            <div className="relative w-full max-w-2xl bg-white rounded-none md:rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 animate-scaleIn">
                {/* Botón cerrar */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 hover:bg-gray-200 p-2 rounded-full transition"
                >
                    <MdClose className="h-5 w-5" />
                </button>

                {/* Encabezado */}
                <div className="text-center px-6 pt-14">
                    <h2 className="text-xl md:text-2xl font-bold">
                        Ubicación de {motelName}
                    </h2>
                    <p className="text-xs md:text-sm text-gray-500 mt-1">
                        Visualiza la ubicación exacta del motel en el mapa
                    </p>
                </div>

                {/* Mapa */}
                <div className="mt-4 w-full aspect-video px-6 pb-6">
                    <iframe
                        title={`Ubicación del motel ${motelName}`}
                        src={`https://www.google.com/maps?q=${motelLocationLatitude},${motelLocationLongitude}&hl=es&z=15&output=embed`}
                        className="w-full h-full rounded-xl border-0"
                        loading="lazy"
                        allowFullScreen
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

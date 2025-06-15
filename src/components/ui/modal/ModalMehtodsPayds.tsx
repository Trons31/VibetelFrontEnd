"use client";
import { useEffect } from "react";
import { IoShieldCheckmark } from "react-icons/io5";
import { MdClose } from "react-icons/md";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const paymentMethods = [
    "Nequi",
    "Bancolombia",
    "Davivienda",
    "PSE",
    "Efecty",
    "Banco de Bogotá",
    "Citibank",
    "BBVA",
    "Movii"
];

export const ModalMethodsPayds = ({ isOpen, onClose }: ModalProps) => {
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
            <div className="relative bg-white md:rounded-lg shadow-lg w-full md:w-1/2 lg:w-1/2 px-2 md:p-0 max-h-full overflow-y-auto">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 hover:bg-gray-200 p-2 rounded-full transition"
                >
                    <MdClose className="h-5 w-5" />
                </button>

                <div className="mt-3 px-3 md:px-6 pt-14 text-start md:text-center">
                    <p className="text-lg md:text-2xl font-semibold">
                        Métodos de pago disponibles
                    </p>
                    <p className="text-xs md:text-sm text-gray-500 mt-1">
                        Al pagar selecciona tu método de preferencia
                    </p>
                </div>

                <div className="px-2 md:px-8 py-8 grid grid-cols-2 md:grid-cols-3 gap-4">
                    {paymentMethods.map((method, index) => (
                        <div
                            key={index}
                            className="border border-blue-400 rounded-xl shadow-sm py-3 px-1.5 md:p-4 text-center hover:bg-gray-100 transition-all cursor-pointer"
                        >
                            <span className="text-base font-medium text-gray-800">
                                {method}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

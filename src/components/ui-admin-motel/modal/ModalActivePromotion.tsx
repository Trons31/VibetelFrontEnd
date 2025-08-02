'use client';
import { useEffect, useState } from "react";
import { RoomManagerProps } from "@/interfaces";
import { currencyFormat, sleep } from "@/utils";
import clsx from "clsx";
import toast, { Toaster } from "react-hot-toast";
import { IoIosCloseCircle } from "react-icons/io";
import { MdDelete } from "react-icons/md";


interface ModalProps {
    selectedRooms: RoomManagerProps[];
    onRemoveRoom: (roomId: string) => void;
    isOpen: boolean;
    onClose: () => void;
}

export const ModalActivePromotion = ({ isOpen, onClose, selectedRooms, onRemoveRoom }: ModalProps) => {


    const [isLoadingUpdatePrice, setIsLoadingUpdatePrice] = useState(false);
    const [newPromotion, setNewPromotion] = useState("");
    const [errorInput, setErrorInput] = useState(false);
    const [messageError, setMessageError] = useState("");


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


    const onUpdatePrice = async () => {
        setIsLoadingUpdatePrice(true);
        const promotion = Number(newPromotion);

        if (isNaN(promotion)) {
            setErrorInput(true);
            setMessageError("El porcentaje de la promocion debe ser un número válido");
            setIsLoadingUpdatePrice(false);
            return;
        }

        if (promotion < 1) {
            setErrorInput(true);
            setMessageError("El porcentaje de la promocion no debe ser un valor menor a 1");
            setIsLoadingUpdatePrice(false);
            return;
        }

        if (promotion > 99) {
            setErrorInput(true);
            setMessageError("El porcentaje de la promocion no debe ser un valor mayor a 99");
            setIsLoadingUpdatePrice(false);
            return;
        }

        if (!promotion) {
            setErrorInput(true);
            setMessageError("El porcentaje de la promocion es obligatorio");
            setIsLoadingUpdatePrice(false);
            return;
        }

        // const resp = await updatePromotionByMotel(selectedRooms.map(room => room.id), promotion);
        // if (!resp.ok) {
        //     setIsLoadingUpdatePrice(false);
        //     toast.error("Ups! no se puedo actualizar la promocion");
        //     return;
        // }
        setIsLoadingUpdatePrice(false);
        toast.success("Promocion actualizado correctamente");
        await sleep(1);
        window.location.reload();
    }


    return (
        <>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />

            <div
                className="fixed fade-in inset-0 z-50 overflow-y-hidden md:p-5 py-5 px-0 w-full flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
                onClick={handleBackdropClick}
            >
                <div className="bg-white md:rounded-lg shadow-lg w-full md:w-6/12 max-h-full overflow-y-auto custom-scrollbar">
                    {/* Header */}
                    <div className="py-3 px-4 shadow-md flex justify-between items-center border-b border-gray-200">
                        <p className="text-lg font-semibold">Activar promocion</p>
                        <button onClick={onClose}
                            className="p-2 hover:bg-gray-200 rounded-md"
                        >
                            <IoIosCloseCircle className="h-5 w-5 text-gray-500" />
                        </button>
                    </div>

                    {/* Body */}
                    <div className=" grid grid-cols-2 px-6 gap-4 py-4 mt-2">

                        <div className="mt-2 h-[300px] overflow-y-auto custom-scrollbar-table " >
                            {
                                selectedRooms.map(room => (
                                    <div key={room.id} className="bg-gray-200 rounded p-2 mb-2" >
                                        <div className="flex justify-between" >
                                            <p className="font-semibold text-sm text-gray-500" >Habitacion seleccionada</p>
                                            <button
                                                onClick={() => onRemoveRoom(room.id)}
                                            >
                                                <MdDelete className="text-red-600" />
                                            </button>
                                        </div>
                                        <div>
                                            <p className="font-semibold capitalize text-md" >{room.title} - Nro {room.roomNumber}</p>
                                            <p className="font-semibold text-md" >Precio actual: {currencyFormat(room.price)}</p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>

                        <div className="mb-4">
                            <label className={
                                clsx(
                                    "block mb-2 mt-1 text-sm text-black font-semibold ",
                                    {
                                        "text-red-500": errorInput
                                    }
                                )
                            }>Porcentaje de promocion</label>
                            <input
                                type="number"
                                className={
                                    clsx(
                                        "bg-gray-300 border-2 border-gray-300 text-black text-sm rounded-lg appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 block w-full p-2.5 placeholder-black",
                                        {
                                            'focus:border-red-600 border-red-500': errorInput
                                        }
                                    )
                                }
                                onChange={(e) => setNewPromotion(e.target.value)}
                                placeholder="ej: 20"
                            />
                            {
                                errorInput && (
                                    <span className="text-red-500 text-xs" >{messageError}</span>
                                )
                            }

                            <div className="flex mt-4 justify-end gap-2 md:gap-0  sm:flex-row sm:space-x-3 sm:space-y-0">
                                <div className='relative' >
                                    {
                                        isLoadingUpdatePrice &&
                                        (
                                            <div className="absolute bg-white bg-opacity-60 z-10 h-full w-full flex items-center justify-center">
                                                <div className="flex items-center">

                                                </div>
                                            </div>
                                        )
                                    }
                                    <button
                                        onClick={onClose}
                                        className="whitespace-nowrap rounded-md bg-gray-200 px-4 py-3 font-medium">Cancelar</button>
                                </div>
                                <button
                                    onClick={onUpdatePrice}
                                    disabled={isLoadingUpdatePrice}
                                    className={
                                        clsx(

                                            {
                                                "flex items-center gap-x-4 mb-2 w-fit  justify-center rounded-lg bg-red-600 px-3 py-2 hover:bg-red-700 text-lg font-bold text-white": !isLoadingUpdatePrice,
                                                "flex items-center gap-x-4 mb-2 w-fit  justify-center rounded-lg bg-red-600 px-3 py-2 text-lg font-bold text-white cursor-not-allowed": isLoadingUpdatePrice
                                            }
                                        )
                                    }>
                                    {
                                        isLoadingUpdatePrice &&
                                        (<svg className="h-5 w-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" ></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>)
                                    }

                                    {
                                        isLoadingUpdatePrice
                                            ? (
                                                <span>Cargando...</span>
                                            ) : (
                                                <span>Actualizar</span>
                                            )
                                    }

                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

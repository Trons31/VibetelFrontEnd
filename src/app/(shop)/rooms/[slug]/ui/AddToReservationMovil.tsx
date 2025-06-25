"use client";
import React, { useEffect, useState } from "react";
import { AmenitiesByRoom, BedroomBooking, BedRooms, motelConfig, RoomApi } from "@/interfaces";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { MdOutlineClose } from "react-icons/md";
import clsx from "clsx";
import { SelecteDateAndTime } from "./SelecteDateAndTime";
import { IoArrowForwardOutline } from "react-icons/io5";
import { useBookingStore } from "@/store";
import toast, { Toaster } from "react-hot-toast";
import { getTransactionIdReservation, validateDateReservation } from "@/actions";
import { useRouter } from "next/navigation";
import { ModalLoadingReservation } from "@/components";
import { currencyFormat } from "@/utils";

interface Props {
    room: RoomApi;
    MotelConfig: motelConfig;
}

export const AddToReservationMovil = ({ room, MotelConfig }: Props) => {
    const { data: session, status } = useSession();
    const isAuthenticated = !!session?.user;

    const [isExpanded, setIsExpanded] = useState(false);

    const [isLoading, setIsLoading] = useState(true);
    const [showLoading, setshowLoading] = useState(false);
    const [showLoadingLogin, setshowLoadingLogin] = useState(false);
    const [showModalLoading, setshowModalLoading] = useState(false);
    const [showErrorBooking, setShowErrorBooking] = useState(false);

    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState("");
    const [selectedDepartureDate, setSelectedDepartureDate] = useState<Date | null>(null);

    const [showModalReservationProcessing, setShowModalReservationProcessing] = useState(false);

    const AddBedroomToBooking = useBookingStore((state) => state.addBedroomToBooking);
    const [transactionId, setTransactionId] = useState<string | null>(null);


    const router = useRouter();

    useEffect(() => {
        if (status !== "loading") {
            setIsLoading(false);
        }
    }, [session, status]);

    const addToReservationAnonymous = async () => {
        if (transactionId) {
            setShowModalReservationProcessing(true);
            return;
        }

        if (!selectedDate) {
            toast.error("Por favor selecciona una fecha antes de continuar.");
            return;
        }

        if (selectedTime === "") {
            toast.error("Por favor selecciona una hora antes de continuar.");
            return;
        }

        setshowModalLoading(true);
        setshowLoading(true);

        const validationResult = await validateDateReservation(
            selectedDate,
            selectedDepartureDate!,
            room.id,
            room.motel.id
        );
        if (!validationResult.isValid) {
            toast.error(validationResult.message, {
                duration: 7000,
            });
            setshowModalLoading(false);
            setshowLoading(false);
            setShowErrorBooking(true);
            return;
        }

        const bookingBedroom: BedroomBooking = {
            id: room.id,
            title: room.title,
            description: room.description,
            category: room.category.name,
            garage: room.garage.title,
            image: room.images[0].url,
            slug: room.slug,
            price: room.price,
            promoActive: room.promoActive,
            promoprice: room.promoPrice,
            timeLimit: room.timeLimit,
            amenitiesRoom: room.amenities.map((amenitie) => amenitie.amenities.id),
            arrivalDate: selectedDate,
            departureDate: selectedDepartureDate!,
            extraServicesActive: room.extraServicesActive,
            surcharge: room.surcharge,
            extraServices: room.extraServices,
            roomNumber: room.roomNumber,
            createdAt: new Date(),
            motel: {
                title: room.motel.razonSocial,
                location: `${room.motel.city.name}, ${room.motel.city.department.name}`,
                contactPhone: room.motel.contactPhone,
                address: room.motel.address,
                neighborhood: room.motel.neighborhood,
                slug: room.motel.slug,
            },
            timeAwait: MotelConfig.timeAwaitTakeReservation,
        };

        AddBedroomToBooking(bookingBedroom);
        localStorage.setItem("redirectUrl", window.location.pathname);
        router.push("/payment-processing/guest");
    };

    const AddToReservation = async () => {
        if (transactionId) {
            setShowModalReservationProcessing(true);
            return;
        }

        if (!selectedDate) {
            toast.error("Por favor selecciona una fecha antes de continuar.");
            return;
        }

        if (selectedTime === "") {
            toast.error("Por favor selecciona una hora antes de continuar.");
            return;
        }

        setshowModalLoading(true);
        setShowErrorBooking(false);
        setshowLoading(true);

        const validationResult = await validateDateReservation(
            selectedDate,
            selectedDepartureDate!,
            room.id,
            room.motel.id
        );
        if (!validationResult.isValid) {
            setshowModalLoading(false);
            toast.error(validationResult.message, {
                duration: 7000,
            });
            setshowLoading(false);
            setShowErrorBooking(true);
            return;
        }

        const bookingBedroom: BedroomBooking = {
            id: room.id,
            title: room.title,
            description: room.description,
            category: room.category.name,
            garage: room.garage.title,
            image: room.images[0].url,
            slug: room.slug,
            price: room.price,
            promoActive: room.promoActive,
            promoprice: room.promoPrice,
            timeLimit: room.timeLimit,
            amenitiesRoom: room.amenities.map((amenitie) => amenitie.amenities.id),
            arrivalDate: selectedDate,
            departureDate: selectedDepartureDate!,
            extraServicesActive: room.extraServicesActive,
            surcharge: room.surcharge,
            extraServices: room.extraServices,
            roomNumber: room.roomNumber,
            createdAt: new Date(),
            motel: {
                title: room.motel.razonSocial,
                location: `${room.motel.city.name}, ${room.motel.city.department.name}`,
                contactPhone: room.motel.contactPhone,
                address: room.motel.address,
                neighborhood: room.motel.neighborhood,
                slug: room.motel.slug,
            },
            timeAwait: MotelConfig.timeAwaitTakeReservation,
        };

        AddBedroomToBooking(bookingBedroom);
        setshowLoading(true);
        localStorage.setItem("redirectUrl", window.location.pathname);
        router.push("/payment-processing/user");
    };

    useEffect(() => {
        async function fetchTransactionId() {
            const transactionId = await getTransactionIdReservation();
            setTransactionId(transactionId);
        }

        fetchTransactionId();
    }, []);

    const ridirectLogin = () => {
        localStorage.setItem("redirectUrl", window.location.pathname);
        setshowLoadingLogin(true);
        router.push("/auth/login");
    };

    return (
        <>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            <ModalLoadingReservation
                isOpen={showModalLoading}
                onClose={() => setshowModalLoading(false)}
            />

            {isExpanded && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-30"
                    onClick={() => setIsExpanded(false)} // Cierra el modal al hacer clic fuera
                />
            )}

            <div
                className="fixed fade-in bottom-0 w-full bg-white z-30 md:hidden px-2 shadow-2xl shadow-black rounded-t-2xl border border-t-gray-300"
            >
                {
                    isExpanded && (
                        <div className="flex justify-between items-center px-2 mt-3" >
                            <p className="font-medium text-sm text-gray-900">Habitación</p>
                            <button
                                onClick={() => setIsExpanded(false)} >
                                <MdOutlineClose className="h-5 w-5" />
                            </button>
                        </div>
                    )
                }
                <div className="flex justify-between items-center p-3 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
                    <div>
                        <p className="text-md font-extralight capitalize">{room.title}</p>
                        {
                            room.promoActive ? (
                                <p className="text-sm font-semibold" >{currencyFormat(room.promoPrice!)}</p>
                            ) : (
                                <p className="text-sm font-semibold">{currencyFormat(room.price)}</p>
                            )
                        }
                    </div>
                    <p className="text-md font-extralight">{room.timeLimit} horas </p>
                </div>

                {
                    !isExpanded && (
                        <motion.button
                            className="mb-4 w-full rounded-md bg-red-500 px-6 py-3 font-medium text-white"
                            whileTap={{ scale: 0.95 }} // Pequeño efecto de presión
                            onClick={() => setIsExpanded(!isExpanded)}
                        >
                            Realizar reserva
                        </motion.button>
                    )
                }

                {isExpanded && (
                    <div className="fade-in mb-4">
                        <SelecteDateAndTime
                            timeLimit={0}
                            onSelectedDate={(date, time, departureDate) => {
                                setSelectedDate(date),
                                    setSelectedTime(time),
                                    setSelectedDepartureDate(departureDate);
                            }}
                        />

                        <div className="mt-3">
                            {isLoading ? (
                                <div className="">
                                    <div className="w-full h-20 mb-2 bg-gray-400 rounded-md animate-pulse"></div>
                                    <div className="w-full h-20 mb-2 bg-gray-400 rounded-md animate-pulse"></div>
                                </div>
                            ) : isAuthenticated ? (
                                <>
                                    <button
                                        type="submit"
                                        disabled={showLoading || !selectedDate}
                                        onClick={AddToReservation}
                                        className={clsx({
                                            "flex items-center gap-x-4 w-full mt-2 justify-center rounded-lg bg-red-600 hover:bg-red-700 px-7 py-2 font-medium text-white":
                                                !showLoading,
                                            "flex items-center gap-x-4 w-full mt-2 justify-center rounded-lg bg-red-600 px-7 py-2 font-medium text-white cursor-not-allowed":
                                                showLoading,
                                        })}
                                    >
                                        {showLoading && (
                                            <svg
                                                className="h-5 w-5 animate-spin"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                ></circle>
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                ></path>
                                            </svg>
                                        )}

                                        {showLoading ? (
                                            <span>Cargando...</span>
                                        ) : selectedDate ? (
                                            <span>Realizar reserva</span>
                                        ) : (
                                            <span>Seleccionar fecha y hora</span>
                                        )}
                                    </button>
                                </>
                            ) : (
                                <>
                                    {
                                        selectedTime === ""
                                            ? (
                                                <div className="p-3 rounded-lg bg-black" >
                                                    <p className="text-white text-center" >Seleccinar fecha y hora</p>
                                                </div>
                                            ) : (
                                                <ul className="mt-2 space-y-3 mb-6">
                                                    <li>
                                                        <div className="relative">
                                                            {showLoadingLogin && (
                                                                <div className="absolute bg-white bg-opacity-60 z-10 h-full w-full flex items-center justify-center">
                                                                    <div className="flex items-center">
                                                                        <svg
                                                                            width="25"
                                                                            height="25"
                                                                            fill="currentColor"
                                                                            className="mr-2  text-red-600 animate-spin"
                                                                            viewBox="0 0 1792 1792"
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                        >
                                                                            <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z"></path>
                                                                        </svg>
                                                                    </div>
                                                                </div>
                                                            )}

                                                            {showLoading && (
                                                                <div className="absolute bg-white bg-opacity-60 z-10 h-full w-full flex items-center justify-center">
                                                                    <div className="flex items-center"></div>
                                                                </div>
                                                            )}

                                                            <button onClick={ridirectLogin}>
                                                                <label className="inline-flex items-center md:gap-2 justify-between w-full p-3 md:p-5 text-gray-900 bg-white border border-gray-500 rounded-lg cursor-pointer  hover:border-red-500 hover:text-red-500 text-start">
                                                                    <div className="block">
                                                                        <div className="w-full text-md font-semibold">
                                                                            Reservar con mi usuario
                                                                        </div>
                                                                        <div className="w-full text-gray-500 text-xs">
                                                                            Haz clic aquí para reservar con tu usuario. Inicia
                                                                            sesión para disfrutar de beneficios exclusivos.
                                                                        </div>
                                                                    </div>
                                                                    <IoArrowForwardOutline className="h-4 w-4 flex-shrink-0" />
                                                                </label>
                                                            </button>
                                                        </div>
                                                    </li>

                                                    <li>
                                                        <div className="relative">
                                                            {showLoading && (
                                                                <div className="absolute bg-white bg-opacity-60 z-10 h-full w-full flex items-center justify-center">
                                                                    <div className="flex items-center">
                                                                        <svg
                                                                            width="24"
                                                                            height="24"
                                                                            fill="currentColor"
                                                                            className="mr-2 text-red-600 animate-spin"
                                                                            viewBox="0 0 1792 1792"
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                        >
                                                                            <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z"></path>
                                                                        </svg>
                                                                    </div>
                                                                </div>
                                                            )}

                                                            {showLoadingLogin && (
                                                                <div className="absolute bg-white bg-opacity-60 z-10 h-full w-full flex items-center justify-center">
                                                                    <div className="flex items-center"></div>
                                                                </div>
                                                            )}

                                                            <button onClick={addToReservationAnonymous}>
                                                                <label className="inline-flex items-center md:gap-2 justify-between w-full p-3 md:p-5 text-gray-900 bg-white border border-gray-500 rounded-lg cursor-pointer hover:border-red-500 hover:text-red-500 text-start">
                                                                    <div className="block">
                                                                        <div className="w-full text-md font-semibold">
                                                                            Reservar de forma anónima
                                                                        </div>
                                                                        <div className="w-full text-gray-500 text-xs ">
                                                                            Haz clic aquí para realizar una reserva de forma
                                                                            anónima. Garantizamos la integridad y privacidad de
                                                                            tus datos.
                                                                        </div>
                                                                    </div>
                                                                    <IoArrowForwardOutline className="h-4 w-4 flex-shrink-0" />
                                                                </label>
                                                            </button>
                                                        </div>
                                                    </li>
                                                </ul>
                                            )
                                    }
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>

        </>
    );
};

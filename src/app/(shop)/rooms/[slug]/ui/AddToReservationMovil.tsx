"use client";
import React, { useCallback, useEffect, useState } from "react";
import { BedroomBooking, motelConfig, RoomApi } from "@/interfaces";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { MdOutlineClose } from "react-icons/md";
import clsx from "clsx";
import { IoArrowForwardOutline } from "react-icons/io5";
import { useBookingStore } from "@/store";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { CustomDatePicker, ModalLoadingReservation, TimeSelector } from "@/components";
import { currencyFormat, formatDate, formatTimeWithAmPm } from "@/utils";
import { FaRegEdit } from "react-icons/fa";
import { TbClockExclamation } from "react-icons/tb";
import { TimeUsageSelector } from "./TimeUsageSelector";
import axios from "axios";
import { CreateReservationResponseApi } from "@/interfaces/reservation.interface";
import { notifyTokenChange } from "@/utils/reservation-events";
import { useReservationClientStore } from "@/store/reservation/clientWebsocket";

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
    const [showModalLoadingReservation, setShowModalLoadingReservation] = useState(false);
    const [showErrorBooking, setShowErrorBooking] = useState(false);

    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [selectedTime, setSelectedTime] = useState<string>("");
    const [departureDate, setDepartureDate] = useState<Date | null>(null);
    const [isDateTimeModalOpen, setIsDateTimeModalOpen] = useState(false);
    const [dateTimeStep, setDateTimeStep] = useState<"date" | "time">("date");

    const [showModalReservationProcessing, setShowModalReservationProcessing] = useState(false);

    const [modalReservationInProcessing, setModalReservationInProcessing] = useState(false);


    const reservationStatus = useReservationClientStore(state => state.reservationStatus);
    const [tokenTransaction, setTokenTransaction] = useState<string | null>(null);


    const [serviceUsageTime, setServiceUsageTime] = useState(room.timeLimit);
    const addBedroomToBooking = useBookingStore((state) => state.addBedroomToBooking);
    const removeBooking = useBookingStore((state) => state.removeBooking);


    const router = useRouter();

    useEffect(() => {
        if (status !== "loading") {
            setIsLoading(false);
        }
    }, [session, status]);

    const encodeToken = (token: string): string => {
        try {
            return btoa(token); // Codifica a Base64
        } catch (e) {
            console.error("Error al codificar el token:", e);
            return token; // Retorna sin codificar si hay un error
        }
    };

    const decodeToken = (encodedToken: string): string => {
        try {
            return atob(encodedToken); // Decodifica de Base64
        } catch (e) {
            console.error("Error al decodificar el token:", e);
            return encodedToken; // Retorna sin decodificar si hay un error
        }
    };



    useEffect(() => {
        if (selectedDate && selectedTime) {
            const [hours, minutes] = selectedTime.split(":").map(Number);
            const selectedDateTime = new Date(selectedDate);
            selectedDateTime.setHours(hours, minutes, 0, 0);

            const calculatedDepartureDate = new Date(selectedDateTime);
            calculatedDepartureDate.setHours(
                calculatedDepartureDate.getHours() + room.timeLimit
            );

            setDepartureDate(calculatedDepartureDate);
        } else if (selectedDate) {
            setDepartureDate(selectedDate);
        }
    }, [selectedDate, selectedTime, room.timeLimit]);

    const openDateTimeModal = useCallback((step: "date" | "time") => {
        setIsDateTimeModalOpen(true);
        setDateTimeStep(step);
        document.body.style.overflow = "hidden";
    }, []);

    const closeDateTimeModal = useCallback(() => {
        setIsDateTimeModalOpen(false);
        document.body.style.overflow = "auto";
    }, []);

    const handleConfirmDateTime = useCallback(() => {
        if (selectedDate && selectedTime) {
            const dateTime = new Date(selectedDate);
            const [hours, minutes] = selectedTime.split(":").map(Number);
            dateTime.setHours(hours, minutes, 0, 0);
            toast.success("Fecha y hora seleccionada correctamente.");
        } else {
            toast.error("Por favor, selecciona una fecha y una hora.");
        }
        closeDateTimeModal();
    }, [selectedDate, selectedTime, closeDateTimeModal]);

    const createBookingBedroom = useCallback((): BedroomBooking => {
        return {
            id: room.id,
            title: room.title,
            description: room.description,
            category: room.category.name,
            garage: room.garage.title,
            image: room.images.length > 0 ? room.images[0].url : "",
            slug: room.slug,
            price: room.price,
            promoActive: room.promoActive,
            promoprice: room.promoPrice,
            timeLimit: room.timeLimit,
            amenitiesRoom: room.amenities.map((amenitie) => amenitie.amenities.name),
            arrivalDate: selectedDate!,
            departureDate: departureDate!,
            extraServicesActive: room.extraServicesActive,
            surcharge: room.surcharge,
            extraServices: room.extraServicesActive ? room.extraServices : null,
            roomNumber: room.roomNumber,
            createdAt: new Date(),
            timeAwait: MotelConfig.timeAwaitTakeReservation,
            motel: {
                title: room.motel.razonSocial,
                location: `${room.motel.city.name}, ${room.motel.city.department.name}`,
                contactPhone: room.motel.contactPhone,
                address: room.motel.address,
                neighborhood: room.motel.neighborhood,
                slug: room.motel.slug,
            },
        };
    }, [room, selectedDate, departureDate, MotelConfig]);

    const handleReservation = async (isAnonymous: boolean) => {
        if (tokenTransaction) {
            setShowModalReservationProcessing(true);
            return;
        }

        if (!selectedDate || !selectedTime) {
            toast.error("Por favor, selecciona una fecha y una hora antes de continuar.");
            return;
        }

        setShowModalLoadingReservation(true);
        setshowLoading(true);

        const validateDataForReservation = {
            arrivalDate: selectedDate,
            departureDate: departureDate,
            roomId: room.id
        }

        try {
            await axios.post(`${process.env.NEXT_PUBLIC_API_ROUTE}service/validate-reservation`, validateDataForReservation);
        } catch (error: any) {
            console.log(error);
            toast.error("Error ya existen reservas en este horario. selecciona otro", { duration: 7000 });
            setShowModalLoadingReservation(false);
            setshowLoading(false);
            return;
        }

        const reservation = {
            roomId: room.id,
            arrivalDate: selectedDate,
            departureDate: departureDate,
            userId: isAuthenticated ? session.user.id : null
        }

        try {
            const response = await axios.post<CreateReservationResponseApi>(
                `${process.env.NEXT_PUBLIC_API_ROUTE}service/reservation`, reservation
            );

            if (response.data.reservationToken) {
                const encodedToken = encodeToken(response.data.reservationToken);
                localStorage.setItem("persist-token-reservation", encodedToken);
                notifyTokenChange(response.data.reservationToken);
            }

            setShowModalLoadingReservation(true);

        } catch (error: any) {
            console.error("Error en la reserva:", error);
        }
    };

    const ridirectLogin = () => {
        localStorage.setItem("redirectUrl", window.location.pathname);
        setshowLoadingLogin(true);
        router.push("/auth/login");
    };

    useEffect(() => {
        if (reservationStatus) {
            console.log("Manejando actualización de reserva en useEffect:", reservationStatus); // Este log ahora debería aparecer

            if (reservationStatus.isConfirmed) {
                const bookingBedroom = createBookingBedroom();
                addBedroomToBooking(bookingBedroom);
                localStorage.setItem("redirectUrl", window.location.pathname);
                router.push(isAuthenticated ? "/payment-processing/user" : "/payment-processing/guest");

            } else {
                toast.error("Error: Ya existen reservas en este horario. Por favor, selecciona otro.", { duration: 7000 });
                setShowModalLoadingReservation(false);
                setshowLoading(false);

                if (typeof window !== 'undefined') {
                    localStorage.removeItem("persist-token-reservation");
                    useReservationClientStore.getState().setToken(null);
                }
            }
        }
    }, [reservationStatus, router, createBookingBedroom, addBedroomToBooking, isAuthenticated]);

    useEffect(() => {
        async function fetchTokenTransaction() {
            if (typeof window !== 'undefined') {
                const storedEncodedToken = localStorage.getItem("persist-token-reservation");
                if (storedEncodedToken) {
                    const decodedToken = decodeToken(storedEncodedToken);
                    setTokenTransaction(decodedToken);
                } else {
                    removeBooking();
                }
            }
        }
        fetchTokenTransaction();
    }, []);


    useEffect(() => {
        async function fetchTransaction() {
            if (tokenTransaction) {
                try {
                    const response = await axios.get(
                        `${process.env.NEXT_PUBLIC_API_ROUTE}service/by-reservation-token/${tokenTransaction}`
                    );
                    if (response.data.isConfirmed === true) {
                        setModalReservationInProcessing(true);
                        return;
                    } else {
                        if (response.data.isConfirmed === false) {
                            setTokenTransaction(null);
                            localStorage.removeItem("persist-token-reservation");
                            return;
                        }
                    }
                    setShowModalLoadingReservation(true);
                } catch (error: any) {
                    setTokenTransaction(null);
                    localStorage.removeItem("persist-token-reservation");
                }
            }


        }

        fetchTransaction();
    }, [tokenTransaction]);

    useEffect(() => {
        if (isExpanded) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isExpanded]);

    return (
        <>

            <ModalLoadingReservation
                isOpen={showModalLoadingReservation}
                onClose={() => setShowModalLoadingReservation(false)}
            />

            {isDateTimeModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
                >
                    <div className="bg-white md:rounded-lg shadow-lg w-full md:w-1/2 lg:w-1/3 p-6 items-center">
                        <h2 className="text-lg font-semibold mb-4">
                            {dateTimeStep === "date" ? "Selecciona una Fecha" : "Selecciona una Hora"}
                        </h2>
                        {dateTimeStep === "time" && (
                            <div className="relative items-center w-full py-3 mx-auto">
                                <div className="p-4 border-l-4 border-purple-500 rounded-r-xl bg-purple-100">
                                    <div className="flex">
                                        <div className="flex-shrink-0">
                                            <TbClockExclamation className="h-5 w-5 text-purple-600" />
                                        </div>
                                        <div className="ml-3">
                                            <div className="text-sm text-purple-600">
                                                <p>
                                                    Es importante que la hora de tu dispositivo esté sincronizada
                                                    correctamente.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {dateTimeStep === "date" ? (
                            <div className="w-full flex flex-col items-center mb-4">
                                <CustomDatePicker
                                    selectedDate={selectedDate}
                                    onChange={setSelectedDate}
                                />
                            </div>
                        ) : (
                            <div className="w-full mb-2">
                                <div className="flex justify-center">
                                    <TimeSelector
                                        date={selectedDate}
                                        selectedTime={selectedTime}
                                        onChange={setSelectedTime}
                                    />
                                </div>
                                <div className="w-fit mt-5">
                                    <p>Fecha seleccionada</p>
                                    <p className="text-sm md:text-lg font-bold bg-gray-100 p-2 rounded-md">
                                        {selectedDate ? formatDate(selectedDate) : "N/A"}
                                    </p>
                                </div>
                            </div>
                        )}
                        <div className="flex justify-between">
                            {dateTimeStep === "date" && (
                                <button
                                    onClick={closeDateTimeModal}
                                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 mt-4"
                                >
                                    Cancelar
                                </button>
                            )}

                            {dateTimeStep === "time" && (
                                <button
                                    onClick={() => setDateTimeStep("date")}
                                    className="bg-gray-300 text-gray-700 md:w-fit px-4 py-2 rounded-md hover:bg-gray-400 mt-4"
                                >
                                    Volver
                                </button>
                            )}

                            {dateTimeStep === "date" && (
                                <button
                                    onClick={() => selectedDate && setDateTimeStep("time")}
                                    className={clsx("px-4 py-2 rounded-md mt-4", {
                                        "bg-blue-600 text-white hover:bg-blue-700": selectedDate,
                                        "bg-gray-600 text-white hover:bg-gray-700 cursor-not-allowed": !selectedDate,
                                    })}
                                    disabled={!selectedDate}
                                >
                                    Siguiente
                                </button>
                            )}

                            {dateTimeStep === "time" && (
                                <button
                                    onClick={handleConfirmDateTime}
                                    disabled={!selectedTime}
                                    className={clsx("px-4 py-2 rounded-md mt-4", {
                                        "bg-blue-600 text-white hover:bg-blue-700": selectedTime,
                                        "bg-gray-600 text-white hover:bg-gray-700 cursor-not-allowed": !selectedTime,
                                    })}
                                >
                                    Confirmar
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
            {/* Fin Selector de Fecha y Hora Integrado */}

            {isExpanded && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-20"
                    onClick={() => setIsExpanded(false)} // Cierra el modal al hacer clic fuera
                />
            )}

            <div
                className="fixed fade-in bottom-0 w-full bg-white z-30 px-2 shadow-2xl shadow-black rounded-t-2xl border border-t-gray-300"
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
                <div className="flex justify-between items-center p-3 cursor-pointer">
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
                        {/* Selector de Fecha y Hora Integrado */}
                        <div className="inline-flex mt-4 w-full">
                            <button
                                onClick={() => openDateTimeModal("date")}
                                className="px-4 py-2 cursor-pointer text-start w-full font-medium text-gray-900 bg-white border border-b-gray-500 border-l-gray-500 border-t-gray-500 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
                            >
                                <p className="text-xs font-semibold">Llegada</p>
                                <div className="flex justify-between items-center mt-1">
                                    <p className="text-sm font-extralight">
                                        {selectedDate ? formatDate(selectedDate) : "Seleccionar fecha"}
                                    </p>
                                    <FaRegEdit className="h-4 w-4" />
                                </div>
                            </button>
                            <div className="px-4 py-2 w-full font-medium text-gray-900 bg-white border border-gray-500 rounded-e-lg">
                                <p className="text-xs font-semibold">Salida</p>
                                <p className="text-sm mt-1 font-extralight">
                                    {departureDate ? formatDate(departureDate) : "Calculando..."}
                                </p>
                            </div>
                        </div>
                        {selectedDate && (
                            <button
                                onClick={() => openDateTimeModal("time")}
                                className="mt-2 border text-start w-full border-gray-500 px-4 py-2 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 "
                            >
                                <p className="text-xs font-semibold">Hora de entrada</p>
                                <div className="mt-1 flex items-center justify-between">
                                    <p className="text-sm font-extralight">
                                        {selectedTime ? formatTimeWithAmPm(new Date(selectedDate.setHours(Number(selectedTime.split(":")[0]), Number(selectedTime.split(":")[1])))) : "Selecciona una hora"}
                                    </p>
                                    <FaRegEdit className="h-4 w-4" />
                                </div>
                            </button>
                        )}

                        <TimeUsageSelector
                            currentTimeLimit={serviceUsageTime}
                            onTimeLimitChange={(hours) => {
                                setServiceUsageTime(hours)
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
                                        onClick={() => handleReservation(false)}
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

                                                            <button onClick={() => handleReservation(true)}>
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

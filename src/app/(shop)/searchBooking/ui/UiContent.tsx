'use client';

import { useEffect, useState } from "react";
import { AnonymousBooking } from "./booking/AnonymousBooking";
import { SearchCode } from "./searchCode/SearchCode";
import toast, { Toaster } from "react-hot-toast";
import { ReservationApi } from "@/interfaces/reservation.interface";
import { AiFillCloseCircle } from "react-icons/ai";
import axios from "axios";

interface Props {
    CodeBooking?: string
}

export const UiContent = ({ CodeBooking }: Props) => {

    const [getBooking, setgetBooking] = useState(false);
    const [onGetCode, setonGetCode] = useState<string | undefined | null>(CodeBooking);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingCookieCode, setIsLoadingCookieCode] = useState(false);
    const [isLoadingCodeUrl, setIsLoadingCodeUrl] = useState(false);
    const [booking, setBooking] = useState<ReservationApi | undefined>(undefined);


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
        setIsLoadingCodeUrl(true);
        async function fetchCode() {
            if (!CodeBooking) return;

            try {
                const response = await axios.get<ReservationApi>(`${process.env.NEXT_PUBLIC_API_ROUTE}service/anonymous-reservation/${CodeBooking}`);
                const encodedToken = encodeToken(response.data.id);
                localStorage.setItem("persist-reservation-anonymous", encodedToken);
                const url = new URL(window.location.href);
                url.searchParams.delete('codeBooking');
                window.history.replaceState({}, '', url.toString());
                setBooking(response.data);
                setgetBooking(true);
                setIsLoadingCodeUrl(false);
            } catch (error: any) {
                const url = new URL(window.location.href);
                url.searchParams.delete('codeBooking');
                window.history.replaceState({}, '', url.toString());
                setIsLoadingCodeUrl(false);
            }
        }

        fetchCode();
    }, []);


    useEffect(() => {
        setIsLoadingCookieCode(true);
        async function fetchTokenTransaction() {
            if (typeof window !== 'undefined') {
                const storedEncodedToken = localStorage.getItem("persist-reservation-anonymous");
                if (storedEncodedToken) {
                    const decodedToken = decodeToken(storedEncodedToken);
                    setonGetCode(decodedToken);
                    getBookingAnonymous(decodedToken);
                } else {
                    setIsLoadingCookieCode(false);
                }
            }
        }
        fetchTokenTransaction();
    }, []);


    const getBookingAnonymous = async (idBooking: string) => {
        if (!idBooking) return;
        try {
            const response = await axios.get<ReservationApi>(`${process.env.NEXT_PUBLIC_API_ROUTE}service/anonymous-reservation/${idBooking}`);
            const encodedToken = encodeToken(response.data.id);
            localStorage.setItem("persist-reservation-anonymous", encodedToken);
            setBooking(response.data);
            setgetBooking(true);
            setIsLoadingCodeUrl(false)

        } catch (error: any) {
            setIsLoading(false);
            setIsLoadingCookieCode(false);
            toast(
                (t) => (
                    <div>
                        <p className="text-red-600 font-semibold text-md md:text-xl">Código de Acceso No Existe</p>
                        <p className=" text-sm md:text-md text-gray-800">El código de acceso a la reserva anónima que ingresaste no es válido o no existe.</p>
                    </div>


                ),
                {
                    duration: 7000,
                    position: 'top-right',
                    style: {
                        padding: '16px',
                        color: '#f44336',
                        maxWidth: '600px',
                        width: '100%',
                    },
                    icon: <AiFillCloseCircle
                        className='text-red-600 hidden md:block  h-6 w-6'
                    />,
                    ariaProps: {
                        role: 'alert',
                        'aria-live': 'assertive',
                    },
                }
            );
        }


    }


    return (
        <>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            {
                getBooking
                    ? (
                        <AnonymousBooking reservation={booking!} />
                    ) : (
                        <SearchCode
                            codeBooking={(code) => {
                                setonGetCode(code);
                                setIsLoading(true);
                                getBookingAnonymous(code);
                            }}
                            loadCookieCode={isLoadingCookieCode}
                            loadSearch={isLoading}
                        />
                    )
            }

        </>
    )
}

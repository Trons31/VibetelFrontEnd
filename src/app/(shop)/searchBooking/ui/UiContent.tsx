'use client';

import { useEffect, useState } from "react";
import { AnonymousBooking } from "./booking/AnonymousBooking";
import { SearchCode } from "./searchCode/SearchCode";
import { getCookieCodeBookingAnonymous, getReservationById, setCookieCodeBookingAnonymous } from "@/actions";
import toast, { Toaster } from "react-hot-toast";
import { BookingUser, Reservation } from "@/interfaces/reservation.interface";
import { AiFillCloseCircle } from "react-icons/ai";

interface Props {
    CodeBooking?: string
}

export const UiContent = ({ CodeBooking }: Props) => {

    const [getBooking, setgetBooking] = useState(false);
    const [onGetCode, setonGetCode] = useState<string | undefined | null>(CodeBooking);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingCookieCode, setIsLoadingCookieCode] = useState(false);
    const [isLoadingCodeUrl, setIsLoadingCodeUrl] = useState(false);
    const [booking, setBooking] = useState<Reservation | undefined>(undefined);

    useEffect(() => {
        setIsLoadingCodeUrl(true);
        async function fetchCode() {
            if (!CodeBooking) return;

            const data = await getReservationById(CodeBooking);

            if (data.ok) {
                await setCookieCodeBookingAnonymous(CodeBooking);
                const url = new URL(window.location.href);
                url.searchParams.delete('codeBooking');
                window.history.replaceState({}, '', url.toString());
                setBooking(data.reservation);
                setgetBooking(true);
                setIsLoadingCodeUrl(false);
            } else {
                // Remover el parámetro de la URL si los datos no existen
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
        async function fetchTransactionId() {
            const cookieCodeBookingAnonymous = await getCookieCodeBookingAnonymous();
            console.log(cookieCodeBookingAnonymous);
            if (cookieCodeBookingAnonymous) {
                setonGetCode(cookieCodeBookingAnonymous);
                getBookingAnonymous(cookieCodeBookingAnonymous);
            } else {
                setIsLoadingCookieCode(false);
            }
        }
        fetchTransactionId();
    }, []);

    // useEffect(() => {
    //     const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
    //         cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
    //     });

    //     const channel = pusher.subscribe('reservations');

    //     channel.bind('completed-reservation-by-motel', (bookignEvent: BookingUser) => {
    //         if (booking?.id === bookignEvent.id) {
    //             window.location.replace(`/searchBooking`);
    //         }
    //     });

    //     channel.bind('confirm-reservation', (bookignEvent: BookingUser) => {
    //         if (booking?.ServiceItem?.id === bookignEvent.id) {
    //             window.location.replace(`/searchBooking`);
    //         }
    //     });

    //     return () => {
    //         channel.unbind_all();
    //         channel.unsubscribe();
    //     };
    // })

    const getBookingAnonymous = async (idBooking: string) => {
        const bookingAnonymous = await getReservationById(idBooking);

        if (!bookingAnonymous?.reservation) {
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
            return;
        }

        await setCookieCodeBookingAnonymous(idBooking);
        setBooking(bookingAnonymous.reservation);
        setgetBooking(true);
        setIsLoading(false);
        setIsLoadingCookieCode(false);
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

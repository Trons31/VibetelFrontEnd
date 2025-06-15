'use client';

import React, { useState, useEffect, useCallback } from 'react';
import debounce from 'lodash.debounce';
import { MdError } from 'react-icons/md';
import { formatDateWithHours } from '@/utils';
import { IoCloseOutline } from 'react-icons/io5';
import { searchAccessCode } from '@/actions';
import { ModalTakeReservation } from '@/components';

interface Props {
    motelId: string;
}

type Reservation = {
    id: string;
    title: string;
    arrivalDate: Date;
    accessCode: string | null;
    room: {
        roomNumber: string;
    };
}

export const AccessCodeCheckIn = ({ motelId }: Props) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [hasSearched, setHasSearched] = useState(false);


    const [isModalOpenTakeReservation, setIsModalOpenTakeReservation] = useState(false);
    const [reservation, setReservation] = useState<Reservation>();


    // Define the debounce function
    const debouncedSearch = useCallback(
        debounce(async (query: string) => {
            if (query.length === 0) {
                setReservations([]);
                setLoading(false);
                setError(''); // Clear error when search term is empty
                setHasSearched(false);
                return;
            }

            setLoading(true);
            setError('');
            setHasSearched(true);
            try {
                const result = await searchAccessCode(query, motelId);
                const formattedResult = result.map((res: {
                    id: string;
                    title: string;
                    arrivalDate: Date;
                    accessCode: string | null;
                    room: {
                        roomNumber: string;
                    };
                }) => ({
                    ...res,
                    accessCode: res.accessCode ?? '',
                }));
                setReservations(formattedResult);
            } catch (err) {
                setError('Error fetching reservations');
            } finally {
                setLoading(false);
            }
        }, 300), [motelId]);

    useEffect(() => {
        debouncedSearch(searchTerm);
    }, [searchTerm, debouncedSearch]);

    const onConfirmTakeReservation = (data: Reservation) => {
        setReservation(data);
        setIsModalOpenTakeReservation(true)
    }

    return (
        <>
            <ModalTakeReservation
                idReservation={reservation?.id!}
                accessCode={reservation?.accessCode}
                room={reservation?.title}
                roomNumber={reservation?.room.roomNumber}
                arrivalDate={reservation?.arrivalDate}
                isOpen={isModalOpenTakeReservation}
                onClose={() => setIsModalOpenTakeReservation(false)}
                onSearchTerm={() => setSearchTerm("")}
            />
            <div className="bg-white rounded-lg">
                <div className="py-5">
                    <div className="mt-5 px-6 leading-6">
                        <div className="mb-5">
                            <h1 className="text-2xl font-bold text-gray-900">Código de acceso</h1>
                            <span className="text-sm text-gray-500">
                                Para confirmar el inicio del servicio de reserva, se debe solicitar al usuario el código de acceso por seguridad. De esta forma se asegura la entrada al motel de la persona que reservó.
                            </span>
                        </div>
                        <form className="relative flex w-full flex-col justify-between rounded-lg border p-2 sm:flex-row sm:items-center sm:p-0" onSubmit={(e) => e.preventDefault()}>
                            <div className="relative flex w-full sm:flex-grow">
                                <input
                                    type="text"
                                    name="search"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="ml-1 h-13 w-full cursor-text rounded-md border py-4 pl-5 pr-10 outline-none ring-blue-200 sm:border-0 focus:ring"
                                />
                                {
                                    searchTerm && (
                                        <IoCloseOutline
                                            size={30}
                                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-red-600 cursor-pointer"
                                            onClick={() => setSearchTerm("")}
                                        />
                                    )
                                }

                            </div>

                            <button className="inline-flex h-12 w-full items-center justify-center rounded-md bg-blue-500 px-10 text-center align-middle text-base font-medium normal-case text-white outline-none ring-blue-200 ring-offset-1 sm:w-32 focus:ring">
                                Buscar
                            </button>
                        </form>


                        <div className="mt-4 divide-y rounded-b-xl border shadow-lg">
                            {loading && (
                                <div className="flex w-full justify-center items-center gap-x-4 rounded-b-xl bg-blue-600 py-3 font-medium text-white">
                                    <svg className="h-5 w-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span>Cargando...</span>
                                </div>
                            )}

                            {error && !loading && searchTerm.length > 0 && (
                                <div className="flex w-full justify-center items-center gap-x-4 rounded-b-xl bg-red-600 py-3 font-medium text-white">
                                    <MdError />
                                    <span>{error}</span>
                                </div>
                            )}

                            {!loading && hasSearched && reservations.length === 0 && (
                                <div className="flex w-full justify-center items-center gap-x-4 rounded-b-xl bg-red-600 py-3 font-medium text-white">
                                    <MdError size={20} />
                                    <span>El código de acceso no es valido</span>
                                </div>
                            )}

                            {reservations.map((reservation, index) => (
                                <div key={index} className="cursor-pointer px-4 py-2 text-gray-600 hover:text-blue-600">
                                    <div className="flex justify-between items-center">
                                        <span className="m-0 font-medium">{reservation.accessCode}</span>
                                        <span>{reservation.title} Nro° {reservation.room.roomNumber}</span>
                                        <span> {formatDateWithHours(reservation.arrivalDate)}</span>
                                        <button
                                            onClick={() => onConfirmTakeReservation(reservation)}
                                            className="bg-blue-500 hover:bg-blue-600 transition-all rounded-md text-white duration-150 p-2 hover:text-white">
                                            Confirmar entrada
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

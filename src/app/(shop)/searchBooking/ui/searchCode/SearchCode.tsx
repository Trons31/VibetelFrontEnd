'use client';
import { sleep } from "@/utils";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { IoCheckmark } from "react-icons/io5";

interface Props {
    codeBooking: (code: string) => void;
    loadSearch: boolean;
    loadCookieCode: boolean;
}

export const SearchCode = ({ codeBooking, loadSearch, loadCookieCode }: Props) => {

    const [searchCode, setsearchCode] = useState("")

    const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (searchCode === "") return;
            codeBooking(searchCode);
        }
    };

    const onSearchCode = async () => {
        if (searchCode === "") return;
        codeBooking(searchCode);
    }

    return (
        <>
            <div className="hidden md:flex flex-col items-center mt-16 border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
                <p className="text-2xl font-bold px-2 text-gray-800"> Gestiona tu reserva anonima </p>
                <div className="flex justify-start w-full md:w-fit md:justify-end mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base">
                    <div className="px-6">
                        <ul className="relative flex w-full flex-col justify-start gap-4 sm:flex-row sm:items-center">
                            <li className="flex items-center space-x-3 text-left sm:space-x-4">
                                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2" >1</div>
                                <span className="font-semibold text-xs text-gray-900">Introduce tu codigo</span>
                            </li>
                            <IoIosArrowForward className="hidden h-4 w-4 text-gray-400 sm:block" />

                            <li className="flex items-center space-x-3 text-left sm:space-x-4">
                                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2" >2</div>
                                <span className="font-semibold text-xs text-gray-900">Gestiona tu reserva</span>
                            </li>

                            <IoIosArrowForward className="hidden h-4 w-4 text-gray-400 sm:block" />

                            <li className="flex items-center space-x-3 text-left sm:space-x-4">
                                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2" >2</div>
                                <span className="font-semibold text-xs text-gray-900">Protege tu codigo</span>
                            </li>


                        </ul>

                    </div>
                </div>
            </div>


            <div className="relative h-screen mt-10 md:mt-0 flex items-center" >

                {
                    loadCookieCode &&
                    (
                        <div className="absolute bg-white bg-opacity-60 z-10 h-full w-full flex items-center justify-center">
                            <div className="flex items-center">
                                <svg width="30" height="30" fill="currentColor" className="mr-2  text-red-600 animate-spin" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z">
                                    </path>
                                </svg>
                            </div>
                        </div>
                    )
                }

                <div className=" md:mx-auto w-full rounded-3xl border-gray-600 px-2">
                    <h2 className="text-center text-lg md:text-4xl font-bold">Accede a tu reserva anonima</h2>
                    <p className="mt-1 text-center text-xs md:text-2xl font-light">Ingresa el código de reserva que se te proporcionó al reservar tu habitación</p>
                    <div className="mx-auto mt-8 flex max-w-2xl flex-col border-gray-600 bg-white sm:flex-row sm:rounded-full sm:border">
                        <input
                            onChange={(e) => setsearchCode(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="m-2 h-12 rounded-full px-4 text-sm md:text-lg text-gray-500 ring ring-red-400 sm:w-full sm:ring-0 focus:outline-none focus:ring"
                            placeholder="Código de reserva"
                            type="text"
                            name="reservationCode"
                        />
                        <button
                            onClick={onSearchCode}
                            disabled={loadSearch}
                            className={
                                clsx(

                                    {
                                        "flex items-center justify-center shrink-0 m-2 rounded-full bg-red-600 px-8 py-3 font-medium text-white  hover:bg-red-700": !loadSearch,
                                        "flex items-center justify-center gap-x-4 shrink-0 m-2 rounded-full bg-red-600 px-8 py-3 font-medium text-white  hover:bg-red-700 cursor-not-allowed": loadSearch
                                    }
                                )
                            }>
                            {
                                loadSearch &&
                                (<svg className="h-5 w-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" ></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>)
                            }

                            {
                                loadSearch
                                    ? "Cargando..."
                                    : "Buscar reserva"

                            }

                        </button>
                    </div>
                </div>
            </div>


        </>
    )
}

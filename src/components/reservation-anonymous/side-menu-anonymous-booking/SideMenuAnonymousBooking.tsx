'use client';
import { deleteCookieCodeBookingAnonymous } from '@/actions';
import { BsIncognito } from 'react-icons/bs';

export const SideMenuAnonymousBooking = () => {

    const handleLogout = () => {
        deleteCookieCodeBookingAnonymous();
        window.location.replace("/searchBooking");
    };

    return (
        <div className="col-span-2 hidden pt-24 sm:block border-r border-solid bg-white ">

            <div className="relative py-3 mx-2 overflow-hidden rounded-md bg-red-600 ">
                <div className="z-10 flex h-full items-center justify-center  w-full">
                    <div>
                        <div className='flex justify-center' >
                            <BsIncognito className='h-12 w-12 text-white' />
                        </div>
                        <h1 className="text-center text-xl font-bold text-white">Reserva anonima</h1>
                        <p className="text-sm text-center text-white">privaciada y seguridad</p>
                    </div>
                </div>
                <div className="-z-1 absolute bottom-3 left-3 h-24 w-24 rounded-full bg-white bg-gradient-to-b from-white to-red-600 opacity-20"></div>
                <div className="-z-1 absolute -top-10 left-1/2 h-24 w-24 rounded-full bg-white bg-gradient-to-b from-white to-red-600 opacity-20"></div>
            </div>

            <div className='flex justify-center w-full px-1 mt-2' >
                <button
                    onClick={handleLogout}
                    className='p-2 rounded-md w-full bg-blue-600 text-white ' >
                    Salir y Proteger reserva
                </button>
            </div>
        </div>
    )
}

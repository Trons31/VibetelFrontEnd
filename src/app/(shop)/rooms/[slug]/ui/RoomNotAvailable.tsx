'use client';
import React, { useEffect, useState } from 'react'
import { IoInformationCircleSharp } from 'react-icons/io5'

export const RoomNotAvailable = () => {

    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const footer = document.getElementById('footer');
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            const footerOffsetTop = footer ? footer.offsetTop : document.body.scrollHeight;

            // Ocultar si está cerca del footer
            if (scrollY + windowHeight >= footerOffsetTop - 200) {
                setIsVisible(false);
            }
            // Mostrar cuando el usuario suba
            else if (scrollY < lastScrollY) {
                setIsVisible(true);
            }

            setLastScrollY(scrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    return (
        <>
            <div className={`fixed hidden md:flex items-center gap-4 z-10 bottom-5 left-1/2 -translate-x-1/2 bg-black p-3 rounded ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
                } `}>
                <IoInformationCircleSharp className='h-5 w-5 text-white' />
                <p className="text-white text-sm">Habitación no disponible actualmente</p>
            </div>

            <div className="fixed w-fit flex justify-center md:hidden items-center gap-4 z-10 top-24 right-0 bg-black p-3 rounded-l-lg">
                <IoInformationCircleSharp className='h-5 w-5 text-white' />
                <p className="text-white text-xs">Habitación no disponible actualmente</p>
            </div>
        </>
    )
}

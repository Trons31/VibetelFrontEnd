'use client';
import React, { useEffect, useState } from 'react'
import { formatDate } from '@/utils';
import { MdBlockFlipped } from 'react-icons/md'

interface Props {
    startDateOffService: Date;
    endDateOffService: Date;
}

export const NoService = ({ endDateOffService, startDateOffService }: Props) => {

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
            <button className={`group fixed hidden md:flex items-center gap-4 z-10 bottom-5 left-1/2 -translate-x-1/2 bg-black hover:bg-white hover:text-black border border-black  p-3 rounded shadow-lg transition-all duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`} >
                <MdBlockFlipped className='h-5 w-5 text-white group-hover:text-black flex-shrink-0' />
                <p className="text-white text-sm group-hover:text-black ">El motel está fuera de servicio desde {startDateOffService ? formatDate(startDateOffService) : "desconocido"} hasta {endDateOffService ? formatDate(endDateOffService) : "desconocido"}</p>
            </button>

            <button className={`fixed flex md:hidden items-center gap-4 z-10 bottom-4 bg-black p-3 rounded-md mx-4 transition-all duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}>
                <MdBlockFlipped className='h-5 w-5 text-white flex-shrink-0' />
                <p className="text-white text-xs text-center">El motel está fuera de servicio desde {startDateOffService ? formatDate(startDateOffService) : "desconocido"} hasta {endDateOffService ? formatDate(endDateOffService) : "desconocido"}</p>
            </button>
        </>
    )
}

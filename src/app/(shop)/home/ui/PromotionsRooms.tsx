'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { BiSolidDiscount } from 'react-icons/bi';

export const PromotionRooms = () => {
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
      <Link
        href="/rooms"
        className={`group fixed hidden md:flex items-center gap-4 z-10 bottom-5 left-1/2 -translate-x-1/2 bg-red-600 hover:bg-white hover:text-red-600 border border-red-600 p-3 rounded shadow-lg transition-all duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <BiSolidDiscount className="h-5 w-5 text-white group-hover:text-red-600 flex-shrink-0" />
        <p className="text-white text-sm group-hover:text-red-600">
          ¡No te pierdas las mejores promociones! Reserva ahora y ahorra
        </p>
      </Link>

      <Link
        href="#"
        className={`fixed flex md:hidden items-center gap-4 z-10 bottom-4 bg-red-600 p-3 rounded-md mx-4 transition-all duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <BiSolidDiscount className="h-5 w-5 text-white flex-shrink-0" />
        <p className="text-white text-xs text-center">
          ¡No te pierdas las mejores promociones! Reserva ahora y ahorra
        </p>
      </Link>
    </>
  );
};

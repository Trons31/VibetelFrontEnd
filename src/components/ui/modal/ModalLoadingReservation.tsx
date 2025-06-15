'use client';
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const texts = [
  'Validando fechas...',
  'Reservando habitación...',
  'Validando información...',
  'Procesando solicitud...',
  'Confirmando disponibilidad...',
];

export const ModalLoadingReservation = ({ isOpen, onClose }: ModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;


  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm"
    >
      <div className="bg-white md:rounded-lg  w-full md:w-1/2 lg:w-1/3   overflow-hidden">

        <div className='flex justify-center py-4 pb-5 px-4' >
          <div>
            <p className='font-medium text-md text-gray-500 animate-pulse' >Espere un momento</p>
            <div className='flex justify-center mt-2' >
              <div className="flex items-center justify-center">
                <div className="relative">
                  <div className="h-8 w-8 rounded-full border-t-4 border-b-4 border-gray-200"></div>
                  <div className="absolute top-0 left-0 h-8 w-8 rounded-full border-t-4 border-b-4 border-blue-500 animate-spin">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative h-[120px] bg-gray-100 flex items-center justify-center">
          <div className="carousel-container w-full h-full overflow-hidden relative">
            <motion.div
              className="carousel-content"
              initial={{ y: 0 }}
              animate={{ y: ['0%', '-50%'] }}
              transition={{
                duration: 8,
                ease: [0.25, 0.1, 0.25, 1],
                repeat: Infinity,
                repeatType: 'loop',
              }}
            >
              {texts.map((text, index) => (
                <div
                  key={index}
                  className="carousel-item h-[40px] flex items-center justify-center text-center text-lg text-gray-800"
                >
                  {text}
                </div>
              ))}
              {texts.map((text, index) => (
                <div
                  key={index + texts.length}
                  className="carousel-item h-[40px] flex items-center justify-center text-center text-lg text-gray-800"
                >
                  {text}
                </div>
              ))}
            </motion.div>
            {/* Capa de desenfoque */}
            <div className="blur-overlay absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="blur-top absolute top-0 w-full h-[40px] bg-transparent backdrop-blur-[2px]"></div>
              <div className="blur-bottom absolute bottom-0 w-full h-[40px] bg-transparent backdrop-blur-[2px]"></div>
              {/* Área central enfocada */}
              <div className="focus-area h-[40px] w-full bg-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

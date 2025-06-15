'use client';
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion'
import { IoIosArrowForward } from 'react-icons/io';
import { RoomManager } from '@/components';

interface Props {
  isOpen: boolean;
  motelId: string;
  onClose: () => void;
}

export const SheedRoom = ({ isOpen, onClose, motelId }: Props) => {




  useEffect(() => {
    if (isOpen) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'auto';
    }

    return () => {
      document.body.style.overflowY = 'auto';
    };
  }, [isOpen]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const onCloseSheed = () => {
    onClose();
  }

  return (
    <>
      <AnimatePresence>
        {
          isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className='fixed inset-0 z-30 flex items-center justify-end bg-black bg-opacity-50 backdrop-blur-sm'
              onClick={handleBackdropClick}
            >

              <div className='bg-white w-9/12 h-screen ' >
                <button
                  onClick={onCloseSheed}
                  className="flex items-center w-full gap-2 justify-between p-4 bg-blue-600 hover:bg-blue-700  transition-all duration-200 text-white"
                >
                  <h2 className="text-lg font-semibold ">
                    Gestion de habitaciones
                  </h2>
                  <IoIosArrowForward className="h-5 w-5" />
                </button>
                <div className='mb-20 h-full custom-scrollbar overflow-y-scroll pb-20'>
                  <div className='px-10 py-5 mt-5' >
                    <p className='text-2xl font-semibold' >Gestión de habitaciones</p>
                    <p className='text-gray-500 text-sm text-start' >Aqui podras gestionar de forma rapida las configuraciones basicas de tus habitaciones si quieres configurar mas ve a <Link href="/admin/dashboard-partner-motel/room" className='underline' >habitaciones</Link></p>
                  </div>
                  <div className='px-5' >
                    <RoomManager
                      motelId={motelId}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )
        }
      </AnimatePresence>
    </>
  )
}

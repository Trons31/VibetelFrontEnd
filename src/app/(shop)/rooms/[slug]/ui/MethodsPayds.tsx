'use client';
import { ModalMethodsPayds } from '@/components';
import React, { useState } from 'react'

export const MethodsPayds = () => {
    const [openModalMethodsPayds, setOpenModalMethodsPayds] = useState(false);
    return (
        <>
            <ModalMethodsPayds
                isOpen={openModalMethodsPayds}
                onClose={() => setOpenModalMethodsPayds(false)}
            />

            <button
                onClick={() => setOpenModalMethodsPayds(true)}
                className="rounded-full py-1.5 px-3 border border-black text-xs md:text-sm text-black hover:bg-black hover:text-white transition-all duration-300" >
                Metodos de pagos disponibles
            </button>
        </>
    )
}

'use client';
import React, { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { TbClockExclamation } from 'react-icons/tb';

interface ModalProps {
    isOpen: boolean;
}

export const ModalValidTimeClient = ({ isOpen }: ModalProps) => {


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
        <>
            <Toaster position="top-right" reverseOrder={false} />
            <div
                className="fixed fade-in inset-0 z-50 overflow-y-hidden md:p-5 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
            >
                <div className="bg-white md:rounded-lg shadow-lg w-full md:w-1/2 lg:w-1/2 p-2 md:p-6 max-h-full overflow-y-auto">
                    <div className="block md:flex justify-center p-2 rounded-lg gap-2 items-center">
                        <div className="p-2 flex justify-center">
                            <TbClockExclamation size={25} className="text-red-500" />
                        </div>
                        <p className="text-center text-lg md:text-xl">
                            La hora de tu dispositivo está mal configurada
                        </p>
                    </div>

                    <div className="mt-2 text-center ">
                        <p className='text-sm md:text-md  font-extralight' style={{ textAlign: 'justify' }}>
                            Para garantizar el correcto funcionamiento de la plataforma de reservas, es necesario que la hora de tu dispositivo esté configurada correctamente. Una configuración incorrecta puede impedirte realizar reservas o sincronizar correctamente con nuestra base de datos. Esto asegura que la información como horarios de llegada, disponibilidad de habitaciones y otros datos relevantes se procese sin errores.
                        </p>
                        <p className="mt-4 text-sm md:text-md font-extralight" style={{ textAlign: 'justify' }}>
                            Por favor, verifica y ajusta la hora y fecha de tu dispositivo en la configuración. Recomendamos activar la opción de sincronización automática con el servidor de hora de tu sistema operativo para evitar discrepancias. Una vez que hayas ajustado la hora correctamente, vuelve a intentar realizar tu reserva.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

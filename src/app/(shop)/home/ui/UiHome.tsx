'use client';
import React, { useCallback, useEffect, useState } from 'react'
import { GridMotel, ModalLocationUser, ModalLocationUserMovil, NoLocationUser } from '@/components';
import { LocationCity, MotelApi } from '@/interfaces';
import { useLocationStore } from '@/store';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import axios from 'axios';


export const UiHome = () => {

    const { locationUser } = useLocationStore();

    const [motels, setMotels] = useState<MotelApi[]>([]);
    const [locationLoaded, setLocationLoaded] = useState(false);
    const [detectedLocation, setDetectedLocation] = useState<LocationCity | undefined>(undefined);
    const [modalLocationUser, setModalLocationUser] = useState(false);

    const [isLoading, setIsLoading] = useState(true);

    const fetchMotels = useCallback(async () => {
        if (!detectedLocation) return;
        setIsLoading(true);

        try {
            const response = await axios.get<{ motels: MotelApi[], total: number }>(`${process.env.NEXT_PUBLIC_API_ROUTE}motel?cityId=${detectedLocation.id}`);
            setMotels(response.data.motels);
        } catch (error: any) {
            setMotels([]);
            redirect("/");
        } finally {
            setIsLoading(false);
        }


        setIsLoading(false);
    }, [detectedLocation]);


    useEffect(() => {
        // Aquí suponemos que locationUser es un valor que eventualmente se obtiene
        if (locationUser !== null) {
            setDetectedLocation(locationUser);
            setLocationLoaded(true);
        } else if (!locationLoaded) {
            // Si no se ha cargado completamente, esperar
            setTimeout(() => {
                setLocationLoaded(true);
            }, 3000); // Tiempo máximo para cargar
        }
    }, [locationUser, locationLoaded]);

    useEffect(() => {
        if (locationLoaded) {
            if (detectedLocation) {
                fetchMotels(); // Continuar flujo si hay ubicación detectada
            } else {
                setIsLoading(false); // Detener carga si no hay ubicación
            }
        }
    }, [locationLoaded, detectedLocation]);

    return (
        <>

            <ModalLocationUser
                isOpen={modalLocationUser}
                onClose={() => setModalLocationUser(false)}
            />

            <ModalLocationUserMovil
                isOpen={modalLocationUser}
                onClose={() => setModalLocationUser(false)}
            />

            {
                isLoading
                    ? (
                        <div className="flex flex-col justify-center items-center h-screen">
                            <div className="flex-grow flex justify-center items-center">
                                <div className="px-5" >
                                    <svg className="h-5 w-5 animate-spin text-red-600 " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    ) : (

                        detectedLocation
                            ? (
                                <>
                                    {/* <SlideShowMotel /> */}
                                    <div className=" mt-10" >
                                        {
                                            motels.length > 0
                                                ? (
                                                    <>
                                                        <GridMotel motels={motels} />
                                                    </>
                                                )
                                                : (
                                                    <>
                                                        <section className="bg-white  mt-10  flex px-2 items-center mb-10 ">
                                                            <div className="py-8 px-2 md:px-4 mx-auto max-w-screen-xl text-center lg:py-16">
                                                                <h1 className="text-xl font-extrabold tracking-tight leading-none text-gray-900 md:text-4xl ">No hay moteles registrados actualmente</h1>
                                                                <p className="mb-4 text-sm font-normal text-gray-500  md:text-md px-2 lg:px-24 ">Por favor, vuelve a intentarlo más tarde.</p>
                                                                <div className="flex flex-col sm:flex-row sm:justify-center sm:space-y-0">
                                                                    <Link href="/" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
                                                                        Ir al inicio
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                        </section>

                                                    </>
                                                )
                                        }
                                    </div >
                                </>
                            ) : (
                                <NoLocationUser
                                    onLocation={() => setModalLocationUser(true)}
                                />
                            )

                    )
            }

        </>
    )
}

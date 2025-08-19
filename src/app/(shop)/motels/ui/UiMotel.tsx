'use client';
import React, { useEffect, useState } from 'react'
import { ModalLocationUser, ModalLocationUserMovil, NoLocationUser } from '@/components';
import { LocationCity } from '@/interfaces';
import { useLocationStore } from '@/store';
import { CardMotel } from './CardMotel';
import { MotelsInMap } from './MotelsInMap';

type Step = 'location' | 'motels';

export const UiMotel = () => {
    const [step, setStep] = useState<Step>('motels');

    const { locationUser } = useLocationStore();
    const [detectedLocation, setDetectedLocation] = useState<LocationCity | undefined>(undefined);
    const [modalLocationUser, setModalLocationUser] = useState(false);
    const [isLoadingLocationUser, setIsLoadingLocationUser] = useState(true);

    useEffect(() => {
        if (locationUser) {
            setDetectedLocation(locationUser);
        }
        setIsLoadingLocationUser(false);
    }, [locationUser]);

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

                isLoadingLocationUser ?
                    (
                        <>
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
                        </>
                    ) : (
                        detectedLocation
                            ? (
                                <div className='py-10' >
                                    {/* <div className="flex justify-center mb-6">
                                        <div className="inline-flex rounded-md shadow-sm" role="group">
                                            <button
                                                type="button"
                                                onClick={() => setStep('motels')}
                                                className={`px-4 py-2 text-sm font-medium rounded-l-lg ${step === 'motels'
                                                    ? 'bg-red-600 text-white'
                                                    : 'bg-white text-gray-700 hover:bg-gray-100'
                                                    } border border-gray-200`}
                                            >
                                                <span className="flex items-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                                    </svg>
                                                    Tarjetas
                                                </span>
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setStep('location')}
                                                className={`px-4 py-2 text-sm font-medium rounded-r-lg ${step === 'location'
                                                    ? 'bg-red-600 text-white'
                                                    : 'bg-white text-gray-700 hover:bg-gray-100'
                                                    } border border-gray-200`}
                                            >
                                                <span className="flex items-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                                                    </svg>
                                                    Mapa
                                                </span>
                                            </button>
                                        </div>
                                    </div> */}

                                    {
                                        step === 'motels' && (
                                            <CardMotel
                                                location={detectedLocation}
                                            />
                                        )
                                    }
                                    {
                                        step === 'location' && (
                                            <MotelsInMap />
                                        )
                                    }
                                </div>
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

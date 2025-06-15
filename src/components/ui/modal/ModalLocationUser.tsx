'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { MdClose, MdEditLocationAlt, MdOutlineMyLocation } from 'react-icons/md';
import { getLocationByUser, validateExistsMotelLocationUser } from '@/actions';
import { useLocationStore, useUIStore } from '@/store';
import toast, { Toaster } from 'react-hot-toast';
import debounce from 'lodash.debounce';
import clsx from 'clsx';
import { IoMdCloseCircle } from 'react-icons/io';
import { TbCircleCheckFilled } from 'react-icons/tb';
import { FaLocationDot, FaArrowLeft, FaMagnifyingGlassLocation } from 'react-icons/fa6';
import { motion } from 'framer-motion';
import { searchCity } from '@/interfaces';
import { AiFillCloseCircle } from 'react-icons/ai';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const ModalLocationUser = ({ isOpen, onClose }: ModalProps) => {
    const [showLoading, setShowLoading] = useState(false);
    const [hideContent, setHideContent] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);
    const [error, setError] = useState('');

    const { locationUser } = useLocationStore();
    const addLocationUser = useLocationStore(state => state.addLocationUser);
    const openToastSuccessLocationUserOpen = useUIStore(state => state.openToastSuccessLocationUserOpen);


    const [citys, setCitys] = useState<searchCity[]>([]);
    const [selectedCity, setSelectedCity] = useState<searchCity | undefined>(undefined);

    const pathName = usePathname();

    const debouncedSearch = useCallback(
        debounce(async (query: string) => {

            if (query.length === 0) {
                setCitys([]);
                setLoading(false);
                setError(''); // Clear error when search term is empty
                setHasSearched(false);
                return;
            }

            setLoading(true);
            setError('');
            setHasSearched(true);
            try {
                const { city } = await getLocationByUser(query);
                setCitys(city);
            } catch (err) {
                setError('No se pudieron obtener las ciudades');
            } finally {
                setLoading(false);
            }
        }, 300), // Adjust the debounce delay as needed
        []
    );

    const handleLocationClick = async () => {
        setLoading(true);
        if (!navigator.geolocation) {
            toast.error("La geolocalización no es compatible con tu navegador.");
            setLoading(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;

            fetch(
                `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
            )
                .then((response) => response.json())
                .then((data) => {
                    if (data && data.address) {

                        const cityData: searchCity = {
                            country: data.address.country || '',
                            department: data.address.state || '',
                            city: data.address.city || data.address.town || data.address.village || '',
                        };

                        onValidateCity(cityData);
                        setLoading(false);

                    } else {
                        setError("Could not retrieve city information.");
                        setLoading(false);

                    }
                })
                .catch(() => { setError("Error fetching city information."), setLoading(false); });

        }, (error) => {
            toast.error("No se pudo obtener la ubicación. Verifica permisos y configuración.");
            setLoading(false);
        });
    };

    // Ensure consistent useEffect calls
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

    useEffect(() => {
        debouncedSearch(searchTerm);
    }, [searchTerm, debouncedSearch]);

    if (!isOpen) return null;

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!showLoading && e.target === e.currentTarget) {
            setSelectedCity(undefined);
            setHasSearched(false);
            setSearchTerm('');
            setHideContent(false);
            onClose();
        }
    };

    const onCloseModal = () => {
        setSelectedCity(undefined);
        setHasSearched(false);
        setSearchTerm('');
        setHideContent(false);
        onClose();
    }

    const handleInputClick = () => {
        setHideContent(true);
    };

    const handleBackClick = () => {
        setSelectedCity(undefined);
        setHasSearched(false);
        setSearchTerm('');
        setHideContent(false);
    };

    const onValidateCity = async (city: searchCity) => {
        setLoading(true);
        const { validateExist } = await validateExistsMotelLocationUser(city.city);
        if (validateExist) {
            setSelectedCity(city);
            //setSearchTerm(`${city.city}, ${city.department}, ${city.country}`);
            setHasSearched(false); // Detener nuevas búsquedas
            setLoading(false);

        } else {
            toast(
                (t) => (
                    <div>
                        <h3 className="text-red-600 font-semibold">Ubicación No Disponible</h3>
                        <p className="text-sm text-gray-800">Actualmente, no ofrecemos cobertura en esta ubicación.</p>
                        <p className="text-xs font-medium text-gray-500">
                            {city.city}, {city.department}, {city.country}
                        </p>
                    </div>

                ),
                {
                    duration: 6000,
                    position: 'top-right',
                    style: {
                        padding: '16px',
                        color: '#f44336',
                        maxWidth: '500px',
                        width: '100%',
                    },
                    icon: <AiFillCloseCircle
                        className='text-red-600 h-6 w-6'
                    />,
                    ariaProps: {
                        role: 'alert',
                        'aria-live': 'assertive',
                    },
                }
            );
            setLoading(false);
        }
    }

    const onAddLocationUser = () => {
        if (selectedCity) {
            addLocationUser(selectedCity);
            setSearchTerm("");
            setHideContent(false);
            setSelectedCity(undefined);
            openToastSuccessLocationUserOpen();
            if (pathName === "/") {
                window.location.replace("/home");
            }
            onClose();
        }

    }


    const onUpdateLocation = () => {
        if (locationUser) {
            setHideContent(true);
            setSelectedCity(locationUser);
            setSearchTerm(locationUser.city);
        }
    }

    return (
        <>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            <div
                className="fixed fade-in inset-0 z-50 hidden md:flex items-center py-5 justify-center bg-black bg-opacity-50 backdrop-blur-sm"
                onClick={handleBackdropClick}
            >
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white md:rounded-md shadow-lg w-full md:w-1/3 h-full md:h-[90%] flex flex-col justify-between"
                >

                    <div className="flex-1">

                        {/* Si el contenido está oculto, mostramos el icono de volver */}
                        {!hideContent && (
                            <>
                                {/* Contenido principal */}
                                <div className="flex mt-1 p-2 md:px-6 justify-between items-start">
                                    <div className='py-2' >
                                        <p className="font-semibold text-gray-900 text-md">
                                            Indica la ciudad donde te encuentras
                                        </p>
                                    </div>
                                    <div className='p-2 hover:bg-gray-200 cursor-pointer rounded-full' >
                                        <MdClose
                                            onClick={onCloseModal}
                                            className="w-5 h-5"
                                        />
                                    </div>
                                </div>
                            </>
                        )}

                        {/* Input de dirección */}
                        <div className="p-2 md:px-6">
                            <div className="flex gap-2 w-full">
                                {hideContent && (
                                    <div className="flex items-center">
                                        <FaArrowLeft
                                            onClick={handleBackClick}
                                            className="h-5 w-5 cursor-pointer text-gray-700"
                                        />
                                    </div>
                                )}

                                <div className="relative w-full" >
                                    <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                        <FaLocationDot className="w-5 h-5 text-gray-700" />
                                    </div>

                                    <div className="flex items-center">
                                        <input
                                            type="text"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            onClick={handleInputClick}
                                            className="bg-gray-200 border-2 border-white hover:border-gray-400 focus:border-blue-500 focus:ring-blue-500 focus:outline-none text-gray-900 text-sm rounded-lg block w-full ps-10 p-3 placeholder-gray-600 pr-10" // Adjust padding for icons
                                            placeholder="Escribe tu dirección"
                                        />

                                        {/* Icono de carga */}
                                        {loading && (
                                            <div className="absolute inset-y-0 end-0 flex items-center pr-3">
                                                <svg className="h-5 w-5 animate-spin text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                            </div>
                                        )}

                                        {/* Icono de cerrar */}
                                        {hasSearched && !loading && (
                                            <div className="absolute inset-y-0 end-0 flex items-center pr-3">
                                                <IoMdCloseCircle className="text-gray-700 w-5 h-5 cursor-pointer"
                                                    onClick={() => setSearchTerm('')}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>

                            </div>
                        </div>

                        <hr />

                        {
                            hideContent && (
                                !loading && hasSearched && citys.length === 0 && (
                                    <div className='mt-36 flex items-center justify-center' >
                                        <div>
                                            <p className='flex justify-center text-center' >No se han encontrado resultados.</p>
                                            <p>Por favor verifica la dirección ingresada.</p>
                                        </div>
                                    </div>
                                )
                            )

                        }

                        {
                            !hideContent && locationUser && (
                                <div
                                    className='p-5 flex hover:bg-gray-100 cursor-pointer justify-between items-center' >
                                    <div className='flex gap-3 items-center' >
                                        <TbCircleCheckFilled
                                            className='text-blue-600 w-6 h-6'
                                        />
                                        <div>
                                            <p className='text-lg font-semibold' >
                                                {locationUser.city}
                                            </p>
                                            <p className='text-sm text-gray-500' >
                                                {locationUser.department}, {locationUser.country}
                                            </p>
                                        </div>
                                    </div>
                                    <div
                                        className='p-5 hover:bg-gray-200  cursor-pointer rounded-full' >
                                        <MdEditLocationAlt
                                            onClick={onUpdateLocation}
                                            className='text-gray-500 w-6 h-6'
                                        />
                                    </div>
                                </div>
                            )
                        }



                        {
                            !hideContent && !locationUser && !selectedCity && (
                                <div className='mt-36 flex gap-3 justify-center items-center' >
                                    <FaMagnifyingGlassLocation
                                        className='w-6 h-6 text-gray-500'
                                    />
                                    <p className='text-gray-600 text-lg font-semibold' >Ingresa tu ubicacion</p>
                                </div>
                            )
                        }

                        {hideContent && (
                            <ul className='overflow-y-auto h-[400px] custom-scrollbar' >

                                {
                                    searchTerm !== "" && (

                                        citys.map((city) => (
                                            <li
                                                onClick={() => onValidateCity(city)}
                                                key={city.cityId}
                                                className={
                                                    clsx(
                                                        'hover:bg-gray-100 cursor-pointer py-2 border-b border-solid border-b-gray-300',
                                                        {
                                                            "bg-gray-100": selectedCity?.city === city.city
                                                        }
                                                    )
                                                }>
                                                <div className='py-3 w-full px-5 animate-fadeIn'>
                                                    <div className='block justify-start ' >
                                                        <p className='text-md font-medium capitalize' >
                                                            {city.city}
                                                        </p>
                                                        <p className='text-sm text-gray-500 flex gap-2' >
                                                            {city.department}, {city.country}
                                                        </p>
                                                    </div>
                                                </div>
                                            </li>
                                        ))
                                    )

                                }
                            </ul>
                        )}
                    </div>

                    {
                        selectedCity && (
                            <div className='flex gap-2 justify-center p-2 items-center' >
                                <p className='text-sm font-medium text-gray-500' >Ubicacion seleccionada: {selectedCity?.city}, {selectedCity?.department}, {selectedCity?.country} </p>
                                <div className='p-2 hover:bg-gray-200 cursor-pointer rounded-md' >
                                    <IoMdCloseCircle
                                        onClick={() => {
                                            setSearchTerm('');
                                            setSelectedCity(undefined)
                                        }}
                                        className="text-gray-700  w-5 h-5"
                                    />
                                </div>
                            </div>

                        )
                    }
                    {
                        selectedCity && (
                            <button
                                onClick={onAddLocationUser}
                                className='bg-green-600 p-4 text-white rounded-b-md' >
                                Confirmar ubicacion
                            </button>
                        )
                    }

                    {
                        selectedCity === undefined && (
                            <div>
                                <hr />
                                <div className="flex p-2 md:p-4 justify-center">
                                    <button
                                        onClick={handleLocationClick}
                                        className="flex gap-2 items-center">
                                        <MdOutlineMyLocation className="w-4 h-4 text-blue-600" />
                                        <p className="text-sm text-blue-600">Usar mi ubicación actual</p>
                                    </button>
                                </div>
                            </div>
                        )
                    }

                    {/* Footer siempre visible */}

                </motion.div>
            </div>
        </>
    );
};

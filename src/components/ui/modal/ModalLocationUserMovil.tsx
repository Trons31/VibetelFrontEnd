'use client';
import { LocationCity } from '@/interfaces';
import { useLocationStore, useUIStore } from '@/store';
import axios from 'axios';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import debounce from 'lodash.debounce';
import { usePathname } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { AiFillCloseCircle } from 'react-icons/ai';
import { FaCheckCircle } from 'react-icons/fa';
import { FaArrowLeft, FaLocationDot, FaMagnifyingGlassLocation } from 'react-icons/fa6';
import { IoMdCloseCircle } from 'react-icons/io';
import { MdEditLocationAlt, MdOutlineMyLocation } from 'react-icons/md';
import { TbCircleCheckFilled } from 'react-icons/tb';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const ModalLocationUserMovil = ({ isOpen, onClose }: ModalProps) => {

    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);
    const [error, setError] = useState('');


    const [isExpanded, setIsExpanded] = useState(false);

    const { locationUser } = useLocationStore();
    const addLocationUser = useLocationStore(state => state.addLocationUser);
    const openToastSuccessLocationUserOpen = useUIStore(state => state.openToastSuccessLocationUserOpen);


    const [citys, setCitys] = useState<LocationCity[]>([]);
    const [selectedCity, setSelectedCity] = useState<LocationCity | undefined>(undefined);

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
                const response = await axios.get<LocationCity[]>(`${process.env.NEXT_PUBLIC_API_ROUTE}locations/cities/search?name=${query}`);
                setCitys(response.data);
            } catch (err) {
                setError('No se pudieron obtener las ciudades');
            } finally {
                setLoading(false);
            }
        }, 300), // Adjust the debounce delay as needed
        []
    );

    useEffect(() => {
        debouncedSearch(searchTerm);
    }, [searchTerm, debouncedSearch]);

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

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleInputClick = () => {
        setIsExpanded(true); // Expande el modal al hacer clic en el input
    };

    const handleBackClick = () => {
        setSelectedCity(undefined);
        setHasSearched(false);
        setSearchTerm('');
        setIsExpanded(false); // Contrae el modal cuando vuelvas
    };

    const onValidateCity = async (city: LocationCity) => {
        setLoading(true);
        try {
            await axios.get<LocationCity[]>(`${process.env.NEXT_PUBLIC_API_ROUTE}motel/check-approved-in-city/${city.id}`);
            setSelectedCity(city);
            setHasSearched(false);
            setLoading(false);
            toast(
                (t) => (
                    <div>
                        <h3 className="text-green-600 font-semibold">Ubicación verificada</h3>
                        <p className="text-sm text-gray-800">Actualmente, ofrecemos cobertura en esta ubicación.</p>
                        <p className="text-xs font-medium text-gray-500">
                            {city.name}, {city.department.name}, {city.department.country.name}
                        </p>
                    </div>

                ),
                {
                    duration: 2000,
                    position: 'top-right',
                    style: {
                        padding: '16px',
                        color: '#f44336',
                        maxWidth: '500px',
                        width: '100%',
                    },
                    icon: <FaCheckCircle
                        className='text-green-600 h-6 w-6'
                    />,
                    ariaProps: {
                        role: 'alert',
                        'aria-live': 'assertive',
                    },
                }
            );
        } catch (err) {
            toast(
                (t) => (
                    <div>
                        <h3 className="text-red-600 font-semibold">Ubicación No Disponible</h3>
                        <p className="text-sm text-gray-800">Actualmente, no ofrecemos cobertura en esta ubicación.</p>
                        <p className="text-xs font-medium text-gray-500">
                            {city.name}, {city.department.name}, {city.department.country.name}
                        </p>
                    </div>

                ),
                {
                    duration: 2000,
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
        } finally {
            setLoading(false);
        }
    }

    const handleLocationClick = async () => {
        setLoading(true);
        if (!navigator.geolocation) {
            toast.error("La geolocalización no es compatible con tu navegador.");
            setLoading(false);
            return;
        }

        try {
            const permissionStatus = await navigator.permissions.query({ name: 'geolocation' });

            if (permissionStatus.state === 'denied') {
                toast.error("Por favor, activa los permisos de ubicación en la configuración del dispositivo.");
                setLoading(false);
                return;
            }

            if (permissionStatus.state === 'prompt') {
                // Si los permisos no se han solicitado aún, intentamos obtener la ubicación
                navigator.geolocation.getCurrentPosition(async (position) => {
                    const { latitude, longitude } = position.coords;

                    fetch(
                        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
                    )
                        .then((response) => response.json())
                        .then((data) => {
                            if (data && data.address) {
                                const cityData = {
                                    country: data.address.country || '',
                                    department: data.address.state || '',
                                    city: data.address.city || data.address.town || data.address.village || '',
                                };
                                //onValidateCity(cityData);
                                setLoading(false);
                            } else {
                                setError("No se pudo obtener la información de la ciudad.");
                                setLoading(false);
                            }
                        })
                        .catch(() => { setError("Error al obtener la información de la ciudad."), setLoading(false); });
                }, (error) => {
                    if (error.code === error.PERMISSION_DENIED) {
                        toast.error("No se pudo obtener la ubicación. Verifica permisos y configuración.");
                        setLoading(false);
                        return
                    }
                    setLoading(false);
                });
            } else {
                // Si ya tiene permisos, intentamos obtener la ubicación de inmediato
                navigator.geolocation.getCurrentPosition(async (position) => {
                    const { latitude, longitude } = position.coords;

                    fetch(
                        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
                    )
                        .then((response) => response.json())
                        .then((data) => {
                            if (data && data.address) {
                                const cityData = {
                                    country: data.address.country || '',
                                    department: data.address.state || '',
                                    city: data.address.city || data.address.town || data.address.village || '',
                                };
                                //onValidateCity(cityData);
                                setLoading(false);
                            } else {
                                setError("No se pudo obtener la información de la ciudad.");
                                setLoading(false);
                            }
                        })
                        .catch(() => { setError("Error al obtener la información de la ciudad."), setLoading(false); });
                }, (error) => {
                    if (error.code === error.PERMISSION_DENIED) {
                        toast.error("No se pudo obtener la ubicación. Verifica permisos y configuración.");
                        setLoading(false);
                        return
                    }
                    setLoading(false);
                });
            }
        } catch (err) {
            toast.error("Error al verificar los permisos de ubicación.");
            setLoading(false);
        }
    };



    const onAddLocationUser = () => {
        if (selectedCity) {
            addLocationUser(selectedCity);
            setSearchTerm("");
            setSelectedCity(undefined);
            openToastSuccessLocationUserOpen();
            onClose();
            if (pathName === "/") {
                window.location.replace("/home");
            }
            setIsExpanded(false);
        }

    }

    const onUpdateLocation = () => {
        if (locationUser) {
            setIsExpanded(true);
            setSelectedCity(locationUser);
            setSearchTerm(locationUser.name);
        }
    }


    return (
        <>

            <div className='flex md:hidden'>
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className='fixed inset-0 z-40 flex items-end md:items-center bg-black bg-opacity-50 backdrop-blur-sm'
                            onClick={handleBackdropClick}
                        >
                            <motion.div
                                initial={{ height: '50%' }}
                                animate={{ height: isExpanded ? '100%' : '50%' }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                                className={
                                    clsx(
                                        {
                                            "mx-auto rounded-t-lg bg-white flex w-full flex-col": !isExpanded,
                                            "mx-auto  bg-white flex w-full flex-col": isExpanded
                                        }
                                    )
                                }
                            >

                                {
                                    !isExpanded && (
                                        <div className='p-2 flex justify-between items-center'>
                                            <p className='font-semibold text-gray-900 text-sm '>Indica la ciudad donde te encuentras</p>
                                            <div className='p-2 hover:bg-gray-200 cursor-pointer rounded-md' >
                                                <IoMdCloseCircle
                                                    onClick={() => {
                                                        setIsExpanded(false);
                                                        onClose();
                                                    }}
                                                    className="text-gray-700 w-4 h-4 flex-shrink-0"
                                                />
                                            </div>
                                        </div>
                                    )
                                }


                                <div className='border-l h-full border-l-gray-200 border-r border-r-gray-200 flex flex-col'>

                                    <div className={
                                        clsx(
                                            {
                                                "p-2 md:px-2 py-1": !isExpanded,
                                                "p-2 mt-2 md:px-2 py-1": isExpanded
                                            }
                                        )
                                    } >
                                        <div className="flex gap-2 w-full">

                                            {
                                                isExpanded && (
                                                    <div className="flex items-center">
                                                        <FaArrowLeft
                                                            onClick={handleBackClick}
                                                            className="h-5 w-5 cursor-pointer text-gray-700"
                                                        />
                                                    </div>
                                                )}

                                            <div className="relative w-full">
                                                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                                    <FaLocationDot className="w-5 h-5 text-gray-700" />
                                                </div>
                                                <div className="flex items-center">
                                                    <input
                                                        type="text"
                                                        value={searchTerm}
                                                        onChange={(e) => setSearchTerm(e.target.value)}
                                                        onClick={handleInputClick}
                                                        className="bg-gray-200 border-2 border-white hover:border-gray-400 focus:border-blue-500 focus:ring-blue-500 focus:outline-none text-gray-900 text-xs rounded-lg block w-full ps-10 p-3 placeholder-gray-600 pr-10"
                                                        placeholder="Escribe tu dirección"
                                                    />
                                                    {loading && (
                                                        <div className="absolute inset-y-0 end-0 flex items-center pr-3">
                                                            <svg className="h-5 w-5 animate-spin text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                                <circle className="opacity-25" cx="12" cy="12" r="10"></circle>
                                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                            </svg>
                                                        </div>
                                                    )}
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

                                    {
                                        !isExpanded && locationUser && (
                                            <div
                                                className='p-2 flex hover:bg-gray-100 cursor-pointer justify-between items-center' >
                                                <div className='flex gap-3 items-center' >
                                                    <TbCircleCheckFilled
                                                        className='text-blue-600 w-6 h-6'
                                                    />
                                                    <div>
                                                        <p className='text-sm font-semibold' >
                                                            {locationUser.name}
                                                        </p>
                                                        <p className='text-xs text-gray-500' >
                                                            {locationUser.department.name}, {locationUser.department.country.name}
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
                                        !isExpanded && !locationUser && !selectedCity && (
                                            <div>
                                                <div className='py-2 mb-5 mt-10 flex gap-3 justify-center items-center'>
                                                    <FaMagnifyingGlassLocation
                                                        className='w-4 h-4 text-gray-500'
                                                    />
                                                    <p className='text-gray-600 text-xs font-semibold'>Ingresa tu ubicación</p>
                                                </div>
                                            </div>
                                        )}


                                    {isExpanded && (
                                        <div className='flex-1 overflow-y-auto mb-10'>
                                            <ul className='overflow-y-auto custom-scrollbar h-full'>
                                                {searchTerm !== "" && (
                                                    citys.map((city) => (
                                                        <li
                                                            onClick={() => onValidateCity(city)}
                                                            key={city.id}
                                                            className={
                                                                clsx(
                                                                    'hover:bg-gray-100 cursor-pointer py-2 border-b border-solid border-b-gray-300',
                                                                    {
                                                                        "bg-gray-100": selectedCity?.id === city.id,
                                                                    }
                                                                )
                                                            }>
                                                            <div className='py-3 w-full px-8 animate-fadeIn'>
                                                                <div className='block justify-start'>
                                                                    <p className='text-sm font-medium capitalize'>
                                                                        {city.name}
                                                                    </p>
                                                                    <p className='text-xs text-gray-500 flex gap-2'>
                                                                        {city.department.name}, {city.department.country.name}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    ))
                                                )}
                                            </ul>
                                        </div>
                                    )}

                                    {
                                        isExpanded && selectedCity && (
                                            <div className='p-2 bg-white mb-14  border-t border-gray-300'>
                                                <div className='flex justify-between items-center'>
                                                    <div>
                                                        <p className='text-xs font-medium text-gray-700'>Ubicación seleccionada:</p>
                                                        <p className='text-xs font-medium text-gray-500'>
                                                            {selectedCity?.name}, {selectedCity?.department.name}, {selectedCity?.department.country.name}
                                                        </p>
                                                    </div>
                                                    <div className='p-2 hover:bg-gray-200 cursor-pointer rounded-md'>
                                                        <IoMdCloseCircle
                                                            onClick={() => setSelectedCity(undefined)}
                                                            className='text-gray-700 w-5 h-5'
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }

                                    {
                                        !isExpanded && selectedCity && (
                                            <div className='p-2 bg-white mb-14  border-t border-gray-300'>
                                                <div className='flex justify-between items-center'>
                                                    <div>
                                                        <p className='text-xs font-medium text-gray-700'>Ubicación seleccionada:</p>
                                                        <p className='text-xs font-medium text-gray-500'>
                                                            {selectedCity?.name}, {selectedCity?.department.name}, {selectedCity?.department.country.name}
                                                        </p>
                                                    </div>
                                                    <div className='p-2 hover:bg-gray-200 cursor-pointer rounded-md'>
                                                        <IoMdCloseCircle
                                                            onClick={() => setSelectedCity(undefined)}
                                                            className='text-gray-700 w-5 h-5'
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }

                                    {
                                        isExpanded && (
                                            !loading && hasSearched && citys.length === 0 && (
                                                <div className='flex-1 items-center justify-center' >
                                                    <div className='p-1' >
                                                        <p className='text-center text-sm' >No se han encontrado resultados.</p>
                                                        <p className='text-center text-sm' >Por favor verifica la dirección ingresada.</p>
                                                    </div>
                                                </div>
                                            )
                                        )

                                    }


                                    <div className="fixed bottom-0 left-0 right-0 bg-white">
                                        <hr />
                                        <div className="flex justify-center">
                                            {selectedCity ? (
                                                <button
                                                    onClick={onAddLocationUser}
                                                    className='bg-green-600 p-4 w-full text-white'>
                                                    Confirmar ubicación
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={handleLocationClick}
                                                    className="flex gap-2 p-4 items-center">
                                                    <MdOutlineMyLocation className="w-4 h-4 text-blue-600" />
                                                    <p className="text-md text-blue-600">Usar mi ubicación actual</p>
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    )
}

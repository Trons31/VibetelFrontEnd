'use client';
import { RoomApi } from '@/interfaces';
import { useSearchStore } from '@/store';
import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import debounce from 'lodash.debounce';
import { useRouter } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react'
import { FaArrowLeft, FaSearchengin } from 'react-icons/fa6';
import { IoIosSearch, IoMdCloseCircle } from 'react-icons/io';
import { MdYoutubeSearchedFor } from 'react-icons/md';

interface Props {
    location?: string;
    isOpen: boolean;
    onClose: () => void;
}

type room = {
    slug: string,
    title: string
}

export const InputSearchMovil = ({ isOpen, onClose, location }: Props) => {

    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);
    const [suggestedRooms, setSuggestedRooms] = useState<room[]>([]);

    const router = useRouter();
    const { searches, addSearch } = useSearchStore();
    const [topRooms, setTopRooms] = useState<room[]>([])

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

    // const onLoadTopReservedRooms = async () => {
    //     const resp = await getTopReservedRooms();
    //     if (resp.ok) {
    //         setTopRooms(resp.topRooms);
    //     } else {
    //         setTopRooms([]);
    //     }
    // }

    // useEffect(() => {
    //     onLoadTopReservedRooms();
    // }, []);

    const debouncedSearch = useMemo(() =>
        debounce(async (query: string) => {

            if (query.length === 0) {
                setSuggestedRooms([]);
                setLoading(false);
                setHasSearched(false);
                return;
            }

            setLoading(true);
            setHasSearched(true);
            try {
                const response = await axios.get<RoomApi[]>(`${process.env.NEXT_PUBLIC_API_ROUTE}room/search?term=${query}&cityId=${location}`);
                setSuggestedRooms(response.data);
            } catch (err) {
                setSuggestedRooms([]);
            } finally {
                setLoading(false);
            }
        }, 300), [location]);

    useEffect(() => {
        debouncedSearch(searchTerm);
    }, [searchTerm, debouncedSearch]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === 'Enter') {
            if (searchTerm === "") return;
            setSuggestedRooms([]);
            setSearchTerm("");
            router.push(`/search/${searchTerm}`);
            onClose();
        }
    };

    const redirectToRoom = (room: room) => {
        setSuggestedRooms([]);
        setSearchTerm('');
        onClose();
        router.push(`/search/${room.title}`)
    }

    const redirectToSearch = (term: string) => {
        setSuggestedRooms([]);
        setSearchTerm('');
        onClose();
        router.push(`/search/${term}`)
    }

    const closeInputSearchMovil = () => {
        setSuggestedRooms([]);
        setSearchTerm('');
        onClose();
    }


    return (
        <div className='flex md:hidden'>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ y: '100%', opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: '100%', opacity: 0 }}
                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                        className='fixed inset-0 z-40 flex items-end md:items-center'
                    >
                        <motion.div
                            initial={{ height: '50%' }}
                            animate={{ height: '100%' }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            className="mx-auto bg-white flex w-full flex-col"
                        >

                            <div className='border-l h-full border-l-gray-200 border-r border-r-gray-200 flex flex-col'>

                                <div className="p-2 mt-2 md:px-2 py-1" >
                                    <div className="flex gap-2 w-full">


                                        <div className="flex items-center">
                                            <FaArrowLeft
                                                onClick={closeInputSearchMovil}
                                                className="h-5 w-5 cursor-pointer text-gray-700"
                                            />
                                        </div>


                                        <div className="relative w-full">
                                            <div className="flex items-center">
                                                <input
                                                    type="text"
                                                    value={searchTerm}
                                                    onChange={(e) => setSearchTerm(e.target.value)}
                                                    onKeyDown={handleKeyDown}
                                                    className="bg-gray-200 border-2 border-white hover:border-gray-400 focus:border-blue-500 focus:ring-blue-500 focus:outline-none text-gray-900 text-xs rounded-lg block w-full ps-4 p-3 placeholder-gray-600 pr-10"
                                                    placeholder="Habitaciones, moteles"
                                                />

                                                {loading && (
                                                    <div className="absolute right-6 inset-y-0 end-0 flex items-center pr-3">
                                                        <svg className="h-4 w-4 animate-spin text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10"></circle>
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                        </svg>
                                                    </div>
                                                )}

                                                {searchTerm !== '' && (
                                                    <div className="absolute inset-y-0 end-0 flex items-center pr-3">
                                                        <IoMdCloseCircle className="text-gray-700 w-4 h-4 cursor-pointer"
                                                            onClick={() => setSearchTerm('')}
                                                        />
                                                    </div>
                                                )}

                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {
                                    hasSearched && suggestedRooms.length === 0 && !loading && (
                                        <div className='flex justify-center overflow-y-auto'>
                                            <h3 className='text-sm text-gray-600  px-4 mt-5 py-2 '>No se encontraron resultados que coincidan con tu búsqueda.</h3>
                                        </div>
                                    )
                                }

                                {
                                    suggestedRooms.length > 0 && (
                                        <div className='flex-1 overflow-y-auto custom-scrollbar '>
                                            <h3 className='text-sm text-gray-900 font-bold px-4 py-2 border-b'>Sugerencias</h3>
                                            <ul className='text-sm text-gray-700'>
                                                {
                                                    suggestedRooms.map((room, index) => (
                                                        <li
                                                            onClick={() => redirectToRoom(room)}
                                                            key={index}
                                                            className='flex gap-2 items-center  px-4 py-2 hover:bg-gray-100 cursor-pointer'>
                                                            <IoIosSearch
                                                                className='text-gray-500 w-5 h-5'
                                                            />
                                                            {room.title}
                                                        </li>
                                                    ))}
                                            </ul>
                                        </div>
                                    )
                                }

                                {
                                    searchTerm === '' && searches.length > 0 && (
                                        <div className='flex-1 overflow-y-auto custom-scrollbar '>
                                            <h3 className='text-sm text-gray-900 font-bold px-4 py-2 border-b'>Recientes</h3>
                                            <ul className='text-sm text-gray-700'>
                                                {
                                                    searches.map((term, index) => (
                                                        <li
                                                            onClick={() => redirectToSearch(term)}
                                                            key={index}
                                                            className='flex gap-2 items-center px-4 py-2 hover:bg-gray-100 cursor-pointer'>
                                                            <MdYoutubeSearchedFor
                                                                className='text-gray-500 w-5 h-5'
                                                            />
                                                            {term}
                                                        </li>
                                                    ))}
                                            </ul>
                                        </div>
                                    )
                                }


                                {/* {
                                    searchTerm === "" && !hasSearched && (
                                        <div className='flex-1 overflow-y-auto'>
                                            <h3 className='text-sm text-gray-900 font-bold px-4 py-2 border-b'>Las más reservadas</h3>
                                            <ul className='text-sm text-gray-700'>
                                                {
                                                    topRooms.map((room, index) => (
                                                        <li
                                                            onClick={() => redirectToRoom(room)}
                                                            key={index}

                                                            className='flex gap-2 items-center px-4 py-2 hover:bg-gray-100 cursor-pointer'>
                                                            <FaSearchengin
                                                                className='text-gray-500 w-5 h-5'
                                                            />
                                                            {room.title}
                                                        </li>
                                                    ))}
                                            </ul>
                                        </div>
                                    )
                                } */}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

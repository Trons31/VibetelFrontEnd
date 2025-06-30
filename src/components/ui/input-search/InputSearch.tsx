'use client';
import { getSuggestedRooms, getTopReservedRooms } from '@/actions';
import { useSearchStore, useUIStore } from '@/store';
import clsx from 'clsx';
import debounce from 'lodash.debounce';
import { useRouter } from 'next/navigation';
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { FaSearchengin } from 'react-icons/fa6';
import { IoIosSearch, IoMdClose } from 'react-icons/io'
import { IoSearchOutline } from 'react-icons/io5';
import { MdYoutubeSearchedFor } from 'react-icons/md'

interface Props {
    location?: string;
    openSearch: () => void;
    closeSearch: () => void;
}

type room = {
    slug: string,
    title: string
}

export const InputSearch = ({ openSearch, closeSearch, location }: Props) => {
    const [showSearch, setShowSearch] = useState(false)
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);
    const router = useRouter();

    const { searches } = useSearchStore();
    const [topRooms, setTopRooms] = useState<room[]>([])
    const [suggestedRooms, setSuggestedRooms] = useState<room[]>([]);


    const searchRef = useRef<HTMLDivElement>(null);

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
                const { suggestedRooms } = await getSuggestedRooms({ query, city: location });
                setSuggestedRooms(suggestedRooms);
            } catch (err) {
                setSuggestedRooms([]);
            } finally {
                setLoading(false);
            }
        }, 300), [location]);

    useEffect(() => {
        debouncedSearch(searchTerm);
    }, [searchTerm, debouncedSearch]);

    const handleClickOutside = (event: MouseEvent) => {
        if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
            setSuggestedRooms([]);
            setSearchTerm("");
            setShowSearch(false);
            closeSearch();
        }
    };

    const closeInputSearch = () => {
        setSuggestedRooms([]);
        setShowSearch(false),
            closeSearch();
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === 'Enter') {
            if (searchTerm === "") return;
            setSuggestedRooms([]);
            closeSearch();
            setShowSearch(false);
            setSearchTerm("");
            router.push(`/search/${searchTerm}`)
        }
    };

    const onLoadTopReservedRooms = async () => {
        const resp = await getTopReservedRooms();
        if (resp.ok) {
            setTopRooms(resp.topRooms);
        } else {
            setTopRooms([]);
        }
    }

    useEffect(() => {
        onLoadTopReservedRooms();
    }, [])

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [handleClickOutside])

    const redirectToRoom = (room: room) => {
        setSuggestedRooms([]);
        setSearchTerm('');
        setShowSearch(false);
        closeSearch();
        router.push(`/search/${room.title}`)
    }

    const redirectToSearch = (term: string) => {
        setSuggestedRooms([]);
        setSearchTerm('');
        setShowSearch(false);
        closeSearch();
        router.push(`/search/${term}`)
    }

    return (
        <>
            {
                showSearch
                    ? (
                        <div
                            ref={searchRef}
                            className='relative hidden md:block mx-3 fade-in'>
                            <input
                                type='text'
                                onChange={(e) => setSearchTerm(e.target.value)}
                                autoFocus
                                onKeyDown={handleKeyDown}
                                placeholder='Habitaciones, moteles'
                                className='w-[600px] bg-gray-100 rounded py-2 pl-4 pr-10 border-b-2 text-sm border-gray-400 focus:outline-none focus:border-red-500'
                            />

                            {loading && (
                                <div className="absolute right-5 inset-y-0 end-0 flex items-center pr-3">
                                    <svg className="h-4 w-4 animate-spin text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                </div>
                            )}

                            <button
                                onClick={closeInputSearch}
                                className="hover:bg-gray-300 cursor-pointer rounded-md p-1 absolute top-1/2 right-1 transform -translate-y-1/2" >
                                <IoMdClose
                                    size={17}
                                    className='text-gray-800 '
                                />
                            </button>


                            <div className='absolute mt-2 w-full bg-white shadow-lg rounded-lg custom-scrollbar max-h-96  overflow-y-auto '>

                                {
                                    hasSearched && suggestedRooms.length === 0 && !loading && (
                                        <div className='flex justify-center overflow-y-auto'>
                                            <h3 className='text-sm text-gray-600  px-4 py-2 border-b'>No se encontraron resultados que coincidan con tu búsqueda.</h3>
                                        </div>
                                    )
                                }

                                {
                                    suggestedRooms.length > 0 && (
                                        <div className='flex-1 overflow-y-auto'>
                                            <h3 className='text-sm text-gray-900 font-bold px-4 py-2 border-b'>Sugerencias</h3>
                                            <ul className='text-sm text-gray-700'>
                                                {
                                                    suggestedRooms.map((room, index) => (
                                                        <li
                                                            onClick={() => redirectToRoom(room)}
                                                            key={index}
                                                            className='flex gap-2 items-center px-4 py-2 hover:bg-gray-100 cursor-pointer'>
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
                                        <div className='flex-1 overflow-y-auto'>
                                            <h3 className='text-sm text-gray-900 font-bold px-4 py-2 border-b'>Recientes</h3>
                                            <ul className='text-sm text-gray-700'>
                                                {
                                                    searches.map((term, index) => (
                                                        <li
                                                            onClick={() => redirectToSearch(term)}
                                                            key={index}
                                                            className='flex gap-2 items-center  px-4 py-2 hover:bg-gray-100 cursor-pointer'>
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

                                {
                                    searchTerm === "" && !hasSearched && (
                                        <>
                                            <h3 className={
                                                clsx(
                                                    'text-sm text-gray-900 font-bold px-4 py-2 border-b',
                                                    {
                                                        'mt-0': suggestedRooms.length === 0,
                                                        'mt-7 ': suggestedRooms.length > 0
                                                    }
                                                )
                                            }>Las más reservadas</h3>
                                            <ul className='text-sm text-gray-700'>
                                                {
                                                    topRooms.map((room, index) => (
                                                        <li
                                                            onClick={() => redirectToRoom(room)}
                                                            key={index}
                                                            className='flex gap-2 items-center  px-4 py-2 hover:bg-gray-100 cursor-pointer'>
                                                            <FaSearchengin
                                                                className='text-gray-500 w-5 h-5'
                                                            />
                                                            {room.title}
                                                        </li>
                                                    ))}
                                            </ul>
                                        </>
                                    )
                                }
                            </div>
                        </div>

                    )
                    : (
                        <button
                            title="Buscar habitaciones"
                            onClick={() => {
                                setShowSearch(true),
                                    openSearch()
                            }}
                            className='mx-1 hidden md:block p-2 rounded-md transition-all hover:bg-gray-200' >
                            <IoSearchOutline className="w-5 h-5" />
                        </button>
                    )
            }
        </>
    )
}

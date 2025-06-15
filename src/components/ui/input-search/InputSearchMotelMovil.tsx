'use client';
import { getSuggestedMotels } from '@/actions';
import { suggestedMotel } from '@/interfaces';
import { AnimatePresence, motion } from 'framer-motion'
import debounce from 'lodash.debounce';
import React, { useEffect, useMemo, useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa6'
import { IoMdClose, IoMdCloseCircle } from 'react-icons/io'
import { IoSearchOutline } from 'react-icons/io5'

interface Props {
    onSearchTerm: (query: string) => void;
    location?: string;
}


export const InputSearchMotelMovil = ({ onSearchTerm, location }: Props) => {

    const [searchTerm, setSearchTerm] = useState('');
    const [searchMovil, setSearchMovil] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);
    const [loading, setLoading] = useState(false);
    const [query, setQuery] = useState('');
    const [suggestedMotels, setSuggestedMotels] = useState<suggestedMotel[]>([]);


    const debouncedSearch = useMemo(
        () =>
            debounce(async (query: string) => {
                if (query.length === 0) {
                    setSuggestedMotels([]);
                    setLoading(false);
                    setHasSearched(false);
                    return;
                }
                setLoading(true);
                setHasSearched(true);
                try {
                    const { suggestedMotels } = await getSuggestedMotels({ query, city: location });
                    setSuggestedMotels(suggestedMotels);
                } catch (err) {
                    setSuggestedMotels([]);
                } finally {
                    setLoading(false);
                }
            }, 300),
        []
    );

    useEffect(() => {
        debouncedSearch(searchTerm);
    }, [searchTerm, debouncedSearch]);

    const handleInputClick = () => {
        setSearchMovil(true);
    };

    const closeInputSearchMovil = () => {
        setSearchMovil(false);
    };

    useEffect(() => {
        document.body.style.overflow = searchMovil ? 'hidden' : 'auto';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [searchMovil]);

    const search = (searchTerm: string) => {
        onSearchTerm(searchTerm);
        setQuery(searchTerm);
        setSearchTerm('');
        setSearchMovil(false);

    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === 'Enter' && searchTerm.trim()) {
            search(searchTerm);
            setQuery(searchTerm);
            setSearchTerm('');
            setSearchMovil(false);
        }
    };


    const cleanSearch = () => {
        setQuery('');
        setSearchTerm('');
        setSuggestedMotels([]);
        onSearchTerm('');
    };

    return (
        <>
            <div className='flex md:hidden'>

                <div className="relative w-full mb-5">
                    <div className="flex items-center">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onClick={handleInputClick}
                            className="bg-gray-200 border-2 border-white hover:border-gray-400 focus:border-blue-500 focus:ring-blue-500 focus:outline-none text-gray-900 text-xs rounded-lg block w-full ps-2 p-3 placeholder-gray-600 pr-5"
                            placeholder="Moteles"
                        />
                    </div>
                    <button
                        className='absolute items-center inset-y-0 right-2 focus:outline-none'
                    >
                        <IoSearchOutline size={20} />
                    </button>
                </div>

                <AnimatePresence>
                    {searchMovil && (
                        <motion.div
                            initial={{ y: '100%', opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: '100%', opacity: 0 }}
                            transition={{ duration: 0.5, ease: 'easeInOut' }}
                            className='fixed inset-0 z-30 flex items-end md:items-center'
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
                                                        placeholder="Moteles"
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
                                        hasSearched && suggestedMotels.length > 0 && !loading && (
                                            <div className='flex-1 overflow-y-auto'>
                                                <h3 className='text-sm text-gray-900 font-bold px-4 py-2 border-b'>Sugerencias</h3>
                                                <ul className='text-sm text-gray-700'>
                                                    {
                                                        suggestedMotels.map((motel) => (
                                                            <li
                                                                key={motel.id}
                                                                onClick={() => search(motel.title)}
                                                                className='hover:bg-gray-100 cursor-pointer py-2 border-b border-solid border-b-gray-300'>
                                                                <div className='py-3 w-full px-5 animate-fadeIn'>
                                                                    <div className='block justify-start ' >
                                                                        <p className='text-md font-medium capitalize' >
                                                                            {motel.title}
                                                                        </p>
                                                                        <p className='text-sm text-gray-500 flex gap-2' >
                                                                            {motel.city}, {motel.department}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        ))
                                                    }
                                                </ul>
                                            </div>
                                        )
                                    }

                                    {
                                        hasSearched && suggestedMotels.length === 0 && !loading && (
                                            <div className='flex justify-center overflow-y-auto'>
                                                <h3 className='text-sm text-gray-900 mt-5 px-4 py-2 '>No se encontraron resultados que coincidan con tu búsqueda.</h3>
                                            </div>
                                        )
                                    }
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {
                query !== '' && (
                    <div className='flex gap-2 items-center mb-4' >
                        <p className='text-md font-medium' >Busquedad:</p>
                        <div className='rounded-full px-2 py-1  bg-gray-200 text-gray-600 flex items-center gap-2  w-fit'>
                            <p className='text-sm'>
                                {query}
                            </p>
                            <IoMdClose
                                className='h-4 w-4 text-gray-600 cursor-pointer'
                                onClick={cleanSearch}
                            />
                        </div>
                    </div>
                )
            }

        </>
    )
}

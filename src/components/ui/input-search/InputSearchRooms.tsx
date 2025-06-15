'use client';
import React, { useEffect, useMemo, useState } from 'react'
import debounce from 'lodash.debounce';
import { IoSearchOutline } from 'react-icons/io5'
import { useRouter } from 'next/navigation';
import { IoIosSearch } from 'react-icons/io';
import { getSuggestedRoomsAndMotels } from '@/actions';

interface Props {
    location: string;
}


interface results {
    id: string,
    title: string,
    type: string,
    slug: string
}

export const InputSearchRooms = ({ location }: Props) => {

    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);

    const router = useRouter();


    const [suggestedResults, setSuggestedResults] = useState<results[]>([]);

    const debouncedSearch = useMemo(() =>
        debounce(async (query: string) => {

            if (query.length === 0) {
                setSuggestedResults([]);
                setLoading(false);
                setHasSearched(false);
                return;
            }

            setLoading(true);
            setHasSearched(true);
            try {
                const { suggestedResults } = await getSuggestedRoomsAndMotels({ query, city: location });
                setSuggestedResults(suggestedResults);
            } catch (err) {
                setSuggestedResults([]);
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
            router.push(`/search/${searchTerm}`)
        }
    };

    const redirectToResult = (result: results) => {
        if (result.type === "motel") {
            router.push(`/motels/${result.slug}`)
        } else {
            router.push(`/search/${result.title.toLowerCase()}`)
        }
    }

    return (
        <>
            <div className="fade-in hidden md:flex relative w-full">
                <div className="relative w-full">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                        <IoSearchOutline className="w-6 h-6 text-gray-500" />
                    </div>

                    <div className="flex items-center w-full">
                        <input
                            type="text"
                            onChange={(e) => setSearchTerm(e.target.value)}
                            autoFocus
                            onKeyDown={handleKeyDown}
                            className="w-full rounded-md text-gray-900 focus:outline-none ps-14 p-5 pr-10"
                            placeholder="Busca tu motel favorito, aquí podrás encontrar tu habitación perfecta."
                        />
                    </div>

                    {loading && (
                        <div className="absolute right-5 inset-y-0 end-0 flex items-center pr-3">
                            <svg className="h-4 w-4 animate-spin text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        </div>
                    )}
                </div>

                {
                    hasSearched && suggestedResults.length === 0 && !loading && (
                        <div className="absolute top-full left-0 w-full bg-white shadow-lg rounded-md z-50 mt-1 max-h-60 overflow-y-auto border border-gray-200">
                            <div className='flex justify-center overflow-y-auto'>
                                <h3 className='text-sm text-gray-600  px-4 py-2 border-b'>No se encontraron resultados que coincidan con tu búsqueda.</h3>
                            </div>
                        </div>
                    )
                }

                {suggestedResults.length > 0 && (
                    <div className="absolute top-full left-0 w-full bg-white shadow-lg rounded-md z-50 mt-1 max-h-60 overflow-y-auto border border-gray-200">
                        <h3 className="text-sm text-start text-gray-900 font-bold px-4 py-2 border-b">Sugerencias</h3>
                        <ul className="text-sm text-gray-700">
                            {suggestedResults.map((result, index) => (
                                <li
                                    onClick={() => redirectToResult(result)}
                                    key={index}
                                    className="flex gap-2 items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                >
                                    <IoIosSearch className="text-gray-500 w-5 h-5" />
                                    {result.title}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </>
    )
}

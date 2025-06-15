'use client';
import { getSuggestedMotels } from '@/actions';
import { suggestedMotel } from '@/interfaces';
import debounce from 'lodash.debounce';
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { IoMdClose } from 'react-icons/io';
import { IoCloseOutline, IoSearchOutline } from 'react-icons/io5'

interface Props {
  onSearch: (searchTerm: string) => void;
  location?: string;
}

export const FilterUiMotel = ({ onSearch, location }: Props) => {

  const [searchTerm, setSearchTerm] = useState("")
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showHelpSearch, setShowHelpSearch] = useState(false);
  const [suggestedMotels, setSuggestedMotels] = useState<suggestedMotel[]>([]);

  const searchRef = useRef<HTMLDivElement>(null);

  const onSearchMotel = (value: string) => {
    setSearchTerm(value);
    if (value === '') {
      setShowHelpSearch(false);
      setSuggestedMotels([]);
      return;
    }
    setLoading(true);
    setShowHelpSearch(true);
  };

  const debouncedSearch = useMemo(
    () =>
      debounce(async (query: string) => {
        if (query.length === 0) {
          setSuggestedMotels([]);
          setLoading(false);
          return;
        }
        setLoading(true);
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

  const handleClickOutside = (event: MouseEvent) => {
    if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
      setSearchTerm('');
      setShowHelpSearch(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  const cleanInputSearch = () => {
    setSearchTerm("");
    setQuery('');
    setIsSearching(false);
    onSearch("");
  }

  const handleSearch = () => {
    if (searchTerm !== '') {
      setIsSearching(true);
      onSearch(searchTerm);
      setQuery(searchTerm);
      setIsSearching(false);
      setSearchTerm('');
      setShowHelpSearch(false);
      setSuggestedMotels([]);
    } else {
      setIsSearching(false)
    }
  }

  const search = (searchTerm: string) => {
    onSearch(searchTerm);
    setQuery(searchTerm);
    setSearchTerm('');
    setShowHelpSearch(false);
    setSuggestedMotels([]);
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };


  return (
    <>

      <div
        ref={searchRef}
        className='hidden md:flex justify-end px-2 md:px-8 mb-5'>
        <div className='w-60 md:w-80 relative'>
          <input
            type="text"
            placeholder='Buscar'
            className='w-full bg-gray-200 rounded pl-4 py-1 pr-10 border-b-2 text-md border-gray-200 focus:outline-none focus:border-red-500'
            value={searchTerm}
            onChange={(e) => onSearchMotel(e.target.value)}
            onKeyDown={handleKeyPress} // Detectar "Enter"
          />
          <div className='absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-2 items-center'>
            {
              isSearching && (
                <IoCloseOutline
                  size={23}
                  className="text-red-600 cursor-pointer"
                  onClick={cleanInputSearch}
                />
              )
            }

            <button
              onClick={handleSearch}
              className='focus:outline-none'
            >
              <IoSearchOutline size={20} />
            </button>
          </div>

          {
            searchTerm !== '' && showHelpSearch && (
              <div className='absolute mt-2 w-full z-10 bg-white shadow-lg rounded-lg custom-scrollbar max-h-96  overflow-y-auto '>
                <div className='flex-1 overflow-y-auto'>
                  {
                    loading
                      ? (
                        <div className="flex items-center justify-center py-4">
                          <svg className="h-4 w-4 animate-spin text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        </div>
                      ) : (
                        suggestedMotels.length > 0
                          ? (
                            <>
                              <h3 className='text-sm text-gray-900 font-bold px-4 py-2 border-b'>Sugerencias</h3>
                              <ul className='text-sm text-gray-700'>
                                {
                                  suggestedMotels.map((motel) => (
                                    <li
                                      onClick={() => search(motel.title)}
                                      key={motel.id}
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
                            </>
                          ) : (
                            <div className='flex justify-center py-4' >
                              <p className='text-gray-500 text-sm ' >No encontramos resultados</p>
                            </div>
                          )
                      )
                  }

                </div>
              </div>
            )
          }
        </div>
      </div>

      {
        query !== '' && (
          <div className='flex gap-2 items-center md:px-24  mb-4' >
            <p className='text-lg' >Busquedad:</p>
            <div className='rounded-full px-2 py-1  bg-gray-200 text-gray-600 flex items-center gap-2  w-fit'>
              <p className='text-sm'>
                {query}
              </p>
              <IoMdClose
                className='h-4 w-4 text-gray-600 cursor-pointer'
                onClick={cleanInputSearch}
              />
            </div>
          </div>
        )
      }

    </>
  )
}

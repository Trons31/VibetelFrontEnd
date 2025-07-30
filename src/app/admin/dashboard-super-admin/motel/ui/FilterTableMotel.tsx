import React from 'react';
import { IoSearchOutline, IoCloseOutline } from 'react-icons/io5';

interface Props {
    query: string;
    state: string;
    setQuery: (value: string) => void;
    cleanInputSearch: () => void;
    handleSearch: () => void;
    setState: (value: string) => void;

}

export const FilterTableMotel = ({
    query, setQuery, cleanInputSearch, handleSearch, setState, state
}: Props) => {



    return (
        <>
            <div className="flex justify-between gap-10 mx-5">
                <div className="relative flex w-full max-w-lg items-center justify-between rounded-md border shadow-lg">
                    <IoSearchOutline className="absolute left-2 h-5 w-5 text-gray-400" />
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="h-14 w-full text-xs md:text-md rounded-md py-4 pr-12 pl-12 outline-none focus:ring-2"
                        placeholder="Motel, departamento, ciudad..."
                    />
                    <div className='flex gap-2 items-center px-2'>
                        {query !== '' && (
                            <IoCloseOutline
                                size={30}
                                className="text-red-600 cursor-pointer"
                                onClick={cleanInputSearch}
                            />
                        )}
                        <button
                            type="button"
                            onClick={handleSearch}
                            className="inline-flex h-8 items-center justify-center rounded-lg bg-blue-600 text-xs md:text-sm px-4 font-medium text-white hover:bg-blue-700"
                        >
                            Buscar
                        </button>
                    </div>
                </div>
                <div className="hidden md:flex items-center">
                    <label className="mr-2 flex-shrink-0 text-sm font-medium text-gray-900">Filtrar por: </label>
                    <select
                        className="mr-1 block w-full whitespace-pre rounded-lg border p-1 pr-10 text-base outline-none focus:shadow sm:text-sm"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                    >
                        <option value="">[Estado]</option>
                        <option value="true">Aprovado</option>
                        <option value="false">En espera</option>
                    </select>
                </div>
            </div>

            <div>
                <div className="flex md:hidden mt-4 mb-4 px-3 justify-end items-center">
                    <label className="mr-2 flex-shrink-0 text-xs font-medium text-gray-900">Filtrar por: </label>
                    <select
                        className="mr-1 block w-fit rounded-lg border p-1  outline-none focus:shadow text-xs"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                    >
                        <option value="">[Estado]</option>
                        <option value="true">Aprovado</option>
                        <option value="false">En espera</option>
                    </select>
                </div>
            </div>

        </>
    );
};

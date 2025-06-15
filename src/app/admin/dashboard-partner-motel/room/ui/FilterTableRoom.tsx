import { IoSearchOutline, IoCloseOutline } from 'react-icons/io5';

interface Props {
    query: string;
    setQuery: (value: string) => void;
    cleanInputSearch: () => void;
    handleSearch: () => void;
    category: string;
    setCategory: (value: string) => void;
    garage: string;
    setGarage: (value: string) => void;
    categoryRoom: { id: string, name: string }[];
    garageRoom: { id: string, title: string }[];
}

export const FilterTableRoom = ({
    query, setQuery, cleanInputSearch, handleSearch, category, setCategory,
    garage, setGarage, categoryRoom, garageRoom
}: Props) => {
    return (
        <div className="flex justify-between gap-10 mx-5">
            <div className="relative flex w-full max-w-lg items-center justify-between rounded-md border shadow-lg">
                <IoSearchOutline className="absolute left-2 h-5 w-5 text-gray-400" />
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="h-14 w-full text-sm md:text-md rounded-md py-4 pr-12 pl-12 outline-none focus:ring-2"
                    placeholder="Habitacion, numero de habitacion"
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
                        className="inline-flex h-8 items-center justify-center rounded-lg bg-blue-600 px-4 font-medium text-white hover:bg-blue-700"
                    >
                        Buscar
                    </button>
                </div>
            </div>
            <div className="flex items-center">
                <label className="mr-2 flex-shrink-0 text-sm font-medium text-gray-900">Filtrar por: </label>
                <select
                    className="mr-1 block w-full whitespace-pre rounded-lg border p-1 pr-10 text-base outline-none focus:shadow sm:text-sm"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="">[Categoria]</option>
                    {categoryRoom.map((categoryMap) => (
                        <option key={categoryMap.id} value={categoryMap.id}>{categoryMap.name}</option>
                    ))}
                </select>
                <select
                    className="sm:mr-4 block w-full whitespace-pre rounded-lg border p-1 pr-10 text-base outline-none focus:shadow sm:text-sm"
                    value={garage}
                    onChange={(e) => setGarage(e.target.value)}
                >
                    <option value="">[Garage]</option>
                    {garageRoom.map((garageMap) => (
                        <option key={garageMap.id} value={garageMap.id}>{garageMap.title}</option>
                    ))}
                </select>
            </div>
        </div>
    );
};

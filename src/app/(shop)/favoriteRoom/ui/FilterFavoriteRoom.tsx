import { CategoryRoomApi, GarageRoomApi } from '@/interfaces';
import clsx from 'clsx';
import { useState } from 'react';
import { IoCloseOutline, IoSearchOutline } from 'react-icons/io5';

interface Props {
    garage: GarageRoomApi[];
    category: CategoryRoomApi[];
    onFilterChange: (filter: string, searchQuery: string, garageFilter: string, categoryFilter: string) => void;
}

export const FilterFavoriteRoom = ({ garage, category, onFilterChange }: Props) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterType, setFilterType] = useState('');
    const [garageFilter, setGarageFilter] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [isSearching, setIsSearching] = useState(false)


    const handleFilter = (filter: string) => {
        setFilterType(filter); // Actualizar tipo de filtro activo
        onFilterChange(filter, searchQuery, garageFilter, categoryFilter);
    };

    const handleSearch = () => {
        if (searchQuery !== '') {
            setIsSearching(true);
        } else {
            setIsSearching(false)
        }

        onFilterChange('', searchQuery, garageFilter, categoryFilter); // Limpiar filtro al realizar búsqueda
    };

    const handleGarage = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setGarageFilter(e.target.value); // Actualizar tipo de filtro activo
        onFilterChange(filterType, searchQuery, e.target.value, categoryFilter);
    }

    const handleCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCategoryFilter(e.target.value);
        onFilterChange(filterType, searchQuery, garageFilter, e.target.value);
    }

    const cleanInputSearch = () => {
        setSearchQuery("");
        onFilterChange(filterType, "", garageFilter, categoryFilter);
        setIsSearching(false);
    }

    return (

        <>


            <div className='bg-white p-4 mb-4 border border-gray-200 rounded-md shadow-md'>
                <div className='flex flex-wrap justify-between items-center'>
                    <div className='flex gap-9'>
                        <button
                            className={`border-b-4 text-xs ${filterType === '' ? 'border-orange-600' : 'border-transparent'}`}
                            onClick={() => handleFilter('')}
                        >
                            Ver todo
                        </button>
                        <button
                            className={`border-b-4 text-xs ${filterType === 'available' ? 'border-orange-600' : 'border-transparent'}`}
                            onClick={() => handleFilter('available')}
                        >
                            Disponibles
                        </button>
                        <button
                            className={`border-b-4 text-xs ${filterType === 'promo' ? 'border-orange-600' : 'border-transparent'}`}
                            onClick={() => handleFilter('promo')}
                        >
                            Promoción
                        </button>
                    </div>
                    <div className='hidden md:flex gap-5'>
                        <select
                            name='category'
                            value={categoryFilter}
                            onChange={handleCategory}
                            className='sm:mr-4 block w-fit whitespace-pre rounded-lg border p-1 pr-10 text-base outline-none focus:shadow md:text-sm'
                        >
                            <option value=''>[Categoría]</option>
                            {category.map(category => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>

                        <select
                            name='garage'
                            value={garageFilter}
                            onChange={handleGarage}
                            className='sm:mr-4 block w-fit whitespace-pre rounded-lg border p-1 pr-10 text-base outline-none focus:shadow sm:text-sm'
                        >
                            <option value=''>[Garaje]</option>
                            {garage.map(garage => (
                                <option
                                    key={garage.id}
                                    value={garage.id}
                                >
                                    {garage.title}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className='mt-5'>
                    <div className='grid grid-cols-8 gap-5 items-center'>
                        <div className='col-span-8 md:col-span-5 leading-6'>

                            <div className="relative mx-auto flex w-full max-w-4xl items-center justify-between rounded-md border shadow-lg">
                                <IoSearchOutline className="absolute left-2 h-5 w-5 text-gray-400" />
                                <input
                                    type="text"
                                    name="search"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="h-14 text-xs md:text-sm w-full rounded-md py-4 pr-12 pl-12 outline-none focus:ring-2"
                                    placeholder="Habitacion, codigo de acceso, numero de habitacion:"
                                />


                                <div className='flex gap-2 items-center px-2' >
                                    {
                                        isSearching && (
                                            <IoCloseOutline
                                                size={30}
                                                className="text-red-600 cursor-pointer"
                                                onClick={cleanInputSearch}
                                            />
                                        )
                                    }

                                    <button
                                        type="button"
                                        onClick={handleSearch}
                                        className="inline-flex text-xs md:text-sm h-8 items-center justify-center rounded-lg bg-orange-500 px-4 font-medium text-white hover:bg-orange-600"
                                    >
                                        Buscar
                                    </button>
                                </div>

                            </div>


                        </div>
                    </div>
                </div>
            </div>


        </>


    );
};

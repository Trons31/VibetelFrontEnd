import { useState } from 'react';
import { IoCloseOutline, IoSearchOutline } from 'react-icons/io5';

interface Props {
  onFilterChange: (statusFilter: string, searchQuery: string, dateRange: string) => void;
}

export const FilterReservation = ({ onFilterChange }: Props) => {
  const [statusFilter, setStatusFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState('');
  const [isSearching, setIsSearching] = useState(false)

  const handleStatusFilter = (newStatusFilter: string) => {
    setStatusFilter(newStatusFilter);
    onFilterChange(newStatusFilter, searchQuery, dateRange);
  };

  const handleSearch = () => {
    if(searchQuery !== ''){
      setIsSearching(true);
    }else{
        setIsSearching(false)
    }
    onFilterChange(statusFilter, searchQuery, dateRange);
  };
  
  const cleanInputSearch = () => {
    setSearchQuery("");
    onFilterChange(statusFilter, "", dateRange);
    setIsSearching(false);
  }

  const handleDateRange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDateRange(e.target.value);
    onFilterChange(statusFilter, searchQuery, e.target.value);
  };

  return (
    <>
      <div className='bg-white p-4 mb-5 border border-gray-200 rounded-md shadow-md'>
        <div className='flex flex-wrap items-center gap-5 md:gap-9'>
          <button
            className={`border-b-4 text-xs md:text-md ${statusFilter === '' ? 'border-orange-600' : 'border-transparent'}`}
            onClick={() => handleStatusFilter('')}
          >
            Ver todo
          </button>
          <button
            className={`border-b-4 text-xs md:text-md ${statusFilter === 'en_espera' ? 'border-orange-600' : 'border-transparent'}`}
            onClick={() => handleStatusFilter('en_espera')}
          >
            En espera
          </button>
          <button
            className={`border-b-4 text-xs md:text-md ${statusFilter === 'completado' ? 'border-orange-600' : 'border-transparent'}`}
            onClick={() => handleStatusFilter('completado')}
          >
            Completado
          </button>
          <button
            className={`border-b-4 text-xs md:text-md ${statusFilter === 'cancelado' ? 'border-orange-600' : 'border-transparent'}`}
            onClick={() => handleStatusFilter('cancelado')}
          >
            Cancelado
          </button>
          <button
            className={`border-b-4 text-xs md:text-md ${statusFilter === 'no_iniciado' ? 'border-orange-600' : 'border-transparent'}`}
            onClick={() => handleStatusFilter('no_iniciado')}
          >
            No iniciado
          </button>
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
                  className="h-14 w-full text-sm md:text-md rounded-md py-4 pr-12 pl-12 outline-none focus:ring-2"
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
                    className="inline-flex h-8 items-center justify-center rounded-lg bg-orange-500 px-4 font-medium text-white hover:bg-orange-600"
                  >
                    Buscar
                  </button>
                </div>

              </div>

            </div>
            <div className='hidden md:flex col-span-3  justify-end'>
              <select
                name='dateRange'
                value={dateRange}
                onChange={handleDateRange}
                className='sm:mr-4 block w-fit whitespace-pre rounded-lg border p-1 pr-10 text-base outline-none focus:shadow sm:text-sm'
              >
                <option value=''>Cualquier momento</option>
                <option value='last_week'>Hace una semana</option>
                <option value='last_month'>Hace un mes</option>
              </select>
            </div>
          </div>
        </div>
      </div>


      <div className='flex md:hidden justify-end px-4 mb-2' >
        <select
          name='dateRange'
          value={dateRange}
          onChange={handleDateRange}
          className='sm:mr-4 block w-fit whitespace-pre rounded-lg border p-1 pr-10 text-base outline-none focus:shadow sm:text-sm'
        >
          <option value=''>Cualquier momento</option>
          <option value='last_week'>Hace una semana</option>
          <option value='last_month'>Hace un mes</option>
        </select>
      </div>
    </>
  );
};

'use client';

import { clsx } from 'clsx';
import { useEffect, useState } from 'react';
import {  IoIosArrowDown, IoIosArrowUp, IoMdClose } from 'react-icons/io';
import { useUIStore } from '@/store';
import {
  AmenitiesRoomApi,
  CategoryRoomApi,
  GarageRoomApi,
} from '@/interfaces';
import { fontBe_Vietnam_Pro } from '@/config/fonts';
import { currencyFormat } from '@/utils';
import { IoCloseOutline } from 'react-icons/io5';

interface Props {
  categoryRoom: CategoryRoomApi[];
  garageRoom: GarageRoomApi[];
  amenitiesRoom: AmenitiesRoomApi[];
  BestPromotion?: number | null;

  onSelectedCategory: (category: string) => void;
  onToogleSale: (sale: string) => void;
  onToogleinAvailable: (inAvailable: string) => void;
  onselectedGarage: (garage: string) => void;
  onSelectedAmenities: (amenities: AmenitiesRoomApi[]) => void;
}

export const SideBarMenuFilter = ({
  categoryRoom,
  garageRoom,
  BestPromotion,
  amenitiesRoom,
  onToogleSale,
  onToogleinAvailable,
  onselectedGarage,
  onSelectedAmenities,
  onSelectedCategory,
}: Props) => {
  const isSideMenuFilterOpen = useUIStore((state) => state.isSideMenuFilterOpen);
  const closeSideMenuFilter = useUIStore((state) => state.closeSideMenuFilter);

  const [openSubMenuGaraje, setOpenSubMenuGaraje] = useState(true);
  const [openSubMenuRooms, setOpenSubMenuRooms] = useState(true);
  const [openSubMenuAmenities, setOpenSubMenuAmenities] = useState(true);

  const [showOnSale, setShowOnSale] = useState('');
  const [showOninAvailable, setShowOninAvailable] = useState('');
  const [selectedGarage, setSelectedGarage] = useState<string | null>(null);
  const [selectedAmenities, setSelectedAmenities] = useState<AmenitiesRoomApi[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  const [filters, setFilters] = useState<{ [key: string]: string[] }>({
    category: [],
    garage: [],
    amenities: [],
    sale: [],
    available: [],
  });

  useEffect(() => {
    if (isSideMenuFilterOpen) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'auto';
    }
    return () => {
      document.body.style.overflowY = 'auto';
    };
  }, [isSideMenuFilterOpen]);

  const isFiltering =
    selectedCategory || selectedGarage || selectedAmenities.length > 0 || showOninAvailable || showOnSale;

  const handleSelectionCategory = (category: CategoryRoomApi) => {
    const newCategory = selectedCategory === category.name ? '' : category.name;
    setSelectedCategory(newCategory);
    setFilters((prev) => ({
      ...prev,
      category: newCategory ? [category.name] : [],
    }));
    setTimeout(() => {
      onSelectedCategory(newCategory ? category.id : '');
    }, 0);
    closeSideMenuFilter();
  };

  const handleSelectionGarage = (garage: GarageRoomApi) => {
    const newGarage = selectedGarage === garage.title ? '' : garage.title;
    setSelectedGarage(newGarage);
    setFilters((prev) => ({
      ...prev,
      garage: newGarage ? [garage.title] : [],
    }));
    setTimeout(() => {
      onselectedGarage(newGarage ? garage.id : '');
    }, 0);
    closeSideMenuFilter();
  };

  const handleSelectionAmenitie = (amenitie: AmenitiesRoomApi) => {
    const isSelected = selectedAmenities.includes(amenitie);
    const updatedAmenities = isSelected
      ? selectedAmenities.filter((item) => item !== amenitie)
      : [...selectedAmenities, amenitie];

    setSelectedAmenities(updatedAmenities);
    setFilters((prev) => ({
      ...prev,
      amenities: updatedAmenities.map((item) => item.name),
    }));
    setTimeout(() => {
      onSelectedAmenities(updatedAmenities);
    }, 0);
    closeSideMenuFilter();
  };

  const toggleShowOnSale = () => {
    const newVal = showOnSale === 'true' ? '' : 'true';
    setShowOnSale(newVal);
    setFilters((prev) => ({
      ...prev,
      sale: newVal ? ['Activada'] : [],
    }));
    setTimeout(() => {
      onToogleSale(newVal);
    }, 0);
    closeSideMenuFilter();
  };

  const toggleShowinAvailable = () => {
    const newVal = showOninAvailable === 'true' ? '' : 'true';
    setShowOninAvailable(newVal);
    setFilters((prev) => ({
      ...prev,
      available: newVal ? ['Disponibles'] : [],
    }));
    setTimeout(() => {
      onToogleinAvailable(newVal);
    }, 0);
    closeSideMenuFilter();
  };

  const removeFilter = (type: string, value: string) => {
    setFilters((prev) => {
      const updated = { ...prev };
      if (type === 'category') {
        updated.category = [];
        setSelectedCategory('');
        setTimeout(() => onSelectedCategory(''), 0);
      } else if (type === 'garage') {
        updated.garage = [];
        setSelectedGarage(null);
        setTimeout(() => onselectedGarage(''), 0);
      } else if (type === 'amenities') {
        const updatedAmenities = selectedAmenities.filter((item) => item.name !== value);
        setSelectedAmenities(updatedAmenities);
        updated.amenities = updatedAmenities.map((a) => a.name);
        setTimeout(() => onSelectedAmenities(updatedAmenities), 0);
      } else if (type === 'sale') {
        updated.sale = [];
        setShowOnSale('');
        setTimeout(() => onToogleSale(''), 0);
      } else if (type === 'available') {
        updated.available = [];
        setShowOninAvailable('');
        setTimeout(() => onToogleinAvailable(''), 0);
      }
      return updated;
    });
  };

  return (
    <>
      {isSideMenuFilterOpen && (
        <>
          <div className="fixed top-0 left-0 w-screen h-screen z-20 bg-black opacity-30" />
          <div onClick={closeSideMenuFilter} className="fade-in fixed top-0 left-0 w-screen h-screen z-20 backdrop-filter backdrop-blur-sm" />
        </>
      )}

      <nav
        className={clsx(
          'fixed p-5 right-0 top-0 w-[300px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300 overflow-y-auto',
          { 'translate-x-full': !isSideMenuFilterOpen }
        )}
      >
        <div className="flex justify-between items-center mb-3">
          <p className="text-lg font-extralight antialiased">Filtros</p>
          <IoCloseOutline size={30} className="cursor-pointer" onClick={closeSideMenuFilter} />
        </div>

        {isFiltering && (
          <>
            <div className="mb-5 flex flex-wrap gap-2">
              {Object.entries(filters).map(([type, values]) =>
                values.map((value) => (
                  <div key={`${type}-${value}`} className="rounded-full py-1 px-2 bg-gray-200 text-gray-600 flex items-center gap-2 w-fit">
                    <p className="text-xs">
                      {type === 'category' ? 'Categoría' :
                        type === 'garage' ? 'Garaje' :
                        type === 'sale' ? 'Promoción' :
                        type === 'available' ? 'Estado' :
                        'Comodidad'}
                      : {value}
                    </p>
                    <IoMdClose className="h-4 w-4 cursor-pointer" onClick={() => removeFilter(type, value)} />
                  </div>
                ))
              )}
            </div>
            <div className="w-full h-px bg-gray-200 my-5" />
          </>
        )}

        {BestPromotion && (
          <div className={clsx('max-w-sm p-4 border rounded-md mb-5', {
            'bg-gray-100': showOnSale === 'true',
            'bg-white': showOnSale !== 'true',
          })}>
            <div className="flex justify-between items-center gap-3">
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={showOnSale === 'true'}
                  onChange={toggleShowOnSale}
                  className="sr-only peer"
                />
                <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-red-600 after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
              </label>
              <div>
                <p className={`${fontBe_Vietnam_Pro.className} font-bold`}>
                  Super <span className="text-red-500">Ofertas</span>
                </p>
                <p className="text-xs">Habitaciones desde {currencyFormat(BestPromotion)}</p>
              </div>
            </div>
          </div>
        )}

        {/* Habitaciones */}
        <div>
          <div className="flex justify-between items-center">
            <h1 className="font-extrabold text-md">Habitaciones</h1>
            <button onClick={() => setOpenSubMenuRooms(!openSubMenuRooms)}>
              {openSubMenuRooms ? <IoIosArrowUp size={20} /> : <IoIosArrowDown size={20} />}
            </button>
          </div>
          {openSubMenuRooms && (
            <ul className="mt-3 space-y-3">
              {categoryRoom.map((categoryItem) => (
                <li key={categoryItem.id}>
                  <button
                    onClick={() => handleSelectionCategory(categoryItem)}
                    className={clsx('text-sm px-1 capitalize', {
                      'bg-red-500 text-white rounded-lg py-1 px-3': selectedCategory === categoryItem.name,
                      'text-gray-800 hover:border-l-4 hover:border-red-500': selectedCategory !== categoryItem.name,
                    })}
                  >
                    {categoryItem.name}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="w-full h-px bg-gray-200 my-5" />

        {/* Garaje */}
        <div>
          <div className="flex justify-between items-center">
            <p className="font-extrabold text-md">Garaje</p>
            <button onClick={() => setOpenSubMenuGaraje(!openSubMenuGaraje)}>
              {openSubMenuGaraje ? <IoIosArrowUp size={20} /> : <IoIosArrowDown size={20} />}
            </button>
          </div>
          {openSubMenuGaraje && (
            <div className="mt-3">
              {garageRoom.map((garage) => (
                <div key={garage.id} className="flex items-center mt-2">
                  <input
                    type="checkbox"
                    checked={selectedGarage === garage.title}
                    onChange={() => handleSelectionGarage(garage)}
                    className="w-4 h-4"
                  />
                  <label className="ml-2 text-sm text-gray-900">{garage.title}</label>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="w-full h-px bg-gray-200 my-5" />

        {/* Comodidades */}
        <div>
          <div className="flex justify-between items-center">
            <p className="font-extrabold text-md">Comodidades</p>
            <button onClick={() => setOpenSubMenuAmenities(!openSubMenuAmenities)}>
              {openSubMenuAmenities ? <IoIosArrowUp size={20} /> : <IoIosArrowDown size={20} />}
            </button>
          </div>
          {openSubMenuAmenities && (
            <div className="mt-3">
              {amenitiesRoom.map((amenitie) => (
                <div key={amenitie.id} className="flex items-center mt-2">
                  <input
                    type="checkbox"
                    checked={selectedAmenities.includes(amenitie)}
                    onChange={() => handleSelectionAmenitie(amenitie)}
                    className="w-4 h-4"
                  />
                  <label className="ml-2 text-sm text-gray-900">{amenitie.name}</label>
                </div>
              ))}
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

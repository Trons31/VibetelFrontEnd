'use client';

import { clsx } from 'clsx';

import { useUIStore } from '@/store';
import { IoCloseOutline } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import { AmenitiesRoom, AmenitiesRoomApi, CategoryRoom, CategoryRoomApi, GarageRoom, GarageRoomApi } from '@/interfaces';
import { IoIosArrowDown, IoIosArrowUp, IoMdClose } from 'react-icons/io';
import { fontBe_Vietnam_Pro } from '@/config/fonts';
import { currencyFormat } from '@/utils';

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


export const SideBarMenuFilter = ({ categoryRoom, garageRoom, BestPromotion, amenitiesRoom, onToogleSale, onToogleinAvailable, onselectedGarage, onSelectedAmenities, onSelectedCategory }: Props) => {

  const isSideMenuFilterOpen = useUIStore(state => state.isSideMenuFilterOpen);
  const closeSideMenuFilter = useUIStore(state => state.closeSideMenuFilter);

  const [openSubMenuGaraje, setOpenSubMenuGaraje] = useState(true);
  const [showOnSale, setShowOnSale] = useState("");
  const [showOninAvailable, setShowOninAvailable] = useState("");

  const [openSubMenuRooms, setOpenSubMenuRooms] = useState(true);

  const [openSubMenuAmenities, setOpenSubMenuAmenities] = useState(true);
  const [selectedGarage, setSelectedGarage] = useState<string | null>(null);
  const [selectedAmenities, setSelectedAmenities] = useState<AmenitiesRoomApi[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {

  }, [])

  const [filters, setFilters] = useState<{ [key: string]: string[] }>({
    category: [],
    garage: [],
    amenities: [],
    sale: [],
    available: []
  });

  const handleSelectionCategory = (category: CategoryRoomApi) => {
    const newCategory = selectedCategory === category.name ? '' : category.name;
    setSelectedCategory(newCategory);
    onSelectedCategory(newCategory ? category.id : '');

    // Update filters
    setFilters(prev => ({
      ...prev,
      category: newCategory ? [category.name] : []
    }));
    closeSideMenuFilter();
  };


  const handleSelectionGarage = (garage: GarageRoomApi) => {
    const newGarage = selectedGarage === garage.title ? '' : garage.title;
    setSelectedGarage(newGarage);
    onselectedGarage(newGarage ? garage.id : '');

    // Update filters
    setFilters(prev => ({
      ...prev,
      garage: newGarage ? [garage.title] : []
    }));
    closeSideMenuFilter();
  };


  const toggleShowOnSale = () => {
    if (showOnSale === "true") {
      setShowOnSale("");
      onToogleSale("");
      setFilters(prev => ({
        ...prev,
        sale: []
      }));
    } else {
      setShowOnSale("true");
      onToogleSale("true");
      setFilters(prev => ({
        ...prev,
        sale: ["Activada"]
      }));
    }
    closeSideMenuFilter();
  };

  const toggleShowinAvailable = () => {
    if (showOninAvailable === "true") {
      setShowOninAvailable("");
      onToogleinAvailable("");
      setFilters(prev => ({
        ...prev,
        available: []
      }));
    } else {
      setShowOninAvailable("true");
      onToogleinAvailable("true");
      setFilters(prev => ({
        ...prev,
        available: ["Disponibles"]
      }));
    }
    closeSideMenuFilter();
  };

  const handleSelectionAmenitie = (amenitie: AmenitiesRoomApi) => {
    const isSelected = selectedAmenities.includes(amenitie);
    let updatedAmenities = [...selectedAmenities];

    if (isSelected) {
      updatedAmenities = updatedAmenities.filter(item => item !== amenitie);
    } else {
      updatedAmenities.push(amenitie);
    }

    setSelectedAmenities(updatedAmenities);
    onSelectedAmenities(updatedAmenities);
    setFilters((prev) => ({
      ...prev,
      amenities: updatedAmenities.map((item) => item.name),
    }));
    closeSideMenuFilter();
  };


  const removeFilter = (type: string, value: string) => {
    setFilters(prev => {
      const updatedFilters = { ...prev };
      if (type === 'category') {
        updatedFilters.category = [];
        setSelectedCategory('');
        onSelectedCategory('');
      } else if (type === 'garage') {
        updatedFilters.garage = [];
        setSelectedGarage(null);
        onselectedGarage('');
      } else if (type === 'amenities') {
        updatedFilters.amenities = updatedFilters.amenities.filter(item => item !== value);
        setSelectedAmenities(selectedAmenities.filter(item => item.name !== value));
        onSelectedAmenities(selectedAmenities.filter(item => item.name !== value));
      } else if (type === 'sale') {
        updatedFilters.sale = [];
        setShowOnSale("");
        onToogleSale("");
      } else if (type === 'available') {
        updatedFilters.available = [];
        setShowOninAvailable("");
        onToogleinAvailable("");
      }

      return updatedFilters;
    });
  };



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


  const isFiltering = selectedCategory || selectedGarage || selectedAmenities.length > 0 || showOninAvailable || showOnSale;


  return (

    <div>

      {
        //Validamos si solo si la property isSideMenuOpen es true entonces mostraremos el fondo oscuro de nuestro menu abierto
        isSideMenuFilterOpen && (
          <>
            {/* BackGround Black para el fondo al abrir nuestro menu */}
            <div
              //Definimos estilos de Tailwind para crear nuestro sidebar como: fixed para que este fijo el componente, w-screem para que ocupe todo el ancho al igual que h-screen, z-10 para que este incima de todos los componentes que existan en la aplicacion color negro con una opacidad de 30
              className="fixed top-0 left-0 w-screen h-screen z-20  bg-black opacity-30"
            />
          </>
        )

      }

      {
        //Validamos si solo si isSideMenuOpen es true mostramos el Blur del fondo del menu abierto
        isSideMenuFilterOpen && (
          <>

            {/*  Blur para el fondo al abrir nuestro menu */}
            <div
              //Utilizamos la funcion onClikc para llamar el menu y cerrarlo y hacen click a fuera del menu en el fondo de la aplicacion
              onClick={closeSideMenuFilter}
              //Definimos estilos para crear el blur o fondo borroso utilizamos la clase glabal fade-in y la poscion fija, las mismas dimensiones dell ancho y alto de toda la pantalla z-10 para que este pór encima de todo y el blur : backdrop-filter para crear filtro borroso backdrop-blur-sm para definir la intensidad con las dimensiones sm,md,xl
              className="fade-in fixed top-0 left-0 w-screen h-screen z-20 backdrop-filter backdrop-blur-sm"
            />

          </>
        )

      }

      {/*Definimos el nav aplicando los estilos de TailWind posicion fija, right-0 para que aparezca en la posicion de la derecha utilziamos el z-20 para definir que este estara sobre todos los componentes existentes en la aplicacion */}
      <nav
        className={
          //Utilizamos clsx para crear el estilo condicional para mostrar nuestro nav o menu lateral de nuestra aplicacion
          clsx(
            //Definimos los estilos que se van a aplicar a nuestro nav
            "fixed p-5 right-0 top-0 w-[300px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300 overflow-y-auto",
            //Aplicamos el siguiente estilo condicional
            {
              //Si isSideMenuOpen no es true entonces trasladaremos nuestro menu complentamente a la derecha es decir no se mostrara en la aplicacion
              "translate-x-full": !isSideMenuFilterOpen
            }
          )
        }
      >

        <div className='flex justify-between items-center mb-3' >
          <p className='text-lg font-extralight antialiased' >Filtros</p>

          {/*Icon Close */}
          <IoCloseOutline
            size={30}
            className='cursor-pointer'
            //Utilizamos la funcion onClick que se dispara al hacer click al icono para llamar el metodo closeSideMenuq que cierra el menu
            onClick={closeSideMenuFilter}
          />
        </div>


        {/* Menu de opciones */}

        {
          isFiltering && (
            <>
              <div className='mb-5'>
                {Object.keys(filters).map(type => (
                  filters[type].map(value => (
                    <div key={value} className='rounded-full py-1 px-2 mb-2 bg-gray-200 text-gray-600 flex items-center gap-2  w-fit'>
                      <p className='text-xs'>
                        {type === 'category' ? 'Categoría' :
                          type === 'garage' ? 'Garaje' :
                            type === 'sale' ? 'Promoción' :
                              type === 'available' ? 'Estado' :
                                type === 'amenities' ? 'Comodidades' :
                                  value}
                        : {value}
                      </p>
                      <IoMdClose
                        className='h-4 w-4 text-gray-600 cursor-pointer'
                        onClick={() => removeFilter(type, value)}
                      />
                    </div>
                  ))
                ))}
              </div>

              <div className='w-full h-px bg-gray-200 my-5' />
            </>
          )
        }

        {
          BestPromotion && (
            <div className={
              clsx(
                "max-w-sm p-4  border border-gray-200 rounded-md  mb-5",
                {
                  "bg-gray-100": showOnSale === "true",
                  "bg-white ": showOnSale !== "true"
                }
              )
            }>
              <div className='flex gap-3 justify-between' >
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    onChange={toggleShowOnSale}
                    type="checkbox"
                    checked={showOnSale === "true"}
                    value=""
                    className="sr-only peer" />
                  <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none  rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full  after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-red-600"></div>
                </label>
                <div>
                  <p className={`${fontBe_Vietnam_Pro.className} font-bold`} >Super <span className='text-red-500' >Ofertas</span></p>
                  <p className='text-xs' >Habitaciones desde {currencyFormat(BestPromotion)}</p>
                </div>
              </div>
            </div>
          )
        }

        {/* <div className={
          clsx(
            "max-w-sm p-4 mt-1 border border-gray-200 rounded-md  mb-5",
            {
              "bg-gray-100": showOninAvailable === "true",
              " bg-white": showOninAvailable !== "true",
            }
          )
        } >
          <div className='flex justify-between' >
            <label className="inline-flex items-center cursor-pointer">
              <input
                onChange={toggleShowinAvailable}
                type="checkbox"
                checked={showOninAvailable === "true"}
                value=""
                className="sr-only peer" />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none  rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full  after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-700"></div>
            </label>
            <p className={`${fontBe_Vietnam_Pro.className} font-bold`} >Disponibles</p>
          </div>
        </div> */}

        <div className='mt-0 px-2 ' >

          <div className='' >
            <div className='block mt-0' >
              <div className='flex justify-between items-center' >
                <h1 className='font-extrabold text-md' >Habitaciones</h1>
                {
                  openSubMenuRooms
                    ? (
                      <button
                        className='fade-in  transition-all duration-500'
                        onClick={() => setOpenSubMenuRooms(false)}
                      >
                        <IoIosArrowUp size={20} />
                      </button>
                    )
                    : (
                      <button
                        className='fade-in  transition-all duration-500'
                        onClick={() => setOpenSubMenuRooms(true)}
                      >
                        <IoIosArrowDown size={20} />
                      </button>
                    )
                }
              </div>
              {
                openSubMenuRooms && (
                  <ul className="fade-in mt-3 space-y-3 list-inside">
                    {
                      categoryRoom.map(categoryItem => (
                        <li key={categoryItem.id} className="flex py-1 items-center">
                          <button
                            onClick={() => handleSelectionCategory(categoryItem)}
                            className={clsx(
                              'text-gray-800 text-sm hover:border-l-4 px-1 capitalize hover:border-red-500',
                              { 'bg-red-500 text-white rounded-lg py-1 px-3': selectedCategory === categoryItem.name }
                            )}
                          >
                            {categoryItem.name}
                          </button>
                        </li>
                      ))
                    }
                  </ul>
                )
              }

            </div>

          </div>


          <div className='w-full h-px bg-gray-200 my-5' />

          <div className='' >
            <div className='flex justify-between items-center ' >

              <p className=" font-extrabold text-md md:mx-0 md:text-sm" >Garaje</p>
              {
                openSubMenuGaraje
                  ? (
                    <button
                      className='fade-in  transition-all duration-500'
                      onClick={() => setOpenSubMenuGaraje(false)}
                    >
                      <IoIosArrowUp size={20} />
                    </button>
                  )
                  : (
                    <button
                      className='fade-in  transition-all duration-500'
                      onClick={() => setOpenSubMenuGaraje(true)}
                    >
                      <IoIosArrowDown size={20} />
                    </button>
                  )
              }

            </div>

            {
              openSubMenuGaraje &&
              (
                <div className='fade-in  md:ml-0 transition-all duration-500'>

                  {
                    garageRoom.map(garage => (
                      <div key={garage.id} className="flex items-center mt-5 mb-4">
                        <input
                          type="checkbox"
                          checked={selectedGarage === garage.title}
                          onChange={() => handleSelectionGarage(garage)}
                          className="w-4 h-4"
                        />
                        <label className="ms-2 text-md md:text-sm  font-medium text-gray-900 ">{garage.title}</label>
                      </div>
                    ))
                  }
                </div>
              )
            }

          </div>


          <div className='w-full h-px bg-gray-200 my-5' />

          <div className='' >
            <div className='flex justify-between items-center ' >

              <p className=" font-extrabold text-md md:mx-0 md:text-sm" >Comodidades</p>
              {
                openSubMenuAmenities
                  ? (
                    <button
                      className='fade-in  transition-all duration-500'
                      onClick={() => setOpenSubMenuAmenities(false)}
                    >
                      <IoIosArrowUp size={20} />
                    </button>
                  )
                  : (
                    <button
                      className='fade-in  transition-all duration-500'
                      onClick={() => setOpenSubMenuAmenities(true)}
                    >
                      <IoIosArrowDown size={20} />
                    </button>
                  )
              }

            </div>

            {
              openSubMenuAmenities &&
              (
                <div className='fade-in  md:ml-0 transition-all duration-500'>
                  {
                    amenitiesRoom.map(amenitie => (
                      <div key={amenitie.id} className="flex items-center mt-5 mb-4">
                        <input
                          type="checkbox"
                          checked={selectedAmenities.includes(amenitie)} // Check if amenitie is included in selectedAmenities
                          onChange={() => handleSelectionAmenitie(amenitie)}
                          className="w-4 h-4"
                        />
                        <label className="ms-2 text-md md:text-sm font-medium text-gray-900">{amenitie.name}</label>
                      </div>
                    ))
                  }
                </div>
              )
            }

          </div>

          <div className='w-full h-px bg-gray-200 my-5' />

        </div>

      </nav>

    </div>

  )
}

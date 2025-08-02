'use client';
import React, { ChangeEvent, useState } from 'react'
import { CityApi, CountryApi, DepartmentApi, MotelApi } from '@/interfaces';
import clsx from 'clsx'
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';

interface Props {
    motel: MotelApi
    countries: CountryApi[]
    departments: DepartmentApi[]
    cities: CityApi[]
}

type FormInputs = {
    country: string;
    department: string;
    city: string;
    address: string;
    neighborhood: string;
}

export const LocationForm = ({ motel, countries, departments, cities }: Props) => {

    const [motelInfo, setMotelInfo] = useState<MotelApi | null>(null);
    const [loading, setLoading] = useState(true);
    const [showLoadingButton, setShowLoadingButton] = useState(false);

    const [selectedCountry, setSelectedCountry] = useState<string>('');
    const [selectedDepartment, setSelectedDepartment] = useState<string>('');
    const [filteredDepartments, setFilteredDepartments] = useState<DepartmentApi[]>([]);
    const [filteredCities, setFilteredCities] = useState<CityApi[]>([]);


    const { register, handleSubmit, formState: { errors }, setValue, trigger } = useForm<FormInputs>();


    const onUpdate = async (data: FormInputs) => {
        setShowLoadingButton(true);
        // const { country, department, city, address, neighborhood } = data;

        // const response = await updateLocationMotel(country, department, city, address, neighborhood, motel.id);

        // if (!response.ok) {
        //     toast.error("No se pudo actualizar la informacion")
        //     setShowLoadingButton(false);
        //     return
        // }

        toast.success("Actualizacion correcta!");
        setShowLoadingButton(false);
    }


    const handleCountryChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedCountryId = e.target.value;
        setSelectedCountry(selectedCountryId);

        setValue('country', selectedCountryId);
        trigger('country');

        const countryDepartments: DepartmentApi[] = departments.filter(department => department.country.geonameId === selectedCountryId);
        setFilteredDepartments(countryDepartments);

        setFilteredCities([]);
    };

    const handleDepartmentChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedDepartmentId = e.target.value;
        setSelectedDepartment(selectedDepartmentId);

        setValue('department', selectedDepartmentId);
        trigger('department');

        const departmentCities: CityApi[] = cities.filter(city => city.department.geonameId === selectedDepartmentId);
        setFilteredCities(departmentCities);
    };

    // useEffect(() => {
    //     if (motel) {
    //         setMotelInfo(motel);
    //         setValue('country', motel.country?.id || '');
    //         setValue('department', motel.department?.id || '');
    //         setValue('city', motel.city?.id || '');
    //         setValue('neighborhood', motel.neighborhood || '');
    //         setValue('address', motel.address || '');

    //         if (motel.country) {
    //             const countryDepartments: Department[] = departments.filter(department => department.countryId === motel.country?.id);
    //             setFilteredDepartments(countryDepartments);
    //             setSelectedCountry(motel.country.id);

    //             if (motel.department) {
    //                 const departmentCities: City[] = cities.filter(city => city.departmentId === motel.department?.id);
    //                 setFilteredCities(departmentCities);
    //                 setSelectedDepartment(motel.department.id);
    //             }
    //         }
    //         setLoading(false);
    //     }
    // }, [motel, departments, cities, setValue]);


    return (
        <>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />

            {

                loading
                    ?
                    (
                        <>
                            <div className='grid grid-cols-1 gap-3'>
                                <div className="mb-4">
                                    <div className="w-24 h-2 mb-2 bg-gray-200 rounded-full animate-pulse"></div>
                                    <div className="w-full h-6 bg-gray-300 rounded-full animate-pulse"></div>
                                </div>

                            </div>

                            <div className='grid grid-cols md:grid-cols-2 gap-4' >
                                <div className="mb-4">
                                    <div className="w-24 h-2 mb-2 bg-gray-200 rounded-full animate-pulse"></div>

                                    <div className="w-full h-6 bg-gray-300 rounded-full animate-pulse"></div>
                                </div>
                                <div className="mb-4">
                                    <div className="w-24 h-2 mb-2 bg-gray-200 rounded-full animate-pulse"></div>

                                    <div className="w-full h-6 bg-gray-300 rounded-full animate-pulse"></div>
                                </div>
                            </div>

                            <div className='grid grid-cols md:grid-cols-2 gap-4' >
                                <div className="mb-4">
                                    <div className="w-24 h-2 mb-2 bg-gray-200 rounded-full animate-pulse"></div>

                                    <div className="w-full h-6 bg-gray-300 rounded-full animate-pulse"></div>
                                </div>
                                <div className="mb-4">
                                    <div className="w-24 h-2 mb-2 bg-gray-200 rounded-full animate-pulse"></div>

                                    <div className="w-full h-6 bg-gray-300 rounded-full animate-pulse"></div>
                                </div>
                            </div>

                        </>
                    )
                    : (
                        <form action="" onSubmit={handleSubmit(onUpdate)} >
                            <div className='grid grid-cols-1'>
                                <div className="relative w-full">
                                    <select
                                        className={clsx(
                                            "block  px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-xl border border-gray-300"
                                        )}
                                        {...register('country', { required: true })}
                                        onChange={handleCountryChange}
                                        defaultValue={motelInfo?.city.id || ''}
                                    >
                                        <option value=""> [ Seleccione país]</option>
                                        {countries.map(country => (
                                            <option key={country.geonameId} value={country.geonameId}>{country.name}</option>
                                        ))}
                                    </select>
                                    <label
                                        className={clsx(
                                            "absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                                        )}
                                    >
                                        País
                                    </label>
                                </div>
                            </div>
                            <div className='grid grid-cols mt-7 md:mt-10 md:grid-cols-2 md:gap-4'>
                                <div className="relative w-full">
                                    <select
                                        className={clsx(
                                            "block  px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-xl border border-gray-300",
                                            { "cursor-not-allowed": !selectedCountry }
                                        )}
                                        disabled={!selectedCountry}
                                        {...register('department', { required: true })}
                                        onChange={handleDepartmentChange}
                                        defaultValue={motelInfo?.city.department.geonameId || ''}
                                    >
                                        <option value=""> [ Seleccione departamento ]</option>
                                        {filteredDepartments.map(department => (
                                            <option key={department.geonameId} value={department.geonameId}>{department.name}</option>
                                        ))}
                                    </select>
                                    <label
                                        className={clsx(
                                            "absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                                        )}
                                    >
                                        Departamento
                                    </label>
                                </div>
                                <div className="relative mt-7 w-full">
                                    <select
                                        className={
                                            clsx(
                                                "block  px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-xl border border-gray-300 ",
                                                {
                                                    "border-red-500": errors.city,
                                                    "cursor-not-allowed": !selectedDepartment
                                                }
                                            )
                                        }
                                        defaultValue=""
                                        {...register('city', { required: true })}
                                        disabled={!selectedDepartment}
                                    >
                                        <option value="" disabled> [ Seleccione ciudad ]</option>
                                        {filteredCities.map(city => (
                                            <option key={city.id} value={city.id}>{city.name}</option>
                                        ))}
                                    </select>
                                    <label
                                        className={
                                            clsx(
                                                "absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1",
                                                {
                                                    "text-red-500": errors.city
                                                }
                                            )
                                        }
                                    >
                                        Ciudad
                                    </label>
                                </div>
                                {
                                    errors.city?.type === 'required' && (
                                        <span className="text-red-500 text-xs">* Seleccione un ciudad</span>
                                    )
                                }
                            </div>

                            <div className='grid grid-cols mt-4 md:grid-cols-2 md:gap-4'>
                                <div className="mb-4">
                                    <label className={
                                        clsx(
                                            "block mb-2 text-sm text-black font-semibold ",
                                            {
                                                "text-red-500": errors.address
                                            }
                                        )
                                    }>Dirección</label>
                                    <input
                                        type="text"
                                        className={
                                            clsx(
                                                "bg-gray-300 border-2 border-gray-300 text-black text-sm rounded-lg appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 block w-full p-2.5 placeholder-black",
                                                {
                                                    'focus:border-red-600 border-red-500': errors.address
                                                }
                                            )
                                        }
                                        {...register('address', { required: true })}
                                        defaultValue={motelInfo?.address || ''}
                                    />
                                    {
                                        errors.address?.type === 'required' && (
                                            <span className="text-red-500 text-xs" >* La direccion es obligatoria</span>
                                        )
                                    }
                                </div>
                                <div className="mb-4">
                                    <label className={
                                        clsx(
                                            "block mb-2 text-sm text-black font-semibold ",
                                            {
                                                "text-red-500": errors.neighborhood
                                            }
                                        )
                                    }>Barrio o sector</label>
                                    <input
                                        type="text"
                                        className={
                                            clsx(
                                                "bg-gray-300 border-2 border-gray-300 text-black text-sm rounded-lg appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 block w-full p-2.5 placeholder-black",
                                                {
                                                    'focus:border-red-600 border-red-500': errors.neighborhood
                                                }
                                            )
                                        }
                                        {...register('neighborhood', { required: true })}
                                        defaultValue={motelInfo?.neighborhood || ''}
                                    />
                                    {
                                        errors.neighborhood?.type === 'required' && (
                                            <span className="text-red-500 text-xs" >* El sector o barrio es obligatorio</span>
                                        )
                                    }
                                </div>
                            </div>

                            <div className='flex justify-end' >
                                <button
                                    type='submit'
                                    disabled={showLoadingButton}
                                    className={
                                        clsx(

                                            {
                                                "flex items-center gap-x-4 rounded-lg bg-blue-600 hover:bg-blue-700 px-7 py-2 font-medium text-white": !showLoadingButton,
                                                "flex items-center gap-x-4 rounded-lg bg-blue-600 px-7 py-2 font-medium text-white cursor-not-allowed": showLoadingButton
                                            }
                                        )
                                    }>
                                    {
                                        showLoadingButton &&
                                        (<svg className="h-5 w-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" ></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>)
                                    }

                                    {
                                        showLoadingButton
                                            ? (
                                                <span>Cargando...</span>
                                            ) : (
                                                <span>Actualizar</span>
                                            )
                                    }

                                </button>
                            </div>
                        </form>
                    )

            }

        </>
    )
}

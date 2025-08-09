'use client';
import { AmenitiesMotelInfoApi, CityApi, CountryApi, DepartmentApi, MotelApi } from '@/interfaces'
import { DataBasicForm } from './DataBasicForm';
import { LocationForm } from './LocationForm';
import { Amenities } from './Amenities';
import { OtherAmenities } from './OtherAmenities';
import { UpdatePassword } from './UpdatePassword';
import { UserApi } from '@/interfaces/user.interface';
import { MotelPartnerForm } from './MotelPartnerForm';


interface Props {
    motelPartner: UserApi;
    motel: MotelApi,
    amenitiesMotel: AmenitiesMotelInfoApi[],
    countries: CountryApi[]
    departments: DepartmentApi[]
    cities: CityApi[]
    accessToken: string
}

export const ConfigMotel = ({ motel, amenitiesMotel, countries, cities, departments, motelPartner, accessToken }: Props) => {

    return (
        <div className="min-h-screen max-w-screen-xl sm:mx-4 xl:mx-auto">
            <hr className="mt-4 mb-8" />

            <div className='flex p-2 md:px-5 mt-2 mb-5' >
                <p className='text-xl font-bold'>Configura tu motel</p>
            </div>

            <div className="grid grid-cols pt-3 px-2 md:px-5">
                <div className='grid grid-cols-1 md:grid-cols-3 md:gap-6'>
                    <div className='md:col-span-1'>
                        <p className='text-md md:text-lg font-bold'>Informacion basica</p>
                        <p className='text-xs md:text-sm' >Por favor, mantenga la información de su motel actualizada para asegurar que sus clientes reciban datos precisos y puedan disfrutar de una mejor experiencia.</p>
                    </div>

                    <div className='md:col-span-2'>
                        <DataBasicForm
                            motel={motel}
                            accessToken={accessToken}
                        />
                    </div>
                </div>

                <hr className="mt-4 mb-8" />

                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                    <div className='md:col-span-1'>
                        <p className='text-md md:text-lg font-bold'>Ubicacion</p>
                        <p className='text-xs md:text-sm' >Por favor, mantenga la información de ubicación de su motel actualizada para asegurar que sus clientes puedan encontrarlo fácilmente y planificar su visita sin inconvenientes.</p>
                    </div>


                    <div className='md:col-span-2'>
                        <LocationForm
                            accessToken={accessToken}
                            motel={motel}
                            countries={countries}
                            departments={departments}
                            cities={cities}
                        />
                    </div>
                </div>

                <hr className="mt-4 mb-8" />


                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                    <div className='md:col-span-1'>
                        <p className='text-md md:text-lg font-bold'>Comodidades</p>
                        <p className='text-xs md:text-sm' >Por favor, mantenga la información sobre las comodidades que ofrece su motel actualizada para asegurar que sus clientes conozcan todos los servicios disponibles y puedan disfrutar de una estancia más agradable.</p>

                    </div>
                    <div className='md:col-span-2'>
                        <Amenities
                            amenitiesMotel={amenitiesMotel}
                            motel={motel}
                            accessToken={accessToken}
                        />
                    </div>
                </div>


                <hr className="mt-4 mb-8" />

                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                    <div className='md:col-span-1'>
                        <p className='text-md md:text-lg font-bold'>Otras comodidades</p>
                        <p className='text-xs md:text-sm' >  Si no encuentras una comodidad específica en la lista, ¡siéntete libre de agregarla tú mismo!</p>
                    </div>


                    <div className='md:col-span-2'>
                        <OtherAmenities
                            accessToken={accessToken}
                        />
                    </div>
                </div>


                <hr className="mt-4 mb-8" />
                <div className='flex  mt-2 mb-14' >
                    <p className='text-xl font-bold'>Configura tu cuenta de usuario</p>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                    <div className='md:col-span-1'>
                        <p className='text-md md:text-lg font-bold'>Informacion basica</p>
                        <p className='text-xs md:text-sm'>Por favor, mantenga la información de su motel actualizada para asegurar que sus clientes reciban datos precisos y puedan disfrutar de una mejor experiencia.</p>
                    </div>

                    <div className='md:col-span-2'>
                        <MotelPartnerForm
                            motelPartner={motelPartner}
                            accessToken={accessToken}
                        />
                    </div>
                </div>

                {/* <hr className="mt-4 mb-8" /> */}

                {/* <UpdatePassword
                    accessToken={accessToken}
                /> */}
                {/* <hr className="mt-4 mb-8" /> */}

            </div>
        </div>
    )
}

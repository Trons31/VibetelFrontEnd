'use client';
import { AmenitiesMotelInfo, City, Country, Department, MotelAdmin } from '@/interfaces'
import { DataBasicForm } from './DataBasicForm';
import { LocationForm } from './LocationForm';
import { Amenities } from './Amenities';
import { OtherAmenities } from './OtherAmenities';
import { UpdatePassword } from './UpdatePassword';
import { MotelPartnerForm } from './MotelPartnerForm';
import { UserInterface } from '@/interfaces/user.interface';


interface Props {
    motelPartner: UserInterface;
    motel: MotelAdmin,
    amenitiesMotel: AmenitiesMotelInfo[],
    countries: Country[]
    departments: Department[]
    cities: City[]
}

export const ConfigMotel = ({ motel, amenitiesMotel, countries, cities, departments, motelPartner }: Props) => {

    return (
        <div className="mx-4 min-h-screen max-w-screen-xl sm:mx-8 xl:mx-auto">
            <hr className="mt-4 mb-8" />

            <div className='flex px-5 mt-2 mb-5' >
                <p className='text-xl font-bold'>Configura tu motel</p>
            </div>

            <div className="grid grid-cols pt-3 px-5">

                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                    <div className='md:col-span-1'>
                        <p className='text-lg font-bold'>Informacion basica</p>
                        <p>Por favor, mantenga la información de su motel actualizada para asegurar que sus clientes reciban datos precisos y puedan disfrutar de una mejor experiencia.</p>
                    </div>

                    <div className='md:col-span-2'>
                        <DataBasicForm motel={motel} />
                    </div>
                </div>

                <hr className="mt-4 mb-8" />

                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                    <div className='md:col-span-1'>
                        <p className='text-lg font-bold'>Ubicacion</p>
                        <p>Por favor, mantenga la información de ubicación de su motel actualizada para asegurar que sus clientes puedan encontrarlo fácilmente y planificar su visita sin inconvenientes.</p>
                    </div>


                    <div className='md:col-span-2'>
                        <LocationForm motel={motel} countries={countries} departments={departments} cities={cities} />
                    </div>
                </div>

                <hr className="mt-4 mb-8" />


                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                    <div className='md:col-span-1'>
                        <p className='text-lg font-bold'>Comodidades</p>
                        <p>Por favor, mantenga la información sobre las comodidades que ofrece su motel actualizada para asegurar que sus clientes conozcan todos los servicios disponibles y puedan disfrutar de una estancia más agradable.</p>

                    </div>
                    <div className='md:col-span-2'>
                        <Amenities amenitiesMotel={amenitiesMotel} motel={motel} />
                    </div>
                </div>


                <hr className="mt-4 mb-8" />

                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                    <div className='md:col-span-1'>
                        <p className='text-lg font-bold'>Otras comodidades</p>
                        <p>  Si no encuentras una comodidad específica en la lista, ¡siéntete libre de agregarla tú mismo!</p>
                    </div>


                    <div className='md:col-span-2'>
                        <OtherAmenities motel={motel} />
                    </div>
                </div>


                <hr className="mt-4 mb-8" />
                <div className='flex  mt-2 mb-14' >
                    <p className='text-xl font-bold'>Configura tu cuenta de usuario</p>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                    <div className='md:col-span-1'>
                        <p className='text-lg font-bold'>Informacion basica</p>
                        <p>Por favor, mantenga la información de su motel actualizada para asegurar que sus clientes reciban datos precisos y puedan disfrutar de una mejor experiencia.</p>
                    </div>

                    {/* <div className='md:col-span-2'>
                        <MotelPartnerForm motelPartner={motelPartner} />
                    </div> */}
                </div>

                <hr className="mt-4 mb-8" />

                <UpdatePassword motelPartnerId="5b6806ff-a271-4441-88f2-544d8c0f56a1" />
                <hr className="mt-4 mb-8" />

            </div>
        </div>
    )
}

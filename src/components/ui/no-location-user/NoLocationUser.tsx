import { FaMagnifyingGlassLocation } from 'react-icons/fa6'

interface Props {
    onLocation(): void,
}

export const NoLocationUser = ({ onLocation }: Props) => {
    return (
        <>
            <div className='flex gap-3 h-screen justify-center items-center' >
                <div className='block md:flex items-center gap-4  px-2' >
                    <div className='flex mb-2 cursor-pointer rounded-md p-2 md:mb-0 justify-center hover:bg-gray-200' >
                        <FaMagnifyingGlassLocation
                            onClick={onLocation}
                            className='w-10 h-10 text-gray-500'
                        />
                    </div>
                    <div>
                        <p className='text-gray-900 text-center md:text-start text-2xl font-semibold' >Ingresa tu ubicacion</p>
                        <p className='text-gray-800 text-center text-sm font-medium' >Te mostraremos las habitaciones de los moteles registrados en tu zona cuando ingreses tu ubicacion</p>
                    </div>
                </div>
            </div>
        </>
    )
}

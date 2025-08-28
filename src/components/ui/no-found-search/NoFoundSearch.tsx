import { SuggestedAndTopRoom } from '@/components'
import { MdOutlineSearchOff } from 'react-icons/md'

interface Props {
    query: string
}

export const NoFoundSearch = ({ query }: Props) => {
    return (
        <div className='h-full bg-gray-50' >
            <div className='flex  justify-center px-5 md:px-2 py-72' >
                <div className='block md:flex justify-between items-center gap-10 bg-white shadow-sm border border-gray-200 rounded-2xl p-4 md:p-12' >
                    <div className='flex justify-center' >
                        <MdOutlineSearchOff
                            className='h-14 w-14  text-red-600'
                        />
                    </div>
                    <div>
                        <p className='text-md md:text-2xl mt-4 md:mt-0 text-ligth' >Busquedad: {query}</p>
                        <p className='text-xs md:text-xl mt-4' >No hay habitaciones, moteles, categorias que coincidan con tu busquedad</p>
                        <ul className="list-disc list-inside mt-2 md:mt-0 text-xs md:text-sm text-gray-600">
                            <li> <strong className='text-black' >Revisa tu termino</strong> de busquedad</li>
                            <li>  <strong className='text-black' >Revisa la ortografia </strong> de tu busquedad</li>
                            <li>Prueba con una <strong className='text-black' >busquedad diferente</strong> </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* <div className="mt-20 md:mt-32">
                <SuggestedAndTopRoom />
            </div> */}
        </div>

    )
}

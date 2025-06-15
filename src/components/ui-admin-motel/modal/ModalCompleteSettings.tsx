import Link from 'next/link'
import { RiErrorWarningFill } from 'react-icons/ri'

export const ModalCompleteSettings = () => {
    return (
        <div
            className="fixed fade-in inset-0 z-50 overflow-y-hidden md:p-5 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
        >
            <div className="bg-white md:rounded-lg shadow-lg w-full md:w-1/2 lg:w-1/2 p-2 md:p-6 max-h-full overflow-y-auto">
                <div className='flex justify-center'>
                    <div className='p-2 bg-blue-100 rounded-lg'>
                        <RiErrorWarningFill size={32} className='text-blue-600' />
                    </div>
                </div>

                <p className="mt-4 text-center text-md md:text-xl font-bold">Configuraciones Necesarias</p>
                <p className="mt-2 text-center text-sm md:text-lg">
                    Antes de registrar las habitaciones, asegúrese de realizar las <Link href="/admin/dashboard-partner-motel/additional-settings" className='underline' >
                        configuraciones adicionales</Link> para establecer el tiempo de adición estándar a una reserva realizada.
                </p>

                <div className='mt-5 flex justify-end'>
                    <Link href="/admin/dashboard-partner-motel" className='underline hover:text-blue-600'>
                        Volver
                    </Link>
                </div>
            </div>
        </div>

    )
}

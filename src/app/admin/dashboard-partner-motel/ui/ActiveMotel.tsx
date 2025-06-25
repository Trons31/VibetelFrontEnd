import { FaCheck } from 'react-icons/fa6';
import Link from 'next/link';
import { IoBedOutline } from 'react-icons/io5';
import { PiUserCirclePlusDuotone } from 'react-icons/pi';
import { TbSettingsCheck } from 'react-icons/tb';
import { RiBankCardFill } from 'react-icons/ri';
import { MdOutlineAccessTimeFilled } from 'react-icons/md';
import { isApprovedStatus } from '@/interfaces';
import { FaExclamationTriangle } from 'react-icons/fa';

interface Props {
    motelImage?: string;
    status: isApprovedStatus;
    totalRoom: number;
    configMotel?: boolean;
    bankAccount?: boolean;
}

export const ActiveMotel = ({ motelImage, totalRoom, configMotel, bankAccount, status }: Props) => {

    const isCompleted = motelImage && totalRoom > 10 && configMotel && bankAccount;

    return (
        <>
            {
                status === "DISABLED"
                    ? (
                        <div className='bg-white p-3 md:p-10 rounded'>
                            <div className='flex gap-4'>
                                <div className='p-2 h-fit mt-1 bg-red-100 rounded-lg'>
                                    <FaExclamationTriangle className='text-red-600 h-5 w-5' />
                                </div>
                                <div>
                                    <p className='text-black text-2xl md:text-3xl'>Motel desactivado</p>
                                    <p className='text-gray-700 text-sm'>
                                        Su motel ha sido desactivado y ya no está disponible para los usuarios en la plataforma de Vibetel.
                                        Para volver a activarlo, comuníquese con nuestro equipo de soporte.
                                    </p>
                                    <p className='text-gray-700 text-sm mt-2'>
                                        La desactivación puede deberse a posibles incumplimientos con las políticas y normas de Vibetel.
                                        Le recomendamos revisar nuestras directrices y ponerse en contacto con nosotros para más detalles.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )
                    : (
                        <div className='bg-white p-3 md:p-10 rounded-xl'>
                            {
                                isCompleted
                                    ? (
                                        <div>
                                            <div className='flex gap-2' >
                                                <div className='p-2 h-fit mt-1 bg-green-100 rounded-lg'>
                                                    <FaCheck className='text-green-600 h-5 w-5' />
                                                </div>
                                                <div>
                                                    <p className='text-black text-xl md:text-3xl'>Configuraciones completadas</p>
                                                    <p className='text-gray-700 text-xs md:text-sm'>Espere la notificación de activación del motel a través del correo registrado. El tiempo estimado para activar su motel es de 24 horas, mientras nuestro equipo valida su información y trabaja para activarlo lo antes posible.</p>
                                                </div>
                                            </div>
                                        </div>

                                    ) : (
                                        <div>
                                            <div className='flex gap-2 ' >
                                                <div className='p-2 h-fit mt-1 bg-purple-100 rounded-lg'>
                                                    <MdOutlineAccessTimeFilled className='text-purple-600 h-5 w-5' />
                                                </div>
                                                <div>
                                                    <p className='text-black text-lg md:text-3xl'>Realize las configuraciones para activar su motel</p>
                                                    <p className='text-gray-700 text-xs md:text-sm'>Complete todos los pasos acontinuacion y espere la activacion de su motel </p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                            }

                            {
                                status === "DATA_CORRECTION" && (
                                    <div>
                                        <div className="relative m-2 my-8 w-full rounded-lg bg-gray-600 px-12 py-6 shadow-md">
                                            <button className="absolute top-0 right-0 p-4 text-gray-400">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="h-5 w-4">
                                                    <path d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                            <p className="relative mb-1 text-sm font-medium">
                                                <span className="absolute -left-7 flex h-5 w-5 items-center justify-center rounded-xl bg-yellow-400 text-white"> ! </span>
                                                <span className="text-gray-50">Hemos enviado un correo de notificación.</span>
                                            </p>
                                            <p className="text-sm text-gray-200">
                                                Hemos validado la información proporcionada y encontramos datos que necesitan ser corregidos.
                                                Por favor, revisa el correo enviado y realiza las correcciones necesarias para que tu cuenta pueda activarse y
                                                estar en operación en nuestra plataforma.
                                            </p>
                                        </div>
                                    </div>
                                )
                            }


                            <div className='gap-2 justify-center md:grid grid-cols md:grid-cols-2 px-2 md:px-10'>

                                <div className="flex flex-col max-w-sm mt-10 bg-gray-100 rounded-lg shadow">
                                    <div className='flex md:px-4 py-2 justify-between gap-2'>
                                        <div className='flex items-center gap-2' >

                                            <PiUserCirclePlusDuotone size={30} className='text-gray-500' />
                                            <Link href="/admin/dashboard-partner-motel/config-motel/motel-cover">
                                                <h5 className="text-md md:text-xl font-semibold tracking-tight text-gray-900 ">Portada y logo</h5>
                                            </Link>
                                        </div>
                                        {
                                            motelImage
                                                ? (
                                                    <div className='p-2 bg-purple-100 rounded-lg'>
                                                        <FaCheck className='text-purple-600 h-5 w-5' />
                                                    </div>
                                                ) : (
                                                    <div className='p-2 bg-purple-100 rounded-lg'>
                                                        <p className='font-bold px-2 text-purple-600 text-xl' >1</p>
                                                    </div>
                                                )

                                        }
                                    </div>
                                    <div className='px-2' >
                                        <div className='w-full h-px bg-gray-200 my-2' />
                                    </div>
                                    <div className='flex-grow p-4'>
                                        <p className="mb-3 font-normal text-xs md:text-sm text-gray-500 ">Fortalece tu marca y capta la atención de los clientes subiendo el logo y una imagen de portada de tu motel.</p>
                                    </div>

                                    <Link href="/admin/dashboard-partner-motel/config-motel/motel-cover" className="mt-auto">
                                        <button className='bg-purple-600 p-2 text-white w-full transition-all duration-150 rounded-b-lg hover:bg-purple-700'>
                                            {
                                                motelImage
                                                    ? "Modificar"
                                                    : " Llenar"
                                            }
                                        </button>
                                    </Link>

                                </div>

                                <div className="flex flex-col max-w-sm mt-10 bg-gray-100 rounded-lg shadow">
                                    <div className='flex px-4 py-2 justify-between gap-2'>
                                        <div className='flex items-center gap-2' >

                                            <TbSettingsCheck size={30} className='text-gray-500' />
                                            <Link href="/admin/dashboard-partner-motel/config-motel/motel-cover">
                                                <h5 className="text-md md:text-xl font-semibold tracking-tight text-gray-900 ">Ajustes adicionales</h5>
                                            </Link>
                                        </div>
                                        {
                                            configMotel
                                                ? (
                                                    <div className='p-2 bg-purple-100 rounded-lg'>
                                                        <FaCheck className='text-purple-600 h-5 w-5' />
                                                    </div>
                                                ) : (
                                                    <div className='p-2 bg-purple-100 rounded-lg'>
                                                        <p className='font-bold px-2 text-purple-600 text-xl' >2</p>
                                                    </div>
                                                )
                                        }
                                    </div>
                                    <div className='px-2' >
                                        <div className='w-full h-px bg-gray-200 my-2' />
                                    </div>
                                    <div className='flex-grow p-4'>
                                        <p className="mb-3 font-normal text-xs md:text-sm text-gray-500">Estos ajustes adicionales le permitirán establecer la configuración final para poder operar en Motelero Online.</p>
                                    </div>


                                    <Link href="/admin/dashboard-partner-motel/additional-settings" className="mt-auto">
                                        <button className='bg-purple-600 p-2 text-white w-full transition-all duration-150 rounded-b-lg hover:bg-purple-700'>
                                            {
                                                configMotel
                                                    ? "Modificar"
                                                    : " Llenar"
                                            }
                                        </button>
                                    </Link>

                                </div>

                                <div className="flex flex-col max-w-sm  mt-10 bg-gray-100 rounded-lg shadow ">
                                    <div className='flex justify-between items-center px-2 py-2 '>
                                        <div className='flex gap-2 items-center' >
                                            <RiBankCardFill size={30} className='text-gray-500' />
                                            <Link href="/admin/dashboard-partner-motel/config-motel/bank-account">
                                                <h5 className="text-md md:text-xl font-semibold tracking-tight text-gray-900 ">Cuenta bancaria</h5>
                                            </Link>
                                        </div>

                                        {
                                            bankAccount
                                                ? (
                                                    <div className='p-2 bg-purple-100 rounded-lg'>
                                                        <FaCheck className='text-purple-600 h-5 w-5' />
                                                    </div>
                                                ) : (
                                                    <div className='p-2 bg-purple-100 rounded-lg'>
                                                        <p className='font-bold px-2 text-purple-600 text-xl' >3</p>
                                                    </div>
                                                )

                                        }

                                    </div>
                                    <div className='px-2' >
                                        <div className='w-full h-px bg-gray-200 my-2' />
                                    </div>
                                    <div className='flex-grow p-4'>
                                        <p className="mb-3 font-normal text-xs md:text-sm text-gray-500 ">Asegura tus pagos registrando tus datos bancarios para recibir ingresos automáticamente por cada reserva</p>
                                    </div>
                                    <Link href="/admin/dashboard-partner-motel/config-motel/bank-account" className="mt-auto">
                                        <button className='bg-purple-600 p-2 text-white w-full transition-all duration-150 rounded-b-lg hover:bg-purple-700'>
                                            {
                                                bankAccount
                                                    ? "Modificar"
                                                    : " Llenar"
                                            }
                                        </button>
                                    </Link>
                                </div>

                                <div className="flex flex-col max-w-sm  mt-10 bg-gray-100 rounded-lg shadow ">
                                    <div className='flex justify-between items-center px-2 py-2 '>
                                        <div className='flex gap-2 items-center' >
                                            <IoBedOutline size={30} className='text-gray-500' />
                                            <Link href="/admin/dashboard-partner-motel/room">
                                                <h5 className="text-md md:text-xl font-semibold tracking-tight text-gray-900 ">Habitaciones</h5>
                                            </Link>
                                        </div>

                                        {
                                            totalRoom >= 10
                                                ? (
                                                    <div className='p-2 bg-purple-100 rounded-lg'>
                                                        <FaCheck className='text-purple-600 h-5 w-5' />
                                                    </div>
                                                ) : (
                                                    <div className='p-2 bg-purple-100 rounded-lg'>
                                                        <p className='font-bold px-2 text-purple-600 text-xl' >4</p>
                                                    </div>
                                                )

                                        }

                                    </div>

                                    <div className='px-2' >
                                        <div className='w-full h-px bg-gray-200 my-2' />
                                    </div>

                                    <div className='flex-grow p-4'>
                                        <p className="mb-3 font-normal text-xs md:text-sm text-gray-500">Activa tu perfil añadiendo al menos 10 habitaciones inicialmente. Es importante registrar todas las habitaciones disponibles después para maximizar tus oportunidades de reserva</p>
                                    </div>

                                    <Link href="/admin/dashboard-partner-motel/room" className="mt-auto">
                                        <button className='bg-purple-600 p-2 text-white w-full transition-all duration-150 rounded-b-lg hover:bg-purple-700'>
                                            {
                                                totalRoom >= 10
                                                    ? "Modificar"
                                                    : " Llenar"
                                            }
                                        </button>
                                    </Link>

                                </div>
                            </div>
                        </div >
                    )
            }
        </ >
    )
}

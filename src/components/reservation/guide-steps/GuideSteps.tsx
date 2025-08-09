import React from 'react'
import { BsSearchHeart, BsKey, BsDoorOpen, BsGear, BsXCircle, BsClockHistory } from 'react-icons/bs'

export const GuideSteps = () => {
    return (
        <>

            <div className='grid grid-cols md:grid-cols-2 md:gap-10 mb-10' >
                <div className="rounded-lg divide-y divide-dashed mt-4 h-full space-y-3">
                    {/* Paso 1: Encuentra tu código de acceso */}
                    <div className="px-1 py-3 rounded-lg">
                        <h2 className="font-bold mb-6 text-md md:text-lg">Guía de entrada</h2>
                        <div className="flex gap-4">
                            <BsSearchHeart className="h-4 md:h-5 w-4 md:w-5 mt-2 text-gray-700 flex-shrink-0" />
                            <div>
                                <p className="font-semibold text-sm md:text-md">Encuentra tu código de acceso</p>
                                <p className="mt-1 text-xs md:text-sm text-gray-900" style={{ textAlign: "justify" }}>
                                    En la página de detalles de tu reserva, encontrarás el código de acceso en el menú de gestión de la reserva. Este código es esencial para tu entrada al motel.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Paso 2: Presenta tu código en el acceso */}
                    <div className="px-1 py-3 rounded-lg">
                        <div className="flex gap-4">
                            <BsKey className="h-4 md:h-5 w-4 md:w-5 mt-2 text-gray-700 flex-shrink-0" />
                            <div>
                                <p className="font-semibold text-sm md:text-md">Presenta tu código en el acceso</p>
                                <p className="mt-1 text-xs md:text-sm text-gray-900" style={{ textAlign: "justify" }}>
                                    Al llegar al motel, presenta el código de acceso en la entrada para verificar tu reserva. Este paso es obligatorio para iniciar tu servicio.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Paso 3: Accede a tu habitación */}
                    <div className="px-1 py-3 rounded-lg">
                        <div className="flex gap-4">
                            <BsDoorOpen className="h-4 md:h-5 w-4 md:w-5 mt-2 text-gray-700 flex-shrink-0" />
                            <div>
                                <p className="font-semibold text-sm md:text-md">Accede a tu habitación</p>
                                <p className="mt-1 text-xs md:text-sm text-gray-900" style={{ textAlign: "justify" }}>
                                    Una vez que se verifique tu entrada, podrás dirigirte a tu habitación. Usa las instrucciones proporcionadas en la página de detalles de la reserva.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Paso 4: Gestiona tu reserva desde tu dispositivo */}
                    <div className="px-1 py-3 rounded-lg">
                        <div className="flex gap-4">
                            <BsGear className="h-4 md:h-5 w-4 md:w-5 mt-2 text-gray-700 flex-shrink-0" />
                            <div>
                                <p className="font-semibold text-sm md:text-md">Gestiona tu reserva desde tu dispositivo</p>
                                <p className="mt-1 text-xs md:text-sm text-gray-900" style={{ textAlign: "justify" }}>
                                    Desde tu dispositivo, podrás añadir más tiempo a tu estancia o finalizar el servicio cuando lo desees. Todo esto está disponible en el menú de gestión de la reserva.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="rounded-lg divide-y divide-dashed mt-4 h-full space-y-3">
                    {/* Paso 1: Ver el código de acceso */}
                    <div className="px-1 py-3 rounded-lg">
                        <h2 className="font-bold mb-6 text-md md:text-lg">Gestión de la reserva</h2>
                        <div className="flex gap-4">
                            <BsKey className="h-4 md:h-5 w-4 md:w-5 mt-2 text-gray-700 flex-shrink-0" />
                            <div>
                                <p className="font-semibold text-sm md:text-md">Ver el código de acceso</p>
                                <p className="mt-1 text-xs md:text-sm text-gray-900" style={{ textAlign: "justify" }}>
                                    Desde el menú lateral a la izquierda de la pantalla, puedes acceder al código de acceso que te permitirá ingresar al motel. Es importante que este código no sea compartido con nadie para garantizar la seguridad de tu reserva.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Paso 2: Cancelar la reserva */}
                    <div className="px-1 py-3 rounded-lg">
                        <div className="flex gap-4">
                            <BsXCircle className="h-4 md:h-5 w-4 md:w-5 mt-2 text-gray-700 flex-shrink-0" />
                            <div>
                                <p className="font-semibold text-sm md:text-md">Cancelar la reserva</p>
                                <p className="mt-1 text-xs md:text-sm text-gray-900" style={{ textAlign: "justify" }}>
                                    Puedes cancelar tu reserva desde el menú lateral antes de que inicie el servicio. Ten en cuenta que esta opción no estará disponible una vez que el servicio haya comenzado.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Paso 3: Extender el tiempo del servicio */}
                    <div className="px-1 py-3 rounded-lg">
                        <div className="flex gap-4">
                            <BsClockHistory className="h-4 md:h-5 w-4 md:w-5 mt-2 text-gray-700 flex-shrink-0" />
                            <div>
                                <p className="font-semibold text-sm md:text-md">Extender el tiempo del servicio</p>
                                <p className="mt-1 text-xs md:text-sm text-gray-900" style={{ textAlign: "justify" }}>
                                    Si deseas agregar más tiempo a tu servicio, esta opción estará disponible en el menú lateral una vez que el servicio haya iniciado. Podrás extender tu estancia de manera sencilla desde tu dispositivo.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Paso 4: Confirmar la salida */}
                    <div className="px-1 py-3 rounded-lg">
                        <div className="flex gap-4">
                            <BsDoorOpen className="h-4 md:h-5 w-4 md:w-5 mt-2 text-gray-700 flex-shrink-0" />
                            <div>
                                <p className="font-semibold text-sm md:text-md">Confirmar la salida</p>
                                <p className="mt-1 text-xs md:text-sm text-gray-900" style={{ textAlign: "justify" }}>
                                    Cuando finalices tu estancia, podrás confirmar la salida desde el menú lateral. Esta acción notificará al motel que has dejado la habitación. Esta opción estará disponible solo después de que el servicio haya iniciado.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

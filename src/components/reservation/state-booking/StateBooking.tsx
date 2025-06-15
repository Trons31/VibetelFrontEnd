import { Reservation } from '@/interfaces/reservation.interface'
import { IoIosArrowForward } from 'react-icons/io'
import { IoCheckmark } from 'react-icons/io5'

interface StateBookingProps {
  reservation: Reservation;
}

export const StateBooking = ({ reservation }: StateBookingProps) => {

  return (
    <div className="hidden md:flex flex-col w-full items-center mt-6 md:mt-12 border-b bg-white py-4 rounded-lg sm:flex-row px-4 ">
      <p className="text-2xl font-bold text-gray-800">Estado actual</p>
      <div className="py-2 mt-4 md:mt-0 text-xs sm:ml-auto sm:text-base">
        <div className="flex md:relative">
          <ul className="relative flex w-full flex-col justify-between gap-4 sm:flex-row sm:items-center">

            <li className="flex items-center space-x-3 text-left sm:space-x-4">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white"
              >
                <IoCheckmark className="h-4 w-4" />
              </div>
              <span className="font-semibold text-xs text-gray-900">Habitación reservada</span>
            </li>

            <IoIosArrowForward className="h-4 w-4  text-gray-400" />

            {
              reservation.ServiceItem?.canceledReservation === false && reservation.ServiceItem?.serviceTaken === false
              && (
                <li className="flex items-center space-x-4  text-left ">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2" >2</div>
                  <span className="font-semibold text-xs  text-gray-900">En espera</span>
                </li>
              )
            }


            {
              reservation.ServiceItem?.canceledReservation
              &&
              (
                <li className="flex items-center space-x-3 text-left sm:space-x-4">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-xs font-semibold text-white"
                  >
                    <IoCheckmark className="h-4 w-4" />
                  </div>
                  <span className="font-semibold text-xs text-gray-900">Servicio cancelado</span>

                </li>
              )
            }

            {
              reservation.ServiceItem?.serviceTaken
              && (
                < li className="flex items-center space-x-3 text-left sm:space-x-4">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white"
                  >
                    <IoCheckmark className="h-4 w-4" />
                  </div>
                  <span className="font-semibold text-xs text-gray-900">En espera</span>

                </li>
              )
            }

            {
              reservation.ServiceItem?.canceledReservation === false && reservation.ServiceItem.serviceCompleted === false &&
              (
                <IoIosArrowForward className="h-4 w-4  text-gray-400" />

              )
            }

            {
              reservation.ServiceItem?.status === "no_iniciado"
              &&
              (
                <li className="flex items-center space-x-3 text-left sm:space-x-4">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-black text-xs font-semibold text-white"
                  >
                    <IoCheckmark className="h-4 w-4" />
                  </div>
                  <span className="font-semibold text-xs text-gray-900">servicio cancelado automáticamente</span>

                </li>
              )
            }

            {
              reservation.ServiceItem?.canceledReservation === false
              && (
                reservation.ServiceItem?.serviceTaken === false && reservation.ServiceItem.serviceCompleted === false && reservation.ServiceItem?.status !== "no_iniciado" &&
                (
                  <li className=" hidden md:flex items-center  mt-2 md:mt-0  space-x-3  sm:space-x-4">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white" >3</div>
                    <span className="font-semibold text-xs text-gray-500">Servicio iniciado</span>
                  </li>
                )
              )
            }

            {
              reservation.ServiceItem?.serviceTaken && reservation.ServiceItem.serviceCompleted == false
              && reservation.ServiceItem?.status !== "no_iniciado" && (
                <li className="flex items-center space-x-4  text-left ">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-1" >3</div>
                  <span className="font-semibold text-xs  text-gray-900">Servicio iniciado</span>
                </li>
              )
            }

            {
              reservation.ServiceItem?.canceledReservation === false && reservation.ServiceItem?.status !== "no_iniciado" &&
              (
                <IoIosArrowForward className="h-4 w-4  text-gray-400" />
              )}

            {
              reservation.ServiceItem?.serviceTaken === true && reservation.ServiceItem.serviceCompleted === false && reservation.ServiceItem?.status !== "no_iniciado"
              &&
              (
                <li className=" hidden md:flex items-center  mt-2 md:mt-0  space-x-3  sm:space-x-4">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white" >4</div>
                  <span className="font-semibold text-xs text-gray-500">Servicio finalizado</span>
                </li>
              )
            }

            {
              reservation.ServiceItem?.canceledReservation === false
              && (
                reservation.ServiceItem?.serviceTaken === false && reservation.ServiceItem.serviceCompleted === false && reservation.ServiceItem?.status !== "no_iniciado"
                &&
                (
                  <li className=" hidden md:flex items-center  mt-2 md:mt-0  space-x-3  sm:space-x-4">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white" >4</div>
                    <span className="font-semibold text-xs text-gray-500">Servicio finalizado</span>
                  </li>
                )
              )
            }

            {
              reservation.ServiceItem?.serviceTaken && reservation.ServiceItem.serviceCompleted &&
              (
                <>
                  <li className="flex items-center space-x-3 text-left sm:space-x-4">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white"
                    >
                      <IoCheckmark className="h-4 w-4" />
                    </div>
                    <span className="font-semibold text-xs text-gray-900">Servicio iniciado</span>

                  </li>
                  <IoIosArrowForward className="h-4 w-4  text-gray-400" />
                  <li className="flex items-center space-x-3 text-left sm:space-x-4">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-xs font-semibold text-white"
                    >
                      <IoCheckmark className="h-4 w-4" />
                    </div>
                    <span className="font-semibold text-xs text-gray-900">Servicio finalizado</span>

                  </li>
                </>
              )
            }
          </ul>
        </div >
      </div >
    </div >

  )
}


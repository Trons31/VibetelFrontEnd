import { auth } from "@/auth.config";
import Link from "next/link";
import { FaRegQuestionCircle, FaRegUser } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import {
  MdOutlineCancel,
  MdOutlineExitToApp,
  MdOutlineLockPerson,
  MdOutlinePayment,
  MdOutlineSecurity,
  MdOutlineTimer,
  MdPayment,
} from "react-icons/md";
import { RiRefund2Fill } from "react-icons/ri";

export default async function HelpPage() {

   const session = await auth();

  return (
    <div className="mb-20">
      {/* <div className="px-4 mt-28 md:px-36 2xl:px-64">
        <p className="text-xl font-medium">¿Con qué podemos ayudarte?</p>
        <div className="mt-5">
          <div className="mx-auto mt-8 flex w-full flex-col border-gray-600 bg-white sm:flex-row sm:rounded-lg sm:border">
            <input
              className="m-2 h-12 rounded-lg px-4 text-sm md:text-lg text-gray-500 ring ring-red-400 sm:w-full sm:ring-0 focus:outline-none focus:ring"
              placeholder="Buscar en ayuda"
              type="text"
              name="reservationCode"
            />
            <button className="hidden md:flex items-center justify-center shrink-0 m-2 rounded-lg bg-red-600 px-8 py-3 font-medium text-white  hover:bg-red-700">
              Buscar
            </button>
          </div>
        </div>
      </div> */}
      <div className="mt-36 px-4 md:px-36 2xl:px-64">
        <p className="text-xl font-medium">Reservas</p>
        <ul className="mt-8 md:mt-4 p-0 md:p-4 space-y-10">
          <li className="group cursor-pointer ">
            <div className="flex justify-between gap-2 md:gap-10 items-center">
              <Link
                href="/help/reservation/manage-reservations"
                className="flex gap-4">
                <MdOutlineSecurity className="w-4 h-4 md:w-6 md:h-6 text-red-600 flex-shrink-0" />
                <div>
                  <p className="text-md group-hover:text-red-600 font-semibold">
                    Administrar y ver reservas
                  </p>
                  <p className="font-light text-gray-500 text-xs">
                    Pagar, ver codigo de acceso, cancelar reserva, adicionar
                    tiempo a la reserva
                  </p>
                </div>
              </Link>
              <IoIosArrowForward className="group-hover:text-red-600 w-3 h-3 md:h-5 md:w-5 text-gray-600 flex-shrink-0" />
            </div>
          </li>
          <li className="group cursor-pointer">
            <div className="flex justify-between gap-2 md:gap-10 items-center">
              <Link
                href="/help/reservation/anonymous-reservation"
                className="flex gap-4">
                <MdOutlineLockPerson className="w-4 h-4 md:w-6 md:h-6 text-red-600 flex-shrink-0" />
                <div>
                  <p className="text-md group-hover:text-red-600 font-semibold">
                    Reservas Anónimas
                  </p>
                  <p className="font-light text-gray-500 text-xs">
                    Cómo reservar anónimamente, protección de información, pago
                    seguro, acceso a la reserva anónima
                  </p>
                </div>
              </Link>
              <IoIosArrowForward className="group-hover:text-red-600 w-3 h-3 md:h-5 md:w-5 text-gray-600 flex-shrink-0" />
            </div>
          </li>
          <li className="group cursor-pointer">
            <div className="flex justify-between gap-2 md:gap-10 items-center">
              <Link
                href="/help/reservation/auto-cancellation"
                className="flex gap-4">
                <MdOutlineCancel className="w-4 h-4 md:w-6 md:h-6 text-red-600 flex-shrink-0" />
                <div>
                  <p className="text-md group-hover:text-red-600 font-semibold">
                    Cancelación Automática
                  </p>
                  <p className="font-light text-gray-500 text-xs">
                    Si los usuarios no se presentan en el tiempo establecido, la
                    reserva se cancelará automáticamente tras el tiempo máximo
                    de espera del motel.
                  </p>
                </div>
              </Link>
              <IoIosArrowForward className="group-hover:text-red-600 w-3 h-3 md:h-5 md:w-5 text-gray-600 flex-shrink-0" />
            </div>
          </li>
          <li className="group cursor-pointer">
            <div className="flex justify-between items-center">
              <Link
                href="/help/reservation/add-time"
                className="flex gap-4">
                <MdOutlineTimer className="w-4 h-4 md:w-6 md:h-6 text-red-600 flex-shrink-0" />
                <div>
                  <p className="text-md group-hover:text-red-600 font-semibold">
                    Adición de Tiempo
                  </p>
                  <p className="font-light text-gray-500 text-xs">
                    La opción para añadir tiempo estará disponible únicamente
                    cuando la reserva haya iniciado.
                  </p>
                </div>
              </Link>
              <IoIosArrowForward className="group-hover:text-red-600 w-3 h-3 md:h-5 md:w-5 text-gray-600 flex-shrink-0" />
            </div>
          </li>
          <li className="group cursor-pointer">
            <div className="flex justify-between items-center">
              <Link
                href="/help/reservation/late-checkout"
                className="flex gap-4">
                <MdOutlineExitToApp className="w-4 h-4 md:w-6 md:h-6 text-red-600 flex-shrink-0" />
                <div>
                  <p className="text-md group-hover:text-red-600 font-semibold">
                    Salida Fuera de Tiempo
                  </p>
                  <p className="font-light text-gray-500 text-xs">
                    Si la salida de la habitación no se realiza en el tiempo
                    establecido, se generará un costo extra por exceder el
                    límite.
                  </p>
                </div>
              </Link>
              <IoIosArrowForward className="group-hover:text-red-600 w-3 h-3 md:h-5 md:w-5 text-gray-600 flex-shrink-0" />
            </div>
          </li>
          <li className="group cursor-pointer ">
            <div className="flex justify-between gap-2 md:gap-10 items-center">
              <Link
                href="/help/reservation/reservation-faq"
                className="flex gap-4">
                <FaRegQuestionCircle className="w-4 h-4 md:w-6 md:h-6 text-red-600 flex-shrink-0" />
                <div>
                  <p className="text-md group-hover:text-red-600 font-semibold">
                    Preguntas frecuentes sobre reservas
                  </p>
                </div>
              </Link>
              <IoIosArrowForward className="group-hover:text-red-600 w-3 h-3 md:h-5 md:w-5 text-gray-600 flex-shrink-0" />
            </div>
          </li>
        </ul>
      </div>
      <div className="mt-16 px-4 md:px-36 2xl:px-64">
        <p className="text-xl font-medium">Pagos</p>
        <ul className="mt-8 md:mt-4  p-0 md:p-4 space-y-10">
          <li className="group cursor-pointer">
            <div className="flex justify-between gap-2 md:gap-10 items-center">
              <Link
                href="/help/payments/payment-methods"
                className="flex gap-4">
                <MdOutlinePayment className="w-4 h-4 md:w-6 md:h-6 text-red-600 flex-shrink-0" />
                <div>
                  <p className="text-md group-hover:text-red-600 font-semibold">
                    Métodos de Pago
                  </p>
                  <p className="font-light text-gray-500 text-xs">
                    Nequi, Bancolombia, PSE, Tarjeta de Crédito
                  </p>
                </div>
              </Link>
              <IoIosArrowForward className="group-hover:text-red-600 w-3 h-3 md:h-5 md:w-5 text-gray-600 flex-shrink-0" />
            </div>
          </li>
          <li className="group cursor-pointer">
            <div className="flex justify-between gap-2 md:gap-10 items-center">
              <Link
                href="/help/payments/secure-payments"
                className="flex gap-4">
                <MdPayment className="w-4 h-4 md:w-6 md:h-6 text-red-600 flex-shrink-0" />
                <div>
                  <p className="text-md group-hover:text-red-600 font-semibold">
                    Pagos Seguros
                  </p>
                  <p className="font-light text-gray-500 text-xs">
                    Los pagos se realizan mediante una pasarela de pagos
                    respaldada por Davivienda: epayco, garantizando la seguridad
                    de tus transacciones.
                  </p>
                </div>
              </Link>
              <IoIosArrowForward className="group-hover:text-red-600 w-3 h-3 md:h-5 md:w-5 text-gray-600 flex-shrink-0" />
            </div>
          </li>
          <li className="group cursor-pointer">
            <div className="flex justify-between gap-2 md:gap-10 items-center">
              <Link
                href="/help/payments/refunds"
                className="flex gap-4">
                <RiRefund2Fill className="w-4 h-4 md:w-6 md:h-6 text-red-600 flex-shrink-0" />
                <div>
                  <p className="text-md group-hover:text-red-600 font-semibold">
                    Reembolsos
                  </p>
                  <p className="font-light text-gray-500 text-xs">
                    Información sobre reembolsos: ¿Existen reembolsos?, ¿Se
                    reembolsa todo el dinero?, ¿Hay una fecha límite para
                    solicitar un reembolso?
                  </p>
                </div>
              </Link>
              <IoIosArrowForward className="group-hover:text-red-600 w-3 h-3 md:h-5 md:w-5 text-gray-600 flex-shrink-0" />
            </div>
          </li>

          <li className="group cursor-pointer ">
            <div className="flex justify-between gap-2 md:gap-10 items-center">
              <Link
                href="/help/payments/payment-faq"
                className="flex gap-4">
                <FaRegQuestionCircle className="w-4 h-4 md:w-6 md:h-6 text-red-600 flex-shrink-0" />
                <div>
                  <p className="text-md group-hover:text-red-600 font-semibold">
                    Preguntas frecuentes sobre pagos
                  </p>
                </div>
              </Link>
              <IoIosArrowForward className="group-hover:text-red-600 w-3 h-3 md:h-5 md:w-5 text-gray-600 flex-shrink-0" />
            </div>
          </li>
        </ul>
      </div>
      <div className="mt-16 px-4 md:px-36 2xl:px-64">
        <p className="text-xl font-medium">Ayuda sobre tu cuenta</p>
        <ul className="mt-8 md:mt-4  p-0 md:p-4 space-y-10">
          <li className="group cursor-pointer">
            <div className="flex justify-between gap-2 md:gap-10 items-center">
              <Link
               href={session?.user ? "/profile" : "/auth/login"}
               className="flex gap-4">
                <FaRegUser className="w-4 h-4 md:w-6 md:h-6 text-red-600 flex-shrink-0" />
                <div>
                  <p className="text-md group-hover:text-red-600 font-semibold">
                    Configuración de mi cuenta
                  </p>
                </div>
              </Link>
              <IoIosArrowForward className="group-hover:text-red-600 w-3 h-3 md:h-5 md:w-5 text-gray-600 flex-shrink-0" />
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

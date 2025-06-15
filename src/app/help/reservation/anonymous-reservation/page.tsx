import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";

export default function AnonymousReservationPage() {
    return (
        <div className="mt-32 mb-20 px-4 md:px-36 2xl:px-64">
            {/* Breadcrumb */}
            <div className="text-gray-500 flex items-center gap-2 mb-4">
                <Link href="/help" className="hover:underline text-xs md:text-md text-gray-600">
                    Inicio
                </Link>
                <IoIosArrowForward className="h-4 w-4" />
                <span className="text-xs md:text-md text-gray-500">Reservas anónimas</span>
            </div>

            <h1 className="text-md md:text-3xl font-semibold text-gray-800">
                ¿Cómo funcionan las reservas anónimas?
            </h1>
            <div className="mb-5 text-start">
                <p className="text-xs md:text-lg text-black">
                    Si tienes preguntas sobre las reservas anonimas, estamos aquí para ayudarte, no dudes en contactar a nuestro equipo de soporte desde el chat o al correo <strong>soporte@vibetel.com</strong>.
                </p>
            </div>

            {/* ¿Qué es una reserva anónima? */}
            <div className="bg-white border border-gray-200 rounded-3xl px-4 py-6 md:p-8 space-y-4 mb-5">
                <h2 className="text-md md:text-xl font-semibold text-gray-800">
                    ¿Qué es una reserva anónima?
                </h2>
                <p className="text-sm md:text-lg text-gray-700">
                    Las reservas anónimas permiten realizar una reserva sin necesidad de iniciar sesión en la plataforma. Esta opción está pensada para quienes desean mantener su privacidad al máximo.
                </p>
            </div>

            {/* ¿Dónde se activa la reserva anónima? */}
            <div className="bg-white border border-gray-200 rounded-3xl px-4 py-6 md:p-8 space-y-4 mb-5">
                <h2 className="text-md md:text-xl font-semibold text-gray-800">
                    ¿Cómo realizar una reserva anónima?
                </h2>
                <p className="text-sm md:text-lg text-gray-700">
                    Durante el proceso de reserva, cuando estés por confirmar los datos y proceder al pago, aparecerá una opción para <strong>reservar de forma anónima</strong>.
                </p>
                <p className="text-sm md:text-lg text-gray-700">
                    Esta opción solo está disponible si no has iniciado sesión. Al activarla, tu reserva no se asociará a una cuenta y se enviará un código de acceso para gestionarla posteriormente.
                </p>
            </div>

            {/* Confirmación y recepción del código */}
            <div className="bg-white border border-gray-200 rounded-3xl px-4 py-6 md:p-8 space-y-4 mb-5">
                <h2 className="text-md md:text-xl font-semibold text-gray-800">
                    ¿Cómo recibo mi código de acceso?
                </h2>
                <p className="text-sm md:text-lg text-gray-700">
                    Una vez realizado el pago, recibirás un mensaje con tu <strong>código de acceso</strong> a la reserva. Puedes elegir si deseas recibirlo por <strong>correo electrónico</strong> o por <strong>SMS</strong>.
                </p>
                <p className="text-sm md:text-lg text-gray-700">
                    Este código es único y te permitirá ingresar a los detalles de tu reserva anónima.
                </p>
            </div>

            {/* Gestión de la reserva anónima */}
            <div className="bg-white border border-gray-200 rounded-3xl px-4 py-6 md:p-8 space-y-4 mb-5">
                <h2 className="text-md md:text-xl font-semibold text-gray-800">
                    ¿Dónde gestiono mi reserva anónima?
                </h2>
                <p className="text-sm md:text-lg text-gray-700">
                    En el menú principal de la plataforma encontrarás la sección <strong>Reservas anónimas</strong>. Allí podrás ingresar el código de acceso que recibiste.
                </p>
                <p className="text-sm md:text-lg text-gray-700">
                    Una vez ingreses, podrás:
                </p>
                <ul className="list-disc list-inside text-sm md:text-lg text-gray-700 space-y-1">
                    <li>Ver los detalles de tu reserva</li>
                    <li>Adicionar tiempo a tu reserva</li>
                    <li>Cancelar la reserva si lo necesitas</li>
                    <li>Ver el código de acceso al motel</li>
                </ul>
            </div>

            {/* Importancia del código */}
            <div className="bg-white border border-gray-200 rounded-3xl px-4 py-6 md:p-8 space-y-4">
                <h2 className="text-md md:text-xl font-semibold text-gray-800">
                    ¿Qué pasa si pierdo mi código de acceso?
                </h2>
                <p className="text-sm md:text-lg text-gray-700">
                    El código de acceso es la única forma de identificar tu reserva anónima. Si lo pierdes, no será posible recuperar los detalles de tu reserva, ya que no está vinculada a una cuenta.
                </p>
                <p className="text-sm md:text-lg text-gray-700">
                    Te recomendamos guardarlo en un lugar seguro o marcar el correo o SMS que lo contiene.
                </p>
            </div>
        </div>
    );
}

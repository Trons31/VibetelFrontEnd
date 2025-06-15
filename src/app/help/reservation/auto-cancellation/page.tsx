import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";

export default function AutoCancellationPage() {
    return (
        <div className="mt-32 mb-20 px-4 md:px-36 2xl:px-64">
            {/* Breadcrumb */}
            <div className="text-gray-500 flex items-center gap-2 mb-4">
                <Link href="/help" className="hover:underline text-xs md:text-md text-gray-600">
                    Inicio
                </Link>
                <IoIosArrowForward className="h-4 w-4" />
                <span className="text-xs md:text-md text-gray-500">Cancelación automática</span>
            </div>

            <h1 className="text-md md:text-3xl font-semibold text-gray-800">Cancelación automática de reservas</h1>
            <div className="mb-6 text-start">
                <p className="text-xs md:text-lg text-black">
                    Si tienes preguntas sobre la cancelacion automaticas de las reservas, estamos aquí para ayudarte, no dudes en contactar a nuestro equipo de soporte desde el chat o al correo <strong>soporte@vibetel.com</strong>.
                </p>
            </div>
            {/* ¿Qué es la cancelación automática? */}
            <div className="bg-white border border-gray-200 rounded-3xl px-4 py-6 md:p-8 space-y-4 mb-5">
                <h2 className="text-md md:text-xl font-semibold text-gray-800">¿Qué significa la cancelación automática?</h2>
                <p className="text-sm md:text-lg text-gray-700">
                    Una reserva se cancela automáticamente cuando el usuario no llega al motel dentro del tiempo de espera establecido después de la hora de inicio de su reserva.
                </p>
                <p className="text-sm md:text-lg text-gray-700">
                    Esta política permite que los moteles puedan liberar habitaciones en caso de inasistencia y optimizar su disponibilidad.
                </p>
            </div>

            {/* ¿Cómo funciona el tiempo de espera? */}
            <div className="bg-white border border-gray-200 rounded-3xl px-4 py-6 md:p-8 space-y-4 mb-5">
                <h2 className="text-md md:text-xl font-semibold text-gray-800">¿Cómo funciona el tiempo de espera?</h2>
                <p className="text-sm md:text-lg text-gray-700">
                    El tiempo de espera es definido por cada motel. Es el periodo de gracia que se cuenta a partir de la hora programada para el inicio de la reserva.
                </p>
                <p className="text-sm md:text-lg text-gray-700">
                    Por ejemplo, si reservaste para las <strong>3:00 p.m.</strong> y el motel ha definido un tiempo de espera de <strong>20 minutos</strong>, tendrás hasta las <strong>3:20 p.m.</strong> para llegar e ingresar al establecimiento.
                </p>
                <p className="text-sm md:text-lg text-gray-700">
                    Esta información se muestra claramente durante el proceso de reserva. Te recomendamos siempre verificar cuánto tiempo tienes disponible para presentarte.
                </p>
            </div>

            {/* ¿Qué pasa si no llegas a tiempo? */}
            <div className="bg-white border border-gray-200 rounded-3xl px-4 py-6 md:p-8 space-y-4 mb-5">
                <h2 className="text-md md:text-xl font-semibold text-gray-800">¿Qué pasa si no llego dentro del tiempo de espera?</h2>
                <p className="text-sm md:text-lg text-gray-700">
                    Si no registras tu ingreso al motel dentro del tiempo de espera máximo, la reserva se cancelará automáticamente.
                </p>
                <p className="text-sm md:text-lg text-gray-700">
                    Esta acción no es reversible y puede implicar la pérdida de la reserva y del monto pagado, según la política de reembolsos vigente.
                </p>
                <p className="text-sm md:text-lg text-gray-700">
                    Para evitarlo, asegúrate de llegar a tiempo o gestionar cualquier cambio previamente desde tu cuenta o mediante el chat de soporte.
                </p>
            </div>

            {/* Recomendaciones finales */}
            <div className="bg-white border border-gray-200 rounded-3xl px-4 py-6 md:p-8 space-y-4">
                <h2 className="text-md md:text-xl font-semibold text-gray-800">Recomendaciones importantes</h2>
                <ul className="list-disc list-inside text-sm md:text-lg text-gray-700 space-y-2">
                    <li>Revisa cuidadosamente el tiempo de espera cuando confirmes tu reserva.</li>
                    <li>Llega al motel dentro del tiempo límite para evitar cancelaciones automáticas.</li>
                    <li>Si crees que te retrasarás, contáctanos antes de que finalice tu tiempo de espera.</li>
                </ul>
                <p className="text-sm md:text-lg text-gray-700">
                    Esta política existe para garantizar una experiencia organizada, privada y sin demoras para todos nuestros usuarios.
                </p>
            </div>
        </div>
    );
}

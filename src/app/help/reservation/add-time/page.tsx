import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";

export default function AddTimePage() {
    return (
        <div className="mt-32 mb-20 px-4 md:px-36 2xl:px-64">
            {/* Breadcrumb */}
            <div className="text-gray-500 flex items-center gap-2 mb-4">
                <Link href="/help" className="hover:underline text-xs md:text-md text-gray-600">
                    Inicio
                </Link>
                <IoIosArrowForward className="h-4 w-4" />
                <span className="text-xs md:text-md text-gray-500">Adición de tiempo</span>
            </div>

            <h1 className="text-md md:text-3xl font-semibold text-gray-800">Adición de tiempo a una reserva</h1>
            <div className="mb-5 text-start">
                <p className="text-xs md:text-lg text-black">
                    Si tienes preguntas sobre la adicion de tiempo a tu reserva, estamos aquí para ayudarte, no dudes en contactar a nuestro equipo de soporte desde el chat o al correo <strong>soporte@vibetel.com</strong>.
                </p>
            </div>
            {/* ¿Qué es la adición de tiempo? */}
            <div className="bg-white border border-gray-200 rounded-3xl px-4 py-6 md:p-8 space-y-4 mb-5">
                <h2 className="text-md md:text-xl font-semibold text-gray-800">¿Qué es la adición de tiempo?</h2>
                <p className="text-sm md:text-lg text-gray-700">
                    La adición de tiempo permite extender la duración de tu reserva para continuar disfrutando de la habitación sin interrupciones, siempre que exista disponibilidad.
                </p>
                <p className="text-sm md:text-lg text-gray-700">
                    Esta funcionalidad está diseñada para que puedas adaptar tu estadía de forma flexible, sin necesidad de realizar una nueva reserva.
                </p>
            </div>

            {/* ¿Cuándo está disponible? */}
            <div className="bg-white border border-gray-200 rounded-3xl px-4 py-6 md:p-8 space-y-4 mb-5">
                <h2 className="text-md md:text-xl font-semibold text-gray-800">¿Cuándo puedo adicionar tiempo?</h2>
                <ul className="list-disc list-inside text-sm md:text-lg text-gray-700 space-y-2">
                    <li>Solo puedes adicionar tiempo si la reserva <strong>ya ha iniciado</strong>.</li>
                    <li>No puedes adicionar tiempo antes del inicio de la reserva.</li>
                    <li>La opción de adición estará disponible <strong>desde que la reserva inicia</strong> hasta <strong>5 minutos antes</strong> de que finalice.</li>
                </ul>
                <p className="text-sm md:text-lg text-gray-700">
                    El sistema habilita automáticamente esta opción dentro del menú de gestión de la reserva durante el periodo válido.
                </p>
            </div>

            {/* ¿Cuál es el costo? */}
            <div className="bg-white border border-gray-200 rounded-3xl px-4 py-6 md:p-8 space-y-4 mb-5">
                <h2 className="text-md md:text-xl font-semibold text-gray-800">¿Cuál es el costo por adicionar tiempo?</h2>
                <p className="text-sm md:text-lg text-gray-700">
                    El precio por adicionar tiempo lo define cada motel y puede variar dependiendo del tipo de habitación o del tiempo que desees agregar.
                </p>
                <p className="text-sm md:text-lg text-gray-700">
                    Al solicitar la adición, verás el valor correspondiente antes de proceder con el pago.
                </p>
            </div>

            {/* ¿Cómo se confirma la adición? */}
            <div className="bg-white border border-gray-200 rounded-3xl px-4 py-6 md:p-8 space-y-4 mb-5">
                <h2 className="text-md md:text-xl font-semibold text-gray-800">¿Cómo se confirma la adición de tiempo?</h2>
                <ul className="list-disc list-inside text-sm md:text-lg text-gray-700 space-y-2">
                    <li>Debes completar el proceso de pago desde la sección de gestión de la reserva.</li>
                    <li>La adición solo será efectiva <strong>una vez el pago sea confirmado</strong>.</li>
                    <li>Si abandonas el proceso de pago, la adición no se procesará.</li>
                </ul>
                <p className="text-sm md:text-lg text-gray-700">
                    Por esta razón, te recomendamos asegurarte de completar correctamente el pago sin cerrar la página.
                </p>
            </div>

            {/* ¿Puede ser rechazada la solicitud? */}
            <div className="bg-white border border-gray-200 rounded-3xl px-4 py-6 md:p-8 space-y-4">
                <h2 className="text-md md:text-xl font-semibold text-gray-800">¿Puede rechazarse mi solicitud?</h2>
                <p className="text-sm md:text-lg text-gray-700">
                    Sí. El sistema puede rechazar la solicitud si:
                </p>
                <ul className="list-disc list-inside text-sm md:text-lg text-gray-700 space-y-2">
                    <li>No hay disponibilidad para esa habitación en el horario deseado.</li>
                    <li>La reserva ya ha finalizado.</li>
                    <li>No completaste correctamente el proceso de pago.</li>
                </ul>
                <p className="text-sm md:text-lg text-gray-700">
                    En cualquiera de estos casos, se te notificará inmediatamente en pantalla.
                </p>
            </div>
        </div>
    );
}

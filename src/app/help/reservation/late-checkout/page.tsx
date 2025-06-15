import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";

export default function LateCheckoutPage() {
    return (
        <div className="mt-32 mb-20 px-4 md:px-36 2xl:px-64">
            {/* Breadcrumb */}
            <div className="text-gray-500 flex items-center gap-2 mb-4">
                <Link href="/help" className="hover:underline text-xs md:text-md text-gray-600">
                    Inicio
                </Link>
                <IoIosArrowForward className="h-4 w-4" />
                <span className="text-xs md:text-md text-gray-500">Salida fuera de tiempo</span>
            </div>

            <h1 className="text-md md:text-3xl font-semibold text-gray-800">Salida fuera de tiempo</h1>
            <div className="mb-5 text-start">
                <p className="text-xs md:text-lg text-black">
                    Si tienes preguntas sobre la salida tardia de la habitacion reservada, estamos aquí para ayudarte, no dudes en contactar a nuestro equipo de soporte desde el chat o al correo <strong>soporte@vibetel.com</strong>.
                </p>
            </div>
            {/* ¿Qué significa una salida fuera de tiempo? */}
            <div className="bg-white border border-gray-200 rounded-3xl px-4 py-6 md:p-8 space-y-4 mb-5">
                <h2 className="text-md md:text-xl font-semibold text-gray-800">¿Qué significa una salida fuera de tiempo?</h2>
                <p className="text-sm md:text-lg text-gray-700">
                    Una salida fuera de tiempo ocurre cuando el usuario permanece en la habitación después del horario final de su reserva sin haber adicionado tiempo previamente.
                </p>
                <p className="text-sm md:text-lg text-gray-700">
                    Cada reserva tiene un tiempo de inicio y de finalización, y es responsabilidad del usuario respetar estos límites para evitar inconvenientes o recargos.
                </p>
            </div>

            {/* ¿El sistema avisa antes de que finalice la reserva? */}
            <div className="bg-white border border-gray-200 rounded-3xl px-4 py-6 md:p-8 space-y-4 mb-5">
                <h2 className="text-md md:text-xl font-semibold text-gray-800">¿El sistema avisa antes de que finalice la reserva?</h2>
                <p className="text-sm md:text-lg text-gray-700">
                    Sí. El sistema envía notificaciones con anticipación para informarte que tu reserva está por finalizar.
                </p>
                <p className="text-sm md:text-lg text-gray-700">
                    Estas alertas tienen como objetivo evitar que olvides adicionar tiempo o salir a tiempo, y así prevenir recargos o sanciones.
                </p>
            </div>

            {/* ¿Qué ocurre si salgo tarde sin adicionar tiempo? */}
            <div className="bg-white border border-gray-200 rounded-3xl px-4 py-6 md:p-8 space-y-4 mb-5">
                <h2 className="text-md md:text-xl font-semibold text-gray-800">¿Qué ocurre si salgo tarde sin adicionar tiempo?</h2>
                <ul className="list-disc list-inside text-sm md:text-lg text-gray-700 space-y-2">
                    <li>Se aplicará un <strong>recargo económico</strong> definido por el motel correspondiente.</li>
                    <li>Este recargo debe ser cancelado <strong>directamente en el motel</strong> al momento de tu salida.</li>
                    <li>Si el motel informa que <strong>no se realizó el pago</strong> del recargo, podrías ser sancionado o incluso vetado de la plataforma.</li>
                </ul>
                <p className="text-sm md:text-lg text-gray-700">
                    El objetivo es fomentar el respeto por el tiempo reservado y garantizar una buena experiencia para todos los usuarios.
                </p>
            </div>

            {/* Recomendaciones para evitar salidas fuera de tiempo */}
            <div className="bg-white border border-gray-200 rounded-3xl px-4 py-6 md:p-8 space-y-4">
                <h2 className="text-md md:text-xl font-semibold text-gray-800">Recomendaciones para evitar salidas fuera de tiempo</h2>
                <ul className="list-disc list-inside text-sm md:text-lg text-gray-700 space-y-2">
                    <li>Revisa el horario de tu reserva en el panel de gestión.</li>
                    <li>Activa las notificaciones o verifica manualmente el tiempo restante.</li>
                    <li>Si necesitas más tiempo, utiliza la función de <Link href="/help/add-time" className="text-blue-600 underline">adición de tiempo</Link> antes de que finalice tu reserva.</li>
                    <li>Coordina tu salida con antelación si estás por llegar al tiempo límite.</li>
                </ul>
                <p className="text-sm md:text-lg text-gray-700">
                    Evitar salidas fuera de tiempo te permite disfrutar sin interrupciones, sin recargos y con buena reputación dentro de Vibetel.
                </p>
            </div>
        </div>
    );
}

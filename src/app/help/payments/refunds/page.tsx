import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";

export default function RefundsPage() {
    return (
        <div className="mt-32 mb-20 px-4 md:px-36 2xl:px-64">
            {/* Breadcrumb */}
            <div className="text-sm text-gray-500 flex items-center gap-2 mb-4">
                <Link href="/help" className="hover:underline text-xs md:text-md text-gray-600">
                    Inicio
                </Link>
                <IoIosArrowForward className="h-4 w-4" />
                <span className="text-xs md:text-md text-gray-500">Reembolsos</span>
            </div>

            <h1 className="text-md md:text-3xl font-semibold text-gray-800 ">Política de reembolsos</h1>
            <div className="mb-5 text-start">
                <p className="text-xs md:text-lg text-black">
                    Si tienes preguntas sobre nuestra política de reembolsos, estamos aquí para ayudarte, no dudes en contactar a nuestro equipo de soporte desde el chat o al correo <strong>soporte@vibetel.com</strong>.
                </p>
            </div>
            {/* Introducción */}
            <div className="bg-white border border-gray-200 rounded-3xl px-4 py-6 md:p-8 space-y-4">
                <p className="text-sm md:text-lg text-gray-700">
                    En <strong>Vibetel</strong> trabajamos para ofrecerte una experiencia transparente y confiable.
                    Sabemos que pueden surgir situaciones inesperadas, por eso contamos con una política de reembolsos clara y justa.
                </p>
            </div>

            {/* Cuándo puedes solicitar un reembolso */}
            <div className="bg-white border mt-5 border-gray-200 rounded-3xl px-4 py-6 md:p-8 space-y-4">
                <h2 className="text-md md:text-xl font-semibold text-gray-800">¿Cuándo puedes solicitar un reembolso?</h2>
                <ul className="list-disc text-sm md:text-lg list-inside text-gray-700 space-y-2">
                    <li>Cuando una reserva es cancelada por el motel antes del check-in.</li>
                    <li>Si hubo un error en el cobro o un doble pago.</li>
                    <li>Cuando se reporta un problema grave con la habitación que no fue resuelto por el establecimiento.</li>
                </ul>
            </div>

            {/* Condiciones del reembolso */}
            <div className="bg-white border mt-5 border-gray-200 rounded-3xl px-4 py-6 md:p-8 space-y-4">
                <h2 className="text-md md:text-xl font-semibold text-gray-800">Condiciones del reembolso</h2>
                <ul className="list-disc text-sm md:text-lg list-inside text-gray-700 space-y-2">
                    <li>Las solicitudes deben realizarse dentro de los <strong>3 días posteriores</strong> a la fecha de la reserva.</li>
                    <li>El monto será reembolsado a la misma cuenta desde donde se realizó el pago.</li>
                    <li>Los reembolsos pueden tardar entre <strong>5 a 10 días hábiles</strong>, dependiendo de la entidad financiera.</li>
                </ul>
            </div>

            {/* Cómo solicitar un reembolso */}
            <div className="bg-white border mt-5 border-gray-200 rounded-3xl px-4 py-6 md:p-8 space-y-4">
                <h2 className="text-md md:text-xl font-semibold text-gray-800">¿Cómo solicitar un reembolso?</h2>
                <p className="text-sm md:text-lg text-gray-700">
                    Para solicitar un reembolso, debes contactar a nuestro equipo de soporte desde el chat de la plataforma
                    o escribiendo al correo <strong>soporte@vibetel.com</strong>, incluyendo los detalles de tu reserva y el motivo del reembolso.
                </p>
            </div>

            {/* Recomendaciones */}
            <div className="bg-white border mt-5 border-gray-200 rounded-3xl px-4 py-6 md:p-8 space-y-4">
                <h2 className="text-md md:text-xl font-semibold text-gray-800">Recomendaciones</h2>
                <p className="text-sm md:text-lg text-gray-700">
                    Antes de realizar una reserva, te recomendamos revisar las políticas de cancelación del motel y los detalles de la habitación.
                    Esto te ayudará a evitar inconvenientes y facilitará cualquier proceso posterior.
                </p>
            </div>
        </div>
    );
}

import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";

export default function SecurePaymentsPage() {
    return (
        <div className="mt-32 mb-20 px-4 md:px-36 2xl:px-64">
            {/* Breadcrumb */}
            <div className="text-gray-500 flex items-center gap-2 mb-4">
                <Link href="/help" className="hover:underline text-xs md:text-md text-gray-600">
                    Inicio
                </Link>
                <IoIosArrowForward className="h-4 w-4" />
                <span className="text-xs md:text-md text-gray-500">Pagos seguros</span>
            </div>

            <h1 className="text-md md:text-3xl font-semibold text-gray-800 ">Pagos seguros</h1>
            <div className="mb-6 text-start">
                <p className="text-xs md:text-lg text-black">
                    Si tienes dudas sobre el proceso de pago, estamos aquí para ayudarte, no dudes en contactar a nuestro equipo de soporte desde el chat o al correo <strong>soporte@vibetel.com</strong>.
                </p>
            </div>
            {/* Introducción */}
            <div className="bg-white border border-gray-200 rounded-3xl px-4 py-6 md:p-8 space-y-4">
                <p className="text-sm md:text-lg text-gray-700">
                    En <strong>Vibetel</strong>, tu seguridad es nuestra prioridad. Por eso, todos los pagos realizados a través de nuestra plataforma están protegidos mediante protocolos de seguridad certificados.
                </p>
            </div>

            {/* Protección de pagos */}
            <div className="bg-white border mt-5 border-gray-200 rounded-3xl px-4 py-6 md:p-8 space-y-4">
                <h2 className="text-md md:text-xl font-semibold text-gray-800">¿Cómo protegemos tus pagos?</h2>
                <ul className="list-disc text-sm md:text-lg list-inside text-gray-700 space-y-2">
                    <li>Usamos conexiones cifradas con tecnología SSL para garantizar la privacidad de tus datos.</li>
                    <li>Los pagos se procesan a través de plataformas bancarias reconocidas, garantizando transparencia y respaldo.</li>
                    <li>Recibirás notificaciones por correo sobre cada transacción realizada.</li>
                </ul>
            </div>

            {/* Respaldo bancario */}
            <div className="bg-white border mt-5 border-gray-200 rounded-3xl px-4 py-6 md:p-8 space-y-4">
                <h2 className="text-md md:text-xl font-semibold text-gray-800">Respaldo bancario con Davivienda</h2>
                <p className="text-sm md:text-lg text-gray-700">
                    Contamos con el respaldo de <strong>Davivienda</strong>, uno de los bancos más confiables de Colombia, para procesar y asegurar las transacciones realizadas en nuestra plataforma.
                    Gracias a esta alianza, garantizamos que tu dinero siempre llegará al lugar correcto, y en caso de cualquier inconveniente, tendrás el respaldo institucional necesario.
                </p>
            </div>

            {/* Confianza y transparencia */}
            <div className="bg-white border mt-5 border-gray-200 rounded-3xl px-4 py-6 md:p-8 space-y-4">
                <h2 className="text-md md:text-xl font-semibold text-gray-800">Confianza y transparencia</h2>
                <p className="text-sm md:text-lg text-gray-700">
                    Nuestro sistema de pagos permite que cada usuario pueda revisar el estado de sus transacciones, los comprobantes de pago y los detalles de su reserva en todo momento.
                </p>
            </div>


        </div>
    );
}

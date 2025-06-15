import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";

export default function PaymentMethodsPage() {
    return (
        <div className="mt-32 mb-20 px-4 md:px-36 2xl:px-64">
            {/* Breadcrumb */}
            <div className="text-gray-500 flex items-center gap-2 mb-4">
                <Link href="/help" className="hover:underline text-xs md:text-md text-gray-600">
                    Inicio
                </Link>
                <IoIosArrowForward className="h-4 w-4" />
                <span className="text-xs md:text-md text-gray-500">Métodos de pago</span>
            </div>

            <h1 className="text-md md:text-3xl font-semibold text-gray-800">Métodos de pago disponibles</h1>
            <div className="mb-6 text-start">
                <p className="text-xs md:text-lg text-black">
                    Si tienes preguntas sobre los metodos de pago, estamos aquí para ayudarte, no dudes en contactar a nuestro equipo de soporte desde el chat o al correo <strong>soporte@vibetel.com</strong>.
                </p>
            </div>
            {/* Descripción general */}
            <div className="bg-white border border-gray-200 rounded-3xl px-4 py-6 md:p-8 space-y-4 mb-5">
                <p className="text-sm md:text-lg text-gray-700">
                    En <strong>Vibetel</strong> queremos ofrecerte la mayor comodidad posible a la hora de realizar tus pagos. Por eso, integramos los métodos de pago disponibles a través de <strong>ePayco</strong>, una plataforma segura y confiable.
                </p>
                <p className="text-sm md:text-lg text-gray-700">
                    Todos los métodos están disponibles desde tu proceso de reserva, adaptándose a tus preferencias y necesidades.
                </p>
            </div>

            {/* Métodos disponibles */}
            <div className="bg-white border border-gray-200 rounded-3xl px-4 py-6 md:p-8 space-y-4 mb-5">
                <h2 className="text-md md:text-xl font-semibold text-gray-800">¿Qué métodos puedes utilizar?</h2>
                <ul className="list-disc list-inside text-sm md:text-lg text-gray-700 space-y-2">
                    <li><strong>Tarjetas de crédito y débito:</strong> Visa, Mastercard, American Express, Diners, entre otras.</li>
                    <li><strong>PSE:</strong> Pagos con débito automático desde cuentas bancarias colombianas.</li>
                    <li><strong>Nequi y Daviplata:</strong> Pagos rápidos desde tu celular.</li>
                    <li><strong>Transferencias bancarias:</strong> A través de bancos nacionales con respaldo de ePayco.</li>
                </ul>
                <p className="text-sm md:text-lg text-gray-700">
                    No aceptamos pagos en puntos físicos o tiendas aliadas (Baloto, Efecty, etc.), ya que buscamos procesos 100% digitales para tu comodidad y seguridad.
                </p>
            </div>

            {/* Métodos más utilizados (con espacio para íconos o imágenes) */}
            <div className="bg-white border border-gray-200 rounded-3xl px-4 py-6 md:p-8 space-y-4 mb-5">
                <h2 className="text-md md:text-xl font-semibold text-gray-800">Métodos más utilizados por nuestros usuarios</h2>
                <p className="text-sm md:text-lg text-gray-700 mb-4">
                    Estos son los métodos de pago más comunes dentro de nuestra comunidad:
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 items-center text-center">
                    {/* Aquí puedes reemplazar los nombres por íconos o imágenes más adelante */}
                    <div className="border border-blue-600 p-4 rounded-full bg-blue-50" >
                        <p className="text-sm md:text-md text-blue-600 font-bold">PSE</p>
                    </div>
                    <div className="border border-blue-600 p-4 rounded-full bg-blue-50" >
                        <p className="text-sm md:text-md text-blue-600 font-bold">Nequi</p>
                    </div>
                    <div className="border border-blue-600 p-4 rounded-full bg-blue-50">
                        <p className="text-sm md:text-md text-blue-600 font-bold">Daviplata</p>
                    </div>
                    <div className="border border-blue-600 p-4 rounded-full bg-blue-50" >
                        <p className="text-sm md:text-md text-blue-600 font-bold">Tarjeta de crédito</p>
                    </div>
                </div>
            </div>

            {/* Seguridad */}
            <div className="bg-white border border-gray-200 rounded-3xl px-4 py-6 md:p-8 space-y-4">
                <h2 className="text-md md:text-xl font-semibold text-gray-800">¿Es seguro pagar con estos métodos?</h2>
                <p className="text-sm md:text-lg text-gray-700">
                    Sí. Todos los métodos están respaldados por <strong>ePayco</strong>, una plataforma certificada que cumple con los más altos estándares de seguridad (SSL, tokenización de datos, cumplimiento PCI DSS).
                </p>
                <p className="text-sm md:text-lg text-gray-700">
                    Además, tú decides si deseas recibir notificaciones por correo o SMS para seguir de cerca cada transacción.
                </p>
            </div>
        </div>
    );
}

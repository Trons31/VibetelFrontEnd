import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";

export default function ManageReservationsPage() {
    return (
        <div className="mt-32 mb-20 px-4 md:px-36 2xl:px-64">
            {/* Breadcrumb */}
            <div className="text-sm text-gray-500 flex items-center gap-2 mb-4">
                <Link href="/help" className="hover:underline text-xs md:text-md text-gray-600">
                    Inicio
                </Link>
                <IoIosArrowForward className="h-4 w-4" />
                <span className="text-xs md:text-md text-gray-500">Administrar reservas</span>
            </div>

            <h1 className="text-md md:text-3xl font-semibold text-gray-800 ">Administrar reservas</h1>
            <div className="mb-5 text-start">
                <p className="text-xs md:text-lg text-black">
                    Si tienes preguntas sobre como gestionar tus reservas, estamos aquí para ayudarte, no dudes en contactar a nuestro equipo de soporte desde el chat o al correo <strong>soporte@vibetel.com</strong>.
                </p>
            </div>
            {/* Pago */}
            <div className="bg-white border border-gray-200 rounded-3xl px-4 py-6 md:p-8 space-y-4">
                <h2 className="text-md md:text-xl font-semibold text-gray-800">¿Cómo se paga una reserva?</h2>
                <p className="text-sm md:text-lg text-gray-700">
                    El pago de una reserva se realiza directamente desde la plataforma cuando estás en el proceso de reservar una habitación.
                    Contamos con el respaldo de <strong>Davivienda</strong> para asegurar tus transacciones.
                </p>
                <p className="text-sm md:text-lg text-gray-700">
                    Si por alguna razón el pago no se completa, tienes <strong>15 minutos</strong> para retomarlo desde el botón <strong>“Reserva en proceso”</strong> en el menú superior.
                    Pasado este tiempo, deberás iniciar una nueva reserva.
                </p>
            </div>

            {/* Código de acceso */}
            <div className="bg-white border mt-5 border-gray-200 rounded-3xl px-4 py-6 md:p-8 space-y-4">
                <h2 className="text-md md:text-xl font-semibold text-gray-800">¿Dónde veo el código de acceso?</h2>
                <p className="text-sm md:text-lg text-gray-700">
                    Para ver el código de acceso a un motel, entra a la sección de <strong>“Reservas”</strong> y selecciona la reserva correspondiente.
                    Luego, en la página de detalles de la reserva, encontrarás un menú lateral derecho con opciones para gestionar tu reserva, incluyendo el <strong>código de acceso</strong>.
                </p>
                <p className="text-sm md:text-lg text-gray-700">
                    Este código te permitirá ingresar al motel. Presenta tu código al pasar por recepción.
                </p>
            </div>

            {/* Cancelar reserva */}
            <div className="bg-white border mt-5 border-gray-200 rounded-3xl px-4 py-6 md:p-8 space-y-4">
                <h2 className="text-md md:text-xl font-semibold text-gray-800">¿Puedo cancelar mi reserva?</h2>
                <p className="text-sm md:text-lg text-gray-700">
                    Sí, puedes cancelar tu reserva desde la sección <strong>“Reservas”</strong>. Selecciona la reserva que deseas cancelar y haz clic en <strong>“Cancelar reserva”</strong> desde el menú lateral derecho.
                </p>
                <p className="text-sm md:text-lg text-gray-700">
                    Solo puedes hacerlo hasta <strong>30 minutos antes</strong> de que empiece la reserva. Si cumples con este tiempo, podrás obtener un reembolso según nuestra política.
                </p>
            </div>

            {/* Adicionar tiempo */}
            <div className="bg-white border mt-5 border-gray-200 rounded-3xl px-4 py-6 md:p-8 space-y-4">
                <h2 className="text-md md:text-xl font-semibold text-gray-800">¿Cómo agrego tiempo adicional a mi reserva?</h2>
                <p className="text-sm md:text-lg text-gray-700">
                    Accede a la sección de <strong>“Reservas”</strong>, selecciona la reserva activa y dirígete al menú lateral derecho.
                </p>
                <p className="text-sm md:text-lg text-gray-700">
                    Allí encontrarás la opción <strong>“Adición de tiempo”</strong>, donde podrás extender tu reserva seleccionando el tiempo extra deseado y realizando el pago correspondiente.
                </p>
            </div>

            {/* Historial de reservas */}
            <div className="bg-white border mt-5 border-gray-200 rounded-3xl px-4 py-6 md:p-8 space-y-4">
                <h2 className="text-md md:text-xl font-semibold text-gray-800">¿Dónde puedo ver mis reservas anteriores?</h2>
                <p className="text-sm md:text-lg text-gray-700">
                    En la sección <strong>“Reservas”</strong> puedes encontrar todas tus reservas anteriores.
                    Puedes aplicar filtros para buscar por fecha, estado o tipo de habitación.
                </p>
                <p className="text-sm md:text-lg text-gray-700">
                    Desde ahí también puedes volver a reservar una habitación, ver los detalles, o descargar comprobantes de tus transacciones.
                </p>
            </div>
        </div>
    );
}

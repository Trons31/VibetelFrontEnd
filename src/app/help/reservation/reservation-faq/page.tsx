import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";

export default function ReservationFAQPage() {
    return (
        <div className="mt-32 mb-20 px-4 md:px-36 2xl:px-64">
            {/* Breadcrumb */}
            <div className="text-gray-500 flex items-center gap-2 mb-4">
                <Link href="/help" className="hover:underline text-xs md:text-md text-gray-600">
                    Inicio
                </Link>
                <IoIosArrowForward className="h-4 w-4" />
                <span className="text-xs md:text-md text-gray-500">Preguntas frecuentes sobre reservas</span>
            </div>

            <h1 className="text-md md:text-3xl font-semibold text-gray-800">Preguntas frecuentes sobre reservas</h1>
            <div className="mb-5 text-start">
                <p className="text-xs md:text-lg text-black">
                    Si tienes mas preguntas, estamos aquí para ayudarte, no dudes en contactar a nuestro equipo de soporte desde el chat o al correo <strong>soporte@vibetel.com</strong>.
                </p>
            </div>
            {/* ¿Cómo realizo una reserva en Vibetel? */}
            <div className="bg-white border border-gray-200 rounded-3xl px-4 py-6 md:p-8 space-y-4 mb-5">
                <h2 className="text-md md:text-xl font-semibold text-gray-800">¿Cómo realizo una reserva en Vibetel?</h2>
                <p className="text-sm md:text-lg text-gray-700">
                    Puedes ir a la sección de habitaciones y seleccionar la que prefieras, elegir si deseas hacer una reserva anónima o iniciar sesión, definir la fecha de entrada y proceder con el pago.
                    También puedes ir a la sección de moteles, escoger tu motel de preferencia y seguir el mismo proceso seleccionando una habitación disponible.
                </p>
            </div>

            {/* ¿Puedo hacer una reserva sin registrarme? */}
            <div className="bg-white border border-gray-200 rounded-3xl px-4 py-6 md:p-8 space-y-4 mb-5">
                <h2 className="text-md md:text-xl font-semibold text-gray-800">¿Puedo hacer una reserva sin registrarme?</h2>
                <p className="text-sm md:text-lg text-gray-700">
                    Sí, puedes hacer una <Link href="/help/reservation/anonymous-reservation" className="text-blue-600 underline">reserva anónima</Link>. Solo debes marcar la opción Reserva anónima antes de confirmar el pago. Recibirás un código de acceso por SMS o correo para gestionar tu reserva.
                </p>
            </div>

            {/* ¿Qué pasa si no llego a tiempo a mi reserva? */}
            <div className="bg-white border border-gray-200 rounded-3xl px-4 py-6 md:p-8 space-y-4 mb-5">
                <h2 className="text-md md:text-xl font-semibold text-gray-800">¿Qué pasa si no llego a tiempo a mi reserva?</h2>
                <p className="text-sm md:text-lg text-gray-700">
                    Si no llegas dentro del tiempo de espera definido por el motel (ej: 20 minutos después del inicio de tu reserva), esta se cancelará automáticamente.
                </p>
                <p className="text-sm md:text-lg text-gray-700">
                    Puedes ver más detalles en nuestra sección sobre <Link href="/help/reservation/auto-cancellation" className="text-blue-600 underline">cancelación automática</Link>.
                </p>
            </div>

            {/* ¿Puedo cancelar una reserva? */}
            <div className="bg-white border border-gray-200 rounded-3xl px-4 py-6 md:p-8 space-y-4 mb-5">
                <h2 className="text-md md:text-xl font-semibold text-gray-800">¿Puedo cancelar una reserva?</h2>
                <p className="text-sm md:text-lg text-gray-700">
                    Sí, puedes cancelar una reserva desde la sección reservas o desde el panel de gestión de tu reserva si es anónima. Se aplican políticas de reembolso según el caso.
                </p>
                <p className="text-sm md:text-lg text-gray-700">
                    Consulta nuestra <Link href="/help/payments/refunds" className="text-blue-600 underline">política de reembolsos</Link> para conocer los casos aplicables.
                </p>
            </div>

            {/* ¿Cuándo puedo adicionar tiempo a mi reserva? */}
            <div className="bg-white border border-gray-200 rounded-3xl px-4 py-6 md:p-8 space-y-4 mb-5">
                <h2 className="text-md md:text-xl font-semibold text-gray-800">¿Cuándo puedo adicionar tiempo a mi reserva?</h2>
                <p className="text-sm md:text-lg text-gray-700">
                    Solo puedes adicionar tiempo una vez tu reserva haya iniciado, y hasta 5 minutos antes de que finalice. Esta opción aparece automáticamente en el panel de gestión de la reserva.
                </p>
                <p className="text-sm md:text-lg text-gray-700">
                    Más información en <Link href="/help/reservation/add-time" className="text-blue-600 underline">adición de tiempo</Link>.
                </p>
            </div>

            {/* ¿Qué métodos de pago aceptan? */}
            <div className="bg-white border border-gray-200 rounded-3xl px-4 py-6 md:p-8 space-y-4 mb-5">
                <h2 className="text-md md:text-xl font-semibold text-gray-800">¿Qué métodos de pago aceptan?</h2>
                <p className="text-sm md:text-lg text-gray-700">
                    Trabajamos con ePayco, aceptando tarjetas de crédito y débito, PSE, Nequi, Daviplata, entre otros. No se aceptan pagos en puntos físicos.
                </p>
                <p className="text-sm md:text-lg text-gray-700">
                    Más información en nuestra sección de <Link href="/help/payments/payment-methods" className="text-blue-600 underline">métodos de pago</Link>.
                </p>
            </div>

            {/* ¿Qué pasa si salgo tarde del motel sin adicionar tiempo? */}
            <div className="bg-white border border-gray-200 rounded-3xl px-4 py-6 md:p-8 space-y-4 mb-5">
                <h2 className="text-md md:text-xl font-semibold text-gray-800">¿Qué pasa si salgo tarde del motel sin adicionar tiempo?</h2>
                <p className="text-sm md:text-lg text-gray-700">
                    Se aplicará un recargo definido por el motel. Este debe ser pagado directamente en el establecimiento. Si no se paga, podrías ser sancionado en el sistema.
                </p>
                <p className="text-sm md:text-lg text-gray-700">
                    Detalles en la sección de <Link href="/help/reservation/late-checkout" className="text-blue-600 underline">salida fuera de tiempo</Link>.
                </p>
            </div>

            {/* ¿Cómo gestiono mi reserva si no tengo cuenta? */}
            <div className="bg-white border border-gray-200 rounded-3xl px-4 py-6 md:p-8 space-y-4">
                <h2 className="text-md md:text-xl font-semibold text-gray-800">¿Cómo gestiono mi reserva si no tengo cuenta?</h2>
                <p className="text-sm md:text-lg text-gray-700">
                    Si hiciste una reserva anónima, puedes ingresar a la página de <Link href="/help/reservation/anonymous-reservation" className="text-blue-600 underline">Reservas Anónimas</Link> y colocar el código de acceso enviado a tu correo o SMS para verla y gestionarla.
                </p>
            </div>
        </div>
    );
}

import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";

export default function PaymentFAQPage() {
    return (
        <div className="mt-32 mb-20 px-4 md:px-36 2xl:px-64">
            {/* Breadcrumb */}
            <div className="text-gray-500 flex items-center gap-2 mb-4">
                <Link href="/help" className="hover:underline text-xs md:text-md text-gray-600">
                    Inicio
                </Link>
                <IoIosArrowForward className="h-4 w-4" />
                <span className="text-xs md:text-md text-gray-500">Preguntas frecuentes sobre pagos</span>
            </div>

            <h1 className="text-md md:text-3xl font-semibold text-gray-800">Preguntas frecuentes sobre pagos</h1>
            <div className="mb-5 text-start">
                <p className="text-xs md:text-lg text-black">
                    Si tienes mas preguntas, estamos aquí para ayudarte, no dudes en contactar a nuestro equipo de soporte desde el chat o al correo <strong>soporte@vibetel.com</strong>.
                </p>
            </div>
            {/* Métodos de pago */}
            <div className="bg-white border border-gray-200 rounded-3xl px-4 py-6 md:p-8 space-y-4 mb-5">
                <h2 className="text-sm md:text-xl font-semibold text-gray-800">¿Qué métodos de pago aceptan?</h2>
                <p className="text-gray-700 text-sm md:text-lg">
                    En Vibetel aceptamos varios métodos de pago para tu comodidad:
                </p>
                <ul className="list-disc list-inside text-sm md:text-lg text-gray-700 space-y-1">
                    <li><strong>Tarjetas de crédito y débito:</strong> Visa, Mastercard, y otras principales.</li>
                    <li><strong>PSE:</strong> Pagos con débito directo desde tu cuenta bancaria en Colombia.</li>
                    <li><strong>Transferencias bancarias:</strong> A través de nuestra pasarela aliada con respaldo de Davivienda.</li>
                </ul>
                <p className="mt-2 text-sm md:text-lg text-gray-700">
                    Todos los pagos son procesados a través de una plataforma segura y certificada, lo que garantiza la protección de tu información financiera.
                </p>
            </div>

            {/* Seguridad de pagos */}
            <div className="bg-white border border-gray-200 rounded-3xl px-4 py-6 md:p-8 space-y-4 mb-5">
                <h2 className="text-md md:text-xl font-semibold text-gray-800">¿Es seguro pagar en Vibetel?</h2>
                <p className="text-sm md:text-lg text-gray-700">
                    Sí, completamente. En Vibetel utilizamos tecnología de cifrado SSL para proteger tu información personal y financiera. Además, todas las transacciones se realizan mediante pasarelas de pago reguladas y aliadas a bancos como <strong>Davivienda</strong>.
                </p>
                <p className="text-sm md:text-lg text-gray-700">
                    Nunca almacenamos la información de tu tarjeta en nuestros servidores y seguimos estrictamente protocolos de seguridad para garantizar que tu experiencia sea 100% segura.
                </p>
            </div>

            {/* Pago en el motel */}
            <div className="bg-white border border-gray-200 rounded-3xl px-4 py-6 md:p-8 space-y-4 mb-5">
                <h2 className="text-md md:text-xl font-semibold text-gray-800">¿Puedo pagar al llegar al motel?</h2>
                <p className="text-sm md:text-lg text-gray-700">
                    No. En Vibetel todas las reservas se pagan anticipadamente desde la plataforma para asegurar la disponibilidad de la habitación y evitar contratiempos al momento del ingreso.
                </p>
                <p className="text-sm md:text-lg text-gray-700">
                    Esta modalidad también permite ofrecer un ingreso más rápido y privado, ya que no necesitas realizar ningún pago adicional al llegar al establecimiento.
                </p>
            </div>

            {/* Comprobante de pago */}
            <div className="bg-white border border-gray-200 rounded-3xl px-4 py-6 md:p-8 space-y-4 mb-5">
                <h2 className="text-md md:text-xl font-semibold text-gray-800">¿Recibo un comprobante de pago?</h2>
                <p className="text-sm md:text-lg text-gray-700">
                    Sí. Al completar una reserva, te enviaremos automáticamente un comprobante de pago al correo electrónico registrado. Este documento incluye:
                </p>
                <ul className="list-disc text-sm md:text-lg list-inside text-gray-700 space-y-1">
                    <li>El monto total pagado.</li>
                    <li>Fecha y hora de la transacción.</li>
                    <li>Detalles de la reserva: habitación, motel, horario, etc.</li>
                    <li>Referencia del pago y código de acceso.</li>
                </ul>
                <p className="text-sm md:text-lg text-gray-700">
                    También puedes revisar tus comprobantes en la sección de reservas dentro de tu cuenta.
                </p>
            </div>

            {/* Fallo de pago */}
            <div className="bg-white border border-gray-200 rounded-3xl px-4 py-6 md:p-8 space-y-4 mb-5">
                <h2 className="text-md md:text-xl font-semibold text-gray-800">¿Qué pasa si mi pago falla?</h2>
                <p className="text-sm md:text-lg text-gray-700">
                    Si tu pago falla, la reserva no será confirmada ni guardada. En ese caso, puedes:
                </p>
                <ul className="list-disc text-sm md:text-lg list-inside text-gray-700 space-y-1">
                    <li>Verificar que tu tarjeta o cuenta tenga fondos suficientes.</li>
                    <li>Revisar que los datos ingresados sean correctos.</li>
                    <li>Intentar el pago nuevamente.</li>
                </ul>
                <p className="text-sm md:text-lg text-gray-700">
                    Si el problema persiste, puedes contactarnos a través del chat o correo de soporte para ayudarte a resolverlo lo antes posible.
                </p>
            </div>

            {/* Reembolsos */}
            <div className="bg-white border border-gray-200 rounded-3xl px-4 py-6 md:p-8 space-y-4">
                <h2 className="text-md md:text-xl font-semibold text-gray-800">¿Cómo solicito un reembolso?</h2>
                <p className="text-sm md:text-lg text-gray-700">
                    Puedes consultar nuestra <Link href="/reembolsos" className="text-blue-600 underline">política de reembolsos</Link> donde explicamos en qué casos se aplican devoluciones.
                </p>
                <p className="text-sm md:text-lg text-gray-700">
                    Para iniciar un proceso de reembolso, solo necesitas enviarnos un mensaje por el chat o escribirnos a <strong>soporte@vibetel.com</strong> con los detalles de tu reserva, el motivo y un comprobante del pago.
                </p>
                <p className="text-sm md:text-lg text-gray-700">
                    El reembolso será evaluado en un plazo de 24 a 48 horas y, si procede, será procesado a tu cuenta en un período de 5 a 10 días hábiles.
                </p>
            </div>
        </div>
    );
}

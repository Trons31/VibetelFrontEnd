import Image from "next/image";
import { Pricing } from "./ui/Pricing";
import { SlidePricingMovil } from "@/components";

export async function generateMetadata() {
    return {
        title: 'Planes de afiliación - Motel Partner',
        description: 'Descubre nuestros planes de afiliación y elige el que mejor se adapte a tu motel. Compara precios, beneficios y comienza a disfrutar de todas las ventajas que Motel Partner ofrece para la gestión de tus reservas.',
    };
}



export default function PricingPage() {
    return (
        <div>

            <div className="h-screen flex items-center justify-center bg-red-600 px-4">
                <div className="text-center text-white max-w-3xl leading-relaxed space-y-16">
                    <h1 className="text-3xl md:text-5xl font-extrabold">
                        ¡Prepárate para descubrir los precios de Vibetel!
                    </h1>
                    <p
                        className="text-sm md:text-md font-light"
                        style={{ textAlign: 'justify', textAlignLast: 'center' }}
                    >
                        Selecciona el plan perfecto para ti y lleva la administración de tu motel al siguiente nivel. <strong> ¡3 meses de prueba gratuita! </strong>
                        Durante este tiempo, podrás experimentar todas las funciones y soluciones que ofrecemos sin compromiso alguno.
                        Nuestros planes están diseñados para adaptarse a las necesidades y al presupuesto de cada motel
                    </p>
                </div>
            </div>

            <div className="mb-4 mt-20 px-4 md:px-0" >
                <p className="text-xl md:text-4xl text-center font-normal ">
                    Mejora tu gestión y aumenta tu ocupación con Vibetel
                </p>
                <div className="flex justify-center mt-2" >
                    <span className="text-sm md:text-lg text-gray-700"  style={{ textAlign: 'justify', textAlignLast: 'center' }}>
                        Planes flexibles y precios asequibles diseñados para adaptarse a las necesidades de tu negocio.
                    </span>
                </div>
            </div>
            <div className="hidden md:block" >
            <Pricing />
            </div>
            <div className="block md:hidden" >
            <SlidePricingMovil />
            </div>

            <div className="px-4 md:px-10 py-24 2xl:px-64 mb-20" >
                <h2 className="text-3xl md:text-5xl font-bold text-center mb-14 leading-tight" >
                    ¿Tienes preguntas sobre cómo <br /> funciona Vibetel para moteles?
                </h2>

                <div className="grid grid-cols-1 mt-4 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    <div>
                        <h3 className="text-xl md:text-2xl font-semibold mb-2">
                            ¿En cuánto tiempo me convierto en un motel partner?
                        </h3>
                        <p className="xs:text-xs md:text-md text-gray-700" >Una vez completes el registro, tu motel se activa en menos de 24 horas tras la validación.</p>
                    </div>

                    <div>
                        <h3 className="text-xl md:text-2xl font-semibold mb-2">
                            ¿Cuál es el costo por registrarse en la plataforma?
                        </h3>
                        <p className="xs:text-xs md:text-md text-gray-700">El registro es totalmente gratuito. Solo pagas comisiones por reserva confirmada.</p>
                    </div>

                    <div>
                        <h3 className="text-xl md:text-2xl font-semibold mb-2">
                            ¿Qué comisión cobra la plataforma por cada reserva?
                        </h3>
                        <p className="xs:text-xs md:text-md text-gray-700">La comisión varía según la localidad y se detalla al momento del registro.</p>
                    </div>

                    <div>
                        <h3 className="text-xl md:text-2xl font-semibold mb-2">
                            ¿Cómo puedo gestionar las reservas?
                        </h3>
                        <p className="xs:text-xs md:text-md text-gray-700" >Desde el portal Vibetel puedes ver, editar y seguir todas las reservas en tiempo real.</p>
                    </div>

                    <div>
                        <h3 className="text-xl md:text-2xl font-semibold mb-2">
                            ¿Cómo me aseguro de que las reservas son legítimas y los pagos están garantizados?
                        </h3>
                        <p className="xs:text-xs md:text-md text-gray-700" >Todas las reservas son pagadas antes de confirmarse, usando pasarelas como ePayco y Davivienda.</p>
                    </div>

                    <div>
                        <h3 className="text-xl md:text-2xl font-semibold mb-2">
                            ¿Puedo establecer precios diferentes según temporadas o días?
                        </h3>
                        <p className="xs:text-xs md:text-md text-gray-700">Sí. Puedes personalizar precios por temporada, día de la semana o promociones especiales.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
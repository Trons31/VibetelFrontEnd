import Image from "next/image";
import { Pricing } from "./ui/Pricing";

export async function generateMetadata() {
    return {
        title: 'Planes de afiliación - Motel Partner',
        description: 'Descubre nuestros planes de afiliación y elige el que mejor se adapte a tu motel. Compara precios, beneficios y comienza a disfrutar de todas las ventajas que Motel Partner ofrece para la gestión de tus reservas.',
    };
}



export default function PricingPage() {
    return (
        <div>

            <div className="h-screen flex items-center justify-center bg-black rounded-xl px-4">
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

            <Pricing />

            <div className="px-4 md:px-10 py-24 2xl:px-64" >
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

            <div className="bg-black text-white py-20 px-4 md:px-10 2xl:px-64 grid grid-cols-1 md:grid-cols-2 items-center gap-10">
                <div>
                    <h2 className="text-2xl md:text-4xl font-extrabold mb-6">
                        ¡Moderniza tu motel hoy mismo y da el salto a la era digital con Vibetel!
                    </h2>
                    <div className="bg-neutral-900 rounded-xl p-6 shadow-lg max-w-xl">
                        <div className="flex items-center gap-4 mb-4">
                            <Image
                                src="/motel-partner/ceo-google.jpg"
                                alt="Eric Schmidt"
                                className="w-12 h-12 rounded-full object-cover"
                                width={100}
                                height={100}
                            />
                            <div>
                                <p className="font-semibold">Eric Schmidt</p>
                                <p className="text-sm text-gray-400">Ex CEO de Google</p>
                            </div>
                        </div>
                        <p className="text-gray-300 text-md">
                            &quot;Cada industria que no se digitalice quedará atrás. La tecnología no solo
                            mejora la eficiencia, transforma por completo cómo operamos. Adoptar sistemas
                            como Vibetel no es una opción, es una necesidad para liderar el futuro.&quot;
                        </p>
                    </div>
                </div>
                <div className="hidden md:block relative w-full h-[500px]"> {/* Aquí el contenedor necesario */}
                    <Image
                        src="/motel-partner/mujer.png"
                        alt="Imagen ilustrativa"
                        fill
                        className="object-contain" // o object-cover según lo que quieras
                    />
                </div>
            </div>
        </div>
    );
}
import Image from 'next/image';
import { FaRegCheckCircle } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io5";
import { MdEmail, MdLocationPin } from "react-icons/md";

export async function generateMetadata() {
    return {
        title: 'Contáctanos - Motel Partner',
        description: '¿Quieres trabajar con nosotros? Ponte en contacto con nuestro equipo a través de correo, WhatsApp o visítanos en nuestra ubicación. Estamos listos para ayudarte a afiliar tu motel a Motel Partner y comenzar a recibir reservas.',
    };
}


export default function ContactUsPage() {
    return (
        <div>

            <div className="h-screen flex items-center justify-center bg-black rounded-b-xl px-4">
                <div className="text-center text-white max-w-3xl leading-relaxed space-y-16">
                    <h1 className="text-3xl md:text-5xl font-extrabold">
                        Nos encantaría hablar sobre cómo podemos trabajar juntos
                    </h1>
                    <p className="text-sm md:text-md font-light"
                        style={{ textAlign: 'justify', textAlignLast: 'center' }}
                    >
                        Somos expertos en gestión inteligente para moteles. Te ayudamos a centralizar y controlar todas tus reservas, habitaciones y operaciones desde una sola plataforma.
                    </p>
                </div>
            </div>

            <div className="px-4 md:px-10 2xl:px-64 py-10 grid grid-cols md:grid-cols-3 gap-10" >
                <div className="">
                    <div className="relative">
                        {/* Fondo azul desplazado */}
                        <div className="absolute top-2 left-2 w-full h-full bg-gray-300 rounded-lg"></div>

                        {/* Tarjeta principal */}
                        <div className="border border-black relative p-6 rounded-lg bg-white z-10 shadow-sm">
                            <p className="text-lg font-semibold" >WhatsApp</p>
                            <div className="flex items-center gap-2 mt-4" >
                                <IoLogoWhatsapp className="h-9 w-9 text-black" />
                                <p className="text-gray-600" >(+57) 304 1201032</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="">
                    <div className="relative">
                        {/* Fondo azul desplazado */}
                        <div className="absolute top-2 left-2 w-full h-full bg-gray-300 rounded-lg"></div>

                        {/* Tarjeta principal */}
                        <div className="border border-black relative p-6 rounded-lg bg-white z-10 shadow-sm">
                            <p className="text-lg font-semibold" >Email</p>
                            <div className="flex items-center gap-2 mt-4" >
                                <MdEmail className="h-9 w-9 text-black" />
                                <p className="text-gray-600">vibetel@gmail.com</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="">
                    <div className="relative">
                        {/* Fondo azul desplazado */}
                        <div className="absolute top-2 left-2 w-full h-full bg-gray-300 rounded-lg"></div>

                        {/* Tarjeta principal */}
                        <div className="border border-black relative p-6 rounded-lg bg-white z-10 shadow-sm">
                            <p className="text-lg font-semibold" >Ubicación</p>
                            <div className="flex items-center gap-2 mt-4" >
                                <MdLocationPin className="h-9 w-9 text-black" />
                                <p className="text-gray-600" >Sincelejo, Sucre, Colombia</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-4 md:px-10 2xl:px-64 grid grid-cols md:grid-cols-2 mt-5 gap-5 py-10" >
                <div>
                    <p className="text-2xl md:text-4xl font-bold" >Optimiza los procesos de tu motel y toma el control total con Vibetel, la plataforma integral de gestión y reservas</p>
                    <p className="text-gray-600 mt-2 text-md" >Con Vibetel, transforma la operación de tu motel. controla, gestiona y optimiza cada proceso en un solo lugar.</p>
                    <ul className="mt-10 space-y-7 md:space-y-4" >
                        <li className="flex items-center gap-3">
                            <FaRegCheckCircle className="h-6 w-6 flex-shrink-0" />
                            <p>Administra reservas, habitaciones, operaciones desde un solo panel intuitivo, en tiempo real y desde cualquier dispositivo.</p>
                        </li>
                        <li className="flex items-center gap-3">
                            <FaRegCheckCircle className="h-6 w-6 flex-shrink-0" />
                            <p>Desde el check-in hasta la limpieza de habitaciones, automatiza tareas repetitivas para reducir errores humanos y ahorrar tiempo al personal.</p>
                        </li>
                        <li className="flex items-center gap-3">
                            <FaRegCheckCircle className="h-6 w-6 flex-shrink-0" />
                            <p>Monitorea el flujo de reservas, controla accesos y lleva el historial completo de todas las operaciones. Nada se escapa de tu supervisión.</p>
                        </li>
                        <li className="flex items-center gap-3">
                            <FaRegCheckCircle className="h-6 w-6 flex-shrink-0" />
                            <p>   Con Vibetel siempre sabrás qué habitaciones están disponibles, ocupadas o próximas a liberar. Así evitas confusiones, reservas duplicadas y pérdidas de dinero por mala organización.</p>
                        </li>
                        <li className="flex items-center gap-3">
                            <FaRegCheckCircle className="h-6 w-6 flex-shrink-0" />
                            <p>Acompañamos a tu motel en cada paso, con soporte dedicado y mejoras continuas en la plataforma para adaptarnos a tus necesidades reales.</p>
                        </li>
                    </ul>
                </div>
                <div className="hidden md:block relative w-full h-[500px]"> {/* Aquí el contenedor necesario */}
                    <Image
                        src="/motel-partner/hombre.png"
                        alt="Imagen ilustrativa"
                        fill
                        className="object-contain" // o object-cover según lo que quieras
                    />
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
import Image from 'next/image';
import { Accordion } from "@/components";
import { FaCheck } from "react-icons/fa6";
import { RegisterForm } from "./ui/RegisterForm";

export async function generateMetadata() {
    return {
        title: 'Registra tu motel - Motel Partner',
        description: 'Sigue los pasos para registrar tu motel y comienza a gestionar tus reservas. Si tienes alguna duda, revisa nuestra sección de preguntas frecuentes para obtener más información.',
    };
}


const items = [
    { title: '¿En cuánto tiempo me convierto en un motel partner?', content: '¡Gracias por tu interés en convertirte en un Motel Partner en nuestra plataforma! Una vez que completes todos los procedimientos de registro y configuración de tu motel, nuestro equipo de validación revisará la información proporcionada. Este proceso generalmente toma hasta 24 horas. Una vez que se complete la validación, tu motel será activado como Motel Partner y podrás comenzar a recibir reservas a través de nuestra plataforma. ¡Estamos emocionados de tenerte como parte de nuestra red de socios y esperamos trabajar juntos para brindar una experiencia excepcional a nuestros usuarios!' },
    { title: '¿Cuál es el costo por registrarse en la plataforma?', content: 'En nuestra plataforma, el registro es completamente gratuito para todos nuestros asociados. No hay ningún costo asociado con la creación de una cuenta y convertirse en un miembro de nuestra comunidad. ¡Estamos comprometidos a hacer que el proceso de registro sea lo más accesible y conveniente posible para ti! Una vez que te registres, podrás disfrutar de todos los beneficios y funcionalidades que nuestra plataforma tiene para ofrecer. ¡Esperamos darte la bienvenida pronto!' },
    { title: '¿Qué comisión cobra la plataforma por cada reserva realizada?', content: 'Nuestra plataforma cobra una comisión por cada reserva realizada, la cual puede variar según la localidad. Para obtener información específica sobre el costo de la comisión en tu área, te invitamos a completar el proceso de registro. Durante este proceso, se te proporcionará más información detallada sobre la comisión aplicable a tu ubicación específica. Estamos comprometidos a ser transparentes sobre nuestros precios y garantizar que tengas toda la información que necesitas para tomar decisiones informadas. ¡Gracias por tu interés y estamos emocionados de tenerte como parte de nuestra comunidad!' },
    { title: '¿Cuáles son los beneficios de un motel socio de VibeTel?', content: 'Los beneficios de ser un Motel Socio de VibeTel son diversos y están diseñados para brindarte un mayor control y facilidad en la gestión de tu motel. Al convertirte en Motel Socio, tendrás acceso exclusivo al Portal de Aliados, donde podrás administrar todos los aspectos de tus habitaciones. Esto incluye la gestión de imágenes, precios, descripciones, promociones y disponibilidad. Además, podrás configurar fácilmente si tu motel está fuera de servicio o en servicio según sea necesario. Una de las ventajas clave es la capacidad de monitorear las reservas y servicios de habitaciones de tu motel a través del portal, lo que te permite realizar un seguimiento de tu desempeño y tomar decisiones informadas para optimizar tu negocio. Estamos aquí para brindarte el apoyo y las herramientas que necesitas para tener éxito en la plataforma. ¡Esperamos trabajar contigo y maximizar el potencial de tu motel!' },
    { title: "¿Cómo funciona el proceso de reserva desde la plataforma?", content: "El usuario selecciona la habitación, escoge la fecha de entrada y el sistema verifica la disponibilidad. Si está disponible, confirma la reserva y realiza el pago, que se transfiere al motel asociado. Luego, se registra la reserva." },
    { title: '¿Hay algún contrato o compromiso a largo plazo requerido para registrarse?', content: 'Contenido del Item 3' },
    { title: '¿Cómo puedo gestionar las reservas a través de la plataforma?', content: 'La plataforma de administración está diseñada para brindarte una experiencia sencilla e intuitiva. Desde el portal, podrás acceder a los detalles de cada reserva, realizar un seguimiento completo desde el momento en que el cliente ingresa al motel hasta su salida, y gestionar cualquier cambio necesario en tiempo real. Esto incluye la visualización del estado de la reserva, información del cliente, asignación de habitaciones y actualizaciones rápidas para mantener el control total de las operaciones.' },
    { title: '¿Puedo establecer precios diferentes para distintas temporadas o días de la semana a través de la plataforma?', content: '¡Sí! Como administrador del motel, tendrás total flexibilidad para modificar los precios según tu conveniencia. Podrás ajustar las tarifas de acuerdo con la época del año, temporadas altas o bajas, días de la semana e incluso eventos especiales, asegurándote de maximizar tus ingresos de manera estratégica.' },
    { title: '¿Qué tipo de soporte ofrece la plataforma a los moteles asociados?', content: 'La plataforma brinda soporte 24/7 a todos los moteles asociados. Ante cualquier duda o inconveniente, siempre podrás contar con nuestra asistencia. Además, el portal incluye un chat integrado que te permite comunicarte directamente con nuestro equipo de soporte para resolver cualquier situación de manera rápida y eficiente.' },
    { title: '¿Cómo me aseguro de que las reservas son legítimas y los pagos están garantizados?', content: 'La plataforma garantiza la legitimidad de las reservas, ya que no se genera ninguna sin que se haya completado previamente el pago a través de nuestro sistema. Trabajamos con la plataforma Vibetel, asociada a la pasarela de pago ePayco, respaldada por Davivienda. Esto asegura que todos los pagos se procesen de manera segura y confiable, brindándote tranquilidad y confianza en cada transacción.' },
    { title: '¿Cómo maneja la plataforma las cancelaciones y los reembolsos?', content: 'Debido a la naturaleza de la industria motelera, la plataforma no realiza reembolsos por cancelaciones, ya que esto podría generar pérdidas para nuestros moteles asociados. Los usuarios son informados de esta política al momento de realizar su reserva, asegurando transparencia en todo el proceso.' },
    { title: '¿Cómo puede la plataforma ayudar a aumentar la visibilidad de mi motel?', content: 'La plataforma Vibetel está diseñada para maximizar la visibilidad de tu motel y sus habitaciones. Al estar presente en un entorno digital especializado, podrás llegar a un mayor número de clientes potenciales. Además, nuestra plataforma incluye herramientas de promoción que destacan tus habitaciones, promociones especiales y servicios, atrayendo más usuarios y aumentando la ocupacion de tus habitaciones.' },
];

export default function HomePage() {
    return (
        <>


            <section
                className="w-full text-gray-900 mt-12 min-h-screen p-2 bg-center bg-cover bg-no-repeat relative"
                style={{ backgroundImage: `url('/app/room7.jpg')` }}
            >
                {/* Overlay for blurring and darkening */}
                <div className="absolute inset-0 bg-black bg-opacity-75" style={{ backdropFilter: 'blur(3px)' }}></div>

                <div className="max-w-7xl mx-auto px-2 md:px-4 mt-3 md:mt-0 sm:px-6 lg:px-4 flex flex-col lg:flex-row items-center justify-center relative " >
                    <div className="lg:w-3/6 w-full text-center lg:text-left lg:pr-0 pr-0">
                        <h1 className="font-medium mt-10 dm:mt-0 text-4xl lg:text-5xl text-white">
                            Conviértete en un Motel Partner
                        </h1>
                        <div className="text-white text-2xl mt-4 mb-3" >
                            Conecta, Gestiona y Crece
                        </div>
                        <p className="leading-relaxed text-start text-white">
                            Únete a VibeTel, la plataforma líder donde el amor encuentra su escapada perfecta.
                        </p>
                        <ul className="hidden md:block w-full mx-auto text-start lg:mx-0 space-y-4 md:space-y-3 mt-5 text-white list-inside">
                            <li className="flex items-start gap-2 justify-start">
                                <span className="min-w-[20px] h-5 flex items-center justify-center">
                                    <FaCheck size={15} className="text-green-500" />
                                </span>
                                <span className="leading-tight" style={{ textAlign: 'justify' }}>Aumenta tu visibilidad con una presencia en línea destacada.</span>
                            </li>
                            <li className="flex items-start gap-2 justify-start">
                                <span className="min-w-[20px] h-5 flex items-center justify-center">
                                    <FaCheck size={15} className="text-green-500" />
                                </span>
                                <span className="leading-tight" style={{ textAlign: 'justify' }}>Tus pagos están protegidos y garantizados.</span>
                            </li>
                            <li className="flex items-start gap-2 justify-start">
                                <span className="min-w-[20px] h-5 flex items-center justify-center">
                                    <FaCheck size={15} className="text-green-500" />
                                </span>
                                <span className="leading-tight" style={{ textAlign: 'justify' }}>Incrementa tus ingresos al atraer más clientes potenciales.</span>
                            </li>
                            <li className="flex items-start gap-2 justify-start">
                                <span className="min-w-[20px] h-5 flex items-center justify-center">
                                    <FaCheck size={15} className="text-green-500" />
                                </span>
                                <span className="leading-tight" style={{ textAlign: 'justify' }}>Accede a análisis detallados para optimizar tu ocupación.</span>
                            </li>
                            <li className="flex items-start gap-2 justify-start">
                                <span className="min-w-[20px] h-5 flex items-center justify-center">
                                    <FaCheck size={15} className="text-green-500" />
                                </span>
                                <span className="leading-tight" style={{ textAlign: 'justify' }}>Mejora la experiencia de tus clientes con procesos automatizados.</span>
                            </li>
                        </ul>
                    </div>
                    <RegisterForm />
                </div>
            </section>

            <div className="px-4 text-center md:px-16 2xl:px-64 mt-10" >
                <h1 className="font-semibold text-2xl md:text-3xl" >Requisitos de registro para tu Motel</h1>
                <p className='mt-2 md:mt-1' >Debes contar con todos los requisitos para empezar el registro de tu motel. ¿Qué esperas?</p>
            </div>

            <div className="mt-16 px-4 md:px-16 2xl:px-64">
                <ul>
                    <li className="flex pb-10 mb-8 border-b border-gray-200">
                        <div className="mr-8 hidden md:block">
                            <span className="flex justify-center items-center w-14 h-14 bg-red-200/50  text-lg font-bold rounded-full text-red-600 ">1</span>
                        </div>
                        <div className="">
                            <h3 className="text-xl md:text-2xl font-semibold mb-2">
                                Documentos para registrarse en VibeTel
                            </h3>
                            <ul className="ps-5 mt-2 space-y-1 text-gray-800 list-disc list-inside">
                                <li className="text-md pl-5 -indent-6">Información bancaria</li>
                                <li className="text-md pl-5 -indent-6">Documento de identidad del representante legal</li>
                                <li className="text-md pl-5 -indent-6">Cámara de comercio (Persona jurídica)</li>
                            </ul>
                        </div>
                    </li>
                    <li className="flex pb-10 mb-8 border-b border-gray-200">
                        <div className="mr-8 hidden md:block">
                            <span className="flex justify-center items-center w-14 h-14 bg-red-200/50  text-lg font-bold rounded-full text-red-600 ">2</span>
                        </div>
                        <div className="">
                            <h3 className="text-xl md:text-2xl font-semibold mb-2">Habitaciones</h3>
                            <ul className="ps-5 mt-2 space-y-1 text-gray-800 list-disc list-inside">
                                <li className='text-md pl-5 -indent-6'>Debe tener como mínimo 10 habitaciones para registrar</li>
                                <li className='text-md pl-5 -indent-6'>Cada habitación debe tener como mínimo una imagen</li>
                                <li className='text-md pl-5 -indent-6'>Descripción de cada habitación</li>
                                <li className='text-md pl-5 -indent-6'>Detalles de lo que incluye la habitación</li>
                                <li className='text-md pl-5 -indent-6'>Precio de la habitación</li>
                            </ul>
                        </div>
                    </li>
                    <li className="flex pb-10 ">
                        <div className="mr-8 hidden md:block">
                            <span className="flex justify-center items-center w-14 h-14 bg-red-200/50  text-lg font-bold rounded-full text-red-600 ">3</span>
                        </div>
                        <div className="">
                            <h3 className="text-xl md:text-2xl font-semibold mb-2">Perfil</h3>
                            <ul className="ps-5 mt-2 space-y-1 text-gray-800 list-disc list-inside">
                                <li className='text-md pl-5 -indent-6'>Nombre del motel</li>
                                <li className='text-md pl-5 -indent-6'>Descripción del motel</li>
                                <li className='text-md pl-5 -indent-6'>Imagen del motel</li>
                                <li className='text-md pl-5 -indent-6'>Lugar de ubicación</li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>

            <div className="bg-red-600 mt-10 text-white py-20 px-4 md:px-10 2xl:px-64 grid grid-cols-1 md:grid-cols-2 items-center gap-10">
                <div>
                    <h2 className="text-2xl md:text-4xl font-extrabold mb-6">
                        ¡Moderniza tu motel hoy mismo y da el salto a la era digital con Vibetel!
                    </h2>
                    <div className="bg-white rounded-xl p-6 shadow-lg max-w-xl">
                        <div className="flex items-center gap-4 mb-4">
                            <Image
                                src="/motel-partner/ceo-google.jpg"
                                alt="Eric Schmidt"
                                className="w-12 h-12 rounded-full object-cover"
                                width={100}
                                height={100}
                            />
                            <div>
                                <p className="font-semibold text-black">Eric Schmidt</p>
                                <p className="text-sm text-gray-900">Ex CEO de Google</p>
                            </div>
                        </div>
                        <p className="text-gray-700 text-md" style={{ textAlign: 'justify' }}>
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

            <div className="bg-white 2xl:px-64" >
                <div className="mt-10 px-2 mb-10 text-center" >
                    <h1 className={`  text-3xl md:text-4xl `} >Preguntas frecuentes</h1>
                </div>
                <div className="px-4 md:px-10 mt-3 md:mt-5 mb-10" >
                    <Accordion items={items} />
                </div>
            </div>
        </>
    );
}
import { FaFileContract } from "react-icons/fa";

export async function generateMetadata() {
    return {
        title: 'Política de Privacidad - Motel Partner',
        description: 'Conoce cómo nuestro sistema protege la información de los moteles asociados. Políticas de privacidad, uso de datos y seguridad para partners.',
    };
}

export default function PolicyAndPrivacyPage() {
    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Main Content */}
            <div className="container mx-auto px-4 md:px-10 2xl:px-64 mt-16 py-12 ">
                <div className="">
                    {/* Title Section */}
                    <div className="py-3">
                        <div className="flex items-center">
                            <FaFileContract className="text-black text-3xl mr-4" />
                            <div>
                                <h1 className="text-lg md:text-3xl font-bold text-black">Política de Privacidad</h1>
                                <p className="text-xs md:text-base text-black">Última actualización: {new Date().toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                            </div>
                        </div>
                        <p className="text-xs md:text-lg mt-4 md:mt-2" style={{ textAlign: 'justify' }}>
                            La presente Política de Privacidad establece los términos bajo los cuales nuestro sistema de gestión para moteles recopila, utiliza y protege la información proporcionada por los establecimientos asociados. Esta política aplica a todos los datos ingresados en nuestra plataforma, incluyendo información sobre habitaciones, estados de limpieza, registros de acceso y datos operativos generados durante el uso continuo del servicio.
                        </p>
                    </div>

                    <div className="py-3">
                        <div className="prose max-w-none">
                            {/* ÁMBITO DE APLICACIÓN */}
                            <div className="mb-8">
                                <h2 className="text-md md:text-xl font-bold text-black mb-4">ÁMBITO DE APLICACIÓN</h2>
                                <p className="text-xs md:text-base text-justify">
                                    Esta política cubre toda la información proporcionada voluntariamente por los moteles asociados al registrarse en nuestra plataforma, así como los datos generados automáticamente por el sistema durante su operación diaria. Incluye datos de identificación del establecimiento, información de contacto de los administradores, detalles de las habitaciones disponibles, registros de acceso a instalaciones, estados de limpieza y mantenimiento, así como información financiera necesaria para procesar pagos y comisiones. La política aplica tanto a datos almacenados en nuestros servidores como a aquellos procesados temporalmente en dispositivos móviles con acceso al sistema.
                                </p>
                            </div>

                            {/* FINALIDAD DEL TRATAMIENTO */}
                            <div className="mb-8">
                                <h2 className="text-md md:text-xl font-bold text-black mb-4">FINALIDAD DEL TRATAMIENTO DE DATOS</h2>
                                <p className="text-xs md:text-base text-justify">
                                    Los datos recopilados tienen como finalidad principal permitir el funcionamiento óptimo de nuestro sistema de gestión para moteles. Esto incluye la provisión de herramientas para el seguimiento en tiempo real del estado de las habitaciones, el control automatizado de accesos, la gestión de procesos de limpieza y mantenimiento, así como la generación de reportes operativos y financieros. La información se utiliza para mantener actualizado el inventario de habitaciones disponibles, gestionar reservas, controlar accesos mediante sistemas automatizados, coordinar equipos de limpieza y proveer análisis estadísticos que ayuden a mejorar la operación del establecimiento. Adicionalmente, ciertos datos son procesados para cumplir con obligaciones legales y fiscales derivadas de la relación comercial con cada motel asociado.
                                </p>
                            </div>

                            {/* BASES LEGALES */}
                            <div className="mb-8">
                                <h2 className="text-md md:text-xl font-bold text-black mb-4">BASES LEGALES PARA EL TRATAMIENTO</h2>
                                <p className="text-xs md:text-base text-justify">
                                    El tratamiento de datos personales se realiza en cumplimiento de la legislación aplicable en materia de protección de datos. Para la mayoría de los datos operativos, la base legal es la ejecución del contrato de servicios suscrito con cada motel asociado, ya que esta información es estrictamente necesaria para proporcionar las funcionalidades acordadas. En el caso de datos de contacto de empleados y administradores, el tratamiento se basa en el interés legítimo de mantener canales de comunicación efectivos para la prestación del servicio. Para usos secundarios como mejoras del sistema o marketing, se obtendrá consentimiento expreso cuando sea requerido por la normativa aplicable. Los datos financieros y fiscales son procesados para cumplir con obligaciones legales impuestas a ambas partes.
                                </p>
                            </div>

                            {/* TRANSFERENCIAS INTERNACIONALES */}
                            <div className="mb-8">
                                <h2 className="text-md md:text-xl font-bold text-black mb-4">TRANSFERENCIAS INTERNACIONALES</h2>
                                <p className="text-xs md:text-base text-justify">
                                    Como parte de nuestra infraestructura tecnológica, algunos proveedores de servicios en la nube que utilizamos pueden procesar datos en ubicaciones fuera del país donde opera el motel asociado. Estas transferencias internacionales se realizan exclusivamente a empresas que cumplen con estándares adecuados de protección de datos, ya sea mediante decisiones de adecuación, cláusulas contractuales estándar u otros mecanismos reconocidos por las autoridades de protección de datos. En todos los casos, mantenemos evaluaciones actualizadas de las medidas de seguridad implementadas por estos proveedores y limitamos estrictamente el acceso que tienen a la información sensible de los establecimientos asociados.
                                </p>
                            </div>

                            {/* MEDIDAS DE SEGURIDAD */}
                            <div className="mb-8">
                                <h2 className="text-md md:text-xl font-bold text-black mb-4">MEDIDAS DE SEGURIDAD IMPLEMENTADAS</h2>
                                <p className="text-xs md:text-base text-justify">
                                    Hemos establecido un sistema integral de seguridad de la información que incluye medidas técnicas, organizativas y legales para proteger los datos de los moteles asociados. A nivel técnico, implementamos encriptación de extremo a extremo para datos sensibles, controles de acceso basados en roles con autenticación multifactor para funciones administrativas, y monitoreo continuo de posibles vulnerabilidades. Organizativamente, hemos definido políticas claras de acceso a la información, capacitación obligatoria en protección de datos para nuestro personal, y procedimientos documentados para responder a incidentes de seguridad. Legalmente, todos los empleados y contratistas firman acuerdos de confidencialidad, y mantenemos contratos con proveedores que especifican sus obligaciones en materia de protección de datos. Realizamos auditorías periódicas para verificar la efectividad de estas medidas.
                                </p>
                            </div>

                            {/* CONSERVACIÓN DE DATOS */}
                            <div className="mb-8">
                                <h2 className="text-md md:text-xl font-bold text-black mb-4">PLAZOS DE CONSERVACIÓN DE DATOS</h2>
                                <p className="text-xs md:text-base text-justify">
                                    Los datos personales se conservarán durante el tiempo necesario para cumplir con las finalidades descritas en esta política y para atender a posibles responsabilidades legales. Como norma general, la información básica del establecimiento se mantiene mientras dure la relación comercial y hasta cinco años después de su terminación para fines legales. Los datos operativos detallados, como registros de acceso a habitaciones y estados de limpieza, se conservan por períodos más cortos (generalmente entre 6 meses y 2 años) debido a su volumen y naturaleza operativa. Los datos financieros se archivan durante los plazos requeridos por la legislación fiscal aplicable. Una vez finalizados estos períodos, los datos se eliminan de forma segura o se anonimizan para fines estadísticos o de mejora del sistema.
                                </p>
                            </div>

                            {/* DERECHOS DE LOS TITULARES */}
                            <div className="mb-8">
                                <h2 className="text-md md:text-xl font-bold text-black mb-4">DERECHOS DE LOS MOTELES ASOCIADOS</h2>
                                <p className="text-xs md:text-base text-justify">
                                    Como responsables de los datos de sus empleados y administradores, los moteles asociados pueden ejercer ante nosotros los derechos de acceso, rectificación, supresión, limitación del tratamiento, oposición y portabilidad de los datos personales bajo los términos establecidos en la legislación aplicable. Para ejercer estos derechos, el representante legal del establecimiento deberá presentar una solicitud escrita mediante los canales oficiales de comunicación, acompañada de documentación que acredite su identidad y representación. Responderemos a todas las solicitudes en el plazo máximo establecido por ley, aunque ciertas solicitudes podrían afectar la capacidad del sistema para proporcionar servicios completos, en cuyo caso se notificará anticipadamente al establecimiento.
                                </p>
                            </div>

                            {/* CAMBIOS A LA POLÍTICA */}
                            <div className="mb-8">
                                    <h2 className="text-md md:text-xl font-bold text-black mb-4">MODIFICACIONES A LA POLÍTICA</h2>
                                <p className="text-xs md:text-base text-justify">
                                    Nos reservamos el derecho de modificar esta Política de Privacidad para adaptarla a cambios legislativos, jurisprudenciales o técnicos. Las modificaciones sustanciales serán notificadas con al menos treinta días de antelación a su entrada en vigor, mediante comunicación enviada al correo electrónico principal registrado en el sistema y mediante aviso visible en el panel de control de la plataforma. Se considerará que los moteles asociados aceptan los cambios si continúan utilizando nuestros servicios después de la entrada en vigor de las modificaciones. En caso de desacuerdo con los cambios, el establecimiento podrá terminar el contrato de servicios conforme a lo establecido en los términos y condiciones generales.
                                </p>
                            </div>

                            {/* CONTACTO */}
                            <div className="mb-8">
                                <h2 className="text-md md:text-xl font-bold text-black mb-4">INFORMACIÓN DE CONTACTO</h2>
                                <p className="text-xs md:text-base text-justify">
                                    Para cualquier consulta relacionada con esta Política de Privacidad o para ejercer derechos sobre protección de datos, los moteles asociados pueden contactar a nuestro Delegado de Protección de Datos a través del correo electrónico privacidad@sistemamoteles.com, o por correspondencia física dirigida a la Oficina de Protección de Datos en la Calle 123 #45-67, Bogotá, Colombia. También pueden utilizar el formulario de contacto disponible en la sección de configuración de su panel administrativo. Atenderemos todas las consultas en un plazo máximo de diez días hábiles, aunque solicitudes complejas podrían requerir plazos adicionales que serán debidamente comunicados.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
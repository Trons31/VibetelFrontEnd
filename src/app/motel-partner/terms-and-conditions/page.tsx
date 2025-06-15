import React from 'react';
import { Metadata } from 'next';
import { FaExclamationTriangle, FaFileContract } from 'react-icons/fa';

export const metadata: Metadata = {
  title: 'Términos y Condiciones - Motel Partner',
  description: 'Términos y condiciones para moteles afiliados a la plataforma Vibetel',
};

export default function TermsAndConditionsPage() {
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
                <h1 className="text-lg md:text-3xl font-bold text-black">Términos y Condiciones</h1>
                <p className="text-xs md:text-base text-black ">Última actualización: {new Date().toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>
            </div>
            <p className="text-xs md:text-lg mt-4 md:mt-2" style={{ textAlign: 'justify' }}>
              Las cláusulas representan los términos y condiciones generales de uso de los servicios ofrecidos por la empresa <span className="font-semibold">Vibetel SAS</span>, plataforma tecnológica dedicada a facilitar la gestión y reserva de habitaciones por parte de establecimientos de hospedaje Moteles. Al utilizar nuestros servicios, usted acepta cumplir con los presentes términos y condiciones, los cuales rigen la relación entre <span className="font-semibold">Vibetel SAS</span> y los Moteles registrados en la plataforma.
            </p>
          </div>

          {/* Content */}
          <div className="py-3">
            <div className="prose max-w-none">
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <FaExclamationTriangle className="h-5 w-5 text-blue-500" />
                  </div>
                  <div className="ml-3">
                    <p className="text-xs md:text-sm text-blue-700">
                      Al acceder y utilizar la plataforma Vibetel, usted acepta estar sujeto a estos términos y condiciones.
                      Si no está de acuerdo con alguna parte de estos términos, no podrá acceder a la plataforma.
                    </p>
                  </div>
                </div>
              </div>

              <h2 className="text-lg md:text-xl font-bold mt-8 mb-4">Definiciones</h2>
              <p className="text-xs md:text-base text-justify mb-6">
                Para los efectos de estos términos y condiciones, se entenderá por Plataforma al conjunto de sitios web, aplicaciones móviles, interfaces de programación de aplicaciones (APIs) y todos los servicios digitales proporcionados por Vibetel SAS. El término Motel se refiere específicamente a cualquier establecimiento de hospedaje temporal que se registra y utiliza activamente los servicios de la Plataforma para la gestión de sus operaciones. Los Servicios comprenden todas las funcionalidades, herramientas y características técnicas puestas a disposición a través de la Plataforma, incluyendo pero no limitado a sistemas de reservas, gestión de habitaciones, control de accesos y generación de reportes. El Contenido abarca toda la información, datos, textos, software, gráficos, mensajes, imágenes, videos, audio y demás materiales disponibles o generados a través del uso de la Plataforma.
              </p>

              <h2 className="text-lg md:text-xl font-bold mt-8 mb-4">Registro y Cuenta</h2>
              <p className="text-xs md:text-base text-justify mb-6">
                Para hacer uso completo de las funcionalidades de la Plataforma, es requisito indispensable completar el proceso de registro y crear una cuenta asociada al establecimiento. Durante este proceso, el Motel se compromete formalmente a proporcionar información veraz, exacta, actualizada y completa sobre su identidad, datos de contacto, información legal y características operativas. Es responsabilidad exclusiva del Motel mantener la confidencialidad y seguridad de las credenciales de acceso, incluyendo pero no limitado a contraseñas, códigos de verificación y cualquier otro mecanismo de autenticación implementado por la Plataforma. El Motel deberá notificar de manera inmediata a Vibetel sobre cualquier actividad sospechosa o no autorizada relacionada con su cuenta. Todas las acciones realizadas mediante el uso de las credenciales de acceso serán atribuidas al Motel registrado, quien asume plena responsabilidad por las mismas. Para completar el registro, el representante legal del Motel debe ser mayor de 18 años y tener capacidad legal plena para celebrar contratos vinculantes.
              </p>

              <h2 className="text-lg md:text-xl font-bold mt-8 mb-4">Uso de la Plataforma</h2>
              <p className="text-xs md:text-base text-justify mb-6">
                Al hacer uso de la Plataforma, el Motel se obliga a utilizarla exclusivamente para fines lícitos, comerciales y de acuerdo con lo establecido en estos términos y condiciones. Queda estrictamente prohibido emplear la Plataforma de manera que pueda causar daños, interrupciones, sobrecargas o perjuicios a la infraestructura tecnológica, a otros usuarios o a Vibetel. El Motel se abstendrá de intentar acceder a áreas restringidas de la Plataforma sin autorización expresa, así como de interferir con los mecanismos de seguridad, procesos automatizados o funcionamiento normal del sistema. Es responsabilidad del Motel mantener actualizada en tiempo real toda la información relacionada con su establecimiento, incluyendo disponibilidad de habitaciones, tarifas, servicios ofrecidos y políticas particulares. El Motel reconoce y acepta que todos los derechos de propiedad intelectual sobre la Plataforma, su contenido subyacente y cualquier desarrollo derivado pertenecen exclusivamente a Vibetel o a sus licenciantes, comprometiéndose a respetar dichos derechos en todo momento.
              </p>

              <h2 className="text-lg md:text-xl font-bold mt-8 mb-4">Servicios y Tarifas</h2>
              <p className="text-xs md:text-base text-justify mb-6">
                Vibetel ofrece diversos planes de suscripción adaptados a las necesidades operativas de diferentes tipos de establecimientos. Cada plan tiene características específicas, limitaciones funcionales y tarifas asociadas que son comunicadas claramente durante el proceso de contratación. Al suscribirse a un plan determinado, el Motel acepta formalmente pagar todas las tarifas aplicables según la periodicidad y condiciones establecidas en el contrato correspondiente. Vibetel se reserva el derecho de modificar las estructuras tarifarias, previa notificación con un mínimo de treinta días calendario de anticipación, siendo responsabilidad del Motel revisar periódicamente estas condiciones. Los cambios en las tarifas no tendrán efecto retroactivo y no afectarán los pagos ya realizados o comprometidos durante períodos ya contratados. En caso de incrementos tarifarios, el Motel tendrá derecho a terminar el contrato dentro de los quince días siguientes a la notificación, sin penalización alguna.
              </p>
 
              <h2 className="text-lg md:text-xl font-bold mt-8 mb-4">Propiedad Intelectual</h2>
              <p className="text-xs md:text-base text-justify mb-6">
                La Plataforma en su totalidad, incluyendo todos sus componentes como software base, interfaces gráficas, diseños, estructuras de datos, algoritmos, documentación, contenidos multimedia, marcas comerciales y cualquier otro elemento relacionado, son propiedad exclusiva de Vibetel o de sus respectivos licenciantes, encontrándose protegidos por las leyes nacionales e internacionales sobre propiedad intelectual e industrial. Se encuentra estrictamente prohibida cualquier forma de reproducción, distribución, modificación, creación de obras derivadas, exhibición pública, transmisión o explotación comercial de la Plataforma o cualquiera de sus componentes, salvo autorización expresa y por escrito de Vibetel. El Motel adquiere únicamente un derecho limitado, no exclusivo, intransferible y revocable para utilizar la Plataforma conforme a estos términos y condiciones, sin que medie ningún tipo de cesión o transferencia de derechos de propiedad intelectual. Vibetel se reserva todos los derechos no otorgados expresamente en este documento.
              </p>

              <h2 className="text-lg md:text-xl font-bold mt-8 mb-4">Privacidad y Datos</h2>
              <p className="text-xs md:text-base text-justify mb-6">
                Vibetel se compromete a proteger la privacidad y seguridad de los datos personales proporcionados por los Moteles y sus clientes, de acuerdo con lo establecido en su Política de Privacidad, la cual forma parte integral de estos términos y condiciones. Al utilizar la Plataforma, el Motel acepta expresamente el tratamiento de sus datos personales conforme a lo dispuesto en dicha política. El Motel, como responsable del tratamiento de datos de sus clientes, asume la obligación de cumplir con toda la normativa aplicable en materia de protección de datos personales, implementando las medidas técnicas, organizativas y legales necesarias para garantizar la seguridad y confidencialidad de la información de sus huéspedes. Vibetel actuará en estos casos como encargado del tratamiento, siguiendo siempre las instrucciones del Motel y aplicando los estándares más altos de seguridad informática. En ningún caso Vibetel será responsable por el incumplimiento del Motel en sus obligaciones como responsable del tratamiento de datos personales de sus clientes.
              </p>

              <h2 className="text-lg md:text-xl font-bold mt-8 mb-4">Limitación de Responsabilidad</h2>
              <p className="text-xs md:text-base text-justify mb-6">
                En el máximo grado permitido por la ley aplicable, Vibetel no será responsable bajo ningún concepto por daños directos, indirectos, incidentales, especiales, consecuentes o ejemplares que puedan surgir del uso o imposibilidad de uso de la Plataforma, incluyendo pero no limitado a pérdida de beneficios, interrupción del negocio, pérdida de buena voluntad, pérdida de datos u otras pérdidas intangibles, incluso si Vibetel ha sido advertido de la posibilidad de tales daños. Esta limitación se aplica independientemente de la teoría legal en la que se base la reclamación (contrato, agravio, negligencia u otra) y aunque cualquier recurso establecido en estos términos falle en su propósito esencial. Vibetel no garantiza que la Plataforma estará disponible de forma ininterrumpida, segura o libre de errores, ni que los defectos serán corregidos. El Motel reconoce que el uso de la Plataforma se realiza bajo su propio riesgo y discreción.
              </p>

              <h2 className="text-lg md:text-xl font-bold mt-8 mb-4">Modificaciones de los Términos</h2>
              <p className="text-xs md:text-base text-justify mb-6">
                Vibetel se reserva el derecho exclusivo de modificar, actualizar o complementar estos términos y condiciones en cualquier momento, con el fin de adaptarse a cambios regulatorios, evoluciones tecnológicas o mejoras en los servicios ofrecidos. Las modificaciones entrarán en vigor a partir de la fecha de su publicación en la Plataforma, la cual actualizará automáticamente la indicación de Última actualización. Vibetel podrá, a su discreción, notificar cambios sustanciales mediante comunicaciones directas a los Moteles registrados. El uso continuado de la Plataforma después de la entrada en vigor de las modificaciones constituirá aceptación expresa de los nuevos términos por parte del Motel. Si el Motel no está de acuerdo con los cambios, su único recurso será discontinuar el uso de la Plataforma y dar por terminado el contrato de servicios, sin derecho a reembolsos por pagos anticipados.
              </p>

              <h2 className="text-lg md:text-xl font-bold mt-8 mb-4">Terminación</h2>
              <p className="text-xs md:text-base text-justify mb-6">
                Vibetel podrá suspender o terminar inmediatamente el acceso del Motel a la Plataforma, sin necesidad de previo aviso ni responsabilidad alguna, en caso de que determine, a su exclusivo criterio, que el Motel ha incumplido cualquiera de las disposiciones de estos términos y condiciones. La terminación no eximirá al Motel del pago de obligaciones pendientes al momento del cese. Por su parte, el Motel podrá dar por terminado el contrato en cualquier momento, previo cumplimiento de sus obligaciones económicas y mediante notificación por escrito con al menos treinta días de anticipación. Ciertas disposiciones de estos términos, que por su naturaleza deban permanecer vigentes (como las relativas a propiedad intelectual, limitaciones de responsabilidad, confidencialidad y otras similares), sobrevivirán a la terminación del contrato. Tras la terminación, Vibetel podrá conservar los datos del Motel por el tiempo estrictamente necesario para cumplir con obligaciones legales o regulatorias.
              </p>

              <h2 className="text-lg md:text-xl font-bold mt-8 mb-4">Ley Aplicable</h2>
              <p className="text-xs md:text-base text-justify mb-6">
                Estos términos y condiciones, así como cualquier controversia que surja de o en relación con los mismos o con el uso de la Plataforma, se regirán e interpretarán de conformidad con las leyes de la República de Colombia, sin aplicación de sus principios de conflicto de leyes. Las partes acuerdan someterse a la jurisdicción exclusiva de los tribunales ordinarios de la ciudad de Bogotá, D.C., Colombia, para resolver cualquier controversia derivada de estos términos, renunciando expresamente a cualquier otro fuero o jurisdicción que pudiera corresponderles. En caso de que cualquier disposición de estos términos sea declarada inválida o inaplicable por autoridad competente, dicha invalidez o inaplicabilidad no afectará las demás disposiciones, las cuales permanecerán en pleno vigor y efecto. Vibetel podrá ceder estos términos y condiciones total o parcialmente en cualquier momento, mientras que el Motel no podrá realizar cesiones sin consentimiento previo por escrito de Vibetel.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import { Accordion } from '@/components';
import { Lobster } from '@/config/fonts';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  allRoom: number;
  allUser: number;
  allMotel: number;
}

const items = [
  {
    title: '¿Cómo puedo reservar una habitación?',
    content: 'Para reservar una habitación, selecciona la habitación de tu preferencia, elige la fecha de entrada y continúa con el proceso de pago. Una vez confirmado el pago, podrás ver los detalles de tu reserva en la plataforma, incluyendo el código de acceso que necesitarás para ingresar al motel.'
  },
  {
    title: '¿Puedo reservar sin registrarme?',
    content: 'Sí, puedes realizar una reserva anónima sin necesidad de registrarte. No almacenamos tu información personal, y recibirás un código de acceso a través de correo electrónico o SMS para gestionar tu reserva.'
  },
  {
    title: '¿Cuáles son los beneficios de registrarme en la plataforma?',
    content: 'Al registrarte, podrás gestionar tus reservas de manera más sencilla, acceder a beneficios exclusivos y consultar tus reservas en cualquier momento desde tu cuenta.'
  },
  {
    title: '¿Cómo accedo al motel con mi reserva?',
    content: 'Debes presentar el código de acceso que recibiste al momento de hacer la reserva. Si eres un usuario registrado, puedes encontrarlo en la sección de reservas de tu cuenta. Si hiciste una reserva anónima, puedes consultarlo en la página de reserva anónima.'
  },
  {
    title: '¿Puedo cancelar una reserva?',
    content: 'Sí, puedes cancelar tu reserva hasta 30 minutos antes de la hora de inicio del servicio. Después de este tiempo, la reserva no podrá ser cancelada.'
  },
  {
    title: '¿Se ofrece reembolso si cancelo mi reserva?',
    content: 'No, debido a la naturaleza de la industria de los moteles, actualmente no realizamos reembolsos por cancelaciones.'
  },
  {
    title: '¿Los pagos son seguros?',
    content: 'Sí, nuestros pagos son totalmente seguros y están respaldados por Davivienda, garantizando la protección de tu información y transacciones.'
  },
  {
    title: '¿Puedo modificar la fecha o la habitación después de reservar?',
    content: 'No, una vez confirmada la reserva, no es posible modificar la fecha ni la habitación seleccionada. En este caso, deberás cancelar la reserva (si aún está dentro del tiempo permitido) y realizar una nueva.'
  },
  {
    title: '¿Donde encuentro mi código de acceso al motel?',
    content: 'Si eres un usuario registrado, puedes encontrar el código en la sección de reservas de tu cuenta. Si hiciste una reserva anónima, puedes encontrar el codigo ingresando tu correo o número de teléfono en la página de reservas anónimas.'
  },
  {
    title: '¿Puedo pagar en efectivo en el motel?',
    content: 'No, todas las reservas deben pagarse en línea para garantizar la disponibilidad de la habitación.'
  },
  {
    title: '¿Qué sucede si llego tarde a mi reserva?',
    content: 'Cada motel tiene un tiempo de espera máximo, el cual se te mostrará durante el proceso de reserva y en los detalles de tu reserva para que siempre lo tengas presente. Si no llegas dentro de este tiempo, la reserva se actualizará automáticamente a "No iniciada" y ya no podrás tomar el servicio. No se realizará reembolso en estos casos.'
  },
  {
    title: '¿Cuáles son los métodos de pago disponibles?',
    content: 'Actualmente, aceptamos pagos con tarjetas de crédito y débito, así como Nequi y PSE, a través de una plataforma segura respaldada por Davivienda.'
  },
  {
    title: '¿Cómo puedo contactar con soporte si tengo un problema con mi reserva?',
    content: 'Nuestra plataforma ofrece soporte al usuario 24/7 para cualquier inconveniente que puedas tener. Puedes comunicarte con nuestro equipo de soporte a través de la sección de ayuda en la plataforma, mediante el correo electrónico de atención al cliente o llamando a nuestra línea telefónica 304 120 1032.'
  }

];


export const UiPageAbout = ({ allRoom, allMotel, allUser }: Props) => {
  return (
    <>
      <div className="h-screen flex items-center justify-center">
        <section className="w-full h-full bg-cover bg-center relative" style={{ backgroundImage: "url('/app/room7.jpg')" }}>
          <div className="absolute inset-0 bg-black opacity-80"></div>

          <div className="flex flex-col items-center justify-center h-full relative z-5 text-center text-white">
            <h1 className="text-5xl font-medium mb-6">Bienvenido a <span className={`${Lobster.className} antialiased  font-bold`}>Vibe</span>
              <span className={` ${Lobster.className} text-red-500 `}>Tel</span></h1>
            <p className=" text-xl md:text-3xl mx-5 mb-12" style={{ textAlign: 'justify', textAlignLast: 'center' }}>
              ¡Tu escapada perfecta te está esperando! Reserva tu habitación de motel con un clic y sumérgete en una aventura llena de confort y emoción. No dejes que esta oportunidad se escape. ¡Empieza a explorar y vive momentos inolvidables!
            </p>
            <Link href="/home" className="bg-red-500 text-white py-4 px-12 rounded-full hover:bg-red-600 transition-all duration-150">
              Ver habitaciones
            </Link>
          </div>
        </section>
      </div>

      <section className="text-gray-600 mt-24 mb-20 body-font">
        <div className="container px-5 mx-auto">
          <div className="flex flex-wrap -m-4 text-center">
            <div className="p-4 sm:w-1/4 w-1/2">
              <h2 className="title-font font-medium sm:text-4xl text-3xl text-gray-900">{allUser} {allUser > 1000 ? "K" : ""} </h2>
              <p className="leading-relaxed">Usuarios</p>
            </div>
            <div className="p-4 sm:w-1/4 w-1/2">
              <h2 className="title-font font-medium sm:text-4xl text-3xl text-gray-900">4</h2>
              <p className="leading-relaxed">Reservas diarias</p>
            </div>
            <div className="p-4 sm:w-1/4 w-1/2">
              <h2 className="title-font font-medium sm:text-4xl text-3xl text-gray-900">{allRoom} {allRoom > 1000 ? "K" : ""} </h2>
              <p className="leading-relaxed">Habitaciones</p>
            </div>
            <div className="p-4 sm:w-1/4 w-1/2">
              <h2 className="title-font font-medium sm:text-4xl text-3xl text-gray-900">{allMotel} {allMotel > 1000 ? "K" : ""} </h2>
              <p className="leading-relaxed">Moteles</p>
            </div>

          </div>
        </div>
      </section>

      <section className="text-gray-600 mt-24 body-font">
        <div className="container px-5 py-2 mx-auto flex flex-wrap">
          <div className="flex flex-wrap -mx-4 mt-auto mb-auto lg:w-1/2 sm:w-2/3 justify-center sm:pr-10">
            <div className="w-full sm:p-4 px-4 mb-6">
              <h1 className="text-2xl md:text-4xl font-bold text-gray-900 text-center lg:text-left">
                ¿Qué es VibeTel?
              </h1>
              <p className="mt-4 text-gray-700 text-md md:text-lg text-justify leading-relaxed"
                style={{ textAlign: 'justify' }}>
                VibeTel es la plataforma líder en digitalización de moteles en Colombia, ofreciendo a los usuarios la posibilidad de reservar habitaciones en línea de forma rápida, privada y segura.
                Fundada en 2024 y lanzada en 2025, surge para cerrar la brecha tecnológica en este sector, brindando a los moteles una solución integral para la gestión de reservas y clientes.
              </p>
            </div>

          </div>
          <div className="lg:w-1/2 sm:w-1/3 w-full rounded-lg overflow-hidden mt-6 sm:mt-0 relative aspect-square">
            <Image
              className="object-cover"
              src="/app/About.jpg"
              alt=""
              fill
            />
          </div>
        </div>
      </section>

      {/* Secciones de Misión, Visión y Beneficios */}
      {/* <div className="grid md:grid-cols-2 lg:grid-cols-3 mt-24 gap-8">
          
            <div className="bg-white shadow-lg border border-gray-200 rounded-lg p-6 text-center">
              <h2 className="text-xl font-semibold text-gray-900">Nuestra Misión</h2>
              <p className="mt-3 text-gray-600 text-sm leading-relaxed" style={{ textAlign: 'justify' }}>
                Ser la mejor plataforma de reservas de habitaciones en línea, garantizando privacidad y seguridad a nuestros usuarios, mientras brindamos a los moteles herramientas innovadoras para potenciar sus ventas y gestión.
              </p>
            </div>

            
            <div className="bg-white shadow-lg rounded-lg border border-gray-200  p-6 text-center">
              <h2 className="text-xl font-semibold text-gray-900">Nuestra Visión</h2>
              <p className="mt-3 text-gray-600 text-sm leading-relaxed" style={{ textAlign: 'justify' }}>
                Convertirnos en la plataforma líder en Colombia en la digitalización de moteles, revolucionando la industria con innovación, accesibilidad y eficiencia en la gestión de reservas.
              </p>
            </div>

            
            <div className="bg-white shadow-lg rounded-lg border border-gray-200  p-6 text-center">
              <h2 className="text-xl font-semibold text-gray-900">¿Eres un motel?</h2>
              <p className="mt-3 text-gray-600 text-sm leading-relaxed" style={{ textAlign: 'justify' }}>
                Únete a VibeTel y potencia tu negocio. Regístrate ahora y aprovecha nuestras herramientas para optimizar reservas, promociones y atención al cliente.
              </p>
              <Link href="/motel-partner" className="mt-4 inline-block w-full bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition">
                Registrarse
              </Link>
            </div>
          </div> */}

      <div className="mt-24 mb-28" >
        <div className="px-2 text-center" >
          <h1 className={`  text-3xl md:text-4xl `} >Preguntas frecuentes</h1>
        </div>
        <div className="px-4 md:px-10 mt-5 mb-10" >
          <Accordion items={items} />
        </div>
      </div>


      <div className='p-5 md:p-10 bg-gray-100' >
        <h1 className=' text-3xl md:text-5xl font-bold text-center' >Unete a <span className={`${Lobster.className}  antialiased font-bold`}>Vibe</span>
          <span className={` ${Lobster.className}  text-red-500 `}>Tel</span></h1>

        <div className='grid grid-cols-1 md:grid-cols-2 mx-auto gap-2 justify-center items-center mt-10 p-0 md:px-20 py-10' >

          <div className="max-w-sm bg-white border border-gray-300 rounded-lg shadow-gray-300 shadow-lg  mx-auto">
            <div className="h-36 overflow-hidden rounded-t-lg">
              <Image
                className="w-full h-full object-cover"
                src="/app/motel.jpg"
                width={300}
                height={200}
                alt=""
              />
            </div>
            <div className="p-2">
              <a href="#">
                <h5 className="mb-2 text-lg text-center font-bold text-gray-800">Registra tu motel</h5>
              </a>
              <p className="mb-3 font-light text-xs text-center text-gray-700 " style={{ textAlign: 'justify' }}>Registra tu motel en nuestra plataforma y conecta con más clientes locales cada día. Aumenta tu visibilidad y optimiza tus reservas de manera fácil y eficiente. ¡Únete ahora y comienza a potenciar tus ingresos!</p>
              <Link href="/motel-partner" >
                <button className='w-full bg-red-100 p-3 transition-all duration-150 text-red-500 hover:bg-red-500 hover:text-white rounded' >
                  Conocer mas
                </button>
              </Link>
            </div>
          </div>

          <div className="max-w-sm mt-10 md:mt-0 bg-white border border-gray-300 rounded-lg shadow-lg shadow-gray-300 mx-auto">
            <div className="h-36 overflow-hidden rounded-t-lg">
              <Image
                className="w-full h-full object-cover"
                src="/app/user.jpg"
                width={300}
                height={200}
                alt=""
              />
            </div>
            <div className="p-2">
              <a href="#">
                <h5 className="mb-2 text-lg text-center font-bold text-gray-800">Registrate como usuario</h5>
              </a>
              <p className="mb-3 font-light text-xs text-center text-gray-700 " style={{ textAlign: 'justify' }}>Regístrate ahora y accede instantáneamente a las mejores ofertas de moteles en tu área. Disfruta de reservas fáciles, rápidas y seguras. ¡Empieza tu próxima escapada con nosotros!</p>
              <Link href="/auth/login" >
                <button className='w-full bg-red-100 p-3 transition-all duration-150 text-red-500 hover:bg-red-500 hover:text-white rounded' >
                  Conocer mas
                </button>
              </Link>
            </div>
          </div>

        </div>

      </div>
    </>
  )
}

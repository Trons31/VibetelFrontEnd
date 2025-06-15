'use client';
import Image from 'next/image';
import Link from 'next/link'
import { IoArrowBackOutline} from 'react-icons/io5'

export const LoginMovil = () => {

  const redirectPage = () => {
    const redirectUrl = localStorage.getItem('redirectUrl');
    if (redirectUrl) {
      localStorage.removeItem('redirectUrl');
      window.location.replace(redirectUrl);
    } else {
      window.location.replace("/");
    }

  }

  return (
    <div className="flex  flex-col  md:hidden justify-center h-screen  relative">
      <div className="absolute inset-0 z-0">
        {/* Aplicamos una superposición de color oscuro */}
        <div className="absolute inset-0 bg-black opacity-70"></div>
        <Image
          className="object-cover w-full h-full"
          src="/app/room4.jpg"
          width={400}
          height={700}
          alt="Background"
        />
      </div>

      <div className="absolute p-2 top-1 z-50">
        <div className='flex gap-5  items-center' >
          <button 
          onClick={redirectPage}
          >
            <IoArrowBackOutline size={30} className="text-white" />
          </button>
          <p className='text-white text-sm font-bold' >Registrare o ingresa para continuar</p>
        </div>
      </div>

      <div className="relative z-10 mt-10 text-white text-center">

        <div className='px-4' >
          <h1 className="text-3xl text-start font-extrabold mb-4">¿Quieres ser el primero en conocer nuestras ofertas especiales? </h1>
        </div>

        <div className='px-2 mb-10' >
          <span className='text-white text-md font-normal' >Regístrate ahora y únete a la comunidad de usuarios nuevos</span>
        </div>

        <div className='flex justify-center' >
          <div>
            <div className='w-[300px]' >
              <div className="grid space-y-4 mt-2">

                <Link href="/auth/login/email" >
                  <button className="w-full p-10 bg-green-500 hover:bg-green-600 text-white py-2 rounded-full transition duration-100 font-bold">Ya tengo una cuenta</button>
                </Link>

                <Link href="/auth/new-account" >
                  <button className="w-full p-10 bg-red-500 hover:bg-red-700 text-white py-2 rounded-full transition duration-100 font-bold">Crear una cuenta</button>
                </Link>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

'use client';
import Link from 'next/link'
import Image from 'next/image';
import { HeaderAuth } from '@/components';


export const LoginDesktop = () => {

  return (
    <div className="hidden md:block h-screen overflow-hidden">

      <HeaderAuth />

      <div className="flex flex-col md:flex-row items-center justify-center h-screen relative overflow-hidden">

        <div className="w-full h-screen relative">
          <Image
            src="/app/room4.jpg"
            width={700}
            height={700}
            alt="Background"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-black opacity-70"></div>

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center p-2">
              <h1 className="text-white text-5xl mb-3 font-bold">
                ¿Quieres ser el primero en conocer nuestras ofertas especiales?
              </h1>
              <p className="text-white font-light text-xl">
                Regístrate ahora y únete a la comunidad de usuarios nuevos
              </p>
            </div>
          </div>
        </div>

        <div className="md:w-2/3 h-screen flex flex-col justify-center overflow-hidden">
          <div className='space-y-5  justify-center w-full px-5'>
            <p className={` text-center font-normal antialiased text-2xl text-gray-700 `}>
              Registrarte o ingresa para continuar
            </p>
            <div className='max-w-md w-full mx-auto'>
              <div className='space-y-3 px-10 py-2'>
                <div className="grid space-y-3">
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
    </div>
  )
}

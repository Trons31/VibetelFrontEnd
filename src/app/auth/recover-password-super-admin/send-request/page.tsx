import { Lobster } from "@/config/fonts";
import Image from 'next/image';
import Link from "next/link";
import { IoArrowBackOutline } from "react-icons/io5";
import { RecoverForm } from "./ui/RecoverForm";

export async function generateMetadata() {
  return {
    title: 'Recupera tu Contraseña - Vibetel',
    description: '¿Olvidaste tu contraseña? Recupera el acceso a tu cuenta de manera rápida y segura. Ingresa tu correo electrónico y sigue los pasos para restablecer tu contraseña y seguir disfrutando de todos los beneficios de Vibetel.',
  };
}

export default function RecoverPasswordPage() {
  return (
    <div className=" md:block h-screen overflow-hidden">

      <div className="border-b p-4 border-gray-200">
        <div className="flex justify-between items-center">
          <Link href="/auth/super-admin" className='flex gap-3 items-center'>
            <IoArrowBackOutline size={24} className="text-gray-700" />
            <span className='font-bold text-md text-gray-700'>Volver</span>
          </Link>
          <Link href="/" className='flex gap-2 justify-center items-center'  >
            <Image
              src="/app/LogoApp.png"
              width={35}
              height={35}
              alt="logoOficial.png"
            />
            <div>
              <span className={`${Lobster.className} text-2xl antialiased font-bold`}>Vibe</span>
              <span className={` ${Lobster.className} text-2xl text-red-500 `}>Tel</span>
            </div>
          </Link>
        </div>
      </div>

      <RecoverForm />

    </div>
  );
}
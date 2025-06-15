import Link from "next/link";
import Image from 'next/image';
import { IoArrowBackOutline } from "react-icons/io5";
import { ResetPasswordForm } from "./ui/ResetPasswordForm";

interface Props {
  params: {
    token: string;
  }
}

export async function generateMetadata() {
  return {
    title: 'Restablecer Contraseña - Motel Partner',
    description: 'Ingresa el token recibido para restablecer la contraseña de tu cuenta de administrador de motel y acceder a tu portal de administración.',
  };
}

export default async function ResetPassowrdMotelPage({ params }: Props) {

  const { token } = params;

  return (
    <div className=" md:block h-screen overflow-hidden">

      <div className="border-b p-4 border-gray-200">
        <div className="flex justify-between items-center">
          <Link href="/auth/partner" className='flex gap-3 items-center'>
            <IoArrowBackOutline size={24} className="text-gray-700" />
            <span className='font-bold text-md text-gray-700'>Volver</span>
          </Link>
          <div className="flex gap-2 items-center">
            <Image
              src="/app/LogoApp.png"
              width={35}
              height={35}
              alt="logoOficial.png"
            />
            <span className="text-xl md:text-lg antialiased  ">Motel</span>
            <span className="text-xl md:text-lg antialiased "> Partners </span>
          </div>
        </div>
      </div>
      <ResetPasswordForm
        token={token}
      />
    </div>
  );
}
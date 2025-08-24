
import Link from "next/link";
import { Lobster } from "@/config/fonts";
import { IoArrowBackOutline } from "react-icons/io5";
import { ResetPasswordForm } from "./ui/ResetPasswordForm";
import Image from 'next/image';


interface Props {
    params: {
        token: string;
    }
}

export async function generateMetadata() {
    return {
        title: 'Restablecer Contraseña - Vibetel',
        description: 'Has solicitado restablecer tu contraseña. Ingresa tu nueva contraseña para recuperar el acceso a tu cuenta y continuar disfrutando de todos los beneficios de Vibetel.',
    };
}

export default async function RecoverPasswordUserPage({ params }: Props) {

    const { token } = params;

    return (

        <div className=" md:block h-screen overflow-hidden">

            <div className="border-b p-4 border-gray-200">
                <div className="flex justify-between items-center">
                    <Link href="/auth/login/email" className='flex gap-3 items-center'>
                        <IoArrowBackOutline size={24} className="text-gray-700" />
                        <span className='font-bold text-md text-gray-700'>Volver</span>
                    </Link>
                    <Link href="/auth/login/" className='flex gap-2 justify-center items-center'  >
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

            <ResetPasswordForm
                token={token}
            />

        </div>

    );
}
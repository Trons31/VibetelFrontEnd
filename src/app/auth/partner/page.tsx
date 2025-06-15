
import Link from "next/link";
import { SwiperAuth } from "@/components";
import { LoginForm } from "./ui/LoginForm";
import { IoArrowBackOutline } from "react-icons/io5";

export async function generateMetadata() {
  return {
    title: 'Inicia Sesión - Portal de Administración de Motel',
    description: 'Accede al portal de administración de tu motel para gestionar reservas, promociones y más. Inicia sesión para tener control total sobre tu negocio y maximizar tus beneficios.',
  };
}


export default function AuthPartnerPage() {

  return (

    <div className="flex h-screen w-screen overflow-hidden text-slate-800">
      <div className="flex h-full w-full flex-col md:w-5/12">
        <div className="flex pt-12 justify-start pl-5 md:pl-12">
          <Link href="/motel-partner" className="flex gap-2 items-center">
            <IoArrowBackOutline size={24} className="font-bold group-hover:text-red-600" />
            <span className="text-xl md:text-xl antialiased  ">Motel</span>
            <span className="text-xl md:text-xl antialiased "> Partners </span>
          </Link>
        </div>
        <div className="my-auto md:mx-auto flex flex-col  px-6  md:justify-start lg:w-[28rem]">
          <p className="text-center text-3xl font-bold md:text-left md:text-5xl">Portal de <span className="text-red-600">administración</span>
          </p>
          <p className="mt-2 text-center text-md md:text-xl font-medium md:text-left">Accede a tu cuenta</p>
          <LoginForm />
        </div>
      </div>
      <div className="relative hidden h-full w-full md:block md:w-7/12">
        <SwiperAuth />
      </div>

    </div>

  );
}
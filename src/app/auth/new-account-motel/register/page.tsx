import { Lobster } from "@/config/fonts";
import Link from "next/link";
import { RegisterForm } from "./ui/RegisterForm";
import {  getAmenitiesMotel } from "@/actions";
import { auth } from "@/auth.config";
import { IoArrowBackOutline } from "react-icons/io5";
import { CityApi, CountryApi, DepartmentApi } from "@/interfaces";
import axios from "axios";
import { redirect } from "next/navigation";


export async function generateMetadata() {
  return {
    title: 'Completa el Registro de tu Motel - Accede a Beneficios Exclusivos',
    description: 'Completa el registro de tu motel para acceder a todas las herramientas y beneficios exclusivos que nuestra plataforma ofrece. Gestiona tus reservas, promociones y mucho más. ¡Haz crecer tu negocio con nosotros!',
  };
}


export default async function NamePage() {

  let countries: CountryApi[];
  try {
    const response = await axios.get<CountryApi[]>(`${process.env.NEXT_PUBLIC_API_ROUTE}locations/countries`);
    countries = response.data;
  } catch (error: any) {
    redirect("/");
  }


  let deparment: DepartmentApi[];
  try {
    const response = await axios.get<DepartmentApi[]>(`${process.env.NEXT_PUBLIC_API_ROUTE}locations/departments`);
    deparment = response.data;
  } catch (error: any) {
    redirect("/");
  }

  let cities: CityApi[];
  try {
    const response = await axios.get<CityApi[]>(`${process.env.NEXT_PUBLIC_API_ROUTE}locations/cities`);
    cities = response.data;
  } catch (error: any) {
    redirect("/");
  }

  const amenitiesMotel = await getAmenitiesMotel();

  const session = await auth();
  const motelPartner = session?.user.id!;
  return (
    <>
      <div className=" md:block h-screen">
        <div className="fixed z-50 top-0 bg-white w-full border-b p-4 border-gray-200">
          <div className="flex justify-between items-center">
            <Link
              href="/motel-partner"
              className='flex gap-2 items-center transition-all duration-200 group hover:text-red-600'>
              <IoArrowBackOutline className="h-5 w-5 group-hover:text-red-600" />
              <span className='text-md group-hover:text-red-600'>Volver</span>
            </Link>
            <div className='flex justify-center space-x-2 items-center' >
              <Link href="/">
                <span className={`${Lobster.className} text-xl antialiased font-bold`}>Motel</span>
                <span className={` ${Lobster.className} text-xl text-red-500 `}> Partners </span>
              </Link>
            </div>
          </div>
        </div>
        <RegisterForm
          motelPartner={motelPartner}
          countries={countries}
          departments={deparment}
          cities={cities}
          amenitiesMotel={amenitiesMotel} />
      </div>
    </>
  );
}
import { auth } from "@/auth.config";
import { redirect } from "next/navigation";
import { ConfigMotel } from "./ui/ConfigMotel";

import { BreadCrumb } from "@/components";
import { UserApi } from "@/interfaces/user.interface";
import axios from "axios";
import { AmenitiesMotelInfoApi, CityApi, CountryApi, DepartmentApi, MotelApi } from "@/interfaces";

export default async function ProfileMotelPartnerPage() {


  const session = await auth();

  if (!session) {
    redirect("/");
  }

  let user: UserApi;
  try {
    const response = await axios.get<UserApi>(`${process.env.NEXT_PUBLIC_API_ROUTE}user/${session.user.id}`)
    user = response.data;
  } catch (error: any) {
    redirect("/");
  }


  if (!user) {
    redirect("/auth/new-account-motel")
  }

  let motelExist: MotelApi | null = null;

  try {
    const response = await axios.get<MotelApi>(
      `${process.env.NEXT_PUBLIC_API_ROUTE}motel/user`,
      {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      }
    );

    motelExist = response.data;
  } catch (error: any) {
    redirect("/auth/new-account-motel/register");
  }

  let amenitiesMotel: AmenitiesMotelInfoApi[];

  try {
    const response = await axios.get<AmenitiesMotelInfoApi[]>(`${process.env.NEXT_PUBLIC_API_ROUTE}motel/amenities`);
    amenitiesMotel = response.data;
  } catch (error: any) {
    redirect("/");
  }

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


  return (
    <div className='bg-white p-3 md:p-10 mb-10 rounded-xl' >
      <div className="md:mx-5" >
        <p className="text-lg md:text-2xl font-semibold" >Perfil</p>
        <BreadCrumb
          breadcrumbCurrent="Perfil"
          urlCurrent="/admin/dashboard-partner-motel/profile"

          breadcrumbStart="Inicio"
          urlStart="/admin/dashboard-partner-motel"
        />
        <p className="text-xs md:text-sm mt-1">
          En esta sección podrás administrar todos los detalles de tu motel. Mantén la información siempre actualizada para garantizar que tus clientes reciban los datos correctos y mejorar la eficiencia de la gestión de tu motel.
        </p>
      </div>
      <ConfigMotel
      accessToken={session.accessToken}
        motelPartner={user}
        motel={motelExist}
        amenitiesMotel={amenitiesMotel}
        countries={countries}
        departments={deparment}
        cities={cities} />
    </div>
  );
}
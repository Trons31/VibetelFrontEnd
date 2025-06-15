import { auth } from "@/auth.config";
import { redirect } from "next/navigation";
import { ConfigMotel } from "./ui/ConfigMotel";

import { BreadCrumb } from "@/components";
import { getMotelByMotelPartner, getAmenitiesMotel, GetCountries, GetDepartment, getCitiesByDepartment, GetUserByEmail } from "@/actions";

export default async function ProfileMotelPartnerPage() {

  const session = await auth();

  const user = await GetUserByEmail(session!.user.email);


  const motelExist = await getMotelByMotelPartner("5b6806ff-a271-4441-88f2-544d8c0f56a1");
  console.log(motelExist);

  // if (!motelExist?.ok) {
  //   redirect("/auth/new-account-motel")
  // }

  const amenitiesMotel = await getAmenitiesMotel();
  const countries = await GetCountries();
  const deparment = await GetDepartment();
  const cities = await getCitiesByDepartment();

  return (
    <div className='bg-white p-3 md:p-10 mb-10 rounded-xl' >
      <div className="md:mx-5" >
        <p className="text-3xl font-semibold" >Perfil</p>
        <BreadCrumb
          breadcrumbCurrent="Perfil"
          urlCurrent="/admin/dashboard-partner-motel/profile"

          breadcrumbStart="Inicio"
          urlStart="/admin/dashboard-partner-motel"
        />
        <p className="text-sm mt-1">
          En esta sección podrás administrar todos los detalles de tu motel. Mantén la información siempre actualizada para garantizar que tus clientes reciban los datos correctos y mejorar la eficiencia de la gestión de tu motel.
        </p>
      </div>
      <ConfigMotel motelPartner={user.user!} motel={motelExist.motelExist!} amenitiesMotel={amenitiesMotel} countries={countries} departments={deparment} cities={cities} />
    </div>
  );
}
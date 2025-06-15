import { redirect } from "next/navigation";
import { BreadCrumb } from "@/components";
import { getRoomInAviableByMotel } from "@/actions";
import { auth } from "@/auth.config";
import { TableWalkIn } from "./ui/TableWalkIn";
import { MotelApi } from "@/interfaces";
import axios from "axios";

export default async function WalkInPage() {

  const session = await auth();
  if (!session?.user.roles.includes("motelPartner")) {
    redirect("/motel-partner")
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

  const rooms = await getRoomInAviableByMotel(motelExist.id);

  return (
    <div className="bg-white rounded-lg mb-10"  >
      <div className="py-10 " >
        <div className="md:mx-5" >
          <p className="text-2xl font-semibold" >Acceso sin reserva</p>
          <BreadCrumb
            breadcrumbCurrent="Habitaciones"
            urlCurrent="/admin/dashboard-partner-motel/config-motel/motel-cover"

            breadcrumbStart="Configuracion"
            urlStart="/admin/dashboard-partner-motel"
          />
          <p className="text-sm mt-1">
            En esta sección podrás gestionar el acceso a las habitaciones de tu motel sin previa reserva. Es importante registrar la entrada a cada habitacion para manterner actualizada la disponibiliada de cada habitacion en tiempo real.
          </p>
        </div>

        <TableWalkIn
          motelId={motelExist.id}
          roomsInAviable={rooms}
        />

      </div>
    </div>
  );
}
import { BreadCrumb } from "@/components";
import { ImageMotel } from './ui/ImageMotel';
import { auth } from "@/auth.config";
import { redirect } from "next/navigation";
import { getMotelByMotelPartner } from "@/actions";


export default async function MotelCoverPage() {

  const session = await auth();
  if (!session?.user.roles.includes("motelPartner")) {
    redirect("/socio-motel")
  }

  const motelExist = await getMotelByMotelPartner(session.user.id);

  if (!motelExist?.ok) {
    redirect("/auth/new-account-motel/registro-motel")
  }

  return (
    <>

      <div className="bg-white rounded-lg" >

        <div className="py-10 px-5 md:mx-20 " >
          <div className="" >
            <p className={`  text-3xl font-semibold `} >Logo y portada</p>
            <BreadCrumb
              breadcrumbCurrent="Portada y logo"
              urlCurrent="/admin/dashboard-partner-motel/config-motel/motel-cover"

              breadcrumbStart="configuracion"
              urlStart="/admin/dashboard-partner-motel"
            />
          </div>
          {
            motelExist.motelExist?.images.length! > 0
              ? (
                <p className="text-sm mt-1 font-extralight">
                  Imagen cargada correctamente. Puede actualizarla en cualquier momento para mejorar la visibilidad de su motel y captar más atención de los clientes.
                </p>
              )
              : (
                <p className="text-sm mt-1 font-extralight" >
                  Cargue una imagen de alta calidad de su motel para activarlo. Asegúrese de que la imagen sea clara y atractiva para captar la atención de los clientes.
                </p>
              )
          }
          <ImageMotel motelId={motelExist.motelExist?.id!} motelImage={motelExist.motelExist?.motelImage[0]?.url} imageId={motelExist.motelExist?.motelImage[0]?.id} />
        </div>

      </div>

    </>
  );
}
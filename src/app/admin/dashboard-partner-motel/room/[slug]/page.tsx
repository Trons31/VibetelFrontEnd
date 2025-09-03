import { redirect } from "next/navigation";
import { BreadCrumb, ModalCompleteSettings } from "@/components";
import { RoomForm } from "./ui/RoomForm";
import { auth } from "@/auth.config";
import { StatusRoom } from "./ui/StatusRoom";
import { FaCircleCheck } from "react-icons/fa6";
import { BiBlock } from "react-icons/bi";
import { AmenitiesRoomApi, CategoryRoomApi, GarageRoomApi, MotelApi, RoomApi } from "@/interfaces";
import axios from "axios";
import { Toaster } from "react-hot-toast";

interface Props {
  params: {
    slug: string;
  }
}

export default async function BedroomPage({ params }: Props) {

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

  let category: CategoryRoomApi[];
  try {
    const response = await axios.get<CategoryRoomApi[]>(`${process.env.NEXT_PUBLIC_API_ROUTE}room/category`);
    category = response.data;
  } catch (error: any) {
    throw new Error(`Ups! Error al obtener las categorias de las habitaciones`);
  }

  let garage: GarageRoomApi[];
  try {
    const response = await axios.get<GarageRoomApi[]>(`${process.env.NEXT_PUBLIC_API_ROUTE}room/garage`);
    garage = response.data;
  } catch (error: any) {
    throw new Error(`Ups! Error al obtener los garajes de las habitaciones`);
  }

  let amenities: AmenitiesRoomApi[];
  try {
    const response = await axios.get<AmenitiesRoomApi[]>(`${process.env.NEXT_PUBLIC_API_ROUTE}room/amenities`);
    amenities = response.data;
  } catch (error: any) {
    throw new Error(`Ups! Error al obtener las comodidades de las habitaciones`);
  }

  const { slug } = params;

  let room: RoomApi | null;
  try {
    const response = await axios.get<RoomApi>(
      `${process.env.NEXT_PUBLIC_API_ROUTE}room/${slug}`,
      {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      }
    );
    room = response.data;
  } catch (error: any) {
    room = null;
  }

  if (room === null && slug !== 'new') {
    redirect("/admin/dashboard-partner-motel/room");
  }



  let isNew: boolean = false;
  if (slug === 'new') {
    isNew = true;
  }

  let amenitiesRoom;
  // if (room) {
  //   amenitiesRoom = await GetAmenitiesByRoom(room?.room.id);
  // }

  if (motelExist.subscriptionTier !== "FREE" && motelExist.motelConfig) {
    return (
      <ModalCompleteSettings />
    )
  }

  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />

      <div className="bg-white rounded-xl pb-20 mb-20" >



        <div className="py-14 px-5 md:mx-10">
          <div className="mb-8">
            <div className="flex justify-between items-center" >
              <p className="text-md md:text-3xl font-semibold capitalize" >
                {
                  room
                    ? (
                      room.title
                    )
                    : (
                      "Registrar habitacion"
                    )
                }
              </p>
              {
                !isNew && (
                  <div className="flex justify-start" >
                    {
                      room?.status === "DISABLED"
                        ? (
                          <div className="flex gap-2 items-center bg-gray-200 py-1 px-3 rounded w-fit" >
                            <BiBlock className="h-3 w-3 md:h-4 md:w-4" />
                            <p className="text-black text-sm md:text-lg font-semibold" >Desabilitada</p>
                          </div>
                        ) : (
                          <div className="flex gap-2 items-center bg-gray-200 py-1 px-3 rounded w-fit" >
                            <FaCircleCheck className="h-3 w-3 md:h-4 md:w-4" />
                            <p className="text-black text-sm md:text-lg font-semibold" >Habilitada</p>
                          </div>
                        )
                    }
                  </div>
                )
              }
            </div>
            <BreadCrumb
              breadcrumbCurrent={
                room
                  ? (
                    room.title
                  )
                  : (
                    "Registrar habitacion"
                  )
              }
              urlCurrent="/admin/dashboard-partner-motel/config-motel/motel-cover"

              breadcrumbStart="Habitaciones"
              urlStart="/admin/dashboard-partner-motel/room"
            />
          </div>

          <RoomForm
            priceAddTime={motelExist.motelConfig?.defaultReservationAddTime!}
            subscriptionTier={motelExist.subscriptionTier}
            category={category}
            garage={garage}
            amenities={amenities}
            room={room ?? {}}
            amenitiesByRoom={amenitiesRoom}
            accessToken={session.accessToken}
            isNew={isNew} />

          {
            !isNew && (
              <StatusRoom
                nameRoom={room!.title}
                idRoom={room!.id}
                status={room?.status!}
              />
            )
          }

        </div>
      </div>
    </>
  );
}
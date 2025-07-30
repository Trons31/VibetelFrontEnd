import Link from "next/link";
import { auth } from "@/auth.config";
import { BreadCrumb } from "@/components";
import { TableRoom } from "./ui/TableRoom";
import { redirect } from "next/navigation";
import { CategoryRoomApi, GarageRoomApi, MotelApi } from "@/interfaces";
import axios from "axios";

interface Props {
    searchParams: {
        page: string;
    }
}

export default async function RoomAllPage({ searchParams }: Props) {

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
        const response = await axios.get<CategoryRoomApi[]>(
            `${process.env.NEXT_PUBLIC_API_ROUTE}room/category`,
            {
                headers: {
                    Authorization: `Bearer ${session.accessToken}`,
                },
            }
        );
        category = response.data;
    } catch (error: any) {
        throw new Error(`Ups! Error al obtener las categorias de las habitaciones`);
    }

    let garage: GarageRoomApi[];
    try {
        const response = await axios.get<GarageRoomApi[]>(
            `${process.env.NEXT_PUBLIC_API_ROUTE}room/garage`,
            {
                headers: {
                    Authorization: `Bearer ${session.accessToken}`,
                },
            }
        );
        garage = response.data;
    } catch (error: any) {
        throw new Error(`Ups! Error al obtener los garajes de las habitaciones`);
    }

    return (
        <>

            <div className="bg-white rounded-xl mb-10"  >
                <div className="pb-10 py-10" >
                    <div className="px-2 md:mx-5" >
                        <p className="text-lg md:text-2xl font-bold" >Habitaciones</p>
                        <BreadCrumb
                            breadcrumbCurrent="Habitaciones"
                            urlCurrent="/admin/dashboard-partner-motel/config-motel/motel-cover"

                            breadcrumbStart="Configuracion"
                            urlStart="/admin/dashboard-partner-motel"
                        />
                        <p className="text-xs md:text-sm mt-1" style={{ textAlign: 'justify' }}>
                            En esta sección podrás gestionar todas las habitaciones de tu motel. Asegúrate de mantener la información de disponibilidad, características y tarifas siempre actualizada para ofrecer una mejor experiencia a tus clientes y optimizar la administración de las reservas.
                        </p>
                    </div>

                    <div className="flex justify-end px-2 md:mx-10 mt-10 mb-7" >
                        <Link href="/admin/dashboard-partner-motel/room/new" target="_blank" rel="noopener noreferrer" className="btn-primary text-xs md:text-sm" >
                            Nueva habitacion
                        </Link>
                    </div>

                    <TableRoom
                        accessToken={session.accessToken}
                        categoryRoom={category}
                        garageRoom={garage}
                    />

                </div>
            </div>
        </>
    );
}
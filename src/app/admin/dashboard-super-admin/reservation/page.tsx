import { auth } from "@/auth.config";
import { BreadCrumb } from "@/components";
import { GarageRoomApi } from "@/interfaces";
import axios from "axios";
import { redirect } from "next/navigation";
import { Toaster } from "react-hot-toast";

export default async function ReservationsPage() {


    const session = await auth();
    if (!session?.user.roles.includes("superAdmin")) {
        redirect("/motel-partner")
    }

    let garages: GarageRoomApi[];

    try {
        const response = await axios.get<GarageRoomApi[]>(
            `${process.env.NEXT_PUBLIC_API_ROUTE}room/garage`,
            {
                headers: {
                    Authorization: `Bearer ${session.accessToken}`,
                },
            }
        );
        garages = response.data;
    } catch (error) {
        console.error('Error fetching rooms:', error);
        garages = [];
    }

    return (
        <>
            <Toaster position="top-right" reverseOrder={false} />
            <div className="bg-white rounded-xl mb-10"  >
                <div className="pb-10 py-10" >
                    <div className="px-2 md:mx-5" >
                        <p className="text-lg md:text-2xl font-bold" >Reservas</p>
                        <BreadCrumb
                            breadcrumbCurrent="reservas"
                            urlCurrent="/admin/dashboard-super-admin/room/reservation"

                            breadcrumbStart="dashboard"
                            urlStart="/admin/dashboard-super-admin"
                        />
                        <p className="text-xs md:text-sm mt-1" style={{ textAlign: 'justify' }}>
                            En esta sección podrás gestionar todos las reservas de los moteles.
                        </p>
                    </div>


                </div>
            </div>
        </>
    );
}
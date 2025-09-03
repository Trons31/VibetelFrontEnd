import { auth } from "@/auth.config";
import { BreadCrumb } from "@/components";
import { AmenitiesMotelInfoApi } from "@/interfaces";
import axios from "axios";
import { redirect } from "next/navigation";
import { TableAmenitiesMotel } from "./ui/TableAmenitiesMotel";
import { Toaster } from "react-hot-toast";
import { ModalRegisterAmenities } from "./ui/ModalRegisterAmenities";

export default async function AmenititesPage() {

    const session = await auth();
    if (!session?.user.roles.includes("superAdmin")) {
        redirect("/motel-partner")
    }

    let amenities: AmenitiesMotelInfoApi[];

    try {
        const response = await axios.get<AmenitiesMotelInfoApi[]>(
            `${process.env.NEXT_PUBLIC_API_ROUTE}motel/amenities`,
            {
                headers: {
                    Authorization: `Bearer ${session.accessToken}`,
                },
            }
        );
        amenities = response.data;
    } catch (error) {
        console.error('Error fetching rooms:', error);
        amenities = [];
    }

    return (
        <>
            <Toaster position="top-right" reverseOrder={false} />
            <div className="bg-white rounded-xl mb-10"  >
                <div className="pb-10 py-10" >
                    <div className="px-2 md:mx-5" >
                        <p className="text-lg md:text-2xl font-bold" >Comodidades de los moteles</p>
                        <BreadCrumb
                            breadcrumbCurrent="Comodidades"
                            urlCurrent="/admin/dashboard-super-admin/motels/amenities"

                            breadcrumbStart="dashboard"
                            urlStart="/admin/dashboard-super-admin"
                        />
                        <p className="text-xs md:text-sm mt-1" style={{ textAlign: 'justify' }}>
                            En esta sección podrás gestionar todas las comodiadades de los moteles.
                        </p>
                    </div>

                    <TableAmenitiesMotel
                        accessToken={session.accessToken}
                        amenities={amenities}
                    />

                </div>
            </div>
        </>
    );
}
import { auth } from "@/auth.config";
import { BreadCrumb } from "@/components";
import { CityApi, DepartmentApi } from "@/interfaces";
import axios from "axios";
import { redirect } from "next/navigation";
import { TableCity } from "./ui/TableCitys";
import { Toaster } from "react-hot-toast";

export default async function CitysPage() {

    const session = await auth();
    if (!session?.user.roles.includes("superAdmin")) {
        redirect("/motel-partner")
    }

    let departments: DepartmentApi[];

    try {
        const response = await axios.get<DepartmentApi[]>(
            `${process.env.NEXT_PUBLIC_API_ROUTE}locations/departments`,
            {
                headers: {
                    Authorization: `Bearer ${session.accessToken}`,
                },
            }
        );
        departments = response.data;
    } catch (error) {
        console.error('Error fetching rooms:', error);
        departments = [];
    }

    let citys: CityApi[];

    try {
        const response = await axios.get<CityApi[]>(
            `${process.env.NEXT_PUBLIC_API_ROUTE}locations/cities`,
            {
                headers: {
                    Authorization: `Bearer ${session.accessToken}`,
                },
            }
        );
        citys = response.data;
    } catch (error) {
        console.error('Error fetching rooms:', error);
        citys = [];
    }


    return (
        <>
            <Toaster position="top-right" reverseOrder={false} />
            <div className="bg-white rounded-xl mb-10"  >
                <div className="pb-10 py-10" >
                    <div className="px-2 md:mx-5" >
                        <p className="text-lg md:text-2xl font-bold" >Ciudades</p>
                        <BreadCrumb
                            breadcrumbCurrent="Ciudades"
                            urlCurrent="/admin/dashboard-super-admin/locations/citys"

                            breadcrumbStart="dashboard"
                            urlStart="/admin/dashboard-super-admin"
                        />
                        <p className="text-xs md:text-sm mt-1" style={{ textAlign: 'justify' }}>
                            En esta sección podrás gestionar todas las ciudades registradas en la plataforma.
                        </p>
                    </div>

                    <TableCity
                        accessToken={session.accessToken}
                        citys={citys}
                        departments={departments}
                    />

                </div>
            </div>
        </>
    );
}
import { auth } from "@/auth.config";
import { BreadCrumb } from "@/components";
import { CountryApi, DepartmentApi } from "@/interfaces";
import axios from "axios";
import { redirect } from "next/navigation";
import { TableDepartments } from "./ui/TableDepartments";
import { Toaster } from "react-hot-toast";

export default async function CountrysPage() {


    const session = await auth();
    if (!session?.user.roles.includes("superAdmin")) {
        redirect("/motel-partner")
    }

    let countrys: CountryApi[];

    try {
        const response = await axios.get<CountryApi[]>(
            `${process.env.NEXT_PUBLIC_API_ROUTE}locations/countries`,
            {
                headers: {
                    Authorization: `Bearer ${session.accessToken}`,
                },
            }
        );
        countrys = response.data;
    } catch (error) {
        console.error('Error fetching rooms:', error);
        countrys = [];
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


    return (
        <>
            <Toaster position="top-right" reverseOrder={false} />
            <div className="bg-white rounded-xl mb-10"  >
                <div className="pb-10 py-10" >
                    <div className="px-2 md:mx-5" >
                        <p className="text-lg md:text-2xl font-bold" >Departamentos</p>
                        <BreadCrumb
                            breadcrumbCurrent="Departamentos"
                            urlCurrent="/admin/dashboard-super-admin/locations/departments"

                            breadcrumbStart="dashboard"
                            urlStart="/admin/dashboard-super-admin"
                        />
                        <p className="text-xs md:text-sm mt-1" style={{ textAlign: 'justify' }}>
                            En esta sección podrás gestionar todos los departamentos registrados en la plataforma.
                        </p>
                    </div>

                    <TableDepartments
                        accessToken={session.accessToken}
                        countrys={countrys}
                        departments={departments}
                    />

                </div>
            </div>
        </>
    );
}
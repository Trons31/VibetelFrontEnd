import { BreadCrumb } from "@/components";
import { TableCategorysRoom } from "./ui/TableCategorysRoom";
import { auth } from "@/auth.config";
import { redirect } from "next/navigation";
import axios from "axios";
import { CategoryRoomApi } from "@/interfaces";
import { Toaster } from "react-hot-toast";

export default async function CategorysPage() {

    const session = await auth();
    if (!session?.user.roles.includes("superAdmin")) {
        redirect("/motel-partner")
    }

    let categorys: CategoryRoomApi[];

    try {
        const response = await axios.get<CategoryRoomApi[]>(
            `${process.env.NEXT_PUBLIC_API_ROUTE}room/category`,
            {
                headers: {
                    Authorization: `Bearer ${session.accessToken}`,
                },
            }
        );
        categorys = response.data;
    } catch (error) {
        console.error('Error fetching rooms:', error);
        categorys = [];
    }

    return (
        <>
            <Toaster position="top-right" reverseOrder={false} />
            <div className="bg-white rounded-xl mb-10"  >
                <div className="pb-10 py-10" >
                    <div className="px-2 md:mx-5" >
                        <p className="text-lg md:text-2xl font-bold" >Categorias de habitaciones</p>
                        <BreadCrumb
                            breadcrumbCurrent="Categorias"
                            urlCurrent="/admin/dashboard-super-admin/room/categorys"

                            breadcrumbStart="dashboard"
                            urlStart="/admin/dashboard-super-admin"
                        />
                        <p className="text-xs md:text-sm mt-1" style={{ textAlign: 'justify' }}>
                            En esta sección podrás gestionar todas las categorias de las habitaciones de los moteles.
                        </p>
                    </div>

                    <TableCategorysRoom
                        accessToken={session.accessToken}
                        categorys={categorys}
                    />

                </div>
            </div>
        </>
    );
}
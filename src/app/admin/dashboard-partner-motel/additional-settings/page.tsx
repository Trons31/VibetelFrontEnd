import { redirect } from "next/navigation";
import { auth } from "@/auth.config";
import { AdditionalSettingsForm } from "./ui/AdditionalSettingsForm";
import { MotelApi } from "@/interfaces";
import axios from "axios";
import { BreadCrumb } from "@/components";

export default async function AdditionalSettingsPage() {

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
    return (
        <div className="bg-white rounded-lg mb-10" >
            <div className="py-10 px-5 md:mx-20">
                <div className="border-b pb-8">
                    <div>
                        <h1 className="text-lg md:text-2xl font-bold">Ajustes adicionales</h1>
                        <BreadCrumb
                            breadcrumbCurrent="Configuraciones adicionales"
                            urlCurrent="/admin/dashboard-partner-motel/config-motel/motel-cover"

                            breadcrumbStart="configuracion"
                            urlStart="/admin/dashboard-partner-motel"
                        />
                    </div>
                    <p className="text-xs md:text-sm mt-2" >
                        Establecer los ajustes adicionales es importante para que su motel pueda operar en Motelero Online. Los ajustes adicionales permiten al administrador del motel establecer el tiempo de espera límite para que un usuario pueda tomar su reserva, el tiempo promedio en que una habitación es limpiada, y si está en servicio o fuera de servicio, además de establecer el tiempo que estará fuera de servicio.
                    </p>
                </div>
                <div className="grid grid-cols">
                    <AdditionalSettingsForm
                        motelConfig={motelExist.motelConfig}
                        accessToken={session.accessToken}
                    />
                </div>
            </div>
        </div>
    );
}
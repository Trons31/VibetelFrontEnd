import { redirect } from "next/navigation";
import { auth } from "@/auth.config";
import { AdditionalSettingsForm } from "./ui/AdditionalSettingsForm";
import { getConfigAdditionalSettingsMotel } from "@/actions";
import { MotelApi } from "@/interfaces";
import axios from "axios";

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
    const motelConfig = await getConfigAdditionalSettingsMotel(motelExist.id);

    return (
        <div>

            <div className="mx-4 min-h-screen max-w-screen-xl sm:mx-8 xl:mx-auto pb-10">
                <div className="grid grid-cols">
                    <AdditionalSettingsForm
                        motelId={motelExist.id}
                        motelConfig={motelConfig?.additionalSettingsMotel}
                    />
                </div>
            </div>
        </div>
    );
}
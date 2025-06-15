import { getMotelByMotelPartner } from "@/actions";
import { auth } from "@/auth.config";
import { MotelApi } from "@/interfaces";
import axios from "axios";
import { redirect } from "next/navigation";

export default async function WalkInLayout({
    children
}: {
    children: React.ReactNode;
}) {

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

    if (motelExist.isApproved !== "APPROVED") {
        redirect("/admin/dashboard-partner-motel")
    }

    return (
        <>
            {children}
        </>
    );
}
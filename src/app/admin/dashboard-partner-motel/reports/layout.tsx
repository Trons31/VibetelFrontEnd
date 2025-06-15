import { getMotelByMotelPartner } from "@/actions";
import { auth } from "@/auth.config";
import { redirect } from "next/navigation";

export default async function ReportsAdminMotelPartnerLayout({
    children
}: {
    children: React.ReactNode;
}) {

    const session = await auth();

    if (!session?.user.roles.includes("motelPartner")) {
        redirect("/motel-partner")
    }

    const motelExist = await getMotelByMotelPartner(session.user.id);

    if (!motelExist?.ok) {
        redirect("/auth/new-account-motel")
    }

    if (!motelExist.motelExist?.isApproved) {
        redirect("/admin/dashboard-partner-motel")
    }

    return (
        <>
            {children}
        </>
    );
}
import { auth } from "@/auth.config";
import { redirect } from "next/navigation";

export default async function AuthSuperAdminLayout({
    children
}: {
    children: React.ReactNode;
}) {

    const session = await auth();

    if (session?.user.roles.includes("superAdmin")) {
        redirect("/admin/dashboard-super-admin")
    }

    return (
        <>
            {children}
        </>
    );
}
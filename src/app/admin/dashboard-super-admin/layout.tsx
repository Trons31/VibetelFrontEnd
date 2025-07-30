import { auth } from "@/auth.config";
import { redirect } from "next/navigation";
import {  ClientSuperAdminLayout } from "@/components";

export default async function SuperAdminLayout({
    children
}: {
    children: React.ReactNode;
}) {

    const session = await auth();

    if (!session?.user.roles.includes("superAdmin")) {
        redirect("/auth/super-admin")
    }

    return (
        <ClientSuperAdminLayout>
            {children}
        </ClientSuperAdminLayout>
    );
}
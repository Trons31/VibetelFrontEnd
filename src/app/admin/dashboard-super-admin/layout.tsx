import { auth } from "@/auth.config";
import { SideBarSuperAdmin, TopMenuSuperAdmin } from "@/components";
import { redirect } from "next/navigation";

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
        <>
            <SideBarSuperAdmin />
            <div className="ml-auto bg-gray-200  lg:w-[75%] xl:w-[80%] 2xl:w-[85%] min-h-screen">
                <TopMenuSuperAdmin />
                <div className="px-3 py-10 md:px-6 pt-6">
                    {children}
                </div>
            </div>
        </>
    );
}
import { auth } from "@/auth.config";
import { fontPoppins } from "@/config/fonts";
import { redirect } from "next/navigation";
import { TopMenuNotRegistered } from "./ui/TopMenuNotRegistered";

export default async function NotRegisteredLayout({
    children
}: {
    children: React.ReactNode;
}) {

    const session = await auth();

    if (session?.user.roles.includes("user")) {
        redirect("/");
    }

    return (
        <main className={` ${fontPoppins.className} min-h-screen`} >
            <TopMenuNotRegistered />
            {children}
        </main>
    );
}
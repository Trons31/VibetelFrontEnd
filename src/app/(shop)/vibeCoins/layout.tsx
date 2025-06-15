import { auth } from "@/auth.config";
import { redirect } from "next/navigation";

export default async function VibeCoinsLayout({
    children
}: {
    children: React.ReactNode;
}) {

    const session = await auth();

    if (!session) {
        redirect("/"); // Redirigir a la página principal
    }
    return (
        <>
            {children}
        </>
    );
}
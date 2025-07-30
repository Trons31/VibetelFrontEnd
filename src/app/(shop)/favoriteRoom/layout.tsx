import { auth } from "@/auth.config";
import axios from "axios";
import { redirect } from "next/navigation";

export default async function FavoriteRoomUserLayout({
    children
}: {
    children: React.ReactNode;
}) {

    const session = await auth();

    if (!session) {
        redirect("/");
    }

    try {
        await axios.get(
            `${process.env.NEXT_PUBLIC_API_ROUTE}user/profile`,
            {
                headers: {
                    Authorization: `Bearer ${session?.accessToken}`,
                },
            }
        );
    } catch (error: any) {
        redirect("/");
    }
    return (
        <>
            {children}
        </>
    );
}
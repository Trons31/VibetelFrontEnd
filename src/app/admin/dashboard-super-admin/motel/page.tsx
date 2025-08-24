import Link from "next/link";
import { TableMotel } from "./ui/TableMotel";
import { auth } from "@/auth.config";
import { redirect } from "next/navigation";

export default async function MotelPage() {


    const session = await auth();

    if (!session?.user.roles.includes("superAdmin")) {
        redirect("/auth/super-admin")
    }

    return (
        <>
            <div className="bg-white rounded-lg"  >
                <div className="py-10 " >
                    <div className="px-2 md:mx-5 mb-10" >
                        <p className="text-lg md:text-2xl font-bold"  >Moteles</p>
                    </div>
                    <TableMotel
                        accessToken={session.accessToken}
                    />
                </div>
            </div>
        </>
    );
}
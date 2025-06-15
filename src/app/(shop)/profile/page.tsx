import { GetUserByEmail } from "@/actions";
import { auth } from "@/auth.config";
import { redirect } from "next/navigation";
import CompleteForm from "./ui/CompleteForm";
import { InfoUser } from "./ui/InfoUser";
import { SideMenu } from "@/components";
import axios from "axios";

export async function generateMetadata() {
    return {
        title: 'Perfil - Actualiza tu Información',
        description: 'En esta página podrás actualizar los datos registrados durante el proceso de registro para mantener tu información siempre actualizada.',
    };
}

export default async function ProfilePage() {
    const session = await auth();

    if (!session) {
        redirect("/");
    }

    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_ROUTE}user/${session.user.id}`)

    const user = response.data;

    if (!user) {
        return <CompleteForm name={session.user.name} email={session.user.email} />;
    }

    return (
        <>
            {/* <SideBarMenu /> */}
            <div className="w-full">

                <div className="grid grid-cols-8 sm:grid-cols-10">
                    <SideMenu user={user} />
                    <InfoUser user={user} />
                </div>
            </div>
        </>

    );
}

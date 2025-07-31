import { getTotalReservationByMotel } from "@/actions";
import { auth } from "@/auth.config";
import { redirect } from "next/navigation";
import { BookingPage } from './ui/BookingPage';
import { MotelApi } from "@/interfaces";
import axios from "axios";


export default async function BookingAllPage() {

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

    const reservationData = await getTotalReservationByMotel(motelExist.id);

    return (
        <>
            <BookingPage
                motelId={motelExist.id}
                reservationData={reservationData.reservations}
            />
        </>
    );
}
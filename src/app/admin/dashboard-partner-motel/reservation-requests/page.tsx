// app/(motel)/reservation/requests/page.tsx
import { auth } from "@/auth.config";
import { redirect } from "next/navigation";
import axios from "axios";
import { GridReservationRequests } from "./ui/GridReservationRequests";
import { ReservationPendingByMotelApi } from "@/interfaces/reservation.interface";
import { MdOutlineBlock } from "react-icons/md";

export default async function ReservationRequestsPage() {
  const session = await auth();

  if (!session?.user.roles.includes("motelPartner")) {
    redirect("/motel-partner");
  }

  let reservationsPending: ReservationPendingByMotelApi[] = [];

  try {
    const response = await axios.get<ReservationPendingByMotelApi[]>(
      `${process.env.NEXT_PUBLIC_API_ROUTE}service/motel-pending-reservations`,
      {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      }
    );
    reservationsPending = response.data;
  } catch (error: any) {
    console.log(error);
  }

  return (
    <div className="bg-white rounded-xl mb-10">
      <div className="py-10 px-5 md:mx-20">
        <div>
          <p className="text-lg md:text-2xl font-bold">Solicitud de reservas</p>
        </div>
        <GridReservationRequests initialReservations={reservationsPending} />
      </div>
    </div>
  );
}

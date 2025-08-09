import { auth } from "@/auth.config";
import { redirect } from "next/navigation";
import axios from "axios";
import { GridReservationRequests } from "./ui/GridReservationRequests";
import { ReservationPendingByMotelApi } from "@/interfaces/reservation.interface";
import { GridReservationOnPayment } from "./ui/GridReservationOnPayment";

export default async function ReservationRequestsPage() {
  const session = await auth();

  if (!session?.user.roles.includes("motelPartner")) {
    redirect("/motel-partner");
  }

  let reservationsPending: ReservationPendingByMotelApi[] = [];
  let reservationsOnPayment: ReservationPendingByMotelApi[] = [];

  try {
    const response = await axios.get<ReservationPendingByMotelApi[]>(
      `${process.env.NEXT_PUBLIC_API_ROUTE}service/motel-request-reservations`,
      {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      }
    );

    reservationsPending = response.data.filter(res => res.isConfirmed === null);
    reservationsOnPayment = response.data.filter(res => res.isConfirmed === true && !res.isPaymentVerifiedByMotel);
  } catch (error: any) {
    console.log(error);
  }

  return (
    <div className="bg-white rounded-xl mb-10">
      <div className="py-10 grid grid-cols gap-10 px-5 md:mx-10">
        <div>
          <div className="" >
            <p className="text-lg md:text-xl font-bold">Solicitudes de reservas</p>
            <p className="text-sm text-gray-600 mt-1">
              Estas son las solicitudes de reservas que llegarán en tiempo real. El motel debe responder a tiempo para no perder la reserva.
            </p>
          </div>
          <GridReservationRequests initialReservations={reservationsPending} />
        </div>

        <div className="mb-10" >
          <div className="">
            <p className="text-lg md:text-xl font-bold">Reservas en proceso de pago</p>
            <p className="text-sm text-gray-600 mt-1">
              Son reservas que el motel ya aceptó y el usuario se encuentra actualmente en el proceso de pago.
            </p>
          </div>
          <GridReservationOnPayment initialReservations={reservationsOnPayment} />
        </div>
      </div>
    </div>
  );
}
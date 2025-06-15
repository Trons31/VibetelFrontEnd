import { GridReservationRequests } from "./ui/GridReservationRequests";

export default function ReservationRequestsPage() {

  return (
    <div className='bg-white p-3 md:p-10 rounded'>
      <div>
        <p className="text-lg md:text-xl font-semibold" >Solicitud de reservas</p>
      </div>
      <GridReservationRequests />
    </div>
  );
}
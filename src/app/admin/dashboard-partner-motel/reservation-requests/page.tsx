import { GridReservationRequests } from "./ui/GridReservationRequests";

export default function ReservationRequestsPage() {

  return (
    <div className='bg-white rounded-xl mb-10'>
      <div className="py-10 px-5 md:mx-20" >
        <div>
          <p className="text-lg md:text-2xl font-bold" >Solicitud de reservas</p>
        </div>
        <GridReservationRequests />
      </div>
    </div>
  );
}
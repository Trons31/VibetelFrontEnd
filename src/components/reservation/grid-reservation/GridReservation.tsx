import { ItemReservation } from "@/components";
import { ReservationByUser } from "@/interfaces/reservation.interface";

interface Props {
  reservation: ReservationByUser[];
}

export const GridReservation = ({ reservation }: Props) => {


  return (
    <div className="grid grid-cols">
      {reservation.map(reservation => (
        <div key={reservation.id}>
          <ItemReservation reservation={reservation} />
        </div>
      ))}
    </div>
  );
};

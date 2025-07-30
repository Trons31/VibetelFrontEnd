import { ItemReservation } from "@/components";
import {  ReservationByUserApi } from "@/interfaces/reservation.interface";

interface Props {
  reservation: ReservationByUserApi[];
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

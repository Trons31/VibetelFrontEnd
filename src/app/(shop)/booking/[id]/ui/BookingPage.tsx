"use client";
import {
  ActionsBooking,
  BookingDetail,
  BookingTracker,
  MoldaRating,
  PendingExit,
  SideMenu,
  StateBooking,
  StateBookingMovil,
  TimerBooking,
} from "@/components";
import { Reservation } from "@/interfaces/reservation.interface";
import { UserApi } from "@/interfaces/user.interface";
import Pusher from "pusher-js";
import { useEffect, useState } from "react";

interface Props {
  user: UserApi;
  reservation: Reservation;
}

export const BookingPage = ({ user, reservation }: Props) => {
  const [modalRating, setModalRating] = useState(true);

  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
    });

    const channel = pusher.subscribe("reservations");

    channel.bind("completed-reservation-by-motel", (reservationId: string) => {
      if (reservation.id === reservationId) {
        window.location.replace(`/booking/${reservation.id}`);
      }
    });

    channel.bind("confirm-reservation", (reservationId: string) => {
      if (reservation.id === reservationId) {
        window.location.replace(`/booking/${reservation.id}`);
      }
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [reservation.id]);

  return (
    <>
      {reservation.ServiceItem?.serviceTaken &&
        reservation.ServiceItem.serviceCompleted === false && (
          <TimerBooking departureDate={reservation.departureDate} />
        )}

      {reservation.ServiceItem?.dateUserConfirmServiceCompleted &&
        !reservation.ServiceItem.dateComplete && <PendingExit />}

      <div className="w-full">
        <div className="grid grid-cols-8 sm:grid-cols-10">
          <SideMenu user={user} />
          <div className="col-span-8 bg-gray-100 w-full py-5 px-0 md:px-2 ">
            <StateBooking reservation={reservation} />
            <StateBookingMovil reservation={reservation} />
            <BookingDetail reservation={reservation} />
            <BookingTracker reservation={reservation} />
          </div>
        </div>
      </div>

      <ActionsBooking reservation={reservation} />

      {reservation.RoomRating?.rating === undefined &&
        reservation.ServiceItem?.serviceCompleted && (
          <MoldaRating
            isOpen={modalRating}
            serviceId={reservation.id}
            roomId={reservation.ServiceItem?.roomId!}
            onClose={() => setModalRating(false)}
          />
        )}

      {/* <motion.button
                whileHover={{
                    scale: 1.1,
                    transition: { duration: 0.2 },
                }}
                whileTap={{
                    scale: 0.9,
                }}
                animate={{
                    rotate: [0, -10, 10, -10, 10, 0],
                    transition: { repeat: Infinity, duration: 0.5 },
                }}
                className="bg-blue-500 z-5  fixed bottom-10 right-5  text-white p-3 rounded-full shadow-lg focus:outline-none"
            >
                <FaBell size={24} />
            </motion.button> */}
    </>
  );
};

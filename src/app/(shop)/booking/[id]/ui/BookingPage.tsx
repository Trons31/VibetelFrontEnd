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
  TutorialBooking,
} from "@/components";
import { ReservationApi } from "@/interfaces/reservation.interface";
import { UserApi } from "@/interfaces/user.interface";
import { useState } from "react";

interface Props {
  user: UserApi;
  reservation: ReservationApi;
}

export const BookingPage = ({ user, reservation }: Props) => {
  const [modalRating, setModalRating] = useState(true);

  return (
    <>

      <TutorialBooking />

      {reservation.ServiceItem?.serviceTaken &&
        reservation.ServiceItem.serviceCompleted === false && (
          <TimerBooking departureDate={reservation.ServiceItem.departureDate} />
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

      {reservation.ServiceItem.serviceCompleted &&
        reservation.roomRating?.rating === undefined && (
          <MoldaRating
            isOpen={modalRating}
            ratingRoom={reservation.roomRating}
            serviceId={reservation.id}
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

"use client";
import { CountdownTimer } from "@/components";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
  departureDate: Date;
}

export const TimerBooking = ({ departureDate }: Props) => {
  
    const targetDate = new Date(departureDate);

  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="fixed bottom-0 md:bottom-24 w-full z-10 md:w-fit md:bottom-35 right-0 "
        >
          <div className="bg-red-600 justify-center p-4 text-center md:rounded-l-md">
            <p className="text-md text-white font-medium ">
              Tu tiempo finaliza en
            </p>
            <CountdownTimer time={targetDate} className="text-white" />
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

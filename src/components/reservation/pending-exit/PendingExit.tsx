"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IoIosArrowForward, IoMdLogOut } from "react-icons/io";

export const PendingExit = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isOpen, setIsOpen] = useState(true);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {isVisible && (
        <>
          <AnimatePresence>
            {isOpen && (
              <div className="fixed z-10 right-0 top-24">
                <motion.div
                  className={`bg-white shadow-lg rounded-l-lg overflow-hidden w-64}`}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 100 }}
                  transition={{ type: "spring", stiffness: 100 }}
                >
                  <button
                    onClick={toggleMenu}
                    className="flex w-full items-center gap-2 justify-between p-2 bg-blue-800 text-white"
                  >
                    <h2 className="text-sm font-semibold">Salida pendiente</h2>
                    <IoIosArrowForward className="h-5 w-5" />
                  </button>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {!isOpen && (
              <div className="fixed z-10 right-0 top-24">
                <motion.div
                  className={`bg-white shadow-lg rounded-l-lg overflow-hidden w-16}`}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 100 }}
                  transition={{ type: "spring", stiffness: 100 }}
                >
                  <div className="flex items-center justify-between p-4 bg-blue-800 text-white">
                    <button
                      onClick={toggleMenu}
                      className="mx-auto focus:outline-none"
                    >
                      <IoMdLogOut />
                    </button>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </>
      )}
    </>
  );
};

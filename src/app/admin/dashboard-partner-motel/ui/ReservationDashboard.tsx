'use client';

import { useState } from "react";
import { motion } from 'framer-motion';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { MdBedroomParent, MdOutlineBedroomParent, MdOutlineTimelapse } from "react-icons/md";



export const ReservationDashboard = () => {

    const [isOpen, setIsOpen] = useState(true);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };



    return (
        <>

            <div className="mb-10" >
                <div className="w-full mt-10">
                    <div className="bg-white shadow-md rounded-lg p-5">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-bold">Habitaciones</h2>
                            <button onClick={toggleDropdown}>
                                {isOpen ? (
                                    <IoIosArrowUp className="w-6 h-6 text-gray-600" />
                                ) : (
                                    <IoIosArrowDown className="w-6 h-6 text-gray-600" />
                                )}
                            </button>
                        </div>
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                        >
                            <div className="mt-4">
                                <div className="my-6">
                                    <div className="grid grid-cols-3">
                                        <div className="w-full px-2 ">
                                            <div className="flex items-center px-5 py-6 shadow-sm rounded-md bg-slate-100">
                                                <div className="p-3 rounded-full bg-indigo-600 bg-opacity-75">
                                                    <MdBedroomParent className="h-7 w-7 text-white" />
                                                </div>

                                                <div className="mx-5">
                                                    <h4 className="text-2xl font-semibold text-gray-700">4644</h4>
                                                    <div className="text-gray-500 text-sm">Habitaciones</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="w-full px-2">
                                            <div className="flex items-center px-5 py-6 shadow-sm rounded-md bg-slate-100">
                                                <div className="p-3 rounded-full bg-orange-600 bg-opacity-75">
                                                    <MdOutlineTimelapse className="h-7 w-7 text-white" />
                                                </div>

                                                <div className="mx-5">
                                                    <h4 className="text-2xl font-semibold text-gray-700">3453</h4>
                                                    <div className="text-gray-500 text-sm">Habitaciones en servicio</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="w-full px-2">
                                            <div className="flex items-center px-5 py-6 shadow-sm rounded-md bg-slate-100">
                                                <div className="p-3 rounded-full bg-pink-600 bg-opacity-75">
                                                    <MdOutlineBedroomParent className="h-7 w-7 text-white" />
                                                </div>

                                                <div className="mx-5">
                                                    <h4 className="text-2xl font-semibold text-gray-700">678</h4>
                                                    <div className="text-gray-500 text-sm">Habitaciones disponibles</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                <div className="w-full mt-10">
                    <div className="bg-white shadow-md rounded-lg p-5">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-bold">Reservas</h2>
                            <button onClick={toggleDropdown}>
                                {isOpen ? (
                                    <IoIosArrowUp className="w-6 h-6 text-gray-600" />
                                ) : (
                                    <IoIosArrowDown className="w-6 h-6 text-gray-600" />
                                )}
                            </button>
                        </div>
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                        >
                            <div className="mt-4">
                                <div className="my-6">
                                    <div className="grid grid-cols-3">
                                        <div className="w-full px-2 ">
                                            <div className="flex items-center px-5 py-6 shadow-sm rounded-md bg-slate-100">
                                                <div className="p-3 rounded-full bg-indigo-600 bg-opacity-75">
                                                    <MdBedroomParent className="h-7 w-7 text-white" />
                                                </div>

                                                <div className="mx-5">
                                                    <h4 className="text-2xl font-semibold text-gray-700">4644</h4>
                                                    <div className="text-gray-500 text-sm">Habitaciones</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="w-full px-2">
                                            <div className="flex items-center px-5 py-6 shadow-sm rounded-md bg-slate-100">
                                                <div className="p-3 rounded-full bg-orange-600 bg-opacity-75">
                                                    <MdOutlineTimelapse className="h-7 w-7 text-white" />
                                                </div>

                                                <div className="mx-5">
                                                    <h4 className="text-2xl font-semibold text-gray-700">3453</h4>
                                                    <div className="text-gray-500 text-sm">Habitaciones en servicio</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="w-full px-2">
                                            <div className="flex items-center px-5 py-6 shadow-sm rounded-md bg-slate-100">
                                                <div className="p-3 rounded-full bg-pink-600 bg-opacity-75">
                                                    <MdOutlineBedroomParent className="h-7 w-7 text-white" />
                                                </div>

                                                <div className="mx-5">
                                                    <h4 className="text-2xl font-semibold text-gray-700">678</h4>
                                                    <div className="text-gray-500 text-sm">Habitaciones disponibles</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

        </>
    )
}

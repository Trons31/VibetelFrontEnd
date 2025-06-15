'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { IoIosArrowDown, IoIosClose } from 'react-icons/io';
import { IoChatbubbleEllipsesSharp } from 'react-icons/io5';
import { LuUserCircle } from 'react-icons/lu'
import { RiSendPlaneLine } from 'react-icons/ri'

export const ChatSupport = () => {

    const [showChatSupport, setshowChatSupport] = useState(false);


    return (
        <div>
            <AnimatePresence>
                {
                    showChatSupport
                    && (

                        <motion.div
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 100 }}
                            transition={{ type: 'spring', stiffness: 100 }}
                            className="fixed bottom-2 z-20 right-0 mr-4 rounded-lg w-[440px] h-[500px]  justify-between"
                        >
                            <button
                                onClick={() => setshowChatSupport(false)}
                                className='bg-indigo-600 flex w-full justify-between p-4 rounded-t-lg' >
                                <p className='text-white' >Soporte al cliente</p>
                                <IoIosArrowDown className='h-6 w-6 text-white' />
                            </button>
                            <div className='px-4 py-3 bg-white border-l border-r border-b rounded-b-lg border-[#e5e7eb]' >
                                <div className="flex-1 custom-scrollbar-table">
                                    <div className="grid pb-11">
                                        <div className="flex gap-2.5 mb-4">
                                            <Image
                                                src="/suport.png"
                                                width={20}
                                                height={20}
                                                alt="Shanay image"
                                                className="w-10 h-11"
                                            />
                                            <div className="grid">
                                                <h5 className="text-gray-900 text-sm font-semibold leading-snug pb-1">
                                                    Shanay cruz
                                                </h5>
                                                <div className="w-max grid">
                                                    <div className="px-3.5 py-2 bg-gray-100 rounded justify-start items-center gap-3 inline-flex">
                                                        <h5 className="text-gray-900 text-sm font-normal leading-snug">
                                                            Guts, I need a review of work. Are you ready?
                                                        </h5>
                                                    </div>
                                                    <div className="justify-end items-center inline-flex mb-2.5">
                                                        <h6 className="text-gray-500 text-xs font-normal leading-4 py-1">
                                                            05:14 PM
                                                        </h6>
                                                    </div>
                                                </div>
                                                <div className="w-max grid">
                                                    <div className="px-3.5 py-2 bg-gray-100 rounded justify-start items-center gap-3 inline-flex">
                                                        <h5 className="text-gray-900 text-sm font-normal leading-snug">
                                                            Let me know
                                                        </h5>
                                                    </div>
                                                    <div className="justify-end items-center inline-flex mb-2.5">
                                                        <h6 className="text-gray-500 text-xs font-normal leading-4 py-1">
                                                            05:14 PM
                                                        </h6>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2.5 justify-end">
                                        <div className="">
                                            <div className="grid mb-2">
                                                <h5 className="text-right text-gray-900 text-sm font-semibold leading-snug pb-1">
                                                    You
                                                </h5>
                                                <div className="px-3 py-2 bg-indigo-600 rounded">
                                                    <h2 className="text-white text-sm font-normal leading-snug">
                                                        Yes, let’s see, send your work here
                                                    </h2>
                                                </div>
                                                <div className="justify-start items-center inline-flex">
                                                    <h3 className="text-gray-500 text-xs font-normal leading-4 py-1">
                                                        05:14 PM
                                                    </h3>
                                                </div>
                                            </div>
                                            <div className="grid w-fit ml-auto">
                                                <div className="px-3 py-2 bg-indigo-600 rounded">
                                                    <h2 className="text-white text-sm font-normal leading-snug">
                                                        Anyone on for lunch today
                                                    </h2>
                                                </div>
                                                <div className="justify-start items-center inline-flex">
                                                    <h3 className="text-gray-500 text-xs font-normal leading-4 py-1">
                                                        You
                                                    </h3>
                                                </div>
                                            </div>
                                        </div>
                                        <img
                                            src="https://pagedone.io/asset/uploads/1704091591.png"
                                            alt="Hailey image"
                                            className="w-10 h-11"
                                        />
                                    </div>
                                </div>


                                <div className="w-full pl-3 pr-1 py-1 rounded-3xl border border-gray-200 items-center gap-2 inline-flex justify-between">
                                    <div className="flex items-center gap-2">
                                        <LuUserCircle className='h-5 w-5 text-indigo-600' />
                                        <input
                                            className="grow shrink basis-0 text-black text-xs font-medium leading-4 focus:outline-none"
                                            placeholder="Type here..."
                                        />
                                    </div>

                                    <button className="items-center flex justify-center w-fit gap-2 px-3 py-2 bg-indigo-600 rounded-full shadow">
                                        <RiSendPlaneLine className='h-4 w-4 text-white' />
                                        <p className='text-xs text-white' >Enviar</p>
                                    </button>

                                </div>
                            </div>

                        </motion.div>
                    )
                }
            </AnimatePresence>

            <AnimatePresence>
                {
                    !showChatSupport &&
                    (
                        <div>
                            <motion.button
                                initial={{ opacity: 0, x: 100 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 100 }}
                                transition={{ type: 'spring', stiffness: 100 }}
                                onClick={() => setshowChatSupport(true)}
                                className="fixed hidden md:inline-flex bottom-4 right-4  items-center justify-center text-sm font-medium disabled:pointer-events-none  border rounded-full w-12 md:w-16 h-12 md:h-16 bg-indigo-600 m-0 cursor-pointer  p-0 "
                                type="button" aria-haspopup="dialog" aria-expanded="false" data-state="closed">
                                <IoChatbubbleEllipsesSharp className='text-white h-5 md:h-8 w-5 md:w-8' />
                            </motion.button>
                        </div>
                    )
                }
            </AnimatePresence>
        </div>
    )
}

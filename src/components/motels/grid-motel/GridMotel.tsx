"use client";
import Link from "next/link";
import { titleFont } from "@/config/fonts";
import { MotelMostReserved } from "@/interfaces/motels.interface";
import { ItemMotel } from "./ItemMotel";
import { formatDate } from "@/utils";
import { ModalLocationMotel, ModalPopup, OptionsPopover } from "@/components";
import { FaQuestionCircle, FaRegStar } from "react-icons/fa";
import { useState } from "react";
import { IoBedSharp, IoLocationSharp } from "react-icons/io5";
import { BsPatchCheckFill } from "react-icons/bs";
import { MdOutlineBed } from "react-icons/md";
import { TbPointFilled } from "react-icons/tb";
import { FaBuildingCircleArrowRight } from "react-icons/fa6";

interface Props {
  motels: MotelMostReserved[];
}

export const GridMotel = ({ motels }: Props) => {
  const [modalNoServiceMotel, setModalNoServiceMotel] = useState(false);
  const [openModalLocationMotel, setOpenModalLocationMotel] = useState(false);

  return (
    <>
      <div className="p-0 md:px-24 2xl:px-64 mt-10">
        {motels.map((motel) => (
          <div key={motel.slug} className="p-2 mb-5">
            <ModalLocationMotel
              motelName={motel.title}
              motelLocationLatitude={motel.MotelConfig!.locationLatitude!}
              motelLocationLongitude={motel.MotelConfig!.locationLongitude!}
              isOpen={openModalLocationMotel}
              onClose={() => setOpenModalLocationMotel(false)}
            />

            <div className="flex py-4 justify-between items-center">
              <div>
                {!motel.MotelConfig?.inService && (
                  <button
                    onClick={() => setModalNoServiceMotel(true)}
                    className="hidden md:block bg-black px-2 py-1 rounded-lg"
                  >
                    <p className="text-white text-xs group-hover:text-black">
                      Fuera de servicio desde{" "}
                      {formatDate(motel.MotelConfig?.outOfServiceStart!)} hasta{" "}
                      {formatDate(motel.MotelConfig?.outOfServiceEnd!)}
                    </p>
                  </button>
                )}

                {!motel.MotelConfig?.inService && (
                  <>
                    <button
                      onClick={() => setModalNoServiceMotel(true)}
                      className="flex items-center gap-2  md:hidden bg-black px-2 py-1 w-fit rounded-lg"
                    >
                      <p className="text-white text-xs group-hover:text-black">
                        Fuera de servicio hasta{" "}
                        {formatDate(motel.MotelConfig?.outOfServiceEnd!)}
                      </p>
                      <FaQuestionCircle className="text-white" />
                    </button>
                    <ModalPopup
                      title={motel.title}
                      isOpen={modalNoServiceMotel}
                      onClose={() => setModalNoServiceMotel(false)}
                    >
                      <div>
                        <p className="mt-2 text-gray-800">
                          No se podrán realizar reservas entre las fechas
                          comprendidas desde el
                          <strong>
                            {` ${formatDate(
                              motel.MotelConfig?.outOfServiceStart!
                            )} `}
                          </strong>
                          hasta el
                          <strong>
                            {` ${formatDate(
                              motel.MotelConfig?.outOfServiceEnd!
                            )}.`}
                          </strong>
                        </p>
                        <p className="mt-2 text-gray-800">
                          Las reservas estarán disponibles únicamente para
                          fechas posteriores al período en que el motel esté
                          fuera de servicio.
                        </p>
                      </div>
                    </ModalPopup>
                  </>
                )}
                <div className="flex gap-2">
                  <div className="flex gap-1 items-center">
                    <span className="inline-flex items-center justify-center w-6 h-6 me-2 text-sm font-semibold text-blue-800 bg-blue-100 rounded-full ">
                      <BsPatchCheckFill />
                    </span>
                    <p
                      className={` ${titleFont.className} antialiased capitalize text-2xl font-semibold mr-2  `}
                    >
                      {motel.title}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 px-2 items-center mt-1" >
                  <p className="flex items-center text-xs gap-2" >
                    <MdOutlineBed className="h-4 w-4" />
                    20 habitaciones
                  </p>
                  <TbPointFilled className="w-2 h-2 flex-shrink-0" />
                  <p className="flex items-center text-xs gap-2" >
                    <FaRegStar className="h-3.5 w-3.5" />
                    5 calificacion
                  </p>
                  <TbPointFilled className="w-2 h-2 flex-shrink-0 hidden md:flex" />
                  <Link
                    href={`motel/info/${motel.slug}`}
                    className="text-xs hover:underline hidden md:flex"
                  >
                    ver mas
                  </Link>
                </div>
              </div>
              <div className="hidden md:flex gap-2">
                <Link href={`motels/${motel.slug}`} className="rounded-full py-1 px-3 border border-black text-xs text-black hover:bg-black hover:text-white transition-all duration-300" >
                  Ver todas las habitaciones
                </Link>
                <button
                  onClick={() => setOpenModalLocationMotel(true)}
                  className="bg-blue-600 border border-blue-600 py-1 text-xs px-3 rounded-full text-white hover:text-blue-600 hover:bg-white transition-all duration-300">
                  Ver en el mapa
                </button>
              </div>
            </div>

            <div className="flex md:hidden justify-end mb-3" >
              <OptionsPopover
                popoverContent={
                  <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    <button
                      onClick={() => {
                        setOpenModalLocationMotel(true);
                      }}
                      className="group flex items-center w-full px-4 py-1 text-xs text-gray-900 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                    >
                      <IoLocationSharp className="mr-3 h-3.5 w-3.5 text-gray-700 group-hover:text-gray-500" />
                      Ver en el mapa
                    </button>
                    <Link
                      href={`/motels/${motel.slug}`}
                      className="group flex items-center w-full px-4 py-1 text-xs text-gray-900 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                    >
                      <IoBedSharp className="mr-3 h-3.5 w-3.5 text-gray-700 group-hover:text-gray-500" />
                      Ver todas las habitaciones
                    </Link>
                    <Link
                      href={`motel/info/${motel.slug}`}
                      className="group flex items-center w-full px-4 py-1 text-xs text-gray-900 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                    >
                      <FaBuildingCircleArrowRight className="mr-3 h-3.5 w-3.5 text-gray-700 group-hover:text-gray-500" />
                      ver mas
                    </Link>
                  </div>
                }
              >
                <>
                  <IoBedSharp className="text-sm" />
                  Ver opciones
                </>
              </OptionsPopover>
            </div>
            <ItemMotel motel={motel.id} />

          </div>
        ))}
      </div>
    </>
  );
};

"use client";
import Link from "next/link";
import { Lobster } from "@/config/fonts";
import { MotelApi } from "@/interfaces/motels.interface";
import { ItemMotel } from "./ItemMotel";
import { formatDate } from "@/utils";
import { ModalLocationMotel, ModalPopup, OptionsPopover } from "@/components";
import { FaQuestionCircle, FaRegStar } from "react-icons/fa";
import { useState } from "react";
import { IoBedSharp, IoLocationSharp } from "react-icons/io5";
import { BsPatchCheckFill } from "react-icons/bs";
import { MdOutlineBed, MdOutlineLocationOn } from "react-icons/md";
import { TbLayoutGridAdd, TbPointFilled } from "react-icons/tb";
import { FaBuildingCircleArrowRight } from "react-icons/fa6";

interface Props {
  motels: MotelApi[];
}

export const GridMotel = ({ motels }: Props) => {

  const [modalNoServiceMotel, setModalNoServiceMotel] = useState(false);
  const [openModalLocationMotel, setOpenModalLocationMotel] = useState(false);

  return (
    <>
      <div className="p-0 md:px-24 2xl:px-64 mt-10">
        {motels.map((motel) => (
          <div key={motel.slug} className="p-2 md:p-0" >
            <ModalLocationMotel
              motelName={motel.razonSocial}
              motelLocationLatitude={motel.motelConfig!.locationLatitude!}
              motelLocationLongitude={motel.motelConfig!.locationLongitude!}
              isOpen={openModalLocationMotel}
              onClose={() => setOpenModalLocationMotel(false)}
            />

            <div className="flex py-4 justify-between items-center">
              <div>
                <div className="flex gap-2">
                  <div className="flex gap-1 items-center">
                    <span className="inline-flex items-center justify-center w-7 h-7 me-2 text-sm font-semibold text-red-600 bg-red-100 rounded-full ">
                      <BsPatchCheckFill />
                    </span>
                    <p
                      className={` ${Lobster.className} antialiased capitalize text-xl font-semibold mr-2  `}
                    >
                      {motel.razonSocial}
                    </p>
                    {!motel.motelConfig?.inService && (
                      <>
                        <button
                          onClick={() => setModalNoServiceMotel(true)}
                          className="flex items-center gap-2 bg-black px-2 py-1 w-fit rounded-full"
                        >
                          <p className="text-white block 2xl:hidden text-xs group-hover:text-black">
                            Fuera de servicio
                          </p>
                          <p className="text-white hidden 2xl:block text-xs group-hover:text-black">
                            Fuera de servicio desde {motel.motelConfig?.outOfServiceStart ? formatDate(motel.motelConfig.outOfServiceStart) : "desconocido"} hasta {motel.motelConfig?.outOfServiceEnd ? formatDate(motel.motelConfig.outOfServiceEnd) : "desconocido"}
                          </p>
                          <FaQuestionCircle className="text-white" />
                        </button>
                        <ModalPopup
                          title={motel.razonSocial}
                          isOpen={modalNoServiceMotel}
                          onClose={() => setModalNoServiceMotel(false)}
                        >
                          <div>
                            <p className="mt-2 text-gray-800">
                              No se podrán realizar reservas entre las fechas
                              comprendidas desde el <strong> {motel.motelConfig?.outOfServiceStart ? formatDate(motel.motelConfig.outOfServiceStart) : "desconocido"} hasta {motel.motelConfig?.outOfServiceEnd ? formatDate(motel.motelConfig.outOfServiceEnd) : "desconocido"} </strong> Las reservas estarán disponibles únicamente para
                              fechas posteriores al período en que el motel esté
                              fuera de servicio.
                            </p>
                          </div>
                        </ModalPopup>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex gap-1 md:gap-2 px-2 md:space-y-0 items-center mt-1" >
                  <p className="flex items-center text-xs gap-2" >
                    <MdOutlineBed className="h-3.5 w-3.5" />
                    {motel.totalRooms} habitaciones
                  </p>
                  <TbPointFilled className="w-2 h-2 flex-shrink-0 hidden md:block" />
                  <p className="flex items-center text-xs gap-2" >
                    <FaRegStar className="h-3.5 w-3.5" />
                    {
                      motel.averageRating === 0
                        ? "Sin calificacion"
                        : motel.averageRating
                    }
                    {
                      motel.averageRating > 0 &&
                      " Calificacion"
                    }
                  </p>
                  <TbPointFilled className="w-2 h-2 flex-shrink-0 hidden md:block" />
                  <p className="flex items-center text-xs gap-2" >
                    <MdOutlineLocationOn className="h-3.5 w-3.5" />
                    {motel.city.name}
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
              <div className="hidden lg:flex gap-2">
                <Link href={`motels/${motel.slug}`} className="text-black px-2 md:px-4 py-1 text-xs md:text-sm rounded-xl transition-all bg-gray-200 hover:bg-gray-300" >
                  Ver todas las habitaciones
                </Link>
                <button
                  onClick={() => setOpenModalLocationMotel(true)}
                  className="text-black px-2 md:px-4 py-1 text-xs md:text-sm rounded-xl transition-all bg-gray-200 hover:bg-gray-300">
                  Ver en el mapa
                </button>
              </div>
            </div>

            <div className="flex lg:hidden justify-end mb-3" >
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
                  <TbLayoutGridAdd className="h-4 w-4" />
                  Ver opciones
                </>
              </OptionsPopover>
            </div>
            <ItemMotel rooms={motel.rooms} />
          </div>
        ))}
      </div>
    </>
  );
};

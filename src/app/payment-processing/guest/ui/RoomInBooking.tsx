"use client";
import { useEffect, useState } from "react";
import { useBookingStore } from "@/store";
import Link from "next/link";

import { registerLocale } from "react-datepicker";
import { es } from "date-fns/locale/es";
registerLocale("es", es);

import { currencyFormat, formatDateWithHours } from "@/utils";
import { Amenities, ModalPopup, RoomImage } from "@/components";
import { FaQuestionCircle } from "react-icons/fa";
import { LuShieldCheck } from "react-icons/lu";
import { Lobster } from "@/config/fonts";

export const RoomInBooking = () => {
  const roomInBooking = useBookingStore((state) => state.Booking);
  const [isModalOpenExtraservices, setIsModalOpenExtraservices] =
    useState(false);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!roomInBooking?.id) return;
    setLoading(false);
  }, [roomInBooking?.id]);

  return (
    <>
      <div className="md:rounded-sm bg-white px-4 py-6">
        <div>
          <p className="font-sm font-bold text-lg">Motel</p>
        </div>

        <div className="mt-3">
          {loading && !roomInBooking ? (
            <div className="flex justify-start">
              <div className="w-52 h-4 mb-2 bg-gray-400 rounded-full animate-pulse"></div>
            </div>
          ) : (
            <Link
              href={`/motel/info/${roomInBooking?.motel.slug}`}
            >
              <p className={`${Lobster.className} text-lg antialiased font-bold text-red-600`}>
                {roomInBooking?.motel.title}
              </p>
            </Link>
          )}

          <div className="grid grid-cols md:grid-cols-3 mt-2 gap-3">
            {loading && !roomInBooking ? (
              <div className="flex justify-start">
                <div className="w-52 h-4 mb-2 bg-gray-400 rounded-full animate-pulse"></div>
              </div>
            ) : (
              <div>
                <p className="font-bold text-xs">Ubicacion</p>
                <p className="text-md capitalize">
                  {roomInBooking?.motel.location}
                </p>
              </div>
            )}

            {loading && !roomInBooking ? (
              <div className="flex justify-start">
                <div className="w-52 h-4 mb-2 bg-gray-400 rounded-full animate-pulse"></div>
              </div>
            ) : (
              <div>
                <p className="font-bold text-xs">Direccion</p>
                <p className="text-md capitalize">
                  {roomInBooking?.motel.address}
                </p>
              </div>
            )}

            {loading && !roomInBooking ? (
              <div className="flex justify-start">
                <div className="w-52 h-4 mb-2 bg-gray-400 rounded-full animate-pulse"></div>
              </div>
            ) : (
              <div>
                <p className="font-bold text-xs">Localidad</p>
                <p className="text-md capitalize">
                  {roomInBooking?.motel.neighborhood}
                </p>
              </div>
            )}

            {loading && !roomInBooking ? (
              <div className="flex justify-start">
                <div className="w-52 h-4 mb-2 bg-gray-400 rounded-full animate-pulse"></div>
              </div>
            ) : (
              <div>
                <p className="font-bold text-xs">Contacto</p>
                <p className="text-md capitalize">
                  {roomInBooking?.motel.contactPhone}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="md:rounded-sm bg-white px-4 py-6 mt-5">
        <div className="flex justify-between items-center">
          <p className="font-bold text-lg">Habitacion</p>
          {loading && !roomInBooking ? (
            <div className="flex justify-start">
              <div className="w-52 h-4 mb-2 bg-gray-400 rounded-full animate-pulse"></div>
            </div>
          ) : (
            <p className="text-sm capitalize">{roomInBooking?.category}</p>
          )}
        </div>

        <div className="mt-3">
          {loading && !roomInBooking ? (
            <div className="flex justify-start">
              <div className="w-52 h-4 mb-2 bg-gray-400 rounded-full animate-pulse"></div>
            </div>
          ) : (
            <p className="text-md">
              {roomInBooking?.title} - Nro {roomInBooking?.roomNumber}
            </p>
          )}

          <div className="grid grid-cols md:grid-cols-2 mt-4 md:mt-0">
            <div>
              {loading && !roomInBooking ? (
                <div className="flex justify-start">
                  <svg
                    className="w-24 h-24 text-gray-500 animate-pulse "
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 18"
                  >
                    <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                  </svg>
                </div>
              ) : (
                <RoomImage
                  className="w-32 rounded-lg "
                  src={roomInBooking?.image}
                  alt={roomInBooking?.title!}
                  width={200}
                  height={200}
                />
              )}
            </div>
            <div className="md:grid block md:grid-cols-2 mt-5 space-y-4 md:space-y-0">
              <div>
                <p className="font-bold text-md">Precio</p>
                {loading && !roomInBooking ? (
                  <div className="flex justify-start">
                    <div className="w-32 h-4 mb-2 bg-gray-400 rounded-full animate-pulse"></div>
                  </div>
                ) : (
                  <p className="">{currencyFormat(roomInBooking?.price!)}</p>
                )}
              </div>

              <div>
                <p className="font-bold text-md">Garaje</p>
                {loading && !roomInBooking ? (
                  <div className="flex justify-start">
                    <div className="w-32 h-4 mb-2 bg-gray-400 rounded-full animate-pulse"></div>
                  </div>
                ) : (
                  <p className="">{roomInBooking?.garage}</p>
                )}
              </div>
            </div>
            <div>
              <p className="text-md font-bold mt-7 mb-4">Incluye</p>

              {roomInBooking?.amenities &&
                roomInBooking?.amenities.length > 0 && (
                  <>
                    <Amenities amenities={roomInBooking?.amenities} />
                  </>
                )}

              {roomInBooking?.amenitiesRoom &&
                roomInBooking?.amenitiesRoom.length > 0 && (
                  <>
                    <Amenities amenities={roomInBooking?.amenitiesRoom} />
                  </>
                )}
            </div>
          </div>
        </div>
      </div>

      <div className="md:rounded-sm bg-white px-4 py-6 mt-5">
        <div className="flex justify-between items-center">
          <p className="font-bold text-lg">Reservacion</p>
          <div className="flex items-center gap-2">
            <LuShieldCheck className="h-5 w-5" />
            <p className="font-normal text-sm">Reserva protegida</p>
          </div>
        </div>

        <div className="mt-3">
          <div className="grid grid-cols md:grid-cols-2 space-y-4 md:space-y-0">
            <div>
              <p className="font-semibold text-md">Fecha de entrada</p>
              {loading && !roomInBooking ? (
                <div className="flex justify-start">
                  <div className="w-52 h-4 mb-2 bg-gray-400 rounded-full animate-pulse"></div>
                </div>
              ) : (
                <p>
                  {formatDateWithHours(new Date(roomInBooking?.arrivalDate!))}
                </p>
              )}
            </div>
            <div>
              <p className="font-semibold text-md">Fecha de salida</p>
              {loading && !roomInBooking ? (
                <div className="flex justify-start">
                  <div className="w-52 h-4 mb-2 bg-gray-400 rounded-full animate-pulse"></div>
                </div>
              ) : (
                <p>
                  {formatDateWithHours(new Date(roomInBooking?.departureDate!))}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols md:grid-cols-2 space-y-2 md:space-y-0 mt-4">
            <div>
              <p className="font-semibold text-md">Tiempo de servicio</p>
              {loading && !roomInBooking ? (
                <div className="flex justify-start">
                  <div className="w-52 h-4 mb-2 bg-gray-400 rounded-full animate-pulse"></div>
                </div>
              ) : (
                <p>{roomInBooking?.timeLimit} horas</p>
              )}
            </div>
            <div>
              {loading && !roomInBooking ? (
                <div className="flex justify-start">
                  <div className="w-52 h-4 mb-2 bg-gray-400 rounded-full animate-pulse"></div>
                </div>
              ) : (
                <>
                  <span className="flex items-center font-bold gap-2">
                    SobreCosto
                    <button
                      type="button"
                      onClick={() => setIsModalOpenExtraservices(true)}
                    >
                      <FaQuestionCircle />
                    </button>
                    <ModalPopup
                      title="¿Qué son los servicios adicionales?"
                      isOpen={isModalOpenExtraservices}
                      onClose={() => setIsModalOpenExtraservices(false)}
                    >
                      <div>
                        <p className="font-bold">
                          Información Importante para Nuestros usuarios
                        </p>
                        <p className="mt-2 font-light">
                          Los servicios adicionales son prestaciones extra que
                          algunos moteles ofrecen para mejorar la experiencia de
                          sus servicioss. Los servicios adicionales ofrecen
                          atención de calidad garantizada al cliente y
                          asistencia en el uso del servicio para cualquier
                          necesidad que puedan tener tus usuarios
                        </p>
                        <p className="mt-2 font-light">
                          Los costos de estos servicios son determinados por
                          cada motel y pueden variar. Se cobran para cubrir los
                          gastos adicionales asociados a proporcionar un
                          servicio más completo y de mayor calidad.
                        </p>
                        <p className="mt-2 font-light">
                          Le recomendamos consultar con el motel específico
                          donde desea hospedarse para obtener detalles sobre los
                          servicios adicionales disponibles y sus respectivos
                          costos.
                        </p>
                      </div>
                    </ModalPopup>
                  </span>
                  {loading && !roomInBooking ? (
                    <div className="flex justify-end">
                      <div className="w-52 h-4 mb-2 bg-gray-400 rounded-full animate-pulse"></div>
                    </div>
                  ) : (
                    <span className="text-right">
                      {" "}
                      {currencyFormat(roomInBooking!.surcharge!)}{" "}
                    </span>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        <div className="border-l-8 mt-4 border-purple-600 bg-purple-200 px-4 py-2 rounded-l-lg">
          <p className="font-bold text-lg">Importante</p>
          <p
            className="mt-2 text-sm font-medium"
            style={{ textAlign: "justify" }}
          >
            El motel <strong>{roomInBooking?.motel.title}</strong> tiene un
            plazo de espera despues de haber iniciado el serivicio de{" "}
            <strong>10 minutos</strong> es decir que si no tomas a tiempo tu
            servicio el motel te esperara hasta las <strong>3:10 pm</strong>{" "}
            despues de esta hora tu reserva sera cancelada automaticamente{" "}
          </p>
        </div>
      </div>
    </>
  );
};

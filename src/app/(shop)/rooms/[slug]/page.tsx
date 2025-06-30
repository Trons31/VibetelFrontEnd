import { Metadata, ResolvingMetadata } from "next";
import { notFound, redirect } from "next/navigation";

import { auth } from "@/auth.config";
import { inFavorites, } from "@/actions";
import {
  Amenities,
  BedroomSlideShow,
  BedroomSlideShowMobile,
  CommentRoom,
  FavoriteRoom,
  NoService,
  RatingRoom,
  RelatedRooms,
  RelatedRoomsMovil,
  SharedLinkRoom,
} from "@/components";
import { RoomNotAvailable } from "./ui/RoomNotAvailable";
import { BiSolidCarGarage } from "react-icons/bi";
import { FaStar, FaCheckCircle } from "react-icons/fa";
import { MdBedroomChild, MdTimer } from "react-icons/md";
import { TbPointFilled } from "react-icons/tb";
import { AddToReservationDeskTop } from "./ui/AddToReservationDeskTop";
import { AddToReservationMovil } from "./ui/AddToReservationMovil";
import { FaBuildingFlag } from "react-icons/fa6";
import { IoLocationSharp } from "react-icons/io5";
import { Lobster } from "@/config/fonts";
import { MethodsPayds } from "./ui/MethodsPayds";
import axios from "axios";
import { RoomApi } from "@/interfaces";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = params.slug;

  // fetch data
  let room: RoomApi;

  try {
    const response = await axios.get<RoomApi>(`${process.env.NEXT_PUBLIC_API_ROUTE}room/${slug}`);
    room = response.data;
  } catch (error: any) {
    notFound();
  }

  return {
    metadataBase: new URL(`${process.env.NEXT_PUBLIC_METADATABASE}`),
    title: room.title ?? "Habitacion no encontrada",
    description: room.description ?? "",
    openGraph: {
      title: room.title ?? "Habitacion no encontrada",
      description: room.description ?? "",
      images: [`${room.images[0]}`],
    },
  };
}

export default async function BedRoomPage({ params }: Props) {
  const session = await auth();
  let inFavoritesValidate;

  const { slug } = params;
  let room: RoomApi;

  try {
    const response = await axios.get<RoomApi>(`${process.env.NEXT_PUBLIC_API_ROUTE}room/${slug}`);
    room = response.data;
  } catch (error: any) {
    notFound();
  }


  // if (session) {
  //   inFavoritesValidate = await inFavorites(room.room.id, session.user.id);
  // }

  // const averageRating =
  //   room.ratings.length > 0
  //     ? (
  //       room.room.ratings.reduce((acc, curr) => acc + curr.rating, 0) /
  //       room.room.ratings.length
  //     ).toFixed(1)
  //     : "0.0";

  return (
    <>
      {/* <TopMenuRoom room={room.room} /> */}

      {room.status !== "AVAILABLE" && <RoomNotAvailable />}

      {
        !room.motel.motelConfig?.inService && (
          <NoService
            startDateOffService={room.motel.motelConfig?.outOfServiceStart!}
            endDateOffService={room.motel.motelConfig?.outOfServiceEnd!}
          />
        )}

      <AddToReservationMovil
        room={room}
        MotelConfig={room.motel.motelConfig}
      />

      <div className="mt-12 md:mt-8 md:px-24 2xl:px-64 md:py-14 mb-24 md:mb-16">

        <div className="hidden md:flex justify-between items-end">
          <div>
            <p className="capitalize text-2xl font-medium">{room.title}</p>
            {/* {room.room.ratings.length > 0 && (
              <div className="flex justify-start gap-2 items-center">
                <FaStar className="text-blue-500 w-4 h-4 mb-0.5" />
                <p>{averageRating}</p>
                <p>
                  {room.room.ratings.length}{" "}
                  {room.room.ratings.length > 1 ? "calificaciones" : "calificacion"}
                </p>
              </div>
            )} */}
          </div>
          <div className="flex gap-2 items-center">
            <SharedLinkRoom room={room} />

            {/* <FavoriteRoom
              roomId={room.room.id}
              inFavorites={
                session ? inFavoritesValidate?.ok : false
              }
            /> */}
          </div>
        </div>

        <div className="mt-14 md:mt-4">
          {
            room.images.length > 0
              ? (
                <>
                  <BedroomSlideShow
                    images={room.images.map(image => image.url)}
                    title={room.title}
                    className="hidden md:block"
                  />
                  <BedroomSlideShowMobile
                    images={room.images.map(image => image.url)}
                    title={room.title}
                    className="block md:hidden"
                  />
                </>
              ) : (
                <div className='flex border-b border-gray-200 md:border md:border-gray-200 md:rounded-3xl items-center justify-center h-full p-32' >
                  <svg className="w-28 h-28 text-gray-300 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                    <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                  </svg>
                </div>
              )
          }
        </div>

        <div className="hidden md:grid mt-8 md:grid-cols-12 gap-16 relative">
          <div className="col-span-7">
            <div className="">
              <div className="flex justify-start items-center gap-2 mb-5" >
                <p className={`${Lobster.className} text-2xl antialiased font-bold`}>Motel</p>
                <p className={`${Lobster.className} text-2xl antialiased text-red-600 font-bold`}>{room.motel.razonSocial}</p>
              </div>
              <div className="flex justify-between items-center" >
                <p className="capitalize text-xl">Habitacion: {room.title}</p>
                {/* {
                  room.room.ratings.length > 0 && (
                    <RatingRoom
                      ratings={room.room.ratings}
                    />
                  )
                } */}
              </div>
              <div className="flex mt-1 items-center gap-4">
                <div className="flex gap-1 items-center">
                  <MdBedroomChild className="h-5 w-5 text-gray-600" />
                  <p className="text-sm font-extralight">
                    Habitacion numero {room.roomNumber}
                  </p>
                </div>
                <TbPointFilled className="w-2 h-2 flex-shrink-0" />
                <div className="flex gap-1 items-center">
                  <BiSolidCarGarage className="h-5 w-5 text-gray-600" />
                  <p className="text-sm font-extralight">{room.garage.title}</p>
                </div>
                <TbPointFilled className="w-2 h-2 flex-shrink-0" />
                <div className="flex gap-1 items-center">
                  <MdTimer className="h-5 w-5 text-gray-600" />
                  <p className="text-sm font-extralight">
                    Tiempo de uso {room.timeLimit} horas
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 mb-8 border border-gray-200 border-dashed" />
            <div>
              <div className="mb-4">
                <p className="text-xl">Lo que esta habitacion ofrece</p>
              </div>
              <div className="max-w-lg mt-8">
                <Amenities amenities={room.amenities.map(amenitie => amenitie.amenities.name)} />
              </div>
              <div className="mt-12">
                <p
                  className="text-md font-extralight"
                  style={{ textAlign: "justify" }}
                >
                  {room.description}
                </p>
              </div>
            </div>
            <div className="mt-8 mb-8 border border-gray-200 border-dashed" />
            <div className="bg-gray-100 rounded-xl border px-3 py-6 border-gray-300">
              <p className="text-xl">A tener en cuenta</p>

              {/* Requisito de edad */}
              <div className="flex mt-5 justify-start gap-3 items-start">
                <FaCheckCircle className="w-4 h-4 flex-shrink-0 mt-1 text-green-600" />
                <p className="text-md font-extralight">
                  Para reservar debes ser{" "}
                  <span className="font-semibold">mayor de edad</span>.
                </p>
              </div>

              {/* Check-in */}
              <div className="flex mt-4 justify-start gap-3 items-start">
                <FaCheckCircle className="w-4 h-4 flex-shrink-0 mt-1 text-green-600" />
                <p className="text-md font-extralight">
                  El <span className="font-semibold">Check-in</span> debe
                  realizarse hasta{" "}
                  <span className="font-semibold">10 minutos antes</span> de la
                  hora reservada.
                </p>
              </div>

              {/* Check-out */}
              <div className="flex mt-4 justify-start gap-3 items-start">
                <FaCheckCircle className="w-4 h-4 flex-shrink-0 mt-1 text-green-600" />
                <p className="text-md font-extralight">
                  El <span className="font-semibold">Check-out</span> debe
                  realizarse{" "}
                  <span className="font-semibold">10 minutos antes</span> del
                  tiempo límite de la reserva.
                </p>
              </div>
            </div>
            <div className="mt-8 mb-8 border border-gray-200 border-dashed" />
            <div className="">
              <h2 className="text-xl">Métodos de pago</h2>
              <p className="text-gray-600 font-light text-sm mb-6">
                Nuestros métodos de pago más usados, con más de 10 opciones disponibles.
              </p>
              <div className="flex justify-end" >
                <MethodsPayds />
              </div>
              <div className="grid grid-cols-2 mt-8 gap-5 py-3 overflow-hidden">
                {/* Fila superior */}
                <div
                  className="flex items-center justify-center border border-blue-600 bg-blue-50 rounded-full shadow-sm py-4 px-1.5 md:p-6 text-center hover:bg-gray-100 transition-all cursor-pointer"
                >
                  <span className="text-base font-bold text-blue-600">
                    PSE
                  </span>
                </div>

                <div
                  className="flex items-center justify-center border border-blue-600 bg-blue-50 rounded-full shadow-sm py-4 px-1.5 md:p-6 text-center hover:bg-gray-100 transition-all cursor-pointer"
                >
                  <span className="text-base font-bold text-blue-600">
                    Nequi
                  </span>
                </div>

                {/* Fila inferior */}
                <div
                  className="flex items-center justify-center border border-blue-600 bg-blue-50 rounded-full shadow-sm py-4 px-1.5 md:p-6 text-center hover:bg-gray-100 transition-all cursor-pointer"
                >
                  <span className="text-base font-bold text-blue-600">
                    Bancolombia
                  </span>
                </div>

                <div
                  className="flex items-center justify-center border border-blue-600 bg-blue-50 rounded-full shadow-sm py-4 px-1.5 md:p-6 text-center hover:bg-gray-100 transition-all cursor-pointer"
                >
                  <span className="text-base font-bold text-blue-600">
                    Tarjeta de credito
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-8 mb-8 border border-gray-200 border-dashed" />
            <div>
              <p className="text-xl font-extralight">A donde iras</p>
              <div className="mt-4 flex justify-between items-center" >
                <div className="flex items-center gap-1" >
                  <FaBuildingFlag />
                  <p className="text-sm font-extralight" >Motel {room.motel.razonSocial}</p>
                </div>
                <div className="flex items-center gap-1" >
                  <IoLocationSharp />
                  <p className="text-sm font-extralight" >{room.motel.neighborhood}, {room.motel.address}</p>
                </div>
              </div>
              <div className="mt-2 w-full h-72 md:h-96 rounded-lg overflow-hidden shadow-lg">
                <iframe
                  title="Ubicación del Motel"
                  src={`https://www.google.com/maps?q=${room.motel.motelConfig.locationLatitude!},${room.motel.motelConfig?.locationLongitude!}&hl=es&z=15&output=embed`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe> *
              </div>
            </div>
          </div>
          <div className="col-span-5 w-full">
            <AddToReservationDeskTop
              room={room}
              MotelConfig={room.motel.motelConfig}
            />
          </div>
        </div>

        <div className="block md:hidden px-4 mt-4" >
          <div className="flex justify-end gap-2 items-center">
            <SharedLinkRoom room={room} />

            {/* <FavoriteRoom
              roomId={room.room.id}
              inFavorites={
                session ? inFavoritesValidate?.ok : false
              }
            /> */}
          </div>
          <div className="mt-2">
            <div className="flex justify-start items-center gap-2 mb-2" >
              <p className={`${Lobster.className} text-xl antialiased font-bold`}>Motel</p>
              <p className={`${Lobster.className} text-xl antialiased text-red-600 font-bold`}>{room.motel.razonSocial}</p>
            </div>
            <p className="capitalize text-xl">Habitacion: {room.title}</p>
            <div className="block mt-2 space-y-2 ">
              <div className="flex gap-1 items-center">
                <MdBedroomChild className="h-4 w-4 text-gray-600" />
                <p className="text-sm font-extralight">
                  N° {room.roomNumber}
                </p>
              </div>
              <div className="flex gap-1 items-center">
                <BiSolidCarGarage className="h-4 w-4 text-gray-600" />
                <p className="text-sm font-extralight">{room.garage.title}</p>
              </div>
              <div className="flex gap-1 items-center">
                <MdTimer className="h-4 w-4 text-gray-600" />
                <p className="text-sm font-extralight">
                  {room.timeLimit} horas
                </p>
              </div>
            </div>
            {/* {
              room.room.ratings.length > 0 && (
                <RatingRoom
                  ratings={room.room.ratings}
                />
              )
            } */}
          </div>
          <div>

          </div>
        </div>
        <div className="block md:hidden px-2 md:px-0" >
          <div className="mt-8 mb-8 border border-gray-200 border-dashed" />
        </div>
        <div className="block md:hidden px-4" >
          <div className="mb-2">
            <p className="text-xl">Lo que esta habitacion ofrece</p>
          </div>
          <div className="max-w-lg mt-5">
            <Amenities amenities={room.amenities.map(amenitie => amenitie.amenities.name)} />
          </div>
          <div className="mt-12">
            <p
              className="text-sm font-extralight"
              style={{ textAlign: "justify" }}
            >
              {room.description}
            </p>
          </div>
        </div>

        <div className="block md:hidden px-4 md:px-0" >
          <div className="mt-12 mb-8 border border-gray-200 border-dashed" />
        </div>

        <div className="block md:hidden px-4" >
          <div className="bg-gray-100 rounded-xl border px-3 py-6 border-gray-300">
            <p className="text-xl font-extralight">A tener en cuenta</p>

            {/* Requisito de edad */}
            <div className="flex mt-5 justify-start gap-3 items-start">
              <FaCheckCircle className="w-4 h-4 flex-shrink-0 mt-1 text-green-600" />
              <p className="text-sm font-extralight">
                Para reservar debes ser{" "}
                <span className="font-semibold">mayor de edad</span>.
              </p>
            </div>

            {/* Check-in */}
            <div className="flex mt-4 justify-start gap-3 items-start">
              <FaCheckCircle className="w-4 h-4 flex-shrink-0 mt-1 text-green-600" />
              <p className="text-sm font-extralight">
                El <span className="font-semibold">Check-in</span> debe
                realizarse hasta{" "}
                <span className="font-semibold">10 minutos antes</span> de la
                hora reservada.
              </p>
            </div>

            {/* Check-out */}
            <div className="flex mt-4 justify-start gap-3 items-start">
              <FaCheckCircle className="w-4 h-4 flex-shrink-0 mt-1 text-green-600" />
              <p className="text-sm font-extralight">
                El <span className="font-semibold">Check-out</span> debe
                realizarse{" "}
                <span className="font-semibold">10 minutos antes</span> del
                tiempo límite de la reserva.
              </p>
            </div>
          </div>
        </div>

        <div className="block md:hidden px-4 md:px-0" >
          <div className="mt-12 mb-8 border border-gray-200 border-dashed" />
        </div>
        <div className="block md:hidden px-4">
          <h2 className="text-2xl font-light text-gray-800">Métodos de pago</h2>
          <p className="text-gray-600 font-light text-sm mb-6">
            Nuestros métodos de pago más usados, con más de 10 opciones disponibles.
          </p>
          <div className="flex justify-end" >
            <MethodsPayds />
          </div>
          <div className="grid grid-cols-2 mt-8 gap-3 py-3 overflow-hidden">
            {/* Fila superior */}
            <div
              className="flex items-center justify-center border border-blue-600 bg-blue-50 rounded-full shadow-sm py-5 px-1.5 md:p-6 text-center hover:bg-gray-100 transition-all cursor-pointer"
            >
              <span className="text-xs font-bold text-blue-600">
                PSE
              </span>
            </div>

            <div
              className="flex items-center justify-center border border-blue-600 bg-blue-50 rounded-full shadow-sm py-5 px-1.5 md:p-6 text-center hover:bg-gray-100 transition-all cursor-pointer"
            >
              <span className="text-xs font-bold text-blue-600">
                Nequi
              </span>
            </div>

            {/* Fila inferior */}
            <div
              className="flex items-center justify-center border border-blue-600 bg-blue-50 rounded-full shadow-sm py-5 px-1.5 md:p-6 text-center hover:bg-gray-100 transition-all cursor-pointer"
            >
              <span className="text-xs font-bold text-blue-600">
                Bancolombia
              </span>
            </div>

            <div
              className="flex items-center justify-center border border-blue-600 bg-blue-50 rounded-full shadow-sm py-5 px-1.5 md:p-6 text-center hover:bg-gray-100 transition-all cursor-pointer"
            >
              <span className="text-xs font-bold text-blue-600">
                Tarjeta de credito
              </span>
            </div>
          </div>
        </div>
        <div className="block md:hidden px-2 md:px-0" >
          <div className="mt-12 mb-8 border border-gray-200 border-dashed" />
        </div>

        <div className="block md:hidden px-4" >
          <p className="text-xl font-extralight">A donde iras</p>
          <div className="mt-4 flex justify-start items-center" >
            <div className="flex items-center gap-2" >
              <IoLocationSharp />
              <p className="text-xs font-extralight" >{room.motel.neighborhood}, {room.motel.address}</p>
            </div>
          </div>
          <div className="mt-3 w-full h-72 md:h-96 rounded-lg overflow-hidden shadow-lg">
            <iframe
              title="Ubicación del Motel"
              src={`https://www.google.com/maps?q=${room.motel.motelConfig?.locationLatitude!},${room.motel.motelConfig?.locationLongitude!}&hl=es&z=15&output=embed`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>


        <div className="px-4 md:px-0" >
          <div className="mt-12 mb-4 border border-gray-200 border-dashed" />
        </div>
        {/* {
          room.room.ratings.length > 0 && (
            <div>
              <CommentRoom ratings={room.room.ratings} />
            </div>
          )
        }
        {
          room.room.ratings.length > 0 && (
            <div className="px-4 md:px-0" >
              <div className="mt-2 mb-8 border border-gray-200 border-dashed" />
            </div>
          )
        } */}
        <div className="hidden md:block" >
          <RelatedRooms category={room.category.name} />
        </div>
        <div className="block md:hidden px-4 " >
          <RelatedRoomsMovil
            category={room.category.name}
          />
        </div>
      </div>
    </>
  );
}

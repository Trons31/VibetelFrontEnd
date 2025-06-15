import { Metadata, ResolvingMetadata } from "next";
import { notFound, redirect } from "next/navigation";
import Image from 'next/image';

import { auth } from "@/auth.config";
import {
  GetAmenitiesByRoom,
  getBedroomBySlug,
  inFavorites,
} from "@/actions";
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
    redirect("/rooms");
  }

  return {
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
    redirect("/rooms");
  }

  if (!room) {
    notFound();
  }

  const motelConfig = {
    id: "default-config-id",
    timeMinutesCleanRoom: 20,
    defaultReservationAddTime: 15,
    inService: true,
    outOfServiceStart: null,
    outOfServiceEnd: null,
    locationLatitude: 4.60971, // Coordenadas de ejemplo
    locationLongitude: -74.08175,
    timeAwaitTakeReservation: 20,
    motelId: "motel-123",
  };

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

      {/* 
      //TODO: Habilitar cuando se trabaje disponibilidad de habitaciones
        {room.room.status !== "AVAILABLE" && <RoomNotAvailable />}
      */}
      {/* 
      {!room.motel.MotelConfig?.inService && (
        <NoService
          startDateOffService={room.room.motel.MotelConfig?.outOfServiceStart!}
          endDateOffService={room.room.motel.MotelConfig?.outOfServiceEnd!}
        />
      )} */}

      <AddToReservationMovil
        room={room}
        MotelConfig={motelConfig}
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
          <BedroomSlideShow
            images={room.images}
            title={room.title}
            className="hidden md:block"
          />
          <BedroomSlideShowMobile
            images={room.images}
            title={room.title}
            className="block md:hidden"
          />
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
              <div className="grid grid-cols-2 mt-8 gap-0 py-3 overflow-hidden">
                {/* Fila superior */}
                <div className="p-4 flex justify-center items-center border-b border-r border-gray-300">
                  <Image
                    src="/app/pse.jpg"
                    width={80}
                    height={50}
                    alt="PSE"
                    className="object-contain"
                  />
                </div>

                <div className="p-4 flex justify-center items-center border-b border-gray-300">
                  <div className="text-center">
                    <Image
                      src="/app/nequi.jpg"
                      width={150}
                      height={120}
                      alt="Nequi"
                      className="mx-auto mt-2 object-contain"
                    />
                  </div>
                </div>

                {/* Fila inferior */}
                <div className="p-4 flex justify-center items-center border-r border-gray-300">
                  <div className="text-center py-2">
                    <Image
                      src="/app/bcolombia.png"
                      width={160}
                      height={150}
                      alt="Bancolombia"
                      className="mx-auto mt-2 object-contain"
                    />
                  </div>
                </div>

                <div className="p-4 flex justify-center items-center">
                  <Image
                    src="/app/credit.png"
                    width={140}
                    height={100}
                    alt="Tarjetas de crédito"
                    className="object-contain"
                  />
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
                  {/* <p className="text-sm font-extralight" >{room.motel.city.name}, {room.motel.address}</p> */}
                </div>
              </div>
              <div className="mt-2 w-full h-72 md:h-96 rounded-lg overflow-hidden shadow-lg">
                {/* <iframe
                  title="Ubicación del Motel"
                  src={`https://www.google.com/maps?q=${room.room.motel.MotelConfig?.locationLatitude!},${room.room.motel.MotelConfig?.locationLongitude!}&hl=es&z=15&output=embed`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe> */}
              </div>
            </div>
          </div>
          <div className="col-span-5 w-full">
            <div className="sticky top-24">
              <AddToReservationDeskTop
                room={room}
                MotelConfig={motelConfig}
              />
            </div>
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
            <div className="flex mt-0.5 items-center gap-2">
              <div className="flex gap-1 items-center">
                <MdBedroomChild className="h-3 w-3 text-gray-600" />
                <p className="text-xs font-extralight">
                  N° {room.roomNumber}
                </p>
              </div>
              <TbPointFilled className="w-2 h-2 flex-shrink-0" />
              <div className="flex gap-1 items-center">
                <BiSolidCarGarage className="h-3 w-3 text-gray-600" />
                <p className="text-xs font-extralight">{room.garage.title}</p>
              </div>
              <TbPointFilled className="w-2 h-2 flex-shrink-0" />
              <div className="flex gap-1 items-center">
                <MdTimer className="h-3 w-3 text-gray-600" />
                <p className="text-xs font-extralight">
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
          <div className="grid grid-cols-2 mt-8 gap-0 py-3 overflow-hidden">
            {/* Fila superior */}
            <div className="p-4 flex justify-center items-center border-b border-r border-gray-300">
              <Image
                src="/app/pse.jpg"
                width={60}
                height={40}
                alt="PSE"
                className="object-contain"
              />
            </div>

            <div className="p-4 flex justify-center items-center border-b border-gray-300">
              <div className="text-center">
                <Image
                  src="/app/nequi.jpg"
                  width={120}
                  height={90}
                  alt="Nequi"
                  className="mx-auto mt-2 object-contain"
                />
              </div>
            </div>

            {/* Fila inferior */}
            <div className="p-4 flex justify-center items-center border-r border-gray-300">
              <div className="text-center py-2">
                <Image
                  src="/app/bcolombia.png"
                  width={120}
                  height={110}
                  alt="Bancolombia"
                  className="mx-auto mt-2 object-contain"
                />
              </div>
            </div>

            <div className="p-4 flex justify-center items-center">
              <Image
                src="/app/credit.png"
                width={100}
                height={60}
                alt="Tarjetas de crédito"
                className="object-contain"
              />
            </div>
          </div>
        </div>
        <div className="block md:hidden px-2 md:px-0" >
          <div className="mt-12 mb-8 border border-gray-200 border-dashed" />
        </div>

        <div className="block md:hidden px-4" >
          <p className="text-xl font-extralight">A donde iras</p>
          <div className="mt-4 flex justify-between items-center" >
            <div className="flex items-center gap-2" >
              <FaBuildingFlag className="h-3 w-3" />
              <p className="text-xs font-extralight" >Motel {room.motel.razonSocial}</p>
            </div>
            <div className="flex items-center gap-2" >
              <IoLocationSharp />
              {/* <p className="text-xs font-extralight" >{room.room.motel.city.name}, {room.room.motel.address}</p> */}
            </div>
          </div>
          <div className="mt-3 w-full h-72 md:h-96 rounded-lg overflow-hidden shadow-lg">
            {/* <iframe
              title="Ubicación del Motel"
              src={`https://www.google.com/maps?q=${room.room.motel.MotelConfig?.locationLatitude!},${room.room.motel.MotelConfig?.locationLongitude!}&hl=es&z=15&output=embed`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe> */}
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

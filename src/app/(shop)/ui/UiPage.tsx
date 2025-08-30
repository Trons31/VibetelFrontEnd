"use client";
import { useEffect, useState } from "react";
import { Lobster } from "@/config/fonts";
import { useLocationStore } from "@/store";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { IoSearchOutline } from "react-icons/io5";
import { MdLocationPin } from "react-icons/md";
import {
  InputSearchMovil,
  InputSearchRooms,
  ModalLocationUser,
  ModalLocationUserMovil,
  RoomImage,
} from "@/components";
import { LocationCity } from "@/interfaces";

interface motels {
  id: string;
  title: string;
  slug: string;
}

export const UiPage = () => {
  const { data: session } = useSession();
  const { locationUser } = useLocationStore();
  const isAuthenticated = !!session?.user;
  const [isLoading, setIsLoading] = useState(true);
  const [locationLoaded, setLocationLoaded] = useState(false);
  const [detectedLocation, setDetectedLocation] = useState<LocationCity | undefined>(undefined);
  const [searchInputMovil, setSearchInputMovil] = useState(false);
  const [loadingMotels, setLoadingMotels] = useState(true);
  const [modalLocationUser, setModalLocationUser] = useState(false);

  const [mostFrequentedMotels, setMostFrequentedMotels] = useState<motels[]>(
    []
  );
  // const [topRooms, setTopRooms] = useState<BedRooms[]>([]);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    // Aquí suponemos que locationUser es un valor que eventualmente se obtiene
    if (locationUser !== null) {
      setDetectedLocation(locationUser);
      setLocationLoaded(true);
    } else if (!locationLoaded) {
      // Si no se ha cargado completamente, esperar
      setTimeout(() => {
        setLocationLoaded(true);
      }, 2000); // Tiempo máximo para cargar
    }
  }, [locationUser, locationLoaded]);

  // useEffect(() => {
  //   if (locationLoaded) {
  //     const fetchMotels = async () => {
  //       const { ok, motels } = await getMostFrecuentedMotels(
  //         detectedLocation?.city
  //       );
  //       if (ok && motels) {
  //         setMostFrequentedMotels(motels);
  //       }
  //     };

  //     const fetchRooms = async () => {
  //       const { ok, topRooms } = await getTopReservedRooms(
  //         detectedLocation?.city
  //       );
  //       if (ok && topRooms) {
  //         setTopRooms(topRooms);
  //       }
  //     };

  //     fetchRooms();
  //     fetchMotels();
  //   }
  // }, [locationLoaded]);

  return (
    <>
      <InputSearchMovil
        location={detectedLocation?.id}
        isOpen={searchInputMovil}
        onClose={() => setSearchInputMovil(false)}
      />

      <ModalLocationUser
        isOpen={modalLocationUser}
        onClose={() => setModalLocationUser(false)}
      />

      <ModalLocationUserMovil
        isOpen={modalLocationUser}
        onClose={() => setModalLocationUser(false)}
      />

      <div className="h-screen flex items-center justify-center bg-red-600 rounded-lg">
        <div className="text-center text-white space-y-8 max-w-4xl">
          <div className="px-4 md:px-0" >
            <h1 className="text-lg md:text-2xl font-light"
              style={{ textAlign: 'justify', textAlignLast: 'center' }}
            >
              Con <span className="font-bold">Vibetel</span>, reservar habitaciones de motel es más fácil, rápido y seguro.
            </h1>
          </div>
          <div className="mt-6 px-4 md:px-0 flex items-center justify-center">
            {!isLoading &&
              (locationUser !== null && detectedLocation ? (
                <>
                  <InputSearchRooms location={detectedLocation?.id} />

                  <div className="fade-in flex md:hidden relative w-full">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                      <IoSearchOutline className="w-6 h-6 text-gray-500" />
                    </div>

                    <div className="flex items-center w-full">
                      <input
                        onClick={() => setSearchInputMovil(true)}
                        type="text"
                        className="w-full rounded-md text-gray-900 text-xs focus:outline-none ps-14 p-5 pr-10"
                        placeholder="Busca tu motel favorito, aqui podras encontrar tu habitacion perfecta."
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="fade-in hidden md:flex relative w-full">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                      <MdLocationPin className="w-6 h-6 text-gray-500" />
                    </div>

                    <div className="flex items-center w-full">
                      <input
                        onClick={() => setModalLocationUser(true)}
                        type="text"
                        className="w-full rounded-md text-gray-900 focus:outline-none ps-14 p-5 pr-10"
                        placeholder="¡Cuéntanos tu ubicación y encuentra los moteles más cercanos para ti!"
                      />
                    </div>
                  </div>

                  <div className="fade-in flex md:hidden relative w-full">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                      <MdLocationPin className="w-6 h-6 text-gray-500" />
                    </div>

                    <div className="flex items-center w-full">
                      <div
                        onClick={() => setModalLocationUser(true)}
                        className="w-full rounded-md text-gray-500 text-xs ps-14 p-5 pr-10 cursor-pointer border border-gray-300 bg-white"
                      >
                        ¡Cuéntanos tu ubicación!
                      </div>
                    </div>
                  </div>
                </>
              ))}
          </div>
          {
            !isLoading && (
              locationUser !== null && detectedLocation && (
                <div className="block md:flex items-center justify-center md:space-x-4 text-sm">
                  <Link href="/home" className="text-red-600 p-2 rounded-lg bg-white font-medium">
                    <span className="text-sm">Ver habitaciones</span>
                  </Link>
                </div>
              )
            )
          }
        </div>
      </div>


      {mostFrequentedMotels.length > 0 && (
        <div className="p-3 md:px-24 py-5 mt-16 mb-10 ">
          <div>
            <p className="text-lg md:text-2xl font-light">
              Moteles mas frecuentados
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-10 gap-2 mt-4 ml-8">
            {mostFrequentedMotels.map((motel) => (
              <Link
                href={`motels/${motel.slug}`}
                key={motel.id}
                className="group fade-in flex justify-center bg-gray-200 hover:bg-red-600 rounded p-2 duration-300 transition-all"
              >
                <p className="capitalize group-hover:text-white">
                  {motel.title}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}
      {/* 
      {topRooms.length > 0 && (
        <div className="p-3 md:px-24 py-5 mt-10 mb-10">
          <div>
            <p className="text-lg md:text-2xl font-light">
              Habitaciones mas reservadas
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-8 gap-2 mt-4">
            {topRooms.map((room) => (
              <Link
                href={`rooms/${room.slug}`}
                key={room.id}
                className="fade-in block p-2 duration-300 transition-all"
              >
                <div className="flex justify-center mt-2">
                  <RoomImage
                    className="rounded-full h-16 w-16 object-cover"
                    src={room.images[0]}
                    width={300}
                    height={100}
                    alt={room.title}
                  />
                </div>
                <div className="flex justify-center mt-2">
                  <p className="capitalize ">{room.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )} */}

      <div className="p-5 md:p-10 bg-gray-100">
        <h1 className=" text-3xl md:text-5xl font-bold text-center">
          Unete a{" "}
          <span className={`${Lobster.className}  antialiased font-bold`}>
            Vibe
          </span>
          <span className={` ${Lobster.className}  text-red-500 `}>Tel</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 mx-auto gap-2 justify-center items-center mt-10 p-0 md:px-20 py-10">
          <div className="max-w-sm bg-white border border-gray-300 rounded-lg shadow-gray-300 shadow-lg  mx-auto">
            <div className="h-36 overflow-hidden rounded-t-lg">
              <Image
                className="w-full h-full object-cover"
                src="/app/motel.jpg"
                width={300}
                height={200}
                alt=""
              />
            </div>
            <div className="p-2">
              <h5 className="mb-2 text-lg text-center font-bold text-gray-800">
                Registra tu motel
              </h5>
              <p
                className="mb-3 font-light text-xs text-center text-gray-700 "
                style={{ textAlign: 'justify', textAlignLast: 'center' }}
              >
                Registra tu motel en nuestra plataforma y conecta con más
                clientes locales cada día. Aumenta tu visibilidad y optimiza tus
                reservas de manera fácil y eficiente. ¡Únete ahora y comienza a
                potenciar tus ingresos!
              </p>
              <Link href="/motel-partner">
                <button className="w-full bg-red-100 p-3 transition-all duration-150 text-red-500 hover:bg-red-500 hover:text-white rounded">
                  Conocer mas
                </button>
              </Link>
            </div>
          </div>

          <div className="max-w-sm mt-10 md:mt-0 bg-white border border-gray-300 rounded-lg shadow-lg shadow-gray-300 mx-auto">
            <div className="h-36 overflow-hidden rounded-t-lg">
              <Image
                className="w-full h-full object-cover"
                src="/app/user.jpg"
                width={300}
                height={200}
                alt=""
              />
            </div>
            <div className="p-2">
              <h5 className="mb-2 text-lg text-center font-bold text-gray-800">
                Registrate como usuario
              </h5>
              <p
                className="mb-3 font-light text-xs text-center text-gray-700 "
                style={{ textAlign: 'justify', textAlignLast: 'center' }}
              >
                Regístrate ahora y accede instantáneamente a las mejores ofertas
                de moteles en tu área. Disfruta de reservas fáciles, rápidas y
                seguras. ¡Empieza tu próxima escapada con nosotros!
              </p>
              <Link href="/auth/login">
                <button className="w-full bg-red-100 p-3 transition-all duration-150 text-red-500 hover:bg-red-500 hover:text-white rounded">
                  Conocer mas
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

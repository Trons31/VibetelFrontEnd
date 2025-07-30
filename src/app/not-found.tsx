
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden z-1">
      <div className="flex flex-col-reverse md:flex-row w-full justify-center items-center align-middle" >

        <div className="text-center mt-10 md:mt-0" >
          <h2 className={` antialiased font-bold text-5xl`}>
            ERROR
          </h2>
          <p className="mt-2 mb-3 text-gray-700 text-sm sm:text-lg">
            ¡Parece que no podemos encontrar la pagina que estás buscando!
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-5 py-3.5 text-xs md:text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-800"
          >
            Volver a la página de inicio
          </Link>
        </div>

        <div className="px-5" >
          <Image
            src="/imgs/starman_750x750.png"
            alt="Starman"
            className="p-0 md:p-20"
            width={550}
            height={550}
          />
        </div>
      </div>
      {/* <!-- Footer --> */}
      <p className="absolute text-sm text-center text-gray-500 -translate-x-1/2 bottom-6 left-1/2">
        &copy; {new Date().getFullYear()} - VibeTel
      </p>
    </div>
  );
}

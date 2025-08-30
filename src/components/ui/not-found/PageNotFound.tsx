import Link from "next/link"
import Image from "next/image"

export const PageNotFound = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row  h-screen w-full justify-center items-center align-middle" >

      <div className="text-center px-2 mt-10 md:mt-0 mx-5" >
        <h2 className={` antialiased font-bold text-5xl`}>
          ERROR
        </h2>
        <p className="mt-2 mb-3 text-gray-700 text-sm sm:text-lg">
          ¡Parece que no podemos encontrar la habitación que estás buscando!
        </p>
        <Link
          href="/rooms"
          className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-5 py-3.5 text-xs md:text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-800"
        >
          Volver a la página de habitaciones
        </Link>
      </div>

      <div className="px-5  mx-5" >
        <Image
          src="/imgs/starman_750x750.png"
          alt="Starman"
          className="p-0 md:p-20"
          width={550}
          height={550}
        />
      </div>
    </div>
  )
}

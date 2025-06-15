import Link from "next/link";
import { Lobster } from "@/config/fonts";
import { format } from "date-fns";
import { MdEmail, MdLocationPin } from "react-icons/md";
import { FaFacebook, FaInstagramSquare, FaPhoneAlt } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
const currentYear = format(new Date(), "yyyy");

export const Footer = () => {
  return (
    <>
      <footer className="bottom-0 bg-white border border-top border-gray-200 ">
        <div className="container mx-auto">
          <div className="px-2 pb-5 md:pt-8">
            <div className="hidden mt-5 md:grid md:grid-cols-3 xl:grid-cols-2 md:gap-14">
              <div className="">
                <div>
                  <Link href="/">
                    <div className="flex items-center text-2xl font-medium">
                      <div>
                        <span
                          className={`${Lobster.className} text-2xl antialiased font-semibold`}
                        >
                          Vibe
                        </span>
                        <span
                          className={` ${Lobster.className} text-2xl antialiased text-red-600 font-semibold`}
                        >
                          Tel
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
                <div
                  className="w-full md:pr-10 mt-2 text-sm text-gray-800"
                  style={{ textAlign: "justify" }}
                >
                  Reserva fácilmente habitaciones de motel con vibeTel, una
                  plataforma que te permite encontrar moteles en tu zona y hacer
                  reservas de manera rápida y conveniente para una experiencia
                  sin complicaciones.
                </div>
                <div className="flex space-x-2">{/* Iconos */}</div>
              </div>
              <div className="md:col-span-2 xl:col-span-1 flex justify-between w-full">
                <div>
                  <h3 className="text-md font-semibold leading-6 text-black">
                    Paginas
                  </h3>
                  <ul role="list" className="mt-3 space-y-3">
                    <li>
                      <Link
                        href="/rooms"
                        className="text-sm leading-6 text-gray-800 hover:text-gray-900"
                      >
                        Habitaciones
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/motels"
                        className="text-sm leading-6 text-gray-800 hover:text-gray-900"
                      >
                        Moteles
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/"
                        className="text-sm leading-6 text-gray-800 hover:text-gray-900"
                      >
                        Ayuda
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/motelCoverage"
                        className="text-sm leading-6 text-gray-800 hover:text-gray-900"
                      >
                        Cobertura
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className="mt-10 md:mt-0">
                  <h3 className="text-sm font-semibold leading-6 text-black">
                    Guia de reserva
                  </h3>
                  <ul role="list" className="mt-3 space-y-3">
                    <li>
                      <Link
                        href="/"
                        className="text-sm leading-6 text-gray-800 hover:text-gray-900"
                      >
                        Reserva anonima
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/auth/new-account"
                        className="text-sm leading-6 text-gray-800 hover:text-gray-900"
                      >
                        Crear cuenta
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/"
                        className="text-sm leading-6 text-gray-800 hover:text-gray-900"
                      >
                        Realizar pago
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/"
                        className="text-sm leading-6 text-gray-800 hover:text-gray-900"
                      >
                        Ingresar al servicio
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className="mt-10 md:mt-0">
                  <h3 className="text-sm font-semibold leading-6 text-black">
                    Contactenos
                  </h3>
                  <ul role="list" className="mt-3 space-y-3">
                    <li>
                      <Link
                        href="/about"
                        className="flex items-center gap-1 text-sm leading-6 text-gray-800 hover:text-gray-900"
                      >
                        <MdEmail className="h-4 w-4 text-black" />
                        vibetel@gmail.com
                      </Link>
                    </li>
                    <li>
                      <div
                        className="flex items-center gap-1 text-sm leading-6 text-gray-800 hover:text-gray-900"
                      >
                        <FaPhoneAlt className="h-4 w-4 text-black" />
                        +57 304 1201032
                      </div>
                    </li>
                    <li>
                      <Link
                        href="/"
                        className="flex items-center gap-1 text-sm leading-6 text-gray-800 hover:text-gray-900"
                      >
                        <MdLocationPin className="h-4 w-4 text-black" />
                        Sincelejo, Sucre, Colombia
                      </Link>
                    </li>
                  </ul>
                </div>

              </div>
            </div>
            <div className="flex justify-center md:justify-end items-center gap-5 mt-4 md:mt-8 md:mr-4" >
              <a
                href="https://www.instagram.com/vibe_tel/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-1"
              >
                <RiInstagramFill className="h-4 w-4" />
                <span className="text-xs md:text-sm text-gray-600 group-hover:underline">Instagram</span>
              </a>


              <Link href="" className="group flex items-center gap-1" >
                <FaFacebook className="h-4 w-4" />
                <span className="text-xs md:text-sm text-gray-600 group-hover:underline" >Facebook</span>
              </Link>
            </div>
            <div className="block md:hidden space-y-2 mt-5" >
              <div className="p-2 bg-gray-100 rounded-xl" >
                <p className="text-xs font-extralight text-center" >Contactenos</p>
                <Link
                  href="/about"
                  className="flex ml-1 items-center gap-1 text-xs justify-center leading-6 text-gray-800 hover:text-gray-900"
                >
                  <MdEmail className="h-4 w-4 text-black" />
                  vibetel@gmail.com
                </Link>
              </div>
              <div className="p-2 bg-gray-100 rounded-xl">
                <p className="text-xs font-extralight text-center" >Ubicacion</p>
                <Link
                  href="/"
                  className="flex justify-center items-center gap-1 text-xs leading-6 text-gray-600 hover:text-gray-900"
                >
                  <MdLocationPin className="h-4 w-4 text-black" />
                  Sincelejo, Sucre, Colombia
                </Link>
              </div>

            </div>
            <div className="mt-5 md:border-t md:border-gray-400/30 md:pt-4 md:mt-5">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="mb-0">
                  <p className="text-gray-600 text-center text-xs md:text-sm">
                    © {currentYear} Vibetel SAS. Todos los derechos reservados.
                  </p>
                </div>
                <div className="hidden md:flex space-x-4">
                  <Link href="/motel-partner/privacy-policy" className="text-gray-600 hover:text-red-600 text-sm transition-colors">
                    Política de Privacidad
                  </Link>
                  <Link href="/motel-partner/terms-and-conditions" className="text-gray-600 hover:text-red-600 text-sm transition-colors">
                    Términos y Condiciones
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

import Link from "next/link";
import { Lobster } from "@/config/fonts";
import { format } from "date-fns";
import { MdEmail, MdLocationPin } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
const currentYear = format(new Date(), "yyyy");

export const FooterMotelPartners = () => {
  return (
    <>
      <footer className="bottom-0 bg-white border border-top border-gray-200 ">
        <div className="container mx-auto">
          <div className="mx-auto max-w-7xl px-6 pb-5 md:pt-8">
            <div className="hidden xl:grid xl:grid-cols-3 md:gap-14">
              <div className="">
                <div>
                  <Link href="/motel-partner">
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
                  Gestiona tu motel de manera eficiente con vibeTel, una plataforma
                  que te permite administrar tus habitaciones, gestionar reservas y
                  aumentar tus ingresos con una solución integral para la gestión
                  de tu negocio.
                </div>
                <div className="flex space-x-2">{/* Iconos */}</div>
              </div>
              <div className="mt-16 col-span-2 flex justify-between w-full xl:mt-0">
                <div>
                  <h3 className="text-md font-semibold leading-6 text-black">
                    Paginas
                  </h3>
                  <ul role="list" className="mt-3 space-y-3">
                    <li>
                      <Link
                        href="/motel-partner"
                        className="text-sm leading-6 text-gray-800 hover:text-gray-900"
                      >
                        Inicio
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/motel-partner/pricing"
                        className="text-sm leading-6 text-gray-800 hover:text-gray-900"
                      >
                        Precio
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/motel-partner/contact-us"
                        className="text-sm leading-6 text-gray-800 hover:text-gray-900"
                      >
                        Contacto
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className="mt-10 md:mt-0">
                  <h3 className="text-sm font-semibold leading-6 text-black">
                    Terminos y condiciones
                  </h3>
                  <ul role="list" className="mt-3 space-y-3">
                    <li>
                      <Link
                        href="/motel-partner/terms-and-conditions"
                        className="text-sm leading-6 text-gray-800 hover:text-gray-900"
                      >
                        Terminos y condiciones
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/motel-partner/privacy-policy"
                        className="text-sm leading-6 text-gray-800 hover:text-gray-900"
                      >
                        Politicas de privacidad
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
                        href="/motel-partner/contact-us"
                        className="flex items-center gap-1 text-sm leading-6 text-gray-800 hover:text-gray-900"
                      >
                        <MdEmail className="h-4 w-4 text-black" />
                        vibetel@gmail.com
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/motel-partner/contact-us"
                        className="flex items-center gap-1 text-sm leading-6 text-gray-800 hover:text-gray-900"
                      >
                        <FaPhoneAlt className="h-4 w-4 text-black" />
                        +57 304 1201032
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/motel-partner/contact-us"
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
            <div className="mt-5 md:border-t md:border-gray-400/30 md:pt-4 md:mt-12 ">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="mb-0">
                  <p className="text-gray-600 text-center text-xs md:text-sm">
                    © {currentYear} Vibetel SAS. Todos los derechos reservados.
                  </p>
                </div>
                <div className="hidden  md:flex space-x-4">
                  <Link href="/motel-partner/privacy-policy" className="text-gray-600 text-xs hover:text-red-600 md:text-sm transition-colors">
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

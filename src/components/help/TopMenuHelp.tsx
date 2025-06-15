"use client";
import Image from "next/image";
import Link from "next/link";
import { Lobster } from "@/config/fonts";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";

export const TopMenuHelp = () => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav className="flex fixed px-3 md:px-12 z-20 top-0 py-1 items-center bg-white w-full border-b border-gray-100 shadow-sm">
      <div className="flex justify-between items-center w-full">
        {/* <button
          onClick={() => router.back()}
          className="flex gap-1 items-center"
        >
          <IoIosArrowBack className="w-5 h-5 text-gray-700" />
          <span>Volver</span>
        </button> */}

        <div className="flex justify-between items-center gap-2">
          <Link
            href="/"
            className="hidden md:flex space-x-1 items-center"
            rel="noopener noreferrer"
          >
            <Image
              src="/app/LogoApp.png"
              width={35}
              height={35}
              alt="logoOficial.png"
            />
            <div>
              <span
                className={`${Lobster.className} text-2xl antialiased font-bold`}
              >
                Vibe
              </span>
              <span className={` ${Lobster.className} text-2xl text-red-600 `}>
                Tel
              </span>
            </div>
          </Link>

          <Link href="/" className="flex md:hidden" rel="noopener noreferrer">
            <Image
              src="/app/LogoApp.png"
              width={35}
              height={35}
              alt="logoOficial.png"
            />
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/auth/new-account"
            className={clsx(
              "m-2 px-2 py-1 rounded-md transition-all duration-150 hover:bg-red-500 hover:text-white",
              {
                "bg-red-500 text-white": pathname === "/auth/new-account",
              }
            )}
          >
            Crear cuenta
          </Link>
          <Link
            href="/auth/login/email"
            className={clsx(
              "m-2 px-2 py-1 rounded-md transition-all duration-150 hover:bg-red-500 hover:text-white",
              {
                "bg-red-500 text-white": pathname === "/auth/login/email",
              }
            )}
          >
            Ingresar
          </Link>
        </div>
      </div>
    </nav>
  );
};

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { clsx } from "clsx";
import { signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

import { useUIStore } from "@/store";
import {
  IoPersonOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoBedOutline,
  IoBusinessOutline,
  IoSearchCircleOutline,
  IoGiftOutline,
} from "react-icons/io5";
import { PiHeartStraight, PiUsersThree } from "react-icons/pi";
import { TbHomeShare, TbLocationSearch } from "react-icons/tb";
import { LiaCalendarDaySolid } from "react-icons/lia";
import { IoMdCloseCircle, IoMdHelpCircleOutline } from "react-icons/io";
import { RiLoginCircleLine } from "react-icons/ri";
import { Lobster } from "@/config/fonts";

export const SideBar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const isSideMenuOpen = useUIStore((state) => state.isSideMenuOpen);
  const closeSideMenu = useUIStore((state) => state.closeSideMenu);

  const { data: session } = useSession();

  const isAuthenticated = !!session?.user;

  const onRuting = () => {
    closeSideMenu();
    localStorage.setItem("redirectUrl", window.location.pathname);
  };

  useEffect(() => {
    if (isSideMenuOpen) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }

    return () => {
      document.body.style.overflowY = "auto";
    };
  }, [isSideMenuOpen]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      if (searchTerm === "") return;
      setShowSearch(false);
      setSearchTerm("");
      closeSideMenu();
      router.push(`/search/${searchTerm}`);
    }
  };

  return (
    <div>
      {
        isSideMenuOpen && (
          <>
            <div
              className="fixed top-0 left-0 w-screen h-screen z-40  bg-black opacity-30"
            />
          </>
        )
      }

      {
        isSideMenuOpen && (
          <>
            <div
              onClick={closeSideMenu}
              className="fade-in fixed top-0 left-0 w-screen h-screen z-40 backdrop-filter backdrop-blur-sm"
            />
          </>
        )
      }

      <nav
        className={
          clsx(
            "fade-in fixed p-5 right-0 top-0 w-full md:w-[300px] h-screen bg-white z-40 shadow-2xl transform transition-all duration-300 overflow-y-auto custom-scrollbar",
            {
              "translate-x-full": !isSideMenuOpen,
            }
          )
        }
      >
        {/*Icon Close */}
        <div className="mb-5 flex justify-between items-center">
          <Link href="/" className="flex  items-center">
            <span
              className={`${Lobster.className} text-xl antialiased font-bold`}
            >
              Vibe
            </span>
            <span className={` ${Lobster.className} text-xl text-red-500 `}>
              Tel
            </span>
          </Link>

          <button
            className="hover:bg-gray-200 p-1 rounded-md"
            onClick={closeSideMenu}
          >
            <IoMdCloseCircle className=" h-6 w-6 text-gray-600 md:h-5 md:w-5  cursor-pointer" />
          </button>
        </div>

        {/* {
          isAuthenticated && session.user.role === "user" && (
            <div className="relative  mt-2 py-3 mx-2 overflow-hidden rounded-md bg-red-600 sm:px-2">
              <div className="z-10 flex h-full flex-col items-center justify-center ">
                <svg className="w-8 h-8 text-gray-200 me-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                </svg>
                <h1 className="text-center text-md font-bold text-white">{session?.user.email}</h1>
                <p className="text-xs text-white">{session?.user.name}</p>
              </div>

              <div className="-z-1 absolute bottom-3 left-3 h-24 w-24 rounded-full bg-white bg-gradient-to-b from-white to-red-600 opacity-20"></div>
              <div className="-z-1 absolute -top-10 left-1/2 h-24 w-24 rounded-full bg-white bg-gradient-to-b from-white to-red-600 opacity-20"></div>
            </div>

          )
        } */}

        {/* Menu de opciones */}

        <div className="mt-2 mb-10">
          {isAuthenticated ? (
            <>
              <p className="text-xs text-gray-600  py-2">Perfil</p>

              <Link
                href="/profile"
                className={clsx(
                  "flex items-center mt-3 p-2 hover:bg-gray-200 rounded transition-all",
                  {
                    "bg-red-500 text-white hover:text-gray-700":
                      pathname === "/profile",
                  }
                )}
                onClick={closeSideMenu}
              >
                <IoPersonOutline size={25} />
                <span className="ml-5 text-md">Cuenta</span>
              </Link>

              <Link
                href="/vibeCoins"
                className={clsx(
                  "flex items-center mt-3 p-2 hover:bg-gray-200 rounded transition-all",
                  {
                    "bg-red-500 text-white hover:text-gray-700":
                      pathname === "/vibeCoins",
                  }
                )}
                onClick={closeSideMenu}
              >
                <IoGiftOutline size={25} />
                <span className="ml-5 text-md">VibePuntos</span>
              </Link>

              <Link
                href="/booking"
                className={clsx(
                  "flex items-center mt-3 p-2 hover:bg-gray-200 rounded transition-all",
                  {
                    "bg-red-500 text-white hover:text-gray-700":
                      pathname === "/booking",
                  }
                )}
                onClick={closeSideMenu}
              >
                <LiaCalendarDaySolid size={25} />
                <span className="ml-5 text-md">Reservas</span>
              </Link>

              <Link
                href="/favoriteRoom"
                className={clsx(
                  "flex items-center mt-3 p-2 hover:bg-gray-200 rounded transition-all",
                  {
                    "bg-red-500 text-white hover:text-gray-700":
                      pathname === "/favoriteRoom",
                  }
                )}
                onClick={closeSideMenu}
              >
                <PiHeartStraight size={25} />
                <span className="ml-5 text-md">Favoritos</span>
              </Link>

              <button
                onClick={() => {
                  signOut({ callbackUrl: "/" });
                  closeSideMenu();
                }}
                className="flex w-full items-center mt-3 p-2 hover:bg-gray-200 rounded transition-all"
              >
                <IoLogOutOutline size={25} />
                <span className="ml-5 text-md">Salir</span>
              </button>
            </>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="flex items-center justify-start mt-5 p-2 hover:bg-gray-200 rounded-md transition-all"
                onClick={() => onRuting()}
              >
                <IoLogInOutline size={25} />
                <span className="ml-5 text-md">Ingresar</span>
              </Link>

              <Link
                href="/searchBooking"
                className={clsx(
                  "flex items-center mt-3 p-2 justify-start hover:bg-gray-200 rounded-md transition-all",
                  {
                    "bg-red-500 text-white hover:text-gray-700":
                      pathname === "/searchBooking",
                  }
                )}
                onClick={() => onRuting()}
              >
                <IoSearchCircleOutline size={25} />
                <span className="ml-5 text-md">Reserva anonima</span>
              </Link>
            </>
          )}

          <div>
            {/* Barra divisoria */}
            <div className="w-full h-px bg-gray-200 my-5" />

            <p className="text-xs text-gray-600  py-2">Secciones</p>

            <Link
              href="/home"
              onClick={closeSideMenu}
              className={clsx(
                "flex items-center mt-3 p-2 hover:bg-gray-200 rounded transition-all",
                {
                  "bg-red-500 text-white hover:text-gray-700":
                    pathname === "/home",
                }
              )}
            >
              <TbHomeShare size={25} />
              <span className="ml-5 text-md">Inicio</span>
            </Link>

            <Link
              href="/rooms"
              onClick={closeSideMenu}
              className={clsx(
                "flex items-center mt-3 p-2 hover:bg-gray-200 rounded transition-all",
                {
                  "bg-red-500 text-white hover:text-gray-700":
                    pathname === "/rooms",
                }
              )}
            >
              <IoBedOutline size={25} />
              <span className="ml-5 text-md">Habitaciones</span>
            </Link>

            <Link
              href="/motels"
              onClick={closeSideMenu}
              className={clsx(
                "flex items-center mt-3 p-2 hover:bg-gray-200 rounded transition-all",
                {
                  "bg-red-500 text-white hover:text-gray-700":
                    pathname === "/motels",
                }
              )}
            >
              <IoBusinessOutline size={25} />
              <span className="ml-5 text-md">Moteles</span>
            </Link>
          </div>

          <div>
            {/* Barra divisoria */}
            <div className="w-full h-px bg-gray-200 my-5" />

            <p className="text-xs text-gray-600  py-2">Otros</p>

            <Link
              href="/motelCoverage"
              onClick={closeSideMenu}
              className={clsx(
                "flex items-center mt-3 p-2 hover:bg-gray-200 rounded transition-all",
                {
                  "bg-red-500 text-white hover:text-gray-700":
                    pathname === "/motelCoverage",
                }
              )}
            >
              <TbLocationSearch size={25} />
              <span className="ml-5 text-md">Cobertura</span>
            </Link>

            <Link
              href="/motel-partner"
              onClick={closeSideMenu}
              className={clsx(
                "flex items-center mt-3 p-2 hover:bg-gray-200 rounded transition-all",
                {
                  "bg-red-500 text-white hover:text-gray-700":
                    pathname === "/socio-motel",
                }
              )}
            >
              <RiLoginCircleLine size={25} />
              <span className="ml-5 text-md">Registra tu motel</span>
            </Link>

            <Link
              href="/about"
              onClick={closeSideMenu}
              className={clsx(
                "flex items-center mt-3 p-2 hover:bg-gray-200 rounded transition-all",
                {
                  "bg-red-500 text-white hover:text-gray-700":
                    pathname === "/about",
                }
              )}
            >
              <PiUsersThree size={25} />
              <span className="ml-5 text-md">Quienes somos</span>
            </Link>

            <Link
              href="/help"
              onClick={closeSideMenu}
              className={clsx(
                "flex items-center mt-3 p-2 hover:bg-gray-200 rounded transition-all",
                {
                  "bg-red-500 text-white hover:text-gray-700":
                    pathname === "/help",
                }
              )}
            >
              <IoMdHelpCircleOutline size={25} />
              <span className="ml-5 text-md">Ayuda</span>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

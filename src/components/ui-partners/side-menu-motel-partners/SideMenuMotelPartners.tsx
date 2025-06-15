"use client";

import { useEffect } from "react";
import Link from "next/link";
import { clsx } from "clsx";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

import { useUIStore } from "@/store";
import {
    IoPersonOutline,
    IoLogInOutline,
    IoLogOutOutline,
    IoCallOutline,
    IoPricetagsOutline,
} from "react-icons/io5";
import { logout } from "@/actions";
import { TbHomeShare } from "react-icons/tb";
import { LiaBookReaderSolid } from "react-icons/lia";
import { IoMdCloseCircle, IoMdHelpCircleOutline } from "react-icons/io";
import { Lobster } from "@/config/fonts";
import { MdOutlineContactSupport, MdOutlinePolicy } from "react-icons/md";
import { RiLoginCircleLine } from "react-icons/ri";

export const SideMenuMotelPartners = () => {
    const pathname = usePathname();

    const isSideMenuOpen = useUIStore((state) => state.isSideMenuOpenMotelPartners);
    const closeSideMenu = useUIStore((state) => state.closeSideMenuMotelPartners);

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


    return (
        <div>
            {

                isSideMenuOpen && (
                    <>
                        <div
                            className="fixed top-0 left-0 w-screen h-screen z-20  bg-black opacity-30"
                        />
                    </>
                )
            }

            {
                isSideMenuOpen && (
                    <>
                        <div
                            onClick={closeSideMenu}
                            className="fade-in fixed top-0 left-0 w-screen h-screen z-20 backdrop-filter backdrop-blur-sm"
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
                            Motel
                        </span>
                        <span className={` ${Lobster.className} text-xl text-red-500 `}>
                            Partners
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
                                href="/admin/dashboard-partner-motel"
                                className={clsx(
                                    "flex items-center mt-3 p-2 hover:bg-gray-200 rounded transition-all",
                                    {
                                        "bg-red-500 text-white hover:text-gray-700":
                                            pathname === "/admin/dashboard-partner-motel",
                                    }
                                )}
                                onClick={closeSideMenu}
                            >
                                <IoPersonOutline size={25} />
                                <span className="ml-5 text-md">Dashboard</span>
                            </Link>

                            <button
                                onClick={() => {
                                    logout(), closeSideMenu();
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
                                href="/auth/partner"
                                className="flex items-center justify-start mt-5 p-2 hover:bg-gray-200 rounded transition-all"
                                onClick={() => onRuting()}
                            >
                                <IoLogInOutline size={25} />
                                <span className="ml-5 text-md">Ingresar</span>
                            </Link>

                            <Link
                                href="/auth/partner"
                                className="flex items-center justify-start mt-3 p-2 rounded hover:bg-gray-200 transition-all"
                            >
                                <RiLoginCircleLine size={25} />
                                <span className="ml-5 text-md">Registrar</span>
                            </Link>
                        </>
                    )}

                    <div>
                        {/* Barra divisoria */}
                        <div className="w-full h-px bg-gray-200 my-5" />

                        <p className="text-xs text-gray-600  py-2">Secciones</p>

                        <Link
                            href="/motel-partner"
                            onClick={closeSideMenu}
                            className={clsx(
                                "flex items-center mt-3 p-2 hover:bg-gray-200 rounded transition-all",
                                {
                                    "bg-red-500 text-white hover:text-gray-700":
                                        pathname === "/motel-partner",
                                }
                            )}
                        >
                            <TbHomeShare size={25} />
                            <span className="ml-5 text-md">Inicio</span>
                        </Link>

                        <Link
                            href="/motel-partner/pricing"
                            onClick={closeSideMenu}
                            className={clsx(
                                "flex items-center mt-3 p-2 hover:bg-gray-200 rounded transition-all",
                                {
                                    "bg-red-500 text-white hover:text-gray-700":
                                        pathname === "/motel-partner/pricing",
                                }
                            )}
                        >
                            <IoPricetagsOutline size={25} />
                            <span className="ml-5 text-md">Precios</span>
                        </Link>

                        <Link
                            href="/motel-partner/contact-us"
                            onClick={closeSideMenu}
                            className={clsx(
                                "flex items-center mt-3 p-2 hover:bg-gray-200 rounded transition-all",
                                {
                                    "bg-red-500 text-white hover:text-gray-700":
                                        pathname === "/motel-partner/contact-us",
                                }
                            )}
                        >
                            <MdOutlineContactSupport size={25} />
                            <span className="ml-5 text-md">Contacto</span>
                        </Link>
                    </div>

                    <div>
                        {/* Barra divisoria */}
                        <div className="w-full h-px bg-gray-200 my-5" />

                        <p className="text-xs text-gray-600  py-2">Otros</p>

                        <Link
                            href="/motel-partner/terms-and-conditions"
                            onClick={closeSideMenu}
                            className={clsx(
                                "flex items-center mt-3 p-2 hover:bg-gray-200 rounded transition-all",
                                {
                                    "bg-red-500 text-white hover:text-gray-700":
                                        pathname === "/motel-partner/terms-and-conditions",
                                }
                            )}
                        >
                            <LiaBookReaderSolid size={25} />
                            <span className="ml-5 text-md">Terminos y condiciones</span>
                        </Link>

                        <Link
                            href="/motel-partner/privacy-policy"
                            onClick={closeSideMenu}
                            className={clsx(
                                "flex items-center mt-3 p-2 hover:bg-gray-200 rounded transition-all",
                                {
                                    "bg-red-500 text-white hover:text-gray-700":
                                        pathname === "/motel-partner/privacy-policy",
                                }
                            )}
                        >
                            <MdOutlinePolicy size={25} />
                            <span className="ml-5 text-md">Politica de privacidad</span>
                        </Link>
                    </div>
                </div>
            </nav>
        </div>
    );
};

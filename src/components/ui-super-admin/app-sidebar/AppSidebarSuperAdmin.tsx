"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebarStore } from "@/store";
import {
  IoBedOutline
} from "react-icons/io5";
import { TiHomeOutline } from "react-icons/ti";
import { BsBuildingGear, BsThreeDots } from "react-icons/bs";
import clsx from "clsx";
import Image from "next/image";
import { LuUserCog } from "react-icons/lu";
import { Lobster } from "@/config/fonts";
import { useSession } from "next-auth/react";
import { FaBuildingFlag } from "react-icons/fa6";
import { FaRegCalendarAlt, FaUserCog } from "react-icons/fa";
import { MdOutlineAddHome, MdOutlineAddHomeWork, MdOutlineAddLocationAlt, MdOutlineCategory } from "react-icons/md";
import { BiSolidCarGarage } from "react-icons/bi";

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
};

const navItems: NavItem[] = [
  {
    icon: <TiHomeOutline />,
    name: "Dashboard",
    path: "/admin/dashboard-super-admin",
  }
];

const configItems: NavItem[] = [
  {
    icon: <BsBuildingGear />,
    name: "Moteles",
    path: "/admin/dashboard-super-admin/motel",
  },
  {
    icon: <FaRegCalendarAlt />,
    name: "Reservas",
    path: "/",
  },
  {
    icon: <FaUserCog />,
    name: "Usuarios",
    path: "/",
  }
];

const motels: NavItem[] = [
  {
    icon: <MdOutlineAddHomeWork />,
    name: "Comodidades",
    path: "/",
  }
];

const rooms: NavItem[] = [
  {
    icon: <MdOutlineCategory />,
    name: "Categorias",
    path: "/",
  },
  {
    icon: <BiSolidCarGarage />,
    name: "Garages",
    path: "/",
  },
  {
    icon: <MdOutlineAddHome/>,
    name: "Comodidades",
    path: "/",
  }
];

const locations: NavItem[] = [
  {
    icon: <MdOutlineAddLocationAlt />,
    name: "Pais",
    path: "/",
  },
  {
    icon: <MdOutlineAddLocationAlt />,
    name: "Departamento",
    path: "/",
  },
  {
    icon: <MdOutlineAddLocationAlt />,
    name: "Ciudad",
    path: "/",
  }
];



export const AppSidebarSuperAdmin = () => {
  const { data: session, status } = useSession();
  const { isExpanded, isMobileOpen, setIsMobileOpen } = useSidebarStore();
  const pathname = usePathname();
  const [openSubmenu, setOpenSubmenu] = useState<{ type: string; index: number } | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>({});
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const isActive = useCallback((path: string) => path === pathname, [pathname]);

  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      const ref = subMenuRefs.current[key];
      if (ref) {
        setSubMenuHeight((prev) => ({
          ...prev,
          [key]: ref.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileOpen]);

  const renderMenuItems = (items: NavItem[], menuType: string) => (
    <ul
      className={clsx("flex flex-col", {
        "gap-9": !isExpanded && !isMobileOpen,
        "gap-1": isExpanded && !isMobileOpen
      })}
    >
      {items.map((nav, index) => (
        <li key={nav.name}>
          {nav.path && (
            <Link
              href={nav.path}
              onClick={() => isMobileOpen && setIsMobileOpen(false)}
              className={`menu-item group flex rounded-lg p-2 hover:bg-gray-200
                ${!isExpanded && !isMobileOpen ? "justify-center items-center" : "items-center"}
                ${isActive(nav.path) ? "bg-red-600 text-white hover:text-gray-800 hover:bg-gray-200" : "menu-item-inactive"}
              `}
            >
              <span
                className={clsx(
                  "transition-all duration-300",
                  isActive(nav.path) ? "menu-item-icon-active" : "menu-item-icon-inactive",
                  !isExpanded && !isMobileOpen ? "text-2xl mx-auto" : "mr-2 text-base"
                )}
              >
                {nav.icon}
              </span>
              {(isExpanded || isMobileOpen) && (
                <span className="menu-item-text">{nav.name}</span>
              )}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );


  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-3 left-0 bg-white text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200
        ${isExpanded || isMobileOpen ? "w-[290px]" : "w-[90px]"}
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
    >
      <div className={`py-8 hidden md:flex ${!isExpanded ? "lg:justify-center" : "justify-start"}`}>
        <Link href="/admin/dashboard-partner-motel">
          {isExpanded || isMobileOpen ? (
            <>
              <span className={`${Lobster.className} text-xl md:text-xl antialiased font-bold`}>Super</span>
              <span className={`${Lobster.className} text-xl md:text-xl text-red-500`}> Admin </span>
            </>
          ) : (
            <Image
              src="/app/LogoApp.png"
              width={35}
              height={35}
              alt="logoOficial.png"
            />
          )}
        </Link>
      </div>

      <div className={
        clsx(
          {
            "mt-2 fade-in -ml-4 flex gap-4 justify-center items-center": isExpanded,
            hidden: !isExpanded,
          }
        )
      }>
        <div className='flex justify-center'>
          <div className='bg-gray-200 p-4 flex justify-center rounded-lg'>
            <LuUserCog className='h-8 w-8 text-gray-600' />
          </div>
        </div>
        <div className='text-center'>
          <h5 className="text-lg font-bold mt-2">Super admin</h5>
          <span className='underline text-center text-xs block max-w-[120px] truncate overflow-hidden'>
            {session?.user.email}
          </span>
        </div>
      </div>

      <div className="flex mt-10 flex-col mb-32 md:mb-10 overflow-y-auto duration-300 ease-linear custom-scrollbar-hidden px-2">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">

            {/* INICIO */}
            <div>
              <h2 className={`text-xs uppercase flex leading-[20px] text-gray-400 ${!isExpanded ? "lg:justify-center mb-7" : "mb-4 justify-start"}`}>
                {isExpanded || isMobileOpen ? "Inicio" : <BsThreeDots className="text-xl" />}
              </h2>
              {renderMenuItems(navItems, "main")}
            </div>

            <div>
              <h2 className={`text-xs uppercase flex leading-[20px] text-gray-400 ${!isExpanded ? "lg:justify-center mb-7" : "mb-4 justify-start"}`}>
                {isExpanded || isMobileOpen ? "Configuracion" : <BsThreeDots className="text-xl" />}
              </h2>
              {renderMenuItems(configItems, "main")}
            </div>


            <div>
              <h2 className={`text-xs uppercase flex leading-[20px] text-gray-400 ${!isExpanded ? "lg:justify-center mb-7" : "mb-4 justify-start"}`}>
                {isExpanded || isMobileOpen ? "Moteles" : <BsThreeDots className="text-xl" />}
              </h2>
              {renderMenuItems(motels, "main")}
            </div>

            <div>
              <h2 className={`text-xs uppercase flex leading-[20px] text-gray-400 ${!isExpanded ? "lg:justify-center mb-7" : "mb-4 justify-start"}`}>
                {isExpanded || isMobileOpen ? "Habitaciones" : <BsThreeDots className="text-xl" />}
              </h2>
              {renderMenuItems(rooms, "main")}
            </div>

            <div>
              <h2 className={`text-xs uppercase flex leading-[20px] text-gray-400 ${!isExpanded ? "lg:justify-center mb-7" : "mb-4 justify-start"}`}>
                {isExpanded || isMobileOpen ? "Ubicaciones" : <BsThreeDots className="text-xl" />}
              </h2>
              {renderMenuItems(locations, "main")}
            </div>
          </div>
        </nav>

      </div>
    </aside>
  );
};

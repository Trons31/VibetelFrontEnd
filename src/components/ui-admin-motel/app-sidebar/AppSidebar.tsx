"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebarStore } from "@/store";
import {
  IoBedOutline, IoSettingsOutline, IoLogIn
} from "react-icons/io5";
import {
  MdOutlineEventAvailable,
  MdSupportAgent,
  MdContentPasteSearch
} from "react-icons/md";
import {
  FaRegUserCircle,
  FaRegCreditCard
} from "react-icons/fa";
import {
  RiCalendarCheckFill,
  RiCalendarCloseFill
} from "react-icons/ri";
import {
  TbPresentationAnalytics,
  TbDeviceAnalytics
} from "react-icons/tb";
import { TiHomeOutline } from "react-icons/ti";
import { BsThreeDots } from "react-icons/bs";
import clsx from "clsx";
import { isApprovedStatus, Tier } from "@/interfaces";
import { AdminImage } from "@/components";
import { fontPoppins, Lobster } from "@/config/fonts";
import Image from "next/image";
import { BiMoneyWithdraw } from "react-icons/bi";

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
};

const navItems: NavItem[] = [
  {
    icon: <TiHomeOutline />,
    name: "Dashboard",
    path: "/admin/dashboard-partner-motel",
  },
  {
    icon: <IoBedOutline />,
    name: "Habitaciones",
    path: "/admin/dashboard-partner-motel/room",
  },
  {
    icon: <MdOutlineEventAvailable />,
    name: "Solicitud de reservas",
    path: "/admin/dashboard-partner-motel/reservation-requests",
  },
];

const supportItems: NavItem[] = [
  {
    icon: <MdSupportAgent />,
    name: "Acceder al soporte",
    path: "/admin/dashboard-partner-motel/support",
  },
];

const configItems: NavItem[] = [
  {
    icon: <FaRegUserCircle />,
    name: "Perfil",
    path: "/admin/dashboard-partner-motel/profile",
  },
  {
    icon: <FaRegCreditCard />,
    name: "Cuenta bancaria",
    path: "/admin/dashboard-partner-motel/config-motel/bank-account",
  },
  {
    icon: <IoSettingsOutline />,
    name: "Ajustes adicionales",
    path: "/admin/dashboard-partner-motel/additional-settings",
  },
];

interface Props {
  motelStatus: isApprovedStatus;
  motelName: string;
  motelImage?: string;
  subscription: Tier;
}

export const AppSidebar = ({ motelName, motelStatus, subscription, motelImage }: Props) => {
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

  const TIER_ORDER: Tier[] = ['FREE', 'BASIC', 'PREMIUM', 'ENTERPRISE'];
  const getNextTier = (current: Tier): Tier | null => {
    const currentIndex = TIER_ORDER.indexOf(current);
    return currentIndex < TIER_ORDER.length - 1 ? TIER_ORDER[currentIndex + 1] : null;
  };

  const nextTier = getNextTier(subscription);

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
              <span className={`${Lobster.className} text-xl md:text-xl antialiased font-bold`}>Motel</span>
              <span className={`${Lobster.className} text-xl md:text-xl text-red-500`}> Partner </span>
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

      <div
        className={clsx({
          "mt-2 fade-in -ml-4 flex gap-4 justify-center items-center": isExpanded,
          hidden: !isExpanded,
        })}
      >
        <div className="flex justify-center">
          <AdminImage
            src={motelImage}
            width={300}
            height={100}
            alt="administrador"
            className="rounded-full shadow-lg justify-center text-center h-16 w-16 object-cover"
          />
        </div>
        <div className="text-center">
          <h5 className={`${fontPoppins.className} text-xl font-bold mt-2`}>{motelName}</h5>
          {motelImage ? (
            <Link className="underline text-center text-xs" href="/admin/dashboard-partner-motel/config-motel/motel-cover">Editar portada</Link>
          ) : (
            <Link className="underline text-xs" href="/admin/dashboard-partner-motel/config-motel/motel-cover">Agregar portada</Link>
          )}
        </div>
      </div>

      <div className="flex mt-10 flex-col mb-10 overflow-y-auto duration-300 ease-linear custom-scrollbar-hidden px-2">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">

            {/* INICIO */}
            <div>
              <h2 className={`text-xs uppercase flex leading-[20px] text-gray-400 ${!isExpanded ? "lg:justify-center mb-7" : "mb-4 justify-start"}`}>
                {isExpanded || isMobileOpen ? "Inicio" : <BsThreeDots className="text-xl" />}
              </h2>
              {renderMenuItems(navItems, "main")}
            </div>

            {/* ANALÍTICA */}
            {subscription !== "FREE" && (
              <div className="mt-4">
                <h2 className={`text-xs uppercase flex leading-[20px] text-gray-400 ${!isExpanded ? "lg:justify-center mb-7" : "mb-4 justify-start"}`}>
                  {isExpanded || isMobileOpen ? "Analítica" : <BsThreeDots className="text-xl" />}
                </h2>
                {renderMenuItems([
                  {
                    name: "Reportes",
                    path: "/admin/dashboard-partner-motel/reports",
                    icon: <TbPresentationAnalytics />
                  },
                  {
                    name: "Reservas",
                    path: "/admin/dashboard-partner-motel/analytics",
                    icon: <BiMoneyWithdraw />
                  }
                ], "main")}
              </div>
            )}

            {/* GESTIÓN DE ACCESO */}
            {subscription !== "FREE" && (
              <div className="mt-4">
                <h2 className={`text-xs uppercase flex leading-[20px] text-gray-400 ${!isExpanded ? "lg:justify-center mb-7" : "mb-4 justify-start"}`}>
                  {isExpanded || isMobileOpen ? "Gestión de acceso" : <BsThreeDots className="text-xl" />}
                </h2>
                {renderMenuItems([
                  {
                    name: "Acceso con reserva",
                    path: "/admin/dashboard-partner-motel/check-in",
                    icon: <MdContentPasteSearch />
                  },
                  {
                    name: "Acceso sin reserva",
                    path: "/admin/dashboard-partner-motel/walk-in",
                    icon: <IoLogIn />
                  }
                ], "main")}
              </div>
            )}

            {/* GESTIÓN DE SERVICIOS */}
            {subscription !== "FREE" && (
              <div className="mt-4">
                <h2 className={`text-xs uppercase flex leading-[20px] text-gray-400 ${!isExpanded ? "lg:justify-center mb-7" : "mb-4 justify-start"}`}>
                  {isExpanded || isMobileOpen ? "Gestión de servicios" : <BsThreeDots className="text-xl" />}
                </h2>
                {renderMenuItems([
                  {
                    name: "Servicio con reserva",
                    path: "/admin/dashboard-partner-motel/booking",
                    icon: <RiCalendarCheckFill />
                  },
                  {
                    name: "Servicio sin reserva",
                    path: "/admin/dashboard-partner-motel/walk-in-services",
                    icon: <RiCalendarCloseFill />
                  }
                ], "main")}
              </div>
            )}

            {/* SOPORTE */}
            <div className="mt-4">
              <h2 className={`text-xs uppercase flex leading-[20px] text-gray-400 ${!isExpanded ? "lg:justify-center mb-7" : "mb-4 justify-start"}`}>
                {isExpanded || isMobileOpen ? "Soporte" : <BsThreeDots className="text-xl" />}
              </h2>
              {renderMenuItems(supportItems, "support")}
            </div>

            {/* CONFIGURACIÓN */}
            <div className="mt-4">
              <h2 className={`text-xs uppercase flex leading-[20px] text-gray-400 ${!isExpanded ? "lg:justify-center mb-7" : "mb-4 justify-start"}`}>
                {isExpanded || isMobileOpen ? "Configuración" : <BsThreeDots className="text-xl" />}
              </h2>
              {renderMenuItems(configItems, "config")}
            </div>

          </div>
        </nav>

        {isExpanded && nextTier && (
          <div className="mx-auto fade-in mt-5 mb-10 w-full max-w-60 rounded-2xl bg-gray-100 px-2 py-5 text-center">
            <h3 className="mb-2 font-semibold text-gray-900">Pasa al plan {nextTier}</h3>
            <p className="mb-4 text-gray-500 text-xs">
              Mejora tu experiencia accediendo a más beneficios con el plan <strong>{nextTier}</strong>.
            </p>
            <Link
              href={`/admin/dashboard-partner-motel/upgrade?tier=${nextTier}`}
              className="flex items-center justify-center p-3 font-medium text-white rounded-lg bg-indigo-600 text-sm hover:bg-indigo-700"
            >
              Actualizar a plan
            </Link>
          </div>
        )}
      </div>
    </aside>
  );
};

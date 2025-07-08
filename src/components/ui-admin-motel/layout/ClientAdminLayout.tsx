"use client";

import { AppHeader, AppSidebar, MenuOptions, TotalReservationRequests, Tracker } from "@/components";
import Backdrop from "@/components/ui-admin-motel/back-drop/Backdrop";
import { MotelApi } from "@/interfaces";
import { useSidebarStore } from "@/store";
import React from "react";

interface ClientAdminLayoutProps {
  children: React.ReactNode;
  motel: MotelApi;
  accessToken: string;
}

export default function ClientAdminLayout({
  children,
  motel,
  accessToken
}: ClientAdminLayoutProps) {
  const { isExpanded, isMobileOpen } = useSidebarStore();

  const mainContentMargin = isMobileOpen
    ? "ml-0"
    : isExpanded
      ? "lg:ml-[290px]"
      : "lg:ml-[90px]";

  return (
    <div className="min-h-screen xl:flex">
      <AppSidebar
        motelName={motel.razonSocial}
        motelStatus={motel.isApproved}
        subscription={motel.subscriptionTier}
      />
      {isMobileOpen && <Backdrop />}

      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${mainContentMargin}`}
      >
        <AppHeader
          accessToken={accessToken}
          motelConfig={motel.motelConfig}
          motelStatus={motel.isApproved}
        />
        <div className="p-4 bg-gray-100 h-screen md:h-full md:p-6">
          {children}
        </div>
      </div>


      {/*Herramientas para plan gratuito*/}
      {
        motel.isApproved === "APPROVED" && motel.subscriptionTier === "FREE" && (
          <TotalReservationRequests />
        )
      }
      {/*Herramientas para plan gratuito*/}


      {/*Herramientas para plan pago*/}
      {
        motel.isApproved === "APPROVED" && motel.subscriptionTier && motel.subscriptionTier !== "FREE" && (
          <MenuOptions
            motelId={motel.id}
            roomsInAvailable={10}
            totalReservation={20}
          />
        )}

      {
        motel.isApproved === "APPROVED" && motel.subscriptionTier && motel.subscriptionTier !== "FREE" && (
          <Tracker
            motelId={motel.id!}
          />
        )
      }
      {/* Herramientas para plan con dashboard de administracion */}

    </div>
  );
}
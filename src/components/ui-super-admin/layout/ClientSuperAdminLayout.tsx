"use client";

import {  AppHeaderSuperAdmin, AppSidebarSuperAdmin } from "@/components";
import Backdrop from "@/components/ui-admin-motel/back-drop/Backdrop";
import { MotelApi } from "@/interfaces";
import { useSidebarStore } from "@/store";
import React from "react";

interface ClientAdminLayoutProps {
    children: React.ReactNode;
}

export const ClientSuperAdminLayout = ({children}: ClientAdminLayoutProps) => {
    const { isExpanded, isMobileOpen } = useSidebarStore();

    const mainContentMargin = isMobileOpen
        ? "ml-0"
        : isExpanded
            ? "lg:ml-[290px]"
            : "lg:ml-[90px]";

    return (
        <div className="min-h-screen xl:flex">
            <AppSidebarSuperAdmin />
            {isMobileOpen && <Backdrop />}

            <div
                className={`flex-1 transition-all duration-300 ease-in-out ${mainContentMargin}`}
            >
                <AppHeaderSuperAdmin />
                <div className="p-4 bg-gray-100 h-screen md:h-full md:p-6">
                    {children}
                </div>
            </div>

        </div>
    );
}
"use client"
import { useUIStore } from '@/store';
import { TopMenuAdminMotel } from '@/components';
import { isApprovedStatus } from '@/interfaces';
import React from 'react';
import clsx from 'clsx';

interface ContentWrapperProps {
  children: React.ReactNode;
  isApproved: isApprovedStatus;
  accessToken: string;
  motelConfig: any;
}

export function ContentWrapper({ children, isApproved, accessToken, motelConfig }: ContentWrapperProps) {
  const isMenuOpenAdminMotel = useUIStore(state => state.isMenuOpenAdminMotel);

  return (
    <div
      className={clsx(
        "bg-gray-200 min-h-screen w-full", // default for mobile
        {
          // Estas clases solo afectan desde lg en adelante
          "lg:ml-auto lg:w-[75%] xl:w-[80%] 2xl:w-[85%]": isMenuOpenAdminMotel,
          "lg:ml-0 lg:w-full": !isMenuOpenAdminMotel,
        }
      )}
    >
      <TopMenuAdminMotel
        motelConfig={motelConfig}
        motelStatus={isApproved}
        accessToken={accessToken}
      />
      <div className="px-3 py-10 md:px-6 pt-6">
        {children}
      </div>
    </div>
  );
}

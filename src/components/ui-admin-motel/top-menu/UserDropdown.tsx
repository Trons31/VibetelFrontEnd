"use client";
import { logout } from "@/actions";
import { Dropdown } from "@/components/ui/dropdown/Dropdown";
import { DropdownItem } from "@/components/ui/dropdown/DropdownItem";
import { SubscriptionTier } from "@/interfaces";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { TbLogout2 } from "react-icons/tb";

interface Props {
  subscriptionTier: SubscriptionTier;
}

export const UserDropdown = ({ subscriptionTier }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const { data: session, status } = useSession();

  function toggleDropdown(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  }

  function closeDropdown() {
    setIsOpen(false);
  }
  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center text-gray-700 dropdown-toggle"
      >
        <span className="block mr-1 font-medium text-xs md:text-sm">{session?.user.name} {session?.user.lastName}</span>

        <svg
          className={`stroke-gray-500 transition-transform duration-200 ${isOpen ? "rotate-180" : ""
            }`}
          width="18"
          height="20"
          viewBox="0 0 18 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.3125 8.65625L9 13.3437L13.6875 8.65625"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <Dropdown
        isOpen={isOpen}
        onClose={closeDropdown}
        className="absolute right-0 mt-[17px] flex w-[280px] flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg"
      >
        <div className="flex justify-between" >
          <div>
            <span className="block font-medium text-gray-700 text-sm">
              {session?.user.name} {session?.user.lastName}
            </span>
            <span className="mt-0.5 block text-xs text-gray-500 ">
              {session?.user.email}
            </span>
          </div>
          <Link
            href="/admin/dashboard-partner-motel/my-plan"
            className="py-2 px-3 h-fit rounded-full bg-indigo-600 text-white text-xs" >
            {subscriptionTier}
          </Link>
        </div>

        <ul className="flex flex-col gap-1 pt-4 pb-3 border-b border-gray-200">
          <li>
            <DropdownItem
              onItemClick={closeDropdown}
              tag="a"
              href="//admin/dashboard-partner-motel/profile"
              className="flex items-center gap-3 px-3 py-2 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700"
            >
              <FaRegUserCircle className="h-4 w-4" />
              Editar perfil
            </DropdownItem>
          </li>
        </ul>
        <button
          onClick={() => logout()}
          className="flex items-center gap-3 px-3 py-2 mt-3 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700"
        >
          <TbLogout2 className="h-4 w-4" />
          Salir
        </button>
      </Dropdown>
    </div>
  );
}

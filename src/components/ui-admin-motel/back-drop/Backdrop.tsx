import { useSidebarStore } from "@/store";
import React from "react";

const Backdrop: React.FC = () => {
  const { isMobileOpen, toggleMobileSidebar } = useSidebarStore();

  if (!isMobileOpen) return null;

  return (
    <div
      className="fixed inset-0 z-40 bg-gray-900/50 lg:hidden"
      onClick={toggleMobileSidebar}
    />
  );
};

export default Backdrop;

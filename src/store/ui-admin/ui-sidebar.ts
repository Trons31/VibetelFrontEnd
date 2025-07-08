// stores/useSidebarStore.ts
import { create } from "zustand";

type SidebarStore = {
  isExpanded: boolean;
  isMobileOpen: boolean;
  activeItem: string | null;
  openSubmenu: string | null;

  setIsExpanded: (value: boolean) => void;
  setIsMobileOpen: (value: boolean) => void;
  setActiveItem: (item: string | null) => void;
  setOpenSubmenu: (item: string | null) => void;

  toggleSidebar: () => void;
  toggleMobileSidebar: () => void;
  toggleSubmenu: (item: string) => void;
};

export const useSidebarStore = create<SidebarStore>((set, get) => ({
  isExpanded: true,
  isMobileOpen: false,
  isHovered: false,
  activeItem: null,
  openSubmenu: null,

  setIsExpanded: (value) => set({ isExpanded: value }),
  setIsMobileOpen: (value) => set({ isMobileOpen: value }),
  setActiveItem: (item) => set({ activeItem: item }),
  setOpenSubmenu: (item) => set({ openSubmenu: item }),

  toggleSidebar: () => set((state) => ({ isExpanded: !state.isExpanded })),
  toggleMobileSidebar: () =>
    set((state) => ({ isMobileOpen: !state.isMobileOpen })),
  toggleSubmenu: (item) => {
    const current = get().openSubmenu;
    set({ openSubmenu: current === item ? null : item });
  },
}));

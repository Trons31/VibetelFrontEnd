import { create } from "zustand";


interface State {

    //MenuApp
    isSideMenuOpen: boolean;

    openSideMenu: () => void;
    closeSideMenu: () => void;


    //MenuMotelPartners
    isSideMenuOpenMotelPartners: boolean;

    openSideMenuMotelPartners: () => void;
    closeSideMenuMotelPartners: () => void;

    //MenuAdminMotel 
    isSideMenuOpenAdminMotel: boolean;

    openSideMenuAdminMotel: () => void;
    closeSideMenuAdminMotel: () => void;

    isMenuOpenAdminMotel: boolean;

    openMenuAdminMotel: () => void;
    closeMenuAdminMotel: () => void;

    //MenuFilter
    isSideMenuFilterOpen: boolean;

    openSideMenuFilter: () => void;
    closeSideMenuFilter: () => void;


    //ModalMessage
    isModalMessageOpen: boolean;

    openModalMessage: () => void;
    closeModalMessage: () => void;


    //ToastSuccesLocationUser
    isToastSuccessLocationUserOpen: boolean;

    openToastSuccessLocationUserOpen: () => void;
    closeToastSuccessLocationUserOpen: () => void;



}


export const useUIStore = create<State>()((set) => ({

    //MenuApp
    isSideMenuOpen: false,

    openSideMenu: () => set({ isSideMenuOpen: true }),

    closeSideMenu: () => set({ isSideMenuOpen: false }),


    //MenuAppPartnerMotel
    isSideMenuOpenMotelPartners: false,

    openSideMenuMotelPartners: () => set({ isSideMenuOpenMotelPartners: true }),

    closeSideMenuMotelPartners: () => set({ isSideMenuOpenMotelPartners: false }),

    //MenuAdminMotel
    isSideMenuOpenAdminMotel: false,

    openSideMenuAdminMotel: () => set({ isSideMenuOpenAdminMotel: true }),

    closeSideMenuAdminMotel: () => set({ isSideMenuOpenAdminMotel: false }),

    isMenuOpenAdminMotel: true,

    openMenuAdminMotel: () => set({ isMenuOpenAdminMotel: true }),

    closeMenuAdminMotel: () => set({ isMenuOpenAdminMotel: false }),

    //MenuFilter
    isSideMenuFilterOpen: false,

    openSideMenuFilter: () => set({ isSideMenuFilterOpen: true }),

    closeSideMenuFilter: () => set({ isSideMenuFilterOpen: false }),

    //ModalMessage
    isModalMessageOpen: false,

    openModalMessage: () => set({ isModalMessageOpen: true }),

    closeModalMessage: () => set({ isModalMessageOpen: false }),

    //ModalMessage
    isToastSuccessLocationUserOpen: false,

    openToastSuccessLocationUserOpen: () => set({ isToastSuccessLocationUserOpen: true }),

    closeToastSuccessLocationUserOpen: () => set({ isToastSuccessLocationUserOpen: false }),


}))
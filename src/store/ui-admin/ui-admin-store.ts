import { create } from "zustand";


interface State {

    //MenuApp
    isOpenSheetRoomInService: boolean;

    openSheetRoomInService: () => void;
    closeSheetRoomInService: () => void;

    //MenuAppPartnerMotel
    isSideMenuOpenPartnerMotel: boolean;

    openSideMenuPartnerMotel: () => void;
    closeSideMenuPartnerMotel: () => void;

    //MenuFilter
    isSideMenuFilterOpen: boolean;

    openSideMenuFilter: () => void;
    closeSideMenuFilter: () => void;


    //ModalMessage
    isModalMessageOpen: boolean;

    openModalMessage: () => void;
    closeModalMessage: () => void;



}


export const useUIAdminStore = create<State>()((set) => ({

    //MenuApp
    isOpenSheetRoomInService: false,

    openSheetRoomInService: () => set({ isOpenSheetRoomInService: true }),

    closeSheetRoomInService: () => set({ isOpenSheetRoomInService: false }),

    //MenuAppPartnerMotel
    isSideMenuOpenPartnerMotel: false,

    openSideMenuPartnerMotel: () => set({ isSideMenuOpenPartnerMotel: true }),

    closeSideMenuPartnerMotel: () => set({ isSideMenuOpenPartnerMotel: false }),


    //MenuFilter
    isSideMenuFilterOpen: false,

    openSideMenuFilter: () => set({ isSideMenuFilterOpen: true }),

    closeSideMenuFilter: () => set({ isSideMenuFilterOpen: false }),

    //ModalMessage
    isModalMessageOpen: false,

    openModalMessage: () => set({ isModalMessageOpen: true }),

    closeModalMessage: () => set({ isModalMessageOpen: false }),


}))
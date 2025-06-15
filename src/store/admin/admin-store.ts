import type { BedroomBooking } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";


interface State {

    newRoomInService: boolean;

    updateNewRoomInService: () => void;
    cleanNewRoomInService: () => void;

    newReservation:number;
    updateNewReservation: () => void;
    cleanNewReservation:() =>void;
}


export const useAdmintore = create<State>()(

    persist(
        (set, get) => ({
            
            //NewRoomInService
            newRoomInService: false,

            //NewReservation
            newReservation: 0,
            //Methods

            //NewRoomInService
            updateNewRoomInService: () => {
                set({ newRoomInService: true })
            },

            cleanNewRoomInService: () => {
                set({newRoomInService: false})
            },

            //NewReservation
            updateNewReservation: () => {
                const {newReservation}= get();
                set({newReservation: newReservation + 1 })
            },

            cleanNewReservation: () => {
                set({newReservation:0})
            }


        })
        , {
            name: 'room-in-service',

        }
    )

)
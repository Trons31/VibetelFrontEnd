import { LocationCity } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";


interface State{

    locationUser: LocationCity | null;
    addLocationUser:(location:LocationCity)=> void;
    updateLocationUser:(location:LocationCity) => void;


}


export const useLocationStore= create<State>()(
    
    persist(
        (set, get) => ({
        
            locationUser: null,
    
            //Methods

            addLocationUser: (location:LocationCity) => {
                 set({ locationUser: location });
            },

            updateLocationUser: (location:LocationCity) => {
                 set({ locationUser: location });
             },
    
        })
        ,{
            name: 'location-user',
            
        }
    )

)
import { searchCity } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";


interface State{

    locationUser: searchCity | null;
    addLocationUser:(location:searchCity)=> void;
    updateLocationUser:(location:searchCity) => void;


}


export const useLocationStore= create<State>()(
    
    persist(
        (set, get) => ({
        
            locationUser: null,
    
            //Methods

            addLocationUser: (location:searchCity) => {
                 set({ locationUser: location });
            },

            updateLocationUser: (location:searchCity) => {
                 set({ locationUser: location });
             },
    
        })
        ,{
            name: 'location-user',
            
        }
    )

)
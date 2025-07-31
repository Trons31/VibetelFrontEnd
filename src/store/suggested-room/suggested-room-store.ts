import {  RoomAllApi } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";


interface SuggestedRoomState {
    suggestedRooms: RoomAllApi[];
    addRoom: (room: RoomAllApi) => void;
}

export const useSuggestedRoomStore = create<SuggestedRoomState>()(
    persist(
        (set, get) => ({
            suggestedRooms: [],

            addRoom: (newRoom: RoomAllApi) => {
                const { suggestedRooms } = get();
                
                // Verificar si la habitación ya está en el array por su id
                const roomExists = suggestedRooms.some(room => room.id === newRoom.id);
                
                if (!roomExists) {
                    let updatedRooms = [...suggestedRooms, newRoom];
                    
                    // Limitar a 20 habitaciones, eliminando las más antiguas
                    if (updatedRooms.length > 20) {
                        updatedRooms = updatedRooms.slice(-20); // Mantener las últimas 20
                    }
                    
                    set({ suggestedRooms: updatedRooms });
                }
            },
        }),
        {
            name: "suggested-room", // nombre para el almacenamiento persistente
        }
    )
);

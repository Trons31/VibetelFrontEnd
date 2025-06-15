import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  searches: string[]; // Array de términos de búsqueda
  addSearch: (term: string) => void; // Agregar un nuevo término
  clearSearches: () => void; // Limpiar los términos de búsqueda
}

export const useSearchStore = create<State>()(
  persist(
    (set, get) => ({
      searches: [],
      addSearch: (term: string) => {
        const currentSearches = get().searches;

        // Verificar si ya existe el término
        if (!currentSearches.includes(term)) {
          // Agregar el nuevo término al principio y limitar a 5
          const updatedSearches = [term, ...currentSearches].slice(0, 5);
          set({ searches: updatedSearches });
        }
      },
      clearSearches: () => set({ searches: [] }),
    }),
    {
      name: "search", // nombre para el almacenamiento persistente
    }
  )
);

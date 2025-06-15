import { GetAmenitiesRoom, GetCategoryRoom, GetGarageRoom } from "@/actions";
import { FilterSearch } from "./ui/FilterSearch";


interface Props {
  params: {
    query: string;
  }
}

export async function generateMetadata({ params }: Props) {
  const { query } = params;
  const decodedSearchTerm = decodeURIComponent(query || "").trim().toLowerCase();
  return {
    title: `Busquedad: ${decodedSearchTerm}`,
    description: 'Nuestra plataforma gestiona tus búsquedas de la manera más precisa para que puedas encontrar lo que estás buscando. Filtra por categoría, comodidades, y más para encontrar la habitación perfecta.',
  };
}


export default async function SearchPage({ params }: Props) {

  const { query } = params;
  const categoryRoom = await GetCategoryRoom();
  const garageRoom = await GetGarageRoom();
  const amenitiesRoom = await GetAmenitiesRoom();

  return (
    <div>
      <FilterSearch
        categoryRoom={categoryRoom}
        garageRoom={garageRoom}
        amenitiesRoom={amenitiesRoom}
        query={query}
      />
    </div>
  );
}
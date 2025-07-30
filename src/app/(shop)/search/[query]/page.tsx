import { FilterSearch } from "./ui/FilterSearch";
import { CategoryRoomApi, GarageRoomApi, AmenitiesRoomApi } from "@/interfaces";
import axios from "axios";
import { redirect } from "next/navigation";


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



  let category: CategoryRoomApi[];
  try {
    const response = await axios.get<CategoryRoomApi[]>(`${process.env.NEXT_PUBLIC_API_ROUTE}room/category`);
    category = response.data;
  } catch (error: any) {
    redirect("/");
  }

  let garage: GarageRoomApi[];
  try {
    const response = await axios.get<GarageRoomApi[]>(`${process.env.NEXT_PUBLIC_API_ROUTE}room/garage`);
    garage = response.data;
  } catch (error: any) {
    redirect("/");
  }

  let amenities: AmenitiesRoomApi[];
  try {
    const response = await axios.get<AmenitiesRoomApi[]>(`${process.env.NEXT_PUBLIC_API_ROUTE}room/amenities`);
    amenities = response.data;
  } catch (error: any) {
    redirect("/");
  }

  return (
    <div>
      <FilterSearch
        categoryRoom={category}
        garageRoom={garage}
        amenitiesRoom={amenities}
        query={query}
      />
    </div>
  );
}
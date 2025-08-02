import { redirect } from "next/navigation";
import { FilterRooms } from "./ui/FilterRooms";
import { AmenitiesRoomApi, CategoryRoomApi, GarageRoomApi, RoomAllApi } from "@/interfaces";
import axios from "axios";

export async function generateMetadata() {
  return {
    title: "Habitaciones",
    description:
      "Explora las habitaciones de moteles disponibles en tu ubicación y gestiona tus reservas fácilmente.",
  };
}

export default async function AllBedroomPage() {

  let category: CategoryRoomApi[];
  try {
    const response = await axios.get<CategoryRoomApi[]>(`${process.env.NEXT_PUBLIC_API_ROUTE}room/category`);
    category = response.data;
  } catch (error: any) {
    category = []
  }

  let garage: GarageRoomApi[];
  try {
    const response = await axios.get<GarageRoomApi[]>(`${process.env.NEXT_PUBLIC_API_ROUTE}room/garage`);
    garage = response.data;
  } catch (error: any) {
    garage=[]
  }

  let amenities: AmenitiesRoomApi[];
  try {
    const response = await axios.get<AmenitiesRoomApi[]>(`${process.env.NEXT_PUBLIC_API_ROUTE}room/amenities`);
    amenities = response.data;
  } catch (error: any) {
   amenities=[]
  }


  return (
    <>
      <FilterRooms
        categoryRoom={category}
        garageRoom={garage}
        amenitiesRoom={amenities}
      />
    </>
  );
}

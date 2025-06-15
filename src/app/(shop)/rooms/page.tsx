import { redirect } from "next/navigation";
import { getRoomWithBestPromotion } from "@/actions";
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


  let rooms: RoomAllApi[] | null = null;

  try {
    const response = await axios.get<RoomAllApi[]>(`${process.env.NEXT_PUBLIC_API_ROUTE}room`);
    rooms = response.data;
  } catch (error: any) {
    redirect("/");
  }

  let category: CategoryRoomApi[];
  try {
    const response = await axios.get<CategoryRoomApi[]>(`${process.env.NEXT_PUBLIC_API_ROUTE}room/category`);
    category = response.data;
  } catch (error: any) {
    throw new Error(`Ups! Error al obtener las categorias de las habitaciones`);
  }

  let garage: GarageRoomApi[];
  try {
    const response = await axios.get<GarageRoomApi[]>(`${process.env.NEXT_PUBLIC_API_ROUTE}room/garage`);
    garage = response.data;
  } catch (error: any) {
    throw new Error(`Ups! Error al obtener los garajes de las habitaciones`);
  }

  let amenities: AmenitiesRoomApi[];
  try {
    const response = await axios.get<AmenitiesRoomApi[]>(`${process.env.NEXT_PUBLIC_API_ROUTE}room/amenities`);
    amenities = response.data;
  } catch (error: any) {
    throw new Error(`Ups! Error al obtener las comodidades de las habitaciones`);
  }

  const RoomWithBestPromotion = await getRoomWithBestPromotion();

  return (
    <>
      <FilterRooms
        rooms={rooms}
        categoryRoom={category}
        garageRoom={garage}
        amenitiesRoom={amenities}
        BestPromotion={RoomWithBestPromotion.BestPromotion}
      />
    </>
  );
}

import { auth } from "@/auth.config";
import { redirect } from "next/navigation";
import { FavoritePage } from "./ui/FavoritePage";
import { UserApi } from "@/interfaces/user.interface";
import axios from "axios";
import { CategoryRoomApi, GarageRoomApi } from "@/interfaces";
import { FavoriteRoomApi } from "@/interfaces/favoriteRoom.interface";

export async function generateMetadata() {
  return {
    title: 'Habitaciones favoritas',
    description: 'Aquí podrás ver y gestionar tus habitaciones favoritas, guardadas para futuras reservas.',
  };
}


export default async function FavoriteRoomPage() {

  const session = await auth();

  if (!session) {
    redirect("/");
  }

  let user: UserApi;

  try {
    const response = await axios.get<UserApi>(
      `${process.env.NEXT_PUBLIC_API_ROUTE}user/profile`,
      {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      }
    );
    user = response.data;
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

  let rooms: FavoriteRoomApi[];

  try {
    const response = await axios.get<FavoriteRoomApi[]>(
      `${process.env.NEXT_PUBLIC_API_ROUTE}room/favorites`,
      {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      }
    );
    rooms = response.data;
  } catch (error: any) {
    rooms = [];
  }

  return (
    <>
      <FavoritePage
        category={category}
        garage={garage}
        rooms={rooms}
        user={user} />
    </>
  );
}
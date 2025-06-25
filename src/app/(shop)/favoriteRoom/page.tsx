import { auth } from "@/auth.config";
import { redirect } from "next/navigation";
import { FavoritePage } from "./ui/FavoritePage";
import { GetCategoryRoom, GetGarageRoom } from "@/actions";
import { UserApi } from "@/interfaces/user.interface";
import axios from "axios";

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
    const response = await axios.get<UserApi>(`${process.env.NEXT_PUBLIC_API_ROUTE}user/${session.user.id}`)
    user = response.data;
  } catch (error: any) {
    redirect("/");
  }


  if (!user) {
    redirect("/");
  }


  const category = await GetCategoryRoom();
  const garage = await GetGarageRoom();
  return (
    <>
      <FavoritePage 
      category={category} 
      garage={garage} 
      user={user} />
    </>
  );
}
import { auth } from "@/auth.config";
import { redirect } from "next/navigation";
import { FavoritePage } from "./ui/FavoritePage";
import { GetCategoryRoom, GetGarageRoom, GetUserByEmail } from "@/actions";

export async function generateMetadata() {
  return {
    title: 'Habitaciones favoritas',
    description: 'Aquí podrás ver y gestionar tus habitaciones favoritas, guardadas para futuras reservas.',
  };
}


export default async function FavoriteRoomPage() {

  const session = await auth();

  if (!session?.user.roles.includes("user")) {
    redirect("/");
  }

  const userExistOnDatabase = await GetUserByEmail(session.user.email);

  if (!userExistOnDatabase?.user) {
    redirect("/");
  }


  const category = await GetCategoryRoom();
  const garage = await GetGarageRoom();
  return (
    <>
      <FavoritePage category={category} garage={garage} user={userExistOnDatabase.user} />
    </>
  );
}
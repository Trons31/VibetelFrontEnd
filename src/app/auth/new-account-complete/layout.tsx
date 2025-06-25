import { auth } from "@/auth.config";
import { redirect } from "next/navigation";
import { UserApi } from "@/interfaces/user.interface";
import axios from "axios";

export default async function CompleteRegisterWhithRedSocialLayout({
  children
}: {
  children: React.ReactNode;
}) {

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

  // if (userExistOnDatabase?.ok) {
  //TODO: PROBLEMA AL LOGEARSE CON GOOGLE
  //   //console.log(userExistOnDatabase.user?.email!, bcryptjs.)
  //   await login(userExistOnDatabase.user?.email!, userExistOnDatabase.user?.password!);
  // }

  return (
    <>
      {children}
    </>
  );
}
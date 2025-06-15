import { GetUserByEmail, login } from "@/actions";
import { auth } from "@/auth.config";
import { redirect } from "next/navigation";
import bcryptjs from 'bcryptjs';

export default async function CompleteRegisterWhithRedSocialLayout({
 children
}: {
 children: React.ReactNode;
}) {

    const session = await auth();


    if (session?.user.roles.includes("user")) {
        redirect("/")
    }

    const userExistOnDatabase = await GetUserByEmail(session?.user.email!);

    if(userExistOnDatabase?.ok){
      //TODO: PROBLEMA AL LOGEARSE CON GOOGLE
      //console.log(userExistOnDatabase.user?.email!, bcryptjs.)
      await login(userExistOnDatabase.user?.email!, userExistOnDatabase.user?.password!);
    }

  return (
    <>
    {children}
    </>
  );
}
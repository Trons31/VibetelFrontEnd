import { auth } from "@/auth.config";
import { redirect } from "next/navigation";

export default async function RegisterUserLayout({
  children
}: {
  children: React.ReactNode;
}) {

  const session = await auth();

  if (session) {
    redirect("/home")
  }


  return (
    <>
      {children}
    </>
  );
}
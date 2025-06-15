import { auth } from "@/auth.config";
import { redirect } from "next/navigation";

export default async function LoginUserLayout({
  children
}: {
  children: React.ReactNode;
}) {

  const session = await auth();

  if (session) {
    redirect("/home");
  }



  return (
    <>
      {children}
    </>
  );
}
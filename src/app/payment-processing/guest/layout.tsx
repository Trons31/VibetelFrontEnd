import { auth } from "@/auth.config";
import { redirect } from "next/navigation";

export default async function CheckOutAnonymousLayout({
  children
}: {
  children: React.ReactNode;
}) {

  const session = await auth();

  if (session?.user.roles.includes("user")) {
    redirect("/payment-processing/user");
  }

  return (
    <>
      {children}
    </>
  );
}
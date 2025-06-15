import { auth } from "@/auth.config";
import { redirect } from "next/navigation";

export default async function CheckOutUserLayout({
  children
}: {
  children: React.ReactNode;
}) {

  const session = await auth();

  if (!session?.user.roles.includes("user")) {
    redirect("/payment-processing/guest");
  }

  return (
    <>
      {
        children
      }
    </>
  );
}
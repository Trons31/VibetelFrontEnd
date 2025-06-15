import { auth } from "@/auth.config";
import { redirect } from "next/navigation";

export default async function AuthMotelPartnerLayout({
  children
}: {
  children: React.ReactNode;
}) {

  const session = await auth();

  if (session?.user.roles.includes("motelPartner")) {
    redirect("/admin/dashboard-partner-motel")
  }

  return (
    <>
      {children}
    </>
  );
}
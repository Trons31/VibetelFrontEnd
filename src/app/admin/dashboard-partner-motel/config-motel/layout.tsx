import { getMotelByMotelPartner } from "@/actions";
import { auth } from "@/auth.config";
import { redirect } from "next/navigation";

export default async function ConfigMotelLayout({
  children
}: {
  children: React.ReactNode;
}) {

  const session = await auth();

  const motelExist = await getMotelByMotelPartner(session!.user.id);

  if (!motelExist?.ok) {
    redirect("/auth/new-account-motel")
  }
  return (
    <>
      {children}
    </>
  );
}
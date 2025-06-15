import { auth } from "@/auth.config";
import { redirect } from "next/navigation";
import axios from "axios";
import { MotelApi } from "@/interfaces";

export default async function MotelPlansLayout({
  children
}: {
  children: React.ReactNode;
}) {

  const session = await auth();

  if (!session?.user.roles.includes("motelPartner")) {
    redirect("/motel-partner")
  }

  let motelExist: MotelApi | null = null;

  try {
    const response = await axios.get<MotelApi>(
      `${process.env.NEXT_PUBLIC_API_ROUTE}motel/user`,
      {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      }
    );

    motelExist = response.data;
  } catch (error) {
    redirect("/auth/new-account-motel/register");
  }

  return (
    <>
      {children}
    </>
  );
}
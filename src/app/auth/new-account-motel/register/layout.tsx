import { redirect } from "next/navigation";
import { auth } from "@/auth.config";
import { MotelApi } from "@/interfaces";
import axios from "axios";

export default async function RegiterMotelLayout({
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
    //console.log(error);
  }

  if (motelExist) {
    redirect("/auth/new-account-motel/motel-plans");
  }

  return (
    <>
      {children}
    </>
  );
}
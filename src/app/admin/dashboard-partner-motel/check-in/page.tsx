import { redirect } from "next/navigation";
import { auth } from "@/auth.config";
import { TableCheckIn } from "./ui/TableCheckIn";
import { AccessCodeCheckIn } from "@/components";
import { MotelApi } from "@/interfaces";
import axios from "axios";


export default async function CheckInPage() {

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
  } catch (error: any) {
    redirect("/auth/new-account-motel/register");
  }

  return (
    <>
      <AccessCodeCheckIn motelId={motelExist.id} />
      <div className="mb-10" >
        {/* <TableCheckIn motelId={motelExist.id} totalReservation={totalReservation} /> */}
      </div>
    </>

  );
}
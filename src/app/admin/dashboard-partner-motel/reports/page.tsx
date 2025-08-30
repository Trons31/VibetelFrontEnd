import { auth } from "@/auth.config";
import { DashboardReport } from "./ui/DashboardReport";
import { redirect } from "next/navigation";
import axios from "axios";
import { MotelSubscriptionApi } from "@/interfaces";

export default async function ReportsPage() {

  const session = await auth();
  if (!session?.user.roles.includes("motelPartner")) {
    redirect("/motel-partner")
  }

  try {
    await axios.get(
      `${process.env.NEXT_PUBLIC_API_ROUTE}motel/user`,
      {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      }
    );
  } catch (error: any) {
    redirect("/auth/new-account-motel/register");
  }

  let subscriptionMotel: MotelSubscriptionApi;

  try {
    const response = await axios.get<MotelSubscriptionApi>(`${process.env.NEXT_PUBLIC_API_ROUTE}motel/subscription`,
      {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      }
    );
    subscriptionMotel = response.data;
  } catch (error: any) {
    console.error("Error al obtener la suscripción del motel:", error);
    redirect("/");
  }

  return (
    <DashboardReport
      commissionPercentage={subscriptionMotel.commissionPercentage}
      accessToken={session.accessToken}
    />
  );
}

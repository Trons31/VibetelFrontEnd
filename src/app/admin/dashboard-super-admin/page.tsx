import { auth } from "@/auth.config";
import DashboardStatsComponent from "./ui/DashboardStatsComponent";
import { redirect } from "next/navigation";


export default async function SuperAdminHomePage() {

  const session = await auth();
  if (!session?.user.roles.includes("superAdmin")) {
    redirect("/motel-partner")
  }


  return (
    <DashboardStatsComponent
      accessToken={session.accessToken} />
  );
}
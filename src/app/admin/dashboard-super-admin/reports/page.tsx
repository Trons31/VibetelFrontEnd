import { auth } from "@/auth.config";
import { redirect } from "next/navigation";
import { AdminDashboardReport } from "./ui/AdminDashboardReport";

export default async function ReportsAllMotelsPage() {

  const session = await auth();
  if (!session?.user.roles.includes("superAdmin")) {
    redirect("/auth/super-admin")
  }

  return (
    <AdminDashboardReport
      accessToken={session.accessToken}
    />
  );
}

import { redirect } from 'next/navigation';
import { auth } from '@/auth.config';
import axios from 'axios';
import { MotelApi } from '@/interfaces';
import ClientAdminLayout from '@/components/ui-admin-motel/layout/ClientAdminLayout';


export default async function DashboardLayout({
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
  } catch (error: any) {
    redirect("/auth/new-account-motel/register");
  }

  if (motelExist.subscriptionTier === null) {
    redirect("/auth/new-account-motel/motel-plans");
  }



  return (
    <ClientAdminLayout
      motel={motelExist}
      accessToken={session.accessToken}
    >
      {children}
    </ClientAdminLayout>
  );
}
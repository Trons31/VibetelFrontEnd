
import { auth } from '@/auth.config';
import { redirect } from 'next/navigation';
import { ActiveMotel } from './ui/ActiveMotel';
import { ReservationDashboard } from './ui/ReservationDashboard';
import { MotelApi } from '@/interfaces';
import axios from 'axios';
export default async function HomePage() {

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
      {
        motelExist.isApproved === "APPROVED"
          ? (
            <>
              <ReservationDashboard />
            </>
          )
          : (
            <>
              <ActiveMotel
                status={motelExist.isApproved}
                motelImage={motelExist.images.length === 0 ? undefined : motelExist.images[0]}
                totalRoom={motelExist.totalRooms}
                configMotel={motelExist.motelConfig ? true : false}
                bankAccount={false}
              />
            </>
          )
      }
    </>
  );
}

import { auth } from '@/auth.config';
import { redirect } from 'next/navigation';
import { ActiveMotel } from './ui/ActiveMotel';
import { ReservationDashboard } from './ui/ReservationDashboard';
import { CustomerSatisfaction, MotelApi, MotelFinancialStats, MotelReservationStats } from '@/interfaces';
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

  let Stats: MotelReservationStats;
  try {
    const response = await axios.get<MotelReservationStats>(
      `${process.env.NEXT_PUBLIC_API_ROUTE}service/motel/reservation-stats`,
      {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      }
    );

    Stats = response.data;
  } catch (error) {
    redirect("/auth/new-account-motel/register");
  }

  let FinacialStats: MotelFinancialStats;
  try {
    const response = await axios.get<MotelFinancialStats>(
      `${process.env.NEXT_PUBLIC_API_ROUTE}service/motel/financial-stats`,
      {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      }
    );

    FinacialStats = response.data;
  } catch (error) {
    redirect("/auth/new-account-motel/register");
  }

  let RatingStats: CustomerSatisfaction;
  try {
    const response = await axios.get<CustomerSatisfaction>(
      `${process.env.NEXT_PUBLIC_API_ROUTE}service/motel/financial-stats`,
      {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      }
    );

    RatingStats = response.data;
  } catch (error) {
    redirect("/auth/new-account-motel/register");
  }


  return (
    <>
      {
        motelExist.isApproved === "APPROVED"
          ? (
            <>
              <ReservationDashboard
                subscription={motelExist.subscriptionTier}
                stats={Stats}
                financialStats={FinacialStats}
                satisfactionData={RatingStats}
              />
            </>
          )
          : (
            <>
              <ActiveMotel
                status={motelExist.isApproved}
                motelImage={motelExist.images.length === 0 ? undefined : motelExist.images[0].url}
                totalRoom={motelExist.totalRooms}
                configMotel={motelExist.motelConfig ? true : false}
                bankAccount={motelExist.bankAccount}
              />
            </>
          )
      }
    </>
  );
}
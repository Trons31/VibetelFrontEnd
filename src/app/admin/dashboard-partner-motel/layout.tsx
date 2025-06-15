import { redirect } from 'next/navigation';
import { auth } from '@/auth.config';
import { MenuOptions, SideBarAdminMotel, SideBarMovil, TopMenuAdminMotel, TotalReservationRequests, Tracker } from '@/components';
import { getRoomInAviableByMotel, getTotalReservationTodayByMotel } from '@/actions';
import axios from 'axios';
import { MotelApi } from '@/interfaces';


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


  const rooms = await getRoomInAviableByMotel(motelExist.id);
  const { totalReservation } = await getTotalReservationTodayByMotel(motelExist.id);


  return (
    <>
      <SideBarMovil
        motelStatus={motelExist.isApproved}
        motelName={motelExist.razonSocial}
        motelImage={motelExist.images.length === 0 ? undefined : motelExist.images[0].url}
        subscription={motelExist.subscriptionTier}
      />

      <SideBarAdminMotel
        motelStatus={motelExist.isApproved}
        motelImage={motelExist.images.length === 0 ? undefined : motelExist.images[0].url}
        motelName={motelExist.razonSocial}
        subscription={motelExist.subscriptionTier}
      />


      <div className="ml-auto bg-gray-200  lg:w-[75%] xl:w-[80%] 2xl:w-[85%] min-h-screen">
        <TopMenuAdminMotel
          motelConfig={undefined}
          motelStatus={motelExist.isApproved}
          motelId={motelExist.id}
        />
        <div className="px-3 py-10 md:px-6 pt-6">
          {children}
        </div>
      </div>


      {/*Herramientas para plan gratuito*/}
      {
        motelExist.isApproved === "APPROVED" && motelExist.subscriptionTier === "FREE" && (
          <TotalReservationRequests />
        )
      }
      {/*Herramientas para plan gratuito*/}



      {/*Herramientas para plan pago*/}
      {
        motelExist.isApproved === "APPROVED" && motelExist.subscriptionTier && motelExist.subscriptionTier !== "FREE" && (
          <MenuOptions
            motelId={motelExist.id}
            roomsInAvailable={rooms}
            totalReservation={totalReservation}
          />
        )}

      {
        motelExist.isApproved === "APPROVED" && motelExist.subscriptionTier && motelExist.subscriptionTier !== "FREE" && (
          <Tracker
            motelId={motelExist.id!}
          />
        )
      }
      {/* Herramientas para plan con dashboard de administracion */}

    </>
  );
}
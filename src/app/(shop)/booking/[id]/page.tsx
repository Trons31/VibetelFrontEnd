
import { notFound, redirect } from "next/navigation";
import { Metadata, ResolvingMetadata } from "next";
import { BookingPage } from "./ui/BookingPage";
import { auth } from "@/auth.config";
import { UserApi } from "@/interfaces/user.interface";
import axios from "axios";
import { ReservationApi } from "@/interfaces/reservation.interface";

interface Props {
  params: {
    id: string;
  }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.id;

  const session = await auth();

  if (!session) {
    redirect("/");
  }

  // fetch data
  let reservation: ReservationApi;


  try {
    const response = await axios.get<ReservationApi>(`${process.env.NEXT_PUBLIC_API_ROUTE}service/user/reservation/${id}`,
      {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      }
    );
    reservation = response.data
  } catch (error: any) {
    notFound();
  }

  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || []

  return {
    title: reservation ? `Reserva : ${reservation.ServiceItem?.title}` : "Reserva no encontrada",
    description: reservation.ServiceItem?.title ?? "",
    openGraph: {
      title: `Reserva : ${reservation.ServiceItem?.title}`,
      description: reservation ? reservation.ServiceItem?.title : "Reserva no encontrada",
      // images: ['/some-specific-page-image.jpg', ...previousImages],
    },
  }
}

export default async function BookingBySlugPage({ params }: Props) {

  const session = await auth();

  if (!session) {
    redirect("/");
  }

  let user: UserApi;

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_ROUTE}user/profile`,
      {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      }
    );
    user = response.data
  } catch (error: any) {
    redirect("/");
  }

  const { id } = params;

  let reservation: ReservationApi;

  try {
    const response = await axios.get<ReservationApi>(`${process.env.NEXT_PUBLIC_API_ROUTE}service/user/reservation/${id}`,
      {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      }
    );
    reservation = response.data
  } catch (error: any) {
    notFound();
  }

  return (
    <>
      <BookingPage
        user={user}
        reservation={reservation} />
    </>

  );
}
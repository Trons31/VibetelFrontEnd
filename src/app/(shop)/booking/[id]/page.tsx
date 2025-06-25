
import { notFound, redirect } from "next/navigation";
import { Metadata, ResolvingMetadata } from "next";
import { BookingPage } from "./ui/BookingPage";
import { auth } from "@/auth.config";
import { getReservationById } from "@/actions";
import { UserApi } from "@/interfaces/user.interface";
import axios from "axios";

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

  // fetch data
  const reservation = await getReservationById(id);

  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || []

  return {
    title: reservation?.reservation ? `Reserva : ${reservation?.reservation?.ServiceItem?.title}` : "Reserva no encontrada",
    description: reservation?.reservation?.ServiceItem?.title ?? "",
    openGraph: {
      title: `Reserva : ${reservation?.reservation?.ServiceItem?.title}`,
      description: reservation?.reservation ? reservation?.reservation?.ServiceItem?.title : "Reserva no encontrada",
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
    const response = await axios.get<UserApi>(`${process.env.NEXT_PUBLIC_API_ROUTE}user/${session.user.id}`)
    user = response.data;
  } catch (error: any) {
    redirect("/");
  }

  const { id } = params;

  const reservation = await getReservationById(id);

  if (!reservation?.reservation) {
    notFound();
  }


  return (
    <>
      <BookingPage
        user={user}
        reservation={reservation.reservation} />
    </>

  );
}
import { auth } from '@/auth.config';
import { redirect } from 'next/navigation';
import CompleteForm from '../profile/ui/CompleteForm';
import { ReservationPage } from './ui/ReservationPage';
import axios from 'axios';
import { UserApi } from '@/interfaces/user.interface';

export async function generateMetadata() {
  return {
    title: 'Historial de reservas',
    description: 'Aquí podrás ver todas las reservas realizadas, gestionar tus reservas y ver los detalles de cada una.',
  };
}

export default async function BookingPage() {

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


  if (!user) {
    return <CompleteForm name={session.user.name} email={session.user.email} />;
  }


  return (
    <>
      <ReservationPage user={user} />
    </>
  );
}
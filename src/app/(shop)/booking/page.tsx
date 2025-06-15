

import { auth } from '@/auth.config';
import { redirect } from 'next/navigation';
import { GetUserByEmail } from '@/actions';
import CompleteForm from '../profile/ui/CompleteForm';
import { ReservationPage } from './ui/ReservationPage';

export async function generateMetadata() {
  return {
    title: 'Historial de reservas',
    description: 'Aquí podrás ver todas las reservas realizadas, gestionar tus reservas y ver los detalles de cada una.',
  };
}

export default async function BookingPage() {

  const session = await auth();

  if (!session?.user.roles.includes("user")) {
    redirect("/");
  }

  const userExistOnDatabase = await GetUserByEmail(session.user.email);

  if (!userExistOnDatabase?.user) {
    return <CompleteForm name={session.user.name} email={session.user.email} />;
  }


  return (
    <>
      <ReservationPage user={userExistOnDatabase.user} />
    </>
  );
}
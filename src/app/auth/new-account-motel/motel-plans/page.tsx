
import Link from 'next/link';
import { Lobster } from '@/config/fonts';
import { IoArrowBackOutline } from 'react-icons/io5';
import { Pricing } from './ui/Pricing';
import { redirect } from 'next/navigation';
import { MotelApi, Plan } from '@/interfaces';
import axios from "axios";
import { auth } from '@/auth.config';

export default async function MotelPlansPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/auth/partner");
  }

  let Plans: Plan[];
  try {
    const response = await axios.get<Plan[]>(`${process.env.NEXT_PUBLIC_API_ROUTE}subscription/detail/all`)
    Plans = response.data;
  } catch (error) {
    redirect("/auth/new-account-motel/register");
  }

  return (
    <div>
      <div className="fixed z-50 top-0 bg-white w-full border-b p-4 border-gray-200">
        <div className="flex justify-between items-center">
          <Link
            href="/auth/new-account-motel/"
            className='flex gap-2 items-center transition-all duration-200 group hover:text-red-600'>
            <IoArrowBackOutline className="h-5 w-5 group-hover:text-red-600" />
            <span className='text-md group-hover:text-red-600'>Volver</span>
          </Link>
          <div className='flex justify-center space-x-2 items-center' >
            <Link href="/">
              <span className={`${Lobster.className} text-xl antialiased font-bold`}>Motel</span>
              <span className={` ${Lobster.className} text-xl text-red-500 `}> Partners </span>
            </Link>
          </div>
        </div>
      </div>
      <Pricing
        plans={Plans}
        tokenSession={session.accessToken}
      />
    </div>
  );
}
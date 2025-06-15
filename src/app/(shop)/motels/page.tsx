import { SlideShow, SlideShowMobile } from '@/components';
import { UiMotel } from './ui/UiMotel';
import { MotelAllApi } from '@/interfaces';
import axios from 'axios';
import { redirect } from 'next/navigation';

export async function generateMetadata() {
  return {
    title: 'Moteles',
    description: 'Explora todos los moteles operando en la ubicación seleccionada y encuentra el lugar ideal para tus preferencias.',
  };
}


interface Props {
  searchParams: {
    page: string;
  }
}

export default async function MotelPage() {

  let motels: MotelAllApi[] | null = null;

  try {
    const response = await axios.get<MotelAllApi[]>(`${process.env.NEXT_PUBLIC_API_ROUTE}motel`);
    motels = response.data;
  } catch (error: any) {
    redirect("/");
  }

  return (
    <div >
      <div className="hidden md:block mt-10" >
        <SlideShow />
      </div>
      <div className="block md:hidden  mt-20" >
        <SlideShowMobile />
      </div>

      <UiMotel
        motels={motels}
      />
    </div>
  );
}

import { SlideShow, SlideShowMobile } from '@/components';
import { UiMotel } from './ui/UiMotel';
import { MotelApi } from '@/interfaces';
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

export default  function MotelPage() {
  return (
    <div >
      <div className="hidden md:block mt-10" >
        <SlideShow />
      </div>
      <div className="block md:hidden  mt-20" >
        <SlideShowMobile />
      </div>

      <UiMotel/>
    </div>
  );
}

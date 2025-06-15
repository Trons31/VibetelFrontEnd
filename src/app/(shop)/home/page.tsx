import { SlideShow, SlideShowMobile } from "@/components";
import { UiHome } from "./ui/UiHome";
import { PromotionRooms } from "./ui/PromotionsRooms";

export async function generateMetadata() {
  return {
    title: 'Inicio - Moteles y Habitaciones Más Reservadas',
    description: 'Descubre los moteles más populares y las habitaciones más reservadas. Encuentra las mejores opciones para tu próxima estadía en Vibetel, donde las experiencias excepcionales te esperan.',
  };
}


export default async function HomePage() {

  return (
    <>

      <PromotionRooms />

      <div className="hidden md:block  mt-12" >
        <SlideShow />
      </div>
      <div className="block md:hidden  mt-20" >
        <SlideShowMobile />
      </div>


      <UiHome />

    </>
  );
}

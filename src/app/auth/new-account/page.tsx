import { RegisterForm } from "./ui/RegisterForm";
import { HeaderAuth } from "@/components";

export async function generateMetadata() {
    return {
      title: 'Regístrate - Únete a Nuestra Comunidad',
      description: 'Regístrate ahora y comienza a disfrutar de beneficios exclusivos como descuentos, reservas personalizadas y acceso a promociones especiales. ¡Haz parte de nuestra comunidad y vive la experiencia Vibetel!',
    };
  }

export default function NamePage() {
    return (
        <div className=" md:block h-screen ">
            <HeaderAuth />
            <RegisterForm />
        </div>
    );
}
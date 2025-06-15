import { LoginForm } from "./ui/LoginForm";
import { HeaderAuth } from "@/components";

export async function generateMetadata() {
    return {
      title: 'Inicia Sesión - Accede a tus Beneficios',
      description: 'Inicia sesión para disfrutar de todas las ventajas exclusivas de ser usuario registrado. Accede a tus reservas, descuentos y mucho más en Vibetel.',
    };
  }

export default function LoginEmailPage() {
    return (
        <div className=" md:block h-screen overflow-hidden">
            <HeaderAuth />
            <LoginForm />
        </div>
    );
}
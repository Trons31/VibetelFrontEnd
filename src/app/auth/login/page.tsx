import { LoginDesktop } from './ui/LoginDesktop';
import { LoginMovil } from './ui/LoginMovil';

export async function generateMetadata() {
  return {
    title: 'Únete a nuestra Comunidad - Beneficios Exclusivos',
    description: 'Al registrarte y ser parte de nuestra comunidad, podrás acceder a múltiples beneficios como descuentos, reservas exclusivas y mucho más. ¡Regístrate y empieza a disfrutar hoy mismo!',
  };
}

export default function LoginPage() {
  return (
    <>
      <LoginMovil />
      <LoginDesktop />
    </>
  );
}


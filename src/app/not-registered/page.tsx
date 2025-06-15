import Link from "next/link";

export async function generateMetadata() {
  return {
    title: "Inicia sesión para agregar favoritos",
    description:
      "Inicia sesión o regístrate para guardar habitaciones en tu lista de favoritos y disfrutar de una experiencia personalizada.",
  };
}

export default function NotRegisteredPage() {
  return (
    <>
      <div className="h-screen bg-gray-100">
        <div className="flex flex-col items-center justify-center h-full px-3 md:px-0">
          <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-center text-gray-800">
              ¡Hola! Para agregar favoritos, ingresa a tu cuenta
            </h1>
            <div className="mt-6 flex flex-col">
              <Link
                href="/auth/new-account"
                className="w-full px-4 py-2 text-center text-white bg-blue-500 rounded-lg hover:bg-blue-600"
              >
                Crear cuenta
              </Link>
              <Link
                href="/auth/login/email"
                className="mt-4 text-blue-500 hover:underline w-full text-center"
              >
                Ingresar
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

import { UiPage } from "./ui/UiPage";

export async function generateMetadata() {
  return {
    title: "Inicio",
    description:
      "Explora las habitaciones de moteles disponibles en tu ubicación y gestiona tus reservas fácilmente.",

    openGraph: {
      title: "Vibetel - Inicio",
      description:
        "Encuentra y reserva habitaciones en moteles fácilmente con Vibetel. Disfruta de ofertas exclusivas y una experiencia confiable.",
      url: "https://vibetel.com.co", // Cambia por tu dominio real
      siteName: "VibeTel",
      images: [
        {
          url: "https://res.cloudinary.com/dnzkq9g1a/image/upload/v1756052682/About_gj6m6v.jpg",
          width: 1200,
          height: 630,
          alt: "Vibetel - Plataforma de reservas de habitaciones de moteles",
        },
      ],
      locale: "es_ES",
      type: "website",
    },
  };
}

export default async function InitialPage() {


  return (
    <div className='mt-12' >
      <UiPage />
    </div>
  );
}
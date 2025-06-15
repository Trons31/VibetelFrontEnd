import type { Metadata } from "next";
import "./globals.css";
import { fontPoppins } from "@/config/fonts";
import { Providers } from "@/components";


export const metadata: Metadata = {
  title: {
    template: "%s - VibeTel",
    default: 'VibeTel'
  },
  description: "Descubre los mejores moteles disponibles en tu ubicación con nuestra plataforma centralizada. Encuentra las ofertas más tentadoras y realiza reservas fácilmente. Experimenta servicios de alta calidad para momentos especiales. ¡Tu escapada perfecta comienza aquí!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={fontPoppins.className}>

        <Providers>
          {children}
        </Providers>

      </body>
    </html>
  );
}

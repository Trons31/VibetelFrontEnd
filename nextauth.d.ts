import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  // Extiende la interfaz de `Session` para incluir tu token y roles
  interface Session {
    accessToken: string;  // <-- Aquí el token, en lugar de `token`
    user: {
      id: string;
      name: string;
      email: string;
      emailVerified?: boolean;
      roles: string[];
      image?: string;
    } & DefaultSession["user"];
  }

  // Extiende la interfaz de `User` para incluir los campos personalizados
  interface User {
    id: string;
    email: string;
    roles: string[];
    token: string;  // <-- Aquí el token como lo tienes en tu respuesta
  }

  // Extiende la interfaz de `JWT` para incluir el token
  interface JWT {
    accessToken: string;
    user: {
      id: string;
      email: string;
      roles: string[];
    };
  }
}

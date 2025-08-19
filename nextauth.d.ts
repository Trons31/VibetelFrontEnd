import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  // Extiende la interfaz de `Session` para incluir tu token y roles
  interface Session {
    accessToken: string;
    expiresAt: number;
    user: {
      id: string;
      name: string;
      lastName: string;
      email: string;
      emailVerified?: boolean;
      roles: string[];
      image?: string;
    } & DefaultSession["user"];
  }

  // Extiende la interfaz de `User` para incluir los campos personalizados
  interface User {
    id: string;
    name: string;
    lastName: string;
    email: string;
    roles: string[];
    token: string;
    expiresAt: number;
  }

  // Extiende la interfaz de `JWT` para incluir el token
  interface JWT {
    accessToken: string;
    user: {
      id: string;
      name: string;
      lastName: string;
      email: string;
      roles: string[];
    };
  }
}

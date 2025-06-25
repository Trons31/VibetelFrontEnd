export interface UserInterface {
    id: string;
    name: string;
    lastname: string;
    email: string;
    contactPhone?: string | null;
    updatedAt?: Date;
}

export interface UserApi {
  id: string;
  name: string;
  lastname: string;
  contactPhone: string | null;
  email: string;
  emailVerified: string | null;
  googleId: string | null;
  roles: string[]; // puedes reemplazar con enum si los roles son fijos
  isActive: boolean;
  forgotToken: string | null;
  createdAt: string; // o Date si conviertes al recibir
  updatedAt: string; // o Date si conviertes al recibir
  identificationsCard: string | null;
}

export interface UserInterface {
    id: string;
    name: string;
    lastname: string;
    email: string;
    contactPhone?: string | null;
    updatedAt?: Date;
}
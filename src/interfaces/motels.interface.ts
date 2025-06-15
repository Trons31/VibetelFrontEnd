import { Tier } from "./plans.interface";
import { BedRooms } from "./bedrooms.interface";
import { statusRoom } from "./room.interface";

export type amenities = 'Servicio Restaurante-Bar' | 'Sex-Shop' | 'Zona de Spa';

export type isApprovedStatus = "PENDING" | "APPROVED" | "DATA_CORRECTION" | "DISABLED";

export interface MotelImage {
    id: string;
    url: string;
}

export interface MotelApi {
    id: string;
    razonSocial: string;
    identificationRepresentante: string;
    nombreRepresentante: string;
    description: string;
    slug: string;
    isApproved: isApprovedStatus;
    contactEmail: string;
    contactPhone: string;
    whatsapp: string;
    nit: string;
    amenities: string[];
    address: string;
    neighborhood: string;
    createdAt: Date;
    updatedAt: Date;
    freeService: boolean;
    images: MotelImage[];
    subscriptionTier: Tier | null;
}

export interface MotelAllApi {
    id: string;
    razonSocial: string;
    identificationRepresentante: string;
    nombreRepresentante: string;
    description: string;
    slug: string;
    isApproved: isApprovedStatus; // puedes ajustar según los posibles estados
    contactEmail: string;
    contactPhone: string;
    whatsapp: string;
    nit: string;
    amenities: string[]; // lista de comodidades
    address: string;
    neighborhood: string;
    createdAt: string; // puedes usar Date si luego haces conversión
    updatedAt: string;
    freeService: boolean;
    images: string[]; // si vas a manejar objetos con más datos, cambia a tipo personalizado
}

export interface RoomByMotelApi {
    id: string;
    title: string;
    description: string;
    price: number;
    priceAddTime: number;
    promoActive: boolean;
    promoPrice: number | null;
    promotionPercentage: number | null;
    slug: string;
    tags: string[];
    inAvaible: boolean;
    status: statusRoom;
    timeLimit: number;
    roomNumber: string;
    extraServicesActive: boolean;
    extraServices: number;
    surcharge: number;
    createdAt: string;
    updatedAt: string;
}

export interface MotelBySlugApi {
    id: string;
    razonSocial: string;
    identificationRepresentante: string;
    nombreRepresentante: string;
    description: string;
    slug: string;
    isApproved: isApprovedStatus;
    contactEmail: string;
    contactPhone: string;
    whatsapp: string;
    nit: string;
    amenities: string[];
    address: string;
    neighborhood: string;
    createdAt: string;
    updatedAt: string;
    freeService: boolean;
    images: string[]; // Podrías usar un tipo más detallado si las imágenes tienen propiedades
    rooms: RoomByMotelApi[];
    totalRooms: number;
}

export interface MotelAdmin {
    id: string;
    title: string;
    description: string;
    slug: string;
    isApproved: isApprovedStatus;
    contactEmail: string;
    contactPhone: string;
    whatsapp: string;
    numberOfRooms?: number | null;
    amenities: string[];
    address: string;
    neighborhood: string;
    freeService: boolean;
    country?: {
        id: string,
        name: string,
    };
    city?: {
        id: string,
        name: string,
    };
    department?: {
        id: string,
        name: string,
    };
    priceAddTime?: number | null;
    amentiesMotel?: string[];
    amentiesMotelMapId: string[];
    images?: string[];
    motelImage?: {
        id: number;
        url: string;
    }[];

}




export interface Motel {
    id: string;
    title: string;
    description: string;
    slug: string;
    isApproved: isApprovedStatus;
    contactEmail: string;
    contactPhone: string;
    whatsapp: string;
    numberOfRooms?: number | null;
    amenities: string[];
    address: string;
    neighborhood: string;
    freeService: boolean;
    images?: string[];
    city?: string,
    department?: string,
    country?: string,
    createAt?: Date,
    inService?: boolean;
    MotelConfig: motelConfig | null;
}


export interface MotelMostReserved {
    city: string;
    department: string;
    address: string;
    title: string;
    id: string;
    slug: string;
    MotelConfig: motelConfig | null;
    _count: {
        room: number;
    };
}

export interface motelConfig {
    id: string;
    timeMinutesCleanRoom: number | null;
    defaultReservationAddTime: number | null;
    inService: boolean;
    outOfServiceStart: Date | null;
    outOfServiceEnd: Date | null;
    locationLatitude: number | null;
    locationLongitude: number | null;
    timeAwaitTakeReservation: number;
    motelId: string;
}


export interface suggestedMotel {
    id: string;
    title: string;
    department: string;
    city: string
}


export interface MotelInfo {
    title: string;
    address: string;
    contactEmail: string;
    contactPhone: string;
    description: string;
    neighborhood: string;
    whatsapp: string;
    images: string[];
    country: string;
    city: string;
    department: string;
    locationLatitude?: number | null;
    locationLongitude?: number | null;
    amentiesMotelMap: string[];
    totalRooms: number;
    motelAverageRating: number;
    topRooms: BedRooms[];
    allRatings: {
        id: string;
        rating: number;
        comment: string | null;
        createdAt: Date;
        room: {
            title: string;
            roomNumber: string;
        };
    }[]
}

import { BedRooms } from "./bedrooms.interface";
import { SubscriptionTier } from "./plans.interface";
import { RoomRating } from "./reservation.interface";
import { CategoryRoomApi, GarageRoomApi, RoomAmenity, statusRoom, Image } from "./room.interface";

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
    isApproved: isApprovedStatus; // ajusta según posibles estados
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
    images: Image[];
    rooms: RoomOfMotel[];
    motelConfig: motelConfig | null;
    city: City;
    totalRooms: number;
    subscriptionTier: SubscriptionTier;
}

export interface RoomOfMotel {
    id: string;
    title: string;
    description: string;
    price: number;
    priceAddTime: number;
    promoActive: boolean;
    promoPrice: number;
    promotionPercentage: number;
    slug: string;
    tags: string[];
    inAvailable: boolean;
    status: statusRoom;
    timeLimit: number;
    roomNumber: string;
    extraServicesActive: boolean;
    extraServices: number;
    surcharge: number;
    createdAt: string;
    updatedAt: string;
    category: CategoryRoomApi;
    garage: GarageRoomApi;
    amenities: RoomAmenity[];
    images: Image[];
    ratings: RoomRating[];
}


export interface MotelBySlugApi {
    id: string;
    razonSocial: string;
    identificationRepresentante: string;
    nombreRepresentante: string;
    description: string;
    slug: string;
    isApproved: isApprovedStatus; // puedes ajustar según tus estados
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
    images: string[]; // si luego cambia a objeto, se actualiza
    rooms: RoomOfMotel[];
    motelConfig: motelConfig;
    city: City;
    totalRooms: number;
}

interface Department {
    geonameId: string;
    name: string;
}

interface City {
    id: string;
    name: string;
    department: Department;
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
}


export interface suggestedMotelApi {
    id: string;
    razonSocial: string;
    slug: string;
    address: string;
    neighborhood: string
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

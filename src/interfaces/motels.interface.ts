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
    amenities: Amenities[];
    address: string;
    neighborhood: string;
    createdAt: string;
    updatedAt: string;
    freeService: boolean;
    bankAccount: boolean;
    averageRating: number;
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

interface Amenities {
    id: string;
    amenities: AmenityDetail;
}

interface AmenityDetail {
    id: string;
    name: string;
    description: string;
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
    amenities: Amenities[];
    address: string;
    neighborhood: string;
    createdAt: string;
    updatedAt: string;
    freeService: boolean;
    images: string[]; // si luego cambia a objeto, se actualiza
    averageRating: number;
    rooms: RoomOfMotel[];
    motelConfig: motelConfig;
    city: City;
    totalRooms: number;
}

interface Country {
    geonameId: string;
    name: string;
    isoCode: string;
}


interface Department {
    geonameId: string;
    name: string;
    country: Country;
}

interface City {
    id: string;
    name: string;
    department: Department;
}

interface User {
    id: string;
    fullName: string;
    email: string;
    phone: string;
    role: string;
}

interface Subscription {
    id: string;
    startDate: string;
    endDate: string;
    isActive: boolean;
    tier: string;
    period: string;
    price: number;
    commissionPercentage: number;
    description: string;
    benefits: string[];
}


export interface MotelAllApi {
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
    user: User;
    city: City;
    images: MotelImage[];
    motelConfig: motelConfig | null;
    subscription: Subscription | null;
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


export interface MotelReservationStats {
    dailyRequests: number;       // Solicitudes realizadas en el día actual
    confirmedToday: number;           // Reservas confirmadas (todas, no solo hoy)
    paidToday: number;                // Reservas pagadas
    notRespondedToday: number;        // Reservas no respondidas
    pendingToday: number;        // Reservas pendientes para hoy
    completedToday: number;           // Reservas finalizadas correctamente
}

export interface MotelFinancialStats {
    todayRevenue: number,
    yesterdayRevenue: number,
    percentChange: number,
    changeType: string,
    weekRevenue: number,
    monthRevenue: number,
    hasData: boolean
}

// interfaces/customer-satisfaction.interface.ts

export interface CustomerSatisfaction {
    hasRatings: boolean;
    message?: string;
    averageRating?: number;
    totalRatings?: number;
    ratingDistribution?: {
        1: number;
        2: number;
        3: number;
        4: number;
        5: number;
    };
    recentComments?: {
        rating: number;
        comment: string;
        userName: string;
        date: Date;
    }[];
}
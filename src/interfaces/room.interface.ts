import { isApprovedStatus, motelConfig } from "./motels.interface";

export type statusRoom = "AVAILABLE" | "IN_SERVICE" | "CLEANING" | "DISABLED" | "SERVICE_COMPLETED";


export interface RoomApi {
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
  status: statusRoom; // Asumiendo posibles estados
  timeLimit: number;
  roomNumber: string;
  extraServicesActive: boolean;
  extraServices: number;
  surcharge: number;
  createdAt: string;
  updatedAt: string;
  category: CategoryRoomApi;
  garage: GarageRoomApi;
  images: Image[];
  amenities: RoomAmenity[];
  motel: Motel;
}



interface Motel {
  id: string;
  razonSocial: string;
  identificationRepresentante: string;
  nombreRepresentante: string;
  description: string;
  slug: string;
  isApproved: isApprovedStatus; // Asumiendo posibles estados
  contactEmail: string;
  contactPhone: string;
  whatsapp: string;
  nit: string;
  amenities: string[]; // Si son solo strings de IDs o nombres
  address: string;
  neighborhood: string;
  createdAt: string;
  updatedAt: string;
  freeService: boolean;
  city: City;
  motelConfig: motelConfig;
  images: Image[]; // Si el motel también tiene imágenes
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


export interface Image {
  id: string;
  url: string; // Asumiendo que las imágenes tendrán una URL
}

export interface RoomAllApi {
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
  images: Image[]; 
  amenities: RoomAmenity[];
  motel: {
    id: string;
    razonSocial: string;
    city: {
      id: string;
      name: string;
      department: {
        geonameId: string;
        name: string;
      };
    };
  };
}

export interface AmenityDetail {
  id: string;
  name: string;
  description: string;
}

export interface RoomAmenity {
  id: string;
  amenities: AmenityDetail;
}



export interface GarageRoomApi {
  id: string,
  title: string
}

export interface CategoryRoomApi {
  id: string;
  name: string;
  description: string;
}

export interface AmenitiesRoomApi {
  id: string;
  name: string;
  description: string;
}
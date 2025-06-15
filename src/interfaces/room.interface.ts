export type statusRoom = "AVAILABLE" | "IN_SERVICE" | "CLEANING" | "DISABLED" | "SERVICE_COMPLETED";


export interface RoomApi {
  id: string;
  title: string;
  description: string;
  price: number;
  promoActive: boolean;
  promoPrice: number | null;
  slug: string;
  tags: string[];
  inAvaible: boolean;
  status: statusRoom; // ajusta según tus estados posibles
  timeLimit: number;
  roomNumber: string;
  extraServicesActive: boolean;
  extraServices: number;
  surcharge: number;
  createdAt: string; // o Date si parseas
  updatedAt: string; // o Date
  priceAddTime: number;
  category: {
    id: string;
    name: string;
    description: string;
  };
  garage: {
    id: string;
    title: string;
  };
  images: string[]; // asumiendo que son URLs, si es otro tipo, ajusta
  amenities: {
    id: string;
    amenities: {
      id: string;
      name: string;
      description: string;
    };
  }[];
  motel: {
    id: string;
    razonSocial: string;
    identificationRepresentante: string;
    nombreRepresentante: string;
    description: string;
    slug: string;
    isApproved: string; // podrías tipar como enum si tienes valores fijos
    contactEmail: string;
    contactPhone: string;
    whatsapp: string;
    nit: string;
    amenities: string[]; // suponiendo que son nombres o ids, ajusta si es necesario
    address: string;
    neighborhood: string;
    createdAt: string;
    updatedAt: string;
    freeService: boolean;
    images: string[]; // asumiendo URLs o rutas
  };
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
  inAvaible: boolean;
  status: statusRoom;
  timeLimit: number;
  roomNumber: string;
  extraServicesActive: boolean;
  extraServices: number;
  surcharge: number;
  createdAt: string; // o Date si haces parse
  updatedAt: string; // o Date si haces parse
  category: {
    id: string;
    name: string;
  };
  garage: {
    id: string;
    title: string;
  };
  images: any[]; // puedes tipar mejor si tienes estructura
  amenities: {
    id: string;
    amenities: {
      id: string;
      name: string;
      description: string;
    };
  }[];
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

export interface RoomCategory {
  id: string;
  name: string;
  description: string;
}

export interface Garage {
  id: string;
  title: string;
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
import { statusRoom } from "./room.interface";

export interface BedRooms {
    id: string;
    title: string;
    description: string;
    images: string[];
    price: number;
    timeLimit: number;
    promoPrice?: number | null;
    promoActive: boolean;
    slug: string;
    status?: statusRoom;
    tags: string[];
    inAvailable: boolean;
    roomNumber: string;
    extraServicesActive: boolean;
    extraServices?: number | null;
    surcharge: number;
    amenities: string[];
    isFavorite?:boolean;
    roomImage: {
        id: number;
        url: string;
    }[];
    category: {
        name: string,
        description: string,
    };
    garage: string;
    motel: {
        city?: {
            name: string;
        };
        id: string;
        title: string;
        slug?: string;
        contactPhone?: string;
        address?: string;
        neighborhood?: string;
        department?: {
            name: string;
        };
    },
    city?: string,
    department?: string,
    country?: string,
    ratings: {
        createdAt: Date;
        rating: number;
        comment: string | null;
    }[];
}


export interface BedroomBooking {
    id: string;
    title: string;
    description: string;
    category: string;
    garage: string;
    image: string;
    slug: string;
    price: number;
    promoprice?: number | null;
    promoActive?: boolean;
    timeLimit: number;
    amenitiesRoom: string[];
    arrivalDate: Date;
    departureDate: Date;
    roomNumber: string;
    extraServicesActive: boolean;
    extraServices?: number | null;
    surcharge: number;
    timeAwait: number;
    createdAt: Date;
    motel: {
        title: string
        location?: string
        address?: string
        neighborhood?: string
        contactPhone?: string
        slug?: string
    }

}


export interface RoomManagerProps {
    id: string;
    title: string;
    roomNumber: string;
    status: statusRoom;
    price: number;
}

export interface Rating {
    id: string;
    rating: number;
    comment: string | null;
    createdAt: Date;
    room: {
        title: string;
        roomNumber: string;
    };
}


export interface roomAddService {
    id: string;
    title: string;
    roomNumber: string;
    price: number;
    promoPrice?: number | null;
    promoActive?: boolean;
    timeLimit: number;
}

export interface roomInSerciceAdmin {
    id: string;
    type: "reservation" | "noReservation",
    title: string;
    roomNumber: string;
    dateTaken: Date
    departureDate: Date;
    createdAtAddTime: Date | null;
    totalAddTime: number;
}


export interface roomInSerciceDetailAdmin {
    id: string;
    room: string;
    type: "reservation" | "noReservation",
    dateTakenReservation: Date;
    departureDate: Date;
    roomNumber: string;
    totalAddTime: number;
    addTimes: addTimes[];
}

interface addTimes {
    id: string;
    addTimeReservation: number;
    newDepartureDate: Date | null;
    total: number;
    createdAt: Date;
    serviceItemId: string;
}


export interface roomNextSerciceDetailAdmin {
    room: string;
    arrivalDate: Date;
    departureDate: Date;
    roomNumber: string;
}



export interface serviceCompleted {
    id: string;
    title: string;
    roomNumber: string;
    departureDate: Date;
    createdAt: Date;
}

export interface CategoryRoom {
    id: string,
    name: string
    description: string;
}

export interface GarageRoom {
    id: string,
    name: string
}

export interface AmenitiesRoom {
    id: string;
    name: string;
    description: string;
}

export interface RoomImage {
    id: number;
    url: string;
}

export interface AmenitiesByRoom {
    id: string;
    name: string;
    description: string;
}


export type CategoryRooms = 'basica' | 'estandar' | 'deluxe' | 'suite' | 'presidencial';
export type TypeAmenities = 'Aire acondicionado' | 'baño privado' | 'Jacuzzi' | 'Tv' | 'Minibar' | 'Espejos' | 'Mobiliario' | 'Wi-Fi gratuito';
export type typeGarage = 'Garaje privado' | 'Garaje compartido' | 'Garaje para motos';
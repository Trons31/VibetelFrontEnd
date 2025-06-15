import { statusRoom } from "./room.interface";


export type StatusReservation = 'cancelado' | 'en_espera' | 'iniciado' | 'en_servicio' | 'completado' | 'no_iniciado';

export interface Motel {
  title: string;
  address: string,
  neighborhood: string,
  contactPhone: string,
  MotelConfig: {
    defaultReservationAddTime: number | null;
  } | null
}

export interface RoomImage {
  url: string;
}

export interface Room {
  slug: string;
  priceAddTime: number;
  motel: Motel;
  roomImage: RoomImage[];
}

export interface ServiceItem {
  id: string;
  updatedAt: Date;
  title: string;
  promoPrice?: number | null;
  price: number;
  arrivalDate: Date;
  departureDate: Date;
  timeLimit: number;
  roomNumber: string;
  extraServices?: number | null;
  accessCode?: string | null;
  status: StatusReservation;
  serviceTaken: boolean;
  dateTaken?: Date | null;
  serviceCompleted: boolean;
  userConfirmServiceCompleted: boolean;
  dateComplete?: Date | null;
  dateUserConfirmServiceCompleted?: Date | null;
  canceledReservation: boolean;
  dateCanceledReservation?: Date | null;
  surchargeActive: boolean;
  surchargeAmount: number;
  surchargePaid: boolean;
  serviceId: string;
  roomId: string;
  room: Room;
}


export interface Reservation {
  id: string;
  departureDate: Date;
  type: "reservation" | "noReservation",
  subTotal: number;
  total: number;
  nickName?: string | null;
  paidAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
  userId?: string | null;
  ServiceItem?: ServiceItem | null;
  transactionId?: string | null;
  RoomRating: {
    rating: number;
  } | null

}

export interface ReservationByUser {
  id: string;
  createdAt: Date;
  status: StatusReservation | undefined;
  roomSlug: string | undefined;
  motelName: string | undefined;
  room: string | undefined;
  roomId: string | undefined;
  roomImages: {
    url: string;
  }[] | undefined;
  total: number;
  ratings: {
    id: string;
    rating: number;
  } | null
  serviceRating: {
    id: string;
  } | null
}

export interface reservationCheckInAdmin {
  id: string | undefined,
  title: string | undefined;
  arrivalDate: Date | undefined;
  roomNumber: string | undefined;
  accessCode: string | null | undefined;
  status: StatusReservation | undefined;
}

export interface serviceAdmin {
  id: string | undefined,
  title: string | undefined;
  arrivalDate: Date | undefined;
  roomNumber: string | undefined;
  departureDate: Date | undefined;
  status: StatusReservation | undefined;
}

export interface reservationsByRoom {
  id: string,
  title: string,
  roomNumber: string,
  status: statusRoom,
  totalReservation: number,
}

export interface BookingUser {
  id: string | undefined,
  title: string | undefined;
  arrivalDate: Date | undefined;
  roomNumber: number | undefined;
  accessCode: string | null | undefined;
  status: StatusReservation | undefined;
}

export interface ReservationData {
  totalReservations: number;
  reservationsEnEspera: number;
  reservationsIniciadas: number;
  reservationsCompletadas: number;
  reservationsCanceladas: number;
  reservationsNoIniciadas: number;
}


export interface statusCounts {
  en_espera: number;
  completado: number;
  cancelado: number;
  iniciado: number;
}

export interface ReservationDetailRoom {
  id: string;
  arrivalDate: Date;
  departureDate: Date;
  timeLimit: number;
  status: StatusReservation;
}
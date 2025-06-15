type StatusService = 'cancelado' | 'en_espera' | 'iniciado' | 'en_servicio' | 'completado' | 'no_iniciado';

interface Motel {
  title: string;
  address: string,
  neighborhood: string,
  contactPhone: string,
  MotelConfig: {
    defaultReservationAddTime: number | null;
  } | null
}

interface RoomImage {
  url: string;
}

interface Room {
  slug: string;
  priceAddTime: number;
  motel: Motel;
  roomImage: RoomImage[];
}

interface ServiceItem {
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
  status: StatusService;
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


export interface Service {
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




export interface ServiceData {
    totalServices: number;
    startedServices: number;
    completedServices: number;
}
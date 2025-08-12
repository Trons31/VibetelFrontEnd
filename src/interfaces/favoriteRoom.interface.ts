import { RoomRating } from "./reservation.interface";
import { CategoryRoomApi, GarageRoomApi, Image } from "./room.interface";

export interface FavoriteRoomApi {
    id: string;
    title: string;
    price: number;
    promoActive: boolean;
    promotionPercentage:number | null;
    promoPrice: number | null;
    slug: string;
    timeLimit: number;
    images: Image[];
    category: CategoryRoomApi;
    garage: GarageRoomApi | null;
    ratings: RoomRating[]
    motel: {
        razonSocial: string;
    };
}

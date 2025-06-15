export interface FavoriteRoom {
    room: {
        title: string;
        price: number;
        promoActive: boolean;
        promoPrice: number | null;
        slug: string;
        timeLimit: number;
        inAvailable: boolean;
        motel: {
            title: string;
        };
        roomImage: {
            url: string;
        }[];
    };
    id: string;
    userId: string;
    roomId: string;
}

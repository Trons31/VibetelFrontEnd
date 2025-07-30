import { create } from 'zustand';
import io from 'socket.io-client';
import { ReservationPendingByMotelApi } from '@/interfaces/reservation.interface';

type SocketInstance = ReturnType<typeof io>;

interface ReservationState {
    socket: SocketInstance | null;
    reservations: ReservationPendingByMotelApi[];
    isConnected: boolean;
    connectSocket: (token: string) => void;
    disconnectSocket: () => void;
    addReservation: (reservation: ReservationPendingByMotelApi) => void;
    setInitialReservations: (reservations: ReservationPendingByMotelApi[]) => void;
    removeReservation: (reservationId: string) => void;
    initialLoaded: boolean;
}

export const useReservationStore = create<ReservationState>((set, get) => ({
    socket: null,
    reservations: [],
    isConnected: false,
    initialLoaded: false,

    connectSocket: (token: string) => {
        if (get().socket) return;

        const socket = io(`${process.env.NEXT_PUBLIC_WEBSOCKET_ROUTE}reservations`, {
            transports: ['websocket'],
            auth: {
                token,
            },
        });

        socket.on('connect', () => {
            set({ isConnected: true });
            console.log('✅ Connected to WebSocket');
        });

        socket.on('disconnect', () => {
            set({ isConnected: false });
            console.log('⚠️ Disconnected from WebSocket');
        });

        socket.on('newReservation', (reservation: ReservationPendingByMotelApi) => {
            set((state) => ({
                reservations: [reservation, ...state.reservations],
            }));

            const event = new CustomEvent('newReservation', { detail: reservation });
            window.dispatchEvent(event);
        });

        socket.on('error', (error: any) => {
            console.error('❌ WebSocket error:', error);
        });

        set({ socket });
    },

    disconnectSocket: () => {
        const { socket } = get();
        if (socket) {
            socket.disconnect();
            set({ socket: null, isConnected: false });
        }
    },

    addReservation: (reservation) => {
        set((state) => ({
            reservations: [reservation, ...state.reservations],
        }));
    },

    setInitialReservations: (reservations) => {
        set({
            reservations,
            initialLoaded: true
        });
    },

    removeReservation: (reservationId: string) => {
        set((state) => ({
            reservations: state.reservations.filter(
                (reservation) => reservation.id !== reservationId
            ),
        }));
    },
}));

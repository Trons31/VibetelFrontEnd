import { create } from 'zustand';
import io from 'socket.io-client';
import { PaymentStatus, ReservationPendingByMotelApi } from '@/interfaces/reservation.interface';

type SocketInstance = ReturnType<typeof io>;

interface ReservationState {
  socket: SocketInstance | null;
  reservations: ReservationPendingByMotelApi[];
  reservationsOnPayment: ReservationPendingByMotelApi[]; // Nuevo estado para reservas en proceso de pago
  isConnected: boolean;
  connectSocket: (token: string) => void;
  disconnectSocket: () => void;
  addReservation: (reservation: ReservationPendingByMotelApi) => void;
  setInitialReservations: (reservations: ReservationPendingByMotelApi[]) => void;
  removeReservation: (reservationId: string) => void;
  addReservationOnPayment: (reservation: ReservationPendingByMotelApi) => void; // Nueva acción
  removeReservationOnPayment: (reservationId: string) => void; // Nueva acción
  setInitialReservationsOnPayment: (reservations: ReservationPendingByMotelApi[]) => void; // Nueva acción
  updateReservationPaymentStatus: (reservationId: string, status: PaymentStatus) => void;
  initialLoaded: boolean;
  initialLoadedOnPayment: boolean; // Nuevo estado de carga inicial
}

export const useReservationStore = create<ReservationState>((set, get) => ({
  socket: null,
  reservations: [],
  reservationsOnPayment: [], // Inicializamos la nueva lista
  isConnected: false,
  initialLoaded: false,
  initialLoadedOnPayment: false,

  connectSocket: (token: string) => {
    if (get().socket) return;

    const socket = io(`${process.env.NEXT_PUBLIC_WEBSOCKET_ROUTE}reservations`, {
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 2000,
      auth: {
        token,
      },
    });

    socket.on('connect', () => {
      set({ isConnected: true });
    });

    socket.on('disconnect', () => {
      set({ isConnected: false });
    });

    socket.on('newReservation', (reservation: ReservationPendingByMotelApi) => {
      set((state) => ({
        reservations: [reservation, ...state.reservations],
      }));

      const event = new CustomEvent('newReservation', { detail: reservation });
      window.dispatchEvent(event);
    });

    socket.on('reservationPaid', (data: { reservationId: string }) => {
      get().updateReservationPaymentStatus(data.reservationId, 'accepted');


      const event = new CustomEvent('reservationPaid', {
        detail: { reservationId: data.reservationId }
      });
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
      initialLoaded: true,
    });
  },

  removeReservation: (reservationId: string) => {
    set((state) => ({
      reservations: state.reservations.filter(
        (reservation) => reservation.id !== reservationId
      ),
    }));
  },

  // Nuevas acciones para el estado de reservas en proceso de pago
  setInitialReservationsOnPayment: (reservations) => {
    set({ reservationsOnPayment: reservations, initialLoadedOnPayment: true });
  },

  removeReservationOnPayment: (reservationId) => {
    set((state) => ({
      reservationsOnPayment: state.reservationsOnPayment.filter(
        (reservation) => reservation.id !== reservationId
      ),
    }));
  },

  addReservationOnPayment: (reservation) => {
    set((state) => ({
      reservationsOnPayment: [reservation, ...state.reservationsOnPayment],
    }));
  },

  updateReservationPaymentStatus: (reservationId, status: PaymentStatus) => {
    set((state) => ({
      reservationsOnPayment: state.reservationsOnPayment.map(reservation =>
        reservation.id === reservationId
          ? { ...reservation, paymentStatus: status }
          : reservation
      ),
    }));
  },


}));
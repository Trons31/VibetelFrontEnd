
import { create } from 'zustand';
import io, { Socket } from 'socket.io-client';

type SocketInstance = ReturnType<typeof io>;

interface ReservationStatusState {
  socket: SocketInstance | null;
  isConnected: boolean;
  reservationStatus: any;
  currentToken: string | null;
  connectSocket: (reservationToken: string) => void;
  disconnectSocket: () => void;
  setToken: (token: string | null) => void;
}

export const useReservationStatusStore = create<ReservationStatusState>((set, get) => ({
  socket: null,
  isConnected: false,
  reservationStatus: null,
  currentToken: null,

  connectSocket: (reservationToken: string) => {

    const currentSocket = get().socket;
    const currentToken = get().currentToken;

    if (currentSocket && get().isConnected && currentToken === reservationToken) {
      console.log('✅ Ya conectado al WebSocket con el mismo token.');
      return;
    }

    if (currentSocket && currentToken !== reservationToken) {
      currentSocket.disconnect();
      console.log('⚠️ Desconectando socket anterior para nueva conexión.');
    } else if (currentSocket && !get().isConnected) {
      // Si el socket existe pero no está conectado (e.g., por una desconexión previa),
      // no lo desconectamos, solo lo reusamos si es el mismo token.
      // Si no es el mismo token, la lógica de 'currentToken !== reservationToken' ya lo manejaría.
    }

    const newSocket = io(`${process.env.NEXT_PUBLIC_WEBSOCKET_ROUTE}reservation-status`, {
      transports: ['websocket'],
      // autoConnect se maneja con la llamada explícita a .connect()
    });

    newSocket.on('connect', () => {
      set({ isConnected: true });
      console.log('✅ Reservation Status WebSocket connected');
      newSocket.emit('joinReservationRoom', reservationToken);
    });

    newSocket.on('disconnect', () => {
      set({ isConnected: false });
      console.log('⚠️ Reservation Status WebSocket disconnected');
    });

    newSocket.on('reservationUpdate', (data: any) => {
      set({ reservationStatus: data });
      console.log('📢 Received reservation update:', data);
    });

    newSocket.on('error', (error: any) => {
      console.error('❌ WebSocket error:', error);
    });

    // Actualizar el estado con el nuevo socket y el token
    set({ socket: newSocket, currentToken: reservationToken });
    newSocket.connect(); // Iniciar la conexión
  },

  disconnectSocket: () => {
    const { socket } = get();
    if (socket) {
      socket.disconnect();
    }
    // Limpiar completamente el estado relacionado con el socket
    set({
      socket: null,
      isConnected: false,
      reservationStatus: null,
      currentToken: null
    });
  },

  setToken: (token: string | null) => {
    const currentToken = get().currentToken;
    // Si el token es el mismo, no hacer nada para evitar reconexiones innecesarias
    if (token === currentToken) {
      return;
    }

    if (token) {
      get().connectSocket(token);
    } else {
      get().disconnectSocket();
    }
  }
}));
// Función para notificar que el token ha cambiado
export const notifyTokenChange = (token: string | null) => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('reservationTokenChanged', {
      detail: { token }
    }));
  }
};

// Función para suscribirse a cambios de token
export const subscribeToTokenChanges = (callback: (token: string | null) => void) => {
  if (typeof window !== 'undefined') {
    const handler = (event: CustomEvent) => callback(event.detail.token);
    window.addEventListener('reservationTokenChanged', handler as EventListener);
    
    // Retornar función para desuscribirse
    return () => window.removeEventListener('reservationTokenChanged', handler as EventListener);
  }
  return () => {}; // Función vacía si no está en navegador
};
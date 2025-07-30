import { format, toZonedTime } from 'date-fns-tz';
import { es } from 'date-fns/locale';

// Función para obtener la fecha actual en Bogotá
const getBogotaDate = (date: Date | string): Date => {
    const parsedDate = typeof date === 'string' ? new Date(date) : date;
    return toZonedTime(parsedDate, 'America/Bogota');
};

export const formatDate = (date: Date | string) => {
    const bogotaDate = getBogotaDate(date);
    return format(bogotaDate, "dd, MMMM yyyy", { locale: es });
};

export const formatDateWithHours = (dateString: string | Date): string => {
    const date = getBogotaDate(dateString);

    if (isNaN(date.getTime())) {
        console.error('Invalid date:', dateString);
        return 'Fecha inválida';
    }

    const options: Intl.DateTimeFormatOptions = {
        timeZone: 'America/Bogota',
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    };

    return new Intl.DateTimeFormat('es-ES', options).format(date);
};

export const formatTimeWithAmPm = (date: Date | string): string => {
    const bogotaDate = getBogotaDate(date);
    return format(bogotaDate, "hh:mm a", { locale: es });
};
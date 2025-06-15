
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export const formatDate = (date: Date) => {
    return format(date, "dd, MMMM yyyy", { locale: es });
};


export const formatDateWithHours = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true  // Para usar el formato de 12 horas (am/pm)
    };

    // Formatear la fecha usando opciones específicas
    const formattedDate = new Intl.DateTimeFormat('es-ES', options).format(date);

    return formattedDate;
};

export const formatTimeWithAmPm = (date: Date): string => {
    // Utilizar 'date-fns' para formatear la hora con am/pm
    const formattedTime = format(date, "hh:mm a", { locale: es });

    return formattedTime;
};

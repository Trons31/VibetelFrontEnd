export const formatTime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    const hoursText = hours > 0 ? `${hours} ${hours === 1 ? 'hora' : 'horas'}` : '';
    const minutesText = remainingMinutes > 0 ? `${remainingMinutes} minutos` : '';

    return `${hoursText}${hoursText && minutesText ? ' ' : ''}${minutesText}`.trim();
};

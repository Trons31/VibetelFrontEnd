'use client';
import { useState, useEffect } from "react";

interface Props {
    createdAt: Date | null;
    timeMinutesCleamRoom: number;
}

export const CleaningTimeDisplay = ({ createdAt, timeMinutesCleamRoom }: Props) => {
    const [remainingTime, setRemainingTime] = useState("");

    useEffect(() => {
        if (!createdAt || timeMinutesCleamRoom <= 0) return;

        const updateCleaningTime = () => {
            const cleaningStartTime = new Date(createdAt);
            const cleaningEndTime = new Date(cleaningStartTime.getTime() + timeMinutesCleamRoom * 60000);
            const currentTime = new Date();
            const remainingMinutes = Math.max(0, Math.floor((cleaningEndTime.getTime() - currentTime.getTime()) / 60000));

            setRemainingTime(remainingMinutes > 0 ? `Quedan ${remainingMinutes} minutos` : "Limpieza terminada");
        };

        updateCleaningTime(); // Actualizar inmediatamente

        const interval = setInterval(updateCleaningTime, 60000); // Actualizar cada 1 min

        return () => clearInterval(interval); // Limpiar el intervalo al desmontar
    }, [createdAt, timeMinutesCleamRoom]);

    return <span className="text-white text-sm">{remainingTime}</span>;
};

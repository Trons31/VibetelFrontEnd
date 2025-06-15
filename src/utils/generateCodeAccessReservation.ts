import { v4 as uuidv4 } from 'uuid';

const usedCodes = new Set<string>();  // Set para almacenar códigos ya utilizados

export const generateAccessCodeReservation = (): string => {
    let code: string;

    do {
        // Generar un UUID
        const uuid = uuidv4();

        // Extraer los últimos 4 dígitos
        code = uuid.slice(-4).toUpperCase(); // Puedes ajustar el formato si lo deseas

    } while (usedCodes.has(code)); // Verificar si el código ya ha sido utilizado

    // Añadir el nuevo código al conjunto de códigos utilizados
    usedCodes.add(code);

    return code;
}

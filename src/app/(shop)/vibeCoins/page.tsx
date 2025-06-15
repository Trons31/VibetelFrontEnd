import { FaTools } from "react-icons/fa";

export async function generateMetadata() {
    return {
        title: 'Vibepuntos - Recompensas Exclusivas',
        description: 'Acumula puntos en moteles registrados y disfruta de beneficios como reservas gratuitas, descuentos en habitaciones y más en Vibetel.',
    };
}

export default function VibeCoinsPage() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center px-4">
            <FaTools className="text-gray-700 text-6xl mb-4 animate-bounce" />
            <h1 className="text-xl md:text-3xl font-semibold text-gray-800">Estamos trabajando en ello</h1>
            <p className="text-gray-600 mt-2 max-w-md">
                Muy pronto podrás disfrutar de los beneficios de ser un usuario de <span className="font-semibold">Vibetel</span> con <span className="font-semibold">VibePuntos</span>. ¡Mantente atento!
            </p>
        </div>
    );
}
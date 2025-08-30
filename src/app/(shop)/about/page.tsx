import axios from "axios";
import { UiPageAbout } from "./ui/UiPageAbout";
import { GeneralStatistics } from "@/interfaces/statistics";

export async function generateMetadata() {
    return {
        title: 'Quiénes somos',
        description: 'Descubre VibeTel, la plataforma líder en reservas de habitaciones de motel. Conéctate con moteles registrados en tu zona, consulta disponibilidad en tiempo real, fotos y más. Los moteles pueden registrarse y pasar por un proceso de validación para operar en nuestra plataforma.',
    };
}


export default async function AboutPage() {

    let statistics: GeneralStatistics;
    try {
        const response = await axios.get<GeneralStatistics>(`${process.env.NEXT_PUBLIC_API_ROUTE}statistics/general`);
        statistics = response.data;
    } catch (error: any) {
        statistics = {
            citiesWithApprovedMotels: 0,
            motelsApproved: 0,
            roomsWithApprovedMotels: 0
        }
    }

    return (
        <div className='mt-12' >
            <UiPageAbout
                generalStatistics={statistics}
            />
        </div>
    );
}
import { getDataForInformation } from "@/actions";
import { UiPageAbout } from "./ui/UiPageAbout";

export async function generateMetadata() {
    return {
        title: 'Quiénes somos',
        description: 'Descubre VibeTel, la plataforma líder en reservas de habitaciones de motel. Conéctate con moteles registrados en tu zona, consulta disponibilidad en tiempo real, fotos y más. Los moteles pueden registrarse y pasar por un proceso de validación para operar en nuestra plataforma.',
    };
}


export default async function AboutPage() {

    const dataInformation = await getDataForInformation();

    return (
        <div className='mt-12' >
            <UiPageAbout allRoom={dataInformation.allRoom} allUser={dataInformation.allUser} allMotel={dataInformation.allMotel} />
        </div>
    );
}
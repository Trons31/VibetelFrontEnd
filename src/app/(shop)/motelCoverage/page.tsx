import { CoverageMotel } from "./ui/CoverageMotel";

export async function generateMetadata() {
    return {
        title: 'Cobertura Vibetel',
        description: 'Explora todas las ubicaciones donde Vibetel ofrece cobertura y encuentra moteles disponibles en esas áreas.',
    };
}


export default function MotelCoveragePage() {
    return (
        <div className="mb-20" >
            <div className="h-fit mt-14 flex items-center justify-center">
                <section className="w-full h-full bg-red-600 py-28 md:py-20 bg-cover bg-center relative" >
                    <div className="flex flex-col items-center justify-center h-full relative z-5 text-center text-white px-2 md:px-20">
                        <h3 className=" text-white relative after:w-[10%] md:text-4xl font-semibold text-lg pb-4">
                            ¿Quieres que estemos en tu cuidad?
                        </h3>
                        <h4 className=" text-white text-xs md:text-lg ">
                            ¿Te gustaría que nuestra plataforma llegara a tu ciudad? Si deseas que nos asociemos con los moteles más cercanos a ti, ¡solicítalo ahora y muy pronto estaremos en tu localidad!
                            <span className=" text-white px-2 underline font-bold">
                                ¡Solicita nuestra presencia aquí!
                            </span>
                        </h4>
                    </div>
                </section>
            </div>

            <div className="px-2 md:px-24 mt-16" >
                <p className="text-2xl  font-semibold" >Cobertura</p>
                <p className="text-sm md:text-md text-gray-500" style={{ textAlign: 'justify' }} >VibeTel es una empresa en crecimiento, revisa nuestra lista de cobertura y mira si tu ubicacion esta disponible</p>
            </div>
            <CoverageMotel />
        </div>
    );
}
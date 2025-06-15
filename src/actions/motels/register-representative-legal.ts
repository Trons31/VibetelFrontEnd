'use server'; 
import prisma from "@/lib/prisma";

interface representativeLegal{
    id: string;
}

interface RegistrationResult {
    ok?: boolean;
    message?: string;
    representativeLegal?: representativeLegal;
}

export const registerRepresentativeLegal = async(name:string,idRepresentative:string,root:string): Promise<RegistrationResult> => {


    try {
        
        const idRepresentExist = await prisma.legalRepresentativeMotel.findFirst({
            where:{
                identificationCard: idRepresentative
            }
        })

       if(idRepresentExist){
        return {
            ok:true,
            representativeLegal: idRepresentExist
        }
       }
    
        const representativeLegal = await prisma.legalRepresentativeMotel.create({
            data:{
                name: name,
                identificationCard: idRepresentative,
                root: root
            },
            select: {
                id: true,
            }
        })

        
        return  {
            ok:true,
            representativeLegal: representativeLegal
        }
        
    


    } catch (error) {
        
        return  {
            ok:true,
            message: 'Error: No se pudo registrar el representante legal. Por favor, verifique los datos ingresados e intente nuevamente. Si el problema persiste, póngase en contacto con el soporte técnico para obtener asistencia.'
        }
    }

}
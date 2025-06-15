'use server';
import prisma from "@/lib/prisma";
import bcryptjs from 'bcryptjs';

 



export const registerMotelPartner = async(name:string,lastname:string,contactPhone:string,email:string,password:string) => {

    try {

        const emailExist = await prisma.user.findUnique({
            where:{
                email: email
            }
        })

        if(emailExist){
            return{
                ok:false,
                message: 'Este correo ya está registrado. Inicia sesión.'
            }
        }

        const motelPartner = await prisma.user.create({
            data:{
            name: name,
            lastname: lastname,
            contactPhone: contactPhone,
            email:email,
            password: bcryptjs.hashSync(password),
            role: 'motelPartner'
            },
            select:{
                id:true,
                name:true,
                lastname: true,
                email:true,
                
            }
        })

        return {
            ok: true,
            motelPartner: motelPartner,
            message: 'motelPartner creado correctamente'
        }
        
    } catch (error) {
        return {
            ok: false,
            message: 'No se pudo crear el motelPartner'
        }
    }


}
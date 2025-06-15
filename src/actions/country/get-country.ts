'use server';
import prisma from "@/lib/prisma";

 


export const GetCountries = async() => {

    try {

        const countries = await prisma.country.findMany({
            orderBy:{
                name: "asc"
            }
        })
        
        return countries;

    } catch (error) {
        console.log("No se pudieron cargar los paises")
        return []
    }


}
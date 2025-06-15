'use server';
import prisma from "@/lib/prisma";

 



export const GetDepartment = async() => {

    try {
        
        const department = await prisma.department.findMany();

        return department;

    } catch (error) {
        console.log("No se pudieron cargar los departamentos")
        return []
    }
}
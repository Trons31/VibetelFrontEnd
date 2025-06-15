'use server';

import prisma from "@/lib/prisma";

interface Props {
  page: number;
  searchTerm: string;
}

export const coverageMotel = async ({ page = 1, searchTerm }: Props) => {
  const itemsPerPage = 5;
  const skip = (page - 1) * itemsPerPage;

  try {
    // Obtener todos los departamentos (incluso si no tienen moteles) y contar moteles aprobados y no aprobados
    const departments = await prisma.department.findMany({
      where: {
        OR: [
          { name: { contains: searchTerm, mode: 'insensitive' } }, // Filtrar por nombre de departamento
          {
            City: {
              some: {
                name: { contains: searchTerm, mode: 'insensitive' }, // Filtrar por nombre de ciudad
              },
            },
          },
        ],
      },
      select: {
        id: true,
        name: true,
        City: {
          select: {
            id: true,
            name: true,
            _count: {
              select: {
                Motel: {
                  where: { isApproved: "APPROVED" }, // Solo contar moteles aprobados
                },
              },
            },
            Motel: {
              select: {
                id: true,
                isApproved: true, // Incluir el estado de aprobación
              },
            },
          },
        },
        Motel: {
          select: {
            id: true,
            isApproved: true, // Incluir el estado de aprobación para contar
          },
        },
      },
      orderBy: {
        name: 'asc', // Ordenar los departamentos alfabéticamente por nombre
      },
      take: itemsPerPage,
      skip: skip,
    });

    // Contar el total de departamentos (sin filtrar por moteles)
    const totalCount = await prisma.department.count({
      where: {
        OR: [
          { name: { contains: searchTerm, mode: 'insensitive' } }, // Filtrar por nombre de departamento
          {
            City: {
              some: {
                name: { contains: searchTerm, mode: 'insensitive' }, // Filtrar por nombre de ciudad
              },
            },
          },
        ],
      },
    });

    // Formatear los departamentos con la información requerida
    let departmentsFormatted = departments.map((department) => {
      // Número total de moteles aprobados y no aprobados en el departamento
      const totalApprovedMotelsInDepartment = department.Motel.filter((motel) => motel.isApproved).length;
      const totalUnapprovedMotelsInDepartment = department.Motel.filter((motel) => !motel.isApproved).length;

      // Crear el detalle de las ciudades dentro del departamento
      const cityDetails = department.City.map((city) => {
        // Número total de moteles aprobados y no aprobados en la ciudad
        const totalApprovedMotelsInCity = city.Motel.filter((motel) => motel.isApproved).length;
        const totalUnapprovedMotelsInCity = city.Motel.filter((motel) => !motel.isApproved).length;

        return {
          cityId: city.id,
          cityName: city.name,
          totalApprovedMotelsInCity,
          totalUnapprovedMotelsInCity,
        };
      });

      // Filtrar solo las ciudades que tienen al menos un motel aprobado
      const citiesWithApprovedMotels = cityDetails.filter((city) => city.totalApprovedMotelsInCity > 0);

      return {
        departmentId: department.id,
        departmentName: department.name,
        totalApprovedMotelsInDepartment,
        totalUnapprovedMotelsInDepartment,
        totalCitiesWithApprovedMotels: citiesWithApprovedMotels.length,
        cityDetails,
      };
    });

    // Ordenar los departamentos para que primero aparezcan los que tienen cobertura (al menos un motel aprobado)
    departmentsFormatted = departmentsFormatted.sort((a, b) => {
      if (a.totalApprovedMotelsInDepartment > 0 && b.totalApprovedMotelsInDepartment === 0) return -1;
      if (a.totalApprovedMotelsInDepartment === 0 && b.totalApprovedMotelsInDepartment > 0) return 1;
      return 0;
    });

    return {
      ok: true,
      departments: departmentsFormatted,
      totalCount,
    };
  } catch (error) {
    return {
      ok: false,
      departments: [],
      totalCount: 0,
    };
  }
};

import { initialData } from "./seed";
import prisma from '../lib/prisma';
import { countries } from "./seed-country";
import { departments } from "./seed-department";
import { cities } from "./seed-city";


async function main() {

    //Insertamos la informacion de las tablas basicas

    //Limpiamos nuestra base de datos
    await prisma.garage.deleteMany();
    await prisma.categoryRooms.deleteMany();
    await prisma.amenitiesRoomlInfo.deleteMany();
    await prisma.amenitiesMotel.deleteMany();

    await prisma.city.deleteMany();
    await prisma.department.deleteMany();
    await prisma.country.deleteMany();

    await prisma.bank.deleteMany();
    await prisma.accountType.deleteMany();

    const { garage, cateogrysRoom, amenitiesRoom, AmenitiesMotel, bank, accountType } = initialData;



    await prisma.country.createMany({
        data: countries
    })

    await prisma.department.createMany({
        data: departments
    })


    await prisma.city.createMany({
        data: cities
    })

    const garageData = garage.map(garage => ({
        name: garage
    }))

    await prisma.garage.createMany({
        data: garageData
    })

    await prisma.categoryRooms.createMany({
        data: cateogrysRoom
    })

    await prisma.amenitiesRoomlInfo.createMany({
        data: amenitiesRoom
    })

    await prisma.amenitiesMotelInfo.createMany({
        data: AmenitiesMotel
    })

    await prisma.bank.createMany({
        data: bank
    })

    await prisma.accountType.createMany({
        data: accountType
    })


    console.log("execute success")
}


(() => {


    main();

})();
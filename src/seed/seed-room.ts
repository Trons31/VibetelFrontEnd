
import { initialData } from "./seed";
import prisma from '../lib/prisma';


async function main() {

    //Limpiamos nuestra base de datos
    //await prisma.garage.deleteMany();
    //await prisma.categoryRooms.deleteMany();
    //await prisma.amenitiesRoomlInfo.deleteMany();

    const { garage, cateogrysRoom, amenitiesRoom, Rooms } = initialData;

    //const garageData = garage.map(garage => ({
    //    name: garage
    //}))

    //await prisma.garage.createMany({
    //    data: garageData
    //})

    //await prisma.categoryRooms.createMany({
    //    data: cateogrysRoom
    //})

    //await prisma.amenitiesRoomlInfo.createMany({
    //    data: amenitiesRoom
    //})

    //garage Seed Room
    const garageDB = await prisma.garage.findMany();

    const garageMap = garageDB.reduce((map, garage) => {
        map[garage.name] = garage.id;
        return map;

    }, {} as Record<string, string>)

    //categoryRoom Seed Room
    const categoryRoomDB = await prisma.categoryRooms.findMany();

    const categoryRoomMap = categoryRoomDB.reduce((map, categoryRoom) => {
        map[categoryRoom.name.toLowerCase()] = categoryRoom.id;
        return map;

    }, {} as Record<string, string>)

    //Mote Seed Room
    const motelDB = await prisma.motel.findMany();

    const motelMap = motelDB.reduce((map, motel) => {
        map[motel.slug] = motel.id;
        return map;

    }, {} as Record<string, string>)

    // Rooms.forEach(async (room) => {

    //     const { images, category, garage, motel, ...rest } = room;

    //     const dbRoom = await prisma.room.create({
    //         data: {
    //             ...rest,
    //             categoryId: categoryRoomMap[category],
    //             garageId: garageMap[garage],
    //             motelId: motelMap[motel]
    //         }
    //     })

    //     const imagesData = images.map(image => ({
    //         url: image,
    //         roomId: dbRoom.id
    //     }))

    //     await prisma.roomImage.createMany({
    //         data: imagesData
    //     })

    //     const amenitiesRoomDb = await prisma.amenitiesRoomlInfo.findMany();

    //     for (const amenityRoomInfo of amenitiesRoomDb) {
    //         await prisma.amenitiesRoom.create({
    //             data: {
    //                 roomId: dbRoom.id,
    //                 amenitiesRoomlInfoId: amenityRoomInfo.id
    //             }
    //         });
    //     }

    // });

    console.log("execute success")
}


(() => {


    main();

})();
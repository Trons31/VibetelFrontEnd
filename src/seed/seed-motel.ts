import prisma from "../lib/prisma";
import { initialData } from './seed';

async function main() {

   await prisma.motelImage.deleteMany();
   await prisma.amenitiesMotel.deleteMany();
   await prisma.motel.deleteMany();
   await prisma.legalRepresentativeMotel.deleteMany();




   // await prisma.user.createMany({
   //    data: initialData.motelPartners
   // })


   // await prisma.legalRepresentativeMotel.createMany({
   //    data: initialData.legalrepresentativeMotel
   // })

   //Country Seed Motel
   const countryDB = await prisma.country.findMany();

   const countryMap = countryDB.reduce((map, country) => {
      map[country.name.toLowerCase()] = country.id;
      return map;

   }, {} as Record<string, string>)

   //Department Seed Motel
   const departmentDB = await prisma.department.findMany();

   const departmentMap = departmentDB.reduce((map, department) => {
      map[department.name.toLowerCase()] = department.id;
      return map;

   }, {} as Record<string, string>)

   //City Seed Motel
   const cityDB = await prisma.city.findMany();

   const cityMap = cityDB.reduce((map, city) => {
      map[city.name.toLowerCase()] = city.id;
      return map;

   }, {} as Record<string, string>)

   // //Motel Partner Seed Motel
   // const motelPartnerDB = await prisma.user.findMany();

   // const motelPartnerMap = motelPartnerDB.reduce((map, motelPartner) => {
   //    map[motelPartner.email.toLowerCase()] = motelPartner.id;
   //    return map;

   // }, {} as Record<string, string>)

   // //legalrepresentativeMotel Seed motel
   // const legalrepresentativeMotelDB = await prisma.legalRepresentativeMotel.findMany();

   // const legalrepresentativeMotelMap = legalrepresentativeMotelDB.reduce((map, legalrepresentativeMotel) => {
   //    map[legalrepresentativeMotel.identificationCard.toLowerCase()] = legalrepresentativeMotel.id;
   //    return map;

   // }, {} as Record<string, string>)


   // const { motels,AmenitiesMotel } = initialData;

   //  motels.forEach(async (motel) => {

   //     const { images, country, department, city, motelPartner, legalrepresentativeMotel, ...rest } = motel;

   //     const dbMotel = await prisma.motel.create({
   //        data: {
   //           ...rest,
   //           countryId: countryMap[motel.country],
   //           departmentId: departmentMap[motel.department],
   //           cityId: cityMap[motel.city],
   //           motelPartnerId: motelPartnerMap[motel.motelPartner],
   //           legalRepresentativeMotelId: legalrepresentativeMotelMap[motel.legalrepresentativeMotel]
   //        }
   //     })

   //     const imagesData = images.map(image =>({
   //        url: image,
   //        motelId: dbMotel.id
   //     }))

   //     await prisma.motelImage.createMany({
   //        data: imagesData
   //     })

   //     const amenitiesMotelData = AmenitiesMotel.map(amenitieMotel => ({
   //        name: amenitieMotel.name,
   //        description: amenitieMotel.description,
   //        motelId: dbMotel.id
   //     })) 

   //      //TODO: TERMINAR AMENITIESMOTEL

   //  });


   console.log("execute success")
}




(() => {


   main();

})();
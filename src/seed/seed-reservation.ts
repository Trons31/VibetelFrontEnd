import prisma from '../lib/prisma';


async function main() {


    await prisma.serviceAddTime.deleteMany();
    await prisma.serviceItem.deleteMany();
    await prisma.service.deleteMany();

    console.log("execute success")
}


(() => {


    main();

})();
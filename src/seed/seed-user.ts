import { initialData } from "./seed";
import prisma from '../lib/prisma';


async function main() {


    // await prisma.user.deleteMany();

    await prisma.user.createMany({
        data: initialData.users
    })

    console.log("execute success")
}


(() => {


    main();

})();
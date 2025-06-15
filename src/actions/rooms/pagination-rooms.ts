'use server';
import prisma from '../../lib/prisma';

interface Props{
    idMotel?:string;
}

export const getRoomWithImages = async ({idMotel}:Props) => {
   

    try {
        const rooms = await prisma.room.findMany({
            
            orderBy:{
                promoActive: 'desc'
            },
         
            include: {
                ratings: {
                    select: {
                        rating: true
                    }
                },
               
                roomImage :{
                  take: 2,
                  select: {
                    id:true,
                    url: true,
                  },
                  
                },
                category:{
                    select:{
                        id: false,
                        name: true,
                        description:true,
                    }
                },
                
                garage:{
                    select:{
                        id: false,
                        name: true
                    }
                },
                motel:{
                    select:{
                        id: true,
                        title: true
                    }
                }

            },
            
            where:{
                motelId: idMotel
            }
            
        } )




        

       return {
        rooms: rooms.map( room => ({
            ...room,    
            category : room.category,
            garage: room.garage.name,
            images: room.roomImage.map( image => image.url )

        })),
        allResults: rooms.length,
       }

    } catch (error) {
       return{
        allResults: 0,
       }
    }

};

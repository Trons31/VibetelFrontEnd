import bcryptjs from 'bcryptjs';

interface SeedLegalrepresentativeMotel {
    name: string;
    identificationCard: string;
    root: string;
}

interface SeedMotelPartner {

    name: string;
    lastname: string;
    contactPhone: string;
    email: string;
    password: string;
}

interface AmenitiesMotel {
    name: string;
    description: string;
}

interface Bank {
    name: string;
}

interface AccountType {
    typeName: string;
}

interface SeedMotel {
    title: string;
    description: string;
    images: string[];
    slug: string;
    inService: boolean;
    isApproved: boolean;


    contactEmail: string;
    contactPhone: string;
    nit: string;

    numberOfRooms: number;
    amenities: string[];

    address: string;
    neighborhood: string;
    freeService: boolean;

    country: string;
    department: string;
    city: string;

    legalrepresentativeMotel: string;
    motelPartner: string;

}


interface SeedRooms {
    title: string;
    description: string;
    images: string[];
    price: number;
    timeLimit: number;
    promoPrice?: number;
    promoActive: boolean;
    slug: string;
    tags: string[];
    inAvailable: boolean;
    roomNumber: number;
    extraServicesActive: boolean;
    extraServices?: number;
    surcharge: number;
    amenities: TypeAmenities[];
    category: CategoryRooms;
    garage: typeGarage;
    motel: string;
}

interface SeedamenitiesRoom {
    name: string;
    description: string;
}

interface CategoryRoom {
    name: string;
    description: string;
}

type role = 'user' | 'motelPartner' | 'SuperAdmin';

interface SeedUser {
    email: string,
    password: string,
    name: string,
    lastname: string,
    role: role
}

type CategoryRooms = 'basica' | 'estandar' | 'deluxe' | 'suite' | 'presidencial';
type TypeAmenities = 'Aire acondicionado' | 'baño privado' | 'Jacuzzi' | 'Tv' | 'Minibar' | 'Espejos' | 'Mobiliario' | 'Wi-Fi gratuito';
type typeGarage = 'Garaje privado' | 'Garaje compartido' | 'Garaje para motos';


interface SeedData {
    users: SeedUser[];

    bank: Bank[];
    accountType: AccountType[]

    legalrepresentativeMotel: SeedLegalrepresentativeMotel[];
    motelPartners: SeedMotelPartner[];
    AmenitiesMotel: AmenitiesMotel[];
    motels: SeedMotel[];
    cateogrysRoom: CategoryRoom[];
    garage: string[],
    amenities: string[],
    Rooms: SeedRooms[];
    amenitiesRoom: SeedamenitiesRoom[];
}

export const initialData: SeedData = {


    users: [

        {
            email: 'david@gmail.com',
            name: 'Daniel ',
            lastname: 'Rivero',
            role: 'SuperAdmin',
            password: bcryptjs.hashSync('Daniel.28rivero@'),
        },

    ],


    bank: [
        { name: "Bancolombia" },
        { name: "Banco de Bogotá" },
        { name: "Davivienda" },
        { name: "Banco Popular" },
        { name: "Banco de Occidente" },
        { name: "BBVA Colombia" },
        { name: "Banco Agrario" },
        { name: "Banco AV Villas" },
        { name: "Scotiabank Colpatria" },
    ],

    accountType: [
        { typeName: "Cuenta de Ahorros" },
        { typeName: "Cuenta Corriente" },
    ],

    legalrepresentativeMotel: [

        {
            name: 'Jesus Alvarez',
            identificationCard: '1003262180',
            root: '987654'

        }

    ],

    motelPartners: [
        {
            name: "Juan",
            lastname: "Pérez",
            contactPhone: "123456789",
            email: "juan@example.com",
            password: bcryptjs.hashSync("123456"),
        },
        {
            name: "María",
            lastname: "Gómez",
            contactPhone: "987654321",
            email: "maria@example.com",
            password: bcryptjs.hashSync("123456"),
        },
    ],

    AmenitiesMotel: [


        {
            name: "Servicio de Restaurante-Bar",
            description: "¿Deseas ofrecer a tus huéspedes la comodidad de tener un lugar para disfrutar de una buena comida y bebida sin salir del motel? Marca esta opción si tu establecimiento cuenta con un bar o restaurante donde los huéspedes puedan relajarse y disfrutar de una experiencia gastronómica sin tener que ir lejos"
        },
        {
            name: "Servicio SexShop",
            description: "¿Quieres brindar a tus huéspedes la opción de añadir un toque de diversión y romance a su estancia? Marca esta opción si tu motel ofrece una tienda de artículos íntimos, donde los huéspedes pueden encontrar una variedad de productos que complementen su experiencia y les permitan disfrutar de momentos especiales durante su visita.",
        }

    ],

    //TODO: DEBO TERMINAR EL SEED DE LOS MOTELES
    motels: [
        {

            title: 'Carpe Diem',
            description: 'El mejor motel de Sincelejo',
            slug: 'carpeDiem',
            images: [
                'img1.jpg',
                'img2.jpg',
            ],
            inService: true,
            isApproved: false,
            numberOfRooms: 20,
            contactEmail: 'carpe.diem@gmail.com',
            contactPhone: "3041201032",
            nit: "123456",
            amenities: ['Wi-Fi gratuito', 'Aire acondicionado', 'Tv'],
            neighborhood: 'villa madi',
            freeService: true,
            address: 'Carrera 11 A 10-21',
            country: "colombia",
            department: "sucre",
            city: "sincelejo",
            legalrepresentativeMotel: "1003262180",
            motelPartner: "juan@example.com"
        }
    ],

    cateogrysRoom: [
        {
            name: 'Basica',
            description: 'La habitación básica ofrece las comodidades esenciales para una estancia breve y económica. Incluye una cama cómoda, baño privado, televisión y conexión Wi-Fi gratuita.'
        },
        {
            name: 'Estandar',
            description: 'La habitación estándar proporciona un poco más de espacio y comodidad. Además de lo que ofrece la habitación básica, cuenta con un pequeño escritorio y una nevera.'
        },
        {
            name: 'Deluxe',
            description: 'La habitación deluxe ofrece un mayor nivel de confort. Incluye una cama más grande, baño mejorado con artículos de tocador adicionales, televisor de pantalla plana y un área de descanso.'
        },
        {
            name: 'Suite',
            description: 'La suite es ideal para quienes buscan más espacio y comodidad. Incluye una sala de estar separada, minibar, cafetera y un baño con bañera de hidromasaje.'
        },
        {
            name: 'Presidencial',
            description: 'La habitación presidencial es la opción más lujosa del motel, ofreciendo el máximo confort y espacio. Incluye varias habitaciones, sala de estar amplia, comedor, jacuzzi y servicios exclusivos.'
        },

    ],

    garage: [
        'Garaje privado', 'Garaje compartido', 'Garaje para motos',
    ],

    amenitiesRoom: [
        {
            name: 'Tubo Pol dance',
            description: 'Tubo pol dance'
        },
        {
            name: 'Tv adultos',
            description: 'Tv para tus gustos.'
        },
        {
            name: 'Aire acondicionado',
            description: 'Aire acondicionado regulable para mantener la habitación a una temperatura confortable.'
        },
        {
            name: 'Mini bar',
            description: 'Pequeña nevera donde podras acceder a snacks y bebidas con un costo adicional.'
        },
        {
            name: 'Teléfono',
            description: 'Teléfono para llamadas locales y servicio a la habitación.'
        },
        {
            name: 'Jacuzzi',
            description: 'Jacuzzi privado para una experiencia elevada.'
        }

    ],


    amenities: [
        'Aire acondicionado', 'baño privado', 'Jacuzzi', 'Tv', 'Minibar', 'Espejos', 'Mobiliario', 'Wi-Fi gratuito'
    ],

    Rooms: [
        {

            title: 'Habitación Deluxe',
            description: 'Una habitación lujosa con todas las comodidades',
            images: [
                'room1.jpg',
                'room2.jpg',
                'room3.jpg',
            ],
            price: 150000,
            promoActive: true,
            promoPrice: 120000,
            slug: 'deluxe',
            tags: ['deluxe', 'lujo'],
            inAvailable: true,
            timeLimit: 2,
            roomNumber: 1,
            category: 'deluxe',
            extraServicesActive: true,
            extraServices: 5000,
            surcharge: 3000,
            amenities: ['Jacuzzi', 'Minibar', 'Espejos', 'Mobiliario'],
            garage: 'Garaje privado',
            motel: "carpeDiem"
        },
        {
            title: 'Suite Romántica',
            description: 'Una suite diseñada para parejas románticas',
            images: [
                'room4.jpg',
                'room5.jpg',
                'room6.jpg',
            ],
            price: 100000,
            promoActive: false,
            slug: 'suite-romantica',
            tags: ['romántico', 'pareja'],
            inAvailable: true,
            timeLimit: 2,
            category: 'suite',
            roomNumber: 2,
            extraServicesActive: true,
            extraServices: 5000,
            surcharge: 3000,
            amenities: ['Jacuzzi', 'Minibar', 'Espejos', 'Mobiliario', 'Aire acondicionado'],
            garage: 'Garaje privado',
            motel: "carpeDiem"
        },
        {
            title: 'Cabaña Romántica',
            description: 'Una cabaña acogedora para escapadas románticas',
            images: [
                'room7.jpg',
                'room8.jpg',
                'room4.jpg',
            ],
            price: 80000,
            promoActive: false,
            slug: 'cabana-romantica',
            tags: ['romántico', 'pareja'],
            inAvailable: true,
            timeLimit: 2,
            category: 'suite',
            roomNumber: 3,
            extraServicesActive: false,
            surcharge: 3000,
            amenities: ['Jacuzzi', 'Espejos', 'Mobiliario', 'Aire acondicionado'],
            garage: 'Garaje privado',
            motel: "carpeDiem"
        },
        {
            title: 'Suite Presidencial',
            description: 'Una suite de lujo para aquellos que buscan lo mejor',
            images: [
                'room1.jpg',
                'room4.jpg',
                'room5.jpg',
            ],
            price: 40000,
            promoActive: true,
            promoPrice: 30000,
            slug: 'suite-presidencial',
            tags: ['romántico', 'lujo'],
            inAvailable: true,
            timeLimit: 2,
            category: 'presidencial',
            roomNumber: 3,
            extraServicesActive: true,
            extraServices: 5000,
            surcharge: 3000,
            amenities: ['Jacuzzi', 'Minibar', 'Espejos', 'Mobiliario', 'Aire acondicionado'],
            garage: 'Garaje privado',
            motel: "carpeDiem"
        },
        {
            title: 'Habitación Estándar',
            description: 'Una habitación cómoda y funcional para estancias cortas',
            images: [
                'room6.jpg',
                'room5.jpg',
                'room7.jpg',
            ],
            price: 30000,
            promoActive: false,
            slug: 'estandar',
            tags: ['estándar', 'básico'],
            inAvailable: true,
            timeLimit: 2,
            roomNumber: 4,
            extraServicesActive: true,
            extraServices: 5000,
            surcharge: 3000,
            category: 'estandar',
            amenities: ['Aire acondicionado', 'Tv'],
            garage: 'Garaje compartido',
            motel: "carpeDiem"
        },

    ],
};

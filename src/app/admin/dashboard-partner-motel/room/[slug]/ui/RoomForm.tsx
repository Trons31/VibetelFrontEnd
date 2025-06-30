"use client";

import { AmenitiesByRoom, AmenitiesRoom, BedRooms, CategoryRoom, CategoryRoomApi, GarageRoom, GarageRoomApi, RoomImage as ProductWithImage, RoomApi } from "@/interfaces";
import clsx from "clsx";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import Image from 'next/image';
import { FaDotCircle, FaQuestionCircle } from "react-icons/fa";
import { ModalPopup, RoomImage } from "@/components";
import { useRouter } from "next/navigation";
import { deleteRoomImage } from "@/actions/rooms/delete-room-image";
import { formatTime } from "@/utils";
import { IoInformationOutline } from "react-icons/io5";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";
import axios from "axios";
import { amenities } from '../../../../../../interfaces/motels.interface';




interface Props {
    accessToken: string;
    room: Partial<RoomApi>;
    garage: GarageRoomApi[];
    category: CategoryRoomApi[];
    amenities: AmenitiesRoom[];
    amenitiesByRoom?: AmenitiesByRoom[]
    isNew: boolean;
    priceAddTime: number;
}

interface FormInputs {
    title: string;
    description: string;
    price: number;
    priceAddTime: number;
    timeLimit: number;
    promotionPercentage?: number | null;
    promoPrice?: number | null;
    promoActive: boolean;
    slug: string;
    tags: string[];
    inAvailable: boolean;
    roomNumber: string;
    extraServicesActive: boolean;
    extraServices?: number | null;
    surcharge: number;
    amenities: AmenitiesRoom[];
    // otherAmenities: string[]
    categoryId: string;
    garageId: string;
    motelId: string;
    images?: FileList;

}

export const RoomForm = ({ accessToken, category, garage, amenities, room, amenitiesByRoom, isNew, priceAddTime }: Props) => {

    const AmenitiesRoom = room.amenities?.map(amenitie => amenitie.amenities.id);

    const router = useRouter();

    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const [selectedAmenities, setSelectedAmenities] = useState<string[]>(AmenitiesRoom || []);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const filesArray = Array.from(event.target.files);
            const urls = filesArray.map(file => URL.createObjectURL(file));
            setImageUrls(urls);
            setSelectedFiles(filesArray);
        }
    };

    const [isModalExtraServicesOpen, setIsModalExtraServicesOpen] = useState(false);
    const [isModalSurchargeOpen, setIsModalSurchargeOpen] = useState(false);
    const [isModalCategpryOpen, setIsModalCategpryOpen] = useState(false);
    const [isModalSlugyOpen, setIsModalSlugyOpen] = useState(false);
    const [isModalAddTime, setIsModalAddTime] = useState(false);


    const [showLoadingButton, setShowLoadingButton] = useState(false);
    const [showLoadingDeleteImage, setShowLoadingDeleteImage] = useState(false);
    const [showMessageError, setShowMessageError] = useState(false);
    const [showMessageErrorServer, setshowMessageErrorServer] = useState(false);
    const [messageErrorServer, setmessageErrorServer] = useState<string | undefined>("");


    const [showPromoPrice, setShowPromoPrice] = useState(room.promoActive ?? false);
    const [showExtraServices, setShowExtraServices] = useState(room.extraServicesActive ?? false);
    const [inAviabled, setInAviabled] = useState(room.inAvaible ?? true)
    const [inputsAmenities, setInputs] = useState<string[]>([]);
    const [showMessageErrorAmenities, setShowMessageErrorAmenities] = useState(false);

    const {
        handleSubmit,
        register,
        formState: { isValid, errors },
        setValue,
        getValues,
        watch,
    } = useForm<FormInputs>({
        defaultValues: {
            ...room,
            // tags: room.tags.join(', '),
            promotionPercentage: room.promoActive ? ((room.price! - room.promoPrice!) * 100) / room.price! : 1,
            extraServicesActive: room.extraServicesActive ? room.extraServicesActive : false,
            extraServices: room.extraServicesActive ? room.extraServices : 2000,
            categoryId: room.category?.id,
            garageId: room.garage?.id,
            // otherAmenities: room.amenities,
            slug: room.slug ? room.slug.replace(/[-_]/g, ' ') : '',
            inAvailable: room.inAvaible ? true : true,
            promoActive: room.promoActive ? room.promoActive : false,
            amenities: room.amenities?.map(amenitie => amenitie.amenities),
            images: undefined
        }
    });

    watch("amenities");

    const OnSubmit = async (data: FormInputs) => {
        setShowLoadingButton(true);

        const isEmpty = inputsAmenities.some(input => input.trim() === "");
        if (isEmpty) {
            setShowMessageErrorAmenities(true);
            setShowLoadingButton(false);
            return;
        }

        if (selectedAmenities.length < 1 && inputsAmenities.length < 1) {
            setShowLoadingButton(false);
            setShowMessageError(true);
            return;
        }

        const formData = new FormData();
        const { images, ...roomToSave } = data;
        const {
            title,
            slug,
            description,
            price,
            priceAddTime,
            promoActive,
            promotionPercentage,
            tags,
            inAvailable,
            timeLimit,
            roomNumber,
            extraServicesActive,
            extraServices,
            surcharge,
            categoryId,
            garageId,
        } = roomToSave;

        const promoPrice = promoActive
            ? price - (price * promotionPercentage!) / 100
            : 0;

        formData.append('title', title);
        formData.append('slug', slug);
        formData.append('description', description);
        formData.append('price', price.toString());
        formData.append('priceAddTime', priceAddTime.toString());
        formData.append('promoActive', promoActive.toString());
        formData.append('promoPrice', promoPrice.toString());
        formData.append('promotionPercentage', promotionPercentage ? promotionPercentage.toString() : "");

        const formattedTags = typeof tags === 'string' ? [tags] : tags || [];
        formData.append('tags', JSON.stringify(formattedTags));

        formData.append('inAvailable', inAvailable.toString());
        formData.append('timeLimit', timeLimit.toString());
        formData.append('roomNumber', roomNumber.toString());
        formData.append('extraServicesActive', extraServicesActive.toString());
        formData.append('extraServices', extraServices?.toString() ?? '0');
        formData.append('surcharge', surcharge.toString());
        formData.append('categoryId', categoryId);
        formData.append('garageId', garageId);

        // Amenities como JSON
        formData.append('amenitiesRoom', JSON.stringify(selectedAmenities));

        // Imágenes
        selectedFiles.forEach((file: File) => {
            formData.append('images', file);
        });

        console.log(formData);

        try {
            const response = await axios.post<RoomApi>(
                `${process.env.NEXT_PUBLIC_API_ROUTE}room`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            const CreateRoom = response.data;

            isNew
                ? toast.success('Información guardada correctamente')
                : toast.success('Información actualizada')

            setShowLoadingButton(false);
            setShowMessageError(false);
            setShowMessageErrorAmenities(false);
            setshowMessageErrorServer(false);
            setmessageErrorServer(undefined);
            setImageUrls([""]);
            setSelectedFiles([]);
            router.replace(`/admin/dashboard-partner-motel/room/${CreateRoom?.slug}`);
        } catch (error: any) {
            console.log(error);
            isNew
                ? toast.error("No se pudo guardar la información")
                : toast.error("No se pudo actualizar la información");
            setShowLoadingButton(false);
        }
    };


    const tooglePromoActive = () => {
        if (showPromoPrice) {
            setValue("promoPrice", null);
        }
        setShowPromoPrice(prevState => {
            const newPromoActive = !prevState;
            setValue('promoActive', newPromoActive);
            return newPromoActive;
        });
    }


    const toogleExtraServisActive = () => {
        if (showExtraServices) {
            setValue("extraServices", null);
        }
        setShowExtraServices(prevState => {
            const newExtraServices = !prevState
            setValue('extraServicesActive', newExtraServices);
            return newExtraServices;
        })
    }

    const toogleInAviabled = () => {
        setInAviabled(prevState => {
            const newInAviabled = !prevState;
            setValue('inAvailable', newInAviabled);
            return newInAviabled;
        });
    }

    const onAmenitieChanged = (amenityId: string) => {
        setSelectedAmenities(prevSelected => {
            if (prevSelected.includes(amenityId)) {
                return prevSelected.filter(id => id !== amenityId);
            } else {
                return [...prevSelected, amenityId];
            }
        });
    };

    const handleInputChange = (index: number, value: string) => {
        const newInputs = [...inputsAmenities];
        newInputs[index] = value;
        setInputs(newInputs);
    };

    const handleAddInput = () => {
        setInputs([...inputsAmenities, '']);
    };

    const handleRemoveInput = (index: number) => {
        const newInputs = [...inputsAmenities];
        newInputs.splice(index, 1);
        setInputs(newInputs);
        const isEmpty = inputsAmenities.some(input => input.trim() === "");
        if (!isEmpty) {
            setShowMessageErrorAmenities(false);
        }
    };


    const OndeleteRoomImage = async (ImageId: string, imageUrl: string) => {
        setShowLoadingDeleteImage(true);
        // const { ok } = await deleteRoomImage(ImageId, imageUrl);
        // if (ok) {
        //     setShowLoadingDeleteImage(false);
        //     setValue('images', undefined)
        //     toast.success("Imagen eliminada correctamente")
        // } else {
        //     setShowLoadingDeleteImage(false);
        //     toast.error("No se pudo eliminar la imagen")

        //}

    }

    return (

        <>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />

            <form onSubmit={handleSubmit(OnSubmit)} className="grid mb-16 grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="w-full ">

                    <div className="mb-4">
                        <label className={
                            clsx(
                                "block mb-2 text-sm text-black font-semibold ",
                                {
                                    "text-red-500": errors.title
                                }
                            )
                        }>Nombre</label>
                        <input type="text" className={
                            clsx(
                                "bg-gray-300 border-2 border-gray-300 text-black text-sm rounded-lg appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 block w-full p-2.5 placeholder-black",
                                {
                                    'focus:border-red-600 border-red-500': errors.title
                                }
                            )
                        } placeholder="ej: suit romantica"
                            {...register('title', { required: true })}
                        />
                        {
                            errors.title?.type === 'required' && (
                                <span className="text-red-500 text-xs" >* El nombre es obligatorio</span>
                            )
                        }
                        <span className="text-xs text-gray-500 block">El nombre de la habitacion estará así en la app</span>
                    </div>

                    <div className="mb-4">
                        <label className={
                            clsx(
                                "block mb-2 text-sm text-black font-semibold ",
                                {
                                    "text-red-500": errors.description
                                }
                            )
                        }>Descripcion</label>
                        <textarea
                            rows={6}
                            className={
                                clsx(
                                    "bg-gray-300 border-2 border-gray-300 text-black text-sm rounded-lg appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 block w-full p-2.5 placeholder-black",
                                    {
                                        'focus:border-red-600 border-red-500': errors.description
                                    }
                                )
                            } placeholder="ej: Disfruta de una estancia cómoda en nuestra habitación estándar equipada con una cama queen size, baño privado con artículos de tocador gratuitos, televisión de pantalla plana con canales por cable, Wi-Fi gratuito, aire acondicionado..."
                            {...register('description', { required: true })}
                        />
                        {
                            errors.description?.type === 'required' && (
                                <span className="text-red-500 text-xs" >* La descripcion es obligatoria</span>
                            )
                        }
                    </div>

                    <div className="mb-4">
                        <div className="flex items-center mb-2 gap-4" >
                            <label className={
                                clsx(
                                    "block  text-sm text-black font-semibold ",
                                    {
                                        "text-red-500": errors.slug
                                    }
                                )
                            }>Slug</label>
                            <button
                                type="button"
                                onClick={() => setIsModalSlugyOpen(true)}
                            >
                                <FaQuestionCircle />
                            </button>

                            <ModalPopup
                                title="¿Cómo crear mi slug de habitación?"
                                isOpen={isModalSlugyOpen}
                                onClose={() => setIsModalSlugyOpen(false)}
                            >
                                <div>
                                    <p className="font-bold" >Estimado equipo de administración</p>
                                    <p className="py-2">Para crear el slug de una habitación, se recomienda utilizar el mismo nombre de la habitación sin caracteres especiales como ñ, tildes, comas y puntos.</p>
                                    <p>Es importante tener en cuenta que <span className="font-extrabold" >el slug es único</span> y no se puede repetir.</p>
                                    <p className="mt-2 font-bold" >¿Para qué sirve el slug?</p>
                                    <p>El slug es una URL amigable que permitirá identificar la habitación en la plataforma de manera clara y legible para los usuarios.</p>
                                </div>
                            </ModalPopup>

                        </div>
                        <input type="text" className={
                            clsx(
                                "bg-gray-300 border-2 border-gray-300 text-black text-sm rounded-lg appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 block w-full p-2.5 placeholder-black",
                                {
                                    'focus:border-red-600 border-red-500': errors.slug
                                }
                            )
                        } placeholder="ej: suit romantica"
                            {...register('slug', { required: true, pattern: /^[a-zA-Z0-9\s]*$/ })}
                        />
                        {
                            errors.title?.type === 'required' && (
                                <span className="text-red-500 text-xs" >* El slug es obligatorio</span>
                            )
                        }
                        {
                            errors.slug?.type === 'pattern' && (
                                <span className="text-red-500 text-xs block" >* Evita usar caracteres especiales como la ñ, tildes, puntos y comas</span>
                            )
                        }
                        <span className="text-xs text-gray-500 block">El slug facilitará la creación de una URL amigable para identificar la habitación. Si tienes dudas, puedes encontrar más información sobre cómo crear tu slug.</span>


                    </div>

                    <div className="mb-4">
                        <label className={
                            clsx(
                                "block mb-2 text-sm text-black font-semibold ",
                                {
                                    "text-red-500": errors.price
                                }
                            )
                        }>Precio</label>
                        <input
                            type="text"

                            className={
                                clsx(
                                    "bg-gray-300 border-2 border-gray-300 text-black text-sm rounded-lg appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 block w-full p-2.5 placeholder-black",
                                    {
                                        'focus:border-red-600 border-red-500': errors.price
                                    }
                                )
                            }
                            placeholder="ej: 45000"
                            {...register('price', { required: true, min: 1, pattern: /^[0-9]*$/ })}
                        />
                        {
                            errors.price?.type === 'required' && (
                                <span className="text-red-500 text-xs" >* El precio es obligatorio</span>
                            )
                        }
                        {
                            errors.price?.type === 'min' && (
                                <span className="text-red-500 text-xs" >* El precio no puede ser cero ni menor a cero</span>
                            )
                        }
                        {
                            errors.price?.type === 'pattern' && (
                                <span className="text-red-500 text-xs" >* Por favor, no incluya letras, puntos, simbolos, comas en el precio</span>
                            )
                        }
                        <span className="text-xs text-gray-500 block">Por favor, no incluya puntos ni comas en el precio</span>
                    </div>

                    <div className="mb-4">
                        <div className="py-2 flex items-center justify-between">
                            {
                                showPromoPrice
                                    ? (
                                        <label className="block text-sm text-blue font-semibold">Promoción activada</label>
                                    )
                                    : (
                                        <label className="block text-sm text-blue font-semibold">Promoción desactivada</label>
                                    )
                            }
                            <label className="inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    onChange={tooglePromoActive}
                                    checked={showPromoPrice} // Aquí estableces si el interruptor está activado o no
                                    className="sr-only peer"
                                />
                                <div className="relative w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                            </label>
                        </div>
                        <span className="text-xs text-gray-500 block">Si desea activar la promoción de la habitación, puede hacerlo usando el interruptor.</span>
                    </div>


                    {
                        showPromoPrice &&
                        (
                            <div className="mb-4">
                                <label className={
                                    clsx(
                                        "block mb-2 text-sm text-black font-semibold ",
                                        {
                                            "text-red-500": errors.promotionPercentage
                                        }
                                    )
                                }>Ingrese el porcentaje de promoción</label>
                                <div className="flex">
                                    <div className="relative w-full">
                                        <input type="text" className={
                                            clsx(
                                                "bg-gray-300 border-2 border-gray-300 text-black text-sm rounded-lg appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 block w-full p-2.5 placeholder-black",
                                                {
                                                    'focus:border-red-600 border-red-500': errors.promotionPercentage
                                                }
                                            )
                                        }
                                            {...register('promotionPercentage', { required: false, min: 1, max: 100, pattern: /^[0-9]*$/ })}
                                            placeholder="ej: 20" required />
                                        <div className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 focus:ring-4 focus:outline-none focus:ring-blue">
                                            %
                                        </div>
                                    </div>
                                </div>
                                <span className="text-xs text-gray-500 block">
                                    Ingrese el porcentaje de descuento. Este se aplicará al precio establecido para mostrar el nuevo precio con descuento.
                                </span>

                                {
                                    errors.promotionPercentage?.type === 'min' && (
                                        <span className="text-red-500 text-xs" >* El porcentaje no puede ser cero ni menor a cero</span>
                                    )
                                }
                                {
                                    errors.promotionPercentage?.type === 'max' && (
                                        <span className="text-red-500 text-xs" >* El porcentaje no puede superar el 100 %</span>
                                    )
                                }
                                {
                                    errors.promotionPercentage?.type === 'pattern' && (
                                        <span className="text-red-500 text-xs block mb-2" >* Por favor, no incluya letras, puntos, simbolos, comas en el porcentaje</span>
                                    )
                                }
                            </div>
                        )
                    }

                    <div className="mb-4">
                        <div className="flex items-center mb-2 gap-4" >
                            <label className={
                                clsx(
                                    "block  text-sm text-black font-semibold ",
                                    {
                                        "text-red-500": errors.priceAddTime
                                    }
                                )
                            }>Precio por adicion de tiempo</label>
                            <button
                                type="button"
                                onClick={() => setIsModalAddTime(true)}
                            >
                                <FaQuestionCircle />
                            </button>

                            <ModalPopup
                                title="¿Qué es el precio por adición de tiempo?"
                                isOpen={isModalAddTime}
                                onClose={() => setIsModalAddTime(false)}
                            >
                                <div>
                                    <p className="font-bold">Estimado equipo de administración </p>
                                    <p className="py-2">
                                        El <span className="font-extrabold">precio por adición de tiempo</span> es el monto que el motel establecio para cobrar a los usuarios por cualquier tiempo adicional que deseen agregar a una reserva ya hecha.
                                    </p>
                                    <p>
                                        Este precio se fijará por cada <strong>{formatTime(priceAddTime)}</strong> adicional establecido por el motel <Link href="/admin/dashboard-partner-motel/additional-settings" className="underline text-blue-600" target="_blank" rel="noopener noreferrer" >configuracion adicional </Link> que el usuario desee agregar. Es decir, el monto especificado corresponderá únicamente a <strong>{formatTime(priceAddTime)}</strong>  de tiempo adicional.
                                    </p>
                                    <p className="mt-2 font-bold">¿Cómo se calcula?</p>
                                    <p>
                                        Cada vez que un usuario solicite extender su tiempo de reserva, se aplicará el precio establecido para cada segmento de <strong>{formatTime(priceAddTime)}</strong> adicional.
                                    </p>
                                    <p className="mt-2 font-bold">Ejemplo:</p>
                                    <p>
                                        Si el precio por cada <strong>{formatTime(priceAddTime)}</strong> adicional es de $10, y un usuario desea agregar un tiempo N extra, el costo total será de (N x $10).
                                    </p>
                                    <p className="mt-2 font-bold">Importancia de un precio razonable</p>
                                    <p>
                                        Es importante que el precio sea razonable para atraer a más usuarios. Un precio accesible incentivará a los clientes a prolongar su estancia, lo que puede resultar en mayores ingresos para el motel.
                                    </p>
                                </div>
                            </ModalPopup>


                        </div>
                        <div className="flex">
                            <div className="relative w-full">
                                <input type="text" className={
                                    clsx(
                                        "bg-gray-300 border-2 border-gray-300 text-black text-sm rounded-lg appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 block w-full p-2.5 placeholder-black",
                                        {
                                            'focus:border-red-600 border-red-500': errors.priceAddTime
                                        }
                                    )
                                }
                                    {...register('priceAddTime', { required: true, min: 1, pattern: /^[0-9]*$/ })}
                                />
                                <div
                                    className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 ">
                                    por {formatTime(priceAddTime)}
                                </div>
                            </div>
                        </div>
                        {
                            errors.priceAddTime?.type === 'required' && (
                                <span className="text-red-500 text-xs" >* El precio por adicion de tiempo es obligatorio</span>
                            )
                        }
                        {
                            errors.priceAddTime?.type === 'min' && (
                                <span className="text-red-500 text-xs" >* El precio por adicion de tiempo no puede ser cero ni menor a cero</span>
                            )
                        }
                        {
                            errors.priceAddTime?.type === 'pattern' && (
                                <span className="text-red-500 text-xs" >* Por favor, no incluya letras, puntos, simbolos, comas en el precio por adicion de tiempo</span>
                            )
                        }
                        <span className="text-xs text-gray-500 block">Por favor, no incluya puntos ni comas en el precio por adicion de tiempo</span>
                    </div>


                    <div className="mb-4">
                        <label className={
                            clsx(
                                "block mb-2 text-sm text-black font-semibold ",
                                {
                                    "text-red-500": errors.tags
                                }
                            )
                        }>Tags</label>
                        <input
                            type="text"
                            className={
                                clsx(
                                    "bg-gray-300 border-2 border-gray-300 text-black text-sm rounded-lg appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 block w-full p-2.5 placeholder-black",
                                    {
                                        'focus:border-red-600 border-red-500': errors.tags
                                    }
                                )
                            }
                            {...register('tags', { required: true })}
                            placeholder="ej: deluxe, jacuzzy, wifi"
                        />
                        {
                            errors.tags?.type === 'required' && (
                                <span className="text-red-500 text-xs" >* El tiempo de uso de la habitación es obligatorio</span>
                            )
                        }
                        <span className="text-xs text-gray-500 block">
                            Ingrese las palabras clave que describan esta habitación para facilitar su búsqueda en la aplicación. Separe cada tag con una coma.
                        </span>
                    </div>



                    <div className="mb-4">
                        <div className="py-2 flex items-center justify-between">
                            {
                                inAviabled
                                    ? (
                                        <label className="block text-sm text-blue font-semibold">Disponible</label>
                                    )
                                    : (
                                        <label className="block text-sm text-blue font-semibold">No Disponible</label>
                                    )
                            }
                            <label className="inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    onChange={toogleInAviabled}
                                    checked={inAviabled}
                                    className="sr-only peer"
                                />
                                <div className="relative w-11 h-6 bg-red-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-500 peer:not(:checked):bg-red-600"></div>
                            </label>
                        </div>
                        <span className="text-xs text-gray-500 block">Por defecto, la habitación está disponible y el interruptor está activado.</span>
                    </div>




                    <div className="mb-4">
                        <label className={
                            clsx(
                                "block mb-2 text-sm text-black font-semibold ",
                                {
                                    "text-red-500": errors.timeLimit
                                }
                            )
                        }>Ingrese la Duración del Servicio</label>
                        <div className="flex">
                            <div className="relative w-full">
                                <input type="text" className={
                                    clsx(
                                        "bg-gray-300 border-2 border-gray-300 text-black text-sm rounded-lg appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 block w-full p-2.5 placeholder-black",
                                        {
                                            'focus:border-red-600 border-red-500': errors.timeLimit
                                        }
                                    )
                                }
                                    {...register('timeLimit', { required: true, min: 1, max: 12, pattern: /^[0-9]*$/ })}
                                    placeholder="ej: 3" />
                                <div className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 focus:ring-4 focus:outline-none focus:ring-blue">
                                    Horas
                                </div>
                            </div>
                        </div>
                        {
                            errors.timeLimit?.type === 'required' && (
                                <span className="text-red-500 text-xs" >* El tiempo de uso de la habitación es obligatorio</span>
                            )
                        }
                        {
                            errors.timeLimit?.type === 'min' && (
                                <span className="text-red-500 text-xs" >* El tiempo de uso de la habitación no puede ser cero ni menor a cero</span>
                            )
                        }
                        {
                            errors.timeLimit?.type === 'min' && (
                                <span className="text-red-500 text-xs" >* El tiempo de uso de la habitación no puede ser mayor a 12 horas</span>
                            )
                        }
                        {
                            errors.timeLimit?.type === 'pattern' && (
                                <span className="text-red-500 text-xs" >* Por favor, no incluya letras, puntos, simbolos, comas en las horas</span>
                            )
                        }
                        <span className="text-xs text-gray-500 block">Por favor, asegúrese de ingresar el tiempo de uso de la habitación en relación con su precio en horas</span>
                    </div>

                    <div className="mb-4">
                        <label className={
                            clsx(
                                "block mb-2 text-sm text-black font-semibold ",
                                {
                                    "text-red-500": errors.roomNumber
                                }
                            )
                        }>Numero de habitacion</label>
                        <input
                            type="text"

                            className={
                                clsx(
                                    "bg-gray-300 border-2 border-gray-300 text-black text-sm rounded-lg appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 block w-full p-2.5 placeholder-black",
                                    {
                                        'focus:border-red-600 border-red-500': errors.roomNumber
                                    }
                                )
                            }
                            placeholder="ej: 1"
                            {...register('roomNumber', { required: true })}
                        />
                        {
                            errors.roomNumber?.type === 'required' && (
                                <span className="text-red-500 text-xs" >* El numero de la habitación es obligatorio</span>
                            )
                        }
                        <span className="text-xs text-gray-500 block">
                            Por favor, asegúrese de ingresar un identificador único para la habitación. Puede ser un número o una nomenclatura, pero no debe repetirse.
                        </span>
                    </div>

                    <div className="mb-4">
                        <div className="py-2 flex items-center justify-between">
                            {
                                showExtraServices
                                    ? (
                                        <label className="block text-sm text-blue font-semibold">Servicios adicionales activados</label>
                                    )
                                    : (
                                        <label className="block text-sm text-blue font-semibold">Servicios adicionales desactivados</label>
                                    )
                            }
                            <label className="inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    onChange={toogleExtraServisActive}
                                    checked={showExtraServices} // Aquí estableces si el interruptor está activado o no
                                    className="sr-only peer"
                                />
                                <div className="relative w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-orange-500"></div>
                            </label>
                        </div>
                        <span className="text-xs text-gray-500 block"></span>
                    </div>


                    {
                        showExtraServices && (

                            <div className="mb-4">
                                <div className="flex mb-2 gap-3 items-start" >
                                    <label className={
                                        clsx(
                                            "block  text-sm text-black font-semibold ",
                                            {
                                                "text-red-500": errors.extraServices
                                            }
                                        )
                                    }>Servicios adicionales</label>

                                    <button
                                        type="button"
                                        onClick={() => setIsModalExtraServicesOpen(true)}
                                    >
                                        <FaQuestionCircle />
                                    </button>

                                    <ModalPopup
                                        title="¿Que son los servicios adicionales ?"
                                        isOpen={isModalExtraServicesOpen}
                                        onClose={() => setIsModalExtraServicesOpen(false)}
                                    >
                                        <div>
                                            <p className="font-bold" >Estimado equipo de administración</p>
                                            <p className="mt-2">Los servicios adicionales ofrecen atención de calidad garantizada al cliente y asistencia en el uso del servicio para cualquier necesidad que puedan tener tus usuarios. Al activar esta opción, aseguras que tus clientes reciban un trato excepcional y un apoyo constante durante su servicio.</p>
                                        </div>
                                    </ModalPopup>
                                </div>
                                <input
                                    type="text"

                                    className={
                                        clsx(
                                            "bg-gray-300 border-2 border-gray-300 text-black text-sm rounded-lg appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 block w-full p-2.5 placeholder-black",
                                            {
                                                'focus:border-red-600 border-red-500': errors.extraServices
                                            }
                                        )
                                    }
                                    {...register('extraServices', { required: false, min: 2000, pattern: /^[0-9]*$/ })}
                                    placeholder="ej: 2000"

                                />
                                {
                                    errors.extraServices?.type === 'pattern' && (
                                        <span className="text-red-500 text-xs block mb-2" >* Por favor, no incluya letras, puntos, simbolos, comas en el valor de los servicios extras</span>
                                    )
                                }
                                {
                                    errors.extraServices?.type === 'min' && (
                                        <span className="text-red-500 text-xs" >* El valor de los servicios extras no puede ser cero ni menor a cero</span>
                                    )
                                }

                                <span className="text-xs text-gray-500 block">Por favor, ingrese el valor de los servicios adicionales no incluya puntos ni comas, que corresponde al precio de los servicios extras que se cobrarán junto con la habitación.</span>

                            </div>
                        )
                    }

                    <div className="mb-4">
                        <div className="flex mb-2 gap-3 items-start" >
                            <label className={
                                clsx(
                                    "block  text-sm text-black font-semibold ",
                                    {
                                        "text-red-500": errors.surcharge
                                    }
                                )
                            }>Costo adicional por exceder el tiempo límite</label>

                            <button
                                type="button"
                                onClick={() => setIsModalSurchargeOpen(true)}
                            >
                                <FaQuestionCircle />
                            </button>

                            <ModalPopup
                                title="Costo Adicional por Exceder el Tiempo Límite de Uso de la Habitación"
                                isOpen={isModalSurchargeOpen}
                                onClose={() => setIsModalSurchargeOpen(false)}
                            >
                                <div>
                                    <p className="font-bold" >Estimado equipo de administración </p>
                                    <p className="mt-2">El costo adicional se refiere al cargo extra que se aplica cuando un huésped excede el tiempo límite de uso de la habitación. Este valor es definido por el administrador y se cobra por cada diez minutos adicionales después del tiempo límite establecido.</p>
                                    <p className="mt-2 font-bold" >Recomendaciones</p>
                                    <ul className="ps-5 mt-2 space-y-1 list-disc list-inside">
                                        <li>El costo adicional no debe ser una cantidad elevada para mantener la accesibilidad y la satisfacción del huésped.</li>
                                        <li>Se recomienda establecer un costo adicional de 5,000 pesos por cada diez minutos excedidos.</li>
                                    </ul>
                                    <p className="mt-2" >
                                        Los administradores pueden ajustar este valor según sus necesidades, pero es importante mantenerlo razonable para evitar inconvenientes con los huéspedes.
                                    </p>
                                </div>
                            </ModalPopup>
                        </div>
                        <input
                            type="number"
                            className={
                                clsx(
                                    "bg-gray-300 border-2 border-gray-300 text-black text-sm rounded-lg appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 block w-full p-2.5 placeholder-black",
                                    {
                                        'focus:border-red-600 border-red-500': errors.surcharge
                                    }
                                )
                            }
                            placeholder="ej: 2000"
                            {...register('surcharge', { required: true, min: 1, pattern: /^[0-9]+$/ })}
                        />
                        {
                            errors.surcharge?.type === 'required' && (
                                <span className="text-red-500 text-xs" >* Por favor, ingrese el costo adicional</span>
                            )
                        }
                        {
                            errors.surcharge?.type === 'min' && (
                                <span className="text-red-500 text-xs" >* El valor del costo adicional no puede ser cero ni menor a cero</span>

                            )
                        }
                        {
                            errors.surcharge?.type === 'pattern' && (
                                <span className="text-red-500 text-xs block mb-2" >* Por favor, no incluya letras, puntos, simbolos, comas en el valor del costo adicional</span>
                            )
                        }
                        <span className="text-xs text-gray-500 block">Ingrese el costo adicional que se cobrará por cada 10 minutos que se exceda el tiempo límite de uso de la habitación.</span>
                    </div>

                    <button
                        type='submit'
                        disabled={showLoadingButton || showLoadingDeleteImage}
                        className={
                            clsx(

                                {
                                    "hidden md:flex items-center gap-x-4 w-full justify-center rounded-lg bg-blue-600 hover:bg-blue-700 px-7 py-2 font-medium text-white transition-all duration-200": !showLoadingButton,
                                    "hidden md:flex items-center gap-x-4 w-full rounded-lg bg-blue-600 px-7 py-2 font-medium text-white justify-center cursor-not-allowed ": showLoadingButton || showLoadingDeleteImage
                                }
                            )
                        }>
                        {
                            showLoadingButton &&
                            (<svg className="h-5 w-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" ></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>)
                        }

                        {
                            showLoadingButton
                                ? (
                                    <span>Cargando...</span>
                                ) : (
                                    <span>
                                        {isNew
                                            ? (
                                                <>
                                                    Guardar
                                                </>
                                            )
                                            : (
                                                <>
                                                    Actualizar
                                                </>
                                            )}
                                    </span>
                                )
                        }

                    </button>


                    {
                        showMessageError &&
                        (
                            <>
                                <div className="mt-4 hidden md:flex justify-center items-center gap-2 w-full mb-2 select-none rounded-t-lg border-t-4 border-red-400 bg-red-100 py-3 px-2 font-medium ">
                                    <IoInformationOutline size={30} className="text-red-600" />
                                    Por favor, seleccione al menos una comodidad o ingrese una manualmente.
                                </div>
                            </>
                        )
                    }

                    {
                        showMessageErrorServer &&
                        (
                            <>
                                <div className="mt-4 hidden md:flex justify-center items-center gap-2 w-full mb-2 select-none rounded-t-lg border-t-4 border-red-400 bg-red-100 py-3 px-2 font-medium ">
                                    <IoInformationOutline size={30} className="text-red-600" />
                                    {messageErrorServer}
                                </div>
                            </>
                        )
                    }

                </div>



                {/* Section Rigth */}
                <div className="w-full -mt-4 md:mt-0">
                    {/* As checkboxes */}
                    <div className="flex flex-col mb-4 md:mb-6">
                        <div className="flex flex-col mb-2">
                            <div className="flex mb-2 items-center gap-3" >
                                <label className={
                                    clsx(
                                        "block  text-sm text-black font-semibold ",
                                        {
                                            "text-red-500": errors.categoryId
                                        }
                                    )
                                }>Categoría</label>
                                <button
                                    type="button"
                                    onClick={() => setIsModalCategpryOpen(true)}
                                >
                                    <FaQuestionCircle />
                                </button>

                                <ModalPopup
                                    title="Categorias"
                                    isOpen={isModalCategpryOpen}
                                    onClose={() => setIsModalCategpryOpen(false)}
                                >
                                    <div>

                                        {
                                            category.map(categoryMap => (
                                                <div key={categoryMap.id} className="py-2" >

                                                    <p className="font-bold text-xl capitalize" > {categoryMap.name} </p>
                                                    <p>{categoryMap.description} </p>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </ModalPopup>
                            </div>
                            <select className={
                                clsx(
                                    "bg-gray-50 border-gray-300 text-black text-sm rounded-lg appearance-none focus:outline-none focus:ring-0 border-2 focus:border-blue-600 block w-full p-2.5 placeholder-black",
                                    {
                                        'focus:border-red-600 border-red-500': errors.categoryId
                                    }
                                )
                            }
                                {...register('categoryId', { required: true })}
                            >
                                <option value="">[Seleccione]</option>
                                {
                                    category.map(categoryMap => (
                                        <option key={categoryMap.id} value={categoryMap.id}> {categoryMap.name} </option>
                                    ))
                                }
                            </select>
                            {
                                errors.categoryId?.type === 'required' && (
                                    <span className="text-red-500 text-xs">* Seleccione una categoría</span>
                                )
                            }
                            <span className="text-xs text-gray-500 block">
                                Por favor, asigne una categoría de acuerdo a la información seleccionada. Si tiene alguna duda, consulte la información de cada categoría.
                            </span>
                        </div>

                    </div>


                    <div className="flex flex-col mb-4">
                        <div className="flex flex-col">
                            <label className={
                                clsx(
                                    "block mb-2 text-sm text-black font-semibold ",
                                    {
                                        "text-red-500": errors.garageId
                                    }
                                )
                            }>Garaje</label>
                            <select className={
                                clsx(
                                    "bg-gray-50  border-gray-300 text-black text-sm rounded-lg appearance-none focus:outline-none focus:ring-0 border-2 focus:border-blue-600 block w-full p-2.5 placeholder-black",
                                    {
                                        'focus:border-red-600 border-red-500': errors.garageId
                                    }
                                )
                            }
                                {...register('garageId', { required: true })}
                            >
                                <option value="">[Seleccione]</option>
                                {
                                    garage.map(garageMap => (
                                        <option key={garageMap.id} value={garageMap.id}> {garageMap.title} </option>
                                    ))
                                }
                            </select>
                            {
                                errors.garageId?.type === 'required' && (
                                    <span className="text-red-500 text-xs">* Seleccione un garaje</span>
                                )
                            }
                            <span className="text-xs text-gray-500 block">
                                Por favor, seleccione el tipo de garaje que tiene la habitación.
                            </span>
                        </div>

                    </div>


                    <div className="flex flex-col mb-4">
                        <label className="block  text-sm text-black font-semibold ">Comodidades</label>
                        <span className="text-xs mb-2 text-gray-500 block">Por favor, seleccione al menos una comodidad que ofrece su habitación.</span>

                        <div className="flex flex-wrap mb-1 md:mb-4">
                            <ul className="grid w-full gap-3 md:grid-cols-2">
                                {amenities.map((amenityRoom) => (
                                    <li key={amenityRoom.id}>
                                        <label
                                            onClick={() => onAmenitieChanged(amenityRoom.id)}
                                            className={clsx(
                                                "inline-flex items-center justify-between w-full h-14  p-3 text-gray-800 border-2 rounded-lg cursor-pointer",
                                                {
                                                    "border-blue-800": selectedAmenities.includes(amenityRoom.id)
                                                }
                                            )}
                                        >
                                            <div className="flex items-center justify-between w-full">
                                                <div className={
                                                    clsx(
                                                        " w-full text-xs font-bold",
                                                        {
                                                            "text-blue-700": selectedAmenities.includes(amenityRoom.id)
                                                        }
                                                    )
                                                }>{amenityRoom.name}
                                                </div>
                                                <FaDotCircle
                                                    className={
                                                        clsx(
                                                            {
                                                                "text-blue-700": selectedAmenities.includes(amenityRoom.id)
                                                            }
                                                        )
                                                    }
                                                />
                                            </div>
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </div>

                    <div className="grid grid-cols mb-5">

                        <label className="block  text-sm text-black font-semibold ">Otras comodidades</label>
                        <span className="text-xs mb-2 text-gray-500 block"> Si no encuentras una comodidad específica en la lista, ¡siéntete libre de agregarla tú mismo!</span>

                        {inputsAmenities.map((input, index) => (
                            <div key={index} className="flex gap-2 items-center space-x-2 mb-2">
                                <textarea
                                    value={input}
                                    onChange={(e) => handleInputChange(index, e.target.value)}
                                    className="border text-sm rounded-md px-2 py-1 w-full border-gray-300 bg-gray-100"
                                    placeholder="ej: Nombre de la comodidad"
                                    rows={2}
                                />
                                <button
                                    type="button"
                                    onClick={() => handleRemoveInput(index)}
                                    className="bg-red-500  text-white px-2 py-1 rounded-md"
                                >
                                    Eliminar
                                </button>
                            </div>
                        ))}
                        {
                            showMessageErrorAmenities &&
                            (
                                <span className="text-red-500 py-2 text-xs">* Existe un campo/s vacio.</span>
                            )
                        }
                        <button
                            type="button"
                            onClick={handleAddInput}
                            className="bg-blue-600 text-sm md:text-lg w-fit text-white px-2 py-1 rounded-md"
                        >
                            Agregar comodida
                        </button>
                    </div>

                    <div className="flex flex-col mb-4">
                        <label className="block mb-2 text-sm text-black font-semibold ">Habitacion</label>
                        <label htmlFor="fileInput" className={
                            clsx(
                                " bg-gray-300 inline-block text-sm md:text-lg py-2 px-4 rounded-lg cursor-pointer", {
                                "border-red-500": errors.images
                            }
                            )
                        }>
                            Cargar imagen de la habitacion
                            <input
                                id="fileInput"
                                {...register('images')}
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                        </label>

                        <span className="text-xs text-gray-500 block">Se recomienda cargar tres imágenes de alta calidad de la habitación, destacando sus mejores características.</span>

                        <div className="grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 mt-4 gap-2">
                            {

                                selectedFiles.length > 0 &&
                                (
                                    imageUrls.map((url, index) => (
                                        <Image key={index} src={url} width={100} height={100} alt={`Imagen ${index + 1}`} className="w-44 h-44 object-cover rounded-md" />
                                    ))
                                )

                            }
                        </div>
                    </div>


                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3" >
                        {
                            room.images?.map(image => (
                                <div key={image.id} >
                                    <RoomImage
                                        src={image.url}
                                        width={300}
                                        height={100}
                                        alt={room?.title ?? ''}
                                        className="rounded-t  h-36 object-cover "
                                    />

                                    <button
                                        type='submit'
                                        disabled={showLoadingDeleteImage || showLoadingButton}
                                        onClick={() => OndeleteRoomImage(image.id, image.url)}
                                        className={
                                            clsx(

                                                {
                                                    "flex items-center gap-x-4 mb-2 w-full justify-center bg-red-600 px-3 py-2 hover:bg-red-700 text-md font-bold text-white rounded-b-xl": !showLoadingDeleteImage,
                                                    "flex items-center gap-x-4 mb-2 w-full justify-center  bg-red-600 px-3 py-2 text-md font-bold text-white cursor-not-allowed rounded-b-xl": showLoadingDeleteImage || showLoadingButton
                                                }
                                            )
                                        }>
                                        {
                                            showLoadingDeleteImage &&
                                            (<svg className="h-5 w-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" ></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>)
                                        }

                                        {
                                            showLoadingDeleteImage
                                                ? (
                                                    <span>Cargando...</span>
                                                ) : (
                                                    <span>Eliminar</span>
                                                )
                                        }

                                    </button>
                                </div>
                            ))
                        }
                    </div>
                    <button
                        disabled={showLoadingButton || showLoadingDeleteImage}
                        type="submit"
                        className={
                            clsx(

                                {
                                    "flex md:hidden items-center gap-x-4 w-full justify-center rounded-lg bg-blue-600 hover:bg-blue-700 px-7 py-2 font-medium text-white transition-all duration-200": !showLoadingButton,
                                    "flex md:hidden items-center gap-x-4 w-full rounded-lg bg-blue-600 px-7 py-2 font-medium text-white justify-center cursor-not-allowed ": showLoadingButton || showLoadingDeleteImage
                                }
                            )
                        }
                    >
                        {
                            showLoadingButton &&
                            (<svg className="h-5 w-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" ></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>)
                        }

                        {
                            showLoadingButton
                                ? (
                                    <span>Cargando...</span>
                                ) : (
                                    <span>
                                        {isNew
                                            ? (
                                                <>
                                                    Guardar
                                                </>
                                            )
                                            : (
                                                <>
                                                    Actualizar
                                                </>
                                            )}
                                    </span>
                                )
                        }
                    </button>

                </div>
            </form>
        </>

    );
};
import { Metadata, ResolvingMetadata } from "next";
import { notFound, redirect } from "next/navigation";
import { FilterRooms } from "./ui/FilterRooms";
import axios from "axios";
import { AmenitiesRoomApi, CategoryRoomApi, GarageRoomApi, MotelBySlugApi } from "@/interfaces";

interface Props {
  params: {
    slug: string;
  },

}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = params.slug

  // fetch data
  let motel: MotelBySlugApi;

  try {
    const response = await axios.get<MotelBySlugApi>(`${process.env.NEXT_PUBLIC_API_ROUTE}motel/${slug}`);
    motel = response.data;
  } catch (error: any) {
    notFound();
  }

  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || []

  return {
    metadataBase: new URL(`${process.env.NEXT_PUBLIC_METADATABASE}`),
    title: motel.razonSocial ?? "Motel no encontrado",
    description: motel.description ?? "",
    openGraph: {
      title: motel.razonSocial ?? "Motel no encontrado",
      description: motel.description ?? "",
      // images: ['/some-specific-page-image.jpg', ...previousImages],
    },
  }
}


export default async function MotelBySlugPage({ params }: Props) {

  const { slug } = params;

  let motel: MotelBySlugApi;

  try {
    const response = await axios.get<MotelBySlugApi>(`${process.env.NEXT_PUBLIC_API_ROUTE}motel/${slug}`);
    motel = response.data;
  } catch (error: any) {
    notFound();
  }

  let category: CategoryRoomApi[];
  try {
    const response = await axios.get<CategoryRoomApi[]>(`${process.env.NEXT_PUBLIC_API_ROUTE}room/category`);
    category = response.data;
  } catch (error: any) {
    throw new Error(`Ups! Error al obtener las categorias de las habitaciones`);
  }

  let garage: GarageRoomApi[];
  try {
    const response = await axios.get<GarageRoomApi[]>(`${process.env.NEXT_PUBLIC_API_ROUTE}room/garage`);
    garage = response.data;
  } catch (error: any) {
    throw new Error(`Ups! Error al obtener los garajes de las habitaciones`);
  }

  let amenities: AmenitiesRoomApi[];
  try {
    const response = await axios.get<AmenitiesRoomApi[]>(`${process.env.NEXT_PUBLIC_API_ROUTE}room/amenities`);
    amenities = response.data;
  } catch (error: any) {
    throw new Error(`Ups! Error al obtener las comodidades de las habitaciones`);
  }

  return (
    <>
      <FilterRooms
        categoryRoom={category}
        motel={motel!}
        garageRoom={garage}
        amenitiesRoom={amenities}
        motelConfig={motel!.motelConfig!}
        slugMotel={motel!.slug}
      />
    </>
  );
}
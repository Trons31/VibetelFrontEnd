import { notFound } from "next/navigation";
import { SideInfo } from "./ui/SideInfo";
import { InfoMotel } from "./ui/InfoMotel";
import { TopMenuMotel } from "@/components";
import { ResolvingMetadata, Metadata } from "next";
import { MotelBySlugApi } from "@/interfaces";
import axios from "axios";

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



  return {
    metadataBase: new URL(`${process.env.NEXT_PUBLIC_METADATABASE}`),
    title: motel?.razonSocial ?? "Motel no encontrado",
    description: motel?.description ?? "",
    openGraph: {
      title: motel?.razonSocial ?? "Motel no encontrado",
      description: motel?.description ?? "",
      images: [`${motel?.images[0]}`],
    },
  }
}

export default async function MotelInfoPage({ params }: Props) {

  const { slug } = params;
  let motel: MotelBySlugApi;

  try {
    const response = await axios.get<MotelBySlugApi>(`${process.env.NEXT_PUBLIC_API_ROUTE}motel/${slug}`);
    motel = response.data;
  } catch (error: any) {
    notFound();
  }

  return (
    <>
      <TopMenuMotel />
      <div className="w-full">
        <div className="mt-24 px-2 flex flex-col md:grid lg:px-28 2xl:px-64 sm:grid-cols-10 md:space-x-10 lg:space-x-20 mb-10 ">
          <SideInfo motel={motel} />
          <InfoMotel motel={motel} />
        </div>
      </div>
    </>
  );
}
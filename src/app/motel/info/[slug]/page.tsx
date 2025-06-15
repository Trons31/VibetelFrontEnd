import { notFound } from "next/navigation";
import { getMotelInfoBySlug } from "@/actions";
import { SideInfo } from "./ui/SideInfo";
import { InfoMotel } from "./ui/InfoMotel";
import { TopMenuMotel } from "@/components";
import { ResolvingMetadata, Metadata } from "next";

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
  const motel = await getMotelInfoBySlug(slug);


  return {
    title: motel?.title ?? "Motel no encontrado",
    description: motel?.description ?? "",
    openGraph: {
      title: motel?.title ?? "Motel no encontrado",
      description: motel?.description ?? "",
      images: [`${motel?.images[0]}`],
    },
  }
}

export default async function MotelInfoPage({ params }: Props) {

  const { slug } = params;
  const motel = await getMotelInfoBySlug(slug);

  if (!motel) {
    notFound();
  }

  return (
    <>
      <TopMenuMotel />
      <div className="w-full">
        <div className="mt-24 px-2 flex flex-col md:grid md:px-28 2xl:px-64 sm:grid-cols-10 md:space-x-20 mb-10 ">
          <SideInfo motel={motel} />
          <InfoMotel motel={motel} />
        </div>
      </div>
    </>
  );
}
"use client";
import { useEffect, useState } from "react";
import { SkeletonRooms, SwiperBedrooms } from "@/components";
import { SwiperMobileBedrooms } from "../../bedrooms/swiper/SwiperMobileBedrooms";
import { getBedroomByMotel } from "@/actions/rooms/get-bedroom-by-motel";
import { BedRooms } from "@/interfaces";

interface Props {
  motel: string;
}

export const ItemMotel = ({ motel }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [rooms, setRooms] = useState<BedRooms[]>([]);

  useEffect(() => {
    const fetchBedrooms = async () => {
      try {
        const data = await getBedroomByMotel({ motel });
        setRooms(data?.rooms || []);
      } catch (error) {
        console.error("Error fetching bedrooms:", error);
      }
      setIsLoading(false);
    };
    fetchBedrooms();
  }, [motel]);

  return (
    <>
      {isLoading ? (
        <>
          <div className="hidden md:grid grid-cols-4 gap-10 p-2 mb-10">
            <SkeletonRooms />
            <SkeletonRooms />
            <SkeletonRooms />
            <SkeletonRooms />
          </div>


          <div className="grid md:hidden grid-cols-2 p-2 gap-2 mb-10">
            <SkeletonRooms />
            <SkeletonRooms />
          </div>
        </>
      ) : (
        <>
          <SwiperBedrooms rooms={rooms} className="hidden md:block" />

          <SwiperMobileBedrooms rooms={rooms} className="block md:hidden" />
        </>
      )}
    </>
  );
};

"use client";

import React, { useCallback, useEffect, useState } from "react";
import { SkeletonRooms, SwiperRelatedRooms } from "@/components";
import { LocationCity, RoomApi } from "@/interfaces";
import { useLocationStore } from "@/store";
import axios from "axios";

interface Props {
  category: string;
}

export const RelatedRooms = ({ category }: Props) => {
  const [relatedRooms, setRelatedRooms] = useState<RoomApi[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { locationUser } = useLocationStore();
  const [detectedLocation, setDetectedLocation] = useState<LocationCity | undefined>(undefined);

  const RelatedRooms = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get<RoomApi[]>(`${process.env.NEXT_PUBLIC_API_ROUTE}room/by-category/${category}?cityId=${detectedLocation?.id}`);
      setRelatedRooms(response.data);
    } catch (error: any) {
      setRelatedRooms([]);
      console.error("Error al cargar habitaciones:", error);
    } finally {
      setIsLoading(false);
    }
    setIsLoading(false);
  }, [detectedLocation]);

  useEffect(() => {
    if (detectedLocation) {
      RelatedRooms();
    }
  }, [detectedLocation, RelatedRooms]);

  useEffect(() => {
    if (locationUser) {
      setDetectedLocation(locationUser);
    }
  }, [locationUser]);

  return (
    <>
      {
        relatedRooms.length > 0 && (
          <div className="mt-8 fade-in">
            <p className="text-xl mb-5">Habitaciones relaciondas</p>
            {isLoading ? (
              <>
                <div className="hidden md:grid grid-cols p-2 sm:grid-cols-5 gap-10 mb-10">
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
              <SwiperRelatedRooms rooms={relatedRooms} />
            )}
          </div>
        )
      }
    </>
  );
};

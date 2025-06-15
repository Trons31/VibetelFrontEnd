"use client";

import React, { useCallback, useEffect, useState } from "react";
import { getRelatedRooms } from "@/actions";
import { SkeletonRooms, SwiperRelatedRooms } from "@/components";
import { BedRooms, searchCity } from "@/interfaces";
import { useLocationStore } from "@/store";

interface Props {
  category: string;
}

export const RelatedRooms = ({ category }: Props) => {
  const [relatedRooms, setRelatedRooms] = useState<BedRooms[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { locationUser } = useLocationStore();
  const [detectedLocation, setDetectedLocation] = useState<
    searchCity | undefined
  >(undefined);

  const RelatedRooms = useCallback(async () => {
    if (!detectedLocation?.city) return;
    setIsLoading(true);
    const { relatedRooms } = await getRelatedRooms(category);
    setRelatedRooms(relatedRooms);
    setIsLoading(false);
  }, [detectedLocation]);

  useEffect(() => {
    RelatedRooms();
  }, [detectedLocation, RelatedRooms]);

  useEffect(() => {
    if (locationUser) {
      setDetectedLocation(locationUser);
    }
  }, [locationUser]);

  return (
    <>
      <div className="mt-8">
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
    </>
  );
};

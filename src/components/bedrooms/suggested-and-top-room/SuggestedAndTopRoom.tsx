"use client";
import React, { useCallback, useEffect, useState } from "react";
import { getTopReservedRooms } from "@/actions";
import { SkeletonRooms } from "@/components";
import { RoomAllApi, searchCity } from "@/interfaces";
import { GridRoom } from "./GridRoom";
import { useLocationStore, useSuggestedRoomStore } from "@/store";

export const SuggestedAndTopRoom = () => {
  const [topRooms, setTopRooms] = useState<RoomAllApi[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingSuggestedRoom, setisLoadingSuggestedRoom] = useState(true);

  const { suggestedRooms } = useSuggestedRoomStore();
  const { locationUser } = useLocationStore();
  const [detectedLocation, setDetectedLocation] = useState<
    searchCity | undefined
  >(undefined);

  const seggestedRooms = () => {
    if (suggestedRooms === null) return;
    setisLoadingSuggestedRoom(false);
  };

  const getTopRooms = useCallback(async () => {
    setIsLoading(true);
    const { topRooms } = await getTopReservedRooms(locationUser?.city);
    //setTopRooms(topRooms);
    setIsLoading(false);
  }, [detectedLocation]);

  useEffect(() => {
    getTopRooms();
  }, [detectedLocation, getTopRooms]);

  useEffect(() => {
    seggestedRooms();
  }, [suggestedRooms]);

  useEffect(() => {
    if (locationUser) {
      setDetectedLocation(locationUser);
    }
  }, [locationUser]);

  return (
    <div>
      {suggestedRooms.length > 1 && (
        <>
          <div className="px-2 md:px-10 mb-4">
            <p className="text-lg font-bold">Sugerencias</p>
            <p className="text-sm text-gray-500">
              Habitaciones que te podrian interesar
            </p>
          </div>

          {isLoading ? (
            <>
              <div className="grid grid-cols-2 p-2 md:px-10 sm:grid-cols-4 gap-2 md:gap-10 mb-10">
                <SkeletonRooms />
                <SkeletonRooms />
                <SkeletonRooms />
                <SkeletonRooms />
              </div>
            </>
          ) : (
            <>
              <GridRoom rooms={suggestedRooms} location={detectedLocation} />
            </>
          )}
        </>
      )}

      <div className="px-2 md:px-10 mt-5 mb-4">
        <p className="text-lg font-bold">Recomendaciones</p>
        <p className="text-sm text-gray-500">
          Revisa nuestras habitaciones mas reservadas
        </p>
      </div>

      {isLoading ? (
        <>
          <div className="grid grid-cols-2 p-2 md:px-10 sm:grid-cols-4 gap-2 md:gap-10 mb-10">
            <SkeletonRooms />
            <SkeletonRooms />
            <SkeletonRooms />
            <SkeletonRooms />
          </div>
        </>
      ) : (
        <>
          <GridRoom rooms={topRooms} location={detectedLocation} />
        </>
      )}
    </div>
  );
};

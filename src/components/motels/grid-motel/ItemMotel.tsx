"use client";
import { useEffect, useState } from "react";
import { SkeletonRooms, SwiperBedrooms } from "@/components";
import { SwiperMobileBedrooms } from "../../bedrooms/swiper/SwiperMobileBedrooms";
import { getBedroomByMotel } from "@/actions/rooms/get-bedroom-by-motel";
import { BedRooms } from "@/interfaces";

interface Props {
  rooms: [];
}

export const ItemMotel = ({ rooms }: Props) => {


  return (
    <>
      {/* <SwiperBedrooms rooms={rooms} className="hidden md:block" />

      <SwiperMobileBedrooms rooms={rooms} className="block md:hidden" /> */}
    </>
  );
};

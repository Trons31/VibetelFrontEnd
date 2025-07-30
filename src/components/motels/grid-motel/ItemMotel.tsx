"use client";

import {  SwiperBedrooms } from "@/components";
import {  RoomOfMotel } from "@/interfaces";

interface Props {
  rooms: RoomOfMotel[];
}

export const ItemMotel = ({ rooms }: Props) => {


  return (
    <>
      <SwiperBedrooms rooms={rooms}  />
    </>
  );
};

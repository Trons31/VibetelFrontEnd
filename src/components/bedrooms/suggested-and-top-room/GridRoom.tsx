import { BedRooms, searchCity } from "@/interfaces";
import React from "react";
import { ItemRoom } from "./ItemRoom";

interface Props {
  rooms: BedRooms[];
  location: searchCity | undefined;
}

export const GridRoom = ({ rooms, location }: Props) => {
  return (
    <div className="grid grid-cols-2 p-2 md:px-10 sm:grid-cols-4 gap-2 md:gap-10 mb-10">
      {rooms.map((room) => (
        <div key={room.slug}>
          <ItemRoom room={room} location={location} />
        </div>
      ))}
    </div>
  );
};

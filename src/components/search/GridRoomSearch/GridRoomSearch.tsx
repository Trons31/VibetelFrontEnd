import { BedRooms, LocationCity, RoomAllApi } from "@/interfaces";
import { ItemRoomSearch } from "./ItemRoomSearch";

interface Props {
  rooms: RoomAllApi[];
  location: LocationCity | undefined;
}

export const GridRoomSearch = ({ rooms, location }: Props) => {
  return (
    <div className="grid grid-cols-2 p-2 md:px-10 sm:grid-cols-3 md:grid-cols-4 2xl:grid-cols-5 gap-2 sm:gap-5 md:gap-5 mb-10">
      {rooms.map((room) => (
        <div key={room.slug}>
          <ItemRoomSearch room={room} location={location} />
        </div>
      ))}
    </div>
  );
};

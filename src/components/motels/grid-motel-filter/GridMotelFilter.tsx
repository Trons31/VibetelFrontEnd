import { RoomAllApi } from "@/interfaces";
import { ItemGridMotelFilter } from "./ItemGridMotelFilter";

interface Props {
  rooms: RoomAllApi[];
}

export const GridMotelFilter = ({ rooms }: Props) => {
  return (
    <div className="grid grid-cols-2 p-2 md:px-10 sm:grid-cols-4 2xl:grid-cols-5 gap-2 md:gap-5 mb-10">
      {rooms.map((room) => (
        <div key={room.slug}>
          <ItemGridMotelFilter room={room} />
        </div>
      ))}
    </div>
  );
};

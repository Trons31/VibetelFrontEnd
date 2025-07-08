import { MotelApi } from "@/interfaces";
import { ItemAllMotel } from "./ItemAllMotel";

interface Props {
  motels: MotelApi[],
}

export const GridAllMotel = ({ motels }: Props) => {
  return (
    <>
      <div className="grid grid-cols md:grid-cols-3 xl:grid-cols-4 gap-0 md:gap-10 justify-center md:px-24">
        {
          motels.map(motel => (
            <ItemAllMotel
              key={motel.id}
              motel={motel} />
          ))
        }
      </div>

    </>
  )
}

import { MotelApi } from "@/interfaces";
import { ItemAllMotel } from "./ItemAllMotel";

interface Props {
  motels: MotelApi[],
}

export const GridAllMotel = ({ motels }: Props) => {
  return (
    <>
      <div className="grid grid-cols md:grid-cols-3 xl:grid-cols-4 gap-10 justify-center px-4 md:px-24">
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

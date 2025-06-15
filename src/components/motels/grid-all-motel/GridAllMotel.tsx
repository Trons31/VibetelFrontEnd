import {  MotelAllApi } from "@/interfaces"
import { ItemAllMotel } from "./ItemAllMotel";

interface Props {
  motels: MotelAllApi[],
}

export const GridAllMotel = ({ motels }: Props) => {
  return (
    <>
      <div className="grid grid-cols md:grid-cols-3 gap-10 justify-center p-2 md:px-24">
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

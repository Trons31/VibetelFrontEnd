import Link from 'next/link';
import { IoArrowForwardOutline } from 'react-icons/io5';
import { MotelImage } from '@/components';
import { MotelApi } from '@/interfaces';

interface Props {
  motel: MotelApi
}

export const ItemAllMotel = ({ motel }: Props) => {

  const truncateDescription = (description: string, wordLimit: number) => {
    const words = description.split(' ');
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(' ') + '...'
      : description;
  };

  return (
    <>

      <div key={motel.id} className="max-w-md bg-white border border-gray-200 rounded-lg shadow-sm shadow-gray-300 relative">
        <div className="absolute top-0 right-0 -mt-3 mr-2 bg-indigo-600 text-white text-sm font-bold px-4 py-1 rounded-full shadow-md">
          Más popular
        </div>
        <div className="flex absolute top-2 justify-start px-2">
          {motel.motelConfig?.inService ? (
            <div className="center inline-block select-none whitespace-nowrap rounded-lg bg-blue-600 py-2 px-3.5 align-baseline font-sans text-xs font-semibold leading-none text-white">
              <p className="text-xs font-bold">En servicio</p>
            </div>
          ) : (
            <div className="center inline-block select-none whitespace-nowrap rounded-lg bg-black py-2 px-3.5 align-baseline font-sans text-xs font-semibold leading-none text-white">
              <p className="text-xs font-bold">Fuera de servicio</p>
            </div>
          )}
        </div>
        <div>
          <MotelImage
            src={motel.images.length > 0 ?  motel.images[0].url : ""}
            width={450}
            height={300}
            alt={motel.images.length > 0 ?  motel.images[0].url : ""}
            className="object-cover rounded-t-lg h-[200px] "
          />
        </div>
        <div className="flex justify-end mt-3 px-2" >
          <span className="text-gray-500 text-xs" >{motel.address}, {motel.neighborhood}</span>
        </div>
        <div className="px-5 mt-2">
          <div>
            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 ">
              {motel.razonSocial}
            </h5>
          </div>
          <p className="flex font-normal text-sm text-gray-700 ">
            {truncateDescription(motel.description, 15)}
          </p>
        </div>
        <div className='px-4' >
          <ul className="space-y-4 mb-4 mt-3">
            <li>
              <Link href={`/motel/info/${motel.slug}`}>
                <label className="inline-flex items-center justify-between w-full p-5 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer hover:text-red-600 hover:border-red-500">
                  <div className="block">
                    <p className="w-full text-md font-extralight">Informacion</p>
                  </div>
                  <IoArrowForwardOutline className='h-4 w-4' />
                </label>
              </Link>
            </li>
            <li>
              <Link href={`motels/${motel.slug}`} >
                <label className="inline-flex items-center justify-between w-full p-5 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer hover:text-red-600 hover:border-red-500">
                  <div className="block">
                    <div className="w-full text-md font-extralight">Habitaciones</div>
                  </div>
                  <IoArrowForwardOutline className='h-4 w-4' />
                </label>
              </Link>
            </li>
          </ul>
        </div>
      </div>

    </>
  )
}

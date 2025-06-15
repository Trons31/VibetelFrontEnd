
import { FaImage } from 'react-icons/fa'

export const SkeletonMotels = () => {
  return (
    <>
      <div className='bg-gray-100 rounded-lg border-gray-200 shadow-md' >

        <div className="bg-gray-500 rounded-t-lg flex justify-center animate-pulse">
          <FaImage className='text-white h-56 w-36' />
        </div>

        <div className="p-2" >

          <div className="mt-2">
            <div className="text-start">
              <div className="w-24 h-4 mb-2 bg-gray-400 rounded-full animate-pulse"></div>
            </div>
          </div>

          <div className='Block justify-between mt-3' >
            <div className="w-full h-16 mb-2 bg-gray-300 rounded-md "></div>
            <div className="w-full h-16 mb-2 bg-gray-300 rounded-md "></div>
          </div>
        </div>

      </div>
    </>
  )
}

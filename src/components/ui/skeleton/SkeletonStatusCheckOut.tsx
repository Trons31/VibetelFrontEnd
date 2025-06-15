export const SkeletonStatusCheckOut = () => {
  return (
    <div className="text-center flex w-full justify-center md:p-4 h-full">
      <div className="mt-20 md:mt-36 px-4 pb-10 w-full  md:w-[500px]">
        <div className="bg-gray-500  rounded-full h-5"></div>
        <div className="px-4">
          <div className="bg-white border border-gray-300 -mt-3 py-3 px-4">
            <div className="flex justify-center ">
              <div>
                <div className="flex justify-center">
                  <div className="w-24 h-24 mb-2 bg-gray-400 rounded-full animate-pulse"></div>
                </div>
                <div className="flex justify-center mt-3">
                  <div className="w-24 h-4 mb-2 bg-gray-400 rounded-full animate-pulse"></div>
                </div>
                <div className="flex justify-center">
                  <div className="w-52 h-4 mb-2 bg-gray-400 rounded-full animate-pulse"></div>
                </div>
                <div className="flex justify-center">
                  <div className="w-24 h-4 mb-2 bg-gray-400 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>

            <div className='flex justify-center' >
              <div>
                <div className="grid grid-cols mt-5 md:grid-cols-2 gap-4 mb-3 space-y-3 md:space-y-0">
                  <div>
                    <div className="w-24 h-4 mb-2 bg-gray-400 rounded-full animate-pulse"></div>
                    <div className="w-24 h-4 mb-2 bg-gray-400 rounded-full animate-pulse"></div>
                  </div>
                  <div>
                    <div className="w-24 h-4 mb-2 bg-gray-400 rounded-full animate-pulse"></div>
                    <div className="w-24 h-4 mb-2 bg-gray-400 rounded-full animate-pulse"></div>
                  </div>
                </div>
                <div className="grid grid-cols mt-5 md:grid-cols-2 gap-4 mb-3 space-y-3 md:space-y-0">
                  <div>
                    <div className="w-24 h-4 mb-2 bg-gray-400 rounded-full animate-pulse"></div>
                    <div className="w-24 h-4 mb-2 bg-gray-400 rounded-full animate-pulse"></div>
                  </div>
                  <div>
                    <div className="w-24 h-4 mb-2 bg-gray-400 rounded-full animate-pulse"></div>
                    <div className="w-24 h-4 mb-2 bg-gray-400 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5">
              <div className="w-full h-4 mb-2 bg-gray-400 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

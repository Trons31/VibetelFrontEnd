

export const SkeletonPaymentProcessing = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-12 md:px-10 md:gap-2 pt-12 md:pt-0 pb-32 md:pb-0 md:mt-10 space-y-4 md:space-y-0 ">

      <div className="col-span-2 md:col-span-8 w-full" >
        <div className='block space-y-5'>
          <div className="w-full h-44  bg-gray-400  md:rounded-md animate-pulse"></div>
          <div className="w-full h-80  bg-gray-400 md:rounded-md animate-pulse"></div>
          <div className="w-full h-44  bg-gray-400 md:rounded-md animate-pulse"></div>
        </div>
      </div >

      <div className="col-span-2 md:col-span-4 w-full space-y-5" >
        <div className="w-full h-[500px]  bg-gray-400 md:rounded-md animate-pulse"></div>
        <div className="w-full h-40  bg-gray-400 md:rounded-md animate-pulse"></div>
      </div>

    </div >
  )
}

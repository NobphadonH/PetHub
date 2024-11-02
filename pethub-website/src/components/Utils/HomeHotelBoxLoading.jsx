/* eslint-disable react/prop-types */
function HomeHotelBoxLoading() {
    return (
      <div className="bg-white mx-auto w-full md:w-[350px] lg:w-[940px] xl:w-[1040px] h-[60vw] md:h-[480px] lg:h-[320px] border-2 lg:mx-auto rounded-md p-2 md:p-4 lg:p-8 flex lg:gap-10 flex-col lg:flex-row">
        <div className="animate-pulses w-full lg:w-[340px] h-[260px] bg-slate-200 rounded-md flex justify-center items-center text-gray-400">
        </div>
        <div className="text-start flex flex-col justify-between max-md:gap-0 max-lg:gap-5">
          <div className="px-3 my-1 md:my-5 lg:my-3 max-w-[550px]">
            <h1 className="animate-pulses w-full h-[3vw] md:h-5 bg-slate-200 mt-2 text-[3vw] md:text-2xl transition-all duration-300 ease-in-out max-lg:line-clamp-1 max-lg:overflow-hidden">

            </h1>
            <div className="flex lg:my-5 gap-1 items-center">
              <div className="animate-pulses w-[20vw] h-[3vw] md:w-28 md:h-5 my-1 bg-slate-200"></div>
            </div>
            <div className="text-[1.5vw] md:text-sm lg:pr-20 text-gray-400 transition-all duration-300 ease-in-out max-lg:line-clamp-2 max-lg:overflow-hidden">
              <div className="animate-pulses w-[60vw] h-[1vw] md:w-[530px] md:h-3 bg-slate-200 mb-2"></div>
              <div className="animate-pulses w-[60vw] h-[1vw] md:w-[530px] md:h-3 bg-slate-200 mb-2"></div>
              <div className="animate-pulses w-[60vw] h-[1vw] md:w-[530px] md:h-3 bg-slate-200 mb-2"></div>
            </div>
          </div>
          <div className="p-2 md:px-3 flex justify-between items-center">
            <div className="flex items-center gap-3">
                <div className="animate-pulses md:h-10 bg-slate-200 text-white md:text-white w-[15vw] max-md:text-[2vw] h-[5vw] md:w-32 font-medium"></div>
                <div className="max-lg:hidden flex gap-2">
                </div>
            </div>
            <div className="flex gap-3 items-center">
              <span className="animate-pulses text-[2.5vw] md:text-xl w-[10vw] h-[3vw] md:w-28 md:h-5 bg-slate-200"></span>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  
  export default HomeHotelBoxLoading;


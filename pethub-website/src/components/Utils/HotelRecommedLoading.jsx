/* eslint-disable react/prop-types */
function HotelRecommendLoading() {
    return (
        <div className="w-[40vw] md:w-[300px] h-full bg-white border-2 rounded-lg p-[2vw] md:p-3 flex flex-col justify-between items-center">
            <div className="w-full relative">
                {/* Show "Popular" tag if reviews are more than 50 */}
                
                {/* Image Section */}
                <div className="animate-pulses w-full h-[42vw] bg-slate-200 sm:h-[50vw] md:h-[330px] rounded-md overflow-hidden">
                    
                </div>

                {/* Hotel Details */}
                <div className="w-full text-start md:mt-5 mt-[3vw] mx-1 md:mx-3">
                    <div className="flex">
                        <div className="text-[3vw] animate-pulses bg-slate-200 h-[3vw] md:h-5 md:text-2xl w-full md:w-40 transition-all duration-300 ease-in-out line-clamp-1 overflow-hidden">
                            
                        </div>
                        <span className="hidden md:block text-2xl ml-3 text-gray-400">
  
                        </span>
                    </div>
                    <div className="flex lg:my-1 gap-1 items-center animate-pulses bg-slate-200 h-[3vw] md:h-5 w-full max-w-60 my-[1vw]">
    
                        <div className="max-md:text-[2vw] ml-1 md:ml-3">
    
                        </div>
                    </div>
                    <div className="text-[2vw] animate-pulses bg-slate-200 h-[3vw] md:h-5 w-5/12 md:text-lg text-gray-400">

                    </div>
                </div>
            </div>
            {/* View More Button */}
            <div className="animate-pulses flex justify-center items-center rounded-md bg-slate-200 text-white md:text-white w-[17vw] max-md:text-[2vw] h-[7vw] max-h-12 md:w-40 font-medium">

            </div>
        </div>
    );
}


export default HotelRecommendLoading;

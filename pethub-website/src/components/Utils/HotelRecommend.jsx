/* eslint-disable react/prop-types */
function HotelRecommend({ 
    hotelName, 
    reviews, 
    rating, 
    price, 
    imageUrl,
    petType,
}) {
    return (
        <div className="w-[40vw] md:w-[300px] h-full bg-white border-2 rounded-lg p-[2vw] md:p-3 flex flex-col justify-between items-center">
            <div className="w-full relative">
                {/* Show "Popular" tag if reviews are more than 50 */}
                {reviews > 100 && (
                    <div className="absolute top-[3vw] md:top-6 left-0 w-[17vw] h-[6vw] md:w-28 md:h-10 bg-pethub-color6 opacity-70 rounded-e-full text-center text-white text-[2.5vw] md:text-lg px-4 flex items-center justify-start">
                        Popular
                    </div>
                )}
                
                {/* Image Section */}
                <div className="w-full h-[42vw] sm:h-[50vw] md:h-[330px] rounded-md bg-base-200 overflow-hidden">
                    <img src={imageUrl} className="w-full h-full object-cover rounded-md" />
                </div>

                {/* Hotel Details */}
                <div className="w-full text-start md:mt-5 mt-[3vw] mx-1 md:mx-3">
                    <div className="flex">
                        <div className="text-[3vw] md:text-2xl w-full md:w-40 transition-all duration-300 ease-in-out line-clamp-1 overflow-hidden">
                            {hotelName}
                        </div>
                        <span className="hidden md:block text-2xl ml-3 text-gray-400">
                            {petType.map((pet, index) => (
                                <span key={index}>{pet}</span>
                            ))}
                        </span>
                    </div>
                    <div className="flex lg:my-1 gap-1 items-center">
                        {/* Star Rating */}
                        {Array.from({ length: rating }).map((_, index) => (
                            <svg key={index} xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-star-fill max-md:w-[6px] text-yellow-400" viewBox="0 0 16 16">
                                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                            </svg>
                        ))}
                        <div className="max-md:text-[2vw] ml-1 md:ml-3 ">
                            {rating} ({reviews} Reviews)
                        </div>
                    </div>
                    <div className="text-[2vw] md:text-lg text-gray-400">
                        {price} บาท / คืน
                    </div>
                </div>
            </div>
            {/* View More Button */}
            <a href={`/pethub-website/home/${hotelName}`} className="flex justify-center items-center rounded-md md:btn bg-pethub-color1 md:bg-pethub-color1 text-white md:text-white w-[17vw] max-md:text-[2vw] h-[7vw] md:w-40 font-medium">
                <a href={`/pethub-website/home/${hotelName}`}>View More</a>
            </a>
        </div>
    );
}

HotelRecommend.defaultProps = {
    hotelName: "Default Hotel",
    reviews: 0,
    rating: 3,
    price: "N/A",
    link: "/",
    imageUrl: "https://via.placeholder.com/300",
    petType: ["🐱", "🐶"],
};

export default HotelRecommend;

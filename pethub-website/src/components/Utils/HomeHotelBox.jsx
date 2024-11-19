/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function HomeHotelBox({ 
    hotelObj,
    hotelName, 
    reviews, 
    rating, 
    description, 
    price, 
    imageUrl,
    petType,
    checkIn,
    checkOut
  }) {

    const navigate = useNavigate()

    const petIcon = {"สุนัข": "🐶", "แมว":"🐱", "อื่น ๆ":"🫎"}

    const goHotelDetail = () => {
      if (checkIn && checkOut) {
        const hotelData = {
          ...hotelObj,
          checkIn,
          checkOut
        }
        navigate(`/pethub-website/home/${hotelName}`, {state: hotelData})
      } else {
        console.log("please select check in and check out date")
        toast.error("กรุณาเลือกวันที่ เช็คอิน - เช็คเอาท์");
      }
    }

    return (
      <div className="bg-white mx-auto w-full md:w-[350px] lg:w-[940px] xl:w-[1040px] h-[60vw] md:h-[480px] lg:h-[320px] border-2 lg:mx-auto rounded-md p-2 md:p-4 lg:p-8 flex lg:gap-10 flex-col lg:flex-row">
        <div className="w-full lg:w-[340px] h-[260px] bg-slate-200 rounded-md flex justify-center items-center text-gray-400">
            <img src={imageUrl} alt="hotel-image" className="w-full h-full object-cover rounded-md" />
        </div>
        <div className="text-start flex grow flex-col justify-between max-md:gap-0 max-lg:gap-5">
          <div className="px-3 my-1 md:my-5 lg:my-3 max-w-[550px]">
            <h1 className="mt-2 text-[3vw] md:text-2xl transition-all duration-300 ease-in-out max-lg:line-clamp-1 max-lg:overflow-hidden">
              {hotelName} 
            </h1>
            <div className="flex lg:my-5 gap-1 items-center">
              {Array.from({ length: rating }).map((_, index) => (
                <svg key={index} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill max-md:w-[6px] text-yellow-400" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                </svg>
              ))}
              <div className="max-md:text-[2vw] ml-1 md:ml-3">
                {parseFloat(rating).toFixed(2)} ({reviews} Reviews)
              </div>
            </div>
            <p className="text-[1.5vw] md:text-sm lg:pr-20 text-gray-400 transition-all duration-300 ease-in-out max-lg:line-clamp-2 line-clamp-3 max-lg:overflow-hidden">
              {description}
            </p>
          </div>
          <div className="p-2 md:px-3 flex justify-between items-center">
            <div className="flex items-center gap-3">
                <button onClick={goHotelDetail} className="flex justify-center items-center rounded-md md:btn bg-pethub-color1 md:bg-pethub-color1 text-white md:text-white w-[17vw] max-md:text-[2vw] h-[7vw] md:w-32 font-medium">
                รายละเอียด
                </button>
                <div className="max-lg:hidden flex gap-2">
                    {petType.map((pet, index) => (
                        <div key={index} className="text-2xl"> {petIcon[pet]}</div>
                    ))}
                </div>
            </div>
            <div className="flex gap-3 items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-cash hidden lg:block" viewBox="0 0 16 16">
                <path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4"/>
                <path d="M0 4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V6a2 2 0 0 1-2-2z"/>
              </svg>
              <span className="text-[2.5vw] md:text-xl">
                {price} <span className="max-md:text-[1.5vw] text-sm">บาท / คืน</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  HomeHotelBox.defaultProps = {
    hotelName: "Default Hotel",
    roomInfo: "1 room",
    reviews: 0,
    rating: 3,
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi, possimus perferendis voluptatem distinctio laboriosam harum ullam ea, quam aperiam quos numquam, deleniti mollitia placeat rerum corporis. Architecto id necessitatibus adipisci!",
    price: "N/A",
    link: "/",
    imageUrl: "" ,
    petType: ["🐱", "🐶"],
  };
  
  export default HomeHotelBox;


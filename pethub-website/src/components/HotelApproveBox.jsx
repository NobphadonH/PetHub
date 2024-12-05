/* eslint-disable react/prop-types */
import axios from "axios";
import { toast } from "react-toastify";

function HotelApproveBox({ 
    hotelObj,
    hotelName, 
    hotelType,
    reviews, 
    rating, 
    description, 
    price, 
    imageUrl,
    actionCnt,
    setActionCnt
  }) {


    const petIcon = {"สุนัข": "🐶", "แมว":"🐱", "อื่น ๆ":"🫎"}

  
    const handleApprove =  async (e) => {
      e.preventDefault()
      try {
        const res = await axios.post("http://localhost:5000/api/hotel/updateHotelVerification", {hotelID: hotelObj.hotelID, verification: "verified"}, { withCredentials:true})
        setActionCnt(++actionCnt);
        console.log(res);
        if (res.status == 200) {
          toast.success("ดำเนินการอนุมัติสำเร็จ")
        }
      } catch (err) {
        console.log(err)
      }
    }
    const handleReject = async (e) => {
      e.preventDefault()
      try {
        const res = await axios.post("http://localhost:5000/api/hotel/updateHotelVerification", {hotelID: hotelObj.hotelID, verification: "rejected"}, { withCredentials:true})
        setActionCnt(++actionCnt);
        console.log(res);
        if (res.status == 200) {
          toast.success("ดำเนินการปฏิเสธสำเร็จ")
        }
      } catch (err) {
        console.log(err)
      }
    }

    return (
      <div className="bg-white mx-auto w-full md:w-[750px] lg:w-[940px] xl:w-[1040px] h-[70vw] md:h-[480px] lg:h-[320px] border-2 lg:mx-auto rounded-md p-2 md:p-4 lg:p-8 flex lg:gap-10 flex-col lg:flex-row">
        <div className="w-full lg:w-[340px] h-[260px] bg-slate-200 rounded-md flex justify-center items-center text-gray-400">
            <img src={imageUrl} alt="hotel-image" className="w-full h-full object-cover rounded-md" />
        </div>
        <div className="text-start flex grow flex-col justify-between max-md:gap-0 max-lg:gap-5">
          <div className="px-3 my-1 md:my-5 lg:my-3 max-w-[550px]">
            <h1 className="mt-2 text-[3vw] md:text-2xl transition-all duration-300 ease-in-out max-lg:line-clamp-1 max-lg:overflow-hidden">
              {hotelName} 
            </h1>
            <p className="text-[1.5vw] md:mt-4 lg:mt-8 md:text-sm lg:pr-20 text-gray-400 transition-all duration-300 ease-in-out max-lg:line-clamp-3 line-clamp-5 max-lg:overflow-hidden">
              {description}
            </p>
          </div>
          <div className="p-2 md:px-3 flex justify-between items-center">
            <div className="flex gap-3 items-center">

              <span className="text-[2vw] md:text-sm transition-all duration-300 ease-in-out max-lg:line-clamp-1 line-clamp-1 max-lg:overflow-hidden">
                ประเภท : {hotelType}
              </span>
            </div>
            <div className="flex items-center gap-3">
                <button onClick={handleReject} className="flex justify-center items-center rounded-md md:btn bg-red-600 md:bg-red-600 text-white md:text-white w-[17vw] max-md:text-[2vw] h-[7vw] md:w-24 font-medium">
                ปฎิเสธ
                </button>
                <button onClick={handleApprove} className="flex justify-center items-center rounded-md md:btn bg-pethub-color6 md:bg-pethub-color6 text-white md:text-white w-[17vw] max-md:text-[2vw] h-[7vw] md:w-24 font-medium">
                อนุมัติ
                </button>

            </div>
          </div>
        </div>
      </div>
    );
  }
  
  HotelApproveBox.defaultProps = {
    hotelName: "Default Hotel",
    roomInfo: "1 room",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi, possimus perferendis voluptatem distinctio laboriosam harum ullam ea, quam aperiam quos numquam, deleniti mollitia placeat rerum corporis. Architecto id necessitatibus adipisci!",
    imageUrl: "" ,
    petType: ["🐱", "🐶"],
  };
  
  export default HotelApproveBox;


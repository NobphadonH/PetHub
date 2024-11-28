import { useParams, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Utils/Navbar";
import { useState, useEffect, useRef } from 'react';
import PictureUpload from "./Utils/PictureUpload";
import Cookies from "js-cookie"
import { toast } from "react-toastify";
import axios from "axios";

function RoomsBooking() {
  
  //router state
  const param = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  //router state

  //page state
  const [currentDate, setCurrentDate] = useState('');
  const [addbut, setAddbut] = useState(false)
  const [myPet, setMyPet] = useState([false, false])
  const [customPet, setCustomPet] = useState(0)
  const elementRef = useRef(null);
  //page state
  
  //data state
  const [imageFile, setImageFile] = useState(null);
  const [bookingData, setBookingData] = useState({});
  const [petData, setPetData] = useState([]);
  const [chosenPet, setChosenPet] = useState();
  const roomData = location.state;
  //data state






  //function
  const numberOfDate = (checkIn, checkOut) => {
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const timeDifference = checkOutDate - checkInDate;
    const dayDifference = timeDifference / (1000 * 60 * 60 * 24);
    return dayDifference
  }
  
  const countPrice = (checkIn, checkOut, pricePerNight) => {
    const date1 = new Date(checkIn);
    const date2 = new Date(checkOut);
    
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
    const totalPrice = (diffDays) * parseFloat(pricePerNight);
  
    return totalPrice.toFixed(2);
  }

  const handleToggleAdd = () => {
    setAddbut(e => !e)
}

  const handleAddCustom = () => {
    setCustomPet((e) => (e < 3 ? e + 1 : e));
    setAddbut(false)
  };
  
  const handleRemoveCustom = () => {
    setCustomPet((e) => (e > 0 ? e - 1 : e));
  };

  const handleAddMyPet = (newPet) => {
    console.log(newPet)
    setChosenPet(newPet)

};
  
  const handleRemoveMyPet = () => {
    setChosenPet(null);

  };
  

  const handleClickOutside = (event) => {
    if (elementRef.current && !elementRef.current.contains(event.target)) {
      setAddbut(false); // Hide the element when clicking outside
    }
  };

  const handleImageSelected = (file) => {
    setImageFile(file);
    if (file) {
      console.log("Selected image file:", file.name);
    } else {
      console.log("Image file removed");
    }
  };


  const handleChange= (e) => {
    const { name, value } = e.target;
    setBookingData((prev) => ({ ...prev, [name]: value }));
    console.log(bookingData)
  };

  const handleSubmitBooking = async (e) => {
    e.preventDefault();
    if (!chosenPet || !roomData) {
        toast.error("ไม่สามารถดำเนินการได้เนื่องจากข้อมูลไม่ครบถ้วน")
        return;
    }


    setBookingData( (prev) => ({
        ...prev,
        petID : chosenPet.petID
    }))

    
    console.log(bookingData)

    navigate("/pethub-website/payment", {state: {
        ...bookingData,
        ...roomData,
        petID : chosenPet.petID, 
        numberOfNight : numberOfDate(roomData.checkIn, roomData.checkOut),
        amount : countPrice(roomData.checkIn, roomData.checkOut, roomData.pricePerNight)
    }});
  } 

  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
  
    if (months < 0) {
      years--;
      months += 12; 
    }
  
    return { years, months };
  };
  //function


  //page state control
  useEffect(() => {
    // Get today's date in the format YYYY-MM-DD
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(today.getDate()).padStart(2, '0');
    setCurrentDate(`${year}-${month}-${day}`);

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };

  }, []);


  //API connect
  useEffect(() => {
    const fetchData = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/pet/getMatchingPets", {
                params:{ petAllowedType: roomData.petAllowedType}, 
                withCredentials: true, 
              });            
              setPetData(res.data);
            console.log(res.data);

        } catch (err) {
            console.log(err);
        }
    }

    fetchData()
  }, [])



  return (
    <>
        <Navbar />
        <div className='mt-20 md:mt-28 w-[96vw] lg:w-11/12 xl:w-11/12 2xl:w-[1280px] grid grid-cols-12 grid-rows-2 max-lg:h-[35vw] lg:h-[300px] mx-auto gap-1 lg:gap-3 xl:gap-5'>

            <div className='row-start-1 rounded-md col-span-5 row-span-2 bg-gray-300'>
                <img src={roomData.roomPhoto} className="w-full h-full object-cover rounded-md" />
            </div>
            <div className='col-start-6 rounded-md col-span-5 row-span-2 bg-gray-300'>
                <img src={roomData.roomPhoto} className="w-full h-full object-cover rounded-md" />
            </div>
            <div className='col-start-11 rounded-md col-span-2 row-span-2 bg-gray-300'>
                <img src={roomData.roomPhoto} className="w-full h-full object-cover rounded-md" />
            </div>

        </div>
        <div className='w-full h-full bg-[#F4F4F4] mt-10'>
        <div className="w-[90vw] lg:w-11/12 xl:w-10/12 2xl:w-[1280px] h-full mx-auto py-[1vw] lg:py-10 grid grid-cols-12 gap-x-[3%] md:gap-4">
            <div className='max-md:basis-full col-span-12 md:col-span-8 max-md:py-[2vw] max-lg:py-5 flex flex-col gap-[5vw] md:gap-10'>
                <div>

                    <h1 className='text-start text-[5vw] md:text-2xl lg:text-3xl xl:text-5xl uppercase font-bold transition-all duration-300 ease-in-out line-clamp-1 overflow-hidden'>{param.hotelName} <span className="font-normal text-[3vw] md:text-lg lg:text-1xl xl:text-3xl text-gray-500">{roomData.roomTypeName}({roomData.petAllowedType})</span></h1>
                    <div className="flex my-[1vw] md:my-3 lg:my-4 gap-1 items-center">

                        {Array.from({ length: roomData.reviewScore }).map((_, index) => (
                        <svg key={index} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill w-[8px] sm:w-[12px] lg:w-[16px] text-yellow-400" viewBox="0 0 16 16">
                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                        </svg>
                        ))}
                    </div> 
                    <div className='flex gap-3 items-center justify-start text-gray-400'>
                        <div className=' text-start text-[10px] sm:text-[2vw] md:text-xs xl:text-sm  transition-all duration-300 ease-in-out max-lg:line-clamp-3 max-lg:overflow-hidden'>{roomData.roomDetail}</div>
                    </div>
                </div>
                <div className="md:hidden w-full h-[35vw] bg-white rounded-lg overflow-hidden flex">
                    <div className="relative w-[40%] h-full bg-slate-400">
                        <img className="absolute bottom-0" src={roomData.roomPhoto} alt="" />
                    </div>
                
                <div className="w-[60%] h-full p-[3vw] flex flex-col justify-between">
                    <div>
                        <div className='flex justify-between items-end'>
                            <div className='font-semibold text-[2.5vw] md:text-base lg:text-xl xl:text-2xl'>รายละเอียดของห้องพัก</div>   
                        </div>
                        <div className='flex justify-between items-end'>
                            <div className='text-[1.8vw] md:text-xs lg:text-sm xl:text-sm md:my-1 lg:my-1'>ขนาดห้อง</div>
                            <div className='text-[1.8vw] md:text-xs lg:text-sm xl:text-lg md:my-1 lg:my-1'>{roomData.roomSize} ตร.ม.</div>
                        </div>
                        <div className='flex justify-between items-end'>
                            <div className='text-[1.8vw] md:text-xs lg:text-sm xl:text-sm md:my-1 lg:my-1'>ประเภท</div>
                            <div className='text-[1.8vw] md:text-xs lg:text-sm xl:text-lg md:my-1 lg:my-1'>{roomData.roomTypeName} </div>
                        </div>
                        <div className='flex justify-between items-end'>
                            <div className='text-[1.8vw] md:text-xs lg:text-sm xl:text-sm md:my-1 lg:my-1'>ประเภทสัตว์ที่รับ</div>
                            <div className='text-[1.8vw] md:text-xs lg:text-sm xl:text-lg md:my-1 lg:my-1'>{roomData.petAllowedType}</div>
                        </div>
                        <div className='flex justify-between items-end'>
                            <div className='text-[1.8vw] md:text-xs lg:text-sm xl:text-sm md:my-1 lg:my-1'>ราคาต่อคืน</div>
                            <div className='text-[1.8vw] md:text-xs lg:text-sm xl:text-lg md:my-1 lg:my-1'>{roomData.pricePerNight} บาท</div>
                        </div>
                    </div>
                    <div>
                        <div className='flex justify-between items-end'>
                            <div className='text-[2.5vw] md:text-xs lg:text-sm xl:text-sm md:my-1 lg:my-1'>ราคาจองรวม</div>
                            <div className='text-[2.5vw] md:text-xs lg:text-sm xl:text-lg md:my-1 lg:my-1'>{countPrice(roomData.checkIn, roomData.checkOut, roomData.pricePerNight)} บาท</div>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="max-md:w-full  overflow-y-hidden bg-white rounded-md max-md:p-[3vw] max-lg:px-8 max-lg:py-4 py-12 px-10 text-start">
                    <div className={`text-[4vw] md:text-xl lg:text-xl xl:text-2xl font-semibold mb-[1vw] md:mb-3 lg:mb-6 overflow-y `}>จองห้องพักสัตว์เลี้ยง</div>
                    <div className={`text-[2vw] md:text-sm lg:px-4 scrollbar-hidden `}>
                        <p className="font-semibold text-[3vw] md:text-sm lg:text-lg xl:text-xl">วันที่เช็คอิน-เช็คเอาท์</p>
                        <div className="flex items-end gap-4 lg:gap-8">
                            <div>
                                <p className="text-start text-[2.5vw] md:text-xs lg:text-sm xl:text-sm my-[1vw] md:my-3">เช็คอิน</p>
                                <input
                                    type="date"
                                    name="email"
                                    min={currentDate}
                                    placeholder=""
                                    value={roomData.checkIn}
                                    disabled={true} 
                                    className="input input-bordered w-[35vw] sm:w-44 h-[8vw] max-h-10  text-[3vw] sm:h-10 xl:h-12 xl:w-64 sm:text-xs lg:text-sm bg-gray-100 mb-3"
                                />
                            </div>
                            <div className="text-[2.5vw] md:text-sm lg:text-lg py-5">ถึง</div>
                            <div>
                                <p className="text-start text-[2.5vw] md:text-xs lg:text-sm xl:text-sm my-[1vw] md:my-3">เช็คเอาท์</p>
                                <input
                                    type="date"
                                    name="email"
                                    min={currentDate}
                                    placeholder=""
                                    value={roomData.checkOut}
                                    disabled={true} 
                                    className="input input-bordered w-[35vw] sm:w-44 h-[8vw] max-h-10  text-[3vw] sm:h-10 xl:h-12 xl:w-64 sm:text-xs lg:text-sm bg-gray-100 mb-3"
                                />
                            </div>
                        </div>
                        <p className="font-semibold text-[3vw] md:text-sm lg:text-lg xl:text-xl  my-[3vw] md:my-3 lg:my-6 ">ข้อมูลสัตว์เลี้ยง</p>
                        <div className="relative">
                            <div onClick={handleToggleAdd} className="flex justify-center items-center rounded-md md:btn bg-pethub-color1 md:bg-pethub-color1 text-white md:text-white max-sm:text-[2.5vw] h-[7vw] w-[20vw] sm:w-32 md:w-36 font-medium text-xs lg:text-sm xl:text-base">เพิ่มสัตว์เลี้ยง +</div>
                            <div ref={elementRef} className={` z-50 absolute bg-white rounded-sm w-[70%] max-h-64 border-[1px] top-14 overflow-y-hidden ${addbut ? '' : 'hidden'}`}>
                                <div className="w-full h-12 lg:h-16 bg-gray-100 flex items-center px-5 justify-between cursor-pointer">
                                    <p className="text-[3vw] md:text-xs lg:text-lg">สัตว์เลี้ยงของฉัน</p>
                                </div>
                                <div className="h-24 w-full overflow-y-scroll hide-scrollbar">
                                    {petData.map((pet, index) => {
                                        return (
                                            <div key={index} className="w-full h-8 lg:h-16 flex items-center justify-between px-5 bg-gray-white">
                                                <p className="text-start text-[2.5vw] md:text-xs lg:text-sm xl:text-sm my-3">{pet.petName}</p>
                                                <div className="hover:scale-110">
                                                    <svg onClick={() => handleAddMyPet(pet)} xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="text-pethub-color3 max-lg:w-6 max-lg:h-6 bi bi-plus-square-fill" viewBox="0 0 16 16">
                                                    <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0"/>
                                                    </svg>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
   
                            </div>



                            {chosenPet && (() => {
                            const { years, months } = calculateAge(chosenPet.petDOB); // Calculate age for the chosen pet

                            return (
                                <div className={!chosenPet ? "hidden" : "w-full relative h-28 sm:h-36 lg:h-40 xl:h-44 border-[1px] my-3 rounded-md p-1 flex"}>
                                    <div className="absolute right-1 top-1">
                                        <svg onClick={() => handleRemoveMyPet()} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="text-gray-400 cursor-pointer max-lg:w-4 max-lg:h-4 bi bi-trash3-fill" viewBox="0 0 16 16">
                                        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                                        </svg>
                                    </div>
                                    <div className="w-[200px] lg:w-[230px] xl:w-[250px] h-full rounded bg-slate-300 overflow-hidden">
                                        <img src={chosenPet.petPhoto} className="object-cover w-full h-full" alt="" />
                                    </div>
                                    <div className="w-full overflow-y-hide hide-scrollbar h-full pr-7 xl:pr-12 px-2 py-3 xl:p-5 flex flex-col justify-between">
                                        <div className="flex justify-between flex-wrap text-[2vw] md:text-[1.2vw] xl:text-xs">
                                        <div>ชื่อ: {chosenPet.petName}</div>
                                        <div>อายุ: {years} ปี {months} เดือน</div>
                                        <div>ประเภท: {chosenPet.petType}</div>
                                        <div>เพศ: {chosenPet.petSex}</div>
                                        </div>
                                        <p className="text-start md:text-[1.2vw] xl:text-sm my-1 lg:my-3">คำอธิบายลักษณะเพิ่มเติม</p>
                                        <textarea className="textarea w-full max-h-12 min-h-12 lg:min-h-16 lg:max-h-16 textarea-bordered hide-scrollbar text-[2vw] md:text-[1vw] xl:text-sm text-gray-600" value={chosenPet.petDetail}></textarea>
                                    </div>
                                </div>
                            );
                            })()}



                        </div>
                        <div className="z-10">
                            <p className="font-semibold  text-[3vw] md:text-xs lg:text-sm xl:text-sm my-[3vw] md:my-3 lg:my-6">ข้อมูลการดูแลสัตว์เลี้ยง</p>
                            <p className="text-start text-[2.5vw] md:text-xs lg:text-sm xl:text-sm my-3">ข้อมูลสำคัญของน้องๆ ของคุณ เช่น โรคประจำตัว หรือความจำเป็นในการดูแลเป็นพิเศษต่างๆ แนะนำให้แจ้งให้ทางโรงแรมทราบถึงการปฎิบัติดูแลต่างๆ</p>
                            <textarea 
                            name = "bookingDetail"
                            onChange = {handleChange}
                            value = {bookingData.bookingDetail || ""}
                            className="textarea w-full min-h-[20vw] max-h-[20vw] md:min-h-32 md:max-h-48 lg:min-h-44 lg:max-h-80 text-[2.5vw] md:text-xs lg:text-sm xl:text-sm textarea-bordered" placeholder="ex. ให้อาหาร 3 เวลา, การแปลงขนทุกวัน เป็นต้น" />

                        </div>
                        <div className="flex items-center justify-between mt-9">
                            <p className="text-start text-[2.5vw] md:text-xs lg:text-sm xl:text-sm my-3">โปรดเช็คข้อมูลให้ถูกต้องก่อนทำการจอง</p>
                            <button 
                            onClick={handleSubmitBooking}
                            className="flex justify-center items-center rounded-md md:btn bg-pethub-color1 md:bg-pethub-color1 text-white md:text-white max-sm:text-[2.5vw] h-[7vw] w-[20vw] sm:w-32 md:w-32 font-medium text-xs lg:text-sm xl:text-base">ดำเนินการต่อ</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='max-md:hidden max-md:w-full max-md:h-[40vw] max-md:my-[2vw] h-[320px] lg:h-[400px] xl:h-[500px] bg-white rounded-md col-span-4'>
                <div className='w-[45vw] md:w-full h-full bg-white rounded-lg overflow-hidden'>
                    <div className='relative w-full h-[55%] overflow-hidden bg-slate-200'>
                        <img className="absolute bottom-0" src={roomData.roomPhoto} alt="" />
                    </div>
                    <div className='w-full h-[45%] p-[2vw] md:p-4 text-start'>
                        <div className='flex justify-between items-end'>
                            <div className='text-[2.5vw] md:text-base lg:text-xl xl:text-2xl'>รายละเอียดของห้องพัก</div>
                        </div>
                        <div className='flex justify-between items-end'>
                            <div className='text-[1.8vw] md:text-xs lg:text-sm xl:text-sm md:my-1 lg:my-1'>ขนาดห้อง</div>
                            <div className='text-[1.8vw] md:text-xs lg:text-sm xl:text-lg md:my-1 lg:my-1'>{roomData.roomSize} ตร.ม.</div>
                        </div>
                        <div className='flex justify-between items-end'>
                            <div className='text-[1.8vw] md:text-xs lg:text-sm xl:text-sm md:my-1 lg:my-1'>ประเภท</div>
                            <div className='text-[1.8vw] md:text-xs lg:text-sm xl:text-lg md:my-1 lg:my-1'>{roomData.roomTypeName}</div>
                        </div>
                        <div className='flex justify-between items-end'>
                            <div className='text-[1.8vw] md:text-xs lg:text-sm xl:text-sm md:my-1 lg:my-1'>ประเภทสัตว์ที่รับ</div>
                            <div className='text-[1.8vw] md:text-xs lg:text-sm xl:text-lg md:my-1 lg:my-1'>{roomData.petAllowedType}</div>
                        </div>
                        <div className='flex justify-between items-end'>
                            <div className='text-[1.8vw] md:text-xs lg:text-sm xl:text-sm md:my-1 lg:my-1'>ราคาต่อคืน</div>
                            <div className='text-[1.8vw] md:text-xs lg:text-sm xl:text-lg md:my-1 lg:my-1'>{roomData.pricePerNight} บาท</div>
                        </div>
                    </div>
                </div>
                <div className="w-full h-[250px] lg:h-[300px] xl:h-[350px] mt-6 rounded-lg overflow-hidden bg-white">
                    <div className="w-full h-[20%] bg-pethub-color6 flex items-center p-5 justify-start text-white text-xl text-[2.5vw] md:text-base lg:text-xl xl:text-2xl">ราคาการจอง</div>
                    <div className="w-full h-[55%] bg-white px-5 py-3 lg:py-5 flex flex-col gap-3 text-[1.8vw] md:text-xs lg:text-sm xl:text-base md:my-1 lg:my-1">
                        <div className="flex items-center justify-between ">
                            <div>การจอง {numberOfDate(roomData.checkIn, roomData.checkOut)} คืน</div>
                            <div className=" text-gray-400">{countPrice(roomData.checkIn, roomData.checkOut, roomData.pricePerNight)}</div>
                        </div>

                    </div>
                    <div className="w-full h-[25%] bg-white px-5 flex flex-col lg:gap-3 ">
                        <hr />
                        <div className="flex items-center justify-between h-[70%] text-[1.8vw] md:text-base lg:text-lg xl:text-xl">
                            <div>ทั้งหมด</div>
                            <div>{countPrice(roomData.checkIn, roomData.checkOut, roomData.pricePerNight)} บาท</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={``}>
                

                
            </div>

        </div>
     </div>
     {/* <Footer /> */}
    
    </>
  );
}

export default RoomsBooking;

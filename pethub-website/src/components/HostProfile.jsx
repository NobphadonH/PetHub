import Navbar from "./Utils/Navbar"
import { motion } from "framer-motion"
import { useState, useRef, useEffect } from "react";
import TextEditor from "./Utils/TextEditor";
import axios from "axios";



function HostProfile() {
    const containerRef = useRef(null);
    const parentRef = useRef(null);
    const [totalWidth, setTotalWidth] = useState(0);
    const [hotelData, setHotelData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const formatDate = (date) => {
      if (!date) return ''; // Handle null or undefined date
      
      const dateObj = new Date(date);
      const day = String(dateObj.getDate()).padStart(2, '0'); // Get day and pad with leading 0 if needed
      const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Get month (0-indexed, so add 1)
      const year = dateObj.getFullYear(); // Use AD (Gregorian calendar year)
      
      return `${day}/${month}/${year}`; // Return formatted date in AD
    };

    // Fetch data from the backend
  useEffect(() => {
    const fetchHotelProfile = async () => {
      try {

        //const hotelID = "1"; // Example hotelID, replace dynamically as needed
        const fName = "Pet"; // Retrieve this from cookies or state
        const lName = "Hotel";   // Retrieve this from cookies or state

        const response = await axios.get(`http://localhost:5000/api/getHotelProfile/hostprofile/${fName}/${lName}`);
        console.log(`URL: http://localhost:5000/api/getHotelProfile/hostprofile/${fName}/${lName}`);
        console.log("Fetched hotel profile:", response.data);
        setHotelData(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching hotel profile:", err);
        setError("Failed to load hotel profile. Please try again later.");
        setLoading(false);
      }
    };

    fetchHotelProfile();
  }, []);

    useEffect(() => {
    const updateWidth = () => {
        if (containerRef.current && parentRef.current) {
            // Calculate total width minus parent width
            const containerScrollWidth = containerRef.current.scrollWidth;
            const parentOffsetWidth = parentRef.current.offsetWidth;
            setTotalWidth(containerScrollWidth - parentOffsetWidth);
        }
        };
    
        updateWidth(); // Set initial width
        window.addEventListener('resize', updateWidth);
    
        return () => {
        window.removeEventListener('resize', updateWidth);
        };
    }, [])
    
    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
  
    const { hotelID, hotelPhoto, hotelName, hotelType, hotelDescription, hotelPolicy, hotelAddress, fName, lName, phone, rooms, bookings } = hotelData;

  return (
    <>
      <Navbar />
      <div className=" text-[4.5vw] md:text-3xl lg:text-4xl text-start mt-24 md:mt-28 lg:mt-32 w-11/12 xl:w-10/12 max-w-[1200px] mx-auto font-bold text-pethub-color1">PETHUB <span className="font-normal text-black">Hotel Management</span></div>
      <div className="text-start mt-[5vw] md:mt-8 lg:mt-8 w-11/12 xl:w-10/12 max-w-[1200px] h-[35vw] md:h-[270px] lg:h-[350px] mx-auto rounded-md overflow-hidden border-[1px] p-[2vw] md:p-5 relative flex shadow-xl">
        <div className="absolute top-1 lg:top-3 left-0 bottom-1 lg:bottom-3 w-[1vw] md:w-[5px] bg-pethub-color6"></div>
        <div className="absolute top-1 lg:top-3 right-0 bottom-1 lg:bottom-3 w-[1vw] md:w-[5px] bg-pethub-color1"></div>
        <div className="w-[35vw] md:w-[270px] lg:w-[350px] xl:w-[400px] h-full bg-slate-200 rounded-sm overflow-hidden relative">
            <img className="absolute w-full h-full object-cover" src={hotelPhoto} alt="" />
        </div>
        <div className="h-full flex flex-col justify-between grow px-[2vw] pt-[2vw] md:px-4 md-pt-4 lg:px-7 lg:pt-7">
            <div className="flex flex-col gap-[1vw] md:gap-3">
                <div className="flex justify-between items-end">
                    <div className="text-[2.5vw] md:text-lg lg:text-2xl font-semibold">ชื่อจดทะเบียน: <span className="text-pethub-color1">{hotelName}</span></div>
                    <div className="hidden md:block text-[1.5vw] md:text-xs lg:text-lg">{hotelID}</div>
                </div>
                <div className="text-[2vw] md:text-sm lg:text-lg font-semibold transition-all duration-300 ease-in-out line-clamp-1 overflow-hidden">สถานที่ตั้ง: <span className="text-pethub-color6 font-normal">{hotelAddress}</span></div>
                <div className="text-[2vw] md:text-sm lg:text-lg font-semibold">ประเภทที่พัก: <span className="text-pethub-color6 font-normal">{hotelType}</span></div>
                <div className="text-[2vw] md:text-sm lg:text-lg font-semibold">Cancelation Policy: <span className="text-pethub-color6 font-normal">{hotelPolicy}</span></div>
            </div>
            <div className="flex justify-between items-center">
                <div className="text-[2.5vw] md:text-base lg:text-xl font-semibold">ผู้ดูแล: <span className="text-[2vw] md:text-sm lg:text-base text-pethub-color6 font-normal">{fName} {lName}</span></div>
                <div className="text-[2.5vw] md:text-base lg:text-xl font-semibold">เบอร์โทร: <span className="text-[2vw] md:text-sm lg:text-base text-pethub-color6 font-normal">{phone}</span></div>
                <div className="text-[2vw] md:text-sm lg:text-base max-lg:hidden">ส่งคำร้องแก้ไขข้อมูล</div>
                
            </div>
        </div>
     </div>
     <div className="lg:px-14 text-[4vw] md:text-2xl lg:text-3xl text-start mt-[6vw] md:mt-10 lg:mt-16 w-11/12 xl:w-10/12 max-w-[1200px] mx-auto font-semibold">รายละเอียดโรงแรม</div>
     <div className="lg:px-20 my-2 md:my-5 w-11/12 xl:w-10/12 max-w-[1200px] mx-auto">
        <div className="md:mb-5 text-start text-[3vw] md:text-sm lg:text-base">คำอธิบายโรงแรม (Overview) & ข้อกำหนด</div>
        <TextEditor />

     </div>
     <div className=" text-[3vw] md:text-2xl lg:text-3xl text-start mt-[6vw] md:mt-10 lg:mt-16 w-11/12 xl:w-10/12 max-w-[1200px] mx-auto font-semibold">
    <div className="my-[2vw] md:my-4 w-full flex justify-between gap-5">
        <div>จัดการห้องพัก</div>
        <div className="flex justify-center items-center rounded-md md:btn bg-pethub-color1 md:bg-pethub-color1 text-white md:text-white h-[7vw] w-[15vw] sm:w-24 sm:h-10 md:w-28 font-medium text-[2vw] md:text-xs lg:text-sm xl:text-base">เพิ่มห้องพัก</div>
    </div>
     </div>
     <div className="w-11/12 xl:w-10/12 max-w-[1200px] mx-auto">
        <div ref={parentRef} className="md:mt-4 lg:mt-8 xl:mt-10 w-full overflow-hidden mx-auto relative h-[70vw] md:h-[550px]  lg:h-[650px]">
            <motion.div ref={containerRef} className="absolute h-[60vw] md:h-[500px] lg:h-[600px] rounded-md mx-auto md:py-5 flex gap-3 lg:gap-5" drag="x" dragConstraints={{ left: -totalWidth, right: 0 }} transition={{ type: "spring", stiffness: 300, damping: 30 }}>
              {rooms.map((room, index) => (
                    <div key={room.roomTypeID} className='w-[45vw] md:w-[350px] xl:w-[400px] bg-white rounded-lg overflow-hidden'>
                        <div className='w-full h-[50%] bg-slate-200'></div>
                        <div className='w-full h-[50%] p-[2vw] md:p-6 text-start'>
                            <div className='flex justify-between items-end'>
                                <div className='text-[2.5vw] md:text-lg lg:text-xl xl:text-2xl'>{room.roomTypeName}</div>
                                <div className='text-[2vw] md:text-sm lg:text-base xl:text-lg'>{room.roomSize} ตร.ม.</div>
                            </div>
                            {/* <div className='text-[1.8vw] md:text-sm lg:text-sm xl:text-lg md:my-1 lg:my-3'>ของเล่นแมว, อาหาร, อาบน้ำ, ดูแล 24 ชั่วโมง</div> */}
                            <div className='text-[1.8vw] md:text-sm lg:text-sm xl:text-lg md:my-1 lg:my-3'>{room.petAllowedType}</div>
                            <div className='text-[1.5vw] md:text-xs lg:text-sm xl:text-base transition-all duration-300 ease-in-out line-clamp-2 overflow-hidden text-gray-400'>{room.roomDetail}</div>
                            <div className='text-[2vw] md:text-base my-[1vw] md:my-2 lg:my-5'>{room.pricePerNight} บาท/คืน</div>
                            <a href={`/pethub-website/home/hostprofile/room${room.roomTypeID}`} className="flex justify-center items-center rounded-md md:btn bg-pethub-color1 md:bg-pethub-color1 text-white md:text-white w-full max-md:text-[2vw] h-[7vw] font-medium">
                                <a >จัดการห้องพัก</a>
                            </a>
                        </div>
                    </div>
                ))}
            </motion.div>
        </div>

     </div>
     <div className=" text-[3vw] md:text-2xl lg:text-3xl text-start mt-[6vw] md:mt-10 lg:mt-16 w-11/12 xl:w-10/12 max-w-[1200px] mx-auto font-semibold">ประวัติการจอง</div>
     <div className="w-11/12 xl:w-10/12 max-w-[1200px] mx-auto -my-16 lg:my-8">
        <div className="w-full my-[4vw] md:my-8">
        <div className="overflow-x-auto">
          <table className="table text-lg">
            {/* head */}
            <thead className="text-[2.5vw] sm:text-xs lg:text-sm xl:text-base">
              <tr>
                <th>หมายเลขการจอง</th>
                <th className="max-md:hidden">เช็คอิน</th>
                <th className="max-md:hidden">เช็คเอาท์</th>
                <th className="max-sm:hidden">ห้อง</th>
                <th>สถานะการจอง</th>
                <th></th>
              </tr>
            </thead>
            {/* row 1 */}
            {bookings.map((booking) => (
              <tbody  key={booking.bookingID}>
                <tr className="text-xs lg:text-sm xl:text-base">
                  <td>
                    <div className="flex items-center gap-4">
                      <div className="w-2 h-8 lg:h-10 xl:h-14 bg-green-500"></div>
                      <div className="transition-all duration-300 ease-in-out line-clamp-1 overflow-hidden">{booking.bookingID}</div>
                    </div>
                  </td>
                  <td  className="max-md:hidden">
                    <div className="transition-all duration-300 ease-in-out line-clamp-1 overflow-hidden">{formatDate(booking.checkInDate)}</div>
                  </td>
                  <td  className="max-md:hidden">
                    <div className="transition-all duration-300 ease-in-out line-clamp-1 overflow-hidden">{formatDate(booking.checkOutDate)}</div>
                  </td>
                  <td className="max-sm:hidden">
                    <div className="transition-all duration-300 ease-in-out line-clamp-1 overflow-hidden">{booking.roomTypeID}</div>
                  </td>
                  <td className="max-md:pr-0">
                    <span className="badge badge-ghost badge-sm bg-green-100 text-[2.5vw] sm:text-xs lg:text-sm xl:text-base">{booking.bookingStatus}</span>
                  </td>
                  <th>
                    <button className="btn btn-ghost btn-xs"><span className="max-lg:hidden ">รายละเอียด</span>

                    </button>
                  </th>
                </tr>
                {/* detail */}
              </tbody>

            ))}

            
          </table>
        </div>
        </div>
      </div>
    </>
  )
}

export default HostProfile

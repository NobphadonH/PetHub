import Navbar from "../../components/Navbar"
import { motion } from "framer-motion"
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";

function HostProfile() {

    //router state
    const navigate = useNavigate();
    //router state
    
    //page state
    const containerRef = useRef(null);
    const parentRef = useRef(null);
    const [totalWidth, setTotalWidth] = useState(0);
    const [readOnly, setReadOnly] = useState(true); 
    //page state

    //data state
    const [hotelData, setHotelData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [content, setContent] = useState({
      content1: "", 
      content2: "", 
      merge_content: "", 
    });
    //data state
    
    //function
    const updateHotelProfile = async () => {
      try {
        const fName = Cookies.get('user-fName');
        const lName = Cookies.get('user-lName');
    
        if (!fName || !lName) {
          setError("Missing user information in cookies. Please log in again.");
          return;
        }
    
        // Prepare the updated data
        const updatedData = {
          content1: content.content1,
          content2: content.content2,
          merge_content: content.merge_content,
        };
    
        // Make API request to update the hotel profile
        const response = await axios.put(`http://localhost:5000/api/getHotelProfile/updateHotelProfile/${fName}/${lName}`, updatedData);
        console.log("Hotel profile updated successfully:", response.data);
    
        // Optional: Show success notification
        alert("Hotel profile updated successfully");
      } catch (err) {
        console.error("Error updating hotel profile:", err);
        setError("Failed to update hotel profile. Please try again later.");
      }
    };
    
    const handleChange = (e) => {
      const { name, value } = e.target;
      setContent((prevContent) => {
        
        const newContent = { ...prevContent, [name]: value };

        newContent.merge_content = newContent.content1 + "\n" + newContent.content2;
        return newContent;
      });
    };

    
    const handleReadOnly = async () => {
      setReadOnly((prevReadOnly) => {
        const newReadOnly = !prevReadOnly;
        if (newReadOnly) {
          setContent((prevContent) => ({
            ...prevContent,
            merge_content: prevContent.content1 + "\n" + prevContent.content2,
          }));
          updateHotelProfile();
        }
        return newReadOnly;
      });
    };


    const formatDate = (date) => {
      if (!date) return '';
      
      const dateObj = new Date(date);
      const day = String(dateObj.getDate()).padStart(2, '0'); 
      const month = String(dateObj.getMonth() + 1).padStart(2, '0'); 
      const year = dateObj.getFullYear(); 
      
      return `${day}/${month}/${year}`; 
    };





    const handleDetailClick = (roomID) => {
      console.log(roomID);
      // Navigate to the specified route with the roomID
      navigate(`/pethub-website/hostprofile/${roomID}`);
    };

    const handleAddRoomClick = () => {
      navigate('/pethub-website/addrooms');
    };
    //function

  
    useEffect(() => {
      const fetchHotelProfile = async () => {
        try {
          const fName = Cookies.get('user-fName');
          const lName = Cookies.get('user-lName');

          if (!fName || !lName) {
            setError("Missing user information in cookies. Please log in again.");
            setLoading(false);
            navigate(-1);
            return;
        }
          const response = await axios.get(`http://localhost:5000/api/getHotelProfile/hostprofile/${fName}/${lName}`, {withCredentials: true});
          console.log(`URL: http://localhost:5000/api/getHotelProfile/hostprofile/${fName}/${lName}`);

          console.log("Fetched hotel profile:", response.data);
          if (response.data.verification !== "verified") {
            setError("Your hotel is not verified")
            setLoading(false);
            navigate(-1);
            return;
          }
          setHotelData(response.data);
          setLoading(false);
        } catch (err) {
          console.error("Error fetching hotel profile:", err);
          setError("Failed to load hotel profile. Please try again later.");
          setLoading(false);
          navigate(-1)
        }
      };
      fetchHotelProfile();
    }, []);

    // page control
    useEffect(() => {
    const updateWidth = () => {
        if (containerRef.current && parentRef.current) {
            const containerScrollWidth = containerRef.current.scrollWidth;
            const parentOffsetWidth = parentRef.current.offsetWidth;
            setTotalWidth(containerScrollWidth - parentOffsetWidth);
        }
        };
    
        updateWidth();
        window.addEventListener('resize', updateWidth);
    
        return () => {
        window.removeEventListener('resize', updateWidth);
        };
    }, [])

    useEffect(() => {
      if (hotelData) {
        setContent({
          content1: hotelData.hotelDescription || '',
          content2: hotelData.hotelPolicy || '',
          merge_content: `${hotelData.hotelDescription || ''}\n${hotelData.hotelPolicy || ''}`,
        });
      }
    }, [hotelData]);
    
    // loading page state until data come in
    if (loading) return <>
      <Navbar />
      <div className="h-[100vh] w-full flex items-center justify-center">
          <span className="loading loading-spinner text-error w-8"></span>    
      </div>
    </>;
    if (error) return <div>{error}</div>;
  
    // destucturing hotelData
    const { hotelID, hotelPhoto, hotelName, hotelType, hotelDescription, hotelPolicy, hotelAddress, fName, lName, phone, rooms, bookings } = hotelData;
    // destucturing hotelData
    

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
                {/* <div className="text-[2vw] md:text-sm lg:text-lg font-semibold">Cancelation Policy: <span className="text-pethub-color6 font-normal">{hotelPolicy}</span></div> */}
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
      <div className="md:mb-5 text-start text-[3vw] md:text-sm lg:text-base">
        คำอธิบายโรงแรม (Overview)
      </div>
      <textarea
        className="textarea w-full max-h-36 min-h-36 md:max-h-72 md:min-h-72 lg:min-h-96 lg:max-h-96 textarea-bordered hide-scrollbar text-[2vw] md:text-[1.4vw] xl:text-lg text-gray-600 p-[2vw] md:p-5"
        name="content1"
        placeholder={hotelDescription}
        value={content.content1}
        onChange={handleChange}
        readOnly={readOnly}
      ></textarea>
      <div className="md:my-5 text-start text-[3vw] md:text-sm lg:text-base">
        ข้อกำหนดของโรงแรม (Policy)
      </div>
      <textarea
        className="textarea w-full max-h-36 min-h-36 md:max-h-72 md:min-h-72 lg:min-h-96 lg:max-h-96 textarea-bordered hide-scrollbar text-[2vw] md:text-[1.4vw] xl:text-lg text-gray-600 p-[2vw] md:p-5"
        name="content2"
        placeholder={hotelPolicy}
        value={content.content2}
        onChange={handleChange}
        readOnly={readOnly}
      ></textarea>
      <button
        className={`${readOnly ? "bg-pethub-color6 md:bg-pethub-color6": "bg-pethub-color1 md:bg-pethub-color1"} flex justify-center items-center rounded-md md:btn  text-white md:text-white h-[7vw] w-[15vw] sm:w-24 sm:h-10 md:w-28 font-medium text-[2vw] md:text-xs lg:text-sm xl:text-base`}
        onClick={handleReadOnly} // Toggles readOnly state
      >
        {readOnly ? "แก้ไขข้อมูล" : "บันทึก"}
      </button>

      {/* Optionally, you can render merged content here for testing */}
    </div>
     <div className=" text-[3vw] md:text-2xl lg:text-3xl text-start mt-[6vw] md:mt-10 lg:mt-16 w-11/12 xl:w-10/12 max-w-[1200px] mx-auto font-semibold">
    <div className="my-[2vw] md:my-4 w-full flex justify-between gap-5">
        <div>จัดการห้องพัก</div>
        <button
        className="flex justify-center items-center rounded-md md:btn bg-pethub-color1 md:bg-pethub-color1 text-white md:text-white h-[7vw] w-[15vw] sm:w-24 sm:h-10 md:w-28 font-medium text-[2vw] md:text-xs lg:text-sm xl:text-base"
        onClick={handleAddRoomClick} // Handle click to navigate
      >
        เพิ่มห้องพัก
      </button>
    </div>
     </div>
     <div className="w-11/12 xl:w-10/12 max-w-[1200px] mx-auto">
        <div ref={parentRef} className="md:mt-4 lg:mt-8 xl:mt-10 w-full overflow-hidden mx-auto relative h-[70vw] md:h-[550px]  lg:h-[650px]">
            <motion.div ref={containerRef} className="absolute h-[60vw] md:h-[500px] lg:h-[600px] rounded-md mx-auto md:py-5 flex gap-3 lg:gap-5" drag="x" dragConstraints={{ left: -totalWidth, right: 0 }} transition={{ type: "spring", stiffness: 300, damping: 30 }}>
              {rooms?.map((room, index) => (
                    <div key={room.roomTypeID} className='w-[45vw] md:w-[350px] xl:w-[400px] bg-white rounded-lg overflow-hidden'>
                        <div className='w-full h-[50%] bg-slate-200 relative overflow-hidden'>
                          <img className="absolute w-full h-full object-cover" src={room.roomPhoto} alt="" />
                        </div>
                        <div className='w-full h-[50%] p-[2vw] md:p-6 text-start'>
                            <div className='flex justify-between items-end'>
                                <div className='text-[2.5vw] md:text-lg lg:text-xl xl:text-2xl'>{room.roomTypeName}</div>
                                <div className='text-[2vw] md:text-sm lg:text-base xl:text-lg'>{room.roomSize} ตร.ม.</div>
                            </div>
                            {/* <div className='text-[1.8vw] md:text-sm lg:text-sm xl:text-lg md:my-1 lg:my-3'>ของเล่นแมว, อาหาร, อาบน้ำ, ดูแล 24 ชั่วโมง</div> */}
                            <div className='text-[1.8vw] md:text-sm lg:text-sm xl:text-lg md:my-1 lg:my-3'>{room.petAllowedType}</div>
                            <div className='text-[1.5vw] md:text-xs lg:text-sm xl:text-base transition-all duration-300 ease-in-out line-clamp-2 overflow-hidden text-gray-400'>{room.roomDetail}</div>
                            <div className='text-[2vw] md:text-base my-[1vw] md:my-2 lg:my-5'>{room.pricePerNight} บาท/คืน</div>
                            <button
                              className="flex justify-center items-center rounded-md md:btn bg-pethub-color1 md:bg-pethub-color1 text-white md:text-white w-full max-md:text-[2vw] h-[7vw] font-medium"
                              onClick={() => handleDetailClick(room.roomTypeID, index)}>
                              จัดการห้องพัก
                            </button>
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
            {bookings?.map((booking) => (
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
                    <div className="transition-all duration-300 ease-in-out line-clamp-1 overflow-hidden">{booking.roomTypeName}</div>
                  </td>
                  <td className="max-md:pr-0">
                    <span className="badge badge-ghost badge-sm bg-green-100 text-[2.5vw] sm:text-xs lg:text-sm xl:text-base">{booking.bookingStatus}</span>
                  </td>
                  <th>
                    <button className="btn btn-ghost btn-xs" onClick={() => handleDetailClick(booking.roomTypeID)}><span className="max-lg:hidden ">รายละเอียด</span>

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

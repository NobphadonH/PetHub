 import Navbar from './Utils/Navbar'
import Footer from './Utils/Footer'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import Cookies from 'js-cookie';
import { motion } from 'framer-motion'
import { toast } from "react-toastify";
import axios from 'axios';

function HotelDetail() {
    let param = useParams()
    const mapRef = useRef(null); 
    const containerRef = useRef(null);
    const parentRef = useRef(null);
    const [totalWidth, setTotalWidth] = useState(0);
    const [barSel, setBarSel] = useState(0)
    const [currentDate, setCurrentDate] = useState('');
    const [submitReview, setSubmitReview] = useState(0);
    const [reviewData, setReviewData] = useState();
    const [newReview, setNewReview] = useState({reviewDetail:"", reviewScore:0});

    const navigate = useNavigate()
    const location = useLocation()
    
    const emptyStarIconURL = "M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"; // Example
    const filledStarIconURL = "M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"

    const hotelData = location.state;
    console.log("HOTELDATA");
    // console.log(hotelData);
    
    const petIcon = {"สุนัข": "🐶", "แมว":"🐱", "อื่น ๆ":"🫎"}
    
    useEffect(() => {
        const fetchData = async () => {
            try{
                const res = await axios.get(`http://localhost:5000/api/review/getReview/${hotelData.hotelID}` , {withCredentials: true});
                console.log(res.data.reviews);
                setReviewData(res.data.reviews);

            } catch (err) {
                console.log(err);
            }
        }
        fetchData()
        console.log(reviewData)
    }, [submitReview, hotelData])

    useEffect(() => {
        console.log(hotelData);
        const today = new Date();
        const year = today.getFullYear();   
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(today.getDate()).padStart(2, '0');
        setCurrentDate(`${year}-${month}-${day}`);


        
        const loadScript = () => {
          const script = document.createElement('script');
          script.src = "https://api.longdo.com/map/?key=2b0da15d101163c9f1968c6c656c8ca5";
          script.async = true;
          script.onload = () => initMap();
          document.head.appendChild(script);
        };
    
        const initMap = () => {
          const map = new window.longdo.Map({
            placeholder: document.getElementById('map'),
            ui: window.longdo.UiComponent.Mobile
          });
    
          mapRef.current = map;
    
          var marker = new window.longdo.Marker({lon: hotelData.mapLong, lat: hotelData.mapLat });
        
          map.Overlays.add(marker);
          map.zoomRange({ min: 6, max: 20 });
          map.location({lon: hotelData.mapLong, lat: hotelData.mapLat }, true);
        //   map.Ui.DPad.visible(false);
          map.Ui.Zoombar.visible(false);
          map.Ui.Geolocation.visible(false);
        //   map.Ui.Toolbar.visible(false);
        //   map.Ui.LayerSelector.visible(false);
        //   map.Ui.Fullscreen.visible(false);
        //   map.Ui.Crosshair.visible(true);
        //   map.Ui.Scale.visible(true);
        };
    
        if (!window.longdo) {
          loadScript();
        } else {
          initMap();
        }

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
      }, []);
    
      const handleAddressRightClick = (e) => {
        e.preventDefault(); // Prevent the default context menu from appearing
      
        if (mapRef.current) {
          mapRef.current.location(
            { lon: hotelData.mapLong, lat: hotelData.mapLat },
            true
          );
          mapRef.current.zoom(14, true);
        }
      };
      

    const handleSelect = (e) => {
        setBarSel(e.target.id)
    }

    const handleReviewChange = (e) => {
        const { name, value } = e.target;
        setNewReview((prev) => ({ ...prev, [name]: value }));
        console.log(newReview)
      };


    const handleStarClick = (score) => {
        setNewReview((prevState) => ({
            ...prevState,
            reviewScore: score, // Update the reviewScore in newReview
        }));
    };

    console.log(barSel)
    const checkIn = hotelData.checkIn
    const checkOut = hotelData.checkOut
    const hotelPhoto = hotelData.hotelPhoto
    const hotelName = hotelData.hotelName
    const reviewScore = hotelData.avgReviewScore
    const reviewCount = hotelData.reviewCount

    const goBooking = (room) => {
        const roomData = {
            ...room,
            checkIn,
            checkOut,
            hotelPhoto,
            hotelName,
            reviewScore,
            reviewCount
        }
        const token = Cookies.get("user-auth");
        const role = Cookies.get("user-role")

      
        if (!token) {
          navigate("/pethub-website/signin");
          return;
        } else {
            console.log(hotelData);
            navigate(`/pethub-website/home/${hotelData.hotelName}/${room.roomTypeName}`, { state: roomData});

            // if (role != "Client"){
            //     toast.error("Account นี้ไม่สามารถจองห้องพักได้");
            // }else{
            //     console.log(hotelData);
            //     navigate(`/pethub-website/home/${hotelData.hotelName}/${room.roomTypeName}`, { state: roomData, hotelState: hotelData });

            // }
        }

      };
      
    function mapHotelType(typeNumber) {
    switch (typeNumber) {
        case "1":
        return "โรงแรมสัตว์เลี้ยงระดับมืออาชีพ";
        case "2":
        return "เดย์แคร์สัตว์เลี้ยง";
        case "3":
        return "โรงพยาบาลหรือคลินิกสัตว์";
        case "4":
        return "คาเฟ่สัตว์";
        default:
        return "ไม่ทราบประเภทโรงแรม"; // Default case for unknown types
    }
    }
      


  return (
    <>
     <Navbar /> 
     <div className='mt-20 md:mt-28 w-[96vw] lg:w-11/12 xl:w-11/12 2xl:w-[1280px] grid grid-cols-12 grid-rows-2 h-[500px] max-lg:h-[45vw] xl:h-[600px] mx-auto gap-1 lg:gap-3 xl:gap-5'>
        {/* <div className='col-start-8 rounded-md col-span-5 row-span-1 bg-gray-300'></div>
        <div className='col-start-8 rounded-md col-span-5 row-start-2 bg-gray-300'></div> */}
        <div className='row-start-1 rounded-md col-span-12 row-span-2 bg-gray-300 relative overflow-hidden'>
            <img src={hotelData.hotelPhoto} className="absolute w-full h-full bg-gray-300" />

        </div>
        

     </div>
     <div className='mt-5 md:mt-10 w-[96vw] lg:w-11/12 xl:w-11/12 2xl:w-[1280px] h-full mx-auto'>
        <div className='w-full lg:h-20 flex gap-5 text-[10px] sm:text-[2vw] md:text-lg xl:text-xl font items-center'>
            <div id='0' onClick={handleSelect} className={`px-3 lg:px-5 py-1 lg:py-2 border-pethub-color1 cursor-pointer ${barSel == 0 ? ' border-b-2 font-bold' : ''}`}>Overview</div>
            <div id='1' onClick={handleSelect} className={`px-3 lg:px-5 py-1 lg:py-2 border-pethub-color1 cursor-pointer ${barSel == 1 ? ' border-b-2 font-bold' : ''}`}>Guest reviews</div>
        </div>
     </div>
     <div className='w-full h-full bg-[#F4F4F4]'>
        <div className='w-[90vw] lg:w-11/12 xl:w-10/12 2xl:w-[1280px] h-full md:h-[600px] lg:h-[1000px] mx-auto py-[1vw] lg:py-10 flex flex-wrap md:grid grid-cols-12 grid-rows-12 gap-x-[3%] md:gap-4'>
            <div className='max-md:basis-full col-span-12 md:col-span-8 row-span-3 lg:row-span-2 max-md:py-[2vw] max-lg:py-5'>
                <h1 className='text-start text-[5vw] md:text-2xl lg:text-3xl xl:text-5xl uppercase font-bold '>{hotelData.hotelName}</h1>
                <div className="flex my-[1vw] md:my-3 lg:my-4 gap-1 items-center">
                    {Array.from({ length: hotelData.avgReviewScore }).map((_, index) => (
                    <svg key={index} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill w-[8px] sm:w-[12px] lg:w-[16px] text-yellow-400" viewBox="0 0 16 16">
                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                    </svg>
                    ))}
                    <div className="max-md:text-[2vw] ml-1 md:ml-3">
                    {parseFloat(hotelData.avgReviewScore).toFixed(2)} ({hotelData.reviewCount} Reviews)
                    </div>
                </div>
                <a href= {`https://www.google.com/maps?q=${hotelData.mapLat},${hotelData.mapLong}`} target="_blank" className='flex gap-3 items-center justify-start text-gray-400'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="cursor-pointer bi bi-geo-alt text-blue-400 max-md:w-[16px]" viewBox="0 0 16 16">
                        <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10"/>
                        <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                    </svg>
                    <div className='hover:text-blue-500 cursor-pointer text-start text-[10px] sm:text-[2vw] md:text-[14px] xl:text-lg  transition-all duration-300 ease-in-out max-lg:line-clamp-1 max-lg:overflow-hidden'>{hotelData.hotelAddress}</div>
                </a>
            </div>
            <div className='max-md:w-full max-md:h-[40vw] max-md:my-[2vw] bg-white rounded-md col-span-12 md:col-span-4 row-span-4'>
            <div
                id="map"
                style={{ height: '100%', width: '100%', borderRadius: '6px', overflow: 'hidden' }} // Full height and width
            ></div>
            </div>
            <div className={`max-md:w-[60%] ${barSel == 1 ? 'max-md:h-full' : 'max-md:h-[250px]'}   overflow-y-hidden bg-white rounded-md col-span-8 lg:col-span-8 row-span-10 max-md:p-[3vw] max-lg:px-8 max-lg:py-4 py-12 px-14 text-start`}>
                <div className={`text-[3vw] lg:text-2xl font-semibold mb-[1vw] md:mb-6 overflow-y  ${barSel == 0 ? '' : 'hidden'}`}>Overview</div>
                <div className={`text-[2vw] md:text-sm max-md:h-[160px] h-[80%] lg:h-[90%] px-4 overflow-y-scroll hide-scrollbar ${barSel == 0 ? '' : 'hidden'}`}>
                    <p>{hotelData.hotelDescription}</p>
                    <div className='text-md lg:text-xl my-[1vw] md:my-6 overflow-y'>ข้อกำหนด</div>
                    <div>
                        <p>{hotelData.hotelPolicy}</p>
                    </div>

                </div>
                <div className={`text-[2vw] lg:text-xl font-semibold mb-[1vw] md:mb-6 overflow-y  ${barSel == 1 ? '' : 'hidden'}`}>{parseFloat(hotelData.avgReviewScore).toFixed(2) } <span className='text-[1.5vw] lg:text-lg'>{"รีวิวจากผู้ใช้ "+ hotelData.reviewCount +" รายการ"}</span></div>
                <div className={`mb-[2vw] md:mb-5 text-[1.5vw] md:text-xs lg:text-sm xl:text-base text-gray-400 ${barSel == 1 ? '' : 'hidden'}`}></div>
                <div className={`text-[2vw] md:text-sm max-md:h-[160px] h-[45%] lg:h-[60%] md:px-2 xl:px-4 overflow-y-scroll scrollbar-hidden flex flex-col gap-1 lg:gap-5 ${barSel == 1 ? '' : 'hidden'}`}>
                    { reviewData ? (reviewData.map( (review, index) => (
                        <div key={index} className='w-full h-28 flex'>

                        <div className='h-full w-[80%] md:py-2 px-1 lg:px-5 text-[1.5vw] md:text-xs lg:text-base'>
                            <div>{review.fName}</div>
                            <div className="flex md:my-[1vw] lg:my-1 items-center">
                            {Array.from({ length: review.reviewScore }).map((_, index) => (
                            <svg key={index} xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-star-fill w-[1.5vw] md:w-[8px] mx-[0.2vw] lg:mx-0 sm:w-[10px] lg:w-[16px] text-yellow-400" viewBox="0 0 16 16">
                                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                            </svg>
                            ))}

                        </div>
                        <div> {review.reviewDetail} </div>
                        </div>
                    </div>
                    ))): (<div></div>)
                    
                    }

                </div>
                <div className={`${barSel == 1 ? '' : 'hidden'}`}>
                    <div className='w-full h-[18vw] md:h-[160px] lg:h-[200px] flex py-[3vw] md:py-5 lg:py-8'>

                        <div className='h-full w-[70%] md:w-[60%] xl:w-[65%] px-2 md:py-2 lg:px-5 text-[2vw] md:text-sm lg:text-base'>
                            <div>{Cookies.get("user-fName")}</div>
                            <div className="flex lg:my-4 gap-[0.3vw] md:gap-1 lg:gap-2 items-center">
                            {Array.from({ length: 5 }).map((_, index) => (
                                <svg
                                    key={index}
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className="cursor-pointer bi bi-star-fill w-[8px] sm:w-[12px] lg:w-[16px]"
                                    viewBox="0 0 16 16"
                                    onClick={() => handleStarClick(index + 1)} // Update reviewScore on click
                                >
                                    <path
                                        d={
                                            index < newReview.reviewScore
                                                ? filledStarIconURL
                                                : emptyStarIconURL
                                        }
                                        className={
                                            index < newReview.reviewScore
                                                ? "text-yellow-500"
                                                : "text-gray-400"
                                        } 
                                    />
                                </svg>
                            ))}

                        </div>
                        <div>
                        <input
                            type="text"
                            onChange={handleReviewChange}
                            name="reviewDetail"
                            placeholder="แสดงความคิดเห็น"
                            value ={newReview.reviewDetail || ""}
                            className="rounded-none w-full border-b-2 mb-3"
                        />
                        </div>
                        </div>
                        <div className='h-full w-[20%] md:w-[30%] xl:w-[25%] cursor-pointer flex items-center md:items-end py-[1vw] md:py-7 justify-between gap-1 text-[2vw] md:text-xs lg:text-base'>
                            <button className='hidden md:block'>ส่งความคิดเห็น</button>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="md:hidden w-[2vw] h-[2vw] text-base-300 bi bi-send-fill" viewBox="0 0 16 16">
                            <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z"/>
                            </svg>
                        </div>
                    </div>
                </div>
                
            </div>
            <div className='max-md:w-[35%] max-md:h-full bg-white rounded-md col-start-9 col-span-4 row-span-5 p-[3vw] md:p-3 lg:p-5'>
                <div className='flex gap-[1vw] lg:gap-2 items-center justify-center'>
                    <div className='text-[2vw] lg:text-xl font-semibold transition-all duration-300 ease-in-out line-clamp-1 overflow-hidden'>โรงแรม {param.hotelname}</div>
                    <svg xmlns="http://www.w3.org/2000/svg" className='w-[3vw] lg:w-12' width={20} height={20} viewBox="0 0 640 512"><path d="M32 32c17.7 0 32 14.3 32 32l0 256 224 0 0-160c0-17.7 14.3-32 32-32l224 0c53 0 96 43 96 96l0 224c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-32-224 0-32 0L64 416l0 32c0 17.7-14.3 32-32 32s-32-14.3-32-32L0 64C0 46.3 14.3 32 32 32zm144 96a80 80 0 1 1 0 160 80 80 0 1 1 0-160z"/></svg>
                </div>
                <div className='flex flex-col justify-between h-[90%] text-[2vw] md:text-sm lg:text-lg'>
                    <div className='w-full '>
                        <div className='flex justify-between items-center mt-[1vw] md:mt-5'>
                            <div className='text-start'>ประเภท: </div>
                            <div className='max-w-60 font-normal transition-all duration-300 ease-in-out line-clamp-1 overflow-hidden'>{(hotelData.hotelType)}</div>
                        </div>
                        <div className='flex justify-between items-start mt-2'>

                        </div>
                        <div className='flex justify-between items-start mt-2'>
                            <div className='text-start transition-all duration-300 ease-in-out line-clamp-1 overflow-hidden'>สัตว์เลี้ยงที่รับ: </div>
                            <div className='max-w-40 flex gap-2'>
                            {hotelData.roomsAvailable[0].petAllowedType}                          
                            </div>
                            </div>
                        <div className='flex justify-between items-start mt-2'>
                            <div className='text-start'>ราคา: </div>
                            <div className='flex justify-end gap-2'>
                                <div className='max-w-40 font-normal transition-all duration-300 ease-in-out line-clamp-1 overflow-hidden'> {hotelData.roomsAvailable[0].pricePerNight} บาท</div>
  

                            </div>
                        </div>
                    </div>
                    <div className=' mt-6 md:mt-0'>
                        {/* <div className='text-start text-[2vw] md:text-sm md:my-2 transition-all duration-300 ease-in-out line-clamp-1 overflow-hidden text-gray-400'>ท่านสามารถติดต่อทางโรงแรมเพื่อสอบถามข้อมูลเพิ่มเติม</div>
                        <a className="flex justify-center items-center rounded-md md:btn bg-pethub-color1 md:bg-pethub-color1 text-white md:text-white w-full max-md:text-[2vw] h-[7vw] font-medium">
                            <a >ติดต่อสอบถาม</a>
                        </a> */}

                    </div>

                </div>
            </div>
            
        </div>
        <div className='mt-5 md:mt-5 w-[96vw] lg:w-11/12 xl:w-11/12 2xl:w-[1280px] h-full mx-auto px-5'>
            <div className='flex items-start lg:items-center justify-between flex-col lg:flex-row'>
                <div className='text-start text-[5vw] sm:text-xl lg:text-2xl xl:text-3xl font-semibold'>Available rooms</div>

            </div>
            <div ref={parentRef} className="md:mt-4 lg:mt-8 xl:mt-10 w-full overflow-hidden mx-auto relative h-[70vw] md:h-[550px]  lg:h-[650px]">
            <motion.div ref={containerRef} className="absolute h-[60vw] md:h-[500px] lg:h-[600px] rounded-md mx-auto md:py-5 flex gap-3 lg:gap-5" drag="x" dragConstraints={{ left: -totalWidth, right: 0 }} transition={{ type: "spring", stiffness: 300, damping: 30 }}>
                {hotelData.roomsAvailable.map((room, index) => (
                    <div key={index} className='w-[45vw] md:w-[350px] xl:w-[400px] bg-white rounded-lg overflow-hidden'>
                        <div className='w-full h-[50%] bg-slate-200'>
                            <img src={room.roomPhoto} className="w-full h-full object-cover rounded-md" />
                        </div>
                        <div className='w-full h-[50%] p-[2vw] md:p-6 text-start'>
                            <div className='flex justify-between items-end'>
                                <div className='text-[2.5vw] md:text-lg lg:text-xl xl:text-2xl'>{room.roomTypeName} ({room.petAllowedType})</div>
                                <div className='text-[2vw] md:text-sm lg:text-base xl:text-lg'>{room.roomSize} ตรม</div>
                            </div>
                            <div className='text-[2vw] md:text-xs lg:text-sm xl:text-base transition-all duration-300 ease-in-out line-clamp-2 overflow-hidden text-gray-400'>
                                {room.roomDetail.length > 150 ? room.roomDetail.substring(0, 150) + '...' : room.roomDetail}
                            </div>
                            <div className='text-[2vw] md:text-base my-[1vw] md:my-2 lg:my-5'>{parseFloat(room.pricePerNight).toFixed(0) } บาท/คืน</div>
                            <button onClick={() => goBooking(room)} className="flex justify-center items-center rounded-md md:btn bg-pethub-color1 md:bg-pethub-color1 text-white md:text-white w-full max-md:text-[2vw] h-[7vw] font-medium" >
                                จองห้อง
                            </button>

                        </div>
                    </div>
                ))}
            </motion.div>
            </div>
        </div>
     </div>
     <Footer />
    </>
  )
}

export default HotelDetail
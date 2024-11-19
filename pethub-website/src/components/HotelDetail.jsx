 import Navbar from './Utils/Navbar'
import Footer from './Utils/Footer'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import Cookies from 'js-cookie';
import { motion } from 'framer-motion'

function HotelDetail() {
    let param = useParams()
    const mapRef = useRef(null); 
    const containerRef = useRef(null);
    const parentRef = useRef(null);
    const [totalWidth, setTotalWidth] = useState(0);
    const [barSel, setBarSel] = useState(0)
    const [currentDate, setCurrentDate] = useState('');
    
    const navigate = useNavigate()
    const location = useLocation()
    
    const hotelData = location.state;
    console.log("HOTELDATA");
    // console.log(hotelData);
    
    const petIcon = {"สุนัข": "🐶", "แมว":"🐱", "อื่น ๆ":"🫎"}
    

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

    console.log(barSel)
    const checkIn = hotelData.checkIn
    const checkOut = hotelData.checkOut
    const goBooking = (room) => {
        const token = Cookies.get("user-auth");
      
        if (!token) {
          navigate("/pethub-website/signin");
          return;
        }
      
        const roomData = {
          ...room,
          checkIn,
          checkOut
        };
        console.log(hotelData);
        navigate(`/pethub-website/home/${hotelData.hotelName}/${room.roomTypeName}`, { state: roomData, hotelState: hotelData });
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
                    {/* <p>Bangmod Pet Hotel เป็นโรงแรมสัตว์เลี้ยงระดับพรีเมียม ตั้งอยู่ในย่านบางมด กรุงเทพมหานคร ที่ออกแบบมาเพื่อตอบโจทย์ความต้องการของเจ้าของสัตว์เลี้ยงที่มองหาที่พักอันปลอดภัย สะดวกสบาย และทันสมัยสำหรับเพื่อนขนฟูของพวกเขา เราให้บริการที่พักทั้งระยะสั้นและระยะยาว พร้อมสิ่งอำนวยความสะดวกครบครันและการดูแลอย่างใกล้ชิดจากผู้เชี่ยวชาญด้านสัตว์เลี้ยง</p>
                    
                    <p>โรงแรมของเรามีพื้นที่กว้างขวาง รวมถึงห้องพักที่สะอาดและมีระบบควบคุมอุณหภูมิที่เหมาะสม พร้อมสนามวิ่งเล่นสำหรับสัตว์เลี้ยง และโซนกิจกรรมที่ออกแบบมาเพื่อความสนุกสนานและการออกกำลังกายของสัตว์เลี้ยง นอกจากนี้ เรายังมีบริการดูแลพิเศษ เช่น การอาบน้ำ ตัดขน และตรวจสุขภาพเบื้องต้น โดยทีมงานที่มีความรักและประสบการณ์ในการดูแลสัตว์เลี้ยง</p>
                    
                    <p>ไม่ว่าคุณจะมีสุนัข แมว หรือสัตว์เลี้ยงชนิดอื่น ๆ เราพร้อมให้บริการและดูแลพวกเขาด้วยความรักและความใส่ใจ เพื่อให้คุณมั่นใจได้ว่าสัตว์เลี้ยงของคุณจะได้รับการดูแลเป็นอย่างดีระหว่างการเข้าพักที่ Bangmod Pet Hotel.</p> */}
                    <div className='text-md lg:text-xl my-[1vw] md:my-6 overflow-y'>ข้อกำหนด</div>
                    <div>
                        <p>{hotelData.hotelPolicy}</p>
                        {/* <h2>ข้อกำหนดในการเข้าพักที่ Bangmod Pet Hotel</h2>

                        <h3>ประเภทสัตว์เลี้ยงที่รับบริการ:</h3>
                        <ol className="list-decimal ml-5">
                            <li>รับเฉพาะสุนัขและแมวเท่านั้น (น้ำหนักไม่เกิน 30 กิโลกรัม)</li>
                            <li>สัตว์เลี้ยงต้องมีสุขภาพดี ไม่มีโรคติดต่อหรือปัญหาสุขภาพร้ายแรง</li>
                        </ol>

                        <h3>วัคซีนและสุขภาพ:</h3>
                        <ol className="list-decimal ml-5">
                            <li>สัตว์เลี้ยงต้องได้รับการฉีดวัคซีนครบถ้วนตามกำหนด...</li>
                            <li>เจ้าของต้องแสดงหลักฐานการฉีดวัคซีนในวันที่เช็คอิน</li>
                            <li>ไม่รับสัตว์เลี้ยงที่มีอาการป่วยหรือแสดงอาการของโรคติดต่อ</li>
                        </ol>

                        <h3>พฤติกรรมของสัตว์เลี้ยง:</h3>
                        <ol className="list-decimal ml-5">
                            <li>สัตว์เลี้ยงต้องไม่มีพฤติกรรมก้าวร้าวหรือเป็นอันตราย...</li>
                            <li>หากสัตว์เลี้ยงมีประวัติการกัดหรือทำร้ายผู้อื่น กรุณาแจ้งให้ทราบล่วงหน้า</li>
                        </ol>

                        <h3>การเช็คอินและเช็คเอาท์:</h3>
                        <ol className="list-decimal ml-5">
                            <li>เวลาเช็คอิน: 09:00 - 18:00 น.</li>
                            <li>เวลาเช็คเอาท์: 09:00 - 12:00 น.</li>
                            <li>เจ้าของต้องเตรียมอาหารและของใช้ส่วนตัว...</li>
                        </ol>

                        <h3>การยกเลิกและคืนเงิน:</h3>
                        <ol className="list-decimal ml-5">
                            <li>การยกเลิกการเข้าพักต้องแจ้งล่วงหน้าอย่างน้อย 48 ชั่วโมง...</li>
                            <li>หากยกเลิกภายใน 24 ชั่วโมง จะมีค่าธรรมเนียม 50%...</li>
                        </ol>

                        <h3>การดูแลพิเศษ:</h3>
                        <ol className="list-decimal ml-5">
                            <li>หากสัตว์เลี้ยงต้องการการดูแลพิเศษ กรุณาแจ้งให้ทราบล่วงหน้า...</li>
                        </ol>

                        <h3>ความรับผิดชอบ:</h3>
                        <ol className="list-decimal ml-5">
                            <li>ทางโรงแรมไม่รับผิดชอบความเสียหายที่เกิดจากพฤติกรรมของสัตว์เลี้ยง...</li>
                            <li>ในกรณีฉุกเฉินที่สัตว์เลี้ยงมีอาการป่วย...</li>
                        </ol>

                        <p >หมายเหตุ: โปรดทำความเข้าใจและยอมรับข้อกำหนดเหล่านี้ก่อนทำการจองเพื่อประสบการณ์ที่ราบรื่นและปลอดภัยสำหรับสัตว์เลี้ยงของท่าน</p> */}
                    </div>

                </div>
                <div className={`text-[2vw] lg:text-xl font-semibold mb-[1vw] md:mb-6 overflow-y  ${barSel == 1 ? '' : 'hidden'}`}>5 คะแนน <span className='text-[1.5vw] lg:text-lg'>(รีวิวจากผู้ใช้ 125 รายการ)</span></div>
                <div className={`mb-[2vw] md:mb-5 text-[1.5vw] md:text-xs lg:text-sm xl:text-base text-gray-400 ${barSel == 1 ? '' : 'hidden'}`}>ความนิยมสูงสุด</div>
                <div className={`text-[2vw] md:text-sm max-md:h-[160px] h-[45%] lg:h-[60%] md:px-2 xl:px-4 overflow-y-scroll scrollbar-hidden flex flex-col gap-1 lg:gap-5 ${barSel == 1 ? '' : 'hidden'}`}>
                    {Array.from({ length: 5 }).map((_, index) => (
                        <div key={index} className='w-full h-28 flex'>
                            <div className='h-full w-[15%] lg:w-[10%] flex items-start justify-center'>
                                <div className='w-[5vw] h-[5vw] md:w-10 md:h-10 lg:w-12 lg:h-12 xl:w-14 xl:h-14 rounded-full bg-slate-200'></div>
                            </div>
                            <div className='h-full w-[80%] md:py-2 px-1 lg:px-5 text-[1.5vw] md:text-xs lg:text-base'>
                                <div>User001</div>
                                <div className="flex md:my-[1vw] lg:my-1 items-center">
                                {Array.from({ length: 5 }).map((_, index) => (
                                <svg key={index} xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-star-fill w-[1.5vw] md:w-[8px] mx-[0.2vw] lg:mx-0 sm:w-[10px] lg:w-[16px] text-yellow-400" viewBox="0 0 16 16">
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                </svg>
                                ))}
                                <div className="max-md:text-[1.5vw] ml-1 md:ml-3">
                                ดีมาก
                                </div>
                            </div>
                            <div>ห้องพักดีมากๆ เลยครับ</div>
                            <div className='flex mt-2 items-center justify-start gap-[1vw] md:gap-1 lg:gap-3 text-[1.5vw] md:text-xs lg:text-base'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-hand-thumbs-up-fill text-gray-200 w-[3vw] md:w-8 lg:w-15" viewBox="0 0 16 16">
                                <path d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a10 10 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733q.086.18.138.363c.077.27.113.567.113.856s-.036.586-.113.856c-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.2 3.2 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.8 4.8 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z"/>
                                </svg>
                                <div>58</div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-hand-thumbs-down-fill text-gray-200 w-[3vw] md:w-8 lg:w-12" viewBox="0 0 16 16">
                                <path d="M6.956 14.534c.065.936.952 1.659 1.908 1.42l.261-.065a1.38 1.38 0 0 0 1.012-.965c.22-.816.533-2.512.062-4.51q.205.03.443.051c.713.065 1.669.071 2.516-.211.518-.173.994-.68 1.2-1.272a1.9 1.9 0 0 0-.234-1.734c.058-.118.103-.242.138-.362.077-.27.113-.568.113-.856 0-.29-.036-.586-.113-.857a2 2 0 0 0-.16-.403c.169-.387.107-.82-.003-1.149a3.2 3.2 0 0 0-.488-.9c.054-.153.076-.313.076-.465a1.86 1.86 0 0 0-.253-.912C13.1.757 12.437.28 11.5.28H8c-.605 0-1.07.08-1.466.217a4.8 4.8 0 0 0-.97.485l-.048.029c-.504.308-.999.61-2.068.723C2.682 1.815 2 2.434 2 3.279v4c0 .851.685 1.433 1.357 1.616.849.232 1.574.787 2.132 1.41.56.626.914 1.28 1.039 1.638.199.575.356 1.54.428 2.591"/>
                                </svg>
                            </div>
                            </div>
                            <div className='h-full w-[5%] lg:w-[10%] cursor-pointer flex flex-col items-center justify-center gap-1'>
                                <div className='w-[0.4vw] h-[0.4vw] lg:w-1 md:h-1 bg-slate-400 rounded-full'></div>
                                <div className='w-[0.4vw] h-[0.4vw] lg:w-1 md:h-1 bg-slate-400 rounded-full'></div>
                                <div className='w-[0.4vw] h-[0.4vw] lg:w-1 md:h-1 bg-slate-400 rounded-full'></div>
                            </div>
                        </div>
                    ))}

                </div>
                <div className={`${barSel == 1 ? '' : 'hidden'}`}>
                    <div className='w-full h-[18vw] md:h-[160px] lg:h-[200px] flex py-[3vw] md:py-5 lg:py-8'>
                        <div className='h-full w-[10%] flex items-start justify-center'>
                            <div className='w-[5vw] h-[5vw] md:w-10 md:h-10 lg:w-12 lg:h-12 xl:w-14 xl:h-14 rounded-full bg-slate-200'></div>
                        </div>
                        <div className='h-full w-[70%] md:w-[60%] xl:w-[65%] px-2 md:py-2 lg:px-5 text-[2vw] md:text-sm lg:text-base'>
                            <div>main user</div>
                            <div className="flex lg:my-4 gap-[0.3vw] md:gap-1 lg:gap-2 items-center">
                            {Array.from({ length: 5 }).map((_, index) => (
                            <svg key={index} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className=" cursor-pointer bi bi-star-fill w-[8px] sm:w-[12px] lg:w-[16px] text-gray-400" viewBox="0 0 16 16">
                                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                            </svg>
                            ))}
                            <div className="max-md:text-[2vw] ml-1 md:ml-3">
                            ดีมาก
                            </div>
                        </div>
                        <div>
                        <input
                            type="email"
                            name="email"
                            placeholder="แสดงความคิดเห็น"
                            className="rounded-none w-full border-b-2 mb-3"
                        />
                        </div>
                        </div>
                        <div className='h-full w-[20%] md:w-[30%] xl:w-[25%] cursor-pointer flex items-center md:items-end py-[1vw] md:py-7 justify-between gap-1 text-[2vw] md:text-xs lg:text-base'>
                            <div className='hidden md:block'>ยกเลิก</div>
                            <div className='hidden md:block'>ส่งความคิดเห็น</div>
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
                            <div className='max-w-40 font-normal transition-all duration-300 ease-in-out line-clamp-1 overflow-hidden'>{mapHotelType(hotelData.hotelType)}</div>
                        </div>
                        <div className='flex justify-between items-start mt-2'>
                            {/* <div className='text-start transition-all duration-300 ease-in-out max-lg:line-clamp-1 max-lg:overflow-hidden'>ประเภทห้อง: </div>
                            <div className='max-w-40 transition-all duration-300 ease-in-out line-clamp-1 overflow-hidden'>
                                ห้องทั่วไป, ห้องพิเศษ
                            </div> */}
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
                        <div className='text-start text-[2vw] md:text-sm md:my-2 transition-all duration-300 ease-in-out line-clamp-1 overflow-hidden text-gray-400'>ท่านสามารถติดต่อทางโรงแรมเพื่อสอบถามข้อมูลเพิ่มเติม</div>
                        <a className="flex justify-center items-center rounded-md md:btn bg-pethub-color1 md:bg-pethub-color1 text-white md:text-white w-full max-md:text-[2vw] h-[7vw] font-medium">
                            <a >ติดต่อสอบถาม</a>
                        </a>

                    </div>

                </div>
            </div>
            
        </div>
        <div className='mt-5 md:mt-5 w-[96vw] lg:w-11/12 xl:w-11/12 2xl:w-[1280px] h-full mx-auto px-5'>
            <div className='flex items-start lg:items-center justify-between flex-col lg:flex-row'>
                <div className='text-start text-[5vw] sm:text-xl lg:text-2xl xl:text-3xl font-semibold'>Available rooms</div>
                {/* <div className='flex items-center gap-[2vw] md:gap-3 max-md:my-[3vw]'>
                    <input
                        type="date"
                        name="email"
                        min={currentDate}
                        placeholder=""
                        className="input input-bordered max-md:h-[7vw] max-md:text-[2vw] w-[32vw] md:w-64 bg-white"
                    />
                    <p className='text-[2vw] sm:text-sm lg:text-lg xl:text-xl'>ถึง</p>
                    <input
                        type="date"
                        name="email"
                        min={currentDate}
                        placeholder=""
                        className="input input-bordered  max-md:h-[7vw] max-md:text-[2vw] w-[32vw] md:w-64 bg-white"
                    />
                    <a className="flex justify-center items-center rounded-md md:btn bg-pethub-color1 md:bg-pethub-color1 text-white md:text-white max-md:text-[2vw] max-md:w-[10vw] h-[7vw] font-medium">
                        <a >ค้นหา</a>
                    </a>
                </div> */}
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
                            {/* <div className='text-[1.8vw] md:text-sm lg:text-sm xl:text-lg md:my-1 lg:my-3'>ของเล่นแมว, อาหาร, อาบน้ำ, ดูแล 24 ชั่วโมง</div> */}
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
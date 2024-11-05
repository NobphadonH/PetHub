import Navbar from './Utils/Navbar'
import Footer from './Utils/Footer'
import { useParams } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

function HotelDetail() {
    let param = useParams()
    const mapRef = useRef(null); 

    useEffect(() => {
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
    
          var marker = new window.longdo.Marker({ lon: 100.56, lat: 13.74 });
          map.Overlays.add(marker);
          map.zoomRange({ min: 6, max: 20 });
          map.location({ lon: 100.56, lat: 13.74 }, true);
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
      }, []);
    
      const handleDivClick = () => {
        if (mapRef.current) {
          mapRef.current.location({ lon: 100.56, lat: 13.74 }, true);
          mapRef.current.zoom(14, true);
        }
      };

  return (
    <>
     <Navbar /> 
     <div className='mt-20 md:mt-28 w-[96vw] lg:w-11/12 xl:w-11/12 2xl:w-[1280px] grid grid-cols-12 grid-rows-2 h-[500px] max-lg:h-[45vw] xl:h-[600px] mx-auto gap-1 lg:gap-3 xl:gap-5'>
        <div className='col-start-8 rounded-md col-span-5 row-span-1 bg-gray-300'></div>
        <div className='col-start-8 rounded-md col-span-5 row-start-2 bg-gray-300'></div>
        <div className='row-start-1 rounded-md col-span-7 row-span-2 bg-gray-300'></div>
     </div>
     <div className='mt-5 md:mt-10 w-[96vw] lg:w-11/12 xl:w-11/12 2xl:w-[1280px] h-full mx-auto'>
        <div className='w-full lg:h-20 flex gap-5 text-[10px] sm:text-[2vw] md:text-lg xl:text-xl font items-center'>
            <div className='px-3 lg:px-5 py-1 lg:py-2 border-b-2 border-pethub-color1 cursor-pointer font-bold'>Overview</div>
            <div className='px-3 lg:px-5 py-1 lg:py-2 border-b-0 border-pethub-color1 cursor-pointer'>Guest reviews</div>
            <div className='px-3 lg:px-5 py-1 lg:py-2 border-b-0 border-pethub-color1 cursor-pointer'>Chat</div>
        </div>
     </div>
     <div className='w-full h-full bg-[#F4F4F4]'>
        <div className='w-[90vw] lg:w-11/12 xl:w-10/12 2xl:w-[1280px] h-full md:h-[600px] lg:h-[1000px] mx-auto py-[1vw] lg:py-10 flex flex-wrap md:grid grid-cols-12 grid-rows-12 gap-x-[3%] md:gap-4'>
            <div className='max-md:basis-full col-span-12 md:col-span-8 row-span-3 lg:row-span-2 max-md:py-[2vw] max-lg:py-5'>
                <h1 className='text-start text-[5vw] md:text-2xl lg:text-3xl xl:text-5xl uppercase font-bold '>{param.hotelname}</h1>
                <div className="flex my-[1vw] md:my-3 lg:my-4 gap-1 items-center">
                    {Array.from({ length: 5 }).map((_, index) => (
                    <svg key={index} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill w-[8px] sm:w-[12px] lg:w-[16px] text-yellow-400" viewBox="0 0 16 16">
                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                    </svg>
                    ))}
                    <div className="max-md:text-[2vw] ml-1 md:ml-3">
                    {5} ({1200} Reviews)
                    </div>
                </div>
                <div className='flex gap-3 items-center justify-start text-gray-400'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-geo-alt text-blue-400 max-md:w-[16px]" viewBox="0 0 16 16">
                        <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10"/>
                        <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                    </svg>
                    <div onClick={handleDivClick} className='hover:text-blue-500 cursor-pointer text-start text-[10px] sm:text-[2vw] md:text-[14px] xl:text-lg  transition-all duration-300 ease-in-out max-lg:line-clamp-1 max-lg:overflow-hidden'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, voluptates?</div>
                </div>
            </div>
            <div className='max-md:w-full max-md:h-[40vw] max-md:my-[2vw] bg-white rounded-md col-span-12 md:col-span-4 row-span-4'>
            <div
                id="map"
                style={{ height: '100%', width: '100%', borderRadius: '6px', overflow: 'hidden' }} // Full height and width
            ></div>
            </div>
            <div className='max-md:w-[60%] max-md:h-[250px] overflow-y-hidden bg-white rounded-md col-span-8 lg:col-span-8 row-span-10 max-md:p-[3vw] max-lg:px-8 max-lg:py-4 py-12 px-14 text-start'>
                <div className='text-md lg:text-2xl font-semibold mb-[1vw] md:mb-6 overflow-y'>Overview</div>
                <div className='text-[2vw] md:text-sm max-md:h-[200px] overflow-y-hidden scrollbar-hidden'>
                    <p>Bangmod Pet Hotel เป็นโรงแรมสัตว์เลี้ยงระดับพรีเมียม ตั้งอยู่ในย่านบางมด กรุงเทพมหานคร ที่ออกแบบมาเพื่อตอบโจทย์ความต้องการของเจ้าของสัตว์เลี้ยงที่มองหาที่พักอันปลอดภัย สะดวกสบาย และทันสมัยสำหรับเพื่อนขนฟูของพวกเขา เราให้บริการที่พักทั้งระยะสั้นและระยะยาว พร้อมสิ่งอำนวยความสะดวกครบครันและการดูแลอย่างใกล้ชิดจากผู้เชี่ยวชาญด้านสัตว์เลี้ยง</p>
                    
                    <p>โรงแรมของเรามีพื้นที่กว้างขวาง รวมถึงห้องพักที่สะอาดและมีระบบควบคุมอุณหภูมิที่เหมาะสม พร้อมสนามวิ่งเล่นสำหรับสัตว์เลี้ยง และโซนกิจกรรมที่ออกแบบมาเพื่อความสนุกสนานและการออกกำลังกายของสัตว์เลี้ยง นอกจากนี้ เรายังมีบริการดูแลพิเศษ เช่น การอาบน้ำ ตัดขน และตรวจสุขภาพเบื้องต้น โดยทีมงานที่มีความรักและประสบการณ์ในการดูแลสัตว์เลี้ยง</p>
                    
                    <p>ไม่ว่าคุณจะมีสุนัข แมว หรือสัตว์เลี้ยงชนิดอื่น ๆ เราพร้อมให้บริการและดูแลพวกเขาด้วยความรักและความใส่ใจ เพื่อให้คุณมั่นใจได้ว่าสัตว์เลี้ยงของคุณจะได้รับการดูแลเป็นอย่างดีระหว่างการเข้าพักที่ Bangmod Pet Hotel.</p>
                    <div className='text-md lg:text-xl my-[1vw] md:my-6 overflow-y'>ข้อกำหนด</div>
                    <div>
                        <h2>ข้อกำหนดในการเข้าพักที่ Bangmod Pet Hotel</h2>

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

                        <p >หมายเหตุ: โปรดทำความเข้าใจและยอมรับข้อกำหนดเหล่านี้ก่อนทำการจองเพื่อประสบการณ์ที่ราบรื่นและปลอดภัยสำหรับสัตว์เลี้ยงของท่าน</p>
                    </div>

                </div>
            </div>
            <div className='max-md:w-[35%] max-md:h-[250px] bg-white rounded-md col-start-9 col-span-4 row-span-5'></div>
            
        </div>
        <div className='mt-5 md:mt-5 w-[96vw] lg:w-11/12 xl:w-11/12 2xl:w-[1280px] h-full mx-auto px-5'>
            <div className='text-start lg:mb-5 text-2xl font-semibold'>Available rooms</div>
            <div  className="mt-10 w-full overflow-hidden mx-auto relative h-[83vw] md:h-[650px]">
            <motion.div className="absolute h-[80vw] md:h-[600px] rounded-md mx-auto py-5 flex gap-5" drag="x" dragConstraints={{ left: -1000, right: 0 }} transition={{ type: "spring", stiffness: 300, damping: 30 }}>
                <div className='w-[450px] bg-white rounded-lg overflow-hidden'>
                    <div className='w-full h-[50%] bg-slate-200'></div>
                    <div className='w-full h-[50%] p-6 text-start'>
                        <div className='flex justify-between items-end'>
                            <div className='text-2xl'>ห้องขนาดทั่วไป (แมว)</div>
                            <div className='text-สเ'>25x25 ตรม</div>
                        </div>
                        <div className='my-3'>ของเล่นแมว, อาหาร, อาบน้ำ, ดูแล 24 ชั่วโมง</div>
                        <div className='transition-all duration-300 ease-in-out line-clamp-2 overflow-hidden text-gray-400'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Atque voluptatum dolor, ipsam natus similique aperiam eveniet quos, magni voluptatem deserunt odio aspernatur reprehenderit laborum molestias illum unde ipsum libero pariatur?</div>
                        <div className='my-5'>400 บาท/คืน</div>
                        <a href="" className='btn w-full bg-pethub-color1 text-white'>จองห้องพัก</a>
                    </div>
                </div>
                <div className='w-[450px] bg-white rounded-lg'></div>
                <div className='w-[450px] bg-white rounded-lg'></div>
                <div className='w-[450px] bg-white rounded-lg'></div>
            </motion.div>
        </div>
        </div>
     </div>
     <Footer />
    </>
  )
}

export default HotelDetail

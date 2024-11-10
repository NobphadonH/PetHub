import Navbar from "./Utils/Navbar"
import HomeHotelBox from "./Utils/HomeHotelBox"
import HomeHotelBoxLoading from "./Utils/HomeHotelBoxLoading";
import HotelRecommend from "./Utils/HotelRecommend";
import HotelRecommendLoading from "./Utils/HotelRecommedLoading";
import { motion } from "framer-motion";
import Footer from "./Utils/Footer"
import { useState, useEffect, useRef } from "react"

import { hotelData } from "../assets/dummydata";


function Home() {
    const containerRef = useRef(null);
    const parentRef = useRef(null);
    const [totalWidth, setTotalWidth] = useState(0);

    console.log(totalWidth)

    const pageCalculate = () => {
        return Math.floor(hotelData.length/4 + 1)
    }

    const pageSelection = (number) => {
        return hotelData.slice((4*number), (4*number)+4)
    }

    const [x, setX] = useState(0);
    const [pageselect, setPageselect] = useState(0)
    const [pagenumber, setPagenumber] = useState(pageCalculate);
    const [pagedata, setPagedata] = useState([]);
    const [loading, setLoading] = useState(true)
    
    const handleLeftClick = () => {
        setX((prevX) => Math.min(prevX + 300, 0));
    };
    
    const handleRightClick = () => {
        setX((prevX) => Math.max(prevX - 300, -totalWidth));
    };
    
    const handlePageSelect = (index) => {
        setPageselect(index);
    }

    const handleNext = () => {
        if(pageselect < pagenumber-1){
            setPageselect(prev => prev + 1);
        }
    }

    const handlePrev = () => {
        if(pageselect > 0){
            setPageselect(prev => prev - 1);
        }
    }
    
    useEffect(() => {
        setPagenumber(pageCalculate)
        setPagedata(pageSelection(pageselect))

        setLoading(true)
        setTimeout(() => {setLoading(false)}, 1000)

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
    }, [pageselect])

    const districts = [
        "เขตพระนคร", "เขตดุสิต", "เขตหนองจอก", "เขตบางรัก", "เขตบางเขน",
        "เขตบางกะปิ", "เขตปทุมวัน", "เขตป้อมปราบศัตรูพ่าย", "เขตพระโขนง", "เขตมีนบุรี",
        "เขตลาดกระบัง", "เขตยานนาวา", "เขตสัมพันธวงศ์", "เขตพญาไท", "เขตธนบุรี",
        "เขตบางกอกใหญ่", "เขตห้วยขวาง", "เขตคลองสาน", "เขตตลิ่งชัน", "เขตบางกอกน้อย",
        "เขตบางขุนเทียน", "เขตภาษีเจริญ", "เขตหนองแขม", "เขตราษฎร์บูรณะ", "เขตราชเทวี",
        "เขตบางพลัด", "เขตดินแดง", "เขตบึงกุ่ม", "เขตสาทร", "เขตบางซื่อ",
        "เขตจตุจักร", "เขตบางคอแหลม", "เขตประเวศ", "เขตคลองเตย", "เขตสวนหลวง",
        "เขตจอมทอง", "เขตดอนเมือง", "เขตราชบูรณะ", "เขตหลักสี่", "เขตสายไหม",
        "เขตคันนายาว", "เขตสะพานสูง", "เขตวังทองหลาง", "เขตคลองสามวา", "เขตบางนา",
        "เขตทวีวัฒนา", "เขตทุ่งครุ", "เขตบางบอน"
    ];

  return (
    <div>
      <Navbar />
      {/* section1 */}
      <div className="text-start mt-20 lg:mt-32 bg-pethub-color1 w-11/12 xl:w-10/12 max-w-[1200px] h-[270px] md:h-full mx-auto p-8 md:py-10 md:px-12 xl:px-28 relative rounded-md overflow-hidden z-10 opacity-80">
        <div className="absolute top-0 right-0 left-0 md:bottom-0 z-0">
            <img
                src="https://tidypets.store/cdn/shop/files/view-cats-dogs-being-friends.jpg?v=1726648599&width=2000"
                alt=""
                className=" max-md:scale-150 w-full h-full object-cover opacity-80"
            />
        </div>
        <h1 className="text-5xl md:text-7xl relative z-20 text-pethub-color1  ">PET HUB</h1>
        <h4 className="text-sm lg:text-lg relative z-20">เลือกโรงแรมให้เหมาะสมกับน้องๆของคุณ</h4>
        <div className="grid max-md:grid-rows-2 grid-cols-12 md:grid-cols-12 gap-5 lg:gap-7 xl:gap-14 mt-8 md:mt-24 relative z-20">
            <div className="hidden md:block col-span-3">
                <select className="select select-bordered w-full max-w-xs shadow-xl" style={{ color: 'gray' }}>
                    <option disabled selected style={{ color: 'gray' }}>ประเภทสัตว์</option>
                    <option style={{ color: 'black' }}>สุนัข</option>
                    <option style={{ color: 'black' }}>แมว</option>
                </select>
            </div>
            <div className="hidden md:block col-span-4">
                <select className="select select-bordered w-full max-w-xs input-shadow" style={{ color: 'gray' }}>
                    <option disabled selected style={{ color: 'gray' }}>สถานที่ตั้ง</option>
                    {districts.map((district, index) => (
                        <option key={index} style={{ color: 'black' }}>
                            {district}
                        </option>
                    ))}
                </select>
            </div>
            <div className="hidden md:block col-span-3">
                <select className="select select-bordered w-full max-w-xs input-shadow" style={{ color: 'gray' }}>
                    <option disabled selected style={{ color: 'gray' }}>ช่วงราคา</option>
                    <option style={{ color: 'black' }}>500-2000 บาท</option>
                    <option style={{ color: 'black' }}>2000-5000 บาท</option>
                </select>
            </div>
            <div className="hidden md:block col-span-1"></div>
            <div className="col-span-6 md:col-span-3">
                <label className="input w-[40vw] h-[10vw] max-h-12 max-w-full text-[3vw] sm:text-sm input-bordered flex items-center gap-2 input-shadow">
                    <input type="date" className="grow " />
                </label>
            </div>
            <div className="col-span-6 md:col-span-3">
                <label className="input w-[40vw] h-[10vw] max-h-12 max-w-full text-[3vw] sm:text-xs input-bordered flex items-center gap-2 input-shadow">
                    <input type="date" className="grow" />
                </label>
            </div>
            <div className="max-md:row-start-2 col-span-12 md:col-span-4">
                <label className="input input-bordered flex items-center gap-2 h-[10vw] max-h-12 max-w-full input-shadow  text-[3vw] sm:text-xs lg:text-base">
                    <input type="text" className="grow" placeholder="ค้นหาจากชื่อโรงแรม" />
                    <a href="">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="h-4 w-4 opacity-70">
                            <path
                            fillRule="evenodd"
                            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                            clipRule="evenodd" />
                        </svg>
                    </a>
                </label>
            </div>
            <div className="col-span-2">
                <a href="/" className="btn bg-pethub-color1 border-pethub-color1 font-medium max-md:hidden text-white relative z-20">ค้นหา</a>
            </div>
        </div>  
        <div className="absolute bottom-0 right-0 left-0 h-12 md:h-16 bg-white z-10"></div>
      </div>
      {/* section2 */}
      <div className="mx-auto my-5 grid grid-cols-12 w-11/12 md:w-[750px] h-full lg:w-full gap-5 lg:gap-10">
        <div className="md:hidden col-span-12 flex justify-between">
            <div className="w-[27vw] h-[10vw] max-h-10 text-[3vw] sm:text-lg">
                <select className="h-full w-full border-2 rounded-lg px-3" style={{ color: 'gray' }}>
                    <option disabled selected style={{ color: 'gray' }}>ประเภทสัตว์</option>
                    <option style={{ color: 'black' }}>สุนัข</option>
                    <option style={{ color: 'black' }}>แมว</option>
                </select>
            </div>
            <div className="w-[27vw] h-[10vw] max-h-10  text-[3vw] sm:text-lg">
                <select className="h-full w-full border-2 rounded-lg px-3" style={{ color: 'gray' }}>
                    <option disabled selected style={{ color: 'gray' }}>สถานที่ตั้ง</option>
                    {districts.map((district, index) => (
                        <option key={index} style={{ color: 'black' }}>
                            {district}
                        </option>
                    ))}
                </select>
            </div>
            <div className="w-[27vw] h-[10vw] max-h-10 text-[3vw] sm:text-lg">
                <select className="h-full w-full border-2 rounded-lg px-3" style={{ color: 'gray' }}>
                    <option disabled selected style={{ color: 'gray' }}>ช่วงราคา</option>
                    <option style={{ color: 'black' }}>500-2000 บาท</option>
                    <option style={{ color: 'black' }}>2000-5000 บาท</option>
                </select>
            </div>
        </div>
        <div className="col-span-12">
            <div className="my-2 lg:my-5 text-[3vw] md:text-sm lg:text-lg text-pethub-color1">{hotelData.length} ผลการค้นหา</div>
        </div>
        {pagedata.map((hotel, index) => (
            <div key={index} className="col-span-6 lg:col-span-12 row-span-3">
                {loading ? <HomeHotelBoxLoading /> : 
                <HomeHotelBox
                hotelName={hotel.hotelName}
                roomInfo={hotel.roomInfo}
                reviews={hotel.reviews}
                rating={hotel.rating}
                description={hotel.description}
                price={hotel.price}
                link={hotel.link}
                imageUrl={hotel.imageUrl}
                petType={hotel.petType}
                />
                }
                
            </div>
        ))}
      </div>
      <div className="w-11/12 xl:w-8/12 h-10 mx-auto flex justify-center items-center mt-8 md:mt-20 gap-5">
        <div className="max-md:text-[2.5vw] flex justify-center items-center cursor-pointer" onClick={() => handlePrev()}>Prev</div>
        {Array.from({ length: pagenumber }).map((page, index) => (
            <div key={index} onClick={() => handlePageSelect(index)} className={index == pageselect ? `bg-pethub-color1 text-white w-8 h-8 md:w-10 md:h-10 flex items-center justify-center cursor-pointer` : `bg-base-200 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center cursor-pointer`}>
                {index + 1}
            </div>
        ))}
        <div className="max-md:text-[2.5vw] flex justify-center items-center cursor-pointer" onClick={() => handleNext()}>Next</div>
      </div>
      <div className="mx-auto flex justify-between w-11/12 xl:w-8/12 mt-40 items-center">
        <div className="text-[4vw] md:text-3xl font-semibold text-pethub-color6">โรงแรมที่แนะนำ</div>
            
        <div className="w-[27vw] h-[10vw] max-h-10 text-[2vw] text-end sm:text-lg lg:hidden">
            <select className="select select-bordered w-full max-w-28 h-full border-2 px-3 rounded-full" style={{ color: 'gray' }}>
                <option disabled selected style={{ color: 'gray' }}>
                    ประเภทสัตว์
                </option>
                <option style={{ color: 'black' }}>สุนัข</option>
                <option style={{ color: 'black' }}>แมว</option>
            </select>
        </div>
        <div className="hidden lg:flex gap-5">        
            <div className="btn rounded-full bg-pethub-color1 text-white"><span className="text-xl">🐱</span>แมว</div>
            <div className="btn rounded-full bg-slate-200"><span className="text-xl">🐶</span>สุนัข</div>
            <div className="btn rounded-full bg-slate-200"><span className="text-xl">🫎</span>สัตว์ประเภทอื่นๆ</div>
        </div>
        <div className="hidden lg:flex gap-3">
            <button className="btn bg-pethub-color6 rounded-full hover:bg-pethub-color1 text-white" onClick={handleLeftClick}>{'<'}</button>

            <button className="btn bg-pethub-color6 rounded-full hover:bg-pethub-color1 text-white" onClick={handleRightClick}>{'>'}</button>
        </div>
      </div>
      {/* section3 */}
      <div ref={parentRef} className="mt-10 w-11/12 xl:w-8/12 overflow-hidden mx-auto relative h-[83vw] md:h-[590px]">
        <motion.div ref={containerRef} className="absolute h-[80vw] md:h-[570px] rounded-md mx-auto p-5 flex gap-5" drag="x" dragConstraints={{ left: -totalWidth, right: 0 }} animate={{ x }} transition={{ type: "spring", stiffness: 300, damping: 30 }}>
            <HotelRecommendLoading />
            {hotelData.map((hotel, index) => (
                <HotelRecommend
                    key={index} // It's good practice to use a unique key for each mapped component
                    hotelName={hotel.hotelName}
                    reviews={hotel.reviews}
                    rating={hotel.rating}
                    price={hotel.price}
                    link={hotel.link}
                    imageUrl={hotel.imageUrl}
                    petType={hotel.petType}
                />
            ))}
        </motion.div>
      </div>
      <Footer />
    </div>
  )
}

export default Home

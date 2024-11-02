import Navbar from "./Utils/Navbar"
import HomeHotelBox from "./Utils/HomeHotelBox"
import HomeHotelBoxLoading from "./Utils/HomeHotelBoxLoading";
import { motion } from "framer-motion";
import Footer from "./Utils/Footer"
import { useState, useEffect } from "react"

import { hotelData } from "../assets/dummydata";

function Home() {
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
        setX((prevX) => Math.max(prevX - 300, -1500));
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
      <div className="text-start mt-20 lg:mt-32 bg-pethub-color1 w-11/12 xl:w-8/12 h-full mx-auto p-8 md:py-10 md:px-12 xl:px-28 relative rounded-md overflow-hidden z-10 opacity-80">
        <div className="absolute top-0 right-0 left-0 bottom-0 z-0">
            <img
                src="https://tidypets.store/cdn/shop/files/view-cats-dogs-being-friends.jpg?v=1726648599&width=2000"
                alt=""
                className="w-full h-full object-cover opacity-80"
            />
        </div>
        <h1 className="text-5xl md:text-7xl relative z-20 text-pethub-color1  ">PetHub</h1>
        <h4 className="text-sm lg:text-lg relative z-20">เลือกโรงแรมให้เหมาะสมกับน้องๆของคุณ</h4>
        <div className="md:grid grid-cols-12 md:grid-cols-12 gap-14 mt-24 relative z-20">
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
            <div className="col-span-10">
            <label className="input input-bordered flex items-center gap-2 input-shadow">
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
                <a href="/" className="btn bg-pethub-color1 border-pethub-color1 font-medium max-md:hidden text-white relative z-20">search</a>
            </div>
        </div>  
        <div className="absolute bottom-0 right-0 left-0 h-12 md:h-16 bg-white z-10"></div>
      </div>
      {/* section2 */}
      <div className="mt-5 mb-5 text-pethub-color1">{hotelData.length} ผลการค้นหา</div>
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
            
        <div className="text-[2.5vw] h-10 px-[1vw] md:text-md flex justify-center rounded-full bg-base-200 items-center gap-3 max-md:w-[27vw] md:btn md:rounded-full hover:bg-pethub-color1 hover:text-white lg:hidden duration-300">
            ประเภทสัตว์
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-fill max-md:w-[2.5vw]" viewBox="0 0 16 16">
                <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
            </svg>
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
      <div className="mt-10 w-11/12 xl:w-8/12 overflow-hidden mx-auto relative h-[83vw] md:h-[590px]">
        <motion.div className="absolute h-[80vw] md:h-[570px] rounded-md mx-auto p-5 flex gap-5" drag="x" dragConstraints={{ left: -1500, right: 0 }} animate={{ x }}transition={{ type: "spring", stiffness: 300, damping: 30 }}>
            <div className="w-[40vw] md:w-[300px] h-full bg-white border-2 rounded-lg p-[2vw] md:p-3 flex flex-col justify-between items-center">
                <div className="w-full relative">
                    <div className="absolute top-[3vw] md:top-6 left-0 w-[17vw] h-[6vw] md:w-28 md:h-10 bg-pethub-color6 opacity-70 rounded-e-full text-center text-white text-[2.5vw] md:text-lg px-4 flex items-center justify-start">Popular</div>
                    <div className="w-full h-[42vw] sm:h-[50vw] md:h-[330px] rounded-md bg-base-200"></div>
                    <div className="w-full text-start md:mt-5 mt-[3vw] mx-1 md:mx-3">
                        <div className="flex">
                            <div className="text-[3vw] md:text-2xl  w-full md:w-40 transition-all duration-300 ease-in-out line-clamp-1 overflow-hidden">Bangmode hotel</div>
                            <span className="hidden md:block text-2xl ml-3 text-gray-400">🐱 🐶</span>
                        </div>
                        <div className="flex lg:my-1 gap-1 items-center">
                        {Array.from({ length: 5 }).map((_, index) => (
                            <svg key={index} xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-star-fill max-md:w-[8px] text-yellow-400" viewBox="0 0 16 16">
                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                            </svg>
                        ))}
                        <div className="max-md:text-[2vw] ml-1 md:ml-3">
                            {5} ({25} Reviews)
                        </div>
                        </div>
                        <div className="text-[2vw] md:text-lg text-gray-400">2000 บาท / คืน</div>
                    </div>
                </div>
                <div className="flex justify-center items-center rounded-md md:btn bg-pethub-color1 md:bg-pethub-color1 text-white md:text-white w-[17vw] max-md:text-[2vw] h-[7vw] md:w-40 font-medium">
                    <a href="">viewmore</a>
                </div>
            </div>
            <div className="w-[40vw] md:w-[300px] h-full bg-base-300 rounded-lg "></div>
            <div className="w-[40vw] md:w-[300px] h-full bg-base-300 rounded-lg "></div>
            <div className="w-[40vw] md:w-[300px] h-full bg-base-300 rounded-lg "></div>
            <div className="w-[40vw] md:w-[300px] h-full bg-base-300 rounded-lg "></div>
            <div className="w-[40vw] md:w-[300px] h-full bg-base-300 rounded-lg "></div>
            <div className="w-[40vw] md:w-[300px] h-full bg-base-300 rounded-lg "></div>
            <div className="w-[40vw] md:w-[300px] h-full bg-base-300 rounded-lg "></div>
            <div className="w-[40vw] md:w-[300px] h-full bg-base-300 rounded-lg "></div>

        </motion.div>
      </div>
      <Footer />
    </div>
  )
}

export default Home

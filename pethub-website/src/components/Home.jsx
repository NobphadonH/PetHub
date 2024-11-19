import Navbar from "./Utils/Navbar"
import HomeHotelBox from "./Utils/HomeHotelBox"
import HomeHotelBoxLoading from "./Utils/HomeHotelBoxLoading";
import HotelRecommend from "./Utils/HotelRecommend";
import HotelRecommendLoading from "./Utils/HotelRecommedLoading";
import { motion } from "framer-motion";
import Footer from "./Utils/Footer"
import { useState, useEffect, useRef } from "react"
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { hotelData } from "../assets/dummydata";
import axios from "axios";


function Home() {
    const containerRef = useRef(null);
    const parentRef = useRef(null);
    const [totalWidth, setTotalWidth] = useState(0);
    const [currentDate, setCurrentDate] = useState('');
    const fetchCalled = useRef(false);

        
    const navigate = useNavigate();
    const location = useLocation()



    const pageCalculate = (data) => {
        if (!data || !Array.isArray(data) || data.length === 0) {
            return 0;
        }
        return Math.ceil(data.length / 4); // Use Math.ceil to cover all items
    };
    
    const pageSelection = (data, number) => {
        if (!data || !Array.isArray(data) || number < 0) {
            return [];
        }
        return data.slice(4 * number, 4 * number + 4); // Slice the data for the current page
    };
    
    const [hotelResult, setHotelResult] = useState([]);
    const [isFetch, setIsFetch] = useState(0);


    const [x, setX] = useState(0);
    const [pageselect, setPageselect] = useState(0)
    const [pagenumber, setPagenumber] = useState(pageCalculate);
    const [pagedata, setPagedata] = useState([]);
    const [loading, setLoading] = useState(true)
    // const [filter, setFilter] = useState({
    //     petType:null,
    //     hotelName: "",
    //     district: null,
    //     priceRangeLower: null,
    //     priceRangeUpper: null,
    //     checkInDate: null,
    //     checkOutDate: null
    // })
    const [filter, setFilter] = useState({})

    console.log(pagedata)


    const [searchCounter, setSearchCounter] = useState(0); // counter for unique searches


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
    

    const handleSearchClick = (e) => {
        e.preventDefault();
        // const queryParams = new URLSearchParams();
        // if (filter.petType) queryParams.set("petType", filter.petType);
        // if (filter.hotelName) queryParams.set("hotelName", filter.hotelName);
        // if (filter.district) queryParams.set("district", filter.district);
        // if (filter.priceRangeLower) queryParams.set("district", filter.priceRangeLower);
        // if (filter.priceRangeUpper) queryParams.set("district", filter.priceRangeUpper);
        // if (filter.checkInDate) queryParams.set("district", filter.checkInDate);
        // if (filter.checkOutDate) queryParams.set("district", filter.checkOutDate);

        setSearchCounter(prevCount => prevCount + 1); 
        const query = new URLSearchParams({...filter, searchCounter}).toString();
        setIsFetch(0)
        navigate(`/pethub-website/home?${query}`)
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFilter((prevFilters) => ({ ...prevFilters, [name]: value }));
      };

    const handlePriceRangeChange = (e) => {
        const [lower, upper] = e.target.value.split('-').map(value => parseInt(value.trim()));
        setFilter(prevFilter => ({
            ...prevFilter,
            priceRangeLower: lower,
            priceRangeUpper: upper
        }));
    }

    const getMinCheckOutDate = () => {
        if (!filter.checkIn) return currentDate; // Fallback to current date if check-in is not selected
        const checkInDate = new Date(filter.checkIn);
        checkInDate.setDate(checkInDate.getDate() + 1); // Add one day
        return checkInDate.toISOString().split("T")[0]; // Format as YYYY-MM-DD
    };

    // const petType = queryParams.get("petType") || null;
    // const hotelName = queryParams.get("hotelName") || null;
    // const district = queryParams.get("district") || null;
    // const priceRangeLower = queryParams.get("priceRangeLower") || null;
    // const priceRangeUpper = queryParams.get("priceRangeUpper") || null
    // let checkInDate = queryParams.get("checkInDate") || null;
    // let checkOutDate = queryParams.get("checkInDate") || null;
    // if (checkInDate == null || checkOutDate == null) {
    //     checkInDate = null;
    //     checkOutDate = null;
    // }

    // setFilter({petType, hotelName, district, priceRangeLower, priceRangeUpper, checkInDate, checkOutDate})

    const queryParams = new URLSearchParams(location.search);

    useEffect(() => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(today.getDate()).padStart(2, '0');
        setCurrentDate(`${year}-${month}-${day}`);

        console.log('Current query:', location.search);
        const fetchData = async () => {
            // console.log('hello');
            try {
                console.log(filter);
                console.log(queryParams);
            
                // Fetch data from the API
                const res = await axios.get(`http://localhost:5000/api/roomSearch/getHotelAndRoomByFilter/?${queryParams}`);
            
                const fetchedData = res.data; // Store the fetched data
                setHotelResult(hotelData); // Set the hotel result
                setIsFetch(1);
            
                console.log(fetchedData);
            
                // Calculate the number of pages and set the first page data
                const totalPages = pageCalculate(hotelData); // Pass the fetched data
                setPagenumber(totalPages);
            
                // Ensure pageselect is correctly initialized
                const currentPage = pageselect || 0; // Default to page 0 if pageselect is not set
                const paginatedData = pageSelection(hotelData, currentPage); // Get the sliced data for the current page
            
                setPagedata(paginatedData);
            } catch (error) {
                console.error(error);
            }
        }
        
        fetchData();
    

    }, [location.search])


    useEffect( () => {

        const totalPages = pageCalculate(hotelResult); // Pass the fetched data
        setPagenumber(totalPages);

        const currentPage = pageselect || 0; // Default to page 0 if pageselect is not set
        const paginatedData = pageSelection(hotelResult, currentPage);
        
        setLoading(true)
        setTimeout(() => {setLoading(false)}, 1000)
        setPagedata(paginatedData);

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


    const addPetTypeArray = () => {
        hotelResult.forEach( (hotel) => {
            let petTypeArray  = []
            hotel.roomsAvailable.forEach( (room) => {
                if (!petTypeArray.includes(room.petAllowedType)) {
                    petTypeArray.push(room.petAllowedType)
                }
            })
            const updatedHotelResult = hotelResult.map(hotel => ({
                ...hotel,
                petTypeArray: petTypeArray
            }))
            setHotelResult(updatedHotelResult);
        })
    }

    const addLowestRoomPrice = () => {
        hotelResult.forEach((hotel)=> {
            let lowestPrice = hotel.roomsAvailable[0].pricePerNight;
            hotel.roomsAvailable.forEach((room) => {
                if (lowestPrice > room.pricePerNight) {
                    lowestPrice = room.pricePerNight
                }
            })

            const updatedHotelResult = hotelResult.map(hotel => ({
                ...hotel,
                lowestPrice: lowestPrice
            }))
            setHotelResult(updatedHotelResult);
        }) 
        return;
    }

    useEffect(() => {
        console.log('aa')
        const updatedWithPetType = hotelResult.map(hotel => {
            const petTypeArray = hotel.roomsAvailable.reduce((acc, room) => {
                if (!acc.includes(room.petAllowedType)) {
                    acc.push(room.petAllowedType);
                }
                return acc;
            }, []);
            return { 
                ...hotel, 
                petTypeArray 
            };
        });
    
        const updatedWithPrices = updatedWithPetType.map(hotel => {
            const lowestPrice = hotel.roomsAvailable.reduce((minPrice, room) => 
                Math.min(minPrice, room.pricePerNight), 
                hotel.roomsAvailable[0]?.pricePerNight || Infinity
            );
            const highestPrice = hotel.roomsAvailable.reduce((maxPrice, room) =>
                 Math.max(maxPrice, room.pricePerNight),
                 hotel.roomsAvailable[0]?.pricePerNight || 0)
            return { 
                ...hotel, 
                lowestPrice,
                highestPrice
            };
        });
    
        setHotelResult(updatedWithPrices);
    }, [isFetch]);


    useEffect(()=> {
        console.log(isFetch)
    }, [hotelResult])

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
      <ToastContainer position="top-center" autoClose={1000} hideProgressBar />
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
                <select name = "petType" value={filter.petType} onChange={handleInputChange} className="select select-bordered w-full max-w-xs shadow-xl" style={{ color: 'gray' }}>
                    <option disabled selected style={{ color: 'gray' }}>ประเภทสัตว์</option>
                    <option value = "สุนัข" style={{ color: 'black' }}>สุนัข</option>
                    <option value = "แมว" style={{ color: 'black' }}>แมว</option>
                    <option value = "สัตว์ประเภทอื่นๆ" style={{ color: 'black' }}>สัตว์ประเภทอื่นๆ</option>
                </select>
            </div>
            <div className="hidden md:block col-span-4">
                <select name="district" value={filter.district} onChange={handleInputChange} className="select select-bordered w-full max-w-xs input-shadow" style={{ color: 'gray' }}>
                    <option disabled selected style={{ color: 'gray' }}>สถานที่ตั้ง</option>
                    {districts.map((district, index) => (
                        <option value = {district} key={index} style={{ color: 'black' }}>
                            {district}
                        </option>
                    ))}
                </select>
            </div>
            {/* Need new handle function */}
            <div className="hidden md:block col-span-3">
                <select onChange={handlePriceRangeChange} className="select select-bordered w-full max-w-xs input-shadow" style={{ color: 'gray' }}>
                    <option disabled selected style={{ color: 'gray' }}>ช่วงราคา</option>
                    <option value="500-2000" style={{ color: 'black' }}>500-2000 บาท</option>
                    <option value="2000-5000" style={{ color: 'black' }}>2000-5000 บาท</option>
                </select>
            </div>
            <div className="hidden md:block col-span-1"></div>
            <div className="col-span-6 md:col-span-3">
                <label className="input w-[40vw] h-[10vw] max-h-12 max-w-full text-[3vw] sm:text-sm input-bordered flex items-center gap-2 input-shadow">
                    <input type="date" min={currentDate} name = "checkIn" value = {filter.checkIn} onChange={handleInputChange} className="grow" />
                </label>
            </div>
            <div className="col-span-6 md:col-span-3">
                <label className="input w-[40vw] h-[10vw] max-h-12 max-w-full text-[3vw] sm:text-sm input-bordered flex items-center gap-2 input-shadow">
                    <input type="date" min={getMinCheckOutDate()} name = "checkOut" value = {filter.checkOut} onChange={handleInputChange} className="grow" />
                </label>
            </div>
            <div className="max-md:row-start-2 col-span-12 md:col-span-4">
                <label className="input input-bordered flex items-center gap-2 h-[10vw] max-h-12 max-w-full input-shadow  text-[3vw] sm:text-xs lg:text-base">
                    <input type="text" name="hotelName" value={filter.hotelName} onChange={handleInputChange} className="grow" placeholder="ค้นหาจากชื่อโรงแรม" />
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
                <button onClick={handleSearchClick} className="btn bg-pethub-color1 border-pethub-color1 font-medium max-md:hidden text-white relative z-20">ค้นหา</button>
            </div>
        </div>  
        <div className="absolute bottom-0 right-0 left-0 h-12 md:h-16 bg-white z-10"></div>
      </div>
      {/* section2 */}
      <div className="mx-auto my-5 grid grid-cols-12 w-11/12 md:w-[750px] h-full lg:w-full gap-5 lg:gap-10">
      <div className="md:hidden col-span-12 flex justify-between">
        <div className="w-[27vw] h-[10vw] max-h-10 text-[3vw] sm:text-lg">
            <select
                name="petType"
                value={filter.petType}
                onChange={handleInputChange}
                className="h-full w-full border-2 rounded-lg px-3 bg-white text-black"
            >
                <option disabled selected className="text-gray-500">
                    ประเภทสัตว์
                </option>
                <option value="สุนัข" className="text-black">
                    สุนัข
                </option>
                <option value="แมว" className="text-black">
                    แมว
                </option>
                <option value="สัตว์ประเภทอื่นๆ" className="text-black">
                    สัตว์ประเภทอื่นๆ
                </option>
            </select>
        </div>
        <div className="w-[27vw] h-[10vw] max-h-10 text-[3vw] sm:text-lg">
            <select
                name="district"
                value={filter.district}
                onChange={handleInputChange}
                className="h-full w-full border-2 rounded-lg px-3 bg-white text-black"
            >
                <option disabled selected className="text-gray-500">
                    สถานที่ตั้ง
                </option>
                {districts.map((district, index) => (
                    <option value={district} key={index} className="text-black">
                        {district}
                    </option>
                ))}
            </select>
        </div>
        <div className="w-[27vw] h-[10vw] max-h-10 text-[3vw] sm:text-lg">
            <select className="h-full w-full border-2 rounded-lg px-3 bg-white text-black">
                <option disabled selected className="text-gray-500">
                    ช่วงราคา
                </option>
                <option className="text-black">500-2000 บาท</option>
                <option className="text-black">2000-5000 บาท</option>
            </select>
        </div>
    </div>

        <div className="col-span-12">
            <div className="my-2 lg:my-5 text-[3vw] md:text-sm lg:text-lg text-pethub-color1">{hotelResult.length} ผลการค้นหา</div>
        </div>
            {pagedata && hotelResult.length > 0 ? (
                pagedata.map((hotel, index) => (
                    <div key={index} className="col-span-6 lg:col-span-12 row-span-3">
                        {loading ? (
                            <HomeHotelBoxLoading />
                        ) : (
                            <HomeHotelBox
                                hotelObj={hotel}
                                hotelName={hotel.hotelName}
                                reviews={hotel.reviewCount}
                                rating={hotel.avgReviewScore}
                                description={hotel.hotelDescription}
                                price={hotel.roomsAvailable[0].pricePerNight}
                                imageUrl={hotel.hotelPhoto}
                                petType={hotel.petTypeArray}
                                checkIn={filter.checkIn}
                                checkOut={filter.checkOut}
                            />
                        )}
                    </div>
                ))
            ) : (
                <div className="col-span-6 lg:col-span-12 row-span-3">
                    <HomeHotelBoxLoading />

                </div>
            )}

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

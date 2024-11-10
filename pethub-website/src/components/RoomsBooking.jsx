import { useParams } from "react-router-dom";
import Navbar from "./Utils/Navbar";
import { useState, useEffect, useRef } from 'react';
import Footer from "./Utils/Footer";
import PictureUpload from "./Utils/PictureUpload";

function RoomsBooking() {
  const param = useParams();
  const [currentDate, setCurrentDate] = useState('');
  const [addbut, setAddbut] = useState(false)
  const [myPet, setMyPet] = useState([false, false])
  const [customPet, setCustomPet] = useState(0)
  const elementRef = useRef(null);
  const [imageFile, setImageFile] = useState(null);

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

  const handleAddMyPet = (id) => {
    setMyPet((prevMyPet) => {
      const updatedMyPet = [...prevMyPet];
      updatedMyPet[id] = true;
      return updatedMyPet;
    });
  };
  
  const handleRemoveMyPet = (id) => {
    setMyPet((prevMyPet) => {
      const updatedMyPet = [...prevMyPet];
      updatedMyPet[id] = false; 
      return updatedMyPet;
    });
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

  console.log(customPet)

  return (
    <>
        <Navbar />
        <div className='mt-20 md:mt-28 w-[96vw] lg:w-11/12 xl:w-11/12 2xl:w-[1280px] grid grid-cols-12 grid-rows-2 max-lg:h-[35vw] lg:h-[300px] mx-auto gap-1 lg:gap-3 xl:gap-5'>
            <div className='row-start-1 rounded-md col-span-5 row-span-2 bg-gray-300'></div>
            <div className='col-start-6 rounded-md col-span-5 row-span-2 bg-gray-300'></div>
            <div className='col-start-11 rounded-md col-span-2 row-span-2 bg-gray-300'></div>
        </div>
        <div className='w-full h-full bg-[#F4F4F4] mt-10'>
        <div className="w-[90vw] lg:w-11/12 xl:w-10/12 2xl:w-[1280px] h-full md:h-[1200px] lg:h-full mx-auto py-[1vw] lg:py-10 flex flex-wrap md:grid grid-cols-12 gap-x-[3%] md:gap-4">
            <div className='max-md:basis-full col-span-12 md:col-span-8 max-md:py-[2vw] max-lg:py-5 flex flex-col gap-10'>
                <div>
                    <h1 className='text-start text-[5vw] md:text-2xl lg:text-3xl xl:text-5xl uppercase font-bold transition-all duration-300 ease-in-out line-clamp-1 overflow-hidden'>{param.hotelname} <span className="font-normal text-[3vw] md:text-lg lg:text-1xl xl:text-3xl text-gray-500">ห้องขนาดทั่วไป(แมว)</span></h1>
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
                        <div className=' text-start text-[10px] sm:text-[2vw] md:text-xs xl:text-sm  transition-all duration-300 ease-in-out max-lg:line-clamp-3 max-lg:overflow-hidden'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore sed enim illum, nulla error, consectetur sequi rem delectus reiciendis accusamus doloremque alias ipsa impedit minima beatae aperiam amet accusantium quia? Tempore, obcaecati id cum at fugit enim quia reiciendis eius animi similique? Dignissimos amet nam, aperiam soluta perferendis laboriosam quidem.</div>
                    </div>
                </div>
                <div className="max-md:w-[60%]  overflow-y-hidden bg-white rounded-md max-md:p-[3vw] max-lg:px-8 max-lg:py-4 py-12 px-14 text-start">
                    <div className={`text-[3vw] lg:text-2xl font-semibold mb-[1vw] md:mb-6 overflow-y `}>จองห้องพักสัตว์เลี้ยง</div>
                    <div className={`text-[2vw] md:text-sm max-md:h-[160px] h-[80%] lg:h-[90%] px-4 scrollbar-hidden `}>
                        <p className="font-semibold text-[2vw] md:text-lg">วันที่เช็คอิน-เช็คเอาท์</p>
                        <div className="flex items-end gap-8">
                            <div>
                                <p className="text-start text-[1vw] md:text-sm my-3">เช็คอิน</p>
                                <input
                                    type="date"
                                    name="email"
                                    min={currentDate}
                                    placeholder=""
                                    className="input input-bordered w-64 bg-gray-100 mb-3"
                                />
                            </div>
                            <div className="text-[2vw] md:text-lg py-5">ถึง</div>
                            <div>
                                <p className="text-start text-[1vw] md:text-sm my-3">เช็คอิน</p>
                                <input
                                    type="date"
                                    name="email"
                                    min={currentDate}
                                    placeholder=""
                                    className="input input-bordered w-64 bg-gray-100 mb-3"
                                />
                            </div>
                        </div>
                        <p className="font-semibold text-[2vw] md:text-lg my-6">ข้อมูลสัตว์เลี้ยง</p>
                        <div className="relative">
                            <div onClick={handleToggleAdd} className="btn bg-pethub-color1 text-white">เพิ่มสัตว์เลี้ยง +</div>
                            <div ref={elementRef} className={` z-50 absolute bg-white rounded-sm w-[70%] max-h-64 border-[1px] top-14 overflow-y-hidden ${addbut ? '' : 'hidden'}`}>
                                <div className="w-full h-16 bg-gray-100 flex items-center px-5 justify-between cursor-pointer">
                                    <p className="text-[2vw] md:text-lg">สัตว์เลี้ยงของฉัน</p>
                                </div>
                                <div className="h-24 w-full overflow-y-scroll hide-scrollbar">
                                    {Array.from({ length: 2}).map((_, index) => {
                                        return (
                                            <div key={index} className="w-full h-16 flex items-center justify-between px-5 bg-gray-white">
                                                <p className="text-start text-[1vw] md:text-sm my-3">นปโปะ</p>
                                                <div className="hover:scale-110">
                                                    <svg onClick={() => handleAddMyPet(index)} xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="text-pethub-color3 bi bi-plus-square-fill" viewBox="0 0 16 16">
                                                    <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0"/>
                                                    </svg>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                                <div className="w-full h-16 bg-gray-100 flex items-center px-5 justify-between cursor-pointer">
                                    <p className="text-[2vw] md:text-lg">กำหนดสัตว์เลี้ยงเอง</p>
                                    <div  onClick={handleAddCustom} className="hover:scale-110">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="text-gray-500 bi bi-plus-square-fill" viewBox="0 0 16 16">
                                        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            {Array.from({ length: 2}).map((_, index) => (
                                <div id={index} key={index} className={`${myPet[index] ? "" : "hidden"} w-full relative h-48 border-[1px] my-3 rounded-md p-1 flex`}>
                                    <div className="absolute right-3 top-3">
                                        <svg onClick={() => handleRemoveMyPet(index)} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="text-gray-400 cursor-pointer bi bi-trash3-fill" viewBox="0 0 16 16">
                                        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                                        </svg>
                                    </div>
                                    <div className="w-[30%] h-full rounded bg-slate-300 overflow-hidden">
                                        <img src="https://s.isanook.com/ca/0/ui/285/1425207/staywithnoppo-20240522_152537-446114668_721839553257673_573084092354014144_n.jpeg" alt="" />
                                    </div>
                                    <div className="w-[65%] h-full p-5">
                                        <div className="flex justify-between">
                                            <div>ชื่อ: นปโปะ</div>
                                            <div>อายุ:1 ปี 2 เดือน</div>
                                            <div>ประเภท: สุนัข</div>
                                            <div>เพศ: เพศผู้</div>
                                        </div>
                                        <p className="text-start text-[1vw] md:text-sm my-3">คำอธิบายลักษณะเพิ่มเติม</p>
                                        <textarea className="textarea w-full min-h-20 max-h-20 textarea-bordered hide-scrollbar text-gray-600" value={"นปโปะหม่ำๆ หม่ำๆ กู๊ดบอย กู๊ดบอยหม่ำๆ หม่ำๆ เก่งมาก "}></textarea>
                                    </div>
                                </div>
                            ))}
                            {Array.from({ length: customPet }).map((_, index) => (
                                <div  key={index} className="my-5">
                                    
                                    <p className="font-semibold text-[2vw] md:text-lg my-3">สัตว์เลี้ยงตัวที่ {index + 1}</p>
                                    <div className="relative w-full border-[1px] rounded-md p-3">
                                        <div className="absolute right-3 top-3">
                                            <svg onClick={handleRemoveCustom} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="text-gray-400 cursor-pointer bi bi-trash3-fill" viewBox="0 0 16 16">
                                            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                                            </svg>
                                        </div>

                                        <div className="flex gap-10">
                                            <div>
                                                <p className="text-start text-[1vw] md:text-sm my-3">ประเภท</p>
                                                <select className="select bg-gray-100 select-bordered w-64 max-w-xs">
                                                    <option disabled selected>ประเภทสัตว์</option>
                                                    <option>สุนัข</option>
                                                    <option>แมว</option>
                                                </select>
                                            </div>
                                            <div>
                                                <p className="text-start text-[1vw] md:text-sm my-3">ชื่อน้องๆ</p>
                                                <input
                                                    type="text"
                                                    name="email"
                                                    placeholder="ชื่อของน้องๆ"
                                                    className="input input-bordered w-64 bg-gray-100 mb-3"
                                                />

                                            </div>
                                        </div>
                                        <div className="flex gap-10 items-end">
                                        <div>
                                            <p className="text-start text-[1vw] md:text-sm my-3">วันเกิดสัตว์เลี้ยง</p>
                                            <input
                                                type="date"
                                                name="email"
                                                placeholder=""
                                                className="input input-bordered w-44 bg-gray-100 mb-3"
                                            />
                                            </div>
                                            <select className="select bg-gray-100 select-bordered w-36 max-w-xs mb-3">
                                                <option disabled selected>เพศ</option>
                                                <option>เพศผู้</option>
                                                <option>เพศเมีย</option>
                                            </select>
                                        </div>
                                        <div>
                                            <p className="text-start text-[1vw] md:text-sm my-3">คำอธิบายลักษณะเพิ่มเติม</p>
                                            <textarea className="textarea w-full min-h-32 max-h-48 textarea-bordered" placeholder="ex. สายพันธุ์, ลักษณะเฉพาะ, สีขน หรือ นิสัย"></textarea>
                                            <p className="text-start text-[1vw] md:text-sm my-3">*แนะนำให้บอกถึงลักษณะของสัตว์เลี้ยงเพื่อป้องกันในกรณีเกิดเหตุฉุกเฉิน</p>
                                        </div>
                                        <div>
                                            <p className="text-start text-[1vw] md:text-sm my-3">Upload รูปของสัตว์เลี้ยงของคุณ</p>
                                            <PictureUpload onImageSelected={handleImageSelected} />
                                            {imageFile && <p>Selected Image: {imageFile.name}</p>}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="z-10">
                            <p className="font-semibold text-[2vw] md:text-lg my-6">ข้อมูลสัตว์การดูแลสัตว์เลี้ยง</p>
                            <p className="text-start text-[1vw] md:text-sm my-3">ข้อมูลสำคัญของน้องๆ ของคุณ เช่น โรคประจำตัว หรือความจำเป็นในการดูแลเป็นพิเศษต่างๆ แนะนำให้แจ้งให้ทางโรงแรมทราบถึงการปฎิบัติดูแลต่างๆ</p>
                            <textarea className="textarea w-full min-h-44 max-h-80 textarea-bordered" placeholder="ex. ให้อาหาร 3 เวลา, การแปลงขนทุกวัน เป็นต้น"></textarea>
                        </div>
                        <div className="flex items-center justify-between mt-9">
                            <p className="text-start text-[1vw] md:text-sm my-3">โปรดเช็คข้อมูลให้ถูกต้องก่อนทำการจอง</p>
                            <div className="flex justify-center items-center rounded-md md:btn bg-pethub-color1 md:bg-pethub-color1 text-white md:text-white max-md:text-[2vw] h-[7vw] font-medium">จองห้องพัก</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='max-md:w-full max-md:h-[40vw] max-md:my-[2vw] h-[500px] bg-white rounded-md col-span-4'>
                <div className='w-[45vw] md:w-full h-full bg-white rounded-lg overflow-hidden'>
                    <div className='relative w-full h-[55%] overflow-hidden bg-slate-200'>
                        <img className="absolute bottom-0" src="https://temporary-cdn.wezhan.net/contents/sitefiles3603/18016482/images/7480295.jpg" alt="" />
                    </div>
                    <div className='w-full h-[45%] p-[2vw] md:p-6 text-start'>
                        <div className='flex justify-between items-end'>
                            <div className='text-[2.5vw] md:text-lg lg:text-xl xl:text-2xl'>รายระเอียดของห้องพัก</div>
                        </div>
                        <div className='flex justify-between items-end'>
                            <div className='text-[1.8vw] md:text-sm lg:text-sm xl:text-sm md:my-1 lg:my-1'>ขนาดห้อง</div>
                            <div className='text-[1.8vw] md:text-sm lg:text-sm xl:text-lg md:my-1 lg:my-1'>25x25 ตรม.</div>
                        </div>
                        <div className='flex justify-between items-end'>
                            <div className='text-[1.8vw] md:text-sm lg:text-sm xl:text-sm md:my-1 lg:my-1'>ประเภท</div>
                            <div className='text-[1.8vw] md:text-sm lg:text-sm xl:text-lg md:my-1 lg:my-1'>ห้องนาดทั่วไป</div>
                        </div>
                        <div className='flex justify-between items-end'>
                            <div className='text-[1.8vw] md:text-sm lg:text-sm xl:text-sm md:my-1 lg:my-1'>ประเภทสัตว์ที่รับ</div>
                            <div className='text-[1.8vw] md:text-sm lg:text-sm xl:text-lg md:my-1 lg:my-1'>แมว</div>
                        </div>
                        <div className='flex justify-between items-end'>
                            <div className='text-[1.8vw] md:text-sm lg:text-sm xl:text-sm md:my-1 lg:my-1'>ราคา</div>
                            <div className='text-[1.8vw] md:text-sm lg:text-sm xl:text-lg md:my-1 lg:my-1'>400 บาท</div>
                        </div>
                    </div>
                </div>
                <div className="w-full h-[350px] mt-6 rounded-lg overflow-hidden bg-white">
                    <div className="w-full h-[20%] bg-pethub-color6 flex items-center p-5 justify-start text-white text-xl">ราคาการจอง</div>
                    <div className="w-full h-[55%] bg-white p-5 flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                            <div>การจอง 2 คืน</div>
                            <div className=" text-gray-400">800.00</div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>สัตว์เลี้ยงที่เข้าพัก 2 ตัว</div>
                            <div className=" text-gray-400">100.00</div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>ค่าบริการ</div>
                            <div className=" text-gray-400">0.00</div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>ค่าอาหาร</div>
                            <div className=" text-gray-400">0.00</div>
                        </div>
                    </div>
                    <div className="w-full h-[25%] bg-white px-5 flex flex-col gap-3">
                        <hr />
                        <div className="flex items-center justify-between h-[70%] text-xl">
                            <div>ทั้งหมด</div>
                            <div className="text-xl">800 บาท</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={``}>
                

                
            </div>

        </div>
     </div>
     <Footer />
    
    </>
  );
}

export default RoomsBooking;

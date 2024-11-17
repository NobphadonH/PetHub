import Navbar from "./Utils/Navbar"
import { motion } from "framer-motion"
import { useState, useRef, useEffect } from "react";

function HostProfile() {
    const containerRef = useRef(null);
    const parentRef = useRef(null);
    const [totalWidth, setTotalWidth] = useState(0);

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

  return (
    <>
      <Navbar />
      <div className=" text-[4.5vw] md:text-3xl lg:text-4xl text-start mt-24 md:mt-28 lg:mt-32 w-11/12 xl:w-10/12 max-w-[1200px] mx-auto font-bold text-pethub-color1">PETHUB <span className="font-normal text-black">Hotel Management</span></div>
      <div className="text-start mt-[5vw] md:mt-8 lg:mt-8 w-11/12 xl:w-10/12 max-w-[1200px] h-[35vw] md:h-[270px] lg:h-[350px] mx-auto rounded-md overflow-hidden border-[1px] p-[2vw] md:p-5 relative flex shadow-xl">
        <div className="absolute top-1 lg:top-3 left-0 bottom-1 lg:bottom-3 w-[1vw] md:w-[5px] bg-pethub-color6"></div>
        <div className="absolute top-1 lg:top-3 right-0 bottom-1 lg:bottom-3 w-[1vw] md:w-[5px] bg-pethub-color1"></div>
        <div className="w-[35vw] md:w-[270px] lg:w-[350px] xl:w-[400px] h-full bg-slate-200 rounded-sm overflow-hidden relative">
            <img className="absolute w-full h-full object-cover" src="https://digital.ihg.com/is/image/ihg/intercontinental-dhaka-8304538615-2x1" alt="" />
        </div>
        <div className="h-full flex flex-col justify-between grow px-[2vw] pt-[2vw] md:px-4 md-pt-4 lg:px-7 lg:pt-7">
            <div className="flex flex-col gap-[1vw] md:gap-3">
                <div className="flex justify-between items-end">
                    <div className="text-[2.5vw] md:text-lg lg:text-2xl font-semibold">ชื่อจดทะเบียน: <span className="text-pethub-color1">Bangmod hotel</span></div>
                    <div className="hidden md:block text-[1.5vw] md:text-xs lg:text-lg">C-349-342350</div>
                </div>
                <div className="text-[2vw] md:text-sm lg:text-lg font-semibold transition-all duration-300 ease-in-out line-clamp-1 overflow-hidden">สถานที่ตั้ง: <span className="text-pethub-color6 font-normal">123 ถนนสุขุมวิท, วัฒนา, กรุงเทพมหานคร 10110, (ใกล้ BTS อโศก)</span></div>
                <div className="text-[2vw] md:text-sm lg:text-lg font-semibold">ประเภทที่พัก: <span className="text-pethub-color6 font-normal">Professional Pet hotel</span></div>
                <div className="text-[2vw] md:text-sm lg:text-lg font-semibold">Cancelation Policy: <span className="text-pethub-color6 font-normal">Flexible cancelation</span></div>
            </div>
            <div className="flex justify-between items-center">
                <div className="text-[2.5vw] md:text-base lg:text-xl font-semibold">ผู้ดูแล: <span className="text-[2vw] md:text-sm lg:text-base text-pethub-color6 font-normal">นายกฤษณ์ สมบูรณ์สุข</span></div>
                <div className="text-[2.5vw] md:text-base lg:text-xl font-semibold">เบอร์โทร: <span className="text-[2vw] md:text-sm lg:text-base text-pethub-color6 font-normal">094-XXX-XXXX</span></div>
                <div className="text-[2vw] md:text-sm lg:text-base max-lg:hidden">ส่งคำร้องแก้ไขข้อมูล</div>
                
            </div>
        </div>
     </div>
     <div className="lg:px-14 text-[3vw] md:text-2xl lg:text-3xl text-start mt-[6vw] md:mt-10 lg:mt-16 w-11/12 xl:w-10/12 max-w-[1200px] mx-auto font-semibold">รายละเอียดโรงแรม</div>
     <div className=" text-[3vw] md:text-2xl lg:text-3xl text-start mt-[6vw] md:mt-10 lg:mt-16 w-11/12 xl:w-10/12 max-w-[1200px] mx-auto font-semibold">
    <div className="my-[2vw] md:my-4 w-full flex justify-between gap-5">
        <div>จัดการห้องพัก</div>
        <div className="flex justify-center items-center rounded-md md:btn bg-pethub-color1 md:bg-pethub-color1 text-white md:text-white h-[7vw] w-[15vw] sm:w-24 sm:h-10 md:w-28 font-medium text-[2vw] md:text-xs lg:text-sm xl:text-base">เพิ่มห้องพัก</div>
    </div>
     </div>
     <div className="w-11/12 xl:w-10/12 max-w-[1200px] mx-auto">
        <div ref={parentRef} className="md:mt-4 lg:mt-8 xl:mt-10 w-full overflow-hidden mx-auto relative h-[70vw] md:h-[550px]  lg:h-[650px]">
            <motion.div ref={containerRef} className="absolute h-[60vw] md:h-[500px] lg:h-[600px] rounded-md mx-auto md:py-5 flex gap-3 lg:gap-5" drag="x" dragConstraints={{ left: -totalWidth, right: 0 }} transition={{ type: "spring", stiffness: 300, damping: 30 }}>
                {Array.from({length : 5}).map((_, index) => (
                    <div key={index} className='w-[45vw] md:w-[350px] xl:w-[400px] bg-white rounded-lg overflow-hidden'>
                        <div className='w-full h-[50%] bg-slate-200'></div>
                        <div className='w-full h-[50%] p-[2vw] md:p-6 text-start'>
                            <div className='flex justify-between items-end'>
                                <div className='text-[2.5vw] md:text-lg lg:text-xl xl:text-2xl'>ห้องขนาดทั่วไป (แมว)</div>
                                <div className='text-[2vw] md:text-sm lg:text-base xl:text-lg'>25x25 ตรม</div>
                            </div>
                            <div className='text-[1.8vw] md:text-sm lg:text-sm xl:text-lg md:my-1 lg:my-3'>ของเล่นแมว, อาหาร, อาบน้ำ, ดูแล 24 ชั่วโมง</div>
                            <div className='text-[1.5vw] md:text-xs lg:text-sm xl:text-base transition-all duration-300 ease-in-out line-clamp-2 overflow-hidden text-gray-400'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Atque voluptatum dolor, ipsam natus similique aperiam eveniet quos, magni voluptatem deserunt odio aspernatur reprehenderit laborum molestias illum unde ipsum libero pariatur?</div>
                            <div className='text-[2vw] md:text-base my-[1vw] md:my-2 lg:my-5'>400 บาท/คืน</div>
                            <a href={`/pethub-website/home/hostprofile/room001`} className="flex justify-center items-center rounded-md md:btn bg-pethub-color1 md:bg-pethub-color1 text-white md:text-white w-full max-md:text-[2vw] h-[7vw] font-medium">
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
            {Array.from({length: 3}).map((_, index) => (
              <tbody  key={index}>
                <tr className="text-xs lg:text-sm xl:text-base">
                  <td>
                    <div className="flex items-center gap-4">
                      <div className="w-2 h-8 lg:h-10 xl:h-14 bg-green-500"></div>
                      <div className="transition-all duration-300 ease-in-out line-clamp-1 overflow-hidden">B-123-4567890</div>
                    </div>
                  </td>
                  <td  className="max-md:hidden">
                    <div className="transition-all duration-300 ease-in-out line-clamp-1 overflow-hidden">10/10/2567</div>
                  </td>
                  <td  className="max-md:hidden">
                    <div className="transition-all duration-300 ease-in-out line-clamp-1 overflow-hidden">10/10/2567</div>
                  </td>
                  <td className="max-sm:hidden">
                    <div className="transition-all duration-300 ease-in-out line-clamp-1 overflow-hidden">ห้องขนาดทั่วไป</div>
                  </td>
                  <td className="max-md:pr-0">
                    <span className="badge badge-ghost badge-sm bg-green-100 text-[2.5vw] sm:text-xs lg:text-sm xl:text-base">ชำระเงินแล้ว</span>
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

import Navbar from "./Utils/Navbar"
import CalendarComponent from "./Utils/CalendarComponent"

function RoomManagement() {
  return (
    <>
     <Navbar /> 
     <div className="text-start mt-20 lg:mt-32 w-11/12 xl:w-10/12 max-w-[1200px] h-[35vw] md:h-[270px] lg:h-[350px] mx-auto rounded-md overflow-hidden border-[1px] p-[2vw] md:p-5 relative flex">
        <div className="absolute top-0 h-[1vw] md:h-2 w-full bg-pethub-color1 right-0"></div>
        <div className="w-[35vw] md:w-[270px] lg:w-[350px] xl:w-[400px] h-full bg-slate-200 rounded-sm overflow-hidden relative">
            <img className="absolute bottom-0" src="https://temporary-cdn.wezhan.net/contents/sitefiles3603/18016482/images/7480295.jpg" alt="" />
        </div>
        <div className="h-full flex flex-col justify-between grow p-[2vw] md:p-4 lg:p-7">
            <div className="flex flex-col gap-[1vw] md:gap-3">
                <div className="flex justify-between items-center">
                    <div className="text-[2.5vw] md:text-lg lg:text-2xl">ประเภทห้อง: <span className="text-gray-400">ห้องขนาดทั่วไป (แมว)</span></div>
                    <div className="hidden md:block text-[1.5vw] md:text-xs lg:text-lg">R-349-342350</div>
                </div>
                <div className="text-[2vw] md:text-sm lg:text-lg">ขนาดห้อง: <span className="text-gray-400">25x25 ตรม.</span></div>
                <div className="text-[2vw] md:text-sm lg:text-lg">ราคา: <span className="text-gray-400">400 บาท / คืน</span></div>
                <div className="text-[2vw] md:text-sm lg:text-lg">ประเภทสัตว์: <span className="text-gray-400">แมว</span></div>
            </div>
            <div className="flex justify-between items-center">
                <div className="text-[2.5vw] md:text-base lg:text-xl">สถานะ: <span className=" text-red-500">Not Avalaible</span></div>
                <div className="flex justify-center items-center rounded-md md:btn bg-pethub-color1 md:bg-pethub-color1 text-white md:text-white h-[7vw] w-[15vw] sm:w-24 sm:h-10 md:w-28 font-medium text-[2vw] md:text-xs lg:text-sm xl:text-base">แก้ไขข้อมูล</div>
            </div>
        </div>
     </div>
     <div className="text-start my-8 lg:my-16 w-11/12 xl:w-10/12 max-w-[1200px] lg:h-full mx-auto rounded-md overflow-hidden border-[1px] p-[5vw] md:p-10 flex flex-col gap-4 ">
        <div className="font-bold text-[3vw] md:text-lg lg:text-2xl">รายการจองของ <span className="text-gray-400 font-light">ห้องขนาดทั่วไป (แมว)</span></div>
        <div className="w-full h-[350px] flex gap-5">
            <div className="w-full md:w-[50%] lg:w-[40%] flex items-center justify-center">
                <CalendarComponent />
            </div>
            <div className="max-md:hidden border-[1px] grow rounded-md overflow-hidden">
                <div className="w-full h-14 bg-pethub-color6 flex items-center justify-start px-6 text-white">
                    <div className="text-[2.5vw] md:text-lg lg:text-xl">การจองทั้งหมด 2 รายการ</div>
                </div>
                <div className="w-full h-[290px] overflow-scroll hide-scrollbar bg-gray-200">
                    <div className="text-xs lg:text-base my-[2px] w-full h-16 lg:h-20 bg-white flex flex-col justify-between px-5 p-2">
                        <div className="flex justify-between">
                            <div>
                                <span className="max-md:hidden">เลขที่การจอง :</span>
                                <span>B-987-6543210</span>
                                 
                            </div>
                            <div>วันที่จอง: 13/11/2567</div>
                        </div>
                        <div className="flex justify-start gap-5">
                            <div>สถานะ: <span className="text-yellow-500 font-normal">รอการยืนยัน</span></div>
                            <div>การจอง: <span className="text-gray-400 font-light">2 คืน</span></div>
                        </div>
                    </div>
                    <div className="my-2 w-full h-16 bg-fuchsia-100"></div>
                    <div className="my-2 w-full h-16 bg-fuchsia-100"></div>
                    <div className="my-2 w-full h-16 bg-fuchsia-100"></div>
                    <div className="my-2 w-full h-16 bg-fuchsia-100"></div>
                    <div className="my-2 w-full h-16 bg-fuchsia-100"></div>
                    <div className="my-2 w-full h-16 bg-fuchsia-100"></div>
                </div>
            </div>
        </div>
        <div className="w-full h-full border-[1px] rounded-md relative max-md:py-[4vw] p-[3vw] md:p-4 lg:p-8 flex flex-col">
            <div className="absolute top-0 h-[1vw] md:h-2 w-4/12 bg-pethub-color1 left-4"></div>
            <div className="flex flex-wrap gap-[2vw] md:gap-2 lg:gap-5">
                <div className="grow font-semibold text-[2.5vw] md:text-lg lg:text-2xl">การจองเลขที่: <span className="text-gray-ุ00 font-light">B-987-6543210</span></div>
                <div className="grow font-semibold text-[2.5vw] md:text-lg lg:text-2xl">สถานะ: <span className="text-yellow-500 font-normal">รอการยืนยัน</span></div>
                <div className="grow font-semibold text-[2.5vw] md:text-lg lg:text-2xl">การจอง: <span className="text-gray-400 font-light">2 คืน</span></div>
            </div>
            <div className="my-[2vw] md:my-4 text-[1.5vw] md:text-xs lg:text-sm">จองวันที่ 10 พฤศจิกายน 2567</div>
            <div className="font-semibold text-[2vw] md:text-base lg:text-xl">ข้อมูลทั่วไป</div>
            <div className="flex w-full justify-start lg:justify-between flex-wrap gap-[3vw] md:gap-5">
                <div className="grow">
                    <p className="text-start text-[2.5vw] md:text-xs lg:text-sm xl:text-sm my-[1vw] md:my-3">เช็คอิน</p>
                    <input
                        type="text"
                        name="email"
                        placeholder=""
                        value={"15 พฦศจิกายน 2567"}
                        className="input input-bordered w-full h-[8vw] max-h-10  text-[2vw] sm:h-10 xl:h-12 sm:text-xs lg:text-sm bg-gray-100 md:mb-3"
                    />
                </div>
                <div className="grow">
                    <p className="text-start text-[2.5vw] md:text-xs lg:text-sm xl:text-sm my-[1vw] md:my-3">เช็คเอาท์</p>
                    <input
                        type="text"
                        name="email"
                        placeholder=""
                        value={"17 พฦศจิกายน 2567"}
                        className="input input-bordered w-full h-[8vw] max-h-10  text-[2vw] sm:h-10 xl:h-12 sm:text-xs lg:text-sm bg-gray-100 md:mb-3"
                    />
                </div>
                <div className="grow">
                    <p className="text-start text-[2.5vw] md:text-xs lg:text-sm xl:text-sm my-[1vw] md:my-3">ชื่อผู้จอง</p>
                    <input
                        type="text"
                        name="email"
                        placeholder=""
                        value={"ชัชนันท์ บุญพา"}
                        className="input input-bordered w-full h-[8vw] max-h-10  text-[2vw] sm:h-10 xl:h-12 sm:text-xs lg:text-sm bg-gray-100 md:mb-3"
                    />
                </div>
                <div className="grow">
                    <p className=" text-start text-[2.5vw] md:text-xs lg:text-sm xl:text-sm my-[1vw] md:my-3">โทรศัพท์</p>
                    <input
                        type="text"
                        name="email"
                        placeholder=""
                        value={"094-XXXX-XXX"}
                        className="input input-bordered w-full h-[8vw] max-h-10  text-[2vw] sm:h-10 xl:h-12 max-w-64 sm:text-xs lg:text-sm bg-gray-100 md:mb-3"
                    />
                </div>
            </div>
            <div className="font-semibold text-[2vw] md:text-base lg:text-xl my-[2vw] md:my-4">ข้อมูลสัตว์เลี้ยงที่เข้าพัก</div>
            <div>
            {Array.from({ length: 2}).map((_, index) => (
                <div id={index} key={index} className={` w-full relative h-28 sm:h-36 lg:h-40 xl:h-44 border-[1px] my-[2vw] md:my-3 rounded-md p-1 flex overflow-y-scroll hide-scrollbar`}>
                    <div className="absolute right-1 top-1">
                        {/* <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="text-gray-400 cursor-pointer max-lg:w-4 max-lg:h-4 bi bi-trash3-fill" viewBox="0 0 16 16">
                        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                        </svg> */}
                    </div>
                    <div className="w-[200px] lg:w-[230px] xl:w-[250px] h-full rounded bg-slate-300 overflow-hidden">
                        <img src="https://s.isanook.com/ca/0/ui/285/1425207/staywithnoppo-20240522_152537-446114668_721839553257673_573084092354014144_n.jpeg" className=" object-cover" alt="" />
                    </div>
                    <div className="w-full overflow-y-hide hide-scrollbar h-full px-2 py-[2vw] md:py-3 xl:p-5 flex flex-col justify-between">
                        <div className="flex justify-between flex-wrap text-[2vw] md:text-[1.2vw] xl:text-xs">
                            <div>ชื่อ: นปโปะ</div>
                            <div>อายุ:1 ปี 2 เดือน</div>
                            <div>ประเภท: สุนัข</div>
                            <div>เพศ: เพศผู้</div>
                        </div>
                        <p className="text-start text-[2vw] md:text-[1.2vw] xl:text-sm my-1 lg:my-3">คำอธิบายลักษณะเพิ่มเติม</p>
                        <textarea className="textarea w-full max-md:p-[1vw] max-h-8 min-h-8 md:max-h-12 md:min-h-12 lg:min-h-16 lg:max-h-16 textarea-bordered hide-scrollbar text-[1.5vw] md:text-[1vw] xl:text-sm text-gray-600" value={"นปโปะหม่ำๆ หม่ำๆ กู๊ดบอย กู๊ดบอยหม่ำๆ หม่ำๆ เก่งมาก  "}></textarea>
                    </div>
                </div>
            ))}
            </div>
            <div className="my-[2vw] md:my-4 w-full flex justify-end gap-5">
                <div className="flex justify-center items-center rounded-md md:btn bg-pethub-color6 md:bg-pethub-color6 text-white md:text-white h-[7vw] w-[15vw] sm:w-36 sm:h-10 md:w-40 font-medium text-[2vw] md:text-xs lg:text-sm xl:text-base">ปฎิเสธการอนุมัติ</div>
                <div className="flex justify-center items-center rounded-md md:btn bg-pethub-color1 md:bg-pethub-color1 text-white md:text-white h-[7vw] w-[15vw] sm:w-24 sm:h-10 md:w-28 font-medium text-[2vw] md:text-xs lg:text-sm xl:text-base">อนุมัติ</div>
            </div>
        </div>
     </div>
    </>
  )
}

export default RoomManagement

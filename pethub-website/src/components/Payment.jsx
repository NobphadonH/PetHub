import Navbar from "./Utils/Navbar";
import { useState } from 'react'

function Payment() {
    const [barSel, setBarSel] = useState(0)
    const handleSelect = (e) => {
        setBarSel(e.target.id)
      }

      console.log(barSel)

    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    
    const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    const years = Array.from(new Array(10), (_, i) => new Date().getFullYear() + i);
    
    return (
        <div>
            <Navbar />
            <div className="grid grid-cols-3 mt-24">
                <div className="col-span-2 mx-auto w-11/12">
                    <div className="flex flex-col bg-white border border-neutral-100 drop-shadow-xl rounded-xl">
                        <div className="bg-pethub-color1 p-4 rounded-t-xl">
                            <div className="flex flex-row gap-4">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
                                </svg>
                                <div className="text-white text-base font-medium">
                                    ตัวเลือกในการชำระเงิน
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 mb-6 ml-4">
                            <div className='w-full flex gap-5 text-[10px] sm:text-[2vw] md:text-sm xl:text-sm items-center'>
                                <div id='0' onClick={handleSelect} className={`px-3 lg:px-5 py-1 lg:py-2 border-blue-500 cursor-pointer ${barSel == 0 ? ' border-b-2 font-bold text-sm' : ''}`}>บัตรเดบิต/บัตรเครดิต</div>
                                <div id='1' onClick={handleSelect} className={`px-3 lg:px-5 py-1 lg:py-2 border-blue-500 cursor-pointer ${barSel == 1 ? ' border-b-2 font-bold text-sm' : ''}`}>เพย์แพล</div>
                                <div id='2' onClick={handleSelect} className={`px-3 lg:px-5 py-1 lg:py-2 border-blue-500 cursor-pointer ${barSel == 2 ? ' border-b-2 font-bold text-sm' : ''}`}>โอนธนาคาร</div>
                            </div>
                        </div>
                        <div className="grid grid-cols-4 gap-2 max-w-sm ml-8">
                            <div className="col-span-1 p-5 bg-gray-300 rounded-sm"></div>
                            <div className="col-span-1 p-5 bg-gray-300 rounded-sm"></div>
                            <div className="col-span-1 p-5 bg-gray-300 rounded-sm"></div>
                            <div className="col-span-1 p-5 bg-gray-300 rounded-sm"></div>
                        </div>
                        <div className="flex flex-col ml-8">
                            <div className="text-left text-black text-base mb-2 mt-6">ชื่อผู้ถือบัตร</div>
                            <div className="grid grid-cols-3 gap-4">
                                <label className="col-span-1 form-control">
                                    <input type="text" placeholder="ชื่อ" className="input input-bordered drop-shadow-sm w-full focus:outline-none focus:border-pethub-color4" />
                                </label>
                                <label className="col-span-1 form-control">
                                    <input type="text" placeholder="นามสกุล" className="input input-bordered drop-shadow-sm w-full focus:outline-none focus:border-pethub-color4" />
                                </label>
                                <div className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-green-600">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                </div>                                                         
                            </div>
                            <div className="text-left text-black text-base mt-6 mb-2">หมายเลขบัตรของคุณ</div>
                            <div className="grid grid-cols-3 gap-4">
                                <label className="col-span-2 form-control">
                                    <input type="text" placeholder="xxxx xxxx xxxx xxxx" className="input input-bordered drop-shadow-sm w-full focus:outline-none focus:border-pethub-color4" />
                                </label>
                                <div className="col-span-1 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-green-600">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                </div>    
                            </div>
                            <div className="text-left text-black text-base mt-6 mb-2">วันหมดอายุ</div>
                            <div className="grid grid-cols-4 gap-4">
                                {/* Month Dropdown */}
                                <select
                                    className="col-span-1 select select-bordered drop-shadow-sm w-full focus:outline-none focus:border-pethub-color4"
                                    value={month}
                                    onChange={(e) => setMonth(e.target.value)}
                                >
                                    <option disabled value="">เดือน</option>
                                    {months.map((m, index) => (
                                    <option key={index} value={m}>{m}</option>
                                    ))}
                                </select>
                                
                                {/* Year Dropdown */}
                                <select
                                    className="col-span-1 select select-bordered drop-shadow-sm w-full focus:outline-none focus:border-pethub-color4"
                                    value={year}
                                    onChange={(e) => setYear(e.target.value)}
                                >
                                    <option disabled value="">ปี</option>
                                    {years.map((y, index) => (
                                    <option key={index} value={y}>{y}</option>
                                    ))}
                                </select>
                                <div className="col-span-1 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-green-600">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="text-left text-black text-base mb-2 mt-6">CVV / CVC</div>
                            <div className="grid grid-cols-4 gap-4 mb-8">
                                <label className="col-span-1 form-control">
                                    <input type="text" placeholder="xxx" className="input input-bordered drop-shadow-sm w-full focus:outline-none focus:border-pethub-color4" />
                                </label>
                                <div className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-green-600">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                </div>                                                         
                            </div>                            
                        </div>
                    </div>
                    <div className="flex flex-col bg-white border border-neutral-100 drop-shadow-xl rounded-xl mt-8 mb-8">
                        <div className="bg-yellow-400 p-4 rounded-t-xl">
                            <div className="flex flex-row">
                                <div className="text-black text-base font-medium ml-8">
                                    ข้อมูลสำคัญเกี่ยวกับการจองของคุณ
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col items-start mt-6 ml-10 gap-2">
                            <li className="text-base text-black">การขยายเวลาการเข้าพักจะต้องทำการจองใหม่</li>
                            <li className="text-base text-black">พนักงานต้อนรับจะรอต้อนรับคุณเมื่อมาถึง</li>
                            <li className="text-base text-black">จะไม่มีการคืนเงินหากคุณเช็คอินล่าช้าหรือเช็คเอาท์ก่อนเวลา</li>
                        </div>
                        <div className="flex flex-col items-start mt-4 ml-8">
                            <div className="text-sm">
                                โดยการคลิกปุ่มด้านล่างนี้ ถือว่าคุณรับทราบนโยบายความเป็นส่วนตัวและยอมรับกฎข้อบังคับ ข้อกำหนด และเงื่อนไขการใช้งานแล้ว
                            </div>
                        </div>
                        <div className="flex justify-start items-center w-full max-w-3xl mt-6 ml-8">
                            <button className="bg-pethub-color1 text-white border border-pethub-color1 rounded-xl btn sm:btn-xs md:btn-sm lg:btn-md">
                                ยืนยันการชำระเงิน
                            </button>
                        </div>
                        <div className="flex flex-row items-center gap-2 mt-6 mb-8 ml-8">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                            </svg>
                            <div className="text-sm">
                                เราใช้การส่งข้อมูลที่ปลอดภัยและการจัดเก็บข้อมูลที่เข้ารหัสเพื่อปกป้องข้อมูลส่วนบุคคลของคุณ
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-1 w-11/12">
                    <div className="flex flex-col bg-white border border-neutral-100 drop-shadow-xl rounded-xl">
                        <div className="bg-gray-300 p-28 rounded-t-xl"></div>
                        <div className="flex flex-col p-6">
                            <div className="text-left text-black text-lg mt-2">
                                Bangmod pet hotel
                            </div>
                            <div className="flex flex-row items-center mt-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill max-md:w-[6px] text-yellow-400" viewBox="0 0 16 16">
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill max-md:w-[6px] text-yellow-400" viewBox="0 0 16 16">
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill max-md:w-[6px] text-yellow-400" viewBox="0 0 16 16">
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill max-md:w-[6px] text-yellow-400" viewBox="0 0 16 16">
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill max-md:w-[6px] text-yellow-400" viewBox="0 0 16 16">
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill max-md:w-[6px] text-yellow-400" viewBox="0 0 16 16">
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                </svg>
                                <div className="text-base text-black ml-2">
                                    5.0
                                </div>
                                <div className="text-base text-black ml-2">
                                    (1200 Reviews)
                                </div>
                            </div>
                            <div className="flex items-start flex-col mt-8 gap-1">
                                <div className="text-base text-red-500">
                                    ไม่สามารถคืนเงินได้
                                </div>
                                <div className="text-base text-black">
                                    เช็คอิน: วันอาทิตย์, 10 พฤศจิกายน, 2024
                                </div>
                                <div className="text-base text-black">
                                    เช็คอิน: วันอังคาร, 12 พฤศจิกายน, 2024
                                </div>
                                <div className="text-base text-black">
                                    นอนพัก 2 คืน
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col bg-white border border-neutral-100 drop-shadow-xl rounded-xl mt-6">
                        <div className="bg-black p-4 rounded-t-xl">
                            <div className="flex flex-row">
                                <div className="text-white text-base font-medium ml-8">
                                    ข้อมูลราคา
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col p-8 gap-2">
                            <div className="flex justify-between">
                                <div className="text-base text-black">
                                    1 ห้อง x 2 คืน
                                </div>
                                <div className="text-base text-black">
                                    1,500 ฿
                                </div>
                            </div>
                            <div className="flex justify-between">
                                <div className="text-base text-black">
                                    ภาษีและค่าบริการ
                                </div>
                                <div className="text-base text-black">
                                    130 ฿
                                </div>
                            </div>
                            <div className="flex justify-between mt-4">
                                <div className="text-black text-lg font-bold">
                                    รวมทั้งสิ้น
                                </div>
                                <div className="text-black text-lg font-bold">
                                    1,630 ฿
                                </div>
                            </div>
                            <div className="text-left text-blue-600 text-sm">
                                ใช้คูปอง, เครดิต หรือโค้ดโปรโมชั่น
                            </div>
                            <div className="flex flex-col mt-4">
                                <div className="text-left text-black text-lg font-bold">
                                    โค้ดคูปอง
                                </div>
                                <div className="grid grid-cols-3 gap-2 mt-2">
                                    <label className="col-span-2 form-control">
                                        <input type="text" placeholder="" className="input input-bordered drop-shadow-sm w-full focus:outline-none focus:border-pethub-color4" />
                                    </label>
                                    <button className="bg-black text-white border border-black rounded-lg btn sm:btn-xs md:btn-sm lg:btn-md">
                                        นำไปใช้
                                    </button>                                   
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment
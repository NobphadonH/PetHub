import Navbar from "./Utils/Navbar";
import { useState } from 'react';

function Payment() {
    // State management
    const [barSel, setBarSel] = useState(0); // Track selected payment method
    const [month, setMonth] = useState(''); // Track selected month
    const [year, setYear] = useState('');   // Track selected year

    // Event handler for selecting payment option
    const handleSelect = (e) => {
        setBarSel(e.target.id);
    };

    // Month and Year arrays for dropdown options
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const years = Array.from(new Array(10), (_, i) => new Date().getFullYear() + i);

    return (
        <div>
            <Navbar />
            <div className="grid grid-cols-1 lg:grid-cols-3 mt-12 lg:mt-24 w-11/12 mx-auto gap-6">
                {/* Main Payment Form */}
                <div className="col-span-2 mx-auto w-full lg:w-11/12">
                    <div className="flex flex-col bg-white border border-neutral-100 drop-shadow-xl rounded-xl p-4">
                        <div className="bg-pethub-color1 p-4 rounded-t-xl flex items-center gap-4">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="h-6 w-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
                            </svg>
                            <div className="text-white text-sm lg:text-base font-medium">
                                ตัวเลือกในการชำระเงิน
                            </div>
                        </div>

                        {/* Payment method selection */}
                        <div className="mt-4 mb-6 ml-4">
                            <div className='w-full flex flex-wrap gap-2 lg:gap-5 text-xs lg:text-sm items-center'>
                                {['บัตรเดบิต/บัตรเครดิต', 'เพย์แพล', 'โอนธนาคาร'].map((method, index) => (
                                    <div key={index} id={index} onClick={handleSelect} className={`px-3 lg:px-5 py-1 lg:py-2 border-blue-500 cursor-pointer ${barSel == index ? ' border-b-2 font-bold' : ''}`}>
                                        {method}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Card Information Form */}
                        <div className="flex flex-col ml-4 lg:ml-8">
                            {/* Cardholder Name */}
                            <div className="text-left text-black text-sm lg:text-base mb-2 mt-6">ชื่อผู้ถือบัตร</div>
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                                <input type="text" placeholder="ชื่อ" className="input input-bordered drop-shadow-sm w-full" />
                                <input type="text" placeholder="นามสกุล" className="input input-bordered drop-shadow-sm w-full" />
                            </div>

                            {/* Card Number */}
                            <div className="text-left text-black text-sm lg:text-base mt-6 mb-2">หมายเลขบัตรของคุณ</div>
                            <input type="text" placeholder="xxxx xxxx xxxx xxxx" className="input input-bordered drop-shadow-sm w-full" />

                            {/* Expiry Date */}
                            <div className="text-left text-black text-sm lg:text-base mt-6 mb-2">วันหมดอายุ</div>
                            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                                <select value={month} onChange={(e) => setMonth(e.target.value)} className="select select-bordered drop-shadow-sm w-full">
                                    <option disabled value="">เดือน</option>
                                    {months.map((m, index) => (
                                        <option key={index} value={m}>{m}</option>
                                    ))}
                                </select>
                                <select value={year} onChange={(e) => setYear(e.target.value)} className="select select-bordered drop-shadow-sm w-full">
                                    <option disabled value="">ปี</option>
                                    {years.map((y, index) => (
                                        <option key={index} value={y}>{y}</option>
                                    ))}
                                </select>
                            </div>

                            {/* CVV/CVC */}
                            <div className="text-left text-black text-sm lg:text-base mt-6 mb-2">CVV / CVC</div>
                            <input type="text" placeholder="xxx" className="input input-bordered drop-shadow-sm w-full" />
                        </div>
                    </div>

                    {/* Booking Information Section */}
                    <div className="flex flex-col bg-white border border-neutral-100 drop-shadow-xl rounded-xl mt-8 mb-8">
                        <div className="bg-yellow-400 p-4 rounded-t-xl">
                            <div className="text-black text-sm lg:text-base font-medium ml-8">
                                ข้อมูลสำคัญเกี่ยวกับการจองของคุณ
                            </div>
                        </div>
                        <ul className="ml-4 lg:ml-10 mt-4 lg:mt-6 text-sm lg:text-base text-black">
                            <li>การขยายเวลาการเข้าพักจะต้องทำการจองใหม่</li>
                            <li>พนักงานต้อนรับจะรอต้อนรับคุณเมื่อมาถึง</li>
                            <li>จะไม่มีการคืนเงินหากคุณเช็คอินล่าช้าหรือเช็คเอาท์ก่อนเวลา</li>
                        </ul>
                    </div>

                    {/* Pricing Information */}
                    <div className="flex flex-col bg-white border border-neutral-100 drop-shadow-xl rounded-xl mt-6">
                        <div className="bg-black p-4 rounded-t-xl text-white text-sm lg:text-base font-medium ml-4 lg:ml-8">
                            ข้อมูลราคา
                        </div>
                        <div className="p-4 lg:p-8 text-sm lg:text-base text-black">
                            <div className="flex justify-between">
                                <span>1 ห้อง x 2 คืน</span>
                                <span>1,500 ฿</span>
                            </div>
                            <div className="flex justify-between">
                                <span>ภาษีและค่าบริการ</span>
                                <span>130 ฿</span>
                            </div>
                            <div className="flex justify-between mt-4 font-bold text-lg">
                                <span>รวมทั้งสิ้น</span>
                                <span>1,630 ฿</span>
                            </div>
                            <div className="mt-4 text-blue-600 text-sm lg:text-base">ใช้คูปอง, เครดิต หรือโค้ดโปรโมชั่น</div>
                        </div>
                    </div>
                </div>

                {/* Booking Summary Section */}
                <div className="col-span-1 w-full lg:w-11/12">
                    <div className="bg-white border border-neutral-100 drop-shadow-xl rounded-xl">
                        <div className="bg-gray-300 p-20 lg:p-28 rounded-t-xl"></div>
                        <div className="flex flex-col p-4 lg:p-6">
                            <div className="text-left text-black text-base lg:text-lg mt-2">Bangmod pet hotel</div>
                            <div className="flex items-center mt-2 gap-2 text-yellow-400">
                                <span>★★★★★</span>
                                <span className="text-black text-sm lg:text-base">(1200 Reviews)</span>
                            </div>
                            <div className="text-sm lg:text-base text-red-500 mt-4 lg:mt-8">ไม่สามารถคืนเงินได้</div>
                            <div className="text-sm lg:text-base text-black">เช็คอิน: วันอาทิตย์, 10 พฤศจิกายน, 2024</div>
                            <div className="text-sm lg:text-base text-black">เช็คเอาท์: วันอังคาร, 12 พฤศจิกายน, 2024</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Payment;

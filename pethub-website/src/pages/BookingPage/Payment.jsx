import axios from "axios";
import Navbar from "../../components/Navbar";
import { useState } from 'react';
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";


function Payment() {
    
    //router state
    const location = useLocation()
    const navigate = useNavigate()
    //router state

    //page state
    const [barSel, setBarSel] = useState(0);
    const [month, setMonth] = useState(''); 
    const [year, setYear] = useState(''); 
    //page state
    
    //data state
    const [cardData, setCardData] = useState({});
    const bookingData = location.state;
    //data state

    //function
    const handleSelect = (e) => {
        setBarSel(e.target.id);
    };

    //validate function
    const validateCardForm = () => {
        const requiredFields = [
          { field: "cardName", label: "ชื่อผู้ถือบัตร" },
          { field: "cardNumber", label: "หมายเลขบัตรของคุณ" },
          { field: "month", label: "เดือนหมดอายุ" },
          { field: "year", label: "ปีหมดอายุ" },
          { field: "cvv", label: "CVV / CVC" },
        ];
      
        // Loop through the required fields to check if they are empty
        for (const { field, label } of requiredFields) {
          if (!cardData[field] || cardData[field] === "") {
            toast.error(`ยังไม่ได้ใส่ข้อมูล ${label}`);
            return false;
          }
        }
      
        // Validate card number format (e.g., "xxxx xxxx xxxx xxxx")
        const cardNumberPattern = /^[0-9]{4}([ ]?[0-9]{4}){3}$/;
        if (!cardNumberPattern.test(cardData.cardNumber)) {
          toast.error("หมายเลขบัตรต้องเป็นรูปแบบ xxxx xxxx xxxx xxxx");
          return false;
        }
      
        // Validate CVV format (3 digits)
        const cvvPattern = /^[0-9]{3}$/;
        if (!cvvPattern.test(cardData.cvv)) {
          toast.error("CVV ต้องเป็นตัวเลข 3 หลัก");
          return false;
        }
      
        return true;
      };
      

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const years = Array.from(new Array(10), (_, i) => new Date().getFullYear() + i);

    const formatThaiDate = (dateString) => {
        const days = [
          "วันอาทิตย์",
          "วันจันทร์",
          "วันอังคาร",
          "วันพุธ",
          "วันพฤหัสบดี",
          "วันศุกร์",
          "วันเสาร์",
        ];
        const months = [
          "มกราคม",
          "กุมภาพันธ์",
          "มีนาคม",
          "เมษายน",
          "พฤษภาคม",
          "มิถุนายน",
          "กรกฎาคม",
          "สิงหาคม",
          "กันยายน",
          "ตุลาคม",
          "พฤศจิกายน",
          "ธันวาคม",
        ];
      
        const date = new Date(dateString);
        const dayOfWeek = days[date.getDay()];
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        
        return `${dayOfWeek}, ${day} ${month}, ${year}`;
      };
      

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!validateCardForm()) return;
        let bookingID;
        
        try {
            const bookingRes = await axios.post('https://pethub-3nkk.onrender.com/api/booking/createBooking', {
                petID : bookingData.petID,
                roomTypeID : bookingData.roomTypeID,
                checkInDate : bookingData.checkIn,
                checkOutDate : bookingData.checkOut,
                bookingDetail : bookingData.bookingDetail
            }, {withCredentials:true})
            
            bookingID = bookingRes.data.bookingID;
        } catch (err) {
            console.log(err);
        }
    

        try {
            const res = await axios.post('https://pethub-3nkk.onrender.com/api/payment/createPayment', {
                bookingID : bookingID,
                petAllowedType : bookingData.petAllowedType,
                amount : bookingData.amount
                
            }, {withCredentials: true});
            toast.loading("ดำเนินการชำระเงิน")


            console.log(res);

            if (res.status==201) {
                if (bookingData.petAllowedType != 'อื่น ๆ') {
                    toast.success("ดำเนินการจองสำเร็จ")
                    navigate("/pethub-website/Home");
                    
                } else {
                    toast.success("กรุณารอการตอบกลับจากโรงแรม")
                    navigate("/pethub-website/Home");
                }
            }
        } catch (err) {
            console.log(err)
        }


    }

    const handleChange= (e) => {
        const { name, value } = e.target;
        setCardData((prev) => ({ ...prev, [name]: value }));
    };
    //function

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
                                {['บัตรเดบิต/บัตรเครดิต'].map((method, index) => (
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
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                <input
                                name = "cardName"
                                value = {cardData.cardName || ""}
                                onChange={handleChange}
                                type="text" placeholder="ชื่อบนบัตร" className="input input-bordered drop-shadow-sm w-full" />
                            </div>

                            {/* Card Number */}
                            <div className="text-left text-black text-sm lg:text-base mt-6 mb-2">หมายเลขบัตรของคุณ</div>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                <input 
                                name = "cardNumber"
                                value = {cardData.cardNumber || ""}
                                onChange={handleChange}
                                type="text" placeholder="xxxx xxxx xxxx xxxx" className="input input-bordered drop-shadow-sm w-full" />
                            </div>

                            {/* Expiry Date */}
                            <div className="text-left text-black text-sm lg:text-base mt-6 mb-2">วันหมดอายุ</div>
                            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                                <select 
                                name="month"
                                value={cardData.month ||""} onChange={handleChange} className="select select-bordered drop-shadow-sm w-full">
                                    <option disabled value="">เดือน</option>
                                    {months.map((m, index) => (
                                        <option key={index} value={m}>{m}</option>
                                    ))}
                                </select>
                                <select 
                                name="year"
                                value={cardData.year || ""} onChange={handleChange} className="select select-bordered drop-shadow-sm w-full">
                                    <option disabled value="">ปี</option>
                                    {years.map((y, index) => (
                                        <option key={index} value={y}>{y}</option>
                                    ))}
                                </select>
                            </div>

                            {/* CVV/CVC */}
                            <div className="text-left text-black text-sm lg:text-base mt-6 mb-2">CVV / CVC</div>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                <input 
                                name = "cvv"
                                value = {cardData.cvv || ""}
                                onChange = {handleChange}
                                type="text" placeholder="xxx" className="input input-bordered drop-shadow-sm w-full" />
                            </div>
                        </div>
                    </div>

                    {/* Booking Information Section */}
                    <div className="flex flex-col bg-white border border-neutral-100 drop-shadow-xl rounded-xl mt-8 mb-8">
                        <div className="bg-yellow-400 p-4 rounded-t-xl">
                            <div className="text-black text-sm lg:text-base font-medium ml-8">
                                ข้อมูลสำคัญเกี่ยวกับการจองของคุณ
                            </div>
                        </div>
                        <ul className="ml-4 lg:ml-10 mt-4 lg:my-6 text-sm lg:text-base text-black">
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
                                <span>1 ห้อง x {bookingData.numberOfNight} คืน</span>
                                <span>{bookingData.amount} ฿</span>
                            </div>

                            <div className="flex justify-between mt-4 font-bold text-lg">
                                <span>รวมทั้งสิ้น</span>
                                <span>{bookingData.amount} ฿</span>
                            </div>
                            {/* <div className="mt-4 text-blue-600 text-sm lg:text-base">ใช้คูปอง, เครดิต หรือโค้ดโปรโมชั่น</div> */}
                        </div>
                    </div>


                    <button onClick={handleSubmit} className="my-8 flex justify-center items-center rounded-md md:btn bg-pethub-color1 md:bg-pethub-color1 text-white md:text-white max-sm:text-[2.5vw] h-[7vw] w-[20vw] sm:w-32 md:w-32 font-medium text-xs lg:text-sm xl:text-base"> ยืนยันการจอง </button>


                </div>
                

                {/* Booking Summary Section */}
                <div className="col-span-1 w-full ml-4 lg:ml-0 lg:w-11/12">
                    <div className="bg-white border border-neutral-100 drop-shadow-xl rounded-xl">
                        <img src={bookingData.hotelPhoto}/>
                        {/* <div className="bg-gray-300 p-20 lg:p-28 rounded-t-xl"> </div> */}
                        <div className="flex flex-col p-4 lg:p-6">
                            <div className="text-left text-black text-base lg:text-lg mt-2">{bookingData.hotelName}</div>
                            <div className="flex items-center mt-2 gap-2 text-yellow-400">
                                {Array.from({ length: bookingData.reviewScore }).map((_, index) => (
                                <svg key={index} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill w-[8px] sm:w-[12px] lg:w-[16px] text-yellow-400" viewBox="0 0 16 16">
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                </svg>
                                 ))}
                        
                                <span className="text-black text-sm lg:text-base"> ( {bookingData.reviewCount} รีวิว)</span>
                            </div>
                            <div className="text-sm lg:text-base text-red-500 mt-4 lg:mt-8">ไม่สามารถคืนเงินได้</div>
                            <div className="text-sm lg:text-base text-black">เช็คอิน: {formatThaiDate(bookingData.checkIn)}</div>
                            <div className="text-sm lg:text-base text-black">เช็คเอาท์: {formatThaiDate(bookingData.checkOut)}</div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}

export default Payment;

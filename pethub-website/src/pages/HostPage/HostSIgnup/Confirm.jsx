import Navbar from "../../../components/Navbar";
import { useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios'
import { toast } from "react-toastify";
import dotenv from 'dotenv';

dotenv.config(); // Load variables from .env

const BASE_URL = process.env.SERVER_API

function Confirm() {

    //router state
    const location = useLocation();
    const navigate = useNavigate();
    //router state
    
    //data state
    const [hotelAndRoomFormData]= useState(location.state);
    //data state

    
    //function
    const handleSubmit = async (e) => {
        e.preventDefault();

        //hotel section
        const hotelData = new FormData()
        const hotelFormData = hotelAndRoomFormData.hotelFormData;
        hotelData.append('hotelName', hotelFormData.hotelName);
        hotelData.append('hotelDescription', hotelFormData.hotelDescription);
        hotelData.append('hotelPolicy', hotelFormData.hotelPolicy);
        hotelData.append('hotelAddress', hotelFormData.hotelAddress);
        hotelData.append('district', hotelFormData.district);
        hotelData.append('hotelType', hotelFormData.hotelType);
        hotelData.append('checkInFrom', hotelFormData.checkInFrom);
        hotelData.append('checkOutUntil', hotelFormData.checkOutUntil);
        hotelData.append('mapLat', hotelFormData.mapLat);
        hotelData.append('mapLong', hotelFormData.mapLong);
        hotelData.append('cookies', hotelFormData.cookies);
        let hotelID;

        if (hotelFormData.selectedImage) {
            const base64Data = hotelFormData.selectedImage;
            const blob = new Blob([new Uint8Array(atob(base64Data.split(',')[1]).split('').map(c => c.charCodeAt(0)))], { type: 'image/jpg' });
            hotelData.append('selectedImage', blob, `hotel_${hotelFormData.hotelName}.jpg`);
        }

        try {
            const res = await axios.post(`${BASE_URL}/api/hotel/createHotel/`, hotelData, {headers:{"Content-Type":"multipart/form-data" }, withCredentials:true})
            console.log(res.data)
            hotelID = res.data.hotelID
            console.log(res.status)
            toast.success("ลงทะเบียนสำเร็จ กรุณารอการยืนยัน")
        } catch(error) {
            console.error(error);
        }
        //hotel section


        //room section
        const roomArrayData = new FormData()
        const roomFormArray = hotelAndRoomFormData.readyRoomFormArray;
        roomArrayData.append('hotelID', hotelID)


        roomFormArray.forEach((room, index) => {
            roomArrayData.append(`rooms[${index}][roomTypeName]`, room.roomTypeName)
            roomArrayData.append(`rooms[${index}][roomCapacity]`, room.roomCapacity)
            roomArrayData.append(`rooms[${index}][numberOfRoom]`, room.numberOfRoom)
            roomArrayData.append(`rooms[${index}][roomSize]`, room.roomSize)
            roomArrayData.append(`rooms[${index}][roomDetail]`, room.roomDetail)
            roomArrayData.append(`rooms[${index}][petAllowedType]`, room.petAllowedType)
            roomArrayData.append(`rooms[${index}][pricePerNight]`, room.pricePerNight)
            
            if (room.selectedImage) {
                const base64Data = room.selectedImage;
                const blob = new Blob([new Uint8Array(atob(base64Data.split(',')[1]).split('').map(c => c.charCodeAt(0)))], { type: 'image/jpg' });
                roomArrayData.append(`rooms[${index}][selectedImage]`, blob, `room_photo_${index}.jpg`);
            }
        })

        try {
            const res = await axios.post(`${BASE_URL}/api/room/createRooms/`, roomArrayData, {headers:{"Content-Type":"multipart/form-data" }, withCredentials:true})
            console.log(res.data)
            console.log(res.status)
        } catch(error) {
            console.error(error);
        }
        //room section
    }

    const goPreviousPage = () => {
        navigate("/pethub-website/rooms", {state: hotelAndRoomFormData})
    }
    //function

    return (
        <div>
            <Navbar />
            <div className="flex flex-col mt-24 px-4 sm:px-8 md:px-16 lg:px-32">
                <div className="text-black font-bold text-xl mx-10 md:text-2xl lg:text-3xl mt-4 text-center">
                    ลงทะเบียนโรงแรมสัตว์เลี้ยงของคุณให้สมบูรณ์แบบบน PetHub
                </div>
                <div className="flex justify-center">
                    <div className="max-w-xl mx-auto">
                        <div className="text-gray-800 text-base mt-4 text-center sm:text-left">
                            กรุณากรอกแบบฟอร์มด้านล่าง ข้อมูลทุกช่องจำเป็นต้องกรอก
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-full sm:w-3/4 lg:w-1/2 bg-white border border-neutral-100 drop-shadow-xl p-8 rounded-3xl mt-8 mx-auto">
                    <div className="flex justify-center items-center">
                        <ul className="steps w-full max-w-2xl mt-2">
                            <li className="step step-accent text-gray-800 text-sm">ข้อมูลทั่วไป</li>
                            <li className="step step-accent text-gray-800 text-sm">ห้อง</li>                            
                            <li className="step step-accent text-gray-800 text-sm">ยืนยัน</li>
                        </ul>
                    </div>
                    <div className="flex justify-center items-center">
                        <div className="w-full max-w-xl flex-grow border-t border-gray-300 mt-5 mb-14"></div>
                    </div>
                    <div className="w-full max-w-xl mx-auto text-left text-black font-bold text-xl">โปรดตรวจสอบข้อมูลให้ครบถ้วนก่อนยืนยันการสมัคร</div>
                    <div className="w-full max-w-xl mx-auto text-left text-gray-600 text-sm mt-2 mb-2">ก่อนที่จะยืนยันคำขอของคุณ กรุณาตรวจสอบรายละเอียดทั้งหมดอีกครั้ง เพื่อให้มั่นใจว่าไม่มีข้อผิดพลาดหรือข้อมูลที่ขาดหายไป หากต้องการเพิ่มหรือแก้ไขข้อมูลเพิ่มเติม คุณสามารถทำได้หลังจากการยืนยันนี้เสร็จสิ้น</div>
                    <div className="w-full max-w-xl mx-auto text-left text-gray-600 text-sm mt-2 mb-6">*หมายเหตุ : การส่งคำขอของคุณจะเสร็จสิ้นก็ต่อเมื่อได้รับการพิจารณาจากทาง PetHub</div>
                    
                </div>
                <div className="flex justify-between items-center w-full max-w-3xl -mt-4 mb-4 p-6 mx-auto">
                    <button onClick={goPreviousPage} className="bg-black text-white border border-black rounded-2xl mt-6 btn sm:btn-xs md:btn-sm lg:btn-md">
                        ขั้นตอนก่อนหน้า
                    </button>
                    <button onClick={handleSubmit} className="bg-black text-white border border-black rounded-2xl mt-6 btn sm:btn-xs md:btn-sm lg:btn-md">
                        ยืนยันส่งคำขอ
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Confirm

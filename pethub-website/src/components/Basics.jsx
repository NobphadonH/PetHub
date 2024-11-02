import Navbar from "./Utils/Navbar"
import { useState } from 'react';

function TypeChoiceBoxes() {
    const [selected, setSelected] = useState(null);

    const options = [
        {
            id: 1,
            title: "โรงแรมสัตว์เลี้ยงระดับมืออาชีพ",
            description: "อาคารหลายห้องสำหรับสัตว์เลี้ยง พร้อมทีมงานดูแลโดยเฉพาะ",
        },
        {
            id: 2,
            title: "เดย์แคร์สัตว์เลี้ยง",
            description: "สำหรับการดูแลระยะสั้นหรือการดูแลระหว่างวัน",
        },
        {
            id: 3,
            title: "รีสอร์ทและสปาสำหรับสัตว์เลี้ยง",
            description: "ที่พักหรูพร้อมบริการเสริม เช่น อาบน้ำ ตัดแต่งขนเป็นพิเศษ",
        },
        {
            id: 4,
            title: "โรงแรมที่เป็นมิตรกับสัตว์เลี้ยง",
            description: "สำหรับโรงแรมที่รองรับทั้งผู้เข้าพักและสัตว์เลี้ยง",
        }
    ];

    return (
        <div className="grid grid-cols-2 gap-4 mt-4">
            {options.map(option => (
                <div
                    key={option.id}
                    className={`col-span-1 bg-white border p-6 rounded-xl drop-shadow-md cursor-pointer ${
                        selected === option.id ? 'border-pethub-color4' : 'border-neutral-100'
                    }`}
                    onClick={() => setSelected(option.id)}
                >
                    <div className="grid grid-cols-6 gap-2">
                        <div className="col-start-1 col-span-1 flex items-center">
                            <div className={`w-4 h-4 rounded-full ${
                                selected === option.id ? 'bg-pethub-color4' : 'bg-gray-300'
                            }`}></div>
                        </div>
                        <div className="col-start-2 col-span-5">
                            <div className="text-left text-sm font-bold">{option.title}</div>
                            <div className="text-left text-sm">{option.description}</div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

function CancellationPolicy() {
    const [selected, setSelected] = useState(null);

    const policies = [
        {
            id: 1,
            title: "นโยบายการยกเลิกที่ยืดหยุ่น",
            details: [
                "คืนเงินเต็มจำนวน: ผู้เข้าพักสามารถยกเลิกการจองได้ถึง 24 ชั่วโมงก่อนวันเช็คอิน และจะได้รับเงินคืนเต็มจำนวน",
                "คืนเงินบางส่วน: หากผู้เข้าพักยกเลิกภายใน 24 ชั่วโมงก่อนวันเช็คอิน จะได้รับเงินคืน 50%",
                "ไม่คืนเงิน: ไม่มีการคืนเงินสำหรับการยกเลิกในวันเช็คอิน"
            ],
        },
        {
            id: 2,
            title: "นโยบายการยกเลิกแบบปานกลาง",
            details: [
                "คืนเงินเต็มจำนวน: ผู้เข้าพักสามารถยกเลิกการจองได้ถึง 7 วันก่อนวันเช็คอิน และจะได้รับเงินคืนเต็มจำนวน",
                "คืนเงินบางส่วน: การยกเลิกที่ทำระหว่าง 6 ถึง 2 วันก่อนวันเช็คอิน จะได้รับเงินคืน 50%",
                "ไม่คืนเงิน: หากผู้เข้าพักยกเลิกภายใน 48 ชั่วโมงก่อนวันเช็คอิน จะไม่ได้รับเงินคืน"
            ],
        },
        {
            id: 3,
            title: "นโยบายการยกเลิกแบบเข้มงวด",
            details: [
                "คืนเงินเต็มจำนวน: ผู้เข้าพักสามารถยกเลิกการจองได้ถึง 14 วันก่อนวันเช็คอิน และจะได้รับเงินคืนเต็มจำนวน",
                "คืนเงินบางส่วน: การยกเลิกที่ทำระหว่าง 13 วันถึง 7 วันก่อนวันเช็คอิน จะได้รับเงินคืน 50%",
                "ไม่คืนเงิน: ไม่มีการคืนเงินสำหรับการยกเลิกที่ทำภายใน 7 วันก่อนวันเช็คอิน"
            ],
        }
    ];

    return (
        <div className="grid grid-cols-1 gap-4 mt-4">
            {policies.map(policy => (
                <div
                    key={policy.id}
                    className={`bg-white border p-6 rounded-xl drop-shadow-md cursor-pointer ${
                        selected === policy.id ? 'border-pethub-color4' : 'border-neutral-200'
                    }`}
                    onClick={() => setSelected(policy.id)}
                >
                    <div className="grid grid-cols-6 gap-2">
                        <div className="col-start-1 col-span-1 flex items-start mt-1">
                            <div className={`w-4 h-4 rounded-full ${
                                selected === policy.id ? 'bg-pethub-color4' : 'bg-gray-300'
                            }`}></div>
                        </div>
                        <div className="col-start-2 col-span-5">
                            <div className="text-left text-lg font-bold">{policy.title}</div>
                            <ul className="text-left text-sm mt-1 list-disc pl-5 text-gray-700">
                                {policy.details.map((detail, index) => (
                                    <li key={index}>{detail}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

function CheckInCheckOut() {
    const [checkInStart, setCheckInStart] = useState("");
    const [checkInEnd, setCheckInEnd] = useState("");
    const [checkOut, setCheckOut] = useState("");

    const times = [
        "00:00", "1:00", "2:00", "3:00", "4:00", "5:00",
        "6:00", "7:00", "8:00", "9:00", "10:00", "11:00",
        "12:00", "13:00", "14:00", "15:00", "16:00", "17:00",
        "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"
    ];

    return (
        <div className="flex flex-col mt-4">
            <div className="grid grid-cols-6">
                <span className="flex items-center text-sm text-gray-700">ระหว่าง</span>
                <select
                    value={checkInStart}
                    onChange={(e) => setCheckInStart(e.target.value)}
                    className="select select-bordered rounded-xl drop-shadow-sm focus:outline-none focus:border-pethub-color4"
                >
                    <option value="" disabled></option>
                    {times.map((time, index) => (
                        <option key={index} value={time}>{time}</option>
                    ))}
                </select>
                
                <span className="flex items-center justify-center text-sm text-gray-700">และ</span>
                <select
                    value={checkInEnd}
                    onChange={(e) => setCheckInEnd(e.target.value)}
                    className="select select-bordered drop-shadow-sm rounded-xl focus:outline-none focus:border-pethub-color4"
                >
                    <option value="" disabled></option>
                    {times.map((time, index) => (
                        <option key={index} value={time}>{time}</option>
                    ))}
                </select>
            </div>
            <div className="flex flex-col justify-start mt-4">
                <div className="flex text-start text-sm text-gray-600">เลือกเวลาที่ลูกค้าจะต้องเช็คเอาท์ก่อน</div>
                <select
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="select select-bordered drop-shadow-sm w-full w-24 rounded-xl focus:outline-none focus:border-pethub-color4 mt-4 mb-6"
                >
                    <option value="" disabled></option>
                    {times.map((time, index) => (
                        <option key={index} value={time}>{time}</option>
                    ))}
                </select>
            </div>
        </div>
    );
}

function Basics() {
    return (
        <div>
            <Navbar />
            <div className="flex flex-col mt-24">
                <div className="text-black font-bold text-3xl mt-4">ลงทะเบียนโรงแรมสัตว์เลี้ยงของคุณให้สมบูรณ์แบบบน PetHub</div>
                <div className="flex justify-center">
                    <div className="max-w-xl mx-auto">
                        <div className="text-gray-800 text-base mt-4">
                            กรุณากรอกแบบฟอร์มด้านล่าง ข้อมูลทุกช่องจำเป็นต้องกรอก
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-1/2 bg-white border border-neutral-100 drop-shadow-xl p-8 rounded-3xl mt-8 mx-auto">
                    <div className="flex justify-center items-center">
                        <ul className="steps w-full max-w-2xl mt-2">
                            <li className="step step-accent text-gray-800 text-sm">ข้อมูลทั่วไป</li>
                            <li className="step text-gray-500 text-sm">ห้อง</li>
                            <li className="step text-gray-500 text-sm">รูปภาพ</li>
                            <li className="step text-gray-500 text-sm">โปรไฟล์</li>
                        </ul>
                    </div>
                    <div className="flex justify-center items-center">
                        <div className="w-full max-w-xl flex-grow border-t border-gray-300 mt-5 mb-14"></div>
                    </div>
                    <div className="flex flex-col w-full max-w-xl mx-auto">
                        <div className="text-left text-black font-bold text-xl">ตั้งชื่อโรงแรมสัตว์เลี้ยงของคุณ</div>
                        <div className="text-left text-gray-600 text-sm mt-2">ทำให้โดดเด่นและน่าเข้าพัก เพราะนี่เป็นสิ่งแรกที่เจ้าของสัตว์เลี้ยงจะเห็น</div>
                        <label className="form-control w-full mt-6">
                            <div className="text-left text-black text-base mb-2">ชื่อที่พัก</div>
                            <input type="text" placeholder="ใส่ชื่อที่พักของคุณที่นี่" className="input input-bordered drop-shadow-sm w-full focus:outline-none focus:border-pethub-color4" />
                        </label>
                        <div className="text-left text-black font-bold text-xl mt-12">เลือกประเภทโรงแรมสัตว์เลี้ยงของคุณ</div>
                        <div className="text-left text-gray-600 text-sm mt-2">เลือกหนึ่งจากตัวเลือกด้านล่าง</div>
                        <TypeChoiceBoxes />
                        <div className="text-left text-black font-bold text-xl mt-12">รายละเอียดที่พักของคุณ</div>
                        <div className="text-left text-gray-600 text-sm mt-2">ให้ข้อมูลสั้น ๆ เพื่อให้ลูกค้าเข้าใจรายละเอียดของที่พัก</div>
                        <textarea placeholder="อธิบายสถานที่ของคุณ" className="textarea textarea-bordered textarea-md drop-shadow-sm w-full max-w-xl mt-4 focus:outline-none focus:border-pethub-color4"></textarea>
                        <div className="text-left text-black font-bold text-xl mt-12">สถานที่ตั้ง</div>
                        <div className="text-left text-gray-600 text-sm mt-2">ลูกค้าจะได้รับที่อยู่ที่แน่นอนของคุณก็ต่อเมื่อทำการจองเรียบร้อยแล้ว</div>
                        <label className="form-control w-full mt-6">
                            <div className="text-left text-black text-base mb-2">ที่อยู่</div>
                            <textarea placeholder="อธิบายสถานที่ของคุณ" className="textarea textarea-bordered textarea-md drop-shadow-sm w-full max-w-xl focus:outline-none focus:border-pethub-color4"></textarea>
                        </label>
                        <div className="grid grid-cols-2 gap-4">
                            <label className="form-control w-full mt-4">
                                <div className="text-left text-black text-base mb-2">จังหวัด</div>
                                <select className="select select-bordered drop-shadow-sm w-full max-w-xs focus:outline-none focus:border-pethub-color4">
                                    <option disabled selected>จังหวัด</option>
                                    <option>ราชบุรี</option>
                                    <option>ราชบุรี</option>
                                </select>
                            </label>
                            <label className="form-control w-full mt-4">
                                <div className="text-left text-black text-base mb-2">อำเภอ</div>
                                <select className="select select-bordered drop-shadow-sm w-full max-w-xs focus:outline-none focus:border-pethub-color4">
                                    <option disabled selected>อำเภอ</option>
                                    <option>โพธาราม</option>
                                    <option>โพธาราม</option>
                                </select>
                            </label>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <label className="form-control w-full mt-4">
                                <div className="text-left text-black text-base mb-2">ตำบล</div>
                                <select className="select select-bordered drop-shadow-sm w-full max-w-xs focus:outline-none focus:border-pethub-color4">
                                    <option disabled selected>ตำบล</option>
                                    <option>โพธาราม</option>
                                    <option>โพธาราม</option>
                                </select>
                            </label>
                            <label className="form-control w-full mt-4">
                                <div className="text-left text-black text-base mb-2">รหัสไปรษณีย์</div>
                                <input type="text" placeholder="ใส่รหัสไปรษณีย์ของคุณที่นี่" className="input input-bordered drop-shadow-sm w-full focus:outline-none focus:border-pethub-color4" />
                            </label>
                        </div>
                        <div className="text-left text-black font-bold text-xl mt-12">นโยบายการยกเลิกการจอง</div>
                        <div className="text-left text-gray-600 text-sm mt-2">เลือกหนึ่งจากตัวเลือกด้านล่าง</div>
                        <CancellationPolicy />
                        <div className="text-left text-black font-bold text-xl mt-12">ระยะทาง</div>
                        <div className="text-left text-gray-600 text-sm mt-2">ข้อมูลระยะทางจากสถานที่สำคัญ</div>
                        <label className="form-control w-full mt-4">
                            <div className="text-left text-black text-base mb-2">ระยะทางจากเมือง</div>
                            <div className="flex flex-row">
                                <input type="text" placeholder="0" className="input input-bordered drop-shadow-sm w-full max-w-xs focus:outline-none focus:border-pethub-color4" />
                                <div className="flex items-center justify-center text-gray-600 ml-4">กิโลเมตร</div>
                            </div>
                        </label>
                        <label className="form-control w-full mt-4">
                            <div className="text-left text-black text-base mb-2">ระยะทางจากสนามบิน</div>
                            <div className="flex flex-row">
                                <input type="text" placeholder="0" className="input input-bordered drop-shadow-sm w-full max-w-xs focus:outline-none focus:border-pethub-color4" />
                                <div className="flex items-center justify-center text-gray-600 ml-4">กิโลเมตร</div>
                            </div>
                        </label>
                        <div className="text-left text-black font-bold text-xl mt-12">เวลาเช็คอินและเช็คเอาท์</div>
                        <div className="text-left text-gray-600 text-sm mt-2">เลือกเวลาที่ลูกค้าสามารถทำการเช็คอิน</div>
                        <CheckInCheckOut />
                    </div>
                </div>
                <div className="flex justify-end items-center w-full max-w-3xl -mt-4 mb-4 p-6 mx-auto">
                    <button className="bg-black text-white border border-black rounded-2xl mt-6 btn sm:btn-xs md:btn-sm lg:btn-md">
                        ขั้นตอนต่อไป
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Basics
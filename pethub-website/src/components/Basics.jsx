import Navbar from "./Utils/Navbar"
import { useState } from 'react';

function PictureUpload() {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedImage(URL.createObjectURL(file));
        }
    };

    const handleDeleteImage = () => {
        setSelectedImage(null);
    };

    return (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 w-full max-w-xl mx-auto text-center">
            {selectedImage ? (
                <div className="relative">
                    <img
                        src={selectedImage}
                        alt="Uploaded"
                        className="max-w-full object-contain rounded-lg"
                    />
                    <button
                        onClick={handleDeleteImage}
                        className="absolute -top-1 -right-2 bg-red-500 text-xs text-white p-2 rounded-full hover:bg-red-600"
                    >
                        ลบ
                    </button>
                </div>
            ) : (
                <div className="relative flex flex-col items-center justify-center h-64">
                    <input
                        type="file"
                        id="file-upload"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <label
                        htmlFor="file-upload"
                        className="bg-orange-500 text-white py-2 px-4 rounded cursor-pointer"
                    >
                        เลือกไฟล์
                    </label>
                </div>
            )}
        </div>
    );
}

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
            title: "โรงพยาบาลหรือคลินิกสัตว์",
            description: "สถานพยาบาลที่ออกแบบมาเพื่อสัตว์เลี้ยงโดยเฉพาะ",
        },
        {
            id: 4,
            title: "คาเฟ่สัตว์",
            description: "คาเฟ่สัตว์ที่รองรับสัตว์เลี้ยงเข้าพัก เหมาะกับสัตว์ที่ต้องการเพื่อน",
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
                            <li className="step text-gray-500 text-sm">ยืนยัน</li>
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
                        <div className="text-left text-gray-600 text-sm mt-2">ให้ข้อมูลภาพรวมเพื่อให้ลูกค้าเข้าใจรายละเอียดของที่พัก</div>
                        <textarea placeholder="อธิบายสถานที่ของคุณ" className="textarea textarea-bordered textarea-md drop-shadow-sm w-full max-w-xl mt-4 focus:outline-none focus:border-pethub-color4"></textarea>
                        <div className="text-left text-black font-bold text-xl mt-12">ข้อกำหนดในการเข้าพักที่พักของคุณ</div>
                        <div className="text-left text-gray-600 text-sm mt-2">ให้ข้อมูลเงื่อนไขเพื่อให้ลูกค้าเข้าใจข้อตกลง</div>
                        <textarea placeholder="อธิบายเงื่อนไขของคุณ เช่น ประเภทสัตว์เลี้ยง การเช็คอิน การเช็คเอาท์ เป็นต้น" className="textarea textarea-bordered textarea-md drop-shadow-sm w-full max-w-xl mt-4 focus:outline-none focus:border-pethub-color4"></textarea>
                        <div className="text-left text-black font-bold text-xl mt-12">สถานที่ตั้ง</div>
                        <div className="text-left text-gray-600 text-sm mt-2">ลูกค้าจะได้รับที่อยู่ที่แน่นอนของคุณก็ต่อเมื่อทำการจองเรียบร้อยแล้ว</div>
                        <label className="form-control w-full mt-6">
                            <div className="text-left text-black text-base mb-2">ที่อยู่</div>
                            <textarea placeholder="อธิบายตำแหน่งสถานที่ของคุณ" className="textarea textarea-bordered textarea-md drop-shadow-sm w-full max-w-xl focus:outline-none focus:border-pethub-color4"></textarea>
                        </label>
                        <div className="grid grid-cols-2 gap-4">
                            <label className="form-control w-full mt-4">
                                <div className="text-left text-black text-base mb-2">เขต</div>
                                <select className="select select-bordered drop-shadow-sm w-full max-w-xs focus:outline-none focus:border-pethub-color4">
                                    <option disabled selected>เขต</option>
                                    <option>บางมด</option>
                                    <option>บางขุนเทียน</option>
                                </select>
                            </label>
                        </div>
                        <div className="text-left text-black font-bold text-xl mt-12">ใส่รูปของโรงแรมของคุณ</div>
                        <div className="text-left text-gray-600 text-sm mt-2 mb-4">ใส่รูปเพื่อให้ลูกค้าเห็นภาพบรรยากาศของโรงแรม</div>
                        <PictureUpload />
                        <div className="text-left text-black font-bold text-xl mt-12">ระยะทาง</div>
                        <div className="text-left text-gray-600 text-sm mt-2">ข้อมูลระยะทางจากสถานที่สำคัญ</div>
                        <label className="form-control w-full mt-4">
                            <div className="text-left text-black text-base mb-2">ระยะทางจากเมือง</div>
                            <div className="flex flex-row">
                                <input type="text" placeholder="0" className="input input-bordered drop-shadow-sm w-full max-w-xs focus:outline-none focus:border-pethub-color4" />
                                <div className="flex items-center justify-center text-gray-600 ml-4">กิโลเมตร</div>
                            </div>
                        </label>
                        <label className="form-control w-full mt-4 mb-8">
                            <div className="text-left text-black text-base mb-2">ระยะทางจากสนามบิน</div>
                            <div className="flex flex-row">
                                <input type="text" placeholder="0" className="input input-bordered drop-shadow-sm w-full max-w-xs focus:outline-none focus:border-pethub-color4" />
                                <div className="flex items-center justify-center text-gray-600 ml-4">กิโลเมตร</div>
                            </div>
                        </label>
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
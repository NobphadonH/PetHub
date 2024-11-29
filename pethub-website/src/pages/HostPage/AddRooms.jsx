import Navbar from "../../components/Navbar";
import AddRoomsForm from "../../components/AddRoomsForm";
import { useState } from 'react';

function AddRooms() {
    const [image, setImage] = useState(null);

    const updateImage = (newImage) => {
        setImage(newImage);
    };

    return (
        <div>
            <Navbar />
            <div className="flex flex-col mt-24">
                <div className="text-black font-bold text-3xl mt-4">
                    เพิ่มห้องพักโรงแรมสัตว์เลี้ยงของคุณ
                </div>
                <div className="flex justify-center">
                    <div className="max-w-xl mx-auto">
                        <div className="text-gray-800 text-base mt-4">
                            กรุณากรอกแบบฟอร์มด้านล่าง ข้อมูลทุกช่องจำเป็นต้องกรอก
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-1/2 bg-white border border-neutral-100 drop-shadow-xl p-8 rounded-3xl mt-8 mx-auto">
                    <div className="grid grid-col-6 gap-4 w-full max-w-xl mx-auto">
                        <div className="col-start-1 col-end-2 flex justify-start items-start w-full max-w-xl mx-auto">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                                />
                            </svg>
                        </div>
                        <div className="col-start-2">
                            <div className="text-right text-black font-bold text-xl">ห้องพักที่พิเศษและเป็นเอกลักษณ์ของโรงแรมของคุณ</div>
                            <div className="text-right text-gray-600 text-sm mt-2 mb-6">อธิบายความพิเศษของห้องพักที่คุณต้องการเพิ่มเข้ามา</div>
                        </div>
                    </div>
                    <AddRoomsForm
                        image={image}
                        onImageChange={updateImage}
                    />
                </div>
                <div className="flex justify-end items-center w-full max-w-3xl -mt-4 mb-4 p-6 mx-auto">
                    <button className="bg-black text-white border border-black rounded-2xl mt-6 btn sm:btn-xs md:btn-sm lg:btn-md">
                        เพิ่มห้องพัก
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AddRooms
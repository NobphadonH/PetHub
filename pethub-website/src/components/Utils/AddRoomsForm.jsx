import { useState } from 'react';

function PictureUpload({onImageSelected}) {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imgURL = URL.createObjectURL(file)
            setSelectedImage(imgURL);
            onImageSelected(file)
        }
    };


    const handleDeleteImage = () => {
        setSelectedImage(null);
        onImageSelected(null)

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

export default function AddRoomsForm({onDataChange, image, onImageChange}) {

    const [formData, setFormData] = useState();

    const handleImageChange = (img) => {
        const updatedImgFormData = {...formData, selectedImage: img}
        setFormData(updatedImgFormData);
        onDataChange(updatedImgFormData);

    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        const updatedFormData = { ...formData, [name]: value };
        setFormData(updatedFormData);
        onDataChange(updatedFormData); 
    }
    return (
        <div >
            <div className="flex flex-col w-full max-w-xl mx-auto mb-8">
                <div className="flex-grow border-t border-gray-300"></div>
                <div className="grid grid-cols-2 gap-4 mt-6">
                    <label className="form-control w-full">
                        <div className="text-left text-black text-base mb-2">ประเภทห้อง</div>
                        <input type="text" placeholder="ใส่ประเภทห้องของคุณที่นี่" className="input input-bordered drop-shadow-sm w-full focus:outline-none focus:border-pethub-color4" />
                    </label>
                    <label className="form-control w-full">
                        <div className="text-left text-black text-base mb-2">ประเภทสัตว์เลี้ยง</div>
                        <select className="select select-bordered drop-shadow-sm w-full focus:outline-none focus:border-pethub-color4" style={{ color: 'black' }}>
                            <option disabled selected style={{ color: 'gray' }}>ประเภทสัตว์</option>
                            <option style={{ color: 'black' }}>สุนัข</option>
                            <option style={{ color: 'black' }}>แมว</option>
                            <option style={{ color: 'black' }}>อื่น ๆ</option>
                        </select>
                    </label>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                    <label className="form-control w-full">
                        <div className="text-left text-black text-base mb-2">จำนวนห้อง</div>
                        <div className="relative w-full">
                            <input type="text" placeholder="ใส่จำนวนห้องของคุณที่นี่" className="input input-bordered drop-shadow-sm w-full focus:outline-none focus:border-pethub-color4" />
                            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
                                ห้อง
                            </span>
                        </div>
                    </label>
                    <label className="form-control w-full">
                        <div className="text-left text-black text-base mb-2">ความจุห้อง</div>
                        <div className="relative w-full">
                            <input type="text" placeholder="ใส่ความจุห้องของคุณที่นี่" className="input input-bordered drop-shadow-sm w-full focus:outline-none focus:border-pethub-color4" />
                            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
                                ตัว
                            </span>
                        </div>
                    </label>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                    <label className="form-control w-full">
                        <div className="text-left text-black text-base mb-2">ขนาดห้อง</div>
                        <div className="relative w-full">
                            <input type="text" placeholder="ใส่ขนาดห้องของคุณที่นี่" className="input input-bordered drop-shadow-sm w-full focus:outline-none focus:border-pethub-color4" />
                            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
                                ตร.ม.
                            </span>
                        </div>
                    </label>
                    <label className="form-control w-full">
                        <div className="text-left text-black text-base mb-2">ราคาต่อคืน</div>
                        <div className="relative w-full">
                            <input type="text" placeholder="ใส่ราคาต่อคืนของคุณที่นี่" className="input input-bordered drop-shadow-sm w-full focus:outline-none focus:border-pethub-color4" />
                            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
                                บาท
                            </span>
                        </div>
                    </label>
                </div>
                <div className="text-left text-black font-bold text-xl mt-12">รายละเอียดห้องพักของคุณ</div>
                <div className="text-left text-gray-600 text-sm mt-2">ให้ข้อมูลห้องพักเพื่อให้ลูกค้าเข้าใจรายละเอียดของห้องพัก</div>
                <textarea placeholder="อธิบายห้องพักของคุณ" className="textarea textarea-bordered textarea-md drop-shadow-sm w-full max-w-xl mt-4 focus:outline-none focus:border-pethub-color4"></textarea>
                <div className="text-left text-black font-bold text-xl mt-12">ใส่รูปของห้องพัก</div>
                <div className="text-left text-gray-600 text-sm mt-2 mb-4">ใส่รูปห้องพักเพื่อให้ลูกค้าเห็นภาพรายละเอียดของห้องพัก</div>
                <PictureUpload onImageSelected={handleImageChange}/>
            </div>
        </div>
    );
}


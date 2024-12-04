import { useState, useEffect } from 'react';
import PictureUpload from './PictureUpload';



export default function AddRoomsForm({onDataChange, image, onImageChange, index, initialData}) {

    const [formData, setFormData] = useState(initialData || {}); // Initialize with passed data

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]); // Update when `initialData` changes

    const handleImageChange = (img) => {
        const updatedImgFormData = { ...formData, selectedImage: img };
        setFormData(updatedImgFormData);
        onDataChange(updatedImgFormData);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedFormData = { ...formData, [name]: value };
        setFormData(updatedFormData);
        onDataChange(updatedFormData);
    };


    return (
        <div >
            <div className="flex flex-col w-full max-w-xl mx-auto mb-8">
                <div className="flex-grow border-t border-gray-300"></div>
                <div className="grid grid-cols-2 gap-4 mt-6">
                    <label className="form-control w-full">
                        <div className="text-left text-black text-base mb-2">ประเภทห้อง</div>
                        <input name="roomTypeName"  type="text"  value = {formData.roomTypeName||""} onChange={handleChange} placeholder="ใส่ประเภทห้องของคุณที่นี่" className="input input-bordered drop-shadow-sm w-full focus:outline-none focus:border-pethub-color4" />
                    </label>
                    <label className="form-control w-full">
                        <div className="text-left text-black text-base mb-2">ประเภทสัตว์เลี้ยง</div>
                        <select name="petAllowedType" value = {formData.petAllowedType|| ""} onChange={handleChange} className="select select-bordered drop-shadow-sm w-full focus:outline-none focus:border-pethub-color4" style={{ color: 'black' }}>
                            <option  value="" disabled selected={!formData.petAllowedType} style={{ color: 'gray' }}>ประเภทสัตว์</option>
                            <option value="สุนัข" style={{ color: 'black' }}>สุนัข</option>
                            <option  value="แมว" style={{ color: 'black' }}>แมว</option>
                            <option value="อื่น ๆ" style={{ color: 'black' }}>อื่น ๆ</option>
                        </select>
                    </label>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
                    <label className="form-control w-full">
                        <div className="text-left text-black text-base mb-2">จำนวนห้อง</div>
                        <div className="relative w-full">
                            <input name="numberOfRoom" value = {formData.numberOfRoom||""} onChange={handleChange} type="text" placeholder="ใส่จำนวนห้องของคุณที่นี่" className="input input-bordered drop-shadow-sm w-full focus:outline-none focus:border-pethub-color4" />
                            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
                                ห้อง
                            </span>
                        </div>
                    </label>
                    <label className="form-control w-full">
                        <div className="text-left text-black text-base mb-2">ขนาดห้อง</div>
                        <div className="relative w-full">
                            <input name="roomSize" type="text" value = {formData.roomSize||""} onChange={handleChange}  placeholder="ใส่ขนาดห้องของคุณที่นี่" className="input input-bordered drop-shadow-sm w-full focus:outline-none focus:border-pethub-color4" />
                            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
                                ตร.ม.
                            </span>
                        </div>
                    </label>

                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
                    <label className="form-control w-full">
                        <div className="text-left text-black text-base mb-2">ราคาต่อคืน</div>
                        <div className="relative w-full">
                            <input name="pricePerNight" type="text" value = {formData.pricePerNight||""} onChange={handleChange} placeholder="ใส่ราคาต่อคืนของคุณที่นี่" className="input input-bordered drop-shadow-sm w-full focus:outline-none focus:border-pethub-color4" />
                            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
                                บาท
                            </span>
                        </div>
                    </label>
                </div>
                <div className="text-left text-black font-bold text-xl mt-12">รายละเอียดห้องพักของคุณ</div>
                <div className="text-left text-gray-600 text-sm mt-2">ให้ข้อมูลห้องพักเพื่อให้ลูกค้าเข้าใจรายละเอียดของห้องพัก</div>
                <input name="roomDetail" type="text" value = {formData.roomDetail||""} onChange={handleChange} placeholder="อธิบายห้องพักของคุณ" className="textarea textarea-bordered textarea-md drop-shadow-sm w-full max-w-xl mt-4 focus:outline-none focus:border-pethub-color4"/>
                <div className="text-left text-black font-bold text-xl mt-12">ใส่รูปของห้องพัก</div>
                <div className="text-left text-gray-600 text-sm mt-2 mb-4">ใส่รูปห้องพักเพื่อให้ลูกค้าเห็นภาพรายละเอียดของห้องพัก</div>
                <PictureUpload onImageSelected={handleImageChange} initialImage={image  ? URL.createObjectURL(image) : null}/>
            </div>
        </div>
    );
}


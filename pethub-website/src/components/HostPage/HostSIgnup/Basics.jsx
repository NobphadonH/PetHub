import Navbar from "../../Utils/Navbar"
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import PointerLocation from "../../Utils/PointerLocation";
import axios from 'axios'
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import PictureUpload from "../../Utils/PictureUpload";
import TypeChoiceBoxes from "../../Utils/TypeChoicesBox";




function Basics() {

    //router state
    const navigate = useNavigate();
    const location = useLocation();
    //router state

    //data state
    const [pointerLocation, setPointerLocation] = useState({ lon: 100.56, lat: 13.74 });
    const [hotelFormData] = useState(location.state);
    const [formData, setFormData] = useState({
        hotelName: "",
        hotelDescription: "",
        hotelPolicy: "",
        hotelAddress: "",
        district: "",
        hotelType: null,
        selectedImage: null, // For the image
        cookies: Cookies.get("user-auth")
    })
    //data state

    // function
    const convertFileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setFormData((values) => ({
            ...values,
            [name]: value,
        }));
    };

    const handleTypeChange = (type) => {
        setFormData(prevState => ({
            ...prevState,  
            hotelType: type,
        }));
    };

    const handleImageChange = (img) => {
        setFormData(prevState => ({
            ...prevState, 
            selectedImage: img, 
        }));
    };

    //form validation
    const validateForm = () => {
        const requiredFields = [
            { field: "hotelName", label: "ชื่อที่พัก" },
            { field: "hotelDescription", label: "รายละเอียดที่พัก" },
            { field: "hotelPolicy", label: "ข้อกำหนด" },
            { field: "hotelAddress", label: "ที่อยู่" },
            { field: "district", label: "เขต" },
            { field: "hotelType", label: "ประเภทโรงแรม" },
        ];
    
        for (const { field, label } of requiredFields) {
            if (!formData[field] || formData[field] === "") {
                toast.error(`ยังไม่ได้ใส่ข้อมูล${label}.`);
                return false;
            }
        }
    
        if (!formData.selectedImage) {
            toast.error("กรุณา Upload รูปโรงแรม");
            return false;
        }
    
        return true; 
    };
    
    const goAddRoomsPage = async () => {
        if (!validateForm()) {
            return; 
        }
    
        try {
            const hotelFormData = {
                ...formData,
                mapLat: pointerLocation.lat,
                mapLong: pointerLocation.lon,
                selectedImage: formData.selectedImage 
                    ? await convertFileToBase64(formData.selectedImage) 
                    : null,
            };
    
            navigate("/pethub-website/rooms", { state: { hotelFormData:hotelFormData, readyRoomFormArray: location.state?.readyRoomFormArray || null } });
        } catch (error) {
            console.error("Error preparing data:", error);
            toast.error("เลือกรูปภาพใหม่อีกครั้ง");
        }
    };
    //function


    //Map previous data into form
    useEffect(() => {
        if (hotelFormData) {
            setFormData((prevFormData) => ({
                selectedImage: null,
                ...prevFormData,
                ...hotelFormData.hotelFormData,
            }));

    
            const timeoutId = setTimeout(() => {
                if (hotelFormData.hotelFormData.mapLat && hotelFormData.hotelFormData.mapLong ) {
                    console.log('ok')
                    setPointerLocation({
                        lat: hotelFormData.hotelFormData.mapLat,
                        lon: hotelFormData.hotelFormData.mapLong,
                    });
                } else {
                    setPointerLocation({ lon: 100.56, lat: 13.74 });
                }
            }, 300);
    
            return () => clearTimeout(timeoutId);
        }


    }, []);
    
    //update location on click
    useEffect(() => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            mapLat: pointerLocation.lat,
            mapLong: pointerLocation.lon,

        }));
    }, [pointerLocation])

    const districts = [
        "เขตพระนคร", "เขตดุสิต", "เขตหนองจอก", "เขตบางรัก", "เขตบางเขน",
        "เขตบางกะปิ", "เขตปทุมวัน", "เขตป้อมปราบศัตรูพ่าย", "เขตพระโขนง", "เขตมีนบุรี",
        "เขตลาดกระบัง", "เขตยานนาวา", "เขตสัมพันธวงศ์", "เขตพญาไท", "เขตธนบุรี",
        "เขตบางกอกใหญ่", "เขตห้วยขวาง", "เขตคลองสาน", "เขตตลิ่งชัน", "เขตบางกอกน้อย",
        "เขตบางขุนเทียน", "เขตภาษีเจริญ", "เขตหนองแขม", "เขตราษฎร์บูรณะ", "เขตราชเทวี",
        "เขตบางพลัด", "เขตดินแดง", "เขตบึงกุ่ม", "เขตสาทร", "เขตบางซื่อ",
        "เขตจตุจักร", "เขตบางคอแหลม", "เขตประเวศ", "เขตคลองเตย", "เขตสวนหลวง",
        "เขตจอมทอง", "เขตดอนเมือง", "เขตราชบูรณะ", "เขตหลักสี่", "เขตสายไหม",
        "เขตคันนายาว", "เขตสะพานสูง", "เขตวังทองหลาง", "เขตคลองสามวา", "เขตบางนา",
        "เขตทวีวัฒนา", "เขตทุ่งครุ", "เขตบางบอน"
    ];

    return (
        <div>
            <Navbar />
            <div className="flex flex-col mt-24">
                <div className="text-black font-bold text-[3vw] md:text-2xl lg:text-3xl mt-4">ลงทะเบียนโรงแรมสัตว์เลี้ยงของคุณให้สมบูรณ์แบบบน PetHub</div>
                <div className="flex justify-center">
                    <div className="max-w-xl mx-auto">
                        <div className="text-gray-800 text-xs lg:text-base mt-4">
                            กรุณากรอกแบบฟอร์มด้านล่าง ข้อมูลทุกช่องจำเป็นต้องกรอก
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-4/5 lg:w-1/2 bg-white border border-neutral-100 drop-shadow-xl p-8 rounded-3xl mt-8 mx-auto">
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
                            
                            <input name="hotelName" value = {formData.hotelName||""} onChange={handleChange} type="text" placeholder="ใส่ชื่อที่พักของคุณที่นี่" className="input input-bordered drop-shadow-sm w-full focus:outline-none focus:border-pethub-color4" />
                        </label>
                        <div className="text-left text-black font-bold text-xl mt-12">เลือกประเภทโรงแรมสัตว์เลี้ยงของคุณ</div>
                        <div className="text-left text-gray-600 text-sm mt-2">เลือกหนึ่งจากตัวเลือกด้านล่าง</div>
                        <TypeChoiceBoxes onSelectType={handleTypeChange} selectedType={formData.hotelType||""} />
                        <div className="text-left text-black font-bold text-xl mt-12">รายละเอียดที่พักของคุณ</div>
                        <div className="text-left text-gray-600 text-sm mt-2">ให้ข้อมูลภาพรวมเพื่อให้ลูกค้าเข้าใจรายละเอียดของที่พัก</div>
                        <input name="hotelDescription" value = {formData.hotelDescription||""} onChange={handleChange} type="text" placeholder="อธิบายสถานที่ของคุณ" className="input input-bordered drop-shadow-sm w-full focus:outline-none focus:border-pethub-color4"/>
                        {/* <textarea placeholder="อธิบายสถานที่ของคุณ" className="textarea textarea-bordered textarea-md drop-shadow-sm w-full max-w-xl mt-4 focus:outline-none focus:border-pethub-color4"></textarea> */}
                        <div className="text-left text-black font-bold text-xl mt-12">ข้อกำหนดในการเข้าพักที่พักของคุณ</div>
                        <div className="text-left text-gray-600 text-sm mt-2">ให้ข้อมูลเงื่อนไขเพื่อให้ลูกค้าเข้าใจข้อตกลง</div>
                        <input name="hotelPolicy" value = {formData.hotelPolicy||""} onChange={handleChange} type="text" placeholder="อธิบายเงื่อนไขของคุณ เช่น ประเภทสัตว์เลี้ยง การเช็คอิน การเช็คเอาท์ เป็นต้น" className="input input-bordered drop-shadow-sm w-full focus:outline-none focus:border-pethub-color4"/>

                        {/* <textarea placeholder="อธิบายเงื่อนไขของคุณ เช่น ประเภทสัตว์เลี้ยง การเช็คอิน การเช็คเอาท์ เป็นต้น" className="textarea textarea-bordered textarea-md drop-shadow-sm w-full max-w-xl mt-4 focus:outline-none focus:border-pethub-color4"></textarea> */}
                        <div className="text-left text-black font-bold text-xl mt-12">สถานที่ตั้ง</div>
                        <div className="text-left text-gray-600 text-sm mt-2">ลูกค้าจะได้รับที่อยู่ที่แน่นอนของคุณก็ต่อเมื่อทำการจองเรียบร้อยแล้ว</div>
                        <label className="form-control w-full mt-6">
                            <div className="text-left text-black text-base mb-2">ที่อยู่</div>
                            <input name="hotelAddress" value = {formData.hotelAddress||""} onChange={handleChange} type="text" placeholder="อธิบายตำแหน่งสถานที่ของคุณ" className="input input-bordered drop-shadow-sm w-full focus:outline-none focus:border-pethub-color4"/>

                            {/* <textarea placeholder="อธิบายตำแหน่งสถานที่ของคุณ" className="textarea textarea-bordered textarea-md drop-shadow-sm w-full max-w-xl focus:outline-none focus:border-pethub-color4"></textarea> */}
                        </label>
                        <div className="grid grid-cols-2 gap-4">
                            <label className="form-control w-full mt-4">
                                <div className="text-left text-black text-base mb-2">เขต</div>
                                <select name="district" value={formData.district} onChange={handleChange} className="select select-bordered drop-shadow-sm w-full max-w-xs focus:outline-none focus:border-pethub-color4">
                                    <option disabled selected style={{ color: 'gray' }}>เขต</option>
                                    {districts.map((district, index) => (
                                        <option key={index} style={{ color: 'black' }}>
                                            {district}
                                        </option>
                                    ))}
                                </select>
                            </label>
                        </div>
                        <div className="w-full h-80 my-8 rounded-md">
                        <div className="text-left text-black text-base mb-2">ปักหมุดตำแหน่งโรงแรมของคุณแบนแผนที่</div>
                        <PointerLocation
                            pointerLocation={pointerLocation}
                            setPointerLocation={setPointerLocation}
                        />
                        </div>

                        <div className="text-left text-black font-bold text-xl mt-12">ใส่รูปของโรงแรมของคุณ</div>
                        <div className="text-left text-gray-600 text-sm mt-2 mb-4">ใส่รูปเพื่อให้ลูกค้าเห็นภาพบรรยากาศของโรงแรม</div>
                        <PictureUpload onImageSelected={handleImageChange}/>
                        
                    </div>
                </div>
                <div className="flex justify-end items-center w-full max-w-3xl -mt-4 mb-4 p-6 mx-auto">
                    <button onClick={goAddRoomsPage} className="bg-black text-white border border-black rounded-2xl mt-6 btn sm:btn-xs md:btn-sm lg:btn-md">
                        ขั้นตอนต่อไป
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Basics

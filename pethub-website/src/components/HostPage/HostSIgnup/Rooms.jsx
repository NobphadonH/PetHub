import Navbar from "../../Utils/Navbar";
import AddRoomsForm from "../../Utils/AddRoomsForm";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

function Rooms() {

    //router state
    const navigate = useNavigate();
    const location = useLocation();
    //router state

    //data state
    const [hotelFormData] = useState(location.state.hotelFormData);
    const [forms, setForms] = useState([{ id: 1, image: null }]);
    const [roomFormArray, setRoomFormArray] = useState([{
        numberOfRoom: "",
        petAllowedType: "",
        pricePerNight: "",
        roomCapacity: "",
        roomDetail: "",
        roomSize: "",
        roomTypeName: "",
        selectedImage: null,
    }]);
    //data state
    
    //function
    const addForm = () => {
        setForms([...forms, { id: forms.length + 1, image: null }]);
        setRoomFormArray((prevData) => [...prevData, {}]);
    };

    const removeForm = (index) => {
        setForms(forms.filter((_, i) => i !== index));
        setRoomFormArray((prevData) => prevData.filter((_, i) => i !== index));
    };

    const convertFileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    const prepareRoomFormArrayForNavigation = async () => {
        const updatedRoomFormArray = await Promise.all(
            roomFormArray.map(async (room) => {
                if (room.selectedImage instanceof File) {
                    const base64Image = await convertFileToBase64(room.selectedImage);
                    return { ...room, selectedImage: base64Image };
                }
                return room;
            })
        );
        return updatedRoomFormArray;
    };

    const updateImage = (index, newImage) => {
        setRoomFormArray((prevArray) => {
            const updatedArray = [...prevArray];
            updatedArray[index] = {
                ...updatedArray[index],
                image: newImage
            };
            return updatedArray;
        });
    };

    const handleChange = (index, data) => {
        setForms((prevForms) => {
            const updatedForms = [...prevForms];
            updatedForms[index] = {
                ...updatedForms[index],
                ...data
            };
            return updatedForms;
        });

        setRoomFormArray((prevForms) => {
            const updatedForms = [...prevForms];
            updatedForms[index] = {
                ...updatedForms[index],
                ...data
            };
            return updatedForms;
        });
    };

    const validateRoomFormArray = (roomFormArray) => {
        const errors = {};
    
        roomFormArray.forEach((room, index) => {
            if (!room.roomTypeName || room.roomTypeName.trim() === "") {
                errors[index] = { field: "roomTypeName", message: "กรุณากรอกประเภทห้อง" };
            } else if (!room.petAllowedType || room.petAllowedType.trim() === "") {
                errors[index] = { field: "petAllowedType", message: "กรุณากรอกประเภทสัตว์" };
            } else if (!room.numberOfRoom || isNaN(room.numberOfRoom) || room.numberOfRoom <= 0) {
                errors[index] = { field: "numberOfRoom", message: "กรุณากรอกจำนวนห้อง" };
            } else if (!room.roomSize || isNaN(room.roomSize) || room.roomSize <= 0) {
                errors[index] = { field: "roomSize", message: "กรุณากรอกขนาดห้อง" };
            } else if (!room.pricePerNight || isNaN(room.pricePerNight) || room.pricePerNight <= 0) {
                errors[index] = { field: "pricePerNight", message: "กรุณากรอกราคาห้อง" };
            } else if (!room.roomDetail || room.roomDetail.trim() === "") {
                errors[index] = { field: "roomDetail", message: "กรุณากรอกรายละเอียดห้อง" };
            } else if (!room.selectedImage) {
                errors[index] = { field: "selectedImage", message: "กรุณาใส่รูปภาพ" };
            }
        });
    
        return Object.keys(errors).length > 0 ? errors : null; 
    };
    
    
    
    

    const goConfirmPage = async () => {
        const validationErrors = validateRoomFormArray(roomFormArray);
    
        if (validationErrors) {
            let step = 0;
    
            const roomIndices = Object.keys(validationErrors);
    
            const showNextError = () => {
                if (step < roomIndices.length) {
                    const roomIndex = roomIndices[step];
                    const roomError = validationErrors[roomIndex];
    
                    toast.error(`ห้องที่ ${parseInt(roomIndex) + 1}: ${roomError.message}`, {
                        autoClose: 1000, 
                        onClose: () => {
                            step++; 
                            showNextError(); 
                        },
                    });
                }
            };
    
            showNextError();
    
            return; 
        } else {
            try {
                const readyRoomFormArray = await prepareRoomFormArrayForNavigation();
    
                const hotelAndRoomFormData = {
                    hotelFormData,
                    readyRoomFormArray,
                };
    
                navigate("/pethub-website/confirm", { state: hotelAndRoomFormData });
            } catch (error) {
                toast.error("An error occurred while processing the forms.");
            }
        }
    };
    

    const goPreviousPage = () => {
        navigate("/pethub-website/basics", { state: { hotelFormData: hotelFormData, readyRoomFormArray: location.state?.readyRoomFormArray || roomFormArray } });
    };
    //function

    useEffect(() => {
        if (location.state?.readyRoomFormArray) {
            setRoomFormArray(() => [
                ...location.state.readyRoomFormArray
            ]);
    
            setForms(location.state.readyRoomFormArray.map((_, index) => ({
                id: index + 1,
                image: null,   
            })));
    
        }
    }, []);
    

    return (
        <div>
            <Navbar />
            <div className="flex flex-col mt-24">
                <div className="text-black font-bold text-xl mx-10 md:text-2xl lg:text-3xl mt-4 text-center ">
                    ลงทะเบียนโรงแรมสัตว์เลี้ยงของคุณให้สมบูรณ์แบบบน PetHub
                </div>
                <div className="flex justify-center">
                    <div className="max-w-xl mx-auto">
                        <div className="text-gray-800 text-base mt-4 text-center sm:text-left">
                            กรุณากรอกแบบฟอร์มด้านล่าง ข้อมูลทุกช่องจำเป็นต้องกรอก
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-full sm:w-1/2 bg-white border border-neutral-100 drop-shadow-xl p-8 rounded-3xl mt-8 mx-auto">
                    <div className="flex justify-center items-center">
                        <ul className="steps w-full max-w-2xl mt-2">
                            <li className="step step-accent text-gray-800 text-sm">ข้อมูลทั่วไป</li>
                            <li className="step step-accent text-gray-800 text-sm">ห้อง</li>
                            <li className="step text-gray-500 text-sm">ยืนยัน</li>
                        </ul>
                    </div>
                    <div className="flex justify-center items-center">
                        <div className="w-full max-w-xl flex-grow border-t border-gray-300 mt-5 mb-14"></div>
                    </div>
                    <div className="w-full max-w-xl mx-auto text-left text-black font-bold text-xl">
                        ห้องพักที่พิเศษและเป็นเอกลักษณ์ของโรงแรมของคุณ
                    </div>
                    <div className="w-full max-w-xl mx-auto text-left text-gray-600 text-sm mt-2 mb-6">
                        ทุกห้องมีความแตกต่างกัน บอกลูกค้าว่าที่นี่พิเศษอย่างไร
                    </div>
                    {forms.map((form, index) => (
                        <div key={form.id}>
                            <AddRoomsForm
                                onDataChange={(data) => handleChange(index, data)}
                                image={roomFormArray[index]?.image || null}
                                onImageChange={(newImage) => updateImage(index, newImage)}
                                initialData={roomFormArray[index]}
                            />
                            <button
                                onClick={() => removeForm(index)}
                                className="w-full max-w-xl bg-white text-red-600 mx-auto border border-red-300 mb-4 btn sm:btn-xs md:btn-sm lg:btn-md hover:text-white hover:bg-base-300 hover:border-base-300"
                            >
                                ยกเลิก
                            </button>
                        </div>
                    ))}
                    <button
                        onClick={addForm}
                        className="w-full max-w-xl bg-white text-gray-600 mx-auto border border-base-300 btn sm:btn-xs md:btn-sm lg:btn-md hover:text-white hover:bg-base-300 hover:border-base-300"
                    >
                        เพิ่มห้องพัก
                    </button>
                </div>
                <div  className="flex justify-between items-center w-full max-w-3xl -mt-4 mb-4 p-6 mx-auto">
                    <button onClick={goPreviousPage} className="bg-black text-white border border-black rounded-2xl mt-6 btn sm:btn-xs md:btn-sm lg:btn-md">
                        ขั้นตอนก่อนหน้า
                    </button>
                    <button
                        onClick={goConfirmPage}
                        className="bg-black text-white border border-black rounded-2xl mt-6 btn sm:btn-xs md:btn-sm lg:btn-md"
                    >
                        ขั้นตอนต่อไป
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Rooms;

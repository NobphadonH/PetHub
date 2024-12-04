import AddRoomsForm from "../../components/AddRoomsForm";
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import axios from 'axios'
import { toast } from "react-toastify";



function EditRooms() {

    //router state
    const navigate = useNavigate();
    const location = useLocation()
    //router state

    console.log(location.state)

    //data state
    const [image, setImage] = useState(null);
    const [roomDetails, setRoomDetails] = useState(null);
    const [roomFormArray, setRoomFormArray] = useState([{}]);
    const [imageUpdated, setImageUpdated] = useState(0)
    //data state


    const updateImage = (newImage) => {
        setImage(newImage);
        setImageUpdated(1);
    };


    useEffect(() => {
        if (location.state) {
          setRoomDetails((prevData) => {
            const formattedData = { ...location.state };

            return {
              ...prevData,
              ...formattedData,
            };
          });
    
          if (location.state.roomPhoto) {
            const byteString = atob(location.state.roomPhoto.split(",")[1]);
            const mimeString = location.state.roomPhoto
              .split(",")[0]
              .split(":")[1]
              .split(";")[0];
            const arrayBuffer = new Uint8Array(byteString.length);
    
            for (let i = 0; i < byteString.length; i++) {
              arrayBuffer[i] = byteString.charCodeAt(i);
            }
    
            const blob = new Blob([arrayBuffer], { type: mimeString });
            const file = new File([blob], "room-photo.jpg", { type: mimeString });
    
            setImage(file);
          }
        }
      }, []);


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const roomData = new FormData()
            // const {roomTypeID, roomTypeName, numberOfRoom, roomSize, roomDetail, petAllowedType, pricePerNight} = req.body;

            roomData.append("roomTypeID", roomDetails.roomTypeID )
            roomData.append("roomTypeName", roomDetails.roomTypeName)
            roomData.append("numberOfRoom", roomDetails.numberOfRoom)
            roomData.append("roomSize", roomDetails.roomSize)
            roomData.append("roomDetail", roomDetails.roomDetail)
            roomData.append("petAllowedType", roomDetails.petAllowedType)
            roomData.append("pricePerNight", roomDetails.pricePerNight)

            if (roomDetails.selectedImage) {
                roomData.append(
                    "selectedImage",
                    roomDetails.selectedImage,
                    roomDetails.selectedImage.name
                )
            }

            console.log(roomDetails)

            const res = await axios.post('http://localhost:5000/api/roomManage/updateRoom/', roomData, {headers:{"Content-Type":"multipart/form-data" }, withCredentials:true})
            console.log(res)

            if (res.status == 200) {
                toast.success("แก้ไขข้อมูลสำเร็จ")
            }

        } catch(err) {
            console.log(err)
        }
    }

    const handleChange = (data) => {
        setRoomDetails(data);

    }
    return (
        <>
        <Navbar />
        <div className="flex flex-col mt-24">
                <div className="text-black font-bold text-3xl mt-4">
                    แก้ไขข้อมูลห้องพักโรงแรมสัตว์เลี้ยงของคุณ
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
                            <div className="text-right text-gray-600 text-sm mt-2 mb-6">แก้ไขข้อมูลห้องพักโรงแรมสัตว์เลี้ยงของคุณ</div>
                        </div>
                    </div>
                    <AddRoomsForm
                        image={image}
                        onDataChange={(data) => handleChange(data)}
                        onImageChange={updateImage}
                        initialData={roomDetails}
                    />
                </div>
                <div className="flex justify-end items-center w-full max-w-3xl -mt-4 mb-4 p-6 mx-auto">
                    <button onClick={handleSubmit} className="bg-black text-white border border-black rounded-2xl mt-6 btn sm:btn-xs md:btn-sm lg:btn-md">
                        แก้ไขข้อมูล
                    </button>
                </div>
            </div>
        </>
    )
}

export default EditRooms

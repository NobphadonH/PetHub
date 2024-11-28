import Navbar from "../Utils/Navbar";
import PictureUpload from "../Utils/PictureUpload";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

function EditPetProfile() {
  
  //router state
  const location = useLocation()
  const navigate = useNavigate()
  //router state

  //data state
  const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState({
    petID : "",
    petName: "",
    petDOB: "",
    petType: "",
    petSex: "",
    petDetail: "",
  });
  //data state
  

  //function
  const handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((values) => ({
      ...values,
      [name]: value,
    }));
  };


  const handleImageChange = (img) => {
    setFormData((prevState) => ({
      ...prevState, 
      selectedImage: img, 
    }));
  };

  const handleDelete = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/pet/updatePetByPetID",
        formData.petID,
        {
          withCredentials: true, 
        }
      );
      
      console.log("Pet data submitted successfully:", res.data);
      console.log(res.status);
      toast.success("Pet deleted!");
      navigate("/pethub-website/profile")
    } catch (error) {
      console.error(
        "Error submitting pet data:",
        error.response?.data || error.message
      );
      toast.error(error.response?.data?.error || "Failed to create pet profile.");
    }
};

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/pet/updatePetByPetID",
        formData,
        {
          withCredentials: true,  
        }
      );
      
      console.log("Pet data submitted successfully:", res.data);
      console.log(res.status);
      toast.success("Pet profile created successfully!");
      navigate("/pethub-website/profile")
    } catch (error) {
      console.error(
        "Error submitting pet data:",
        error.response?.data || error.message
      );
      toast.error(error.response?.data?.error || "Failed to create pet profile.");
    }
  };
  //function


  //map data from previous component into page
  useEffect(() => {
    if (location.state) {
      setFormData((prevData) => {
        const formattedData = { ...location.state };
  
        if (formattedData.petDOB) {
          const date = new Date(formattedData.petDOB);
          formattedData.petDOB = date.toISOString().split('T')[0]; // Convert to YYYY-MM-DD
        }
  
        return {
          ...prevData,
          ...formattedData,
        };
      });
  
      
      if (location.state.petPhoto) {
        const byteString = atob(location.state.petPhoto.split(",")[1]);
        const mimeString = location.state.petPhoto.split(",")[0].split(":")[1].split(";")[0];
        const arrayBuffer = new Uint8Array(byteString.length);
  
        for (let i = 0; i < byteString.length; i++) {
          arrayBuffer[i] = byteString.charCodeAt(i);
        }
  
        const blob = new Blob([arrayBuffer], { type: mimeString });
        const file = new File([blob], "pet-photo.jpg", { type: mimeString });
  
        setImageFile(file);
      }
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="my-16 lg:my-32 w-full lg:w-[800px] h-full mx-auto px-6 lg:px-10 py-12">
        <div className="text-2xl lg:text-3xl font-semibold text-pethub-color6">
          แก้ไขปข้อมูล<span className="text-pethub-color1">สัตว์เลี้ยง</span>
        </div>
        <div className="text-sm lg:text-base my-4 lg:my-8">
          เพื่อความปลอดภัยของสัตว์เลี้ยงของคุณ
          เราจึงแนะนำให้ใส่ข้อมูลพื้นฐานเพื่อป้องกันในกรณีฉุกเฉิน
        </div>

        <div className="w-full text-start">
          <div className="w-11/12 lg:w-10/12 mx-auto">
            Upload รูปสัตว์เลี้ยงของคุณ
          </div>
          <div className="w-10/12 lg:w-9/12 mx-auto my-5">
            <PictureUpload onImageSelected={handleImageChange} initialImage={imageFile ? URL.createObjectURL(imageFile) : null} />
            {/* {imageFile && <p>Selected Image: {imageFile.name}</p>} */}
          </div>
        </div>

        <div className="w-full px-8 lg:px-16">
          <div className="flex flex-col lg:flex-row w-full justify-start lg:justify-between flex-wrap gap-4 lg:gap-5">
            <div className="grow">
              <p className="text-start text-sm lg:text-base my-2">
                ชื่อสัตว์เลี้ยง
              </p>
              <input
                type="text"
                name="petName"
                value={formData.petName}
                onChange={handleInputChange}
                placeholder="ชื่อสัตว์เลี้ยง"
                className="input input-bordered w-full h-10 lg:h-12 text-xs lg:text-sm bg-gray-100 mb-3"
              />
            </div>
            <div className="grow">
              <p className="text-start text-sm lg:text-base my-2">
                วันเกิดสัตว์เลี้ยง
              </p>
              <input
                type="date"
                name="petDOB"
                value={formData.petDOB}
                onChange={handleInputChange}
                className="input input-bordered w-full h-10 lg:h-12 text-xs lg:text-sm bg-gray-100 mb-3"
              />
            </div>
            <div className="grow">
              <p className="text-start text-sm lg:text-base my-2">
                ประเภทสัตว์
              </p>
              {/* ทำให้ petType มันไม่เลือกอะไรมาให้ */}
              <select
                name="petType"
                value={formData.petType}
                onChange={handleInputChange}
                className="select input-bordered w-full h-10 lg:h-12 text-xs lg:text-sm bg-gray-100 mb-3"
              >
                <option disabled selected>
                  ประเภทสัตว์
                </option>
                <option value="สุนัข">สุนัข</option>
                <option value="แมว">แมว</option>
              </select>
            </div>
            <div className="grow">
              <p className="text-start text-sm lg:text-base my-2">เพศ</p>
              <select
                name="petSex"
                value={formData.petSex}
                onChange={handleInputChange}
                className="select input-bordered w-full h-10 lg:h-12 text-xs lg:text-sm bg-gray-100 mb-3"
              >
                <option disabled selected>
                  เพศ
                </option>
                <option value="เพศผู้">เพศผู้</option>
                <option value="เพศเมีย">เพศเมีย</option>
              </select>
            </div>
          </div>

          <div>
            <p className="text-start text-sm lg:text-base my-2">
              คำอธิบายรายระเอียดของสัตว์เลี้ยง เช่น สายพันธุ์, ลักษณะที่โดดเด่น
              และอื่นๆ
            </p>
            <textarea
              name="petDetail"
              value={formData.petDetail}
              onChange={handleInputChange}
              className="textarea textarea-bordered w-full h-24 lg:h-48 text-xs lg:text-sm"
              placeholder="ex. สายพันธุ์, ลักษณะเฉพาะ, สีขน หรือ นิสัย"
            ></textarea>
          </div>
          <div className="w-full flex justify-center gap-5">
            <div
              onClick={handleDelete}
              className="my-8 flex justify-center items-center rounded-md bg-red-600 text-white h-10 lg:h-12 w-36 lg:w-40 font-medium text-sm lg:text-base cursor-pointer"
            >
              ลบ
            </div>
            <div
              onClick={handleSubmit}
              className="my-8 flex justify-center items-center rounded-md bg-pethub-color1 text-white h-10 lg:h-12 w-36 lg:w-40 font-medium text-sm lg:text-base cursor-pointer"
            >
              บันทึกข้อมูล
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditPetProfile;

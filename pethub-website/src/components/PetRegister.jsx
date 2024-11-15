import Navbar from "./Utils/Navbar";
import PictureUpload from "./Utils/PictureUpload";
import { useState } from 'react';

function AddPetProfile() {
  const [imageFile, setImageFile] = useState(null);

  const handleImageSelected = (event) => {
    setImageFile(URL.createObjectURL(event.target.files[0]));
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      setImageFile(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Navbar />
      <div className="my-16 lg:my-32 w-full lg:w-[800px] h-full mx-auto px-6 lg:px-10 py-12">
        <div className="text-2xl lg:text-3xl font-semibold text-pethub-color6">ข้อมูล<span className="text-pethub-color1">สัตว์เลี้ยง</span></div>
        <div className="text-sm lg:text-base my-4 lg:my-8">
          เพื่อความปลอดภัยของสัตว์เลี้ยงของคุณ เราจึงแนะนำให้ใส่ข้อมูลพื้นฐานเพื่อป้องกันในกรณีฉุกเฉิน
        </div>
        
        <div className="w-full text-start">
          <div className="w-11/12 lg:w-10/12 mx-auto">Upload รูปสัตว์เลี้ยงของคุณ</div>
          <div className="w-10/12 lg:w-9/12 mx-auto my-5">
            <PictureUpload onImageSelected={handleImageSelected} />
            {imageFile && <p>Selected Image: {imageFile.name}</p>}
          </div>
        </div>
        
        <div className="w-full px-8 lg:px-16">
          <div className="flex flex-col lg:flex-row w-full justify-start lg:justify-between flex-wrap gap-4 lg:gap-5">
            <div className="grow">
              <p className="text-start text-sm lg:text-base my-2">ชื่อสัตว์เลี้ยง</p>
              <input
                type="text"
                name="petName"
                placeholder="ชื่อสัตว์เลี้ยง"
                className="input input-bordered w-full h-10 lg:h-12 text-xs lg:text-sm bg-gray-100 mb-3"
              />
            </div>
            <div className="grow">
              <p className="text-start text-sm lg:text-base my-2">วันเกิดสัตว์เลี้ยง</p>
              <input
                type="date"
                name="petBirthday"
                className="input input-bordered w-full h-10 lg:h-12 text-xs lg:text-sm bg-gray-100 mb-3"
              />
            </div>
            <div className="grow">
              <p className="text-start text-sm lg:text-base my-2">ประเภทสัตว์</p>
              <select className="select input-bordered w-full h-10 lg:h-12 text-xs lg:text-sm bg-gray-100 mb-3">
                <option disabled selected>ประเภทสัตว์</option>
                <option>สุนัข</option>
                <option>แมว</option>
              </select>
            </div>
            <div className="grow">
              <p className="text-start text-sm lg:text-base my-2">เพศ</p>
              <select className="select input-bordered w-full h-10 lg:h-12 text-xs lg:text-sm bg-gray-100 mb-3">
                <option disabled selected>เพศ</option>
                <option>เพศผู้</option>
                <option>เพศเมีย</option>
              </select>
            </div>
          </div>
          
          <div>
            <p className="text-start text-sm lg:text-base my-2">คำอธิบายรายระเอียดของสัตว์เลี้ยง เช่น สายพันธุ์, ลักษณะที่โดดเด่น และอื่นๆ</p>
            <textarea
              className="textarea textarea-bordered w-full h-24 lg:h-48 text-xs lg:text-sm"
              placeholder="ex. สายพันธุ์, ลักษณะเฉพาะ, สีขน หรือ นิสัย"
            ></textarea>
          </div>
          <div className="w-full flex justify-center">
            <div className="my-8 flex justify-center items-center rounded-md bg-pethub-color1 text-white h-10 lg:h-12 w-36 lg:w-40 font-medium text-sm lg:text-base cursor-pointer">
              บันทึกข้อมูล
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddPetProfile;

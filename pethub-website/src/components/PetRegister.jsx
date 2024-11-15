import Navbar from "./Utils/Navbar"
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
      setPetImage(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <>
    <Navbar />
    <div className="my-32 w-[800px] h-full mx-auto px-10 py-12">
      <div className="text-3xl font-semibold text-pethub-color6">ข้อมูล<span className="text-pethub-color1">สัตว์เลี้ยง</span></div>
      <div className="text-base my-8">เพื่อความปลอดภัยของสัตว์เลี้ยงของคุณ เราจึงแนะนำให้ใส่ข้อมูลพื้นฐานเพื่อป้องกันในกรณีฉุกเฉิน</div>
      <div className="w-full text-start">
        <div className="w-10/12 mx-auto">Upload รูปสัตว์เลี้ยงของคุณ</div>
        <div className="w-9/12 mx-auto my-5">
          <PictureUpload onImageSelected={handleImageSelected} />
          {imageFile && <p>Selected Image: {imageFile.name}</p>}
        </div>
      </div>
      <div className="w-full px-16">
        <div className="flex w-full justify-start lg:justify-between flex-wrap gap-[3vw] md:gap-5">
          <div className="grow">
              <p className="text-start text-[2.5vw] md:text-xs lg:text-sm xl:text-sm my-[1vw] md:my-3">ชื่อสัตว์เลี้ยง</p>
              <input
                  type="text"
                  name="email"
                  placeholder="ชื่อสัตว์เลี้ยง"
                  className="input input-bordered w-full h-[8vw] max-h-10  text-[2vw] sm:h-10 xl:h-12 sm:text-xs lg:text-sm bg-gray-100 md:mb-3"
              />
          </div>
          <div className="grow">
              <p className="text-start text-[2.5vw] md:text-xs lg:text-sm xl:text-sm my-[1vw] md:my-3">วันเกิดสัตว์เลี้ยง</p>
              <input
                  type="date"
                  name="email"
                  placeholder=""
                  className="input input-bordered w-full h-[8vw] max-h-10  text-[2vw] sm:h-10 xl:h-12 sm:text-xs lg:text-sm bg-gray-100 md:mb-3"
              />
          </div>
          <div className="grow">
              <p className="text-start text-[2.5vw] md:text-xs lg:text-sm xl:text-sm my-[1vw] md:my-3">ประเภทสัตว์</p>
              <select className="select min-h-0 h-[8vw] w-full max-h-10  text-[2vw] sm:h-10 xl:h-12 sm:text-xs lg:text-sm bg-gray-100 md:mb-3">
                  <option disabled selected>ประเภทสัตว์</option>
                  <option>สุนัข</option>
                  <option>แมว</option>
              </select>
          </div>
          <div className="grow">
              <p className=" text-start text-[2.5vw] md:text-xs lg:text-sm xl:text-sm my-[1vw] md:my-3">เพศ</p>
              <select className="select min-h-0 h-[8vw] w-full max-h-10  text-[2vw] sm:h-10 xl:h-12 sm:text-xs lg:text-sm bg-gray-100 md:mb-3">
                  <option disabled selected>เพศ</option>
                  <option>เพศผู้</option>
                  <option>เพศเมีย</option>
              </select>
          </div>
        </div>
      <div>
        <p className=" text-start text-[2.5vw] md:text-xs lg:text-sm xl:text-sm my-[1vw] md:my-5">คำอธิบายรายระเอียดของสัตว์เลี้ยง เช่น สายพันธุ์, ลักษณะที่โดดเด่น และอื่นๆ </p>
        <textarea className="textarea w-full min-h-48 lg:max-h-64 textarea-bordered text-[2.5vw] md:text-xs lg:text-sm xl:text-sm" placeholder="ex. สายพันธุ์, ลักษณะเฉพาะ, สีขน หรือ นิสัย"></textarea>
      </div>
      <div className="my-8 flex justify-center items-center rounded-md md:btn bg-pethub-color1 md:bg-pethub-color1 text-white md:text-white h-[7vw] w-[15vw] sm:w-36 sm:h-10 md:w-40 font-medium text-[2vw] md:text-xs lg:text-sm xl:text-base">บันทึกข้อมูล</div>
      </div>
    </div>
    </>
  );
}

export default AddPetProfile;

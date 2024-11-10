import Navbar from "./Utils/Navbar"

import React, { useState } from 'react';

function AddPetProfile() {
  const [petImage, setPetImage] = useState(null);

  const handleImageUpload = (event) => {
    setPetImage(URL.createObjectURL(event.target.files[0]));
  };

  return (
    <>
    <Navbar />
    <div className="flex flex-col items-center p-8">
      <h2 className="text-center text-lg text-red-600 mb-4">
        เพื่อความปลอดภัยของสัตว์เลี้ยงของคุณ เราแนะนำให้ใส่ข้อมูลพื้นฐานเพื่อป้องกันในกรณีฉุกเฉิน
      </h2>

      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 w-full max-w-md mb-6">
        <h3 className="text-center mb-4">Upload รูปของสัตว์เลี้ยงของคุณ</h3>
        
        <div className="flex flex-col items-center">
          {petImage ? (
            <img src={petImage} alt="Pet Preview" className="w-40 h-40 object-cover rounded-lg mb-4" />
          ) : (
            <label className="flex flex-col items-center justify-center w-full h-32 bg-gray-50 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100">
              <span className="text-gray-500">Drag and Drop here</span>
              <span className="text-gray-500">or</span>
              <input type="file" onChange={handleImageUpload} className="hidden" />
              <button className="btn btn-outline mt-2">Select file</button>
            </label>
          )}
        </div>
      </div>

      <form className="w-full max-w-md space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <input type="text" placeholder="ชื่อสัตว์เลี้ยง" className="input input-bordered w-full" />
          <input type="text" placeholder="อายุ" className="input input-bordered w-full" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input type="text" placeholder="ประเภทของสัตว์เลี้ยง" className="input input-bordered w-full" />
          <input type="text" placeholder="เพศ" className="input input-bordered w-full" />
        </div>

        <textarea
          placeholder="คำอธิบายรายละเอียดของสัตว์เลี้ยง เช่น สายพันธุ์, ลักษณะพิเศษโดดเด่น และอื่นๆ"
          className="textarea textarea-bordered w-full"
        ></textarea>

        <button type="submit" className="btn focus:outline-none text-white bg-pethub-color2 hover:bg-pethub-color1 w-full">
          บันทึกข้อมูลสัตว์เลี้ยง
        </button>
      </form>
    </div>
    </>
  );
}

export default AddPetProfile;

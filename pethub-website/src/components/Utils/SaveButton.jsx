import React from "react";

const ReadOnlyToggleButton = ({ readOnly, toggleReadOnly }) => {
  return (
    <div className="flex justify-center">
      <button
        className={`mt-1 md:mt-5 flex justify-center items-center rounded-md md:btn ${
          readOnly
            ? "bg-pethub-color6 md:bg-pethub-color6"
            : "bg-pethub-color1 md:bg-pethub-color1"
        } text-white md:text-white h-[7vw] w-[15vw] sm:w-24 sm:h-10 md:w-36 font-medium text-[2vw] md:text-xs lg:text-sm xl:text-base`}
        onClick={toggleReadOnly}
      >
        {readOnly ? "แก้ไขข้อมูล" : "บันทึก"}
      </button>
    </div>
  );
};

export default ReadOnlyToggleButton;

import { useState } from "react";

// eslint-disable-next-line react/prop-types
function PictureUpload({ onImageSelected }) {
  const [selectedImage, setSelectedImage] = useState(null);

  // Function to handle image selection
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imgUrl = URL.createObjectURL(file);
      setSelectedImage(imgUrl);
      onImageSelected(file);
    }
  };

  // Function to delete the selected image
  const handleDeleteImage = () => {
    setSelectedImage(null);
    onImageSelected(null);
  };

  return (
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 w-full max-w-full mx-auto text-center">
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
        <div className="relative flex flex-col items-center justify-center h-48 lg:h-64 xl:h-80">
          <input
            name="selectedImage"
            type="file"
            id="file-upload"
            accept="image/*"
            onChange={handleImageChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <label
            htmlFor="file-upload"
            className="bg-orange-500 text-white text-xs lg:text-sm py-2 px-4 rounded cursor-pointer"
          >
            เลือกไฟล์
          </label>
        </div>
      )}
    </div>
  );
}

export default PictureUpload;

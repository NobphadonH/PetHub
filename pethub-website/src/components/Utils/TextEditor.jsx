import React, { useEffect, useRef, useState } from "react";
import Quill from "quill"; // Import Quill
import "quill/dist/quill.snow.css"; // Import Quill's default styles

const QuillEditor = () => {
  const quillRef = useRef(null); // Reference to attach the editor to
  const quillInstance = useRef(null); // Store the Quill instance
  const [readOnly, setReadOnly] = useState(false); // State to toggle read-only mode
  const [htmlContent, setHtmlContent] = useState(``); // State to store raw HTML content

  console.log(htmlContent)

  useEffect(() => {
    // Initialize Quill only once, when the component mounts
    quillInstance.current = new Quill(quillRef.current, {
      theme: "snow",
      readOnly: false, // Initially set read-only to false
      modules: {
        toolbar: [
          [{ header: "1" }, { header: "2" }],
          [{ list: "ordered" }, { list: "bullet" }],
          ["bold", "underline"],
          [{ align: [] }],
          ["link"],
        ],
      },
      placeholder: "write something...",
    });

    return () => {
      // Clean up the Quill instance on component unmount
      quillInstance.current = null;
    };
  }, []); // Empty dependency array ensures that this runs only once

  // Effect to toggle the read-only state of the editor
  useEffect(() => {
    if (quillInstance.current) {
      quillInstance.current.enable(!readOnly); // Enable or disable editing
      if (readOnly) {
        // Collect raw HTML when switching to read-only mode
        setHtmlContent(quillInstance.current.root.innerHTML);
      }
    }
  }, [readOnly]);

  const toggleReadOnly = () => {
    setReadOnly((prevReadOnly) => !prevReadOnly); // Toggle the read-only state
  };

  return (
    <div>
      <div ref={quillRef} style={{ height: "300px" }}></div>
      <div className="flex justify-center">
        <button
          className={`mt-1 md:mt-5 flex justify-center items-center rounded-md md:btn ${
            readOnly ? "bg-pethub-color6 md:bg-pethub-color6" : "bg-pethub-color1 md:bg-pethub-color1"
          } text-white md:text-white h-[7vw] w-[15vw] sm:w-24 sm:h-10 md:w-36 font-medium text-[2vw] md:text-xs lg:text-sm xl:text-base`}
          onClick={toggleReadOnly}
        >
          {readOnly ? "แก้ไขข้อมูล" : "บันทึก"}
        </button>
      </div>

      {readOnly && (
        <div>
          <h3>Raw HTML Content:</h3>
          <div
            className="rendered-content"
            dangerouslySetInnerHTML={{ __html: htmlContent }} // Render HTML content here
          />
        </div>
      )}
    </div>
  );
};

export default QuillEditor;

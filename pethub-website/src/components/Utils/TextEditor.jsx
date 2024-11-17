import React, { useEffect, useRef, useState } from "react";
import Quill from "quill"; // Import Quill
import "quill/dist/quill.snow.css"; // Import Quill's default styles

const QuillEditor = () => {
  const quillRef = useRef(null); // Reference to attach the editor to
  const quillInstance = useRef(null); // Store the Quill instance
  const [readOnly, setReadOnly] = useState(false); // State to toggle read-only mode
  const [htmlContent, setHtmlContent] = useState(""); // State to store raw HTML content

  console.log(htmlContent)

  useEffect(() => {
    // Initialize Quill only once, when the component mounts
    quillInstance.current = new Quill(quillRef.current, {
      theme: "snow",
      readOnly: readOnly, // Set the initial read-only state based on the state
      modules: {
        toolbar: readOnly ? false : [ // Conditionally render toolbar
          [{ header: "1" }, { header: "2" }],
          [{ list: "ordered" }, { list: "bullet" }],
          ["bold", "underline"],
          [{ align: [] }],
          ["link"],
        ],
      },
      placeholder: "write something...",
    });

    // Collect raw HTML when in read-only mode
    if (readOnly) {
      const rawHTML = quillInstance.current.root.innerHTML;
      setHtmlContent(rawHTML); // Store raw HTML content in state
    }

    return () => {
      // Clean up the Quill instance on component unmount
      if (quillInstance.current) {
        quillInstance.current = null;
      }
    };
  }, [readOnly]); // Re-run when the `readOnly` state changes

  const toggleReadOnly = () => {
    setReadOnly((prevReadOnly) => !prevReadOnly); // Toggle the read-only state
  };

  return (
    <div>
      <div ref={quillRef} style={{ height: "300px" }}></div>
      <div className="flex justify-center">
        <button
          className={`mt-1 md:mt-5 flex justify-center items-center rounded-md md:btn ${readOnly ? "bg-pethub-color6 md:bg-pethub-color6" : "bg-pethub-color1 md:bg-pethub-color1"}  text-white md:text-white h-[7vw] w-[15vw] sm:w-24 sm:h-10 md:w-36 font-medium text-[2vw] md:text-xs lg:text-sm xl:text-base`}
          onClick={toggleReadOnly}
        >
          {readOnly ? "แก้ไขข้อมูล" : "บันทึก"}
        </button>
      </div>

      {readOnly && (
        <div>
          <h3>Raw HTML Content:</h3>
          <div
                dangerouslySetInnerHTML={{ __html: htmlContent }}
                style={{ whiteSpace: 'pre-wrap' }} // Preserve white spaces, line breaks
            />
        </div>
      )}
    </div>
  );
};

export default QuillEditor;

import React, { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

const QuillEditor = ({ readOnly, parentContent }) => {
  const quillRef = useRef(null); // Reference to attach the editor to
  const quillInstance = useRef(null); // Store the Quill instance
  const [htmlContent, setHtmlContent] = useState(parentContent || ""); // State to store raw HTML content

  useEffect(() => {
    // Initialize Quill only once, when the component mounts
    quillInstance.current = new Quill(quillRef.current, {
      theme: "snow",
      readOnly: readOnly, // Use the readOnly prop passed from the parent
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
  }, []); // Empty dependency array ensures this runs only once on mount

  useEffect(() => {
    if (quillInstance.current) {
      quillInstance.current.enable(!readOnly); // Enable or disable editing
      if (readOnly) {
        // Collect raw HTML when switching to read-only mode
        setHtmlContent(quillInstance.current.root.innerHTML);
      }
    }
  }, [readOnly]); // This effect runs when the readOnly prop changes

  return (
    <div>
      <div ref={quillRef} style={{ height: "500px" }}></div>

      {/* {readOnly && (
        <div>
          <h3>Raw HTML Content:</h3>
          <div
            className="rendered-content"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </div>
      )} */}
    </div>
  );
};

export default QuillEditor;

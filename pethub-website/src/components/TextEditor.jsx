import React, { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

const QuillEditor = ({ readOnly, parentContent, onContentChange }) => {
  const quillRef = useRef(null); // Reference to attach the editor to
  const quillInstance = useRef(null); // Store the Quill instance

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

    // Sync the content from parentContent (initial value)
    if (parentContent) {
      quillInstance.current.root.innerHTML = parentContent;
    }

    // Listen for changes and pass the content to the parent
    quillInstance.current.on("text-change", () => {
      const content = quillInstance.current.root.innerHTML;
      onContentChange(content); // Notify parent of content change
    });

    return () => {
      // Clean up the Quill instance on component unmount
      quillInstance.current = null;
    };
  }, [parentContent, onContentChange]); // Re-run only when parentContent or onContentChange changes

  useEffect(() => {
    if (quillInstance.current) {
      quillInstance.current.enable(!readOnly); // Enable or disable editing
    }
  }, [readOnly]); // This effect runs when the readOnly prop changes

  return <div ref={quillRef} style={{ height: "500px" }}></div>;
};

export default QuillEditor;

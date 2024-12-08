import React, { useRef } from "react";
import "./UploadPage.css";

const UploadRequirements: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleBrowseClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Trigger the file input click
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      console.log("Files selected:", files); // Handle file selection logic
    }
  };

  const uploadedFiles = [
    { name: "file1.pdf", progress: 100 },
    { name: "logo_large.pdf", progress: 100 },
    { name: "logo_compressed.png", progress: 80 },
    { name: "notes.txt", progress: 50 },
    { name: "logo_final.pdf", progress: 20 },
  ];

  return (
    <div className="upload-container">
      <div className="upload-box">
        <h1>Drag and Drop files to upload</h1>
        <p>or</p>
        <button type="button" onClick={handleBrowseClick}>
          Browse
        </button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </div>

      <div className="uploaded-files">
        <h2>Uploaded Files</h2>
        <ul>
          {uploadedFiles.map((file, index) => (
            <li key={index}>
              <span className="file-name">{file.name}</span>
              <div className="progress-bar">
                <span style={{ width: `${file.progress}%` }}></span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UploadRequirements;

import React from "react";
import "./UploadPage.css"

const UploadRequirements: React.FC = () => {
  return (
    <div className="upload-requirements">
      <h1>Upload Your Requirements</h1>
      <form>
        <div className="form-group">
          <label htmlFor="file-upload">Choose a file:</label>
          <input type="file" id="file-upload" name="file" />
        </div>
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default UploadRequirements;

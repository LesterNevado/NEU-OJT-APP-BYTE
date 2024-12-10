import React, { useState } from "react";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import "./UploadPage.css";

const UploadRequirements: React.FC = () => {
  const storage = getStorage();
  const [files, setFiles] = useState({
    resume: null as File | null,
    parentConsent: null as File | null,
    medicalExam: null as File | null,
    psychologyExam: null as File | null,
  });
  const [progress, setProgress] = useState<Record<string, number>>({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const file = e.target.files?.[0];
    if (file && file.type !== "application/pdf") {
      setError("Only PDF files are allowed.");
      return;
    }
    setError("");
    setFiles((prev) => ({
      ...prev,
      [field]: file,
    }));
  };

  const uploadFileToFirebase = (file: File, field: string) => {
    return new Promise<void>((resolve, reject) => {
      const fileRef = ref(storage, `requirements/${field}/${file.name}`);
      const uploadTask = uploadBytesResumable(fileRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progressPercent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress((prev) => ({ ...prev, [field]: progressPercent }));
        },
        (error) => reject(error),
        async () => {
          await getDownloadURL(uploadTask.snapshot.ref);
          resolve();
        }
      );
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!files.resume || !files.parentConsent || !files.medicalExam || !files.psychologyExam) {
      setError("Please upload all required documents.");
      return;
    }
    setError("");
    setSuccess(null);

    try {
      await Promise.all(
        Object.entries(files).map(([field, file]) => {
          if (file) return uploadFileToFirebase(file as File, field);
          return Promise.resolve();
        })
      );
      setSuccess("All files uploaded successfully!");
    } catch (err) {
      console.error("Error uploading files:", err);
      setError("An error occurred while uploading files.");
    }
  };

  return (
    <div className="upload-container">
      <div className="upload-box">
        <h1>Upload Your Files</h1>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}

        <form onSubmit={handleSubmit}>
          {["resume", "parentConsent", "medicalExam", "psychologyExam"].map((field) => (
            <div key={field} className="upload-item">
              <div className="file-info">
                <span className="file-label">
                  {field
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase())}:
                </span>
                <input
                  type="file"
                  id={`${field}-upload`}
                  accept=".pdf"
                  onChange={(e) => handleFileChange(e, field)}
                />
              </div>
              {progress[field] != null && (
                <div className="progress-wrapper">
                  <div className="progress-bar">
                    <span style={{ width: `${progress[field]}%` }}></span>
                  </div>
                  <span className="progress-text">{progress[field]}%</span>
                </div>
              )}
            </div>
          ))}
          <button type="submit">Upload</button>
        </form>
      </div>
    </div>
  );
};

export default UploadRequirements;

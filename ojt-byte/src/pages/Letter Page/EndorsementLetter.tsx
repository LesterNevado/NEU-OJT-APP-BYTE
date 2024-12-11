import React, { useEffect, useState } from "react";
import { getStorage, ref, getMetadata } from "firebase/storage";
import { useOutletContext } from "react-router-dom";
import { PDFDocument, rgb } from "pdf-lib";
import './EndorsementLetter.css';

interface User {
  uid: string;
  firstName: string;
  lastName: string;
  email: string;
  course: string;
  section: string;
  academicYear: string;
  semester: string;
  adviser: string;
  [key: string]: any;
}

interface OutletContextProps {
  user: User;
}

const GenerateEndorsementLetter: React.FC = () => {
  const storage = getStorage();
  const { user } = useOutletContext<OutletContextProps>();

  const [filesUploaded, setFilesUploaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [requirementsStatus, setRequirementsStatus] = useState<{ [key: string]: string }>({
    resume: "Not Submitted",
    parentConsent: "Not Submitted",
    medicalExam: "Not Submitted",
    psychologyExam: "Not Submitted",
  });

  const firstName = user?.firstName || "";
  const lastName = user?.lastName || "";

  useEffect(() => {
    const checkRequiredFiles = async () => {
      try {
        if (!user) {
          setError("No user logged in.");
          return;
        }

        const requiredFiles = [
          { name: "resume", path: `requirements/resume/Resume_${lastName}_${firstName}.pdf` },
          { name: "parentConsent", path: `requirements/parentConsent/ParentConsent_${lastName}_${firstName}.pdf` },
          { name: "medicalExam", path: `requirements/medicalExam/MedicalExam_${lastName}_${firstName}.pdf` },
          { name: "psychologyExam", path: `requirements/psychologyExam/PsychologyExam_${lastName}_${firstName}.pdf` },
        ];

        let allFilesExist = true;
        const updatedStatus: { [key: string]: string } = { ...requirementsStatus };

        for (let { name, path } of requiredFiles) {
          console.log(`Checking for file: ${path}`);
          const fileRef = ref(storage, path);

          try {
            await getMetadata(fileRef);
            console.log(`File exists: ${path}`);
            updatedStatus[name] = "Submitted"; // Mark as submitted if the file exists
          } catch (err: any) {
            console.error(`File not found: ${path}`, err.message);
            updatedStatus[name] = "Not Submitted"; // Mark as not submitted if the file doesn't exist
            allFilesExist = false;
          }
        }

        setRequirementsStatus(updatedStatus);
        setFilesUploaded(allFilesExist);
        if (!allFilesExist) {
          setError("Not all required files are uploaded.");
        } else {
          setError(null);
          console.log("All required files are present.");
        }
      } catch (err) {
        console.error("Error checking files:", err);
        setError("An error occurred while checking files.");
      }
    };

    checkRequiredFiles();
  }, [user, storage, firstName, lastName, requirementsStatus]);

  const generatePDF = async () => {
    try {
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage([600, 750]); // Set page size
      const { height } = page.getSize();

      // Add Title
      const titleFontSize = 18;
      page.drawText("Endorsement Letter", {
        x: 50,
        y: height - 50,
        size: titleFontSize,
        color: rgb(0, 0.53, 0.71),
      });

      let yPosition = height - 100; // Adjust y-position for text

      // Add content text
      const contentFontSize = 12;
      const lineHeight = 16;

      const textContent = [
        `To Whom It May Concern,`,
        '',
        `This letter is to endorse ${firstName} ${lastName}, a student of ${user.course} (${user.section}) in the academic year ${user.academicYear}`,
        'as part of the requirements for their on-the-job training.',
        '',
        `If you have further questions, please consult to the CICS Faculty Office.`,
        '',
        `Sincerely,`,
        `The NEU Faculty`,
      ];

      // Loop through textContent and add each line to the PDF
      textContent.forEach((line) => {
        page.drawText(line, {
          x: 50,
          y: yPosition,
          size: contentFontSize,
          color: rgb(0, 0, 0),
        });
        yPosition -= lineHeight; // Move to the next line
      });

      // Serialize the PDF to bytes
      const pdfBytes = await pdfDoc.save();

      // Create a Blob from the PDF bytes and download it
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `EndorsementLetter_${lastName}_${firstName}.pdf`;
      link.click();

      console.log("PDF generated successfully.");
    } catch (err) {
      console.error("Error during PDF generation:", err);
      setError("Failed to generate the endorsement letter.");
    }
  };

  return (
    <div className="generate-endorsement-letter">
      <h1>Generate Endorsement Letter</h1>

      {error && <p className="error-message">{error}</p>}

      {/* Requirements Status Display */}
      <div className="requirements-status">
        <h2>Requirements Status</h2>
        <ul>
          {Object.entries(requirementsStatus).map(([key, status]) => (
            <li key={key}>
              <strong>{key.replace(/([A-Z])/g, ' $1').toUpperCase()}:</strong> {status}
            </li>
          ))}
        </ul>
      </div>

      <button className={`generate-button ${filesUploaded ? "enabled" : "disabled"}`}
              disabled={!filesUploaded}
              onClick={generatePDF}>
        Generate Endorsement Letter
      </button>
    </div>
  );
};

export default GenerateEndorsementLetter;

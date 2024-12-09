import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import "./EditPage.css";


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
  [key: string]: any; // Allows for additional properties
}


interface OutletContextProps {
  user: User;
}


const EditStudentInfo: React.FC = () => {
  const { user } = useOutletContext<OutletContextProps>();
  const db = getFirestore();


  const [formData, setFormData] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);


  const fetchUserData = async () => {
    try {
      const userDoc = doc(db, "users", user.uid);
      const docSnap = await getDoc(userDoc);
 
      if (docSnap.exists()) {
        const data = docSnap.data() as User;
 
        // Extract first and last name from email if not already in Firestore
        if (!data.firstName || !data.lastName) {
          const emailNamePart = user.email.split("@")[0]; // Get the part before '@'
          const [extractedFirstName, ...rest] = emailNamePart.split(/[._]/); // Split by dot or underscore
          const extractedLastName = rest.join(" "); // Join remaining parts as last name
 
          data.firstName = extractedFirstName || "";
          data.lastName = extractedLastName || "";
        }
 
        setFormData({ ...data });
      } else {
        setError("No user data found.");
      }
    } catch (err) {
      console.error("Error fetching user data:", err);
      setError("Failed to fetch user data.");
    } finally {
      setLoading(false);
    }
  };


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => prev && { ...prev, [name]: value });
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;


    try {
      const userDoc = doc(db, "users", formData.uid);
      await updateDoc(userDoc, formData);
      alert("Student information updated successfully!");
      window.location.reload();
    } catch (err) {
      console.error("Error updating student info:", err);
      setError("Failed to update student information.");
    }
  };


  useEffect(() => {
    if (user) fetchUserData();
  }, [user]);


  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;


  return (
    <div className="edit-student-info">
      <h1>Edit Student Information</h1>
      {formData && (
        <form onSubmit={handleSubmit}>
          <label>
            First Name:
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Last Name:
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              disabled
            />
          </label>
          <label>
            Course:
            <input
              type="text"
              name="course"
              value={formData.course}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Section:
            <input
              type="text"
              name="section"
              value={formData.section}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Academic Year:
            <input
              type="text"
              name="academicYear"
              value={formData.academicYear}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Semester:
            <input
              type="text"
              name="semester"
              value={formData.semester}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Adviser:
            <input
              type="text"
              name="adviser"
              value={formData.adviser}
              onChange={handleInputChange}
            />
          </label>
          <button type="submit">Update</button>
        </form>
      )}
    </div>
  );
};


export default EditStudentInfo;

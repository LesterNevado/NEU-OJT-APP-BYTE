import React, { useState } from 'react';
import "./EditPage.css";

interface StudentDetails {
  firstName: string;
  lastName: string;
  email: string;
  course: string;
  year: string;
}

const EditStudentInfo: React.FC = () => {
  const [details, setDetails] = useState<StudentDetails>({
    firstName: '',
    lastName: '',
    email: '',
    course: '',
    year: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDetails(prevDetails => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission
    console.log(details);
  };

  return (
    <div className="container">
      <img src="path/to/profile-icon.jpg" alt="Profile Icon" className="profile-icon" />
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={details.firstName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={details.lastName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={details.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="course">Course:</label>
          <input
            type="text"
            id="course"
            name="course"
            value={details.course}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="year">Year:</label>
          <input
            type="text"
          id="year"
          name="year"
          value={details.year}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Save</button>
    </form>
  </div>
  );
};

export default EditStudentInfo;

import React from "react";
import "./MainPage.css";

const MainPage: React.FC = () => {
  return (
    <div className="main-container">
      <h1 className="welcome-message">WELCOME TO NEU OJT APP</h1>
      <div className="button-container">
        <button className="main-button">Enter Student Input</button>
        <button className="main-button">Upload Requirements</button>
        <button className="main-button">Generate Endorsement Letter</button>
        <button className="main-button">Update Company</button>
      </div>
    </div>
  );
};

export default MainPage;

import React, { useState } from "react";
import "./MainPage.css";
import neulogo from "./neulogo.png";
import upload from "./upload.png";
import letter from "./letter.png";
import edit from "./edit.png";
import home from "./home.png";
import logout from "./logout.png"; 
import notif from "./notif.png"; 

const MainPage: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`layout ${isDarkMode ? "dark" : ""}`}>
      {/* Sidebar */}
      <div className="sidebar">
        {/* Sidebar Logo and Title */}
        <div className="sidebar-logo-container">
          <img src={neulogo} alt="New Era University Logo" className="sidebar-logo" />
          <div className="sidebar-logo-title">
            <h2>NEU OJT APP</h2>
          </div>
        </div>

        {/* Sidebar User Info */}
        <div className="sidebar-user">
          <div className="sidebar-user-image">
            <img
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              alt="Juan Dela Cruz"
            />
          </div>
          <div className="sidebar-user-info">
            <p className="sidebar-user-name">DELA CRUZ, JUAN</p>
            <p className="sidebar-user-role">Student</p>
          </div>
        </div>

        {/* Sidebar Menu */}
        <div className="menu">
          <a href="#">
            <img src={home} alt="Home Icon" className="menu-icon" /> Home
          </a>
          <a href="#">
            <img src={letter} alt="Envelope Icon" className="menu-icon" /> Endorsement Letter
          </a>
          <a href="#">
            <img src={upload} alt="Upload Icon" className="menu-icon" /> Upload Requirements
          </a>
          <a href="#">
            <img src={edit} alt="Edit Icon" className="menu-icon" /> Edit Student Information
          </a>
          <a href="#" className="logout">
            <img src={logout} alt="Logout Icon" className="menu-icon" /> Log Out
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div className="content">
        <div className="header">
          <h2>Welcome,</h2>
          <h1>JUAN DELA CRUZ!</h1>

          {/* Notification Button */}
          <div className="notification-container">
            <button className="notification-btn">
              <img src={notif} alt="Notification Icon" className="notification-icon" />
            </button>
          </div>
        </div>

        {/* Content Grid */}
        <div className="content-grid">
          <div className="content-box">Box 1</div>
          <div className="content-box">Box 2</div>
          <div className="content-box">Box 3</div>
        </div>
      </div>

      {/* Theme Toggle Button */}
      <button className="theme-toggle-btn" onClick={toggleTheme}>
        {isDarkMode ? "🌙" : "🌞"}
      </button>
    </div>
  );
};

export default MainPage;

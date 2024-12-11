import React from "react";
import { useNavigate } from "react-router-dom";
import neulogo from "./neulogo.png";
import upload from "./upload.png";
import letter from "./letter.png";
import edit from "./edit.png";
import home from "./home.png";
import logoutIcon from "./logout.png";
import updateCompanyIcon from "./updateCompany.png";
import "./Sidebar.css";

interface SidebarProps {
  user: any;
  isAdviser: boolean;
  handleLogout: () => void;
}


const Sidebar: React.FC<SidebarProps> = ({ user, isAdviser, handleLogout }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-logo-container">
        <img src={neulogo} alt="New Era University Logo" className="sidebar-logo" />
        <div className="sidebar-logo-title">
          <h2>NEU OJT APP</h2>
        </div>
      </div>

      <div className="sidebar-user">
        {user && (
          <>
            <div className="sidebar-user-image">
              <img src={user.photoURL || ""} alt={user.name || "User"} />
            </div>
            <div className="sidebar-user-info">
              <p className="sidebar-user-name">{user.name?.toUpperCase()}</p>
              <p className="sidebar-user-role">{isAdviser ? "Adviser" : "Student"}</p>
            </div>
          </>
        )}
      </div>

      <div className="menu">
        <a href="/main">
          <img src={home} alt="Home Icon" className="menu-icon" /> Home
        </a>
        <a href="/main/letter">
          <img src={letter} alt="Envelope Icon" className="menu-icon" /> Endorsement Letter
        </a>
        <a href="/main/upload">
          <img src={upload} alt="Upload Icon" className="menu-icon" /> Upload Requirements
        </a>
        <a href="/main/edit">
          <img src={edit} alt="Edit Icon" className="menu-icon" /> Edit Student Information
        </a>
        {isAdviser && (
          <a href="">
            <img src={updateCompanyIcon} alt="Update Company Icon" className="menu-icon" /> Update Company
          </a>
        )}
        <a href="#" onClick={handleLogout} className="logout">
          <img src={logoutIcon} alt="Logout Icon" className="menu-icon" /> Log Out
        </a>
      </div>
    </div>
  );
};

export default Sidebar;

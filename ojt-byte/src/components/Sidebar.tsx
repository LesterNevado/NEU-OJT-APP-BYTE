import React, { useState } from "react";
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
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <button className={`hamburger-btn ${isCollapsed ? "collapsed" : ""}`} onClick={toggleSidebar}>
        ☰
      </button>
      <div className="sidebar-logo-container">
        <img src={neulogo} alt="New Era University Logo" className="sidebar-logo" />
        {!isCollapsed && (
          <div className="sidebar-logo-title">
            <h2>NEU OJT APP</h2>
          </div>
        )}
      </div>

      {!isCollapsed && <div className="menu-header">Dashboard</div>}

      <div className="menu">
        <a href="/main/" className="menu-item">
          <img src={home} alt="Home Icon" className="menu-icon" />
          {!isCollapsed && " Home"}
        </a>

        {!isCollapsed && <div className="menu-header">Others</div>}

        <a href="/main/upload" className="menu-item">
          <img src={upload} alt="Upload Icon" className="menu-icon" />
          {!isCollapsed && " Upload Requirements"}
        </a>
        <a href="" className="menu-item">
          <img src={letter} alt="Envelope Icon" className="menu-icon" />
          {!isCollapsed && " Endorsement Letter"}
        </a>
        <a href="/main/edit" className="menu-item">
          <img src={edit} alt="Edit Icon" className="menu-icon" />
          {!isCollapsed && " Edit Student Information"}
        </a>
        {isAdviser && (
          <a href="" className="menu-item">
            <img src={updateCompanyIcon} alt="Update Company Icon" className="menu-icon" />
            {!isCollapsed && " Update Company"}
          </a>
        )}
        <a href="#" onClick={handleLogout} className="menu-item logout">
          <img src={logoutIcon} alt="Logout Icon" className="menu-icon" />
          {!isCollapsed && " Log Out"}
        </a>
      </div>

      {user && (
        <div className={`sidebar-user ${isCollapsed ? "collapsed" : ""}`}>
          <div className="sidebar-user-background">
            <img src={user.photoURL || ""} alt={user.name || "User"} className="sidebar-user-image" />
            {!isCollapsed && (
              <div className="sidebar-user-info">
                <p className="sidebar-user-name">{user.name?.toUpperCase()}</p>
                <p className="sidebar-user-role">{isAdviser ? "Adviser" : "Student"}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
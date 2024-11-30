import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../services/firebase";
import { doc, getDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import "./MainPage.css";
import neulogo from "./neulogo.png";
import upload from "./upload.png";
import letter from "./letter.png";
import edit from "./edit.png";
import home from "./home.png";
import logoutIcon from "./logout.png";
import notif from "./notif.png";

const db = getFirestore();

const MainPage: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (!currentUser) {
        navigate("/login");
      } else {
        const userDoc = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(userDoc);

        if (docSnap.exists()) {
          setUser(docSnap.data());
        } else {
          console.error("No user data found in Firestore.");
        }
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`layout ${isDarkMode ? "dark" : ""}`}>
      {/* Sidebar */}
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
                <p className="sidebar-user-role">Student</p>
              </div>
            </>
          )}
        </div>

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
          <a href="#" onClick={handleLogout} className="logout">
            <img src={logoutIcon} alt="Logout Icon" className="menu-icon" /> Log Out
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div className="content">
        <div className="header">
          <h2>Welcome,</h2>
          <h1>{user?.name || "Guest"}!</h1>
          <div className="notification-container">
            <button className="notification-btn">
              <img src={notif} alt="Notification Icon" className="notification-icon" />
            </button>
          </div>
        </div>

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

import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { auth } from "../../services/firebase";
import { doc, getDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import Sidebar from "../../components/Sidebar";
import "./MainPage.css";

const db = getFirestore();

const MainPage: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [isAdviser, setIsAdviser] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (!currentUser) {
        navigate("/login");
      } else {
        const userDoc = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(userDoc);

        if (docSnap.exists()) {
          const userData = docSnap.data();
          setUser({ ...userData, uid: currentUser.uid }); // Include uid
          setIsAdviser(userData?.role === "Adviser");
        } else {
          console.error("No user data found in Firestore.");
        }
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      setUser(null); // Clear user state
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
      <Sidebar user={user} isAdviser={isAdviser} handleLogout={handleLogout} />

      <div className="content">
        <Outlet context={{ user, isAdviser }} />
      </div>

      <button className="theme-toggle-btn" onClick={toggleTheme}>
        {isDarkMode ? "🌙" : "🌞"}
      </button>
    </div>
  );
};

export default MainPage;

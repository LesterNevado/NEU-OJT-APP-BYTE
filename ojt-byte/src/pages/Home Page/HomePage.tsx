import React from "react";
import { useOutletContext, Link } from "react-router-dom";
import "../../pages/Main Page/MainPage.css";
import "./HomePage.css";

interface MainContentProps {
  user: any; 
  isAdviser: boolean;
}

const HomePage: React.FC = () => {
  const { user, isAdviser } = useOutletContext<MainContentProps>();

  return (
    <div className="main-content">
      <div className="header">
        <h2>Welcome,</h2>
        <h1>{user?.name || "Guest"}!</h1>
      </div>

      <div className="content-grid">
        {isAdviser ? (
          <>
            <Link to="/adviser/feature1" className="content">
              Adviser Box 1
            </Link>
            <Link to="/adviser/feature2" className="content">
              Adviser Box 2
            </Link>
            <Link to="/adviser/feature3" className="content">
              Adviser Box 3
            </Link>
          </>
        ) : (
          <>
            <Link to="/main/edit" className="content-box feature1">
              Edit Information
            </Link>
            <Link to="/main/upload" className="content-box feature2">
              Upload Requirements
            </Link>
            <Link to="" className="content-box feature3">
              Generate Endorsement Letter
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
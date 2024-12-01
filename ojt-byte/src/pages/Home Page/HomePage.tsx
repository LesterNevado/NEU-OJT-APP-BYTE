import React from "react";
import { useOutletContext } from "react-router-dom";
import "../../pages/Main Page/MainPage.css";

interface MainContentProps {
  user: any; // Replace with proper type if you have a User type
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
            <div className="content-box">Adviser Box 1</div>
            <div className="content-box">Adviser Box 2</div>
            <div className="content-box">Adviser Box 3</div>
          </>
        ) : (
          <>
            <div className="content-box">Student Box 1</div>
            <div className="content-box">Student Box 2</div>
            <div className="content-box">Student Box 3</div>
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;

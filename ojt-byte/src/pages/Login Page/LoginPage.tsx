import React from "react";
import "./LoginPage.css";
import neu_logo from "./NEU LOGO.png";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../../services/firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

const db = getFirestore(); // Initialize Firestore

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      if (user.email && user.email.endsWith("@neu.edu.ph")) {
        // Save user data to Firestore
        await saveUserData(user);
        navigate("/main"); // Navigate to the main page
      } else {
        // Restrict non-institutional emails
        await signOut(auth);
        alert("Only institutional email addresses are allowed.");
      }
    } catch (error) {
      console.error("Error signing in with Google:", error);
      alert("Login failed!");
    }
  };

  const saveUserData = async (user: any) => {
    try {
      const userDoc = doc(db, "users", user.uid);
      const userSnapshot = await getDoc(userDoc);

      
      if (!userSnapshot.exists()) {
        // Only save data for new users

        // Explicitly set role for the adviser email
        // jcesperanza@neu.edu.ph = adviser email
        const role =  
          user.email === "jcesperanza@neu.edu.ph" ? "Adviser" : "Student";
  
        await setDoc(userDoc, {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          role, // Save role in Firestore
          createdAt: new Date().toISOString(),
        });
  
        console.log("New user data saved successfully with role:", role);
      } else {
        console.log("User data already exists, no update performed.");
      }
    } catch (error) {
      console.error("Error saving user data:", error);
    }
  };

  return (
    <div className="login-page">
      <div className="welcome">
        <h1>WELCOME TO NEU OJT APP</h1>
      </div>
      <div className="login">
        <img
          src={neu_logo}
          alt="New Era University Logo"
          style={{ width: "150px", height: "150px", marginBottom: "20px" }}
        />
        <h1>Login to your account</h1>
        <button className="google-login-button" onClick={handleGoogleLogin}>
          Continue with Google
        </button>
      </div>
      <div className="footer">
        <p>© 2024 New Era University OJT App</p>
      </div>
    </div>
  );
};

export default LoginPage;
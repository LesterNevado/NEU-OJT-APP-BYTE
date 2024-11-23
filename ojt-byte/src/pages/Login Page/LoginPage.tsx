import React from "react";
import './LoginPage.css';
import neu_logo from "./NEU LOGO.png";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="login-page">
            <div className="welcome">
                <h1>WELCOME TO NEU OJT APP</h1>
            </div>
            <div className="login">
                <img 
                    src={neu_logo}
                    alt="New Era University Logo" 
                    style={{ width: '150px', height: '150px', marginBottom: '20px' }} 
                />
                <h1>Login to your account</h1>
                <button className="google-login-button" onClick={() => navigate("/main")}>Continue with Google</button>
            </div>
            <div className="footer">
                <p>© 2024 New Era University OJT App</p>
            </div>
        </div>
    );
}

export default LoginPage;
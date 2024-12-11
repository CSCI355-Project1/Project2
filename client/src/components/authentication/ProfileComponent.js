import React, { useState } from "react";
import "../../styles/ProfileComponent.css";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";


const ProfileComponent = () => {
    const [error, setError] = useState("")
    const { currentUser, logout } = useAuth();
    const history = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            history("/")
        }
        catch {
            setError("Failed to log out.")
        }
    }

    return (
        <div className="profile-div">
            <div className="profile-body">
                <h2>Profile</h2>
                {error && <div className="alert">{error}</div>}
                <strong>Email: </strong> {currentUser?.email}
            </div>
            <button onClick={handleLogout} className="btn logout">Log Out</button>
        </div>
    );
};

export default ProfileComponent;
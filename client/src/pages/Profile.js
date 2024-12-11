import React from "react";
import ProfileComponent from "../components/authentication/ProfileComponent";
import { AuthProvider } from "../context/AuthContext";

const Profile = () => {
  return (
    <AuthProvider>
      <ProfileComponent />
    </AuthProvider>
  );
};

export default Profile;

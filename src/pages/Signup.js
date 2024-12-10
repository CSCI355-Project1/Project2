import React from 'react';
import SignupComponent from '../components/authentication/SignupComponent';
import { AuthProvider } from '../context/AuthContext';

const Signup = () => {
    return (
        <AuthProvider>
            <SignupComponent />
        </AuthProvider>
    )
};

export default Signup;

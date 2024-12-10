<<<<<<< HEAD:client/src/pages/Login.js
import React from 'react';
import "../styles/Login.css";

const Login = () => {
    return (
        <div>
            <h1>Login</h1>
            <p>Sign in to access personalized features.</p>
        </div>
    );
};

export default Login;
=======
import React from 'react';
import LoginComponent from '../components/authentication/LoginComponent';
import { AuthProvider } from '../context/AuthContext';

const Login = () => {
    return (
        <AuthProvider>
            <LoginComponent />
        </AuthProvider>
    )
};

export default Login;
>>>>>>> origin/osvaldo:src/pages/Login.js

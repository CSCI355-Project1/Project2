import React, { useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';
import "../../styles/LoginComponent.css";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const LoginComponent = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useNavigate();

    async function submitHandle(e) {
        e.preventDefault();

        try {
            setError("");
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
            history("/");
        }
        catch {
            setError("Failed to sign in");
        }
        setLoading(false);
    }

    return (
        <div className="login-div">
            <h2>Log In</h2>
            {error && <div className="alert">{error}</div>}
            <form className="login-form" onSubmit={submitHandle}>
                <label>
                    Email
                    <input type="email" id="email" ref={emailRef} required />
                </label>
                <label>
                    Password
                    <input type="password" id="password" ref={passwordRef} />
                </label>
                <button disabled={loading} type="submit" className="btn login">Log In</button>
            </form>
            <p>Don't have an account?<Link to="/signup" className="btn login-signup-redirect">Sign Up</Link>
            </p>
        </div>
    );
};

export default LoginComponent;
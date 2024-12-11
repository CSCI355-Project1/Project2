import React, { useRef, useState } from "react";
import "../../styles/SignupComponent.css";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const SignupComponent = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { signup } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useNavigate();

    async function submitHandle(e) {
        e.preventDefault();

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match");
        }

        try {
            setError("");
            setLoading(true);
            await signup(emailRef.current.value, passwordRef.current.value);
            history("/");
        }
        catch (error) {
            console.error(error);
            setError(error.message || "An error occurred! Please try again!");
        }
        setLoading(false);
    }

    return (
        <div className="signup-div">
            <h2>Sign Up</h2>
            {error && <div className="alert">{error}</div>}
            <form className="signup-form" onSubmit={submitHandle}>
                <label>
                    Email
                    <input type="email" id="email" ref={emailRef} required />
                </label>
                <label>
                    Password
                    <input type="password" id="password" ref={passwordRef} />
                </label>
                <label>
                    Confirm Password
                    <input type="password" id="password-confirm" ref={passwordConfirmRef} />
                </label>
                <button disabled={loading} type="submit" className="btn signup">Sign Up</button>
            </form>
            <p>Already have an account?<Link to="/login" className="btn signup-login-redirect">Login</Link></p>
        </div>
    );
};

export default SignupComponent;
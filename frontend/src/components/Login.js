import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

export default function Login() {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [showReset, setShowReset] = useState(false);
    const [resetData, setResetData] = useState({ email: "", newPassword: "", confirmPassword: "" });
    const [passwordError, setPasswordError] = useState("");
    const [loginError, setLoginError] = useState("");

    let navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoginError(""); // Reset error message

        try {
            const response = await fetch("http://localhost:5000/api/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            });

            const data = await response.json();

            if (!response.ok) {
                setLoginError(data.message || "Failed to login.");
                return;
            }

            // If login is successful, store the data
            localStorage.setItem("userEmail", credentials.email);
            localStorage.setItem("authToken", data.authToken);
            alert("Login successful!");
            navigate("/Home");
        } catch (error) {
            console.error('Error logging in:', error);
            setLoginError('Error logging in. Please try again.');
        }
    };

    const handleResetPassword = async (event) => {
        event.preventDefault();
        setPasswordError(""); // Reset error message

        if (resetData.newPassword !== resetData.confirmPassword) {
            setPasswordError("Passwords do not match.");
            return;
        }

        // Password validation regex
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{5,}$/;

        if (!passwordRegex.test(resetData.newPassword)) {
            setPasswordError("Password must be at least 5 characters long and contain at least one letter and one special character.");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/resetpassword", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: resetData.email,
                    password: resetData.newPassword,
                })
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data.message || "Failed to reset password.");
                return;
            }

            alert("Password changed successfully!");
            setShowReset(false);
        } catch (error) {
            console.error('Error resetting password:', error);
            alert('Error resetting password. Please try again.');
        }
    };

    const onChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value });
    };

    const onResetChange = (event) => {
        setResetData({ ...resetData, [event.target.name]: event.target.value });
    };

    return (
        <>
            <div className="login-container">
                <div className="login-form">
                    <form onSubmit={handleSubmit}>
                        <h2 className="login-title">Log in</h2>
                        {loginError && <p className="error-message">{loginError}</p>}
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="exampleInputEmail1"
                                placeholder="Enter email"
                                name="email"
                                value={credentials.email}
                                onChange={onChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="exampleInputPassword1"
                                placeholder="Enter password"
                                name="password"
                                value={credentials.password}
                                onChange={onChange}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary btn-block">Log in</button>
                        <div className="signup-link">
                            <p>
                                Don't have an account? <Link to="/signup">Sign up</Link>
                            </p>
                            <p>
                                Forgot Password? <span onClick={() => setShowReset(true)} className="reset-link">Click here</span>
                            </p>
                        </div>
                    </form>
                </div>
                <div className="login-image">
                    <img src="https://i.pinimg.com/564x/4d/12/2f/4d122fd2f166ba2f9e8819810a5bcbc8.jpg" alt="Background" />
                </div>
            </div>

            {showReset && (
                <div className="reset-portal">
                    <div className="reset-form">
                        <form onSubmit={handleResetPassword}>
                            <h2>Reset Password</h2>
                            <div className="form-group">
                                <label htmlFor="resetEmail">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="resetEmail"
                                    placeholder="Enter email"
                                    name="email"
                                    value={resetData.email}
                                    onChange={onResetChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="newPassword">New Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="newPassword"
                                    placeholder="Enter new password"
                                    name="newPassword"
                                    value={resetData.newPassword}
                                    onChange={onResetChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="confirmPassword"
                                    placeholder="Confirm password"
                                    name="confirmPassword"
                                    value={resetData.confirmPassword}
                                    onChange={onResetChange}
                                    required
                                />
                            </div>
                            {passwordError && <p className="password-error">{passwordError}</p>}
                            <button type="submit" className="btn btn-success btn-block">Reset Password</button>
                            <button type="button" onClick={() => setShowReset(false)} className="btn btn-secondary btn-block">Cancel</button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
